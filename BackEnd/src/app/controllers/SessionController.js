import jwt from 'jsonwebtoken';
import * as Yup from 'yup';
import crypto from 'crypto';

import User from '../models/User';
import Notification from '../schemas/Notification';
import authConfig from '../../config/auth';
import Queue from '../../lib/Queue';
import RecoveryMail from '../jobs/RecoveryMail';

class SessionController {
  async store(req, res) {
    const schema = Yup.object().shape({
      email: Yup.string().email().required(),
      password: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (!(await user.checkPassword(password))) {
      return res.status(401).json({ error: 'Password does not match' });
    }

    const { id, name } = user;

    return res.json({
      user: { id, name, email },
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }

  async forgotPassword(req, res) {
    const schema = Yup.object().shape({
      email: Yup.string().email().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation Fails' });
    }

    const { email } = req.body;

    const user = await User.findOne({ where: { email } });

    const { name, id } = user;

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const password_reset_token = crypto.randomBytes(20).toString('hex');

    const password_reset_expires = new Date();
    password_reset_expires.setHours(password_reset_expires.getHours() + 1);

    await user.update({ password_reset_token, password_reset_expires });

    await Queue.add(RecoveryMail.key, {
      name,
      email,
      password_reset_token,
    });

    await Notification.create({
      content: `Olá, ${name}. foi feita uma solicitação de alteração de senha em sua conta.`,
      user: id,
    });

    await user.save();

    return res.status(200).json({ ok: 'Token generated' });
  }

  async resetPassword(req, res) {
    const schema = Yup.object().shape({
      password: Yup.string().min(6).required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation Fails' });
    }

    let { token } = req.query;

    token = token.split('"').join('');

    if (token === 'undefined') {
      return res.status(401).json({ error: 'Token not provided' });
    }

    const user = await User.findOne({ where: { password_reset_token: token } });

    if (!user) {
      console.log('usuario não encontrado');
      return res.status(404).json({ error: 'User not found' });
    }

    const { password_reset_token, password_reset_expires } = await user;

    if (token !== password_reset_token) {
      return res.status(400).json({ error: 'Token invalid' });
    }

    const now = new Date();

    if (now > password_reset_expires) {
      return res
        .status(400)
        .json({ error: 'Token expired, generate a new one' });
    }

    await user.update(req.body);
    await user.update({
      password_reset_token: null,
      password_reset_expires: null,
    });

    return res.status(200).json({ ok: 'Password updated' });
  }

  async storeGoogleSession(req, res) {
    console.log('Chegamos na session');

    console.log('Tentando pegar req: ', req.user);

    const { id_google } = req.user;

    const user = await User.findOne({ where: { id_google } });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const { id, name, email } = user;

    return res.json({
      user: { id, name, email },
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}

export default new SessionController();

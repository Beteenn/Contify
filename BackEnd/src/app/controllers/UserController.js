import * as Yup from 'yup';
import User from '../models/User';
import Result from '../models/Result';
import Avatar from '../models/Avatar';

class UserController {
  async list(req, res) {
    const users = await User.findAll({ attributes: ['id', 'name', 'email'] });

    return res.json(users);
  }

  async index(req, res) {
    const user = await User.findByPk(req.params.id, {
      attributes: ['id', 'name', 'email'],
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    return res.json(user);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
      password: Yup.string().required().min(6),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { email } = req.body;

    const checkEmailExists = await User.findOne({ where: { email } });

    if (checkEmailExists) {
      return res.status(401).json({ error: 'This email already exists' });
    }

    const { id, name } = await User.create(req.body);

    await Result.create({ user_id: id });

    return res.json({ id, name, email });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      oldPassword: Yup.string().min(6),
      password: Yup.string()
        .min(6)
        .when('oldPassword', (oldPassword, field) =>
          oldPassword ? field.required() : field
        ),
      confirmPassword: Yup.string().when('password', (password, field) =>
        password ? field.required().oneOf([Yup.ref('password')]) : field
      ),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const user = await User.findByPk(req.params.id, {
      attributes: ['id', 'name', 'email', 'password_hash'],
    });

    if (!user) {
      return res.status(404).json({ error: 'This user does not exists' });
    }

    const { oldPassword, email, password, name } = req.body;

    if (email) {
      const checkEmailExists = await User.findOne({ where: { email } });

      if (checkEmailExists) {
        return res.status(401).json({ error: 'This email already exists' });
      }
    }

    console.log(`Senha hash ${user.password_hash}`);
    console.log(`Senha antiga ${oldPassword}`);
    console.log(`Senha nova ${password}`);

    if (oldPassword) {
      if (!(await user.checkPassword(oldPassword))) {
        return res.status(401).json({ error: 'Password does not met' });
      }
    }

    if (password && password === oldPassword) {
      return res
        .status(401)
        .json({ error: 'New password is the same of old password' });
    }

    if (name && user.name === name) {
      return res.status(401).json({ error: 'New name inválid' });
    }

    const newUser = await user.update(req.body);

    return res.json(newUser);
  }

  async delete(req, res) {
    const user = await User.findByPk(req.params.id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // if user has a avatar, delete the avatar from table "avatars"

    if ((await user.avatar_id) !== null) {
      const avatar = Avatar.findByPk(user.avatar_id);
      (await avatar).destroy();
    }
    //

    await user.destroy();

    return res.json({ ok: `The user ${user.name} was deleted` });
  }
}

export default new UserController();

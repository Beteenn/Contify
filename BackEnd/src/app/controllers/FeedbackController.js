import * as Yup from 'yup';
import Feedback from '../models/Feedback';
import User from '../models/User';

class FeedbackController {
  async list(req, res) {
    const { page = 1, read = false } = req.query;

    const feedbacks = await Feedback.findAll({
      where: { read },
      limit: 10,
      offset: (page - 1) * 10,
      attributes: ['id', 'user_email', 'description', 'read'],
    });

    if (!feedbacks) {
      return res.status(404).json({ error: 'Feedbacks not found' });
    }

    return res.json(feedbacks);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      description: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const user = await User.findByPk(req.userId);

    const user_email = user.email;

    const { description } = req.body;

    await Feedback.create({ user_email, description });

    return res.json({ ok: 'Feedback sended' });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      read: Yup.boolean().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation Fails' });
    }

    const feedback = await Feedback.findByPk(req.params.id, {
      attributes: ['id', 'user_email', 'description', 'read'],
    });

    await feedback.update(req.body);

    return res.json(feedback);
  }

  async delete(req, res) {
    const feedback = await Feedback.findByPk(req.params.id);

    if (!feedback) {
      return res.status(404).json({ error: 'Feedback not found' });
    }

    await feedback.destroy();

    return res.json({ ok: `The Feedback ${feedback.id} was deleted` });
  }
}

export default new FeedbackController();

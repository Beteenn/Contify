import * as Yup from 'yup';
import Moviment from '../models/Moviment';

class MovimentController {
  async list(req, res) {
    const moviment = await Moviment.findAll({
      where: { user_id: req.userId },
      attributes: ['name', 'description', 'valor', 'expires', 'is_earning'],
    });

    if (!moviment) {
      return res.status(404).json({
        error: `The user with id=${req.UserId} does not have any moviment`,
      });
    }

    return res.json(moviment);
  }

  async index(req, res) {
    const moviment = await Moviment.findByPk(req.params.id, {
      where: { user_id: req.userId },
      attributes: ['name', 'description', 'valor', 'expires', 'is_earning'],
    });

    if (!moviment) {
      return res.status(404).json({ error: 'This moviment does not exists' });
    }

    return res.json(moviment);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      description: Yup.string(),
      valor: Yup.number().required(),
      expires: Yup.date().required(),
      user_id: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation Fails' });
    }

    const {
      id,
      name,
      description,
      valor,
      expires,
      is_earning,
    } = await Moviment.create(req.body);

    return res.json({
      id,
      name,
      description,
      valor,
      expires,
      is_earning,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      description: Yup.string(),
      valor: Yup.number(),
      expires: Yup.date(),
      is_earning: Yup.boolean(),
    });

    if (req.userId !== Moviment.user_id) {
      return res
        .status(401)
        .json({ error: "You don't have permission for this moviment" });
    }

    if (!(await schema.isValid())) {
      return res.status(400).json({ error: 'Validation Fails' });
    }

    const moviment = await Moviment.findByPk(req.params.id);

    if (!moviment) {
      return res.status(404).json({ error: 'Moviment not found' });
    }

    await moviment.update(req.body);

    return res.json(moviment);
  }

  async delete(req, res) {
    const moviment = await Moviment.findByPk(req.params.id);

    if (req.userId !== Moviment.user_id) {
      return res
        .status(401)
        .json({ error: "You don't have permission for this moviment" });
    }

    if (!moviment) {
      return res.status(404).json({ error: 'Moviment not found' });
    }

    await moviment.destroy(req.params.id);

    return res.json({ ok: `The moviment ${moviment.name} was deleted` });
  }
}

export default new MovimentController();

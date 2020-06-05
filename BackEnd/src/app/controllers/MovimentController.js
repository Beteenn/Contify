import * as Yup from 'yup';
import Moviment from '../models/Moviment';
import Result from '../models/Result';

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
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation Fails' });
    }

    const user_id = req.userId;

    const { id, name, description, valor, expires, is_earning } = req.body;

    await Moviment.create({
      id,
      name,
      description,
      valor,
      expires,
      is_earning,
      user_id,
    });

    // put the moviment on result

    const result = await Result.findOne({ where: { user_id: req.userId } });

    if (is_earning === true) {
      result.result += valor;
    } else {
      result.result -= valor;
    }

    result.update();
    result.save();

    // returning the moviments

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

    if ((await req.userId) !== Moviment.user_id) {
      return res
        .status(401)
        .json({ error: "You don't have permission for this moviment" });
    }

    if (!(await schema.isValid())) {
      return res.status(400).json({ error: 'Validation Fails' });
    }

    const moviment = await Moviment.findByPk(req.params.id);

    const { is_earning, valor } = req.body;

    if (!moviment) {
      return res.status(404).json({ error: 'Moviment not found' });
    }

    const result = await Result.findOne({ where: { user_id: req.userId } });

    // put the moviments edit on the result

    if (valor && valor !== moviment.valor) {
      if (is_earning === true) {
        result.result -= await moviment.valor;
        result.result += await valor;
      } else {
        result.result += moviment.valor;
        result.result -= valor;
      }

      result.update();
      result.save();
    } else {
      await moviment.update(req.body);
    }

    // returning the moviments

    return res.json(moviment);
  }

  async delete(req, res) {
    const moviment = await Moviment.findByPk(req.params.id);

    if ((await req.userId) !== moviment.user_id) {
      return res
        .status(401)
        .json({ error: "You don't have permission for this moviment" });
    }

    if (!moviment) {
      return res.status(404).json({ error: 'Moviment not found' });
    }

    const result = await Result.findOne({ where: { user_id: req.userId } });
    console.log(result.user_id);

    if (moviment.is_earning === true) {
      result.result -= await moviment.valor;
    } else {
      result.result += await moviment.valor;
    }

    result.update();
    result.save();

    await moviment.destroy(req.params.id);

    return res.json({ ok: `The moviment ${moviment.name} was deleted` });
  }
}

export default new MovimentController();

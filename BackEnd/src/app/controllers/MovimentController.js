import * as Yup from 'yup';
import Moviment from '../models/Moviment';
import Result from '../models/Result';
import Picture from '../models/Picture';

class MovimentController {
  async list(req, res) {
    const { page = 1 } = req.query;

    const moviment = await Moviment.findAll({
      where: { user_id: req.userId },
      order: ['created_at'],
      limit: 10,
      offset: (page - 1) * 10,
      attributes: [
        'id',
        'name',
        'description',
        'valor',
        'expires',
        'is_earning',
      ],
    });

    if (!moviment) {
      return res.status(404).json({
        error: `The user with id=${req.UserId} does not have any moviment`,
      });
    }

    return res.json(moviment);
  }

  async typeList(req, res) {
    const { page = 1, type } = req.query;

    const moviment = await Moviment.findAll({
      where: { user_id: req.userId, is_earning: type },
      order: ['created_at'],
      limit: 10,
      offset: (page - 1) * 10,
      attributes: [
        'id',
        'name',
        'description',
        'valor',
        'expires',
        'is_earning',
      ],
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

    const { name, description, valor, expires, is_earning } = req.body;

    const { id } = await Moviment.create({
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

    await result.update();
    await result.save();

    const resultTotal = await Result.findOne({
      where: { user_id: req.userId },
      attributes: ['result'],
    });

    // returning the moviments

    return res.json({
      id,
      name,
      description,
      valor,
      expires,
      is_earning,
      user_id,
      resultTotal,
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

    if (!(await schema.isValid())) {
      return res.status(400).json({ error: 'Validation Fails' });
    }

    const moviment = await Moviment.findByPk(req.params.id, {
      attributes: [
        'id',
        'name',
        'description',
        'valor',
        'expires',
        'is_earning',
        'user_id',
        'picture_id',
      ],
    });

    const { is_earning, valor } = req.body;

    if (!moviment) {
      return res.status(404).json({ error: 'Moviment not found' });
    }

    const result = await Result.findOne({ where: { user_id: req.userId } });

    // put the moviments edit on the result

    if (
      (valor && valor !== (await moviment.valor)) ||
      (is_earning && is_earning !== (await moviment.is_earning))
    ) {
      if (is_earning === true) {
        result.result -= await moviment.valor;
        result.result += await valor;
      } else {
        result.result += await moviment.valor;
        result.result -= await valor;
      }

      await result.update();
      await result.save();
    }

    await moviment.update(req.body);
    const { id, name, description, expires, user_id } = await moviment.save();

    const resultTotal = await Result.findOne({
      where: { user_id: req.userId },
      attributes: ['result'],
    });

    // returning the moviments

    return res.json({
      id,
      name,
      description,
      expires,
      is_earning,
      user_id,
      resultTotal,
    });
  }

  async delete(req, res) {
    const moviment = await Moviment.findByPk(req.params.id);

    if (!moviment) {
      return res.status(404).json({ error: 'Moviment not found' });
    }

    if ((await req.userId) !== moviment.user_id) {
      return res
        .status(401)
        .json({ error: "You don't have permission for this moviment" });
    }

    const result = await Result.findOne({ where: { user_id: req.userId } });

    if (moviment.is_earning === true) {
      result.result -= await moviment.valor;
    } else {
      result.result += await moviment.valor;
    }

    await result.update();
    await result.save();

    await moviment.destroy(req.params.id);

    const picture = await Picture.findByPk(moviment.picture_id);

    if (picture) {
      await picture.destroy();
    }

    return res.json({
      ok: `The moviment ${moviment.name} was deleted, Result: ${result.result}`,
    });
  }
}

export default new MovimentController();

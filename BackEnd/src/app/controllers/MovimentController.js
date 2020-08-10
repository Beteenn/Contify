import * as Yup from 'yup';
import { isBefore, parseISO, format } from 'date-fns';
import schedule from 'node-schedule';
import Moviment from '../models/Moviment';
import Result from './ResultController';
import result from '../models/Result';
import Picture from '../models/Picture';
import Notification from '../schemas/Notification';
import Category from '../models/Category';

class MovimentController {
  async list(req, res) {
    const { page = 1 } = req.query;

    const moviment = await Moviment.findAll({
      where: { user_id: req.userId },
      order: ['expires'],
      limit: 5,
      offset: (page - 1) * 5,
      attributes: [
        'id',
        'name',
        'description',
        'valor',
        'category_id',
        'expires',
        'is_earning',
        'paid',
      ],
      include: {
        model: Category,
        attributes: ['name'],
      },
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
      order: ['expires'],
      limit: 5,
      offset: (page - 1) * 5,
      attributes: [
        'id',
        'name',
        'description',
        'valor',
        'category_id',
        'expires',
        'is_earning',
        'paid',
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
      attributes: [
        'name',
        'description',
        'valor',
        'category_id',
        'expires',
        'is_earning',
        'paid',
      ],
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
      valor: Yup.number().positive().required(),
      expires: Yup.date().required(),
      paid: Yup.boolean(),
      category_id: Yup.number(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation Fails' });
    }

    const user_id = req.userId;

    const {
      name,
      description,
      valor,
      expires,
      is_earning,
      paid,
      category_id,
    } = req.body;

    // Validation of category id
    if (category_id) {
      const checkCategoryExists = await Category.findByPk(category_id);
      if (!checkCategoryExists) {
        return res.status(404).json({ error: 'This category does not exists' });
      }
    }

    const { id } = await Moviment.create({
      name,
      description,
      valor,
      expires,
      is_earning,
      user_id,
      paid,
      category_id,
    });

    /**
     * Create notification
     */

    const dateExpires = parseISO(expires);
    const formatDate = format(dateExpires, "'date' dd'/'MM'/'yyyy");

    if (paid === false) {
      if (isBefore(dateExpires, new Date())) {
        return res.status(400).json({ error: 'Past dates are not permitted' });
      }

      schedule.scheduleJob(dateExpires, async function store() {
        await Notification.create({
          content: `The moviment ${name} expires today: ${formatDate}`,
          user: user_id,
        });
      });
    }

    // Changing result
    if (paid === true) {
      await Result.newMoviment(req);
    }

    const resultTotal = await result.findOne({
      where: { user_id: req.userId },
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
      category_id,
      resultTotal,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      description: Yup.string(),
      valor: Yup.number().positive(),
      expires: Yup.date(),
      paid: Yup.boolean(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation Fails' });
    }

    const moviment = await Moviment.findByPk(req.params.id, {
      attributes: [
        'id',
        'name',
        'description',
        'valor',
        'paid',
        'expires',
        'is_earning',
        'user_id',
        'picture_id',
      ],
    });

    if (!moviment) {
      return res.status(404).json({ error: 'Moviment not found' });
    }

    const resultTotal = await Result.editMoviment(req, moviment);

    const {
      id,
      name,
      description,
      expires,
      valor,
      paid,
      is_earning,
      user_id,
    } = await moviment.update(req.body);

    await moviment.save();

    // returning the moviments

    return res.json({
      id,
      name,
      description,
      expires,
      valor,
      paid,
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

    const resultTotal = await Result.deleteMoviment(req, moviment);

    await moviment.destroy(req.params.id);

    const picture = await Picture.findByPk(moviment.picture_id);

    if (picture) {
      await picture.destroy();
    }

    return res.json({
      ok: `The moviment ${moviment.name} was deleted, Result: ${resultTotal.result}`,
    });
  }
}

export default new MovimentController();

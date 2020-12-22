import * as Yup from 'yup';

import { parseISO, format, eachDayOfInterval, endOfMonth } from 'date-fns';
import schedule from 'node-schedule';
import Moviment from '../models/Moviment';
import Picture from '../models/Picture';
import Notification from '../schemas/Notification';
import Category from '../models/Category';
import CreditCard from '../models/CreditCard';
import ResultController from './ResultController';

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

  async listByDate(req, res) {
    const { date } = req.params;
    const daysOfMonth = eachDayOfInterval({
      start: parseISO(date),
      end: endOfMonth(parseISO(date)),
    });
    const month = format(parseISO(date), 'MMMM');

    const moviment = await Moviment.findAll({
      where: {
        user_id: req.userId,
        expires: daysOfMonth,
      },
      attributes: ['name', 'description', 'valor', 'expires', 'is_earning'],
    });

    if (moviment.length === 0)
      return res.status(404).json({
        error: `You do not have moviments in the month of ${month}.`,
      });

    return res.json(moviment);
  }

  async listByCreditCard(req, res) {
    const creditCard = await CreditCard.findByPk(req.params.id);

    if (!creditCard) {
      return res
        .status(404)
        .json({ error: 'This credit card does not exists' });
    }

    const moviments = await Moviment.findAll({
      where: { credit_cards_id: req.params.id, user_id: req.userId },
    });

    if (moviments.length === 0) {
      return res.status(404).json({
        error: `You don't have moviments with the credit card "${creditCard.name}"`,
      });
    }

    return res.json(moviments);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      description: Yup.string(),
      valor: Yup.number().positive().required(),
      expires: Yup.date().required(),
      paid: Yup.boolean(),
      category_id: Yup.number(),
      credit_cards_id: Yup.number(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation Fails' });
    }

    const user_id = req.userId;

    const {
      name,
      description,
      valor,
      is_earning,
      expires,
      paid,
      category_id,
      credit_cards_id,
    } = req.body;

    // Validation of category id
    if (category_id) {
      const checkCategoryExists = await Category.findByPk(category_id);
      if (!checkCategoryExists) {
        return res.status(404).json({ error: 'This category does not exists' });
      }
    }

    if (credit_cards_id) {
      const CheckCreditExists = await CreditCard.findByPk(credit_cards_id);
      if (!CheckCreditExists) {
        return res
          .status(404)
          .json({ error: 'This credit card does not exists' });
      }
    }

    let result;

    if (is_earning) {
      result = await ResultController.insertEarning(req);
    } else {
      result = await ResultController.insertDebit(req);
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
      credit_cards_id,
      result,
    });

    /**
     * Create notification
     */

    const dateExpires = parseISO(expires);
    const formatDate = format(dateExpires, "'date' dd'/'MM'/'yyyy");

    if (paid === false) {
      schedule.scheduleJob(dateExpires, async function store() {
        await Notification.create({
          content: `The moviment ${name} expires today: ${formatDate}`,
          user: user_id,
        });
      });
    }

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
      credit_cards_id,
      result,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      description: Yup.string(),
      valor: Yup.number().positive(),
      category_id: Yup.number().positive(),
      expires: Yup.date(),
      is_earning: Yup.boolean(),
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
        'category_id',
        'paid',
        'expires',
        'is_earning',
        'user_id',
        'picture_id',
        'paid',
        'result',
      ],
    });

    if (!moviment) {
      return res.status(404).json({ error: 'Moviment not found' });
    }

    let { result } = moviment;

    const {
      id,
      name,
      description,
      category_id,
      paid,
      expires,
      user_id,
      picture_id,
      is_earning,
      valor,
    } = req.body;

    // verifying if value or type is different
    if (
      is_earning !== moviment.is_earning ||
      valor !== moviment.valor ||
      moviment.paid !== paid
    ) {
      result = await ResultController.editMoviment(req, moviment);
    }
    await moviment.update({
      id,
      name,
      description,
      valor,
      category_id,
      paid,
      expires,
      is_earning,
      user_id,
      picture_id,
      result,
    });

    await moviment.save();

    // returning the moviments

    return res.json({
      id,
      name,
      description,
      expires,
      valor,
      category_id,
      is_earning,
      user_id,
      paid,
      result,
    });
  }

  async delete(req, res) {
    const moviment = await Moviment.findOne({
      where: {
        user_id: req.userId,
        id: req.params.id,
      },
    });

    if (!moviment) {
      return res.status(404).json({ error: 'Moviment not found' });
    }

    await moviment.destroy(req.params.id);

    const picture = await Picture.findByPk(moviment.picture_id);

    if (picture) {
      await picture.destroy();
    }

    if (moviment.paid || moviment.is_earning) {
      await ResultController.deleteMoviment(req, moviment);
    }

    return res.json({
      ok: `The moviment "${moviment.name}" was deleted.`,
    });
  }
}

export default new MovimentController();

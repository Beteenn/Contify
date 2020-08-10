import * as Yup from 'yup';
import {
  isBefore,
  parseISO,
  format,
  endOfMonth,
  eachDayOfInterval,
} from 'date-fns';
import schedule from 'node-schedule';
import Moviment from '../models/Moviment';
import Result from '../models/Result';
import Picture from '../models/Picture';
import Notification from '../schemas/Notification';
import Category from '../models/Category';
import CreditCard from '../models/CreditCard';

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
      offset: (page - 1) * 5,
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

  async earningResult(req, res) {
    const moviment = await Moviment.findAll({
      where: { user_id: req.userId, is_earning: true },
      attributes: ['name', 'description', 'valor', 'expires', 'is_earning'],
    });

    if (!moviment) {
      return res
        .status(401)
        .json({ error: 'This user dont have moviment of this type' });
    }

    const result = await moviment.reduce((total, x) => total + x.valor, 0);

    return res.json(result);
  }

  async debtResult(req, res) {
    const moviment = await Moviment.findAll({
      where: { user_id: req.userId, is_earning: false },
      attributes: ['name', 'description', 'valor', 'expires', 'is_earning'],
    });

    if (!moviment) {
      return res
        .status(401)
        .json({ error: 'This user dont have moviment of this type' });
    }

    const result = await moviment.reduce((total, x) => total + x.valor, 0);

    return res.json(result);
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
    });

    // put the moviment on result

    const result = await Result.findOne({ where: { user_id: req.userId } });

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
    } else if (is_earning === true) {
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
      category_id,
      credit_cards_id,
      resultTotal,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      description: Yup.string(),
      valor: Yup.number().positive(),
      expires: Yup.date(),
      is_earning: Yup.boolean(),
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
        'expires',
        'is_earning',
        'user_id',
        'picture_id',
      ],
    });

    if (!moviment) {
      return res.status(404).json({ error: 'Moviment not found' });
    }

    const user_id = req.userId;
    const { is_earning, valor } = req.body;

    const result = await Result.findOne({ where: { user_id: req.userId } });

    // put the moviments edit on the result
    if (valor || is_earning) {
      if (is_earning === (await moviment.is_earning)) {
        if (is_earning === true) {
          result.result -= await moviment.valor;
          result.result += await valor;
        } else {
          result.result += await moviment.valor;
          result.result -= await valor;
        }
      } else if (is_earning === true) {
        result.result += await moviment.valor;
        result.result += await valor;
      } else {
        result.result -= await moviment.valor;
        result.result -= await valor;
      }

      await result.update();
      await result.save();
    }

    await moviment.update(req.body);

    const { id, name, description, expires } = await moviment.save();

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
      valor,
      is_earning,
      user_id,
      resultTotal,
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

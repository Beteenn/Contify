import Result from '../models/Result';
import Moviment from '../models/Moviment';

class ResultController {
  async index(req, res) {
    const id = req.userId;
    const result = await Result.findOne({
      where: { user_id: id },
      attributes: ['id', 'user_id', 'result'],
    });

    if (!result) {
      return res.status(404).json({ error: 'Criation of result fails' });
    }

    return res.json(result);
  }

  async earningResult(req, res) {
    const moviment = await Moviment.findAll({
      where: { user_id: req.userId, is_earning: true },
      attributes: ['name', 'description', 'valor', 'expires', 'is_earning'],
    });

    if (!moviment) {
      return res
        .status(404)
        .json({ error: 'This user dont have moviment of this type' });
    }

    const result = await moviment.reduce((total, x) => total + x.valor, 0);

    return res.json(result);
  }

  async debitResult(req, res) {
    const moviment = await Moviment.findAll({
      where: { user_id: req.userId, is_earning: false },
      attributes: ['name', 'description', 'valor', 'expires', 'is_earning'],
    });

    if (!moviment) {
      return res
        .status(404)
        .json({ error: 'This user dont have moviment of this type' });
    }

    const result = await moviment.reduce((total, x) => total + x.valor, 0);

    return res.json(result);
  }

  async newMoviment(req) {
    const { is_earning, valor } = req.body;

    // put the moviment on result
    const result = await Result.findOne({ where: { user_id: req.userId } });

    if (is_earning === true) {
      result.result += valor;
    }

    if (is_earning === false) {
      result.result -= valor;
    }

    await result.update();
    await result.save();

    return result;
  }

  async editMoviment(req, moviment) {
    const { valor, paid } = req.body;

    const result = await Result.findOne({ where: { user_id: req.userId } });

    // put the moviments edit on the result
    if (paid === true) {
      if ((await moviment.is_earning) === true) {
        if (paid === (await moviment.paid)) {
          result.result -= await moviment.valor;
        }
        valor
          ? (result.result += valor)
          : (result.result += await moviment.valor);
      }

      if ((await moviment.is_earning) === false) {
        if (paid === (await moviment.paid)) {
          result.result += await moviment.valor;
        }
        valor
          ? (result.result -= valor)
          : (result.result -= await moviment.valor);
      }
    }
    if (paid === false) {
      if (moviment.is_earning === true) {
        if (paid !== (await moviment.paid)) {
          result.result -= await moviment.valor;
        }
      }

      if (moviment.is_earning === false) {
        if (paid !== (await moviment.paid)) {
          result.result += await moviment.valor;
        }
      }
    }

    await result.update();
    await result.save();

    return result;
  }

  async deleteMoviment(req, moviment) {
    const result = await Result.findOne({ where: { user_id: req.userId } });

    if (moviment.is_earning === true) {
      result.result -= await moviment.valor;
    } else {
      result.result += await moviment.valor;
    }

    await result.update();
    await result.save();

    return result;
  }
}
export default new ResultController();

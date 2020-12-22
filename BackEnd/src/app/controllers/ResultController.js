import User from '../models/User';

class ResultController {
  async insertEarning(req) {
    const currentUser = await User.findByPk(req.userId);
    currentUser.result += req.body.valor;

    await currentUser.save();

    return currentUser.result;
  }

  async insertDebit(req) {
    const currentUser = await User.findByPk(req.userId);

    if (!req.body.paid) {
      return currentUser.result;
    }

    currentUser.result -= req.body.valor;

    await currentUser.save();

    return currentUser.result;
  }

  async editMoviment(req, moviment) {
    const { is_earning, valor, paid } = req.body;
    const currentUser = await User.findByPk(req.userId);

    if (moviment.is_earning) {
      if (is_earning) {
        currentUser.result -= moviment.valor;
        currentUser.result += valor;
      } else if (paid) {
        currentUser.result -= moviment.valor;
        currentUser.result -= valor;
      } else {
        currentUser.result -= moviment.valor;
      }
    } else if (is_earning) {
      if (moviment.paid) {
        currentUser.result += moviment.valor;
        currentUser.result += valor;
      } else {
        currentUser.result += valor;
      }
    } else if (moviment.paid && paid) {
      currentUser.result += moviment.valor;
      currentUser.result -= valor;
    } else if (moviment.paid && !paid) {
      currentUser.result += moviment.valor;
    } else if (paid) {
      currentUser.result -= valor;
    }
    await currentUser.save();

    return currentUser.result;
  }

  async deleteMoviment(req, moviment) {
    const currentUser = await User.findByPk(req.userId);

    if (moviment.is_earning) {
      currentUser.result -= moviment.valor;
    } else {
      currentUser.result += moviment.valor;
    }

    await currentUser.save();
  }
}

export default new ResultController();

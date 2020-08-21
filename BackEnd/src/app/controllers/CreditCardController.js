import * as Yup from 'yup';
import CreditCard from '../models/CreditCard';
import CreditCompany from '../models/CreditCompany';

class CreditCardController {
  async list(req, res) {
    const creditCard = await CreditCard.findAll({
      where: { user_id: req.userId },
    });

    if (creditCard.length === 0) {
      return res
        .status(404)
        .json({ error: "You don't have credit cards registered yet" });
    }

    return res.json(creditCard);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      expires: Yup.date().required(),
      close_invoice: Yup.date().required(),
      limit: Yup.number().required(),
      company_id: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json('Validation Fails');
    }

    const { name, expires, close_invoice, limit, company_id } = req.body;

    const company = await CreditCompany.findByPk(company_id);

    if (!company)
      return res.status(404).json({ error: 'This company is not registered' });

    const creditCard = await CreditCard.create({
      user_id: req.userId,
      company_id,
      name,
      expires,
      limit,
      close_invoice,
    });

    return res.json(creditCard);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      expires: Yup.date(),
      close_invoice: Yup.date(),
      limit: Yup.number(),
      company_id: Yup.number(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json('Validation fails');
    }

    const creditCard = await CreditCard.findByPk(req.params.id);

    if (!creditCard) {
      return res
        .status(404)
        .json({ error: 'This credit card does not exists' });
    }

    if (req.body.company_id) {
      const company = await CreditCompany.findByPk(req.body.company_id);
      if (!company) {
        return res
          .status(404)
          .json({ error: 'This company is not registered' });
      }
    }
    await creditCard.update(req.body);

    return res.json(creditCard);
  }

  async delete(req, res) {
    const creditCard = await CreditCard.findByPk(req.params.id);

    if (creditCard.user_id !== req.userId) {
      return res
        .status(400)
        .json({ error: 'You do not have permission for this moviment' });
    }

    if (!creditCard)
      return res
        .status(404)
        .json({ error: 'This credit card does not exists' });

    await creditCard.destroy();

    return res.json(`The credit card ${creditCard.name} was deleted`);
  }
}

export default new CreditCardController();

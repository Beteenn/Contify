import * as Yup from 'yup';
import CreditCompany from '../models/CreditCompany';

class CreditCompanyController {
  async list(req, res) {
    const company = await CreditCompany.findAll();

    if (company.length === 0) {
      return res.status(404).json({ error: 'Theres no company registered' });
    }

    return res.json(company);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body)))
      return res.status(400).json({ error: 'Validation Fails' });

    const { name } = req.body;

    const validateEqual = await CreditCompany.findOne({ where: { name } });

    if (validateEqual)
      return res.status(400).json({ error: 'This company already exists' });

    const company = await CreditCompany.create(req.body);

    return res.json(company);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
    });

    if (!(await schema.isValid(req.body)))
      return res.status(400).json({ error: 'Validation Fails' });

    const company = await CreditCompany.findByPk(req.params.id);

    const { name } = req.body;

    const validateEqual = await CreditCompany.findOne({ where: { name } });

    if (validateEqual)
      return res.status(400).json({ error: 'This company already exists' });

    await company.update(req.body);

    return res.json(company);
  }

  async delete(req, res) {
    const company = await CreditCompany.findByPk(req.params.id);

    if (!company)
      return res.status(404).json({ error: 'This company does not exists' });

    await company.destroy();

    return res.json(`The company ${company.name} was deleted`);
  }
}

export default new CreditCompanyController();

import * as Yup from 'yup';
import Category from '../models/Category';
import Moviment from '../models/Moviment';

class CategoryController {
  async list(req, res) {
    const category = await Category.findAll({
      where: { user_id: req.userId },
      attributes: ['id', 'name'],
    });

    if (!category) {
      return res
        .status(404)
        .json({ error: 'You do not have categorys created yet' });
    }

    return res.json(category);
  }

  async index(req, res) {
    const categorys = Moviment.findAll({
      where: {
        category_id: req.params.id,
      },
    });

    if (categorys) {
      return res
        .status(404)
        .json({ error: "You don't have moviments with this category" });
    }

    return res.json(categorys);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validations fails' });
    }

    const { name } = req.body;
    const user_id = req.userId;

    const category = await Category.findOne({ where: { user_id, name } });

    if (category) {
      return res.status(404).json({ error: 'This category already exists' });
    }

    const newCategory = await Category.create({ name, user_id });

    return res.json(newCategory);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validations fails' });
    }

    const category = await Category.findByPk(req.params.id);

    if (!category) {
      return res.status(404).json({ error: 'This category does not exists' });
    }

    const { name } = req.body;

    const checkCategoryExists = await Category.findOne({ where: { name } });

    if (checkCategoryExists) {
      return res.status(404).json({ error: 'This category already exists' });
    }

    const newCategory = await category.update(req.body);

    return res.json(newCategory);
  }

  async delete(req, res) {
    const category = await Category.findByPk(req.params.id);

    if (!category) {
      return res.status(404).json({ error: 'This category does not exists ' });
    }

    await category.destroy();

    return res.json({ ok: `The category ${category.name} was deleted` });
  }
}

export default new CategoryController();

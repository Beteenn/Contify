import Picture from '../models/Picture';

class PictureController {
  async store(req, res) {
    const { originalname: name, filename: path } = req.file;

    const picture = await Picture.create({
      name,
      path,
    });

    return res.json(picture);
  }

  async update(req, res) {
    const { originalname: name, filename: path } = req.file;

    const checkPictureExists = await Picture.findByPk(req.params.id);

    if ((await checkPictureExists) === null) {
      return res.status(404).json({ error: 'This picture dont exists' });
    }

    await checkPictureExists.update({
      name,
      path,
    });

    return res.json(checkPictureExists);
  }

  async delete(req, res) {
    const picture = await Picture.findByPk(req.params.id);

    if (!picture) {
      return res.status(404).json({ error: 'File not found' });
    }

    await picture.destroy();

    return res.json({ message: 'The file was deleted' });
  }
}

export default new PictureController();

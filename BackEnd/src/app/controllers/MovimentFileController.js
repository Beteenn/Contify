import MovimentFile from '../models/MovimentFile';

class MovimentFileController {
  async store(req, res) {
    const { originalname: name, filename: path } = req.file;

    const picture = await MovimentFile.create({
      name,
      path,
    });

    return res.json(picture);
  }

  async delete(req, res) {
    const picture = await MovimentFile.findByPk(req.params.id);

    if (!picture) {
      return res.status(404).json({ error: 'File not found' });
    }

    await picture.destroy();

    return res.json({ message: 'The file was deleted' });
  }
}

export default new MovimentFileController();

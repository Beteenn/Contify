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
}

export default new MovimentFileController();

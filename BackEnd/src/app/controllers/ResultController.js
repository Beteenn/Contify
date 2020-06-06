import Result from '../models/Result';

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
}
export default new ResultController();

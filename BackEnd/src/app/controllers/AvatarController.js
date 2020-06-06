import Avatar from '../models/Avatar';
import User from '../models/User';

class AvatarController {
  async store(req, res) {
    const { originalname: name, filename: path } = req.file;

    const avatar = await Avatar.create({
      name,
      path,
    });

    return res.json(avatar);
  }

  async update(req, res) {
    const { originalname: name, filename: path } = req.file;

    const checkAvatarExists = await User.findByPk(req.userId);

    if ((await checkAvatarExists.avatar_id) === null) {
      return res
        .status(401)
        .json({ error: 'First you need to create a avatar' });
    }

    const avatar = await Avatar.findByPk(checkAvatarExists.avatar_id);

    await avatar.update({
      name,
      path,
    });

    return res.json(avatar);
  }

  async delete(req, res) {
    const checkAvatarExists = await User.findByPk(req.userId);

    if (checkAvatarExists.avatar_id === null) {
      return res.status(401).json({ error: 'Avatar ot found' });
    }

    const avatar = await Avatar.findByPk(checkAvatarExists.avatar_id);

    await avatar.destroy();

    return res.json({
      ok: `The avatar from ${checkAvatarExists.name} from was deleted`,
    });
  }
}

export default new AvatarController();

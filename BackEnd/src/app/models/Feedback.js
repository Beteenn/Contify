import Sequelize, { Model } from 'sequelize';

class Feedback extends Model {
  static init(sequelize) {
    super.init(
      {
        user_email: Sequelize.STRING,
        description: Sequelize.STRING,
        read: Sequelize.BOOLEAN,
      },
      {
        sequelize,
      }
    );

    return this;
  }
}

export default Feedback;

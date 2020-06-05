import Sequelize, { Model } from 'sequelize';

class Result extends Model {
  static init(sequelize) {
    super.init(
      {
        result: Sequelize.DOUBLE,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id' });
  }
}

export default Result;

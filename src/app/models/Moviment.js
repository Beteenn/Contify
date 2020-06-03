import Sequelize, { Model } from 'sequelize';

class Moviment extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        description: Sequelize.STRING,
        valor: Sequelize.NUMBER,
        expires: Sequelize.DATE,
        is_earning: Sequelize.BOOLEAN,
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

export default Moviment;

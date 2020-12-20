import Sequelize, { Model } from 'sequelize';

class Moviment extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        description: Sequelize.STRING,
        valor: Sequelize.DOUBLE,
        expires: Sequelize.DATE,
        category_id: Sequelize.BIGINT,
        is_earning: Sequelize.BOOLEAN,
        paid: Sequelize.BOOLEAN,
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
    this.belongsTo(models.Picture, { foreignKey: 'picture_id' });
    this.belongsTo(models.Category, { foreignKey: 'category_id' });
    this.belongsTo(models.CreditCard, { foreignKey: 'credit_cards_id' });
  }
}

export default Moviment;

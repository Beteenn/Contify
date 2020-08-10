import Sequelize, { Model } from 'sequelize';

class CreditCard extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        expires: Sequelize.DATEONLY,
        close_invoice: Sequelize.DATEONLY,
        limit: Sequelize.DOUBLE,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id' });
    this.belongsTo(models.CreditCompany, { foreignKey: 'company_id' });
  }
}

export default CreditCard;

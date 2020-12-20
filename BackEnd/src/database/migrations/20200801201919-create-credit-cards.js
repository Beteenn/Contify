module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('credit_cards', {
      id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      user_id: {
        type: Sequelize.BIGINT,
        references: { model: 'users', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: false,
      },
      company_id: {
        type: Sequelize.BIGINT,
        references: { model: 'credit_companies', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      expires: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      close_invoice: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      limit: {
        type: Sequelize.DOUBLE,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: (queryInterface) => {
    return queryInterface.dropTable('credit_cards');
  },
};

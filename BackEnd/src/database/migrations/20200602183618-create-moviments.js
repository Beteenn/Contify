module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('moviments', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: { model: 'users', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      valor: {
        type: Sequelize.DOUBLE,
        allowNull: false,
      },
      paid: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      expires: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      is_earning: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
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
    return queryInterface.dropTable('moviments');
  },
};

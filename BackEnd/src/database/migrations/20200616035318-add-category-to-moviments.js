module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('moviments', 'category_id', {
      type: Sequelize.INTEGER,
      references: { model: 'categories', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
      allowNull: true,
    });
  },

  down: (queryInterface) => {
    return queryInterface.removeColumn('moviments', 'category_id');
  },
};

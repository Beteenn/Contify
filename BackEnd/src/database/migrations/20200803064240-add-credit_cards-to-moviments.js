module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('moviments', 'credit_cards_id', {
      type: Sequelize.INTEGER,
      references: { model: 'credit_cards', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
      allowNull: true,
    });
  },

  down: (queryInterface) => {
    return queryInterface.removeColumn('moviments', 'credit_cards_id');
  },
};

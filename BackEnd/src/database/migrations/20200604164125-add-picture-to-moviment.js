module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('moviments', 'picture_id', {
      type: Sequelize.BIGINT,
      references: { model: 'pictures', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
      allowNull: true,
    });
  },

  down: (queryInterface) => {
    return queryInterface.removeColumn('moviments', 'picture_id');
  },
};

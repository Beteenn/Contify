module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('moviments', 'picture_id', {
      type: Sequelize.INTEGER,
      references: { model: 'moviment_files', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
      allowNull: true,
    });
  },

  down: (queryInterface) => {
    return queryInterface.removeColumn('moviments', 'picture_id');
  },
};

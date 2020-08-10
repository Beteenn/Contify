module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert(
      'credit_companies',
      [
        {
          name: 'Cruzeiro do Sul',
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: (queryInterface) => {
    return queryInterface.bulkDelete('credit_companies', null, {});
  },
};

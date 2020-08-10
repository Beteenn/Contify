module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert(
      'credit_companies',
      [
        {
          name: 'Hipercard',
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

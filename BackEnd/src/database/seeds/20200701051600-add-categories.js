module.exports = {
  up: (QueryInterface) => {
    return QueryInterface.bulkInsert(
      'categories',
      [
        {
          name: 'salário',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Investimentos',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Transferência',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Contas',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Alimentação',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Compras',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Lazer',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Saúde',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Carros',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Concertos',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Viagem',
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: (queryInterface) => {
    return queryInterface.bulkDelete('Users', null, {});
  },
};

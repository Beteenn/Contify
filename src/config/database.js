module.exports = {
  dialect: 'postgres',
  host: 'localhost',
  username: 'postgres',
  password: 'docker',
  database: 'MyFinances',
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};

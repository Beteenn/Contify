import Sequelize from 'sequelize';

import User from '../app/models/User';
import Moviment from '../app/models/Moviment';
import Picture from '../app/models/Picture';
import Avatar from '../app/models/Avatar';
import Feedback from '../app/models/Feedback';

import databaseConfig from '../config/database';
import Result from '../app/models/Result';

const models = [User, Moviment, Picture, Result, Avatar, Feedback];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models
      .map((model) => model.init(this.connection))
      .map(
        (model) => model.associate && model.associate(this.connection.models)
      );
  }
}

export default new Database();

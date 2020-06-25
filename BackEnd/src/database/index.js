import Sequelize from 'sequelize';
import mongoose from 'mongoose';

import User from '../app/models/User';
import Moviment from '../app/models/Moviment';
import Picture from '../app/models/Picture';
import Avatar from '../app/models/Avatar';
import Feedback from '../app/models/Feedback';

import databaseConfig from '../config/database';
import Result from '../app/models/Result';
import Category from '../app/models/Category';

const models = [User, Moviment, Picture, Result, Avatar, Category, Feedback];

class Database {
  constructor() {
    this.init();
    this.mongo();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models
      .map((model) => model.init(this.connection))
      .map(
        (model) => model.associate && model.associate(this.connection.models)
      );
  }

  mongo() {
    this.mongoConnection = mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useFindAndModify: true,
      useUnifiedTopology: true,
    });
  }
}

export default new Database();

import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import passport from 'passport';
import routes from './routes';

import './database';

class App {
  constructor() {
    this.server = express();

    this.middleware();
    this.routes();
    this.passport();
  }

  middleware() {
    this.server.use(express.json());
    this.server.use(cors());
  }

  routes() {
    this.server.use(routes);
  }

  passport() {
    this.server.use(passport.initialize());
  }
}

export default new App().server;

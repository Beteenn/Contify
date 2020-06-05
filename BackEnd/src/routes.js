import { Router } from 'express';

import SessionController from './app/controllers/SessionController';
import UserController from './app/controllers/UserController';
import MovimentController from './app/controllers/MovimentController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/sessions', SessionController.store);

routes.post('/users', UserController.store);

routes.use(authMiddleware);

routes.post('/moviments', MovimentController.store);

routes.get('/users', UserController.list);
routes.get('/users/:id', UserController.index);
routes.put('/users/:id', UserController.update);
routes.delete('/users/:id', UserController.delete);

routes.get('/moviments', MovimentController.list);
routes.get('/moviments/:id', MovimentController.index);
routes.put('/moviments/:id', MovimentController.update);

routes.delete('/moviments/:id', MovimentController.delete);

export default routes;

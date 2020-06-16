import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import SessionController from './app/controllers/SessionController';
import UserController from './app/controllers/UserController';
import MovimentController from './app/controllers/MovimentController';
import PictureController from './app/controllers/PictureController';
import ResultController from './app/controllers/ResultController';
import AvatarController from './app/controllers/AvatarController';
import CategoryController from './app/controllers/CategoryController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();
const upload = multer(multerConfig);

// Rotas que não necessitam login
routes.post('/sessions', SessionController.store);

routes.post('/users', UserController.store);

routes.use(authMiddleware);

// Rotas que necessitam de login
routes.use(authMiddleware);

// Rotas User
routes.get('/users', UserController.list);
routes.get('/users/:id', UserController.index);
routes.put('/users/:id', UserController.update);
routes.delete('/users/:id', UserController.delete);

// Rotas Moviment
routes.get('/moviments/', MovimentController.list);
routes.get('/moviments/', MovimentController.typeList);
routes.get('/moviments/:id', MovimentController.index);
routes.post('/moviments', MovimentController.store);
routes.put('/moviments/:id', MovimentController.update);
routes.delete('/moviments/:id', MovimentController.delete);

// Rotas moviment File
routes.post('/picture', upload.single('file'), PictureController.store);
routes.put('/picture/:id', upload.single('file'), PictureController.update);
routes.delete('/picture/:id', PictureController.delete);

// Rotas avatar
routes.post('/avatar', upload.single('file'), AvatarController.store);
routes.put('/avatar', upload.single('file'), AvatarController.update);
routes.delete('/avatar', AvatarController.delete);

// Rotas result
routes.get('/result', ResultController.index);

// Rotas Category
routes.get('/category', CategoryController.list);
routes.post('/category', CategoryController.store);
routes.put('/category/:id', CategoryController.update);
routes.delete('/category/:id', CategoryController.delete);

export default routes;

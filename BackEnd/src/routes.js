import { Router } from 'express';
import multer from 'multer';
import passport from 'passport';
import passportConfig from './config/passport';
import multerConfig from './config/multer';

import SessionController from './app/controllers/SessionController';
import UserController from './app/controllers/UserController';
import MovimentController from './app/controllers/MovimentController';
import PictureController from './app/controllers/PictureController';
import FeedbackController from './app/controllers/FeedbackController';
import AvatarController from './app/controllers/AvatarController';
import CategoryController from './app/controllers/CategoryController';
import NotificationController from './app/controllers/NotificationController';
import CreditCardController from './app/controllers/CreditCardController';
import CreditCompanyController from './app/controllers/CreditCompanyController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();
const upload = multer(multerConfig);
const passportGoogle = passport.authenticate('googleToken', { session: false });

// Rotas que não necessitam login
routes.post('/auth', SessionController.store);
routes.post('/forgot-password', SessionController.forgotPassword);
routes.post('/reset-password/:token', SessionController.resetPassword);
routes.post('/session/google');
routes.post(
  '/auth/google',
  passportGoogle,
  SessionController.storeGoogleSession
);
routes.get('/feedbacks', FeedbackController.list);
routes.put('/feedbacks/:id', FeedbackController.update);
routes.delete('/feedbacks/:id', FeedbackController.delete);

routes.post('/users', UserController.store);

// Rotas que necessitam de login
routes.use(authMiddleware);

// Rotas User
routes.get('/users', UserController.list);
routes.get('/users/:id', UserController.index);
routes.put('/users/:id', UserController.update);
routes.delete('/users', UserController.delete);

// Rotas Moviment
routes.get('/moviments/', MovimentController.list);
routes.get('/moviments/type', MovimentController.typeList);
routes.get('/moviments/listById/:id', MovimentController.index);
routes.get('/moviments/listByMonth/:date', MovimentController.listByDate);
routes.get(
  '/moviments/listByCreditCard/:id',
  MovimentController.listByCreditCard
);
routes.get(
  '/moviments/listUnpaidMoviments',
  MovimentController.listUnpaidMoviments
);
routes.post('/moviments', MovimentController.store);
routes.put('/moviments/updateMoviment/:id', MovimentController.update);
routes.put('/moviments/payMoviment/:id', MovimentController.payMoviment);
routes.delete('/moviments/:id', MovimentController.delete);

// Rotas moviment File
routes.post('/picture', upload.single('file'), PictureController.store);
routes.put('/picture/:id', upload.single('file'), PictureController.update);
routes.delete('/picture/:id', PictureController.delete);

// Rotas avatar
routes.post('/avatar', upload.single('file'), AvatarController.store);
routes.put('/avatar', upload.single('file'), AvatarController.update);
routes.delete('/avatar', AvatarController.delete);

// Rotas Category
routes.get('/category', CategoryController.list);
routes.get('/category/:id', CategoryController.index);
routes.post('/category', CategoryController.store);
routes.put('/category/:id', CategoryController.update);
routes.delete('/category/:id', CategoryController.delete);

// Rotas feedback
routes.post('/feedbacks', FeedbackController.store);

// Rotas Notification
routes.get('/notification', NotificationController.index);

// Rotas Credit cards
routes.get('/creditCard', CreditCardController.list);
routes.post('/creditCard', CreditCardController.store);
routes.put('/creditCard/:id', CreditCardController.update);
routes.delete('/creditCard/:id', CreditCardController.delete);

// Rotas Credit companys
routes.get('/creditCompany', CreditCompanyController.list);
routes.post('/creditCompany', CreditCompanyController.store);
routes.put('/creditCompany/:id', CreditCompanyController.update);
routes.delete('/creditCompany/:id', CreditCompanyController.delete);

export default routes;

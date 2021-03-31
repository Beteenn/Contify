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
routes.post('/forgotPassword', SessionController.forgotPassword);
routes.post('/resetPassword', SessionController.resetPassword);
routes.post('/session/google');
routes.post('/auth/google');
routes.get('/feedbacks/listFeedbacks', FeedbackController.list);
routes.put('/feedbacks/editFeedbacks', FeedbackController.update);
routes.delete('/feedbacks/deleteFeedbacks', FeedbackController.delete);

routes.post(
  '/auth/google',
  passportGoogle,
  SessionController.storeGoogleSession
);

routes.post('users/addUser', UserController.store);

// Rotas que necessitam de login
routes.use(authMiddleware);

// Rotas User
routes.get('/users/listUsers', UserController.list);
routes.get('/users/getUserbyId', UserController.index);
routes.put('/users/editUser', UserController.update);
routes.delete('/users/deleteUser', UserController.delete);

// Rotas Moviment
routes.get('/moviments/listMoviments', MovimentController.list);
routes.get('/moviments/listByType', MovimentController.typeList);
routes.get('/moviments/getMovimentById', MovimentController.index);
routes.get('/moviments/listByMonth', MovimentController.listByDate);
routes.get('/moviments/listByCreditCard', MovimentController.listByCreditCard);
routes.post('/moviments/addMoviment', MovimentController.store);
routes.put('/moviments/editMoviment', MovimentController.update);
routes.delete('/moviments/deleteMoviment', MovimentController.delete);

// Rotas moviment File
routes.post(
  '/picture/addPicture',
  upload.single('file'),
  PictureController.store
);
routes.put(
  '/picture/editPicture',
  upload.single('file'),
  PictureController.update
);
routes.delete('/picture/deletePicture', PictureController.delete);

// Rotas avatar
routes.post('/avatar/addAvatar', upload.single('file'), AvatarController.store);
routes.put(
  '/avatar/editAvatar',
  upload.single('file'),
  AvatarController.update
);
routes.delete('/avatar/deleteAvatar', AvatarController.delete);

// Rotas Category
routes.get('/category/listCategories', CategoryController.list);
routes.get('/category/getCategoriesById', CategoryController.index);
routes.post('/category/addCategory', CategoryController.store);
routes.put('/category/editCategory', CategoryController.update);
routes.delete('/category/deleteCategory', CategoryController.delete);

// Rotas feedback
routes.post('/feedbacks/addFeedbacks', FeedbackController.store);

// Rotas Notification
routes.get('/notification/listNotification', NotificationController.list);

// Rotas Credit cards
routes.get('/creditCard/listCreditCards', CreditCardController.list);
routes.post('/creditCard/addCreditCards', CreditCardController.store);
routes.put('/creditCard/editCreditCards', CreditCardController.update);
routes.delete('/creditCard/deleteCreditCards', CreditCardController.delete);

// Rotas Credit companys
routes.get('/creditCompany/listCreditCompany', CreditCompanyController.list);
routes.post('/creditCompany/addCreditCompany', CreditCompanyController.store);
routes.put('/creditCompany/editCreditCompany', CreditCompanyController.update);
routes.delete(
  '/creditCompany/deleteCreditCompany',
  CreditCompanyController.delete
);

export default routes;

import passport from 'passport';
import GooglePlusTokenStrategy from 'passport-google-plus-token';
import UserRepository from '../app/models/User';
import UserController from '../app/controllers/UserController';

require('dotenv').config();

passport.use(
  'googleToken',
  new GooglePlusTokenStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        console.log('IdGoogle: ', profile.id);
        console.log('Nome: ', profile.displayName);
        console.log('Email: ', profile.emails[0].value);

        let userExists = await UserRepository.findOne({
          where: { id_google: profile.id },
        });

        console.log(userExists);

        if (userExists) {
          userExists = userExists.dataValues;
        }

        if (!userExists) {
          console.log('Usuario não encontrado, criando...');
          userExists = await UserController.storeGoogleUser(profile);

          console.log('Usuario criado');
          console.log('created user: ', userExists);
          console.log('Saindo da função');
        }

        console.log('Usuario já existe!!!!!!');
        console.log('User: ', userExists);
        console.log('Saindo da função');

        return done(null, userExists);
      } catch (error) {
        done(error, false, error.message);
      }
    }
  )
);

// handlerJwtPassport.js

import { Strategy, ExtractJwt } from 'passport-jwt';
import { user as userModel } from '../services/user.js';
import { prismaHandledErrors } from '../models/errorDatabaseClass.js';

export default (passport) => {
  const options = {};
  options.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
  options.secretOrKey = process.env.SECRET;
  passport.use(
    new Strategy(options, async (jwtPayload, done) => {
      try {
        const responseInfo = await userModel.findById(jwtPayload.id);
        if (!responseInfo.success) {
          // Handle authentication failure
          return done(null, false);
        }
        // Authentication successful, return user data
        return done(null, responseInfo.data);
      } catch (error) {
        // Handle other errors
        prismaHandledErrors(error.toString());
        return done(error, false);
      }
    })
  );
};

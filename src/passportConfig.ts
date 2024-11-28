import argon2 from 'argon2';
import { Strategy as LocalStrategy } from 'passport-local';
import passport from 'passport';
import { Request, Response, NextFunction } from 'express';

// Define global Express.User type
declare global {
  namespace Express {
    interface User {
      id: string;
      email: string;
      password: string;
      role:string;
    }
  }
}

// User type definition
interface User {
  id: string;
  email: string;
  password: string;
  role: string;
}

// Initialize Passport
function initialize(
  passport: passport.PassportStatic,
  getUserByEmail: (email: string) => Promise<User | null>,
  getUserById: (id: string) => Promise<User | null>,
) {
  const authenticateUser = async (
    email: string,
    password: string,
    done: (
      error: any,
      user?: Express.User | false,
      options?: { message: string },
    ) => void,
  ) => {
    const user = await getUserByEmail(email);

    
    console.log(user)


    if (!user) {
      return done(null, false, { message: 'No user with that email' });
    }

    try {
      const isMatch = await argon2.verify(user.password, password);
      if (isMatch) {
        return done(null, user); // Passport expects Express.User
      } else {
        return done(null, false, { message: 'Password is incorrect' });
      }
    } catch (e) {
      return done(e);
    }
  };

  passport.use(new LocalStrategy({ usernameField: 'email' }, authenticateUser));

  passport.serializeUser((user: Express.User, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id: string, done) => {
    try {
      const user = await getUserById(id);
      if (!user) {
        return done(new Error('User not found'));
      }
      done(null, user as Express.User);
    } catch (error) {
      done(error);
    }
  });
}

// Middleware to check if a user is authenticated
function checkAuthenticated(req: Request, res: Response, next: NextFunction) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('admin');
}

// Middleware to check if a user is not authenticated
function checkNotAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (req.isAuthenticated()) {
    return res.redirect('/');
  }
  next();
}

export { initialize, checkAuthenticated, checkNotAuthenticated };
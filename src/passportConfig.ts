import argon2 from 'argon2';
import { Strategy as LocalStrategy } from 'passport-local';
import passport from 'passport';
import { Request, Response, NextFunction } from 'express';

interface User {
    id: string;
    email: string;
    password: string;
}

function initialize(
    passport: passport.PassportStatic,
    getUserByEmail: (email: string) => Promise<User | null>,
    getUserById: (id: string) => Promise<User | null>
) {
    const authenticateUser = async (email: string, password: string, done: (error: any, user?: User | false, options?: { message: string }) => void) => {
        const user = await getUserByEmail(email);
        if (user == null) {
            return done(null, false, { message: 'No user with that email' });
        }
        console.log('User object:', user);

        // Check if the password hash is valid before verifying
        if (!user.password || typeof user.password !== 'string' || user.password.trim() === '') {
            return done(null, false, { message: 'Invalid or missing password hash' });
        }

        try {
            const isMatch = await argon2.verify(user.password, password);
            if (isMatch) {
                return done(null, user);
            } else {
                return done(null, false, { message: 'Password is incorrect' });
            }
        } catch (e) {
            return done(e);
        }
    };

    passport.use(new LocalStrategy({ usernameField: 'email' }, authenticateUser));

    passport.serializeUser((user: User, done) => {
        done(null, user.id);
    });

    passport.deserializeUser(async (id: string, done) => {
        try {
            const user = await getUserById(id);
            return done(null, user);
        } catch (error) {
            return done(error);
        }
    });
}

function checkAuthenticated(req: Request, res: Response, next: NextFunction) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
}

function checkNotAuthenticated(req: Request, res: Response, next: NextFunction) {
    if (req.isAuthenticated()) {
        return res.redirect('/');
    }
    next();
}

// Export all functions together
export {
    initialize,
    checkAuthenticated,
    checkNotAuthenticated
};

import express, { NextFunction, Request, Response } from 'express';
import passport from 'passport';
import User from '../models/user'; // Import the User model
import { initialize } from '../passportConfig';

const router = express.Router();

// Initialize Passport with the correct MongoDB query functions
initialize(
    passport,
    async (email: string) => {
        return await User.findOne({ email: email });
    },
    async (id: string) => {
        return await User.findById(id);
    }
    
);

// Route for loading the login page
router.get('/',  (req: Request, res: Response): void => {
    res.render('adminLogin',{layout: false});
});


router.post("/", (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate("local", (err, user, info) => {
        if (err) return next(err);
        if (!user) return res.redirect("/login");

         // Log the user object to check its properties
        console.log("Authenticated User:", user);
        console.log("User Type:", user.userType);

        req.logIn(user, (err) => {
            if (err) return next(err);

            req.logIn(user, (err) => {
                if (err) return next(err);
    
                // Ensure userType is properly read
                if (user.userType?.trim() === "Admin") {
                    console.log("Redirecting to admin dashboard...");
                    return res.redirect(`/dashboard?id=${user._id}`);
                } else {
                    console.log("Redirecting to home page...");
                    return res.redirect(`/?id=${user._id}`);
                }
            });
        });
    })(req, res, next);
});


export default router;

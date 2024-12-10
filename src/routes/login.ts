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


router.post("/", (req : Request, res : Response, next : NextFunction) => {
    console.log(req.body)
    passport.authenticate("local", {
      successRedirect: '/dashboard',
      failureRedirect: '/login',
      failureFlash: true,
    })(req, res, next);
  });

export default router;

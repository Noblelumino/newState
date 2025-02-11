import express, { Request, Response } from 'express';
import argon2 from 'argon2';
import User from '../models/user'; // Import the User model

const router = express.Router();

// GET route for registration page
router.get('/', (req: Request, res: Response): void => {
  res.render('adminregister', { layout: false }); // layout false prevents the application of the default layout
});

// POST route for submitting registration forms
router.post('/', async (req: Request, res: Response): Promise<void> => {
  try {
    const { fname, lname, email,number, password } = req.body;

    // Validate the incoming data
    if (!fname || !lname || !email ||!number || !password ) {
      res.status(400).send('All fields are required');
      return;
    }

    // Hash the password
    const hashedPassword = await argon2.hash(password);

    // Create a new user instance
    const user = new User({
      fname,
      lname,
      email,
      number,
      password: hashedPassword,
    
    });

    // Save the user to the database
    await user.save();

    console.log(user); // Debugging
    res.redirect('login');
  } catch (error) {
    console.error('Error during registration:', error);
    res.redirect('register');
  }
});

export default router;

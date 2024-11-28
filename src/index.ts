import express, { Request, Response } from 'express';
import expressLayouts from 'express-ejs-layouts';
import path from 'path';
import dotenv from 'dotenv';
import session from 'express-session';
import flash from 'connect-flash';
import passport from 'passport';


dotenv.config()
import connectDb from './config/db';
connectDb()


// Setting up Express and Port
const app = express();


// Middleware for sessions (required by connect-flash)
app.use(
    session({
      secret: 'your_secret_key', // Replace with your own secret
      resave: false,
      saveUninitialized: false,
    })
  );

  // Initialize Passport
app.use(passport.initialize());
app.use(passport.session());
// Enable flash messages
app.use(flash());

// Middleware to pass flash messages to views
app.use((req, res, next) => {
    res.locals.successMessage = req.flash('success');
    res.locals.errorMessage = req.flash('error');
    next();
  });
  


// Setting up the view engine to render EJS templates
app.set('view engine', 'ejs');

// Setting up the views directory
app.set('views', path.join(__dirname, 'views'));

// Setting layout to avoid duplicating headers and footers
app.set('layout', 'layouts/layout');
app.use(expressLayouts);

// Setting up the static files directory
app.use(express.static(path.join(__dirname, 'public')));

// Import all routes to the server
import indexRouter from './routes/user/index';
import propertyRouter from './routes/user/property';
import adminLogin from './routes/admin/login';
import register from './routes/admin/register';
import dashboard from './routes/admin/dashboard';

// to parse form data sent 
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// Use routers imported
app.use('/', indexRouter);
app.use('/property', propertyRouter);
app.use ('/login', adminLogin)
app.use ('/register', register)
app.use ('/dashboard', dashboard)

// Starting the server
app.listen(process.env.PORT, () => {
    console.log(`App running on port ${process.env.PORT}`);
});

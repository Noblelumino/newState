import express, { NextFunction, Request, Response } from 'express';
import expressLayouts from 'express-ejs-layouts';
import path from 'path';
import dotenv from 'dotenv';
import session from 'express-session';
import flash from 'connect-flash';
import passport from 'passport';

dotenv.config();
import connectDb from './config/db';
connectDb();

// Setting up Express and Port
const app = express();

// Middleware for sessions (required by connect-flash)
app.use(
  session({
    secret: 'your_secret_key', // Replace with your own secret
    resave: false,
    saveUninitialized: false,
  }),
);

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());
// Enable flash messages
// Connect flash
app.use(flash());

// Global variables
app.use(function (req: Request, res: Response, next: NextFunction) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
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
import indexRouter from './routes/index';
import propertyRouter from './routes/property';// user front end  
import adminLogin from './routes/login';
import register from './routes/register';
import dashboard from './routes/dashboard';
import addProperty from './routes/addProperty';
import land from './routes/land';
import house from './routes/houses';
import shortlet from './routes/shortlet';

// to parse form data sent
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Use routers imported
app.use('/', indexRouter);
app.use('/property', propertyRouter);
app.use('/login', adminLogin);
app.use('/register', register);
app.use('/dashboard', dashboard);
app.use('/addProperty', addProperty);
app.use('/land', land);
app.use('/house', house);
app.use('/shortlet', shortlet);

// Starting the server
app.listen(process.env.port, () => {
  console.log(`App running on port ${process.env.port}`);
});

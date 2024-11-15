import express, { Request, Response } from 'express';
import expressLayouts from 'express-ejs-layouts';
import path from 'path';
import dotenv from 'dotenv';
dotenv.config()
import connectDb from './config/db';
connectDb()


// Setting up Express and Port
const app = express();


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
import adminLogin from './routes/admin/admin';


// Use routers imported
app.use('/', indexRouter);
app.use('/property', propertyRouter);
app.use ('/admin', adminLogin)

// Starting the server
app.listen(process.env.PORT, () => {
    console.log(`App running on port ${process.env.PORT}`);
});

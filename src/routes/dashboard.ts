import express, { Request, Response, NextFunction } from 'express';
import { title } from 'process';

const router = express.Router();

// GET route for registration page
router.get('/',  (req: Request, res: Response): void => {
    res.render('adminDashboard', { 
        layout: "layouts/adminLayout",
        title: "Admin Dashboard"
     }) // layout false prevents the application of the default layout
});


export default router 
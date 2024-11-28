import express, { Request, Response, NextFunction } from 'express';

const router = express.Router();

// GET route for registration page
router.get('/',  (req: Request, res: Response): void => {
    res.render('adminDashboard', { layout: false }) // layout false prevents the application of the default layout
});


export default router 
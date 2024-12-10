import express, { Request, Response } from 'express';
import { title } from 'process';

const router = express.Router();

router.get('/', (req: Request, res: Response) => {
    res.render('index',{
        layout: "layouts/userLayout",
        title: "Home"
    });
});

export default router;

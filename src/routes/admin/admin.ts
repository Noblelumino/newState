import express, {Request, Response} from 'express'

const router = express.Router();

router.get('/',(req: Request, res: Response ) =>{
    res.render('adminLogin', { layout: false }) // layout false prevents the application of the default layout
});

export default router ;
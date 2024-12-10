import express, { Request, Response } from 'express';

const router = express.Router();

router.get('/list', (req: Request, res: Response) => {
    res.render('property-list');
});

router.get('/type', (req: Request, res: Response) => {
    res.render('property-type');
});

router.get('/agent', (req: Request, res: Response) => {
    res.render('property-agent');
});


// router.post('/', (req: Request, res: Request) => {
//     res.render('')
// })



// Posting properties (placeholder for future implementation)
// router.post('/add', (req: Request, res: Response) => {
//     // Logic for posting properties will go here
// });

export default router;

import express, {Request, Response} from 'express'
import { Property } from '../models/property';


const router = express.Router();

// Route to display properties with propertyType "land"
router.get('/', async (req: Request, res: Response) => {
  
  try {
    // Render the EJS template with the filtered properties
    const landProperties = await Property.find({propertyType : 'shortlets'})
    console.log(landProperties)
    res.render('viewland', {
      layout: 'layouts/adminLayout', 
      title: 'Shortlets',
      properties: landProperties,
    }) ;
  
  } catch (error) {
    console.error('Error fetching land properties:', error);
    res.status(500).send('An error occurred while fetching land properties.');
  }
});

export default router 
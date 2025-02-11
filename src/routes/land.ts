import express, {Request, Response} from 'express'
import { Property } from '../models/property';
import { title } from 'process';


const router = express.Router();

// Route to display properties with propertyType "land"
router.get('/', async (req: Request, res: Response) => {
  
  try {
    // Render the EJS template with the filtered properties
    const landProperties = await Property.find({propertyType : 'land'})
    //console.log(landProperties)
    res.render('viewland', {
      layout: 'layouts/adminLayout', 
      title: 'Lands',
      properties: landProperties,
    }) ;
  
  } catch (error) {
    console.error('Error fetching land properties:', error);
    res.status(500).send('An error occurred while fetching land properties.');
  }
});


router.get('/detailspage/:id', async (req: Request, res : Response) =>{ // passing the id from the 
  //previous page so as to collect it here 

  try { 
    const property = await Property.findById(req.params.id)
    res.render('viewdetails',{
      layout: 'layouts/adminLayout',
      title : 'Details', 
      data: property
    })
  } catch (error) {
    
  }
})




export default router 
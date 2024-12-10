import express, {   Request, Response,} from 'express' ;
import {title} from 'process' ;
import { Property } from '../models/property';

const router = express.Router();

//Get router for the display of the add property from 
router.get('/', (req: Request, res : Response): void =>{
    res.render('property-uploads',{
        layout:'layouts/adminLayout',
        title: 'add property'
    })
})

router.post(
    '/upload',
    upload.array('images', 5), // Accept up to 5 images
    async (req: Request, res: Response): Promise<void> => {
        try {
            const { pname, address, propertytype, amount, description } = req.body;
            const files = req.files as Express.Multer.File[]; // Type assertion for files

            // Validate incoming data
            if (!pname || !address || !propertytype || !amount || !description || files.length === 0) {
                res.status(400).send('All fields, including images, are required');
                return;
            }

            // Extract file paths
            const filePaths = files.map(file => file.path);

            // Create a new property instance
            const property = new Property({
                pname,
                address,
                propertytype,
                amount,
                description,
                file: filePaths
            });

            // Save to the database
            await property.save();

            res.status(201).send('Property uploaded successfully');
        } catch (error) {
            console.error('Error during upload:', error);
            res.status(500).send('An error occurred while uploading the property');
        }
    }
);

// This route takes charge of the files uploaded from th
export default router 
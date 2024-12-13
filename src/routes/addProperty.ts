import express, { Request, Response, } from 'express';
import { title } from 'process';
import { Property } from '../models/property';
import cloudinary from '../assets/cloudinary';
import multer from '../assets/multer';

const upload = multer.fields([{ name: 'files', maxCount: 10 }]);

const router = express.Router();

//Get router for the display of the add property from 
router.get('/', (req: Request, res: Response): void => {
    res.render('property-uploads', {
        layout: 'layouts/adminLayout',
        title: 'add property'
    })
})

router.post(
    '/upload',
    upload, // Apply multer middleware here
    async (req: Request, res: Response): Promise<void> => {
        try {
            // Log the request body and files for debugging
            console.log('Body:', req.body);
            console.log('Files:', req.files);

            // Extract form fields from req.body
            const { propertyName, address, propertyType, amount, description } = req.body;

            // Validate required fields
            if (!propertyName || !address || !propertyType || !amount || !description) {
                res.status(400).send('All fields, including images, are required');
                return;
            }

            // Prepare media array to store uploaded file info
            const media: { url: string; cloudinary_id: string }[] = [];

            // Process uploaded files
            if (req.files && req.files['files']) {
                const filesArray = req.files['files'] as Express.Multer.File[];
                for (const file of filesArray) {
                    const result = await cloudinary.uploader.upload(file.path);
                    media.push({
                        url: result.secure_url,
                        cloudinary_id: result.public_id,
                    });
                }
            }

            // Create a new property instance
            const property = new Property({
                propertyName,
                address,
                propertyType,
                amount,
                description,
                images: media, // Save uploaded images
            });

            // Save property to the database
            await property.save();

            // Log and send success response
            console.log('Property saved:', property);
            res.status(201).send('Property uploaded successfully');
        } catch (error) {
            console.error('Error during upload:', error);
            res.status(500).send('An error occurred while uploading the property');
        }
    }
);
// router.post(
//     '/upload',

//     async (req: Request, res: Response): Promise<void> => {
//         try {
//             upload(req, res, async (uploadError) => {
//                 if (uploadError) {
//                     return res.status(400).send(`File upload error: ${uploadError.message}`)
//                 }
//                 const { propertyName, address, propertyType, amount, description, files } = req.body;
//                 console.log(req.body)
//                 //Validate incoming data
//                 if (!propertyName || !address || !propertyType || !amount || !description) {
//                     res.status(400).send('All fields, including images, are required');
//                     return;
//                 }

//                 const media: { url: string; cloudinary_id: string }[] = [];
//                 console.log('images', files)
//                 if (req.files && req.files['files']) {
//                     for (const file of req.files['files'] as Express.Multer.File[]) {
//                         const result = await cloudinary.uploader.upload(file.path);
//                         files.push({
//                             url: result.secure_url,
//                             cloudinary_id: result.public_id,
//                         });
//                     }
//                 }

//                 // Create a new property instance
//                 const property = new Property({
//                     propertyName,
//                     address,
//                     propertyType,
//                     amount,
//                     description,
//                     images: media
//                 });

//                 // Save to the database
//                 await property.save();

//                 console.log('property', property)
                
//                 res.status(201).send('Property uploaded successfully');
//             });
//         } catch (error) {
//             console.error('Error during upload:', error);
//             res.status(500).send('An error occurred while uploading the property');
//         }
//     }
// );

// This route takes charge of the files uploaded from th
export default router 
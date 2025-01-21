/* eslint-disable @typescript-eslint/no-explicit-any */
import express, { Request, Response } from 'express';
import { Property } from '../models/property';
import cloudinary from '../assets/cloudinary';
import multer from '../assets/multer';

const upload = multer.fields([{ name: 'files', maxCount: 10 }]);

const router = express.Router();

//Get router for the display of the add property from
router.get('/', (req: Request, res: Response): void => {
  res.render('property-uploads', {
    layout: 'layouts/adminLayout',
    title: 'add property',
  });
});

// POST route for uploading property data
router.post('/upload', (req: Request, res: Response) => {
  upload(req, res, async (uploadError) => {
    try {
      if (uploadError) {
        return res.render('property-uploads', {
          layout: 'layouts/adminLayout',
          title: 'Add Property',
          errorMessage: `File upload error: ${uploadError.message}`,
        });
      }

      const { propertyName, address, propertyType, amount, description } =
        req.body;

      const uploadedMedia: { url: string; cloudinary_id: string }[] = [];

      // Process all uploaded files
      if (req.files && req.files['files']) {
        for (const file of req.files['files'] as Express.Multer.File[]) {
          const result = await cloudinary.uploader.upload(file.path);
          uploadedMedia.push({
            url: result.secure_url,
            cloudinary_id: result.public_id,
          });
        }
      }

      // Create a single property with all uploaded images
      const property = new Property({
        propertyName,
        address,
        propertyType,
        amount,
        description,
        images: uploadedMedia,
      });

      await property.save();
      console.log(property);

      // Redirect back to the form page with a success query parameter
      return res.redirect('/upload?success=true');
    } catch (error) {
      console.error('Error uploading property:', error);

      // Render the page with an error message
      return res.render('property-uploads', {
        layout: 'layouts/adminLayout',
        title: 'Add Property',
        errorMessage: 'An internal server error occurred. Please try again.',
      });
    }
  });
});

export default router;

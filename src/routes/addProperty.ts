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
        return res.render('/property-uploads', {
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
      return res.redirect('/addproperty');
    } catch (error) {
      console.error('Error uploading property:', error);

      // Render the page with an error message
      return res.render('addproperty', {
        layout: 'layouts/adminLayout',
        title: 'Add Property',
        errorMessage: 'An internal server error occurred. Please try again.',
      });
    }
  });
});

router.post('/update', async (req: Request, res: Response): Promise<void> => {
  const { propertyId, propertyName, address, amount, description, action } = req.body;

  try {
    if (!propertyId || !propertyId.match(/^[0-9a-fA-F]{24}$/)) {
      res.status(400).json({ error: "Invalid property ID format" });
      return;
    }

    // Fetch the property first to get its type
    const property = await Property.findById(propertyId);
    if (!property) {
      res.status(404).json({ error: "Property not found" });
      return;
    }

    const { propertyType } = property; // Extract property type

    if (action === "update") {
      // Update property
      const updatedProperty = await Property.findByIdAndUpdate(
        propertyId,
        {
          $set: {
            propertyName,
            address,
            amount: Number(amount), // Ensure amount is a number
            description,
          },
        },
        { new: true }
      );

      if (!updatedProperty) {
        res.status(404).json({ error: "Property not found" });
        return;
      }

      res.redirect(`/${propertyType}`); // Redirect based on property type

    } else if (action === "delete") {
      // Delete property
      const deletedProperty = await Property.findByIdAndDelete(propertyId);

      if (!deletedProperty) {
        res.status(404).json({ error: "Property not found" });
        return;
      }

      res.redirect(`/${propertyType}`); // Redirect based on property type
    } else {
      res.status(400).json({ error: "Invalid action" });
    }
  } catch (error) {
    console.error("Error processing request:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;

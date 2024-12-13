import mongoose, { Schema, Document } from 'mongoose';

export interface IProperty extends Document {
    propertyName: string;
    address: string;
    propertyType: string;
    amount: number;
    description: string;
    images:{ url: string; cloudinary_id: string }[]; // Array of images paths
    
}

const PropertySchema = new Schema<IProperty>({
    propertyName: { 
        type: String, 
        required: true 
    },
    address: {
        type: String,
        required: true 
    },
    propertyType: { 
        type: String, 
        required: true
     },
    amount: { 
        type: Number, 
        required: true 
    },
    description: { 
        type: String, 
        required: true 
    },
    images:  [
        {
          url: {
            type: String,
            required: true,
          },
          cloudinary_id: {
            type: String,
            required: true,
          },
        },
      ],
        
    // Array to store multiple image paths
});

export const Property = mongoose.model<IProperty>('Property', PropertySchema);

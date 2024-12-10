import mongoose, { Schema, Document } from 'mongoose';

export interface IProperty extends Document {
    pname: string;
    address: string;
    propertytype: string;
    amount: number;
    description: string;
    file: string[]; // Array of file paths
}

const PropertySchema = new Schema<IProperty>({
    pname: { 
        type: String, 
        required: true 
    },
    address: {
        type: String,
        required: true 
    },
    propertytype: { 
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
    file: { 
        type: [String], 
        required: true 
    } // Array to store multiple image paths
});

export const Property = mongoose.model<IProperty>('Property', PropertySchema);

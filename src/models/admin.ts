import mongoose, { Document, Schema } from 'mongoose';

type UserType = 'Admin' | 'User'; // Add other user types here if needed

interface User extends Document {
    name: string;
    email: string;
    password: string;
    userType: UserType;
    createdAt?: Date;
    updatedAt?: Date;
}

const userSchema: Schema<User> = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        userType: {
            type: String,
            enum: ['Admin', 'User'], // Add more user types here if needed
            required: true,
            default: 'User', // Default to 'User' if not specified
        },
    },
    {
        timestamps: true, // Automatically add createdAt and updatedAt fields
    }
);

export default mongoose.model<User>('User', userSchema);
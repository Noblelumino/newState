import mongoose, { Document, Schema } from 'mongoose';

type UserType = 'Admin' | 'User'; // Add other user types here if needed

interface User extends Document {
  fname: string;
  lname: string;
  email: string;
  password: string;
  userType: UserType;
  createdAt?: Date;
  updatedAt?: Date;
}

const userSchema: Schema<User> = new Schema(
  {
    fname: {
      type: String,
      required: true,
    },
    lname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address.'],
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
  },
);

export default mongoose.model<User>('User', userSchema);

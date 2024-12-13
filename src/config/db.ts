import mongoose from "mongoose";
import dotenv from 'dotenv'

dotenv.config()
const option = {
  socketTimeoutMS: 30000,
};

const connectDb = async (): Promise<void> => {
  try {
    await mongoose.connect(process.env.mongo_url || '', option);
    console.log("Database connected successfully");
  } catch (error) {
    console.log(error);
  }
};

export default connectDb;
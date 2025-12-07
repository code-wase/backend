import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const dbUrl = process.env.DBURL;
const dbName = process.env.DBNAME;

const connectDB = async () => {
  try {
    await mongoose.connect(`${dbUrl}/${dbName}`);
    console.log("MongoDB connected");
  } catch (error) {
    console.log("MongoDB connection error:", error);
  }
};

export default connectDB;

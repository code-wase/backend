import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const dbUrl = process.env.DBURL;      // e.g., "mongodb://127.0.0.1:27017"
const dbName = process.env.DBNAME;    // e.g., "mydatabase"

const connectDB = async () => {
  if (!dbUrl || !dbName) {
    throw new Error("DBURL or DBNAME is not defined in .env");
  }

  try {
    await mongoose.connect(`${dbUrl}/${dbName}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected successfully");
  } catch (err) {
    console.error("MongoDB connection failed:", err.message);
    throw err;
  }
};

export default connectDB;

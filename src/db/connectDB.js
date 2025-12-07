import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const dbUrl = process.env.DBURL;   // Cluster URI without trailing slash
const dbName = process.env.DBNAME; // Database name

const connectDB = async () => {
  try {
    await mongoose.connect(`${dbUrl}/${dbName}?retryWrites=true&w=majority`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB connected");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error.message);
    process.exit(1); // Backend ko stop kar dega agar DB connect nahi hota
  }
};

export default connectDB;

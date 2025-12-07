import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./src/db/connectDB.js";
import userRoutes from "./src/routes/userRoutes.js";
import activityRoutes from "./src/routes/activityRoutes.js";

// Load env variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());


app.use('/user',userRoutes)
app.use("/activity", activityRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("Backend server is running...");
});

// Start server only after MongoDB connection
const startServer = async () => {
  try {
    await connectDB(); // Wait for DB to connect
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Server failed to start:", error.message);
    process.exit(1);
  }
};

startServer();

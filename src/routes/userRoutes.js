// routes/userRoutes.js
import express from "express";
import { register, login, logout } from "../controllers/userController.js";
import { authMiddleware } from "../middleware/auth.js";

const userRoutes = express.Router();

userRoutes.post("/register", register);
userRoutes.post("/login", login);
userRoutes.post("/logout", authMiddleware, logout);
 
export default userRoutes;
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import Activity from "../models/activityModel.js";
import { registerUser } from "../services/userServices.js";

// 🔹 Register User
export const register = async (req, res) => {
  try {
    const { firstName, lastName, email, phone, password, role } = req.body;
    const { user, token } = await registerUser({ firstName, lastName, email, phone, password, role });

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user,
      token,
    });
  } catch (err) {
    res.status(err.status || 500).json({
      success: false,
      message: err.message || "Server error",
    });
  }
};

// 🔹 Login User
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ success: false, message: "User not found" });

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ success: false, message: "Wrong password" });

    // Generate JWT Token
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

    // Save Login Activity
    await Activity.create({
      userId: user._id,
      action: "LOGIN",
      details: "User logged in",
    });

    res.json({
      success: true,
      message: "Login successful",
      token,
      user,
    });

  } catch (err) {
    res.status(500).json({ success: false, message: err.message || "Server error" });
  }
};

// 🔹 Logout User
export const logout = async (req, res) => {
  try {
    await Activity.create({
      userId: req.user._id,
      action: "LOGOUT",
      details: "User logged out",
    });

    res.json({ success: true, message: "Logout successful" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message || "Server error" });
  }
};

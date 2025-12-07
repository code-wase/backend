import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

// Middleware to verify token and attach user info to req.user
export const authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Bearer token

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "No token provided",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Check if user exists in DB
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid token — user not found",
      });
    }

    // Attach only necessary info for role-based access
    req.user = {
      id: decoded.id,
      role: user.role, // assuming your User model has `role` field ('admin', 'user', etc.)
    };

    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};

// Export alias for clarity
export const verifyToken = authMiddleware;

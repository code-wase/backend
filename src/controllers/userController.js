import { registerUser, loginUser, logoutUser } from "../services/userServices.js";

// Register user (anyone can register now, admin check removed)
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
      message: err.message,
    });
  }
};

// Login user
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    // Normalize email
    const normalizedEmail = email.trim().toLowerCase();

    const { user, token } = await loginUser({ email: normalizedEmail, password });

    if (!user.isActive) {
      return res.status(403).json({
        success: false,
        message: "User account is inactive",
      });
    }

    res.status(200).json({
      success: true,
      message: "Login successful",
      user,
      token,
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(err.status || 500).json({
      success: false,
      message: err.message || "Login failed",
    });
  }
};

// Logout user
export const logout = async (req, res) => {
  try {
    await logoutUser(req.user._id);

    res.status(200).json({
      success: true,
      message: "Logout successful",
    });
  } catch (err) {
    res.status(err.status || 500).json({
      success: false,
      message: err.message,
    });
  }
};

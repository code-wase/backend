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
// loginUser controller
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ success: false, message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ success: false, message: "Wrong password" });

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

    // Save Activity
    await Activity.create({
      userId: user._id,
      type: "LOGIN",
      message: "User logged in"
    });

    res.json({
      success: true,
      message: "Login successful",
      token,
      user,
    });

  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};


// Logout user
export const logoutUser = async (req, res) => {
  try {
    await Activity.create({
      userId: req.user._id,
      type: "LOGOUT",
      message: "User logged out"
    });

    res.json({ success: true, message: "Logout successful" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};


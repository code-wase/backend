import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

export const registerUser = async ({
  firstName,
  lastName,
  email,
  phone,
  password,
}) => {
  // Check if email already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) throw { status: 409, message: "User already exists" };

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create user
  const newUser = await User.create({
    firstName,
    lastName,
    email,
    phone,
    password: hashedPassword,
  });

  // Generate token for new user (optional, can be null if only admin logs in)
  const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  newUser.token = token;
  await newUser.save();

  // Remove sensitive fields before returning
  const { password: _ignoredPwd, token: _ignoredToken, ...safeUser } =
    newUser.toObject();

  return { user: safeUser, token };
};

export const loginUser = async ({ email, password }) => {
  const normalizedEmail = email.trim().toLowerCase();

  const user = await User.findOne({ email: normalizedEmail }).select("+password");
  if (!user) throw { status: 401, message: "Invalid credentials" };

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw { status: 401, message: "Invalid credentials" };

  const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  user.token = token;
  await user.save();

  const { password: _ignoredPwd, token: _ignoredToken, ...safeUser } = user.toObject();
  return { user: safeUser, token };
};

export const logoutUser = async (id) => {
  const user = await User.findById(id);
  if (!user) throw { status: 404, message: "User not found" };

  user.token = null;
  await user.save();

  return true;
};

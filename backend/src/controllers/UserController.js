import bcrypt from "bcryptjs";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!email) {
      return res.json({ success: false, message: "Email is required" });
    }

    if (!emailRegex.test(email)) {
      return res.json({
        success: false,
        message: "Invalid email format",
      });
    }

    if (!name) {
      return res.json({ success: false, message: "Name is required" });
    }

    if (!password) {
      return res.json({ success: false, message: "Password is required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({ success: false, message: "User already exists" });
    }

    if (password.length < 4) {
      return res.json({
        success: false,
        message: "Password must be at least 4 characters",
      });
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashPassword,
    });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", //use secure cookies in production
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict", //CSRF production
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return res.json({
      success: true,
      message: "User registered successfully",
      user: { email: user.email, name: user.name },
    });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email) {
      return res.json({ success: false, message: "Email is required" });
    }

    if (!emailRegex.test(email)) {
      return res.json({
        success: false,
        message: "Invalid email format",
      });
    }

    if (!password) {
      return res.json({ success: false, message: "Password is required" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: "User does not exist" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.json({ success: false, message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", //use secure cookies in production
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict", //CSRF production
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return res.json({
      success: true,
      message: "User logged in successfully",
      user: { email: user.email, name: user.name },
    });
  } catch (error) {
    console.error(error);
    // return res.json({ success: false, message: error.message });
    return res.json({
      success: false,
      message: "Invalid credentials",
    });
  }
};

export const isAuth = async (req, res) => {
  try {
    const { userId } = req;
    const user = await User.findById(userId).select("-password");
    return res.json({
      success: true,
      user,
    });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", //use secure cookies in production
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict", //CSRF production
    });
    return res.json({ success: true, message: "User logged out successfully" });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

// controllers/sellerController.js
import Seller from "../models/Seller.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

// Register Seller
export const registerSeller = async (req, res) => {
  try {
    const { name, mobile, email, password } = req.body;

    let seller = await Seller.findOne({ email });
    if (seller) return res.status(400).json({ message: "Seller already exists" });

    seller = new Seller({ name, mobile, email, password });
    await seller.save();

    res.status(201).json({ message: "Seller registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Seller Login
export const loginSeller = async (req, res) => {
  try {
    const { email, password } = req.body;
    const seller = await Seller.findOne({ email });
    if (!seller) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, seller.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: seller._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
    res.cookie("token", token, { httpOnly: true });
    res.json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

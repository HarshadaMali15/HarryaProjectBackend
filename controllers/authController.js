import User from "../models/User.js"
import jwt from "jsonwebtoken"

const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "7d" })
}

// Register User
export const registerUser = async (req, res) => {
  const { name, email, mobile, password } = req.body
  try {
    const existingUser = await User.findOne({ email })
    if (existingUser) return res.status(400).json({ message: "Email already in use" })

    const newUser = await User.create({ name, email, mobile, password })
    res.status(201).json({ message: "User registered successfully", token: generateToken(newUser._id) })
  } catch (error) {
    res.status(500).json({ message: "Server error" })
  }
}

// Login User
export const loginUser = async (req, res) => {
  const { email, password } = req.body
  try {
    const user = await User.findOne({ email })
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: "Invalid email or password" })
    }

    res.json({
      message: "Login successful",
      token: generateToken(user._id),
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" })
  }
}

const User = require("../models/User")
const { generateToken } = require("../config/jwt")
const { validationResult } = require("express-validator")

const register = async (req, res) => {
  try {
    console.log("Registration attempt:", req.body.email)

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const { name, email, password } = req.body

    const existingUser = await User.findByEmail(email)
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" })
    }

    const user = await User.create({ name, email, password })

    const token = generateToken({ userId: user.id })

    res.status(201).json({
      message: "User created successfully",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        preferences: {
          language: user.language,
          darkMode: user.dark_mode,
          currency: user.currency,
        },
      },
    })
  } catch (error) {
    console.error("Registration error:", error)
    res.status(500).json({ message: "Server error", error: error.message })
  }
}

const login = async (req, res) => {
  try {
    console.log("Login attempt:", req.body.email)

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const { email, password } = req.body

    const user = await User.findByEmail(email)
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" })
    }

    const isMatch = await user.comparePassword(password)
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" })
    }

    const token = generateToken({ userId: user.id })

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        preferences: {
          language: user.language,
          darkMode: user.dark_mode,
          currency: user.currency,
        },
      },
    })
  } catch (error) {
    console.error("Login error:", error)
    res.status(500).json({ message: "Server error", error: error.message })
  }
}

const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.userId)
    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    res.json({
      id: user.id,
      name: user.name,
      email: user.email,
      preferences: {
        language: user.language,
        darkMode: user.dark_mode,
        currency: user.currency,
      },
      created_at: user.created_at,
      updated_at: user.updated_at,
    })
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message })
  }
}

module.exports = {
  register,
  login,
  getProfile,
}

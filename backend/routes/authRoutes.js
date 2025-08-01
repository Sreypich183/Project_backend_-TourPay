const express = require("express");
const { register, login, getProfile } = require("../controllers/authController");
const { validateRegister, validateLogin } = require("../middleware/validation");
const auth = require("../middleware/auth");

const router = express.Router();

/**
 * @route   POST /api/auth/register
 * @desc    Register a new user
 * @access  Public
 * @body    {name, email, password}
 */
router.post("/register", validateRegister, register);

/**
 * @route   POST /api/auth/login
 * @desc    Login user
 * @access  Public
 * @body    {email, password}
 */
router.post("/login", validateLogin, login);

/**
 * @route   GET /api/auth/profile
 * @desc    Get current user's profile
 * @access  Private
 */
router.get("/profile", auth, getProfile);

module.exports = router;

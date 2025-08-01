const { body } = require("express-validator")
const User = require("../models/User");

exports.validateRegister = [
  body("name")
    .trim()
    .notEmpty().withMessage("Name is required")
    .isLength({ min: 2 }).withMessage("Name must be at least 2 characters"),
    
  body("email")
    .trim()
    .normalizeEmail()
    .isEmail().withMessage("Invalid email format")
    .custom(async email => {
      const user = await User.findOne({ email });
      if (user) throw new Error("Email already in use");
    }),
    
  body("password")
    .trim()
    .isLength({ min: 8 }).withMessage("Password must be at least 8 characters")
    .matches(/[A-Z]/).withMessage("Password must contain at least one uppercase letter")
    .matches(/[a-z]/).withMessage("Password must contain at least one lowercase letter")
    .matches(/\d/).withMessage("Password must contain at least one number")
];

exports.validateLogin = [
  body("email")
    .trim()
    .normalizeEmail()
    .isEmail().withMessage("Invalid email format"),
    
  body("password")
    .trim()
    .notEmpty().withMessage("Password is required")
];

// -------------------- Validate Register --------------------
const validateRegister = [
  body("name").trim().isLength({ min: 2 }).withMessage("Name must be at least 2 characters"),
  body("email").isEmail().withMessage("Please provide a valid email"),
  body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
];

// -------------------- Validate Login --------------------
const validateLogin = [
  body("email").isEmail().withMessage("Please provide a valid email"),
  body("password").exists().withMessage("Password is required"),
];

// -------------------- Validate Tour --------------------
const validateTour = [
  body("title").trim().isLength({ min: 1 }).withMessage("Title is required"),
  body("currency").trim().isLength({ min: 3, max: 3 }).withMessage("Currency must be 3 characters"),
];

// -------------------- Validate Expense --------------------
const validateExpense = [
  body("title").trim().isLength({ min: 1 }).withMessage("Title is required"),
  body("amount").isNumeric().withMessage("Amount must be a number"),
  body("tourId").isNumeric().withMessage("Invalid tour ID"),
];

module.exports = {
  validateRegister,
  validateLogin,
  validateTour,
  validateExpense,
};

const express = require("express")
const { createExpense, getTourExpenses, updateExpense, deleteExpense } = require("../controllers/expenseController")
const { validateExpense } = require("../middleware/validation")
const auth = require("../middleware/auth")

const router = express.Router()

router.post("/", auth, validateExpense, createExpense)
router.get("/tour/:tourId", auth, getTourExpenses)
router.put("/:id", auth, updateExpense)
router.delete("/:id", auth, deleteExpense)

module.exports = router

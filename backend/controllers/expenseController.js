const Expense = require("../models/Expense")
const Tour = require("../models/Tour")

const createExpense = async (req, res) => {
  try {
    const { title, amount, description, category, tourId, splitBetween, date } = req.body

    // Calculate split amounts if not provided
    let finalSplitBetween = splitBetween
    if (!splitBetween || splitBetween.length === 0) {
      // Get tour participants for equal split
      const tour = await Tour.findById(tourId)
      const participants = await tour.getParticipants()
      const equalAmount = amount / participants.length

      finalSplitBetween = participants.map((participant) => ({
        user: participant.user?.id,
        amount: equalAmount,
      }))
    }

    const expense = await Expense.create({
      title,
      amount,
      description,
      category,
      tour_id: tourId,
      paid_by: req.userId,
      expense_date: date,
      splitBetween: finalSplitBetween,
    })

    res.status(201).json({
      message: "Expense created successfully",
      expense: expense.toJSON(),
    })
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message })
  }
}

const getTourExpenses = async (req, res) => {
  try {
    const { tourId } = req.params

    const expenses = await Expense.findByTourId(tourId)

    res.json(expenses.map((expense) => expense.toJSON()))
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message })
  }
}

const updateExpense = async (req, res) => {
  try {
    const { id } = req.params
    const updates = req.body

    const expense = await Expense.findById(id)
    if (!expense) {
      return res.status(404).json({ message: "Expense not found" })
    }

    // Check if user is the one who paid
    if (expense.paid_by != req.userId) {
      return res.status(403).json({ message: "Access denied" })
    }

    // For now, just return the expense (update functionality can be added later)
    res.json({
      message: "Expense updated successfully",
      expense: expense.toJSON(),
    })
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message })
  }
}

const deleteExpense = async (req, res) => {
  try {
    const { id } = req.params

    const expense = await Expense.findById(id)
    if (!expense) {
      return res.status(404).json({ message: "Expense not found" })
    }

    // Check if user is the one who paid
    if (expense.paid_by != req.userId) {
      return res.status(403).json({ message: "Access denied" })
    }

    await Expense.deleteById(id)

    res.json({ message: "Expense deleted successfully" })
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message })
  }
}

module.exports = {
  createExpense,
  getTourExpenses,
  updateExpense,
  deleteExpense,
}

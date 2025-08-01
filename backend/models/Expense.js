const { pool } = require("../config/database")

class Expense {
  constructor(data) {
    this.id = data.id
    this.title = data.title
    this.amount = data.amount
    this.description = data.description
    this.category = data.category
    this.tour_id = data.tour_id
    this.paid_by = data.paid_by
    this.expense_date = data.expense_date
    this.receipt_url = data.receipt_url
    this.created_at = data.created_at
    this.updated_at = data.updated_at
  }

  static async create(expenseData) {
    const { title, amount, description, category, tour_id, paid_by, expense_date, splitBetween } = expenseData

    const connection = await pool.getConnection()

    try {
      await connection.beginTransaction()

      // Create expense
      const [result] = await connection.execute(
        "INSERT INTO expenses (title, amount, description, category, tour_id, paid_by, expense_date) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [title, amount, description || null, category || "Other", tour_id, paid_by, expense_date || new Date()],
      )

      const expenseId = result.insertId

      // Create expense splits
      if (splitBetween && splitBetween.length > 0) {
        for (const split of splitBetween) {
          if (split.user && split.amount > 0) {
            await connection.execute("INSERT INTO expense_splits (expense_id, user_id, amount) VALUES (?, ?, ?)", [
              expenseId,
              split.user,
              split.amount,
            ])
          }
        }
      }

      // Update tour total
      await connection.execute("UPDATE tours SET total_amount = total_amount + ?, updated_at = NOW() WHERE id = ?", [
        amount,
        tour_id,
      ])

      await connection.commit()
      return this.findById(expenseId)
    } catch (error) {
      await connection.rollback()
      throw error
    } finally {
      connection.release()
    }
  }

  static async findById(id) {
    const [rows] = await pool.execute(
      `
      SELECT e.*, u.name as paid_by_name, u.email as paid_by_email
      FROM expenses e
      JOIN users u ON e.paid_by = u.id
      WHERE e.id = ?
    `,
      [id],
    )

    if (rows.length === 0) return null

    const expense = new Expense(rows[0])
    expense.paidBy = {
      _id: rows[0].paid_by,
      id: rows[0].paid_by,
      name: rows[0].paid_by_name,
      email: rows[0].paid_by_email,
    }

    // Get splits
    const [splits] = await pool.execute(
      `
      SELECT es.*, u.name as user_name, u.email as user_email
      FROM expense_splits es
      JOIN users u ON es.user_id = u.id
      WHERE es.expense_id = ?
    `,
      [id],
    )

    expense.splitBetween = splits.map((split) => ({
      user: {
        _id: split.user_id,
        id: split.user_id,
        name: split.user_name,
        email: split.user_email,
      },
      amount: Number.parseFloat(split.amount),
    }))

    return expense
  }

  static async findByTourId(tourId) {
    const [rows] = await pool.execute(
      `
      SELECT e.*, u.name as paid_by_name, u.email as paid_by_email
      FROM expenses e
      JOIN users u ON e.paid_by = u.id
      WHERE e.tour_id = ?
      ORDER BY e.expense_date DESC, e.created_at DESC
    `,
      [tourId],
    )

    const expenses = []

    for (const row of rows) {
      const expense = new Expense(row)
      expense.paidBy = {
        _id: row.paid_by,
        id: row.paid_by,
        name: row.paid_by_name,
        email: row.paid_by_email,
      }

      // Get splits for each expense
      const [splits] = await pool.execute(
        `
        SELECT es.*, u.name as user_name, u.email as user_email
        FROM expense_splits es
        JOIN users u ON es.user_id = u.id
        WHERE es.expense_id = ?
      `,
        [expense.id],
      )

      expense.splitBetween = splits.map((split) => ({
        user: {
          _id: split.user_id,
          id: split.user_id,
          name: split.user_name,
          email: split.user_email,
        },
        amount: Number.parseFloat(split.amount),
      }))

      expenses.push(expense)
    }

    return expenses
  }

  static async deleteById(id) {
    const connection = await pool.getConnection()

    try {
      await connection.beginTransaction()

      // Get expense details first
      const [expenseRows] = await connection.execute("SELECT tour_id, amount FROM expenses WHERE id = ?", [id])

      if (expenseRows.length === 0) {
        throw new Error("Expense not found")
      }

      const { tour_id, amount } = expenseRows[0]

      // Delete expense splits
      await connection.execute("DELETE FROM expense_splits WHERE expense_id = ?", [id])

      // Delete expense
      await connection.execute("DELETE FROM expenses WHERE id = ?", [id])

      // Update tour total
      await connection.execute("UPDATE tours SET total_amount = total_amount - ?, updated_at = NOW() WHERE id = ?", [
        amount,
        tour_id,
      ])

      await connection.commit()
      return true
    } catch (error) {
      await connection.rollback()
      throw error
    } finally {
      connection.release()
    }
  }

  toJSON() {
    return {
      _id: this.id,
      id: this.id,
      title: this.title,
      amount: Number.parseFloat(this.amount),
      description: this.description,
      category: this.category,
      tour: this.tour_id,
      paidBy: this.paidBy,
      splitBetween: this.splitBetween || [],
      date: this.expense_date,
      receipt: this.receipt_url,
      created_at: this.created_at,
      updated_at: this.updated_at,
    }
  }
}

module.exports = Expense;


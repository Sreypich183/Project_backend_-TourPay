const { pool } = require("../config/database")
const { v4: uuidv4 } = require("uuid")

class Tour {
  constructor(data) {
    this.id = data.id
    this.title = data.title
    this.description = data.description
    this.currency = data.currency
    this.icon = data.icon
    this.total_amount = data.total_amount
    this.invite_code = data.invite_code
    this.is_active = data.is_active
    this.created_by = data.created_by
    this.created_at = data.created_at
    this.updated_at = data.updated_at
  }

  static async create(tourData) {
    const { title, description, currency, icon, created_by } = tourData
    const invite_code = uuidv4().substring(0, 8)

    const [result] = await pool.execute(
      "INSERT INTO tours (title, description, currency, icon, invite_code, created_by) VALUES (?, ?, ?, ?, ?, ?)",
      [title, description || null, currency, icon || "🏖️", invite_code, created_by],
    )

    return this.findById(result.insertId)
  }

  static async findById(id) {
    const [rows] = await pool.execute("SELECT * FROM tours WHERE id = ?", [id])

    if (rows.length === 0) return null
    return new Tour(rows[0])
  }

  static async findByInviteCode(invite_code) {
    const [rows] = await pool.execute("SELECT * FROM tours WHERE invite_code = ?", [invite_code])

    if (rows.length === 0) return null
    return new Tour(rows[0])
  }

  static async findByUserId(userId) {
    const [rows] = await pool.execute(
      `
      SELECT DISTINCT t.* FROM tours t
      JOIN tour_participants tp ON t.id = tp.tour_id
      WHERE tp.user_id = ? AND t.is_active = 1
      ORDER BY t.updated_at DESC
    `,
      [userId],
    )

    return rows.map((row) => new Tour(row))
  }

  async getParticipants() {
    const [rows] = await pool.execute(
      `
      SELECT tp.*, u.name as user_name, u.email as user_email
      FROM tour_participants tp
      LEFT JOIN users u ON tp.user_id = u.id
      WHERE tp.tour_id = ?
      ORDER BY tp.joined_at ASC
    `,
      [this.id],
    )

    return rows.map((row) => ({
      id: row.id,
      user: row.user_id
        ? {
            _id: row.user_id,
            id: row.user_id,
            name: row.user_name,
            email: row.user_email,
          }
        : null,
      name: row.name,
      isAdmin: row.is_admin === 1,
      joined_at: row.joined_at,
    }))
  }

  async getExpenses() {
    const [rows] = await pool.execute(
      `
      SELECT e.*, u.name as paid_by_name, u.email as paid_by_email
      FROM expenses e
      JOIN users u ON e.paid_by = u.id
      WHERE e.tour_id = ?
      ORDER BY e.expense_date DESC, e.created_at DESC
    `,
      [this.id],
    )

    return rows
  }

  static async updateTotalAmount(id, amount) {
    await pool.execute("UPDATE tours SET total_amount = total_amount + ?, updated_at = NOW() WHERE id = ?", [
      amount,
      id,
    ])
  }

  static async addParticipant(tourId, userId, name, isAdmin = false) {
    await pool.execute("INSERT INTO tour_participants (tour_id, user_id, name, is_admin) VALUES (?, ?, ?, ?)", [
      tourId,
      userId,
      name,
      isAdmin,
    ])
  }

static async update(id, updateData) {
  const allowedFields = ["title", "description", "currency", "icon"]
  const fields = []
  const values = []

  for (const key of Object.keys(updateData)) {
    if (allowedFields.includes(key)) {
      fields.push(`${key} = ?`)
      values.push(updateData[key])
    }
  }

  if (fields.length === 0) {
    return this.findById(id)
  }

  values.push(id)

  const sql = `UPDATE tours SET ${fields.join(", ")}, updated_at = NOW() WHERE id = ?`

  await pool.execute(sql, values)

  return this.findById(id)
}


static async delete(id) {
  await pool.execute("DELETE FROM tours WHERE id = ?", [id])
}

static async archive(id) {
  await pool.execute("UPDATE tours SET is_active = 0, updated_at = NOW() WHERE id = ?", [id])
}

async getExpenses() {
  const [rows] = await pool.execute("SELECT * FROM expenses WHERE tour_id = ?", [this.id])
  return rows
}

async getInsights() {
  const expenses = await this.getExpenses()
  const total = expenses.reduce((sum, exp) => sum + parseFloat(exp.amount), 0)
  const byUser = {}
  for (const exp of expenses) {
    const userId = exp.paid_by
    if (!byUser[userId]) byUser[userId] = 0
    byUser[userId] += parseFloat(exp.amount)
  }
  return { totalExpenses: total, contributions: byUser }
}

 async toJSONWithDetails() {
  const participants = await this.getParticipants()
  const expenses = await this.getExpenses()
  const insights = await this.getInsights()

  return {
    _id: this.id,
    id: this.id,
    title: this.title,
    description: this.description,
    currency: this.currency,
    icon: this.icon,
    totalAmount: Number.parseFloat(this.total_amount) || 0,
    invite_code: this.invite_code,
    isActive: this.is_active === 1,
    created_by: this.created_by,
    participants,
    expenses: expenses.map((exp) => ({
      _id: exp.id,
      id: exp.id,
      title: exp.title,
      amount: Number.parseFloat(exp.amount),
      date: exp.expense_date,
      paidBy: {
        _id: exp.paid_by,
        id: exp.paid_by,
        name: exp.paid_by_name,
        email: exp.paid_by_email,
      },
    })),
    created_at: this.created_at,
    updated_at: this.updated_at,
    totalExpenses: insights.totalExpenses,
    contributions: insights.contributions,
  }
}


  toJSON() {
    return {
      _id: this.id,
      id: this.id,
      title: this.title,
      description: this.description,
      currency: this.currency,
      icon: this.icon,
      totalAmount: Number.parseFloat(this.total_amount) || 0,
      invite_code: this.invite_code,
      isActive: this.is_active === 1,
      created_by: this.created_by,
      created_at: this.created_at,
      updated_at: this.updated_at,
    }
  }
}

module.exports = Tour;

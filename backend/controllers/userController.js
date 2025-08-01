const User = require("../models/User")
const { pool } = require("../config/database")

// -------------------- Update Profile --------------------
const updateProfile = async (req, res) => {
  try {
    const { name, preferences } = req.body

    const updates = {}
    if (name) updates.name = name
    if (preferences) {
      if (preferences.language) updates.language = preferences.language
      if (preferences.currency) updates.currency = preferences.currency
    }

    const user = await User.updateById(req.userId, updates)

    res.json({
      message: "Profile updated successfully",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        preferences: {
          language: user.language,
          currency: user.currency,
        },
      },
    })
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message })
  }
};

// -------------------- Search Users --------------------
const searchUsers = async (req, res) => {
  try {
    const { query } = req.query

    const [rows] = await pool.execute(
      `
      SELECT id, name, email FROM users 
      WHERE (name LIKE ? OR email LIKE ?) AND id != ?
      LIMIT 10
    `,
      [`%${query}%`, `%${query}%`, req.userId],
    )

    res.json(rows)
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message })
  }
};

module.exports = {
  updateProfile,
  searchUsers,
};

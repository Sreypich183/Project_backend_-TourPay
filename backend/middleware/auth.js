const { verifyToken } = require("../config/jwt")
const User = require("../models/User")

// -------------------- Authentication --------------------
const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "")

    if (!token) {
      return res.status(401).json({ message: "No token, authorization denied" })
    }

    const decoded = verifyToken(token)
    const user = await User.findById(decoded.userId)

    if (!user) {
      return res.status(401).json({ message: "Token is not valid" })
    }

    req.userId = decoded.userId
    req.user = user
    next()
  } catch (error) {
    res.status(401).json({ message: "Token is not valid" })
  }
};

module.exports = auth;

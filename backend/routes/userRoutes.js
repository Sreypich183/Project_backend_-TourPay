const express = require("express")
const { updateProfile, searchUsers } = require("../controllers/userController")
const auth = require("../middleware/auth")

const router = express.Router()

router.put("/profile", auth, updateProfile)
router.get("/search", auth, searchUsers)

module.exports = router;

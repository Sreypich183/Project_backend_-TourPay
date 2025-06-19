// === backend/routes/profileRoutes.js ===
const express = require('express');
const router = express.Router();
const controller = require('../controllers/profileController');

router.post('/signin', controller.signIn);
router.get('/preferences', controller.getPreferences);
router.put('/preferences/language', controller.setLanguage);
router.put('/preferences/darkmode', controller.setDarkMode);

module.exports = router;
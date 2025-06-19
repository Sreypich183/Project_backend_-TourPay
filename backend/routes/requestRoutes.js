// === backend/routes/requestRoutes.js ===
const express = require('express');
const router = express.Router();
const controller = require('../controllers/requestController');

router.post('/appleConnect', controller.connect);
router.post('/googleConnect', controller.connect);
router.post('/facebookConnect', controller.connect);
router.post('/emailConnect', controller.connect);

module.exports = router;
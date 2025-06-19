// === backend/routes/freeCardRoutes.js ===
const express = require('express');
const router = express.Router();
const controller = require('../controllers/freeCardController');

router.post('/redeem', controller.redeemCard);

module.exports = router;
// === backend/routes/tricountRoutes.js ===
const express = require('express');
const router = express.Router();
const controller = require('../controllers/tourPayController');

router.post('/new', controller.createGroup);
router.post('/join', controller.joinGroup);
router.post('/importSplitwise', controller.importSplitwise);

module.exports = router;
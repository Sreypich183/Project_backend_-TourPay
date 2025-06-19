// === backend/controllers/freeCardController.js ===
const FreeCard = require('../models/FreeCard');

exports.redeemCard = async (req, res) => {
  const { userId, code } = req.body;
  const card = await FreeCard.findOne({ user: userId, code });
  if (card && !card.redeemed) {
    card.redeemed = true;
    await card.save();
    res.json({ success: true });
  } else {
    res.json({ success: false });
  }
};
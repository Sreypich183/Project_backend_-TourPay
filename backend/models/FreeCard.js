const mongoose = require('mongoose');

const freeCardSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  code: String,
  redeemed: { type: Boolean, default: false }
});

module.exports = mongoose.model('FreeCard', freeCardSchema);
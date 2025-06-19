const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  from: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  to: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  amount: Number,
  group: { type: mongoose.Schema.Types.ObjectId, ref: 'Group' }
});

module.exports = mongoose.model('Payment', paymentSchema);
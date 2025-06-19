const mongoose = require('mongoose');

const bankAccountSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  provider: String, // Apple, Google, Facebook, etc.
  accountId: String
});

module.exports = mongoose.model('BankAccount', bankAccountSchema);
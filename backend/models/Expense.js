const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
  group: { type: mongoose.Schema.Types.ObjectId, ref: 'Group' },
  description: String,
  amount: Number,
  paidBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  splitBetween: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
});

module.exports = mongoose.model('Expense', expenseSchema);
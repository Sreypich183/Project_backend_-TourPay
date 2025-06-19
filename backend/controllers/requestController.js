// === backend/controllers/requestController.js ===
const BankAccount = require('../models/BankAccount');

exports.connect = async (req, res) => {
  const { provider, userId, accountId } = req.body;
  const record = new BankAccount({ provider, user: userId, accountId });
  await record.save();
  res.json(record);
};
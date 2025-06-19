// === backend/controllers/tricountController.js ===
const Group = require('../models/Group');
const Expense = require('../models/Expense');

exports.createGroup = async (req, res) => {
  const group = new Group(req.body);
  await group.save();
  res.json(group);
};

exports.joinGroup = async (req, res) => {
  const { groupId, userId } = req.body;
  const group = await Group.findById(groupId);
  group.members.push(userId);
  await group.save();
  res.json(group);
};

exports.importSplitwise = async (req, res) => {
  res.json({ message: 'Import functionality not implemented yet' });
};
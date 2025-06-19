const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  group: { type: mongoose.Schema.Types.ObjectId, ref: 'Group' },
  status: { type: String, enum: ['pending', 'accepted', 'rejected'], default: 'pending' }
});

module.exports = mongoose.model('Request', requestSchema);

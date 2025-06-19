const mongoose = require('mongoose');

const preferenceSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  language: String,
  darkMode: Boolean
});

module.exports = mongoose.model('Preference', preferenceSchema);
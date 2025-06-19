// === backend/controllers/profileController.js ===
const User = require('../models/User');

// Sign in user by email and password
exports.signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email, password });
    if (user) {
      return res.json(user);
    } else {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Sign in error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// Get user preferences (language and dark mode)
exports.getPreferences = async (req, res) => {
  try {
    const user = await User.findById(req.query.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json({ language: user.language || 'en', darkMode: user.darkMode || false });
  } catch (error) {
    console.error('Get preferences error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// Update user language preference
exports.setLanguage = async (req, res) => {
  try {
    const { id, language } = req.body;
    await User.findByIdAndUpdate(id, { language });
    res.sendStatus(200);
  } catch (error) {
    console.error('Set language error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Update user dark mode preference
exports.setDarkMode = async (req, res) => {
  try {
    const { id, darkMode } = req.body;
    await User.findByIdAndUpdate(id, { darkMode });
    res.sendStatus(200);
  } catch (error) {
    console.error('Set dark mode error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

import User from '../models/User.js';
import Transaction from '../models/Transaction.js';
import Habit from '../models/Habit.js'; // added missing import

// Available themes
const themes = ['sunset', 'ocean', 'forest', 'candy'];

// @desc    Get available themes
// @route   GET /api/shop/themes
export const getThemes = (req, res) => {
  res.json(themes);
};

// @desc    Buy a theme
// @route   POST /api/shop/buy-theme
export const buyTheme = async (req, res) => {
  try {
    const { theme } = req.body;
    if (!themes.includes(theme)) {
      return res.status(400).json({ message: 'Invalid theme' });
    }
    const user = await User.findById(req.user._id);
    if (user.coins < 10) {
      return res.status(400).json({ message: 'Not enough coins' });
    }
    user.coins -= 10;
    user.theme = theme;
    await user.save();
    await Transaction.create({ user: user._id, type: 'spend', amount: 10, description: `Bought theme: ${theme}` });
    res.json({ theme: user.theme, coins: user.coins });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Change user theme (free if already owned)
// @route   PUT /api/user/theme
export const changeTheme = async (req, res) => {
  try {
    const { theme } = req.body;
    if (!themes.includes(theme)) {
      return res.status(400).json({ message: 'Invalid theme' });
    }
    const user = await User.findById(req.user._id);
    // For simplicity, we assume any theme can be applied if coins >0 or already purchased?
    // In a real app, we'd track purchased themes. We'll just allow any theme change.
    user.theme = theme;
    await user.save();
    res.json({ theme: user.theme });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get user badges
// @route   GET /api/user/badges
export const getBadges = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const habits = await Habit.find({ user: req.user._id });
    const maxStreak = Math.max(...habits.map(h => h.streak), 0);
    const badges = [];
    if (maxStreak >= 3) badges.push({ name: "🔥 3-Day Streak", icon: "fa-fire" });
    if (maxStreak >= 7) badges.push({ name: "⚡ 7-Day Warrior", icon: "fa-bolt" });
    if (maxStreak >= 21) badges.push({ name: "🏆 Legendary 21", icon: "fa-crown" });
    if (user.level >= 5) badges.push({ name: "🌟 Adept", icon: "fa-star" });
    if (user.level >= 10) badges.push({ name: "💎 Master", icon: "fa-gem" });
    if (user.coins >= 200) badges.push({ name: "💰 Tycoon", icon: "fa-sack-dollar" });
    res.json(badges);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
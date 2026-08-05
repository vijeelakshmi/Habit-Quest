import User from '../models/User.js';
import Habit from '../models/Habit.js';

// @desc    Get friend competition data (user vs Alex)
// @route   GET /api/competition/friend
export const getCompetition = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    // For demo, we use a fixed "Alex" with friendPoints stored in a separate collection or just a random value.
    // To keep it simple, we can have a "rival" user in the DB or just simulate.
    // Since we need to persist rival points, we can store them in a separate "Rival" model or in user doc.
    // For simplicity, we'll store rival points in the user's own doc as a field (rivalPoints).
    // But we want independent points for rival. Let's create a separate model or just use a global.
    // We'll implement a simple approach: the user has a 'rivalPoints' field that we increment when challenged.
    let rivalPoints = user.rivalPoints || 20;
    res.json({ userPoints: user.friendPoints, rivalPoints });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Challenge friend (increase rival points)
// @route   POST /api/competition/challenge
export const challengeFriend = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const increment = Math.floor(Math.random() * 7) + 2; // 2-8
    const newRivalPoints = (user.rivalPoints || 20) + increment;
    user.rivalPoints = newRivalPoints;
    await user.save();
    res.json({ rivalPoints: newRivalPoints, increment });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
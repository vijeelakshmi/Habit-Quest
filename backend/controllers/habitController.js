import Habit from '../models/Habit.js';
import User from '../models/User.js';
import Quest from '../models/Quest.js';
import { xpNeededForLevel } from '../utils/xpHelper.js';
import Transaction from '../models/Transaction.js';

// Helper to add XP and check level up
const addXP = async (userId, amount) => {
  const user = await User.findById(userId);
  if (!user) return;
  user.xp += amount;
  let needed = xpNeededForLevel(user.level);
  let leveledUp = false;
  while (user.xp >= needed) {
    user.xp -= needed;
    user.level++;
    needed = xpNeededForLevel(user.level);
    leveledUp = true;
  }
  await user.save();
  return { leveledUp, newLevel: user.level };
};

// Helper to add coins
const addCoins = async (userId, amount, description = 'Habit completion') => {
  const user = await User.findById(userId);
  if (!user) return;
  user.coins += amount;
  await user.save();
  // Optional: log transaction
  await Transaction.create({ user: userId, type: 'earn', amount, description });
  return user.coins;
};

// Helper to update quest progress (dynamic import to avoid circular dependency)
const updateQuestProgress = async (userId, habit, newStreak) => {
  const { updateQuestsAfterHabit } = await import('./questController.js');
  await updateQuestsAfterHabit(userId, habit, newStreak);
};

// @desc    Get all habits for logged-in user
// @route   GET /api/habits
export const getHabits = async (req, res) => {
  try {
    const habits = await Habit.find({ user: req.user._id });
    res.json(habits);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a new habit
// @route   POST /api/habits
export const createHabit = async (req, res) => {
  try {
    const { name } = req.body;
    const habit = await Habit.create({
      user: req.user._id,
      name
    });
    res.status(201).json(habit);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Mark habit as completed
// @route   PUT /api/habits/:id/complete
export const completeHabit = async (req, res) => {
  try {
    const habit = await Habit.findOne({ _id: req.params.id, user: req.user._id });
    if (!habit) {
      return res.status(404).json({ message: 'Habit not found' });
    }

    const today = new Date();
    const todayStr = today.toISOString().slice(0,10);
    const lastCompleted = habit.lastCompletedDate ? habit.lastCompletedDate.toISOString().slice(0,10) : null;

    if (lastCompleted === todayStr) {
      return res.status(400).json({ message: 'Habit already completed today' });
    }

    // Calculate new streak
    let newStreak = 1;
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().slice(0,10);
    if (lastCompleted === yesterdayStr) {
      newStreak = habit.streak + 1;
    } else {
      newStreak = 1;
    }

    habit.streak = newStreak;
    habit.lastCompletedDate = today;
    await habit.save();

    // Reward XP and coins
    const xpGain = 10 + (newStreak * 2);
    const coinGain = 5 + Math.floor(newStreak / 2);
    const xpResult = await addXP(req.user._id, xpGain);
    const newCoins = await addCoins(req.user._id, coinGain, `Completed habit: ${habit.name}`);

    // Update total friendPoints (sum of all streaks for competition)
    const allHabits = await Habit.find({ user: req.user._id });
    const totalPoints = allHabits.reduce((sum, h) => sum + h.streak, 0);
    await User.findByIdAndUpdate(req.user._id, { friendPoints: totalPoints });

    // Update quests progress
    await updateQuestProgress(req.user._id, habit, newStreak);

    res.json({
      habit,
      xpGain,
      coinGain,
      newXP: req.user.xp + xpGain,
      newCoins,
      leveledUp: xpResult.leveledUp,
      newLevel: xpResult.newLevel
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a habit
// @route   DELETE /api/habits/:id
export const deleteHabit = async (req, res) => {
  try {
    const habit = await Habit.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    if (!habit) {
      return res.status(404).json({ message: 'Habit not found' });
    }
    // Update friendPoints after deletion
    const allHabits = await Habit.find({ user: req.user._id });
    const totalPoints = allHabits.reduce((sum, h) => sum + h.streak, 0);
    await User.findByIdAndUpdate(req.user._id, { friendPoints: totalPoints });
    res.json({ message: 'Habit deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
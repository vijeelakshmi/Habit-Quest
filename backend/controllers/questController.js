import Quest from '../models/Quest.js';
import User from '../models/User.js';
import Habit from '../models/Habit.js'; // added missing import
import { xpNeededForLevel } from '../utils/xpHelper.js';
import Transaction from '../models/Transaction.js';

// Helper to add XP
const addXP = async (userId, amount) => {
  const user = await User.findById(userId);
  if (!user) return;
  user.xp += amount;
  let needed = xpNeededForLevel(user.level);
  while (user.xp >= needed) {
    user.xp -= needed;
    user.level++;
    needed = xpNeededForLevel(user.level);
  }
  await user.save();
  return user.level;
};

// Helper to add coins
const addCoins = async (userId, amount, description) => {
  const user = await User.findById(userId);
  if (!user) return;
  user.coins += amount;
  await user.save();
  await Transaction.create({ user: userId, type: 'earn', amount, description });
  return user.coins;
};

// Generate daily quests
const generateQuests = (dateStr) => {
  return [
    { id: 1, name: 'Complete any habit', target: 1, progress: 0, rewardXP: 30, rewardCoins: 15, completed: false },
    { id: 2, name: 'Reach 3 streak on any habit', target: 1, progress: 0, rewardXP: 50, rewardCoins: 25, completed: false },
    { id: 3, name: 'Earn 2 badges', target: 2, progress: 0, rewardXP: 80, rewardCoins: 40, completed: false }
  ];
};

// Helper to get badge count (used internally)
const getBadgeCount = async (userId) => {
  const user = await User.findById(userId);
  const habits = await Habit.find({ user: userId });
  const maxStreak = Math.max(...habits.map(h => h.streak), 0);
  let count = 0;
  if (maxStreak >= 3) count++;
  if (maxStreak >= 7) count++;
  if (maxStreak >= 21) count++;
  if (user.level >= 5) count++;
  if (user.level >= 10) count++;
  if (user.coins >= 200) count++;
  return count;
};

// Get today's quests (create if not exist)
// @desc    Get today's quests
// @route   GET /api/quests/today
export const getTodayQuests = async (req, res) => {
  try {
    const today = new Date().toISOString().slice(0,10);
    let questDoc = await Quest.findOne({ user: req.user._id, date: today });
    if (!questDoc) {
      const quests = generateQuests(today);
      questDoc = await Quest.create({ user: req.user._id, date: today, quests });
    }
    res.json(questDoc.quests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update quest progress after habit completion
export const updateQuestsAfterHabit = async (userId, habit, newStreak) => {
  const today = new Date().toISOString().slice(0,10);
  let questDoc = await Quest.findOne({ user: userId, date: today });
  if (!questDoc) {
    const quests = generateQuests(today);
    questDoc = await Quest.create({ user: userId, date: today, quests });
  }

  let updated = false;
  // Quest 1: complete any habit
  const q1 = questDoc.quests.find(q => q.id === 1);
  if (q1 && !q1.completed) {
    q1.progress = Math.min(q1.target, q1.progress + 1);
    if (q1.progress >= q1.target) {
      q1.completed = true;
      updated = true;
      await addXP(userId, q1.rewardXP);
      await addCoins(userId, q1.rewardCoins, `Quest completed: ${q1.name}`);
    }
  }
  // Quest 2: reach streak 3 on any habit
  const q2 = questDoc.quests.find(q => q.id === 2);
  if (q2 && !q2.completed && newStreak >= 3) {
    q2.progress = 1;
    q2.completed = true;
    updated = true;
    await addXP(userId, q2.rewardXP);
    await addCoins(userId, q2.rewardCoins, `Quest completed: ${q2.name}`);
  }
  // Quest 3: earn 2 badges – we need to compute badges count
  // This will be computed when retrieving user badges; we'll handle it after badges check
  // For now, we can recalc badge count here if needed, but it's easier to leave it to the badge endpoint
  // We'll implement a badge update method later.

  if (updated) {
    await questDoc.save();
  }
};

// Separate endpoint to update badge quest (can be called after badge check)
// @desc    Update quest progress for badge quest
// @route   POST /api/quests/update-badge-quest
export const updateBadgeQuest = async (req, res) => {
  try {
    const userId = req.user._id;
    const today = new Date().toISOString().slice(0,10);
    let questDoc = await Quest.findOne({ user: userId, date: today });
    if (!questDoc) {
      const quests = generateQuests(today);
      questDoc = await Quest.create({ user: userId, date: today, quests });
    }
    const q3 = questDoc.quests.find(q => q.id === 3);
    if (q3 && !q3.completed) {
      // Get current badge count (using internal helper)
      const badgeCount = await getBadgeCount(userId);
      q3.progress = Math.min(q3.target, badgeCount);
      if (q3.progress >= q3.target) {
        q3.completed = true;
        await addXP(userId, q3.rewardXP);
        await addCoins(userId, q3.rewardCoins, `Quest completed: ${q3.name}`);
      }
      await questDoc.save();
    }
    res.json({ message: 'Updated' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
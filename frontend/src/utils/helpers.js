// XP needed for a given level (matching backend)
export const xpNeededForLevel = (level) => 100 + (level - 1) * 30;

// Format date to YYYY-MM-DD
export const formatDate = (date) => {
  const d = new Date(date);
  return d.toISOString().slice(0,10);
};

// Get today's date string
export const todayStr = () => new Date().toISOString().slice(0,10);
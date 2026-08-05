export const updateStreak = (lastCompleted, today) => {
  if (!lastCompleted) return 1;
  const lastDate = new Date(lastCompleted).toISOString().slice(0,10);
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = yesterday.toISOString().slice(0,10);
  if (lastDate === yesterdayStr) return 1; // actual streak will be incremented by caller
  if (lastDate === today) return null; // already completed today
  return 0; // reset streak
};
export const xpNeededForLevel = (level) => 100 + (level - 1) * 30;

export const calculateLevelFromXP = (xp) => {
  let level = 1;
  let needed = 100;
  while (xp >= needed) {
    xp -= needed;
    level++;
    needed = 100 + (level - 1) * 30;
  }
  return level;
};
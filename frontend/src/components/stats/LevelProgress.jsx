import { useAuth } from '../../context/AuthContext';
import { xpNeededForLevel } from '../../utils/helpers';

export default function LevelProgress() {
  const { user } = useAuth();
  
  if (!user) return null;

  const neededXP = xpNeededForLevel(user.level);
  const currentXP = user.xp;
  const progressPercent = (currentXP / neededXP) * 100;
  
  // Calculate XP needed for next level
  const xpToNextLevel = neededXP - currentXP;

  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-4 shadow-md">
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-2">
          <i className="fas fa-chart-line text-blue-500 text-xl"></i>
          <span className="font-bold text-gray-700">Level {user.level}</span>
        </div>
        <div className="text-sm text-gray-600">
          {currentXP} / {neededXP} XP
        </div>
      </div>
      
      {/* Progress Bar */}
      <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
        <div
          className="bg-gradient-to-r from-blue-500 to-purple-500 h-full rounded-full transition-all duration-500 ease-out"
          style={{ width: `${Math.min(100, progressPercent)}%` }}
        />
      </div>
      
      {/* XP to next level */}
      {xpToNextLevel > 0 && (
        <div className="mt-2 text-xs text-gray-500 text-center">
          {xpToNextLevel} XP needed for next level
        </div>
      )}
      
      {/* Visual reward at level milestones */}
      {user.level >= 5 && user.level < 10 && (
        <div className="mt-2 text-xs text-center text-yellow-600">
          <i className="fas fa-star"></i> Adept tier unlocked!
        </div>
      )}
      {user.level >= 10 && (
        <div className="mt-2 text-xs text-center text-purple-600">
          <i className="fas fa-gem"></i> Master tier reached!
        </div>
      )}
    </div>
  );
}
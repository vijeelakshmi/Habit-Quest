import { useAuth } from '../../context/AuthContext';
import { xpNeededForLevel } from '../../utils/helpers';

export default function StatsBar() {
  const { user } = useAuth();
  if (!user) return null;

  const needed = xpNeededForLevel(user.level);
  const progress = (user.xp / needed) * 100;

  return (
    <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 shadow-md flex flex-wrap justify-between items-center gap-4 mt-4">
      <div className="flex items-center gap-2">
        <i className="fas fa-star text-yellow-500 text-xl"></i>
        <span className="font-bold">Level {user.level}</span>
      </div>
      <div className="flex-1 min-w-[150px]">
        <div className="bg-gray-200 rounded-full h-3">
          <div
            className="bg-gradient-to-r from-orange-500 to-pink-500 h-3 rounded-full transition-all duration-300"
            style={{ width: `${Math.min(100, progress)}%` }}
          ></div>
        </div>
        <div className="text-xs text-gray-600 mt-1">
          {user.xp} / {needed} XP
        </div>
      </div>
      <div className="flex items-center gap-2">
        <i className="fas fa-coins text-orange-500 text-xl"></i>
        <span className="font-bold">{user.coins} coins</span>
      </div>
    </div>
  );
}
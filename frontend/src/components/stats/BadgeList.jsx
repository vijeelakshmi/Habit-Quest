import { useHabits } from '../../context/HabitContext';

export default function BadgesList() {
  const { badges } = useHabits();

  if (badges.length === 0) {
    return (
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-md">
        <h3 className="text-lg font-bold mb-2 flex items-center gap-2">
          <i className="fas fa-medal text-yellow-500"></i> Badges
        </h3>
        <p className="text-gray-500 text-sm">Complete streaks and level up to earn badges!</p>
      </div>
    );
  }

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-md">
      <h3 className="text-lg font-bold mb-2 flex items-center gap-2">
        <i className="fas fa-medal text-yellow-500"></i> Earned Badges
      </h3>
      <div className="flex flex-wrap gap-2">
        {badges.map((badge, idx) => (
          <div
            key={idx}
            className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1"
          >
            <i className={`fas ${badge.icon}`}></i>
            {badge.name}
          </div>
        ))}
      </div>
    </div>
  );
}
import { useHabits } from '../../context/HabitContext';

export default function DailyQuests() {
  const { quests } = useHabits();

  // If no quests or empty array, show placeholder
  if (!quests || quests.length === 0) {
    return (
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-md">
        <h3 className="text-lg font-bold mb-2 flex items-center gap-2">
          <i className="fas fa-scroll text-green-500"></i> Daily Quests
        </h3>
        <p className="text-gray-500 text-sm">No quests available today. Check back tomorrow!</p>
      </div>
    );
  }

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-md">
      <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
        <i className="fas fa-scroll text-green-500"></i> Daily Quests
      </h3>
      <div className="space-y-3">
        {quests.map((quest) => (
          <div key={quest.id} className="bg-white/50 rounded-xl p-3">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="font-semibold flex items-center gap-2">
                  {quest.completed ? (
                    <i className="fas fa-check-circle text-green-500"></i>
                  ) : (
                    <i className="fas fa-circle-notch text-gray-400"></i>
                  )}
                  <span>{quest.name}</span>
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  <i className="fas fa-star text-yellow-500"></i> +{quest.rewardXP} XP &nbsp;
                  <i className="fas fa-coins text-orange-500"></i> +{quest.rewardCoins} coins
                </div>
              </div>
              <div className="text-sm font-medium">
                {quest.completed ? (
                  <span className="text-green-600 bg-green-100 px-2 py-0.5 rounded-full">Completed</span>
                ) : (
                  <span className="text-gray-600">{quest.progress} / {quest.target}</span>
                )}
              </div>
            </div>
            {/* Progress bar - only show if not completed */}
            {!quest.completed && (
              <div className="mt-2">
                <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-green-400 to-green-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(quest.progress / quest.target) * 100}%` }}
                  ></div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="mt-3 text-xs text-center text-gray-400">
        <i className="fas fa-sync-alt"></i> Quests reset daily. Complete them for bonus rewards!
      </div>
    </div>
  );
}
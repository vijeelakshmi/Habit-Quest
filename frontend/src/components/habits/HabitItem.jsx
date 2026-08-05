import { useHabits } from '../../context/HabitContext';
import { todayStr } from '../../utils/helpers';

export default function HabitItem({ habit }) {
  const { completeHabit, deleteHabit } = useHabits();
  const isCompletedToday = habit.lastCompletedDate
    ? new Date(habit.lastCompletedDate).toISOString().slice(0,10) === todayStr()
    : false;

  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-xl p-3 flex justify-between items-center border-l-4 border-orange-500 shadow-sm">
      <div className="flex-1">
        <div className="font-semibold text-gray-800">{habit.name}</div>
        <div className="flex items-center gap-2 text-sm">
          <span className="bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded-full text-xs">
            🔥 {habit.streak} day streak
          </span>
          <span className="text-xs text-gray-500">
            {isCompletedToday ? '✅ Completed today' : '⏳ Not done'}
          </span>
        </div>
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => completeHabit(habit._id)}
          disabled={isCompletedToday}
          className={`px-3 py-1 rounded-full text-white font-semibold ${
            isCompletedToday
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-green-500 hover:bg-green-600'
          }`}
        >
          ✓
        </button>
        <button
          onClick={() => deleteHabit(habit._id)}
          className="bg-red-100 text-red-600 px-3 py-1 rounded-full hover:bg-red-200"
        >
          🗑️
        </button>
      </div>
    </div>
  );
}
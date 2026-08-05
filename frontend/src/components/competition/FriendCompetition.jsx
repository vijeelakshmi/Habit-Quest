import { useHabits } from '../../context/HabitContext';

export default function FriendCompetition() {
  const { competition, challengeFriend } = useHabits();
  const { userPoints, rivalPoints } = competition;

  const getMessage = () => {
    if (userPoints > rivalPoints) return '🏆 YOU are winning! Keep streaking!';
    if (rivalPoints > userPoints) return '😤 Alex leads — complete habits!';
    return '🤝 TIED! One more habit!';
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-md">
      <h3 className="text-lg font-bold mb-2 flex items-center gap-2">
        <i className="fas fa-handshake text-purple-500"></i> Friend Rivalry
      </h3>
      <div className="flex justify-between items-center mb-4">
        <div className="text-center">
          <i className="fas fa-user text-gray-600"></i>
          <div className="text-2xl font-bold">{userPoints}</div>
          <div className="text-xs">You</div>
        </div>
        <div className="text-gray-500 font-bold">VS</div>
        <div className="text-center">
          <i className="fas fa-user-friends text-purple-500"></i>
          <div className="text-2xl font-bold">{rivalPoints}</div>
          <div className="text-xs">Alex</div>
        </div>
      </div>
      <div className="text-center text-sm mb-3">{getMessage()}</div>
      <button
        onClick={challengeFriend}
        className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 text-white py-2 rounded-full hover:opacity-90 transition"
      >
        ⚡ Challenge Friend
      </button>
    </div>
  );
}
import { useAuth } from '../../context/AuthContext';

export default function Header() {
  const { user, logout } = useAuth();

  return (
    <header className="flex justify-between items-center p-4 bg-white/30 backdrop-blur-sm rounded-2xl shadow-md">
      <div className="flex items-center gap-2">
        <i className="fas fa-gamepad text-2xl text-orange-500"></i>
        <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-pink-500">
          HabitQuest
        </h1>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-gray-700">Welcome, {user?.name}!</span>
        <button
          onClick={logout}
          className="px-4 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>
    </header>
  );
}
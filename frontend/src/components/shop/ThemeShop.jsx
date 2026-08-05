import { useAuth } from '../../context/AuthContext';
import { useHabits } from '../../context/HabitContext';

const themes = [
  { name: 'sunset', label: '🌅 Sunset', color: 'bg-gradient-to-br from-orange-200 to-pink-200' },
  { name: 'ocean', label: '🌊 Ocean', color: 'bg-gradient-to-br from-blue-200 to-cyan-200' },
  { name: 'forest', label: '🌲 Forest', color: 'bg-gradient-to-br from-green-200 to-emerald-200' },
  { name: 'candy', label: '🍬 Candy', color: 'bg-gradient-to-br from-pink-200 to-rose-200' },
];

export default function ThemeShop() {
  const { user } = useAuth();
  const { buyTheme, changeTheme } = useHabits();

  const handleThemeSelect = (theme) => {
    if (user.theme === theme) {
      return; // already applied
    }
    // If the user already has the theme? For simplicity, we allow buying any theme for 10 coins.
    // In a real app, you'd track owned themes. We'll just treat any theme as purchasable.
    // If they have enough coins, buy it; if not, show error.
    if (user.coins >= 10) {
      buyTheme(theme);
    } else {
      toast.error('Not enough coins! Complete habits to earn more.');
    }
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-md">
      <h3 className="text-lg font-bold mb-2 flex items-center gap-2">
        <i className="fas fa-palette text-pink-500"></i> Theme Shop
      </h3>
      <p className="text-xs text-gray-500 mb-3">Unlock colorful themes (10 coins each)</p>
      <div className="grid grid-cols-2 gap-2">
        {themes.map((theme) => (
          <button
            key={theme.name}
            onClick={() => handleThemeSelect(theme.name)}
            className={`${theme.color} p-2 rounded-xl text-sm font-medium hover:scale-105 transition ${
              user.theme === theme.name ? 'ring-2 ring-orange-500' : ''
            }`}
          >
            {theme.label}
          </button>
        ))}
      </div>
      <div className="mt-3 text-xs text-center text-gray-500">
        Current theme: {themes.find(t => t.name === user.theme)?.label || 'Sunset'}
      </div>
    </div>
  );
}
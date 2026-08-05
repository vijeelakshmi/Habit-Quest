import { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';
import { useAuth } from './AuthContext';
import toast from 'react-hot-toast';

const HabitContext = createContext();

export const useHabits = () => useContext(HabitContext);

export const HabitProvider = ({ children }) => {
  const { user, updateUser } = useAuth();
  const [habits, setHabits] = useState([]);
  const [badges, setBadges] = useState([]);
  const [quests, setQuests] = useState([]);
  const [competition, setCompetition] = useState({ userPoints: 0, rivalPoints: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchAllData();
    }
  }, [user]);

  const fetchAllData = async () => {
    setLoading(true);
    try {
      await Promise.all([
        fetchHabits(),
        fetchBadges(),
        fetchQuests(),
        fetchCompetition(),
      ]);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Failed to load data. Check connection.');
    } finally {
      setLoading(false);
    }
  };

  const fetchHabits = async () => {
    try {
      const { data } = await api.get('/habits');
      setHabits(data);
      return data;
    } catch (error) {
      console.error('Fetch habits error:', error);
      throw error;
    }
  };

  const fetchBadges = async () => {
    try {
      const { data } = await api.get('/shop/user/badges');
      setBadges(data);
      return data;
    } catch (error) {
      console.error('Fetch badges error:', error);
      return [];
    }
  };

  const fetchQuests = async () => {
    try {
      const { data } = await api.get('/quests/today');
      setQuests(data);
      return data;
    } catch (error) {
      console.error('Fetch quests error:', error);
      return [];
    }
  };

  const fetchCompetition = async () => {
    try {
      const { data } = await api.get('/competition/friend');
      setCompetition(data);
      return data;
    } catch (error) {
      console.error('Fetch competition error:', error);
      return { userPoints: 0, rivalPoints: 0 };
    }
  };

  // ADD HABIT - with re-fetch to ensure fresh data
  const addHabit = async (name) => {
    try {
      await api.post('/habits', { name });
      // Re-fetch the entire list to get the latest data (cache safe)
      await fetchHabits();
      toast.success('Habit added!');
    } catch (error) {
      console.error('Add habit error:', error);
      toast.error(error.response?.data?.message || 'Failed to add habit');
      throw error;
    }
  };

  const completeHabit = async (habitId) => {
    try {
      const { data } = await api.put(`/habits/${habitId}/complete`);
      // Update habits list with updated habit
      setHabits(prev => prev.map(h => h._id === habitId ? data.habit : h));
      // Update user stats
      if (data.leveledUp) {
        updateUser({ level: data.newLevel, xp: data.newXP, coins: data.newCoins });
        toast.success(`🎉 Level Up! You are now level ${data.newLevel}!`);
      } else {
        updateUser({ xp: data.newXP, coins: data.newCoins });
      }
      toast.success(`+${data.xpGain} XP, +${data.coinGain} coins!`);
      // Refresh badges, quests, and competition (they might have changed)
      await Promise.all([fetchBadges(), fetchQuests(), fetchCompetition()]);
    } catch (error) {
      console.error('Complete habit error:', error);
      toast.error(error.response?.data?.message || 'Failed to complete habit');
    }
  };

  const deleteHabit = async (habitId) => {
    try {
      await api.delete(`/habits/${habitId}`);
      // Remove from local state
      setHabits(prev => prev.filter(h => h._id !== habitId));
      toast.success('Habit deleted');
      await fetchCompetition(); // update friend points
    } catch (error) {
      console.error('Delete habit error:', error);
      toast.error('Failed to delete habit');
    }
  };

  const challengeFriend = async () => {
    try {
      const { data } = await api.post('/competition/challenge');
      setCompetition(prev => ({ ...prev, rivalPoints: data.rivalPoints }));
      toast.success(`Alex gained +${data.increment} points! Can you catch up?`);
    } catch (error) {
      console.error('Challenge friend error:', error);
      toast.error('Failed to challenge friend');
    }
  };

  const buyTheme = async (theme) => {
    try {
      const { data } = await api.post('/shop/buy-theme', { theme });
      updateUser({ coins: data.coins, theme: data.theme });
      toast.success(`Theme changed to ${theme}!`);
      await fetchBadges(); // refresh badges (coins may have changed)
    } catch (error) {
      console.error('Buy theme error:', error);
      toast.error(error.response?.data?.message || 'Failed to buy theme');
    }
  };

  const changeTheme = async (theme) => {
    try {
      const { data } = await api.put('/shop/user/theme', { theme });
      updateUser({ theme: data.theme });
      toast.success(`Theme changed to ${theme}!`);
    } catch (error) {
      console.error('Change theme error:', error);
      toast.error('Failed to change theme');
    }
  };

  const updateBadgeQuest = async () => {
    try {
      await api.post('/quests/update-badge');
      await fetchQuests();
    } catch (error) {
      console.error('Failed to update badge quest', error);
    }
  };

  const value = {
    habits,
    badges,
    quests,
    competition,
    loading,
    addHabit,
    completeHabit,
    deleteHabit,
    challengeFriend,
    buyTheme,
    changeTheme,
    updateBadgeQuest,
    refresh: fetchAllData,
  };

  return <HabitContext.Provider value={value}>{children}</HabitContext.Provider>;
};
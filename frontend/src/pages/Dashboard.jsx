import { Toaster } from 'react-hot-toast';
import Header from '../components/layout/Header';
import StatsBar from '../components/stats/StatsBar';
import HabitList from '../components/habits/HabitList';
import AddHabit from '../components/habits/AddHabit';
import BadgesList from '../components/stats/BadgeList';
import FriendCompetition from '../components/competition/FriendCompetition';
import DailyQuests from '../components/quests/DailyQuests';
import ThemeShop from '../components/shop/ThemeShop';
import { useHabits } from '../context/HabitContext';

export default function Dashboard() {
  const { loading } = useHabits();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-2xl text-gray-600 animate-pulse">Loading your quests...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 md:p-6">
      {/* Toast notifications container - MUST be present */}
      <Toaster 
        position="top-center"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#363636',
            color: '#fff',
          },
          success: {
            duration: 2000,
            iconTheme: { primary: '#10b981', secondary: '#fff' },
          },
          error: {
            duration: 3000,
            iconTheme: { primary: '#ef4444', secondary: '#fff' },
          },
        }}
      />
      
      <Header />
      <StatsBar />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg">
            <AddHabit />
            <HabitList />
          </div>
        </div>
        
        <div className="space-y-6">
          <BadgesList />
          <FriendCompetition />
          <DailyQuests />
          <ThemeShop />
        </div>
      </div>
    </div>
  );
}
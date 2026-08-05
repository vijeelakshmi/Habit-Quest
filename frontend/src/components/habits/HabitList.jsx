import { useHabits } from '../../context/HabitContext';
import HabitItem from './HabitItem';

export default function HabitList() {
  const { habits } = useHabits();

  if (habits.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        ✨ No habits yet. Add your first habit above!
      </div>
    );
  }

  return (
    <div className="space-y-3 mt-4">
      {habits.map((habit) => (
        <HabitItem key={habit._id} habit={habit} />
      ))}
    </div>
  );
}
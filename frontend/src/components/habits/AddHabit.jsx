import { useState } from 'react';
import { useHabits } from '../../context/HabitContext';
import toast from 'react-hot-toast';

export default function AddHabit() {
  const [name, setName] = useState('');
  const { addHabit } = useHabits();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const habitName = name.trim();
    if (!habitName) {
      toast.error('Please enter a habit name');
      return;
    }
    try {
      await addHabit(habitName);
      setName(''); // Clear input on success
    } catch (err) {
      // Error already handled in context, but we can add fallback
      toast.error('Failed to add habit. Check console.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="New habit (e.g., Morning Walk)"
        className="flex-1 px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-orange-400 bg-white/80"
      />
      <button
        type="submit"
        className="bg-gradient-to-r from-orange-500 to-pink-500 text-white px-4 py-2 rounded-full font-semibold hover:opacity-90 transition shadow-md"
      >
        + Add
      </button>
    </form>
  );
}
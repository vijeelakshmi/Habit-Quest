import api from './api';

// This service is optional; you can use the context directly. We'll keep it minimal.
export const getHabits = async () => {
  const { data } = await api.get('/habits');
  return data;
};

export const createHabit = async (name) => {
  const { data } = await api.post('/habits', { name });
  return data;
};

export const completeHabit = async (id) => {
  const { data } = await api.put(`/habits/${id}/complete`);
  return data;
};

export const deleteHabit = async (id) => {
  await api.delete(`/habits/${id}`);
};
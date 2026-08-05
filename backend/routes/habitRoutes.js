import express from 'express';
import { getHabits, createHabit, completeHabit, deleteHabit } from '../controllers/habitController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.route('/').get(protect, getHabits).post(protect, createHabit);
router.put('/:id/complete', protect, completeHabit);
router.delete('/:id', protect, deleteHabit);

export default router;
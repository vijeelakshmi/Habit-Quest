import express from 'express';
import { getTodayQuests, updateBadgeQuest } from '../controllers/questController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.get('/today', protect, getTodayQuests);
router.post('/update-badge', protect, updateBadgeQuest);

export default router;
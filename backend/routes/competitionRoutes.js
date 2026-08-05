import express from 'express';
import { getCompetition, challengeFriend } from '../controllers/competitionController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.get('/friend', protect, getCompetition);
router.post('/challenge', protect, challengeFriend);

export default router;
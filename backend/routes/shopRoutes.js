import express from 'express';
import { getThemes, buyTheme, changeTheme, getBadges } from '../controllers/shopController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.get('/themes', protect, getThemes);
router.post('/buy-theme', protect, buyTheme);
router.put('/user/theme', protect, changeTheme);
router.get('/user/badges', protect, getBadges);

export default router;
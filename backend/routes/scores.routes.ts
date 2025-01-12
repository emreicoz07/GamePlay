import { Router } from 'express';
import { ScoresController } from '../controllers/scores.controller';

const router = Router();
const scoresController = new ScoresController();

// Skor kaydetme
router.post('/scores', scoresController.submitScore.bind(scoresController));

// Liderlik tablosu
router.get('/leaderboard', scoresController.getLeaderboard.bind(scoresController));

// Ülke istatistikleri
router.get('/countries', scoresController.getCountryStats.bind(scoresController));

export default router; 
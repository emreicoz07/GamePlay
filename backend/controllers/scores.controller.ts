import { Request, Response } from 'express';
import { Score } from '../models/Score';

export class ScoresController {
  // Skor kaydetme
  async submitScore(req: Request, res: Response): Promise<void> {
    try {
      const { playerName, score, countryCode } = req.body;

      if (!playerName || !score || !countryCode) {
        res.status(400).json({ error: 'Missing required fields' });
        return;
      }

      const newScore = new Score({
        playerName,
        score,
        countryCode
      });

      const savedScore = await newScore.save();
      res.status(201).json(savedScore);
    } catch (error) {
      console.error('Error submitting score:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  // Leaderboard getirme
  async getLeaderboard(req: Request, res: Response): Promise<void> {
    try {
      const limit = Math.min(parseInt(req.query.limit as string) || 20, 100);
      const countryCode = req.query.countryCode as string;

      const query = countryCode ? { countryCode } : {};

      const scores = await Score.aggregate([
        { $match: query },
        { 
          $setWindowFields: {
            sortBy: { score: -1 },
            output: {
              rank: {
                $rank: {}
              }
            }
          }
        },
        { $match: { rank: { $lte: limit } } },
        { 
          $project: {
            _id: 1,
            playerName: 1,
            score: 1,
            countryCode: 1,
            createdAt: 1,
            rank: 1
          }
        },
        { $sort: { score: -1, createdAt: -1 } }
      ]);

      res.json(scores);
    } catch (error) {
      console.error('Detailed error:', error);
      res.status(500).json({ 
        error: 'Internal server error', 
        details: process.env.NODE_ENV === 'development' ? error.message : undefined 
      });
    }
  }

  // Ülke bazlı istatistikler
  async getCountryStats(_req: Request, res: Response): Promise<void> {
    try {
      const stats = await Score.aggregate([
        {
          $group: {
            _id: '$countryCode',
            totalGames: { $count: {} },
            highestScore: { $max: '$score' },
            averageScore: { $avg: '$score' }
          }
        },
        {
          $project: {
            country_code: '$_id',
            total_games: '$totalGames',
            highest_score: '$highestScore',
            average_score: { $round: ['$averageScore', 0] },
            _id: 0
          }
        },
        { $sort: { highest_score: -1 } }
      ]);

      res.json(stats);
    } catch (error) {
      console.error('Error fetching country stats:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
} 
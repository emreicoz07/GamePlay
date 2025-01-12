import axios from 'axios';

const API_URL = 'https://gameplay-backend.onrender.com';
// const API_URL = 'http://localhost:3000/api';

export interface LeaderboardEntry {
  _id: string;
  playerName: string;
  score: number;
  countryCode: string;
  rank: number;
  createdAt: string;
  formattedDate: string;
}

export interface CountryStats {
  country_code: string;
  total_games: number;
  highest_score: number;
  average_score: number;
}

class ApiService {
  private api;

  constructor() {
    this.api = axios.create({
      baseURL: API_URL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      }
    });
  }

  // Skor gönderme
  async submitScore(data: { playerName: string; score: number; countryCode: string }) {
    try {
      const response = await this.api.post('/scores', data);
      return response.data;
    } catch (error) {
      console.error('Error submitting score:', error);
      throw error;
    }
  }

  // Liderlik tablosu
  async getLeaderboard(params?: { limit?: number; countryCode?: string }) {
    try {
      const response = await this.api.get('/leaderboard', { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
      throw error;
    }
  }

  // Ülke istatistiklerini getirme
  async getCountryStats() {
    try {
      const response = await this.api.get<CountryStats[]>('/countries');
      return response.data;
    } catch (error) {
      console.error('Error fetching country stats:', error);
      throw error;
    }
  }
}

export const apiService = new ApiService(); 
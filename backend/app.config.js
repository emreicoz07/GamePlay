require('dotenv').config();

module.exports = {
  // Server yapılandırması
  server: {
    port: process.env.PORT || 3000,
    host: process.env.HOST || 'localhost',
  },

  // Veritabanı yapılandırması
  database: {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    name: process.env.DB_NAME || 'snake_game',
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
  },

  // JWT yapılandırması
  jwt: {
    secret: process.env.JWT_SECRET || 'your-secret-key',
    expiresIn: process.env.JWT_EXPIRES_IN || '24h',
  },

  // CORS yapılandırması
  cors: {
    origin: process.env.CORS_ORIGIN || 'http://localhost:19006',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  },

  // Rate limiting yapılandırması
  rateLimit: {
    windowMs: 15 * 60 * 1000, // 15 dakika
    max: 100, // IP başına limit
  },

  // Leaderboard yapılandırması
  leaderboard: {
    defaultLimit: 10,
    maxLimit: 100,
    updateInterval: 30000, // 30 saniye
    cacheTime: 60000, // 1 dakika
  },
}; 
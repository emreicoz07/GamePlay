import dotenv from 'dotenv';
dotenv.config();

interface Config {
  server: {
    port: number;
    host: string;
  };
  database: {
    host: string;
    port: number;
    name: string;
    user: string;
    password: string;
  };
  jwt: {
    secret: string;
    expiresIn: string;
  };
  cors: {
    origin: string;
    methods: string[];
    allowedHeaders: string[];
  };
  rateLimit: {
    windowMs: number;
    max: number;
  };
  leaderboard: {
    defaultLimit: number;
    maxLimit: number;
    updateInterval: number;
    cacheTime: number;
  };
}

const config: Config = {
  server: {
    port: Number(process.env.PORT) || 3000,
    host: process.env.HOST || 'localhost',
  },
  database: {
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 5432,
    name: process.env.DB_NAME || 'snake_game',
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'your-secret-key',
    expiresIn: process.env.JWT_EXPIRES_IN || '24h',
  },
  cors: {
    origin: process.env.CORS_ORIGIN || 'http://localhost:19006',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  },
  rateLimit: {
    windowMs: 15 * 60 * 1000,
    max: 100,
  },
  leaderboard: {
    defaultLimit: 10,
    maxLimit: 100,
    updateInterval: 30000,
    cacheTime: 60000,
  },
};

export default config; 
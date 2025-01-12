import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import { connectDB } from '../db/connection';
import config from '../app.config';
import scoresRoutes from '../routes/scores.routes';

const app = express();

// CORS ayarlarını güncelle
const allowedOrigins = process.env.CORS_ORIGIN?.split(',') || [
  'http://localhost:8081',
  'http://localhost:19006',
  'http://localhost:3000'
];

// Güvenlik ve performans middleware'leri
app.use(helmet());
app.use(compression());
app.use(cors({
  origin: (origin, callback) => {
    // origin null olabilir (örn: Postman kullanırken)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('CORS policy violation'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

app.use(express.json());

// Rate limiting için middleware
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 dakika
  max: 100 // IP başına limit
});
app.use(limiter);

// Routes
app.use('/api', scoresRoutes);

// MongoDB Atlas bağlantısı
connectDB().then(() => {
  app.listen(config.server.port, () => {
    console.log(`Server running on port ${config.server.port}`);
  });
}).catch(err => {
  console.error('Failed to connect to MongoDB Atlas:', err);
  process.exit(1);
});

// Hata yakalama
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err);
});
import mongoose from 'mongoose';

const scoreSchema = new mongoose.Schema({
  playerName: {
    type: String,
    required: true,
    trim: true,
    maxLength: 50,
    index: true
  },
  score: {
    type: Number,
    required: true,
    index: true
  },
  countryCode: {
    type: String,
    required: true,
    length: 2,
    uppercase: true,
    index: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    index: true
  }
}, {
  timestamps: true,
  collation: { locale: 'tr', strength: 2 }
});

// Bileşik indeksler
scoreSchema.index({ score: -1, createdAt: -1 });
scoreSchema.index({ countryCode: 1, score: -1 });

export const Score = mongoose.model('Score', scoreSchema); 
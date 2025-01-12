import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';

// .env dosyasının yolunu düzelt
dotenv.config({ path: path.resolve(__dirname, '../.env') });

// MongoDB bağlantı seçenekleri
const options: mongoose.ConnectOptions = {
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
};

export async function connectDB() {
  try {
    const uri = process.env.MONGODB_URI;
    
    // URI kontrolü
    if (!uri) {
      throw new Error('MONGODB_URI is not defined in environment variables');
    }

    // MongoDB'ye bağlan
    await mongoose.connect(uri, options);
    console.log('Successfully connected to MongoDB Atlas');
    
    // Production ortamında debug loglarını kapatalım
    if (process.env.NODE_ENV === 'production') {
      mongoose.set('debug', false);
    }
  } catch (error) {
    console.error('Error connecting to MongoDB Atlas:', error);
    process.exit(1);
  }
}

// Bağlantı durumu izleme
mongoose.connection.on('connected', () => {
  console.log('MongoDB connection established');
});

mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('MongoDB connection disconnected');
});

// Uygulama kapandığında bağlantıyı düzgün şekilde kapat
process.on('SIGINT', async () => {
  await mongoose.connection.close();
  process.exit(0);
}); 
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { connectDatabase } from './config/database';
import authRoutes from './routes/auth';
import coursesRoutes from './routes/courses';
import postsRoutes from './routes/posts';

// Load environment variables FIRST
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/courses', coursesRoutes);
app.use('/api/posts', postsRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Start server
const startServer = async () => {
  try {
    // Connect to MongoDB first
    await connectDatabase();
    
    // Start Express server (even if MongoDB isn't connected)
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
      console.log(`   Health check: http://localhost:${PORT}/health`);
      
      // Check MongoDB status
      if (mongoose.connection.readyState === 1) {
        console.log(`   ✅ MongoDB: Connected`);
      } else {
        console.log(`   ⚠️  MongoDB: Not connected (some routes may not work)`);
      }
    });
  } catch (error: any) {
    if (error.code === 'EADDRINUSE') {
      console.error(`Port ${PORT} is already in use. Try a different port or kill the process using it.`);
    } else {
      console.error('Failed to start server:', error);
    }
    process.exit(1);
  }
};

startServer();

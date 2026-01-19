import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load env vars if not already loaded
dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/classpals';

// Connection event handlers
mongoose.connection.on('connected', () => {
  console.log('✅ MongoDB connected successfully');
});

mongoose.connection.on('error', (err) => {
  console.error('❌ MongoDB connection error:', err.message);
});

mongoose.connection.on('disconnected', () => {
  console.log('⚠️  MongoDB disconnected');
});

// Connect to MongoDB
export const connectDatabase = async (): Promise<void> => {
  try {
    console.log('Attempting to connect to MongoDB...');
    console.log(`URI: ${MONGODB_URI.replace(/:[^:@]+@/, ':****@')}`); // Hide password in logs
    
    await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
    });
    
    // Verify connection
    if (mongoose.connection.readyState === 1) {
      console.log('✅ MongoDB connected successfully');
    } else {
      console.log('⚠️  MongoDB connection state:', mongoose.connection.readyState);
    }
  } catch (error: any) {
    console.error('❌ Failed to connect to MongoDB');
    console.error('   Error:', error.message);
    console.error('');
    console.error('💡 To fix this:');
    console.error('   1. Check your MONGODB_URI in .env');
    console.error('   2. Verify MongoDB Atlas network access allows your IP (0.0.0.0/0 for testing)');
    console.error('   3. Check MongoDB Atlas cluster is running');
    console.error('');
    // Don't throw - allow server to start without DB
  }
};

// Check if MongoDB is connected
export const isDatabaseConnected = (): boolean => {
  return mongoose.connection.readyState === 1;
};

// Disconnect from MongoDB
export const disconnectDatabase = async (): Promise<void> => {
  try {
    await mongoose.disconnect();
    console.log('MongoDB disconnected gracefully');
  } catch (error) {
    console.error('Error disconnecting from MongoDB:', error);
  }
};


import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    let connectionString = MONGODB_URI;

    // In-memory fallback for development if no URI provided or connection refused
    if (!connectionString && process.env.NODE_ENV === 'development') {
      console.log('⚠️ No MONGODB_URI found. Initializing in-memory MongoDB server...');
      try {
        const { MongoMemoryServer } = await import('mongodb-memory-server');
        const mongoServer = await MongoMemoryServer.create();
        connectionString = mongoServer.getUri();
        console.log('✅ In-memory MongoDB server started at:', connectionString);
      } catch (err) {
        console.error('❌ Failed to start in-memory MongoDB server:', err);
      }
    }

    if (!connectionString) {
      throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
    }

    cached.promise = mongoose.connect(connectionString, opts).then((mongoose) => {
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default dbConnect;

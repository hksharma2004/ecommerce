import mongoose from "mongoose";

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
  if (cached.conn) {
    console.log('✅ Using existing MongoDB connection');
    return cached.conn;
  }


  if (!process.env.MONGODB_URI) {
    console.error('❌ MONGODB_URI environment variable is not defined');
    throw new Error('MONGODB_URI environment variable is not defined');
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      dbName: "quickcart",
    };

    console.log('🔄 Connecting to MongoDB...');


    cached.promise = mongoose.connect(process.env.MONGODB_URI, opts).then((mongoose) => {
      console.log('✅ MongoDB connected successfully');
      return mongoose;
    }).catch((error) => {
      console.error('❌ MongoDB connection error:', error);
      throw error;
    });
  }

  try {
    cached.conn = await cached.promise;
    return cached.conn;
  } catch (error) {
    console.error('❌ Failed to establish MongoDB connection:', error);
    cached.promise = null;
    throw error;
  }
}

export default connectDB;
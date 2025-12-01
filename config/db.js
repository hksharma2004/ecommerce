import mongoose from "mongoose";

function initCache() {
  if (!global._mongoose) {
    global._mongoose = { conn: null, promise: null };
  }
  return global._mongoose;
}

const cached = initCache();

export default async function connectDB() {
  // Returning existing connection
  if (cached.conn) {
    console.log("✅ Using existing MongoDB connection");
    return cached.conn;
  }

  // Checking  environment variable
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error("❌ MONGODB_URI is not set");
    throw new Error("Missing MONGODB_URI environment variable");
  }

  // Create new connection promise if not yet created
  if (!cached.promise) {
    console.log("🔄 Connecting to MongoDB...");

    const options = {
      bufferCommands: false,
      dbName: "quickcart",
    };

    cached.promise = mongoose
      .connect(uri, options)
      .then((mongooseInstance) => {
        console.log("✅ MongoDB connected successfully");
        return mongooseInstance;
      })
      .catch((err) => {
        console.error("❌ Error while connecting to MongoDB:", err);
        cached.promise = null; // Reset so next attempt can retry
        throw err;
      });
  }

  try {
    cached.conn = await cached.promise;
    return cached.conn;
  } catch (err) {
    console.error("❌ Failed to establish MongoDB connection:", err);
    cached.promise = null;
    throw err;
  }
}

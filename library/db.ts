import mongoose from "mongoose";

const DATABASE_URI = process.env.DATABASE_URI!;

if (!DATABASE_URI) {
  throw new Error(
    "Please define the DATABASE_URI environment variable inside .env.local"
  );
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: true,
      maxPoolSize: 10,
    };

    cached.promise = mongoose
      .connect(DATABASE_URI, opts)
      .then(() => mongoose.connection);
  }

  try {
      console.log("Connected to database", cached.conn);
    cached.conn = await cached.promise;
    
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}
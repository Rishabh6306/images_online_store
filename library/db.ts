import mongoose from "mongoose";

const DATABASE_URI = process.env.MONGODB_URI!;


if (!DATABASE_URI) {
    throw new Error('Check your database connection Something went wrong.');
}

let cached = global.mongooseFromGlobal;

if (!cached) {
    cached = global.mongooseFromGlobal = { conn: null, promise: null }
}

export async function connectToDatabase() {
    if (cached.conn) return cached.promise;

    if (!cached.promise) {
        const options = {
            bufferCommands: true,
            maxPoolSize: 10,
        };

        cached.promise = mongoose.connect(DATABASE_URI, options).then(() => mongoose.connection);
    }

    try {
        cached.conn = await cached.promise;
    } catch (error) {
        cached.promise = null;
    }

    return cached.conn;
}
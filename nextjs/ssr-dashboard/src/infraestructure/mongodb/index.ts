import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
  throw new Error("Provide MONGODB_URI environment variable");
}

let cached: typeof mongoose | null;

export async function connect() {
  if (cached) return cached;

  if (!cached) {
    cached = await mongoose
      .connect(MONGODB_URI, { dbName: "dashboard" })
      .then((mongoose) => mongoose);
  }

  return cached;
}

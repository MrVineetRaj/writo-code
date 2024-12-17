"use server";

import mongoose from "mongoose";

let cachedDb: mongoose.Connection | null = null;

const connectToDatabase = async (): Promise<mongoose.Connection> => {
  if (cachedDb) {
    return cachedDb;
  }

  const db = await mongoose.connect(process.env.DB_CONN_URL!, {
    dbName: "WritoCode",
    connectTimeoutMS: 30 * 1000,
  });

  cachedDb = db.connection;
  return cachedDb;
};

export default connectToDatabase;

import mongoose from "mongoose";
import { DatabaseConnectionError } from "@jvtickets22/common";

export default async () => {
  if (!process.env.MONGO_URI) {
    throw new Error("MONGO URI must be defined");
  }

  try {
    const connection = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    return connection;
  } catch (error) {
    throw new DatabaseConnectionError();
  }
};

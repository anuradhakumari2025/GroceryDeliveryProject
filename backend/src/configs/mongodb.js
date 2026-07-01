import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectDB = async () => {
  try {
    mongoose.connection.on("connected", () =>
      console.log("MongoDB database connection established successfully"),
    );

    const dbName = process.env.NODE_ENV === "test" ? "grocery_TEST" : "grocery";

    await mongoose.connect(`${process.env.MONGODB_URI}/${dbName}`);
    console.log(`Connected cleanly to database environment: ${dbName}`);
  } catch (err) {
    console.error("MongoDB connection error:", err);
  }
};

export default connectDB;

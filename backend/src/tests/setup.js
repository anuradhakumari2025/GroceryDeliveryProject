import mongoose from "mongoose";
import dotenv from "dotenv";
import connectDB from "../configs/mongodb.js";

dotenv.config();

console.log("JEST SETUP IS RUNNING");

beforeAll(async () => {
    await connectDB();
});

afterAll(async () => {
    await mongoose.connection.close();
});
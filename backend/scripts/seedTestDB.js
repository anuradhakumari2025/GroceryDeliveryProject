import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "../src/models/User.js";
import Product from "../src/models/Product.js";
import Address from "../src/models/Address.js";
import Order from "../src/models/Order.js";
import bcrypt from "bcryptjs";

dotenv.config();

const DB = `${process.env.MONGODB_URI}/grocery_TEST`;

await mongoose.connect(DB);

console.log("Connected to test db");

await Product.deleteMany({});
await Address.deleteMany({});
await Order.deleteMany({});
await User.deleteMany({});

const hashedPassword = await bcrypt.hash("test", 10);

await User.create({
  name: "Test User",
  email: "test@gmail.com",
  password: hashedPassword,
  cartItems: {},
});

await Product.insertMany([
  {
    name: "Apple",
    description: [
      "Fresh and juicy apples",
      "Rich in vitamins and antioxidants",
    ],
    price: 120,
    offerPrice: 100,
    category: "Fruits",
  },
  {
    name: "Rice",
    description: ["Premium quality rice", "Perfect for everyday meals"],
    price: 70,
    offerPrice: 60,
    category: "Grains",
  },
]);

console.log("Seed completed");

process.exit();

import connectDB from "./src/configs/mongodb.js";
import app from "./src/app.js";
import connectCloudinary from "./src/configs/cloudinary.js";

import { config } from "dotenv";

config();
const port = process.env.PORT || 3000;

await connectDB();
await connectCloudinary();

app.get("/", (req, res) => {
  res.send("API is working");
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

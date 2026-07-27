import express from "express";
import productRouter from "../routes/ProductRoute.js";

const app = express();

app.use(express.json());

app.use("/api/product", productRouter);

export default app;
import express from "express";
import productRouter from "./routes/ProductRoute.js";
import cartRouter from "./routes/CartRoute.js";
import addressRouter from "./routes/AddressRoute.js";
import orderRouter from "./routes/OrderRoute.js";
import userRouter from "./routes/UserRoute.js";
import sellerRouter from "./routes/SellerRoute.js";
import cookieParser from "cookie-parser";
import cors from "cors";


const app = express();


//allow multiple origins
const allowedOrigins = ["http://localhost:5173"];

//Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: allowedOrigins, credentials: true }));


app.use("/api/user", userRouter);
app.use("/api/seller", sellerRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/address", addressRouter);
app.use("/api/order", orderRouter);

export default app;
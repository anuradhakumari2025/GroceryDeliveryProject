import cookieParser from "cookie-parser"
import express from "express"
import cors from "cors"
import connectDB from "./configs/mongodb.js"
import userRouter from "./routes/UserRoute.js"
import sellerRouter from "./routes/SellerRoute.js"
import connectCloudinary from "./configs/cloudinary.js"
import productRouter from "./routes/ProductRoute.js"
import cartRouter from "./routes/CartRoute.js"
import addressRouter from "./routes/AddressRoute.js"
import orderRouter from "./routes/OrderRoute.js"

const app = express()
const port = process.env.PORT || 3000

//allow multiple origins
const allowedOrigins = ['http://localhost:5173']

//Middleware
app.use(express.json())
app.use(cookieParser())
app.use(cors({origin: allowedOrigins,credentials:true}))


await connectDB()
await connectCloudinary()

app.get('/',(req,res)=>{
  res.send("API is working")
})
app.use('/api/user',userRouter)
app.use('/api/seller',sellerRouter)
app.use('/api/product',productRouter)
app.use('/api/cart',cartRouter)
app.use('/api/address',addressRouter)
app.use('/api/order',orderRouter)

app.listen(port,()=>{ 
  console.log(`Server is running on port ${port}`)
})
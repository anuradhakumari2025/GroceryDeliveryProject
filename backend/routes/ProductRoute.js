import express from "express";
import { upload } from "../configs/multer.js";
import authSeller from "../middleware/AuthSeller.js";
import { addProduct, changeStock, productById, productList } from "../controllers/ProductController.js";
const productRouter = express.Router();

productRouter.post('/add',upload.array(['images']),authSeller,addProduct)
productRouter.get('/list',productList)
productRouter.get('/productById',productById)
productRouter.post('/stock',authSeller,changeStock)


export default productRouter;

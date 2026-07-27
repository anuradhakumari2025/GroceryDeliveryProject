import express from "express";
import { upload } from "../configs/multer.js";
import authSeller from "../middleware/AuthSeller.js";
import {
  addProduct,
  changeStock,
  deleteProduct,
  productById,
  productList,
  updateProduct,
} from "../controllers/ProductController.js";

const productRouter = express.Router();

productRouter.post("/add", upload.array(["images"]), authSeller, addProduct);
productRouter.get("/list", productList);
productRouter.get("/:id", productById);
productRouter.post("/stock", authSeller, changeStock);
productRouter.put(
  "/update/:id",
  upload.array(["images"]),
  authSeller,
  updateProduct,
);
productRouter.delete("/delete/:id", authSeller, deleteProduct);

export default productRouter;

import express from 'express';
import { getCart, updateCart } from '../controllers/CartController.js';
import authUser from '../middleware/AuthUser.js';

const cartRouter = express.Router();

cartRouter.post("/update",authUser ,updateCart)
cartRouter.get("/get", authUser, getCart); 

export default cartRouter;
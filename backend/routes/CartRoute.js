import express from 'express';
import { updateCart } from '../controllers/CartController.js';
import authUser from '../middleware/AuthUser.js';

const cartRouter = express.Router();

cartRouter.post("/update",authUser ,updateCart)
export default cartRouter;
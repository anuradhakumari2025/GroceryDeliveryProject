import Order from "../models/Order.js";
import Product from "../models/Product.js";

export const placeOrderCOD = async (req, res) => {
  try {
    const { userId, items, address } = req.body;
    if (items.length === 0 || !address) {
      return res.json({
        success: false,
        message: "Please fill all the fields",
      });
    }

    let amount = await items.reduce(async (acc, item) => {
      const product = await Product.findById(item.product);
      if (!product) {
        return res.json({ success: false, message: "Product not found" });
      }
      return (await acc) + product.offerPrice * product.quantity;
    }, 0);

    //add tax charge (2%)
    amount += Math.round(amount * 0.02); // round to 2 decimal places

    await Order.create({
      userId,
      items,
      address,
      amount,
      paymentType: "COD",
      status: "Placed",
    });
    return res.json({ success: true, message: "Order placed successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//get orders by userId

export const getUserOrders = async (req, res) => {
  try {
    const { userId } = req.body;
    const orders = await Order.find({
      userId,
      $or: [{ paymentType: "COD" }, { isPaid: true }],
    })
      .populate("items.product address")
      .sort({ createdAt: -1 });
    if (!orders) {
      return res.json({ success: false, message: "No orders found" });
    }
    res.json({ success: true, orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};


//get all orders for admin
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      $or: [{ paymentType: "COD" }, { isPaid: true }],
    })
      .populate("items.product address")
      .sort({ createdAt: -1 });
    if (!orders) {
      return res.json({ success: false, message: "No orders found" });
    }
    res.json({ success: true, orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
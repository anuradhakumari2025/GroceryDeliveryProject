import Order from "../models/Order.js";
import Product from "../models/Product.js";
import Razorpay from "razorpay";
import crypto from "crypto";

// Initialize Razorpay instance
const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET_KEY, 
});

export const placeOrderCOD = async (req, res) => {
  try {
    const { items, address } = req.body;
    const userId = req.userId;
    if (!items || items.length === 0 || !address) {
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

      return (await acc) + product.offerPrice * item.quantity;
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

export const placeOrderRazorpay = async (req, res) => {
  try {
    const { items, address } = req.body;
    const userId = req.userId;
    if (!items || items.length === 0 || !address) {
      return res.json({
        success: false,
        message: "Please fill all the fields",
      });
    }

    let productData = [];

    let amount = await items.reduce(async (acc, item) => {
      const product = await Product.findById(item.product);
      if (!product) {
        return res.json({ success: false, message: "Product not found" });
      }
      productData.push({
        name: product.name,
        price: product.offerPrice,
        quantity: item.quantity,
      });
      return (await acc) + product.offerPrice * item.quantity;
    }, 0);

    //add tax charge (2%)
    amount += Math.round(amount * 0.02); // round to 2 decimal places

    const order = await Order.create({
      userId,
      items,
      address,
      amount,
      paymentType: "Online",
    });

    // Create Razorpay order
    const options = {
      amount: amount * 100, // Amount in paise (e.g., ₹500 = 50000 paise)
      currency: "INR",
      receipt: `receipt_${order._id}`,
    };

    // console.log("Razorpay Options:", options);

    const razorpayOrder = await razorpayInstance.orders.create(options);

    if (!razorpayOrder) {
      return res.status(500).json({ success: false, message: "Failed to create Razorpay order" });
    }

    // Return Razorpay order details to the frontend
    return res.json({
      success: true,
      message: "Order placed successfully",
      razorpayOrderId: razorpayOrder.id,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
      orderId: order._id,
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export const verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    // Generate the expected signature
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET_KEY)
      .update(body.toString())
      .digest("hex");

    // Compare the expected signature with the received signature
    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({ success: false, message: "Invalid payment signature" });
    }

    // Update the order status in the database
    const order = await Order.findOneAndUpdate(
      { razorpayOrderId: razorpay_order_id },
      { isPaid: true, status: "Paid" },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    res.json({ success: true, message: "Payment verified successfully", order });
  } catch (error) {
    console.error("Error in payment verification:", error);
    res.status(500).json({ success: false, message: "Payment verification failed" });
  }
};

//get orders by userId

export const getUserOrders = async (req, res) => {
  try {
    const userId = req.userId;
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

import User from "../models/User.js";

export const updateCart = async (req, res) => {
  try {
    const { cartItems } = req.body;
    const userId = req.userId; // Get userId from the authenticated user
    // console.log(userId)
    if (!userId) {
      return res.json({ success: false, message: "User not authenticated" });
    }
    await User.findByIdAndUpdate(userId, { cartItems });
   return res.json({ success: true, message: "Cart updated successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export const getCart = async (req, res) => {
  try {
    const userId = req.userId; // Get userId from the authenticated user
    if (!userId) {
      return res.json({ success: false, message: "User not authenticated" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    res.json({ success: true, cartItems: user.cartItems });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
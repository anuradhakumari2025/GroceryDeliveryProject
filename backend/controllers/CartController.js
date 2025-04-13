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
    res.json({ success: true, message: "Cart updated successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

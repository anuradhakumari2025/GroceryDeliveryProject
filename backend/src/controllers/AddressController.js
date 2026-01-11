import Address from "../models/Address.js";

export const addAddress = async (req, res) => {
  try {
    const {address} = req.body
    const userId = req.userId; // Get userId from the authenticated user

    if (!userId) {
      return res.json({ success: false, message: "User not authenticated" });
    } 
    await Address.create({...address,userId})
    res.json({ success: true, message: "Address added successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
    
  }
}

export const getAddress = async (req, res) => {
  try {
    const userId = req.userId; // Get userId from the authenticated user
    const addresses = await Address.find({userId})
    if(!addresses){ 
      return res.json({ success: false, message: "No address found" });
    }
    res.json({ success: true, addresses });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
    
  }
}
import Product from "../models/Product.js";
import { v2 as cloudinary } from "cloudinary";

export const addProduct = async (req, res) => {
  try {
    // console.log("Request Body:", req.body);
    let productData = JSON.parse(req.body.productData);

    const images = req.files || [];
    let imagesUrl = [];

    //  Check if the backend is running under your Playwright test setup
    if (process.env.NODE_ENV === "test") {
      console.log(
        "⚡ Test environment detected: Mocking Cloudinary upload to save bandwidth.",
      );

      // Map through whatever files were sent and return a static placeholder image for each
      imagesUrl = images.map(() => {
        return "https://cloudinary.com";
      });

      // If for some reason no images were sent in the test but it's required, fallback to one mock URL
      if (imagesUrl.length === 0) {
        imagesUrl = ["https://cloudinary.com"];
      }
    } else {
      // LIVE DEVELOPMENT/PRODUCTION: Real network upload to Cloudinary
      imagesUrl = await Promise.all(
        images.map(async (item) => {
          try {
            const result = await cloudinary.uploader.upload(item.path, {
              resource_type: "image",
            });
            return result.secure_url;
          } catch (err) {
            console.log("message:", err.message);
            console.log("http_code:", err.http_code);
            console.log("name:", err.name);

            if (err.response) {
              console.log(err.response);
            }

            throw err;
          }
        }),
      );
    }
    await Product.create({
      ...productData,
      image: imagesUrl,
    });

    return res.json({ success: true, message: "Product added successfully" });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error.message });
  }
};

export const productList = async (req, res) => {
  try {
    const products = await Product.find({});
    return res.json({ success: true, products });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error.message });
  }
};

export const productById = async (req, res) => {
  try {
    const { id } = req.body;
    const product = await Product.findById(id);
    return res.json({ success: true, product });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error.message });
  }
};

export const changeStock = async (req, res) => {
  try {
    const { id, inStock } = req.body;
    await Product.findByIdAndUpdate(id, { inStock });
    return res.json({ success: true, message: "Stock updated successfully" });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error.message });
  }
};

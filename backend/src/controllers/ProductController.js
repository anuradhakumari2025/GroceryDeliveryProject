import Product from "../models/Product.js";
import { v2 as cloudinary } from "cloudinary";

export const addProduct = async (req, res) => {
  try {
    // console.log("Request Body:", req.body);
    let productData = JSON.parse(req.body.productData);

    const { name, description, category, price, offerPrice } = productData;

    if (!name) {
      return res.json({ success: false, message: "Product name is required" });
    }

    if (
      !description ||
      !Array.isArray(description) ||
      description.length === 0 ||
      description[0].trim() === ""
    ) {
      return res
        .status(400)
        .json({ success: false, message: "Product description is required" });
    }

    if (!category || category.trim() === "") {
      return res
        .status(400)
        .json({ success: false, message: "Product category is required" });
    }

    if (!price || price.toString().trim() === "") {
      return res
        .status(400)
        .json({ success: false, message: "Product price is required" });
    }

    if (!offerPrice || offerPrice.toString().trim() === "") {
      return res
        .status(400)
        .json({ success: false, message: "Product offer price is required" });
    }

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

// Update product data
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    // Validation Checks
    if (!id) {
      return res
        .status(400)
        .json({ success: false, message: "Product ID is required" });
    }

    // console.log(req.body.productData, "req.body.productdata");

    let productData = JSON.parse(req.body.productData);
    const { name, description, category, price, offerPrice } = productData;

    if (!name) {
      return res
        .status(400)
        .json({ success: false, message: "Product name is required" });
    }

    if (
      !description ||
      !Array.isArray(description) ||
      description.length === 0 ||
      description[0].trim() === ""
    ) {
      return res
        .status(400)
        .json({ success: false, message: "Product description is required" });
    }

    if (!category || category.trim() === "") {
      return res
        .status(400)
        .json({ success: false, message: "Product category is required" });
    }

    if (!price || price.toString().trim() === "") {
      return res
        .status(400)
        .json({ success: false, message: "Product price is required" });
    }

    if (!offerPrice || offerPrice.toString().trim() === "") {
      return res
        .status(400)
        .json({ success: false, message: "Product offer price is required" });
    }

    // Find existing product first
    const existingProduct = await Product.findById(id);
    if (!existingProduct) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    // Existing image URLs sent from frontend
    let existingImages = [];

    if (req.body.images) {
      existingImages = Array.isArray(req.body.images)
        ? req.body.images
        : [req.body.images];
    }

    // Upload newly selected files
    const newImages = req.files || [];
    let uploadedImages = [];

    if (newImages.length > 0) {
      if (process.env.NODE_ENV === "test") {
        uploadedImages = newImages.map(() => "https://cloudinary.com");
      } else {
        uploadedImages = await Promise.all(
          newImages.map(async (item) => {
            const result = await cloudinary.uploader.upload(item.path, {
              resource_type: "image",
            });
            return result.secure_url;
          }),
        );
      }
    }

    // Final image array = existing URLs + newly uploaded files
    const updatedImagesUrl = [...existingImages, ...uploadedImages];

    // console.log("req.body.images =", req.body.images);
    // console.log("req.files =", req.files);
    // console.log("updatedImagesUrl =", updatedImagesUrl);

    // 3. Update Database
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      {
        ...productData,
        image: updatedImagesUrl,
      },
      { new: true }, // Returns the modified document
    );

    return res.json({
      success: true,
      message: "Product updated successfully",
      updatedProduct,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

//Delete Product Data
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res
        .status(400)
        .json({ success: false, message: "Product ID is required" });
    }

    // 1. Find the product to extract image URLs
    const product = await Product.findById(id);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    // 2. Optional: Delete images from Cloudinary if not in test environment
    if (
      process.env.NODE_ENV !== "test" &&
      product.image &&
      product.image.length > 0
    ) {
      await Promise.all(
        product.image.map(async (url) => {
          try {
            // Extract the public ID from the Cloudinary URL string
            const publicId = url.split("/").pop().split(".")[0];
            await cloudinary.uploader.destroy(publicId);
          } catch (err) {
            console.log("Failed to delete image from Cloudinary:", err.message);
            // We don't throw error here to ensure the database item still gets deleted
          }
        }),
      );
    } else if (process.env.NODE_ENV === "test") {
      console.log(
        "⚡ Test environment detected: Skipping Cloudinary deletion asset cleanup.",
      );
    }

    // 3. Delete from Database
    await Product.findByIdAndDelete(id);

    return res.json({ success: true, message: "Product deleted successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

//Find product list
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
    const { id } = req.params;
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

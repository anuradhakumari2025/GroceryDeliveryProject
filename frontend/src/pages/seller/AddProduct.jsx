import React, { useEffect, useState } from "react";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";
import { assets, categories } from "../../assets/greencart_assets/assets";
import { useLocation } from "react-router";

const AddProduct = () => {
  const { axios, navigate } = useAppContext();
  const [images, setImages] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [offerPrice, setOfferPrice] = useState("");
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  const updateProduct = location.state?.productData;

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);

      const productData = {
        name,
        description: description.split("\n"),
        // description,
        category,
        price,
        offerPrice,
      };
      // console.log("Product Data: from frontend", productData);
      const formData = new FormData();
      // console.log("product data to be submitted ", productData);
      formData.append("productData", JSON.stringify(productData));

      // Loop through images array
      for (let item of images) {
        if (!item) continue;

        if (item instanceof File) {
          // 🟢 Send new local files to backend storage
          formData.append("images", item);
        } else if (typeof item === "string") {
          // 🟢 Optional: Send existing URLs so your backend knows to keep them
          await formData.append("images", item);
        }
      }

      if (updateProduct) {
        const { data } = await axios.put(
          `/product/update/${updateProduct?._id}`,
          formData,
        );
        if (data.success) {
          // console.log(data.product);
          navigate("/seller/product-list");
        } else {
          return toast.error(data.message);
        }
      } else {
        const { data } = await axios.post("/product/add", formData);

        if (data.success) {
          setName("");
          setDescription("");
          setCategory("");
          setPrice("");
          setOfferPrice("");
          setImages([]);
          toast.success(data.message);
          navigate("/seller/product-list");
        } else {
          return toast.error(data.message);
        }
      }
    } catch (error) {
      console.log(error);
      return toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Agar editProduct mila, toh form fields ko fill kar do
  useEffect(() => {
    if (updateProduct) {
      // console.log(updateProduct);
      setName(updateProduct?.name);
      setDescription(updateProduct?.description.join("\n"));
      setCategory(updateProduct?.category);
      setPrice(updateProduct?.price);
      setOfferPrice(updateProduct?.offerPrice);
      if (updateProduct.image && Array.isArray(updateProduct.image)) {
        setImages(updateProduct.image);
      }
    }
  }, [updateProduct]);

  return (
    <div className="no-scrollbar flex-1 h-[95vh] overflow-y-scroll flex flex-col justify-between">
      <form onSubmit={handleSubmit} className="md:p-10 p-4 space-y-5 max-w-lg">
        {/* Product Images */}
        <div>
          <p className="text-base font-medium">Product Image</p>
          <div className="flex flex-wrap items-center gap-3 mt-2">
            {Array(4)
              .fill("")
              .map((_, index) => (
                <div key={index} className="relative group">
                  <label htmlFor={`image${index}`}>
                    <input
                      id={`image${index}`}
                      type="file"
                      hidden
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          const updatedimages = [...images];
                          updatedimages[index] = e.target.files[0];
                          setImages(updatedimages);
                        }
                      }}
                    />
                    <img
                      name="product-image"
                      className="max-w-24 h-24 object-cover cursor-pointer border rounded"
                      src={
                        images[index] instanceof File
                          ? URL.createObjectURL(images[index])
                          : typeof images[index] === "string"
                            ? images[index]
                            : assets.upload_area
                      }
                      alt=""
                    />
                  </label>

                  {/* 🟢 NEW: Delete Button appears if an image exists */}
                  {images[index] && (
                    <button
                      type="button"
                      onClick={() => {
                        const updatedimages = [...images];
                        updatedimages[index] = null; // Clear this specific slot
                        setImages(updatedimages);
                      }}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs cursor-pointer shadow hover:bg-red-600"
                    >
                      ✕
                    </button>
                  )}
                </div>
              ))}
          </div>
        </div>

        {/* Product Name */}
        <div className="flex flex-col gap-1 max-w-md">
          <label htmlFor="product-name" className="text-base font-medium">
            Product Name
          </label>
          <input
            onChange={(e) => setName(e.target.value)}
            type="text"
            value={name}
            id="product-name"
            placeholder="Type here"
            className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
          />
        </div>

        {/* Product Description */}
        <div className="flex flex-col gap-1 max-w-md">
          <label
            htmlFor="product-description"
            className="text-base font-medium"
          >
            Product Description
          </label>
          <textarea
            id="product-description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            placeholder="Type here"
            className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40 resize-none"
          />
        </div>

        {/* Category */}
        <div className="flex flex-col gap-1 w-full">
          <label htmlFor="product-category" className=" font-medium text-base">
            Category
          </label>
          <select
            id="product-category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
          >
            <option value="" disabled>
              Select a category
            </option>
            {categories.map((item, idx) => (
              <option key={idx} value={item.path}>
                {item.path}{" "}
              </option>
            ))}
          </select>
        </div>

        {/* Product Price */}
        <div className="flex items-center gap-5 flex-wrap">
          <div className="w-32 gap-1 flex flex-col flex-1">
            <label htmlFor="product-price" className="text-base font-medium ">
              Product Price
            </label>
            <input
              type="number"
              id="product-price"
              placeholder="0"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
            />
          </div>
        </div>

        {/* Offer Price */}
        <div className="flex items-center gap-5 flex-wrap">
          <div className="w-32 gap-1 flex flex-col flex-1">
            <label
              htmlFor="product-offerPrice"
              className="text-base font-medium"
            >
              Offer Price
            </label>
            <input
              type="number"
              id="product-offerPrice"
              value={offerPrice}
              placeholder="0"
              onChange={(e) => setOfferPrice(e.target.value)}
              className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          data-testid="submit-product"
          type="submit"
          disabled={loading}
          className={`mt-4 px-8 font-medium py-2 rounded text-white ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-primary hover:bg-primary-dull"
          }`}
        >
          {loading ? (
            <>
              <div className="w-full h-screen absolute top-0 right-0 left-0 bg-black/70">
                <div className="border-t-blue-600 w-10 h-10 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-spin rounded-full border-4"></div>
              </div>
              {updateProduct ? "Updating..." : "Adding..."}
            </>
          ) : updateProduct ? (
            "UPDATE"
          ) : (
            "ADD"
          )}
        </button>
      </form>
    </div>
  );
};

export default AddProduct;

import React, { useState } from "react";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";
import { assets, categories } from "../../assets/greencart_assets/assets";

const AddProduct = () => {
  const { axios } = useAppContext();
  const [files, setFiles] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [offerPrice, setOfferPrice] = useState("");
  const [loading, setLoading] = useState(false); // 👈 Loader state

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setLoading(true); // 👈 Start loader
      const productData = {
        name,
        description: description.split("\n"),
        category,
        price,
        offerPrice,
      };
      // console.log(productData)
      const formData = new FormData();
      formData.append("productData", JSON.stringify(productData));
      for (let i = 0; i < files.length; i++) {
        formData.append("images", files[i]);
      }
      const { data } = await axios.post("/product/add", formData);
      if (data.success) {
        setName("");
        setDescription("");
        setCategory("");
        setPrice("");
        setOfferPrice("");
        setFiles([]);
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setLoading(false); // 👈 Stop loader
    }
  };

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
                <label htmlFor={`image${index}`} key={index}>
                  <input
                    key={index}
                    id={`image${index}`}
                    type="file"
                    hidden
                    onChange={(e) => {
                      const updatedFiles = [...files];
                      updatedFiles[index] = e.target.files[0];
                      setFiles(updatedFiles);
                    }}
                  />
                  <img
                    className="max-w-24 cursor-pointer"
                    src={
                      files[index]
                        ? URL.createObjectURL(files[index])
                        : assets.upload_area
                    }
                    alt=""
                  />
                </label>
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
            required
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
            required
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
            {categories.map((item, idx) => (
              <option key={idx} value={item.path}>
                {item.path}{" "}
              </option>
            ))}
          </select>
        </div>

        {/* Product Price and Offer Price */}
        <div className="flex items-center gap-5 flex-wrap">
          <div className="w-32 gap-1 flex flex-col flex-1">
            <label htmlFor="product-price" className="text-base font-medium ">
              Product Price
            </label>
            <input
              type="number"
              id="product-price"
              placeholder="0"
              required
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
            />
          </div>
        </div>
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
              required
              placeholder="0"
              onChange={(e) => setOfferPrice(e.target.value)}
              className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
            />
          </div>
        </div>

        {/* Submit Button */}
        {/* <button
          type="submit"
          className="mt-4 bg-primary text-white px-8 font-medium py-2 rounded hover:bg-primary-dull"
        >
          ADD
        </button> */}
        <button
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
              Adding...
            </>
          ) : (
            "ADD"
          )}
        </button>
      </form>
    </div>
  );
};

export default AddProduct;

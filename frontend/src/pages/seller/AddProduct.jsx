import React, { useState } from "react";

const AddProduct = () => {
  const [images, setImages] = useState([]);
  const [product, setProduct] = useState({
    name: "",
    description: "",
    category: "",
    price: 0,
    offerPrice: 0,
  });

  const handleImageChange = (e, index) => {
    const file = e.target.files[0];
    const newImages = [...images];
    newImages[index] = file;
    setImages(newImages);
  };

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Product:", product);
    console.log("Images:", images);
    // add form submit logic
  };

  return (
    <div className="w-full mx-auto mt-6 px-10 bg-white">
      <h2 className="text-2xl font-semibold mb-6">Add Product</h2>

      <form onSubmit={handleSubmit} className="space-y-4 max-w-xl">
        {/* Product Images */}
        <div>
          <label className="block font-medium mb-2">Product Image</label>
          <div className="flex space-x-2">
            {[0, 1, 2].map((index) => (
              <input
                key={index}
                type="file"
                accept="image/*"
                onChange={(e) => handleImageChange(e, index)}
                className="block w-full text-sm text-gray-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-md file:border-0
                  file:text-sm file:font-semibold
                  file:bg-primary file:text-white
                  hover:file:bg-primary-dull "
              />
            ))}
          </div>
        </div>

        {/* Product Name */}
        <div>
          <label className="block font-medium mb-1">Product Name</label>
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
            placeholder="Type here"
            className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* Product Description */}
        <div>
          <label className="block font-medium mb-1">Product Description</label>
          <textarea
            name="description"
            value={product.description}
            onChange={handleChange}
            placeholder="Type here"
            className="w-full border px-4 py-2 rounded-md h-24 focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* Category */}
        <div>
          <label className="block font-medium mb-1">Category</label>
          <select
            name="category"
            value={product.category}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="">Select Category</option>
            <option value="fruits">Fruits</option>
            <option value="vegetables">Vegetables</option>
            <option value="dairy">Dairy</option>
          </select>
        </div>

        {/* Product Price and Offer Price */}
        <div className="flex space-x-4">
          <div className="w-1/2">
            <label className="block font-medium mb-1">Product Price</label>
            <input
              type="number"
              name="price"
              value={product.price}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div className="w-1/2">
            <label className="block font-medium mb-1">Offer Price</label>
            <input
              type="number"
              name="offerPrice"
              value={product.offerPrice}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="mt-4 bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-primary-dull"
        >
          ADD
        </button>
      </form>
    </div>
  );
};

export default AddProduct;

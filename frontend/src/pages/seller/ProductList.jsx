import React, { useState } from "react";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";
import { assets } from "../../assets/greencart_assets/assets";

const ProductList = () => {
  const { products, setProducts, currency, axios, fetchProducts, navigate } =
    useAppContext();

  const [loading, setLoading] = useState(false);

  const toggleStock = async (id, inStock) => {
    try {
      const { data } = await axios.post("/product/stock", { id, inStock });
      if (data.success) {
        fetchProducts();
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const updateProduct = async (id) => {
    try {
      const { data } = await axios.get(`/product/${id}`);
      if (data.success) {
        // console.log(data.product);
        navigate(`/seller/update/${id}`, {
          state: { productData: data.product },
        });
      } else {
        return toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      return toast.error(error);
    }
  };

  const deleteProduct = async (id) => {
    setLoading(true);
    try {
      const { data } = await axios.delete(`/product/delete/${id}`);
      // console.log(data)
      if (data.success) {
        setProducts((prevProducts) =>
          prevProducts.filter((item) => item._id !== id),
        );
        setLoading(false);
        return toast.success(data.message);
      } else {
        return toast.error(data.message);
      }
    } catch (error) {
      return toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return !loading ? (
    <>
      <div className="no-scrollbar flex-1 h-[95vh] overflow-y-scroll flex flex-col justify-between">
        <div className="w-full md:p-10 p-4">
          <h2 className="pb-4 text-lg font-medium">All Products</h2>
          <div className="flex flex-col items-center max-w-4xl w-full overflow-hidden rounded-md bg-white border border-gray-500/20">
            <table className="md:table-auto table-fixed w-full overflow-hidden">
              <thead className="text-gray-900 text-sm text-left">
                <tr>
                  <th className="px-4 py-3 font-semibold truncate">Product</th>
                  <th className="px-4 py-3 font-semibold truncate">Category</th>
                  <th className="px-4 py-3 font-semibold truncate hidden md:block">
                    Selling Price
                  </th>
                  <th className="px-4 py-3 font-semibold truncate">In Stock</th>

                  <th className="px-4 py-3 font-semibold truncate">Edit</th>

                  <th className="px-4 py-3 font-semibold truncate">Delete</th>
                </tr>
              </thead>

              <tbody className="text-sm text-gray-500">
                {products?.map((product) => (
                  <tr key={product._id} className="border-t border-gray-500/20">
                    <td className="md:px-4 pl-2 md:pl-4 py-3 flex items-center space-x-3 truncate">
                      <div className="border border-gray-300 rounded p-2">
                        <img
                          src={product.image[0]}
                          alt={product.name}
                          className="w-16"
                        />
                      </div>
                      <span className="truncate max-sm:hidden w-full">
                        {product.name}
                      </span>
                    </td>

                    <td className="px-4 py-3">{product.category} </td>

                    <td className="px-4 py-3 max-sm:hidden">
                      {currency} {product.offerPrice}
                    </td>

                    <td className="px-4 py-3">
                      <label className="cursor-pointer text-gray-900 gap-3 inline-flex items-center relative">
                        <input
                          onChange={() =>
                            toggleStock(product._id, !product.inStock)
                          }
                          type="checkbox"
                          className="sr-only peer"
                          checked={product.inStock}
                        />
                        <div className="w-12 h-7 bg-slate-300 rounded-full peer peer-checked:bg-blue-600 transition-colors duration-200"></div>
                        <span className="dot absolute left-1 top-1 w-5 h-5 bg-white rounded-full transition-transform duration-200 ease-in-out peer-checked:translate-x-5"></span>
                      </label>
                    </td>

                    <td className="px-4 py-3">
                      <img
                        onClick={() => {
                          updateProduct(product._id);
                        }}
                        src={assets.add_icon}
                        alt="update-product"
                        className="bg-red-"
                      />
                    </td>

                    <td className="px-4 py-3">
                      <img
                        onClick={() => deleteProduct(product._id)}
                        src={assets.remove_icon}
                        alt="delete-product"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  ) : (
    <>
      <div className="w-full h-screen absolute top-0 right-0 left-0 bg-black/70">
        <div className="border-t-blue-600 w-10 h-10 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-spin rounded-full border-4"></div>
      </div>
    </>
  );
};

export default ProductList;

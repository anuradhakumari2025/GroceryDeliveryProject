import React, { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import { assets } from "../assets/greencart_assets/assets";
import toast from "react-hot-toast";
import OrderSummary from "../components/OrderSummary";

const Cart = () => {
  const {
    products,
    currency,
    removeFromCart,
    getCartCount,
    navigate,
    updateCart,
    cartItems,
    setCartItems,
    axios,
    user,
  } = useAppContext();

  const [cartArray, setCartArray] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);

  const getCart = () => {
    let tempArray = [];
    for (const key in cartItems) {
      const product = products.find((item) => item._id === key);
      product.quantity = cartItems[key];
      tempArray.push(product);
    }
    setCartArray(tempArray);
  };

  const getUserAddress = async () => {
    try {
      const { data } = await axios.get("/address/get");
      if (data.success) {
        setAddresses(data.addresses);
        if (data.addresses.length > 0) {
          setSelectedAddress(data.addresses[0]);
          // console.log("Setting selected address:", data.addresses[0]);
        }
      } else {
        console.log("message", data.message);
        return toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      return toast.error(error.message);
    }
  };

  useEffect(() => {
    if (products.length > 0 && cartItems) {
      getCart();
    }
  }, [products, cartItems]);

  const fetchCartItems = async () => {
    try {
      const { data } = await axios.get("/cart/get");
      if (data.success) {
        // console.log(data.cartItems)
        setCartItems(data.cartItems);
      } else {
        return toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      return toast.error(error.message);
    }
  };

  useEffect(() => {
    if (user) {
      fetchCartItems();
      getUserAddress();
    }
  }, [user]);

  return products.length > 0 && cartItems ? (
    <div className="flex flex-col md:flex-row py-16 max-w-6xl w-full px-6 mx-auto">
      <div className="flex-1 max-w-4xl">
        <h1 className="text-3xl font-medium mb-6">
          Shopping Cart
          <span className="text-sm text-primary">{getCartCount()} Items</span>
        </h1>
        <div className="grid grid-cols-[2fr_1fr_1fr] text-primary text-base font-medium pb-3">
          <p className="text-left">Product Details</p>
          <p className="text-center">Subtotal</p>
          <p className="text-center">Action</p>
        </div>

        {cartArray.map((product) => (
          <div
            key={product._id}
            className="grid grid-cols-[2fr_1fr_1fr] text-primary items-center text-sm md:text-base font-medium pt-3"
          >
            <div className="flex items-center md:gap-6 gap-3">
              <div
                onClick={() => {
                  navigate(
                    `/products/${product.category.toLowerCase()}/${product._id}`,
                  );
                  scrollTo(0, 0);
                }}
                className="cursor-pointer w-24 h-24 flex items-center justify-center border border-primary rounded"
              >
                <img
                  src={product.image[0]}
                  alt={product?.name || "Product Image"}
                />
              </div>

              <div>
                <p className="hidden md:block font-semibold">{product.name} </p>
                <div className="font-normal text-gray-500/70">
                  <p>
                    Weight: <span>{product.weight || "N/A"} </span>
                  </p>

                  <div className="flex items-center">
                    <p>Qty:</p>
                    <select
                      value={cartItems[product._id]}
                      onChange={(e) =>
                        updateCart(product._id, Number(e.target.value))
                      }
                      name="outline-none"
                      id=""
                      className="pl-2 outline-none"
                    >
                      {Array(
                        cartArray[product._id] > 9 ? cartArray[product._id] : 9,
                      )
                        .fill("")
                        .map((_, idx) => (
                          <option value={idx + 1} key={idx}>
                            {idx + 1}
                          </option>
                        ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-center">
              {currency}
              {product.offerPrice * product.quantity}
            </p>
            <button
              onClick={() => removeFromCart(product._id)}
              className="cursor-pointer mx-auto"
            >
              <img
                src={assets.remove_icon}
                alt="remove"
                className="h-6 w-6 inline-block"
              />
            </button>
          </div>
        ))}

        <button
          onClick={() => {
            navigate("/products");
            scrollTo(0, 0);
          }}
          className="group cursor-pointer flex items-center mt-8 gap-2 text-primary font-medium"
        >
          <img
            src={assets.arrow_right_icon_colored}
            alt=""
            className="group-hover:-translate-x-1 transition"
          />
          Continue Shopping
        </button>
      </div>

      {/* Order Summary Section */}
      <OrderSummary
        selectedAddress={selectedAddress}
        setSelectedAddress={setSelectedAddress}
        addresses={addresses}
        cartArray={cartArray}
        setCartItems={setCartItems}
      />
    </div>
  ) : null;
};

export default Cart;

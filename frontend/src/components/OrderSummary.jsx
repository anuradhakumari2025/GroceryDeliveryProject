import React from "react";
import { useState } from "react";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";
import axios from "axios";

const OrderSummary = ({
  selectedAddress,
  setSelectedAddress,
  addresses,
  cartArray,
  setCartItems,
}) => {
  const { currency, user, navigate, getCartAmount } = useAppContext();

  const [showAddress, setShowAddress] = useState(false);
  const [paymentOption, setPaymentOption] = useState("COD");

  const placeOrder = async () => {
    try {
      if (!selectedAddress) {
        return toast.error("Please select an address");
      }

      const addressId = selectedAddress._id;

      if (paymentOption === "COD") {
        const { data } = await axios.post("/order/cod", {
          items: cartArray.map((item) => ({
            product: item._id,
            quantity: item.quantity,
          })),
          address: addressId,
        });

        // console.log("COD Order Response:", data); // Debugging

        if (data.success) {
          toast.success(data.message);
          setCartItems({});
          navigate("/my-orders");
        } else {
          console.log("message", data.message);
          return toast.error(data.message);
        }
      } else {
        //payment using razorpay
        // console.log("==== placeOrderRazorpay HIT ====");
        const { data } = await axios.post("/order/razorpay", {
          items: cartArray.map((item) => ({
            product: item._id,
            quantity: item.quantity,
          })),
          address: selectedAddress._id,
        });

        console.log("Razorpay Order Response:", data); // Debugging

        if (!data.success) {
          console.log("message", data.message);
          return toast.error(data.message);
        }

        const options = {
          key: import.meta.env.VITE_RAZORPAY_KEY_ID,
          amount: data.amount,
          currency: data.currency,
          name: "Grocery Delivery",
          description: "Order Payment",
          order_id: data.razorpayOrderId,
          handler: async (response) => {
            console.log("Razorpay Response:", response); // Debugging

            const {
              razorpay_order_id,
              razorpay_payment_id,
              razorpay_signature,
            } = response;

            if (
              !razorpay_order_id ||
              !razorpay_payment_id ||
              !razorpay_signature
            ) {
              console.error("Missing Razorpay response fields:", response);
              return toast.error("Payment failed. Please try again.");
            }

            // Verify payment on the backend
            const verifyResponse = await axios.post("/order/verify", {
              razorpay_order_id,
              razorpay_payment_id,
              razorpay_signature,
            });

            console.log(verifyResponse);

            if (verifyResponse.data.success) {
              toast.success("Payment successful!");
              setCartItems({});
              navigate("/my-orders");
            } else {
              console.error(
                "Payment verification failed:",
                verifyResponse.data,
              );
              toast.error("Payment verification failed");
              return;
            }
          },
          prefill: {
            name: user?.name || "Anuradha Kumari",
            email: user?.email || "anu@gmail.com",
            contact: "9999999999",
          },
          theme: {
            color: "#3399cc",
          },
        };

        console.log("Razorpay Options from frontend:", options);

        const razorpay = new window.Razorpay(options);
        razorpay.open();
      }
    } catch (error) {
      console.log(error);
      return toast.error(error.message);
    }
  };

  return (
    <div className="max-w-[360px] w-full bg-primary/20 p-5 max-md:mt-16 border border-primary/70 ">
      <h2 className="text-xl md:text-2xl font-medium">Order Summary</h2>
      <hr className="border-gray-300 my-5" />
      <div className="mb-6">
        <p className="text-sm font-medium uppercase">Delivery Address</p>
        <div className="relative flex justify-between items-start mt-2">
          <p className="text-gray-500">
            {selectedAddress
              ? `${selectedAddress.street}, ${selectedAddress.city}, ${selectedAddress.state}`
              : "No Address Found"}
          </p>
          <button
            onClick={() => setShowAddress(!showAddress)}
            className="text-primary hover:underline cursor-pointer"
            name="change-address"
          >
            Change
          </button>

          {showAddress && (
            <div className="absolute top-12 py-1 bg-white border border-gray-300 text-sm w-full">
              {addresses.map((address, idx) => (
                <p
                  key={idx}
                  onClick={() => {
                    console.log("Clicked:", address);
                    setSelectedAddress(address);
                    setShowAddress(false);
                  }}
                  className="text-gray-500 p-2 cursor-pointer"
                >
                  {address.street},{address.city}, {address.state},
                  {address.country}
                </p>
              ))}
              <p
                onClick={() => navigate("/add-address")}
                className="text-center cursor-pointer p-2 hover:bg-primary-dull"
              >
                Add Address
              </p>
            </div>
          )}
        </div>

        <p className="text-sm font-medium uppercase mt-6">Payment Method</p>
        <select
          onChange={(e) => setPaymentOption(e.target.value)}
          name=""
          className="w-full border border-gray-300 bg-white px-3 py-2 mt-2 outline-none"
          id=""
        >
          <option value="COD">Cash On Delivery</option>
          <option value="Online">Online Payment</option>
        </select>
      </div>
      <hr className="border-gray-400" />

      <div className="text-gray-500 mt-4 space-y-2">
        <p className="flex justify-between">
          <span>Price</span>
          <span>
            {currency} {getCartAmount()}
          </span>
        </p>
        <p className="flex justify-between">
          <span>Shipping Fee</span>
          <span className="text-green-600">Free</span>
        </p>
        <p className="flex justify-between">
          <span>Tax (2%) </span>
          <span>
            {currency}
            {(getCartAmount() * 2) / 100}
          </span>
        </p>
        <p className="flex justify-between text-lg font-medium mt-3">
          <span>Total Amount: </span>
          <span>
            {currency} {getCartAmount() + (getCartAmount() * 2) / 100}
          </span>
        </p>
      </div>
      <button
        onClick={placeOrder}
        className="w-full py-3 mt-6 cursor-pointer bg-primary text-white font-medium hover:bg-primary-dull transition"
      >
        {paymentOption === "COD" ? "Place Order" : "Proceed to Checkout"}
      </button>
    </div>
  );
};

export default OrderSummary;

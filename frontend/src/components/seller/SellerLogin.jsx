import React, { useEffect, useState } from "react";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const SellerLogin = () => {
  const { setIsSeller, isSeller, navigate,axios } = useAppContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = async (e) => {
    try {
      e.preventDefault();
      const { data } = await axios.post("/seller/login", {
        email,
        password,
      });
      if (data.success) {
        setIsSeller(true);
        navigate("/seller");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  useEffect(() => {
    if (isSeller) {
      navigate("/seller");
    }
  }, [isSeller]);
  return (
    !isSeller && (
      <div className="fixed inset-0 top-0 left-0 right-0 z-30 flex items-center text-sm text-gray-600 bg-black/50">
        <form
          onSubmit={submitHandler}
          onClick={(e) => e.stopPropagation()}
          action=""
          className="flex flex-col gap-4 m-auto items-start p-8 py-12 w-80 sm:w-[352px] rounded-lg border border-gray-200 bg-white"
        >
          <p className="text-2xl font-medium m-auto">
            <span className="text-primary">Seller </span>
            Login
          </p>
          <div className="w-full">
            <p>Email</p>
            <input
              type="email"
              placeholder="type here"
              className="border border-primary rounded w-full p-2 mt-1 outline-primary"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="w-full">
            <p>Password</p>
            <input
              type="password"
              placeholder="type here"
              className="border border-primary rounded w-full p-2 mt-1 outline-primary"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button className="bg-primary hover:bg-primary-dull transition-all text-white w-full py-2 rounded-md cursor-pointer">
            Login
          </button>
        </form>
      </div>
    )
  );
};

export default SellerLogin;

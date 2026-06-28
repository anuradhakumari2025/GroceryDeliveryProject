import React, { useEffect, useState } from "react";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";
import { assets } from "../../assets/greencart_assets/assets";
import { NavLink } from "react-router";
import { Eye, EyeOff } from "lucide-react";

const SellerLogin = () => {
  const { setIsSeller, isSeller, navigate, axios } = useAppContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

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
      <>
        <nav className="flex items-center justify-between px-4 md:px-14 py-4 border-b border-gray-300 bg-white relative transition-all duration-300">
          {/* logo */}
          <NavLink to="/">
            <img src={assets.logo} className="h-9" alt="logo" />
          </NavLink>
        </nav>

        <div className="flex items-center text-sm text-gray-600 pt-20">
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

            {/* Email */}
            <div className="w-full">
              <p>Email</p>
              <input
                type="email"
                placeholder="user@gmail.com"
                name="seller-email"
                className="border border-primary rounded w-full p-2 mt-1 outline-primary"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Password */}
            <div className="w-full">
              <p>Password</p>
              <div className="relative mt-1">
                <input
                  type={showPassword ? "text" : "password"} 
                  placeholder="type here"
                  className="border border-primary rounded w-full p-2 pr-10 outline-primary"
                  required
                  value={password}
                  name="seller-password"
                  onChange={(e) => setPassword(e.target.value)}
                />

                {/* Absolute button container for the toggle icon */}
                <button
                  type="button" 
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="bg-primary hover:bg-primary-dull transition-all text-white w-full py-2 rounded-md cursor-pointer"
            >
              Login
            </button>
          </form>
        </div>
      </>
    )
  );
};

export default SellerLogin;

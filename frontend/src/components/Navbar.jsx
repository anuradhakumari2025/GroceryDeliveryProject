import React, { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import { NavLink } from "react-router";
import { assets } from "../assets/greencart_assets/assets";
import toast from "react-hot-toast";

const Navbar = () => {
  const {
    user,
    setUser,
    navigate,
    setShowUserLogin,
    searchQuery,
    setSearchQuery,
    getCartCount,
    axios,
  } = useAppContext();
  const [open, setOpen] = useState(false);
  const logout = async () => {
    try {
      const { data } = await axios.get("/user/logout");
      if (data.success) {
        toast.success(data.message);
        setUser(null);
        navigate("/");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  useEffect(() => {
    if (searchQuery.length > 0) {
      navigate("/products");
    }
  }, [searchQuery]);
  return (
    <nav className="flex items-center justify-between px-4 md:px-14 py-4 border-b border-gray-300 bg-white relative transition-all duration-300">
      <NavLink to="/" onClick={() => setOpen(false)}>
        <img src={assets.logo} className="h-9" alt="logo" />
      </NavLink>
      <div className="sm:flex items-center z-30 hidden gap-8">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/products">All Products</NavLink>
        <NavLink to="/">Contact</NavLink>
        <div className="hidden lg:flex items-center text-sm gap-2 border border-gray-300 px-3 rounded-full">
          <input
            onChange={(e) => setSearchQuery(e.target.value)}
            type="text"
            placeholder="Search Products"
            className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500"
          />
          <img
            src={assets.search_icon}
            alt="Search icon"
            className="h-4 w-4 cursor-pointer"
          />
        </div>
        <div
          onClick={() => navigate("/cart")}
          className="cursor-pointer relative"
        >
          <img className="w-6 opacity-80" src={assets.nav_cart_icon} alt="" />
          <button className=" absolute -top-2 -right-3 text-xs text-white bg-primary w-[18px] h-[18px] rounded-full ">
            {getCartCount()}
          </button>
        </div>
        {user ? (
          <div className=" relative group cursor-pointer">
            <img src={assets.profile_icon} alt="" className="w-10" />
            <ul className="absolute top-9 hidden group-hover:block border border-gray-200 w-30 rounded-md py-3.5 px-2 text-sm z-30 right-0 bg-white shadow ">
              <li
                onClick={() => navigate("/my-orders")}
                className="hover:bg-primary/10 pl-2 p-1.5"
              >
                My Orders
              </li>
              <li onClick={logout} className="hover:bg-primary/10 pl-2 p-1.5">
                Logout
              </li>
            </ul>
          </div>
        ) : (
          <button
            onClick={() => setShowUserLogin(true)}
            className="px-8 py-2 bg-primary hover:bg-primary-dull transition text-white rounded-full cursor-pointer"
          >
            Login
          </button>
        )}
      </div>

      <div className="flex items-center gap-6 sm:hidden">
        <div
          onClick={() => navigate("/cart")}
          className="cursor-pointer relative"
        >
          <img className="w-4 opacity-80" src={assets.nav_cart_icon} alt="" />
          <button className=" absolute -top-2 -right-3 text-xs text-white bg-primary w-[16px] h-[16px] rounded-full ">
            {getCartCount()}
          </button>
        </div>
        <button
          onClick={() => (open ? setOpen(false) : setOpen(true))}
          aria-label="Menu"
          className=""
        >
          <img src={assets.menu_icon} alt="Menu icon" />
        </button>
      </div>
      {open && (
        <div
          className={`${
            open ? "flex" : "hidden"
          } absolute top-[60px] left-0 w-full bg-white shadow-md py-4 flex-col items-start gap-2 px-5 z-50 text-sm md:hidden`}
        >
          <NavLink to="/" onClick={() => setOpen(false)}>
            Home
          </NavLink>
          <NavLink to="/products" onClick={() => setOpen(false)}>
            All Products
          </NavLink>
          {user && (
            <NavLink to="/my-orders" onClick={() => setOpen(false)}>
              My Orders
            </NavLink>
          )}
          <NavLink to="/" onClick={() => setOpen(false)}>
            Contact
          </NavLink>
          {user ? (
            <button className="cursor-pointer px-6 py-2 mt-2 bg-primary hover:bg-primary-dull transition text-white rounded-full text-sm">
              Logout
            </button>
          ) : (
            <button
              className="cursor-pointer px-6 py-2 mt-2 bg-primary hover:bg-primary-dull transition text-white rounded-full text-sm"
              onClick={() => {
                setOpen(false);
                setShowUserLogin(true);
              }}
            >
              Login
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;

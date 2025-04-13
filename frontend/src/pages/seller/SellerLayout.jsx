import React from "react";
import { assets } from "../../assets/greencart_assets/assets";
import { useAppContext } from "../../context/AppContext";
import { NavLink, Outlet } from "react-router";

const SellerLayout = () => {
  const { setIsSeller, navigate } = useAppContext();
  const logout = () => {
    navigate("/");
    setIsSeller(false);
  };
  return (
    <>
      <div className="flex justify-between items-center md:px-8 border-gray-300 px-4 sm:px-10 py-3 border-b transition-all duration-300 bg-white">
        <div>
          <img
            className="w-34 md:w-38 cursor-pointer"
            src={assets.logo}
            alt=""
          />
        </div>
        <div className="flex items-center gap-4 text-gray-500">
          <p className=" text-gray-600">Hi! Seller</p>
          <button
            onClick={logout}
            className="bg-primary text-white text-sm px-10 py-2 rounded-full"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Sidebar */}
      <div className="flex">
        <div className="md:w-64 w-16 h-[550px] text-base border-gray-300 pt-4 flex flex-col transition-all duration-300 bg-white border-r">
          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 py-3 px-4 cursor-pointer  duration-200 ${
                isActive
                  ? "border-r-4 md:border-r-[6px] border-primary bg-primary/10 text-primary"
                  : "hover:bg-gray-100/90 border-white"
              }`
            }
            to={"/seller"}
            end={'/seller'}
          >
            <img src={assets.add_icon} alt="" />
            <p className="hidden md:block text-center">Add Product</p>
          </NavLink>

          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 py-3 px-4 cursor-pointer  duration-200 ${
                isActive
                  ? "border-r-4 md:border-r-[6px] border-primary bg-primary/10 text-primary"
                  : "hover:bg-gray-100/90 border-white"
              }`
            }
            to={"/seller/product-list"}
            end={'/seller'}
          >
            <img src={assets.product_list_icon} alt="" />
            <p className="hidden md:block text-center"> Product List</p>
          </NavLink>

          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 py-3 px-4 cursor-pointer  duration-200 ${
                isActive
                  ? "border-r-4 md:border-r-[6px] border-primary bg-primary/10 text-primary"
                  : "hover:bg-gray-100/90 border-white"
              }`
            }
            to={"/seller/orders"}
            end={'/seller'}
          >
            <img src={assets.order_icon} alt="" />
            <p className="hidden md:block text-center">Orders</p>
          </NavLink>
        </div>
        <Outlet />
      </div>
    </>
  );
};

export default SellerLayout;

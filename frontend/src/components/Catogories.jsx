import React from "react";
import { assets, categories } from "../assets/greencart_assets/assets";
import { useAppContext } from "../context/AppContext";

const Catogories = () => {
  const { navigate } = useAppContext();
  return (
    <div className="mt-6">
      <p className="text-2xl md:text-3xl font-medium">Categories</p>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-6 mt-6">
        {categories.map((category, idx) => (
          <div
            key={idx}
            className="group cursor-pointer py-5 px-3 rounded-lg flex flex-col justify-center items-center"
            style={{ backgroundColor: category.bgColor }}
            onClick={() => {
              navigate(`/products/${category.path.toLowerCase()}`);
              window.scrollTo(0, 0);
            }}
          >
            <img
              src={category.image}
              alt=""
              className="group-hover:scale-108 transition max-w-28"
            />
            <p className="text-sm font-medium">{category.text} </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Catogories;

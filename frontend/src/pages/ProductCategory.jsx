import React from "react";
import { useAppContext } from "../context/AppContext";
import { useParams } from "react-router";
import { categories } from "../assets/greencart_assets/assets";
import ProductCard from "../components/ProductCard";

const ProductCategory = () => {
  const { products } = useAppContext();
  const { category } = useParams();

  const searchCategory = categories.find(
    (item) => item.path.toLowerCase() === category
  );
  const filterProducts = products.filter(
    (product) => product.category.toLowerCase() === category
  );

  return (
    <div className="mt-16">
      {searchCategory && (
        <div className=" flex flex-col items-end w-max">
          <p className="font-medium md:text-xl text-lg lg:text-2xl uppercase">
            {searchCategory.text}
          </p>
          <div className="w-16 h-0.5 bg-primary rounded-full"></div>
        </div>
      )}

      {filterProducts.length > 0 ? (
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 md:gap-6 gap-3">
          {filterProducts.map((product, idx) => (
            <ProductCard key={idx} product={product} />
          ))}
        </div>
      ) : (
        <div className="flex justify-center items-center h-[60vh]">
          <p className="font-medium md:text-xl text-lg lg:text-2xl text-primary">
            No products found in this category
          </p>
        </div>
      )}
    </div>
  );
};

export default ProductCategory;

import React from "react";
import ProductCard from "./ProductCard";
import { useAppContext } from "../context/AppContext";

const BestSeller = () => {
  const { products } = useAppContext();
  return (
    <div className="mt-6">
      <p className="text-2xl md:text-3xl font-medium">Best Seller</p>
      <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 md:gap-6 gap-3">
        {products
          .filter((product) => product.inStock)
          .slice(0, 5)
          .map((product, idx) => (
            <ProductCard key={idx} product={product} />
          ))}
      </div>
    </div>
  );
};

export default BestSeller;

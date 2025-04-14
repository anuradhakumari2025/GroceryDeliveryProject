import React, { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import { Link, useParams } from "react-router";
import { assets } from "../assets/greencart_assets/assets";
import ProductCard from "../components/ProductCard";

const ProductDetails = () => {
  const { products, navigate, currency, addToCart } = useAppContext();
  const { id } = useParams();
  const product = products.find((item) => item._id === id);

  const [relatedProducts, setRelatedProducts] = useState([]);
  const [thumbnail, setThumbnail] = useState(null);
  useEffect(() => {
    if (products.length > 0) {
      let productsCopy = products.slice();
      productsCopy = productsCopy.filter(
        (item) => product.category === item.category
      );
      setRelatedProducts(productsCopy.slice(0, 5));
    }
  }, [products]);
  useEffect(() => {
    setThumbnail(product?.image[0] ? product.image[0] : null);
  }, [product]);
  return (
    product && (
      <div className="max-w-6xl w-full px-6 mt-12">
        <p className="pb-4 text-xl">
          <Link to={"/"}>Home</Link>/<Link to={"/products"}>Products</Link>/
          <Link to={`/products/${product.category.toLowerCase()}`}>
            {product.category}{" "}
          </Link>
          /<span className="text-primary">{product.name} </span>
        </p>
        <div className="flex flex-col md:flex-row gap-16 mt-4">
          <div className="flex gap-3">
            <div className="flex flex-col gap-3">
              {product.image.map((img, idx) => (
                <div
                  onClick={() => setThumbnail(img)}
                  key={idx}
                  className="border max-w-24 border-primary/30 rounded overflow-hidden cursor-pointer"
                >
                  <img src={img} alt={`Thumbnail ${idx + 1}`} />
                </div>
              ))}
            </div>
            <div className="border border-primary/30 max-w-100 rounded overflow-hidden">
              <img src={thumbnail} alt="Selected Product" />
            </div>
          </div>
          <div className="text-sm w-full md:w-1/2">
            <h1 className="text-3xl font-medium">{product.name} </h1>
            <div className="flex items-center gap-0.5 mt-1">
              {Array(5)
                .fill("")
                .map((_, i) => (
                  <img
                    src={i < 4 ? assets.star_icon : assets.star_dull_icon}
                    alt=""
                    className="md:w-4 w-3.5"
                  />
                ))}
              <p className="text-base ml-2">4 </p>
            </div>
            <div className="mt-6">
              <p className="text-primary/70 line-through">
                MRP: {currency}
                {product.price}
              </p>
              <p className="text-2xl font-medium">
                MRP: {currency} {product.offerPrice}
              </p>
              <span className="text-primary/70">(inclusives of all taxes)</span>
            </div>
            <p className="text-base font-medium mt-6">About Products</p>
            <ul className="list-disc ml-4 text-primary/70">
              {product.description.map((desc, idx) => (
                <li key={idx}>{desc} </li>
              ))}
            </ul>
            <div className="flex items-center mt-10 gap-4 text-base">
              <button
                onClick={() => addToCart(product._id)}
                className="w-full py-3.5 cursor-pointer font-medium border border-primary hover:bg-primary-dull hover:text-white transition"
              >
                Add to Cart
              </button>
              <button
                onClick={() => {
                  addToCart(product._id);
                  navigate("/cart");
                }}
                className="w-full py-3.5 cursor-pointer font-medium bg-primary text-white hover:bg-primary-dull transition"
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
        {/* Related Products */}
        <div className="flex flex-col items-center mt-20 ">
          <div className="flex flex-col items-center w-max">
            <p className="text-2xl font-medium">Related Products</p>
            <div className="w-20 h-0.5 bg-primary rounded-full mt-2"></div>
          </div>
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 md:gap-6 gap-3">
            {relatedProducts
              .filter((product) => product.inStock)
              .map((item, idx) => (
                <ProductCard key={idx} product={item} />
              ))}
          </div>
          <button onClick={()=>{navigate('/products');scrollTo(0,0)}} className="mx-auto mt-8 cursor-pointer px-12 py-2.5 border rounded text-primary hover:bg-primary-dull transition hover:text-white ">See More </button>
        </div>
      </div>
    )
  );
};

export default ProductDetails;

import React from "react";

const NewsLetter = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center space-y-2 mt-12">
      <h1 className="md:text-4xl text-2xl">Never Miss a deal!</h1>
      <p className="md:text-lg text-gray-500/70 pb-8">
        Subscribe to get the latest offers,new arrivals,and exclusive discounts
      </p>
      <form
        action=""
        className="flex items-center justify-between max-w-2xl w-full md:h-13 h-12"
      >
        <input
          type="text "
          className="border border-gray-300 rounded-md h-full border-r-0 outline-none w-full rounded-r-none px-3 text-gray-500"
          placeholder="Enter your email id"
        />
        <button className="bg-primary h-full md:px-12 px-8 text-white hover:bg-primary-dull transition-all cursor-pointer rounded-md rounded-1-none">
          Subscribe
        </button>
      </form>
    </div>
  );
};

export default NewsLetter;

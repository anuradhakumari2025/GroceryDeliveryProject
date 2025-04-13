import React from "react";
import MainBanner from "../components/MainBanner";
import Catogories from "../components/Catogories";
import BestSeller from "../components/BestSeller";
import BottomBanner from "../components/BottomBanner";
import NewsLetter from "../components/NewsLetter";

const Home = () => {
  return (
    <div className="mt-8">
      <MainBanner />
      <Catogories />
      <BestSeller />
      <BottomBanner />
      <NewsLetter />
    </div>
  );
};

export default Home;

import React from "react";
import HeroSection from "../../Components/Home/HeroSection";
import FeaturedSection from "../../Components/Home/FeaturedSection";

const HomePage = () => {
  return (
    <div className="w-11/12 mx-auto">
      <HeroSection></HeroSection>
      <FeaturedSection></FeaturedSection>
    </div>
  );
};

export default HomePage;

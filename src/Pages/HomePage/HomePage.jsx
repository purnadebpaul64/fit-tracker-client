import React from "react";
import HeroSection from "../../Components/Home/HeroSection";
import FeaturedSection from "../../Components/Home/FeaturedSection";
import AboutSection from "../../Components/Home/AboutSection";
import NewsletterSection from "../../Components/Home/NewsletterSection";

const HomePage = () => {
  return (
    <div className="w-11/12 mx-auto">
      <HeroSection></HeroSection>
      <FeaturedSection></FeaturedSection>
      <AboutSection></AboutSection>
      <NewsletterSection></NewsletterSection>
    </div>
  );
};

export default HomePage;

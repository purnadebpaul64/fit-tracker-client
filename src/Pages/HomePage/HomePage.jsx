import React from "react";
import HeroSection from "../../Components/Home/HeroSection";
import FeaturedSection from "../../Components/Home/FeaturedSection";
import AboutSection from "../../Components/Home/AboutSection";
import NewsletterSection from "../../Components/Home/NewsletterSection";
import FeaturedClasses from "../../Components/Home/FeaturedClasses/FeaturedClasses";
import ReviewSection from "../../Components/Home/ReviewsSection/ReviewsSection";
import LatestCommunityPosts from "../../Components/Home/LatestCommunityPosts";

const HomePage = () => {
  return (
    <div className="w-11/12 mx-auto">
      <HeroSection></HeroSection>
      <FeaturedSection></FeaturedSection>
      <AboutSection></AboutSection>
      <FeaturedClasses></FeaturedClasses>
      <ReviewSection></ReviewSection>
      <LatestCommunityPosts></LatestCommunityPosts>
      <NewsletterSection></NewsletterSection>
    </div>
  );
};

export default HomePage;

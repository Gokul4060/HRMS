import React from "react";
import Navbar from "../components/LandingComponents/Navbar/Navbar1";
import Home from "../components/LandingComponents/Home/Home";
import FeatureTop from "../components/LandingComponents/FeaturesTop/FeaturesTop";
import Features from "../components/LandingComponents/Features/Features";
import Testimonial from "../components/LandingComponents/Testimonial/Testimonial";
import Newsletter from "../components/LandingComponents/Newsletter/Newsletter";
import Contact from "../components/LandingComponents/Contact/Contact";
import Footer from "../components/LandingComponents/Footer/Footer";

const Landing = () => {
  return (
    <div>
      <Navbar />
      <Home />
      <FeatureTop />
      <Features />
      <Testimonial />
      <Newsletter />
      <Contact />
      <Footer />
    </div>
  );
};

export default Landing;

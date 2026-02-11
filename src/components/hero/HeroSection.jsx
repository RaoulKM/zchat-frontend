import React from "react";
import HeroText from "./HeroText";
import HeroImage from "./HeroImage";

const HeroSection = () => {
  return (
    <section className="flex flex-col md:flex-row items-center justify-between px-6 py-20 bg-gray-50">
      <HeroText />
      <HeroImage />
    </section>
  );
};

export default HeroSection;

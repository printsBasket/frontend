import React from "react";
import AboutHero from "./AboutHero";
import AboutUs from "./AboutUs";
import SEO from '../common/SEO';

const AboutMain = () => {
  return (
    <>
       <SEO
           title="About Us"
           description="Learn about PrintsBasket — your trusted source for affordable printers, ink, and toner cartridges. Quality products with expert support."
           canonical="/about"
       />
       <AboutHero/>
       <AboutUs/>
    </>
  );
};

export default AboutMain;

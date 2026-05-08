import React from "react";

const AboutHero = () => {
  return (
    <section className="w-full bg-gradient-to-br from-blue-50 via-white to-blue-50 py-10 sm:py-14 lg:py-20">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 text-center">
        
        {/* Heading */}
        <div className="mb-2">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent mb-4">
            About Prints Basket
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-blue-400 mx-auto rounded-full"></div>
        </div>

        {/* Description */}
        <p className="max-w-4xl mx-auto text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-gray-700 leading-relaxed mt-6 sm:mt-8 font-medium">
          Your Trusted Independent Online Retailer for Printers & Printing Essentials
        </p>

        <p className="max-w-3xl mx-auto text-sm sm:text-base lg:text-lg text-gray-600 leading-relaxed mt-4 sm:mt-6">
          Prints Basket is dedicated to providing a reliable and transparent shopping experience for printers and printing essentials. We help customers find the right products with clarity, convenience, and confidence.
        </p>

      </div>
    </section>
  );
};

export default AboutHero;

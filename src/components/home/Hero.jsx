import React from "react";
import { useNavigate } from "react-router-dom";


const Hero = () => {
  const navigate = useNavigate();

  const handleViewCollection = () => {
    navigate("/shop");
  };

  return (
    <section className="w-full mt-2 px-2 sm:px-4">
      <div className="md:max-w-[90%] max-w-[100%] mx-auto rounded-3xl overflow-hidden relative">

        {/* BACKGROUND - Dark Blue Tech Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#000d2e] via-[#0a1f5e] to-[#001a4d]"></div>
        {/* HERO IMAGE */}
        <img
          src="/assets/printer-white-hp-without-bg.png"
          alt="Featured printer"
          width="400"
          height="300"
          className="absolute right-8 bottom-0 w-64 h-48 object-contain drop-shadow-xl hidden md:block"
          loading="lazy"
        />

        {/* ANIMATED WAVE PATTERN EFFECT */}
        <div className="absolute inset-0 opacity-30">
          <svg className="w-full h-full" viewBox="0 0 1200 600" preserveAspectRatio="none">
            <defs>
              <pattern id="dots" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                <circle cx="20" cy="20" r="1.5" fill="rgba(255,255,255,0.3)" />
              </pattern>
              <filter id="glow">
                <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            <rect width="1200" height="600" fill="url(#dots)" />
            <path d="M0,300 Q300,200 600,300 T1200,300" stroke="rgba(100,200,255,0.4)" strokeWidth="3" fill="none" />
            <path d="M0,350 Q300,250 600,350 T1200,350" stroke="rgba(70,150,255,0.3)" strokeWidth="2" fill="none" />
            <path d="M0,250 Q300,150 600,250 T1200,250" stroke="rgba(120,180,255,0.25)" strokeWidth="2" fill="none" />
          </svg>
        </div>

        {/* GLOWING ORBS BACKGROUND EFFECT */}
        <div className="absolute inset-0 opacity-40 hidden sm:block" aria-hidden="true">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
          <div className="absolute bottom-0 left-20 w-80 h-80 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-15"></div>
          <div className="absolute top-1/2 right-1/4 w-72 h-72 bg-cyan-400 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
        </div>

        {/* CONTENT */}
        <div className="relative z-10 grid md:grid-cols-2 items-center px-5 sm:px-8 md:px-12 py-8 sm:py-12 md:py-20 gap-6 md:gap-8">

          {/* LEFT CONTENT */}
          <div className="text-white space-y-6 md:space-y-8 md:pr-8 text-center md:text-left">
            <div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-2">
                Smart Printing
              </h1>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-cyan-300">
                Starts Here
              </h1>
            </div>

            <p className="text-gray-300 text-xs sm:text-sm md:text-base leading-relaxed max-w-sm md:max-w-none font-medium mx-auto md:mx-0">
              Discover dependable printers and printing supplies designed to keep your workflow running smoothly.
            </p>

            <p className="text-gray-400 text-xs sm:text-sm md:text-base leading-relaxed max-w-sm md:max-w-none mx-auto md:mx-0">
              Experience effortless shopping and fast delivery with Prints Basket.
            </p>

            <div className="flex justify-center md:justify-start">
              <button 
                onClick={handleViewCollection}
                className="bg-white text-[#0a1f5e] px-8 py-3 rounded-lg font-bold text-base hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl cursor-pointer"
              >
                View Collection
              </button>
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div className="mt-8 md:mt-0 flex justify-center md:justify-end">
            <div className="relative">
              {/* GLOW EFFECT BEHIND IMAGE */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl blur-2xl opacity-20 -z-10"></div>
              <img
                src="/assets/printer-white-hp-without-bg.webp"
                alt="HP Printer"
                width="450"
                height="450"
                fetchpriority="high"
                className="w-[300px] md:w-[450px] object-contain drop-shadow-2xl filter brightness-110"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

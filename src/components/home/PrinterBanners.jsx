import React from 'react';
import { useNavigate } from 'react-router-dom';
import officePrinter from "/assets/officePrinter.png"; // replace with your office printer image
import laserPrinter from "/assets/laserPrinter.png"; // replace with your laser printer image

const PrinterBanners = () => {
    const navigate = useNavigate();

    const banners = [
        {
            title: "Office Printer",
            subtitle: "NEW COLLECTION",
            filter: "Office",
            filterType: "usage",
            bgClass: "bg-black",
            image: officePrinter, // Replace with your office printer image
            textColor: "text-white",
            buttonBorder: "border-white",
        },
        {
            title: "Laser Printer",
            subtitle: "NEW COLLECTION",
            filter: "Laser",
            filterType: "technology",
            // Gradient matching the orange/warm tone in the screenshot
            bgClass: "bg-gradient-to-r from-[#e67e22] to-[#f39c12]",
            image: laserPrinter, // Replace with your laser printer image
            textColor: "text-white",
            buttonBorder: "border-white",
        }
    ];

    const handleShopNowClick = (filter, filterType) => {
        if (filterType === "usage") {
            navigate(`/shop?usageCategory=${filter}`);
        } else if (filterType === "technology") {
            navigate(`/shop?technology=${filter}`);
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-3 sm:px-4 py-6 sm:py-8 lg:py-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                {banners.map((banner, index) => (
                    <div
                        key={index}
                        className={`relative overflow-hidden rounded-xl h-[200px] sm:h-[260px] md:h-[350px] flex items-center p-5 sm:p-8 md:p-12 ${banner.bgClass} group`}
                    >
                        {/* Text Content */}
                        <div className="relative z-10 w-3/5 sm:w-1/2">
                            <p className={`text-[10px] sm:text-xs font-bold tracking-widest uppercase mb-2 sm:mb-3 opacity-80 ${banner.textColor}`}>
                                {banner.subtitle}
                            </p>
                            <h2 className={`text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold mb-3 sm:mb-4 md:mb-6 ${banner.textColor}`}>
                                {banner.title}
                            </h2>
                            <button
                                onClick={() => handleShopNowClick(banner.filter, banner.filterType)}
                                className={`inline-block border ${banner.buttonBorder} ${banner.textColor} px-4 sm:px-6 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-300 hover:bg-white hover:text-black bg-transparent cursor-pointer`}
                            >
                                Shop Now
                            </button>
                        </div>

                        {/* Product Image */}
                        {/* Product Image */}
                        <div className="absolute right-0 top-0 w-2/5 sm:w-1/2 h-full flex items-center justify-center p-2 sm:p-4 pointer-events-none">
                            <img
                                src={banner.image}
                                alt={banner.title}
                                width="300"
                                height="300"
                                className="object-contain w-full max-h-[90%] transform transition-transform duration-500 group-hover:scale-110 drop-shadow-2xl"
                                loading="lazy"
                            />
                        </div>

                        {/* Subtle decorative overlay (optional) */}
                        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-5 transition-opacity pointer-events-none" />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PrinterBanners;

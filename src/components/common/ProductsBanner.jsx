import React from 'react';

function ProductsBanner({ desktopImage, mobileImage, altText = "Category Banner" }) {
    if (!desktopImage && !mobileImage) return null;

    return (
        <div className="w-full relative mb-6 sm:mb-8 md:mb-12">
            <div className="max-w-[100%] mx-auto px-2 sm:px-4">
                <div className="rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg border border-gray-100">
                    {/* Desktop Image */}
                    <img
                        src={desktopImage}
                        alt={altText}
                        width="1200"
                        height="400"
                        className="hidden md:block w-full h-[90vh]  min-h-[200px]"
                        fetchPriority="high"
                    />

                    {/* Mobile Image */}
                    <img
                        src={mobileImage}
                        alt={altText}
                        width="720"
                        height="900"
                        className="block md:hidden w-full h-auto object-cover"
                        fetchPriority="high"
                    />
                </div>
            </div>
        </div>
    );
}

export default ProductsBanner;

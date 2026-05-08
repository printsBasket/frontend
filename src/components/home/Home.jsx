import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import HomeProductList from "./HomeProductList";
import HomeInfoSections from "./HomeInfoSections";

const Home = () => {
    const location = useLocation();

    return (
        <div className="w-full bg-slate-50/50 min-h-screen relative">
            {/* Main Content */}
            <div className="max-w-[1920px] mx-auto px-0 py-0">



                {/* Explore Categories Section */}

                {/* Home Info Sections */}
                <HomeInfoSections />
                {/* Product List */}
                <div className="px-4 md:px-8 lg:px-12 py-8">
                    <HomeProductList enableFlowLayout={false} />
                </div>
            </div>
        </div>
    );
};

export default Home;

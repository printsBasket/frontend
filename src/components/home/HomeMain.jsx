
import React, { useEffect, useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Hero from "./Hero";

import Home from "./Home";

import Reviews from "./Reviews";

import ProductGrid from "../productsCategories/ProductGrid";
import Categories from '../Categories';
import WhyChooseUs from './WhyChooseUs';
import PrinterBanners from './PrinterBanners';
import ExploreCategoriesSection from './ExploreCategoriesSection';
import SEO from '../common/SEO';

const HomeMain = () => {
    const [searchParams] = useSearchParams();
    const searchQuery = searchParams.get('search');
    const { allProducts = [], allLoading, allLoaded } = useSelector((state) => state.productList);

    // Filter from allProducts cache for instant search
    const searchResults = useMemo(() => {
        if (!searchQuery) return [];
        const q = searchQuery.toLowerCase();
        return allProducts.filter(p =>
            p.title?.toLowerCase().includes(q) ||
            p.brand?.toLowerCase().includes(q) ||
            p.description?.toLowerCase().includes(q)
        );
    }, [searchQuery, allProducts]);

    if (searchQuery) {
        return (
            <div className="min-h-screen bg-slate-50/50">
                <div className="max-w-7xl mx-auto px-4 py-8">
                    <h1 className="text-3xl font-bold mb-8">Search Results for "{searchQuery}"</h1>
                    {(!allLoaded || allLoading) && allProducts.length === 0 ? (
                        <div className="text-center py-12">Loading...</div>
                    ) : searchResults.length > 0 ? (
                        <ProductGrid products={searchResults} />
                    ) : (
                        <div className="text-center py-12">No products found for "{searchQuery}"</div>
                    )}
                </div>
            </div>
        );
    }

    return (
        <>
            <SEO
                title="Home"
                description="Shop PrintsBasket for high-quality printers, ink cartridges, and toner at affordable prices. Inkjet, laser, and all-in-one printers for home and office. Free shipping across North America."
                canonical="/"
            />
            <Hero />
            <ExploreCategoriesSection />
            {/* <Categories /> */}
            {/* <WelcomeSection /> */}
            <Home />
            
            <PrinterBanners />
            <Reviews />
            {/* <WhyChooseUs /> */}
         

            
            {/* <StatsCircles />
            <ImportantInfoSection /> */}
        </>
    );
};

export default HomeMain;

import React, { useRef, useEffect } from "react";
import allInOneImg from "../../../public/assets/allone.png";
import inkjetImg from "../../../public/assets/inkjet.png";
import laserImg from "../../../public/assets/laser.jpg";
import inkTonerImg from "../../../public/assets/inktoner.png";
import defaultPrinterImg from "../../../public/assets/printer.png";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";

import { listCategories } from "../../redux/actions/categoryActions";

// Lazy load category product list components
const CategoryProductList = React.lazy(() => import("./CategoryProductList"));
const AllInOneProductList = React.lazy(() => import("./all_InOne/AllInOneProductList"));
const InkjetPrintersProductList = React.lazy(() => import("./inkjetPrinters/InkjetPrintersProductList"));
const LaserPrintersProductList = React.lazy(() => import("./laserPrinters/LaserPrintersProductList"));
const InkTonerProductList = React.lazy(() => import("./inkToner/InkTonerProductList"));

const getCategoryImage = (categoryName, originalImage) => {
    const name = categoryName?.toLowerCase() || '';
    if (name.includes('all in one')) return allInOneImg;
    if (name.includes('inkjet')) return inkjetImg;
    if (name.includes('laser')) return laserImg;
    if (name.includes('ink') && name.includes('toner')) return inkTonerImg;
    return originalImage
        ? (originalImage.startsWith('http')
            ? originalImage
            : `${import.meta.env.VITE_API_URL?.replace('/api', '') || ''}${originalImage}`)
        : defaultPrinterImg;
};

const CategoryScrollSection = () => {
    const scrollRef = useRef(null);
    const dispatch = useDispatch();

    const categoryList = useSelector((state) => state.categoryList);
    const { loading, error, categories } = categoryList;

    useEffect(() => {
        dispatch(listCategories());
    }, [dispatch]);

    const scroll = (direction) => {
        if (!scrollRef.current) return;

        scrollRef.current.scrollBy({
            left: direction === "left" ? -320 : 320,
            behavior: "smooth",
        });
    };

    if (loading) {
      return (
        <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
        </div>
      );
    }

    if (error) {
        return null; 
    }

    return (
        <section className="relative max-w-7xl mx-auto px-4 py-12">
            {/* Left Arrow */}
            <button
                onClick={() => scroll("left")}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-20
                   w-12 h-12 rounded-full bg-white/70 backdrop-blur-sm
                   flex items-center justify-center shadow-md hover:bg-white/90 transition"
            >
                <ChevronLeftIcon className="w-6 h-6 text-gray-800" />
            </button>
            {/* Right Arrow */}
            <button
                onClick={() => scroll("right")}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-20
                   w-12 h-12 rounded-full bg-white/70 backdrop-blur-sm
                   flex items-center justify-center shadow-md hover:bg-white/90 transition"
            >
                <ChevronRightIcon className="w-6 h-6 text-gray-800" />
            </button>
            {/* Scroll Area */}
            <div
                ref={scrollRef}
                className="flex gap-4 overflow-x-auto scroll-smooth px-2 sm:px-0 scrollbar-hide"
            >
                <React.Suspense fallback={<div className="flex justify-center items-center py-12"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div></div>}>
                    {categories && categories
                        .filter(item => !['Large Format', 'LED Printers'].includes(item.name))
                        .map((item, index) => {
                            let displayName = item.name;
                            let routeSlug = item.slug;
                            const nameLower = item.name.toLowerCase();
                            if (nameLower.includes('all in one')) {
                                displayName = 'All In One';
                                routeSlug = 'all-in-one-printers';
                            } else if (nameLower.includes('inkjet')) {
                                displayName = 'Inkjet';
                                routeSlug = 'inkjet-printers';
                            } else if (nameLower.includes('laser')) {
                                displayName = 'Laser';
                                routeSlug = 'laser-printers';
                            }
                            // For other categories, keep as is
                            return (
                                <Link
                                    key={item._id || index}
                                    to={`/product-category/${routeSlug}`}
                                    className="
                  flex-shrink-0
                  w-[calc(50%-8px)] sm:w-[calc(33.333%-12px)] lg:w-[calc(25%-18px)]
                  bg-white border rounded-xl p-5 text-center hover:shadow-lg transition
                "
                                >
                                    {/* Image */}
                                    <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center mb-4 overflow-hidden">
                                        <img 
                                            src={getCategoryImage(item.name, item.image)}
                                            alt={displayName} 
                                            className="w-full h-full object-contain p-2"
                                            loading="lazy"
                                            onError={(e) => { e.target.src = defaultPrinterImg; }}
                                        />
                                    </div>
                                    {/* Text */}
                                    <h3 className="text-lg font-medium text-gray-900">{displayName}</h3>
                                    <p className="text-sm text-gray-500 mt-1">{item.count} items</p>
                                </Link>
                            );
                        })}
                </React.Suspense>
            </div>
            {/* Tailwind hide scrollbar for all browsers */}
            <style>
                {`
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
          .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `}
            </style>
        </section>
    );
};

export default CategoryScrollSection;

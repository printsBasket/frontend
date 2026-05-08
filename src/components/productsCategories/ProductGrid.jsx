import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/actions/cartActions";
import { useImagePreload } from "../../lib/ImagePreloadContext";
import ProductImage from "../common/ProductImage";

const ProductGrid = ({ heading = "Products", products = [], enableFlowLayout = false }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { getImageUrl, isImageLoaded } = useImagePreload();

    const renderStars = (rating) => {
        return (
            <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                    <span
                        key={i}
                        className={`text-xs ${
                            i < Math.round(rating || 0) ? 'text-yellow-400' : 'text-gray-300'
                        }`}
                    >
                        ★
                    </span>
                ))}
            </div>
        );
    };

    const handleAddToCart = (e, product) => {
        e.preventDefault();
        e.stopPropagation();
        dispatch(addToCart(product.slug || product._id, 1));
        navigate('/cart');
    };

    const handleBuyNow = (e, product) => {
        e.preventDefault();
        e.stopPropagation();
        dispatch(addToCart(product.slug || product._id, 1));
        navigate('/cart');
    };

    return (
        <div className={`max-w-7xl mx-auto px-3 sm:px-4 py-6 sm:py-8 lg:py-12 ${enableFlowLayout ? '' : ''}`}>
            {/* Heading */}
            <div className="flex flex-col gap-4 mb-6 sm:mb-8">
                <div className="flex items-center justify-between flex-col sm:flex-row gap-4 sm:gap-0">
                    <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-gray-900">{heading}</h2>
                </div>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => {
                    const inStock = product.countInStock > 0;
                    return (
                        <Link
                            key={product._id || product.slug}
                            to={product.link || `/product/${product.slug}`}
                            className="group bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                        >
                            {/* Product Image Container */}
                            <div className="relative bg-gray-50 w-full aspect-square overflow-hidden flex items-center justify-center">
                                    <ProductImage
                                        src={getImageUrl(product) || '/assets/printer.png'}
                                        alt={product.title}
                                        width="300"
                                        height="300"
                                        className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300 p-4"
                                    />

                                {/* Stock Badge */}
                                {!inStock && (
                                    <div className="absolute top-3 left-3 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold z-10">
                                        Out of Stock
                                    </div>
                                )}
                            </div>

                            {/* Product Info */}
                            <div className="p-4">
                                <h3 className="font-bold text-gray-900 text-sm mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                                    {product.title}
                                </h3>

                                {/* Category */}
                                {product.category && (
                                    <p className="text-xs text-gray-500 mb-2">
                                        {typeof product.category === 'object' ? product.category.name : product.category}
                                    </p>
                                )}

                                {/* Price */}
                                <div className="flex items-center justify-between">
                                    <span className="font-bold text-lg text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-600">
                                        ${product.price?.toFixed(2) || '0.00'}
                                    </span>
                                </div>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
};

export default ProductGrid;

import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import api from "../../lib/api";
import { listProductDetails } from "../../redux/actions/productActions";
import { addToCart } from "../../redux/actions/cartActions";
import { Star, ShoppingCart, Heart, Truck, Shield, RotateCcw } from "lucide-react";
import SEO from '../common/SEO';
import ProductImage from '../common/ProductImage';
import { ProductDetailSkeleton } from '../common/Skeleton';


const ProductDetails = () => {
    const { productSlug } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [qty, setQty] = useState(1);
    const [activeImage, setActiveImage] = useState(0);
    const [activeTab, setActiveTab] = useState("overview");
    const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
    const [isZooming, setIsZooming] = useState(false);
    const [showReviewLoginMessage, setShowReviewLoginMessage] = useState(false);
    const [showEligibilityMessage, setShowEligibilityMessage] = useState(false);
    const [canReview, setCanReview] = useState(false);

    const productDetails = useSelector((state) => state.productDetails);
    const { loading: detailsLoading, error, product: detailProduct } = productDetails;

    const { allProducts = [] } = useSelector((state) => state.productList);

    // Try to find product from allProducts cache for instant display
    const cachedProduct = allProducts.find(
        (p) => p.slug === productSlug || p._id === productSlug
    );
    // Use cached product immediately, then swap to full details once loaded
    const product = detailProduct && (detailProduct.slug === productSlug || detailProduct._id === productSlug)
        ? detailProduct
        : cachedProduct || detailProduct;
    const loading = !product && detailsLoading;

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const productList = useSelector((state) => state.productList);
    const { allProducts: allProductsForRelated = [] } = productList;

    // Get related products from allProducts cache
    const relatedProducts = product && product.category
        ? allProductsForRelated.filter(
            (p) => {
                const catName = p.category?.name || '';
                const productCatName = product.category?.name || product.category || '';
                return catName.toLowerCase() === productCatName.toString().toLowerCase() && p._id !== product._id;
            }
        ).slice(0, 8)
        : [];

    useEffect(() => {
        const checkEligibility = async () => {
            if (userInfo && product && product._id) {
                try {
                    const config = {
                        headers: { Authorization: `Bearer ${userInfo.token}` },
                    };
                    const { data } = await api.get(`/orders/check-review-eligibility/${product._id}`);
                    setCanReview(data.canReview);
                } catch (error) {
                    setCanReview(false);
                }
            }
        };
        checkEligibility();
    }, [userInfo, product]);

    useEffect(() => {
        if (productSlug) {
            dispatch(listProductDetails(productSlug));
        }
    }, [dispatch, productSlug]);

    // Reset active image when product changes
    useEffect(() => {
        setActiveImage(0);
    }, [productSlug]);

    const addToCartHandler = () => {
        dispatch(addToCart(product.slug || product._id, qty));
        navigate('/cart');
    };

    const buyNowHandler = () => {
        dispatch(addToCart(product.slug || product._id, qty));
        navigate('/cart');
    };

    const handleMouseEnter = () => {
        setIsZooming(true);
    };

    const handleMouseLeave = () => {
        setIsZooming(false);
    };

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        setZoomPosition({ x, y });
    };
const handleWriteReview = () => {
        if (!userInfo) {
            setShowReviewLoginMessage(true);
            setTimeout(() => setShowReviewLoginMessage(false), 3000);
            return;
        }

        if (!canReview) {
            setShowEligibilityMessage(true);
            setTimeout(() => setShowEligibilityMessage(false), 3000);
            return;
        }

        // Logic to open review form would go here
    };

    if (loading) return <ProductDetailSkeleton />;

    if (error || !product) return (
        <div className="min-h-[70vh] flex flex-col items-center justify-center p-8 text-center space-y-8">
            <div className="w-24 h-24 bg-rose-50 rounded-[2rem] flex items-center justify-center">
                <svg className="w-10 h-10 text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
            </div>
            <div className="space-y-4 max-w-sm">
                <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tighter">Inventory Mismatch</h2>
                <p className="text-slate-400 font-medium text-sm leading-relaxed">
                    The requested hardware identifier <span className="text-slate-900 font-bold">"{productSlug}"</span> could not be verified within our current database synchronization.
                </p>
            </div>
            <button
                onClick={() => navigate('/')}
                className="px-8 py-4 bg-slate-900 text-white rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-black transition-all shadow-xl shadow-slate-200"
            >
                Return to Command Center
            </button>
        </div>
    );

    const productImages = product.images && product.images.length > 0
        ? product.images.map(img => img.startsWith('http') ? img : `${import.meta.env.VITE_API_URL.replace('/api', '')}${img}`)
        : ["/assets/printer.png"];

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/20">
            <SEO
                title={product.title}
                description={product.description ? product.description.replace(/<[^>]*>/g, '').substring(0, 160) : `Buy ${product.title} at PrintsBasket. Best prices with free shipping.`}
                canonical={`/product/${product.slug}`}
                type="product"
            />
            {/* Background Patterns */}
            <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-200/10 to-transparent rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-br from-blue-200/10 to-transparent rounded-full blur-3xl"></div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 py-8 md:py-16">
                {/* Main Product Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 mb-20">
                    {/* Image Gallery Section */}
                    <div className="flex flex-col md:flex-row gap-4 h-fit lg:sticky lg:top-24">
                        {/* Thumbnails Container */}
                        <div className="flex flex-row md:flex-col gap-3 w-full md:w-20 order-2 md:order-1 overflow-x-auto overflow-y-hidden pb-2 md:overflow-y-auto md:max-h-[500px] md:pb-0 scrollbar-hide">
                            {productImages.map((img, index) => (
                                <button
                                    key={index}
                                    onClick={() => setActiveImage(index)}
                                    className={`aspect-square min-w-[70px] max-w-[70px] md:min-w-0 md:max-w-none md:w-full rounded-xl border-2 transition-all overflow-hidden bg-white p-2 flex-shrink-0 group
                    ${activeImage === index 
                        ? 'border-blue-500 shadow-lg shadow-blue-200' 
                        : 'border-slate-100 hover:border-slate-300 hover:shadow-md'}`}
                                >
                                    <ProductImage src={img} alt={`${product.title} ${index}`} className="w-full h-full object-contain group-hover:scale-105 transition-transform" />
                                </button>
                            ))}
                        </div>

                        {/* Main Image */}
                        <div className="flex-1 aspect-[4/5] bg-white rounded-3xl border border-slate-100 shadow-2xl shadow-slate-200/50 flex items-center justify-center p-8 overflow-hidden group order-1 md:order-2 relative backdrop-blur-sm">
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-100/5 to-blue-100/5 z-0"></div>
                            <ProductImage
                                src={productImages[activeImage]}
                                alt={product.title}
                                className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-110 relative z-10"
                            />

                            {/* Zoom Effects */}
                            {isZooming && (
                                <div
                                    className="hidden lg:block absolute w-32 h-32 border-3 border-blue-500 rounded-full pointer-events-none z-20 shadow-xl bg-white/80 backdrop-blur-sm overflow-hidden"
                                    style={{
                                        left: `${zoomPosition.x}%`,
                                        top: `${zoomPosition.y}%`,
                                        transform: 'translate(-50%, -50%)',
                                        backgroundImage: `url(${productImages[activeImage]})`,
                                        backgroundSize: '600% 600%',
                                        backgroundPosition: `${zoomPosition.x}% ${zoomPosition.y}%`,
                                        backgroundRepeat: 'no-repeat'
                                    }}
                                />
                            )}

                            {isZooming && (
                                <div className="hidden xl:block absolute top-0 -right-96 w-[28rem] h-[28rem] bg-white border-2 border-slate-200 rounded-3xl shadow-2xl overflow-hidden z-30 backdrop-blur-xl">
                                    <div
                                        className="w-full h-full"
                                        style={{
                                            backgroundImage: `url(${productImages[activeImage]})`,
                                            backgroundSize: '600% 600%',
                                            backgroundPosition: `${zoomPosition.x}% ${zoomPosition.y}%`,
                                            backgroundRepeat: 'no-repeat'
                                        }}
                                    />
                                </div>
                            )}

                            <div
                                className="absolute inset-0 cursor-crosshair z-10"
                                onMouseEnter={handleMouseEnter}
                                onMouseLeave={handleMouseLeave}
                                onMouseMove={handleMouseMove}
                            />
                        </div>
                    </div>

                    {/* Product Info Section */}
                    <div className="space-y-6">
                        {/* Badges */}
                        <div className="flex items-center flex-wrap gap-2">
                            {Array.isArray(product.usageCategory) && product.usageCategory.length > 0 && (
                                product.usageCategory.map((val, idx) => (
                                    <span key={"usage-"+val+idx} className="px-3 py-1.5 bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 rounded-full text-[9px] font-bold uppercase tracking-widest border border-blue-200 hover:shadow-md transition-all">
                                        {val}
                                    </span>
                                ))
                            )}
                            {product.countInStock > 0 ? (
                                <span className="px-3 py-1.5 bg-gradient-to-r from-emerald-50 to-emerald-100 text-emerald-700 rounded-full text-[9px] font-bold uppercase tracking-widest border border-emerald-200 flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
                                    In Stock
                                </span>
                            ) : (
                                <span className="px-3 py-1.5 bg-gradient-to-r from-rose-50 to-rose-100 text-rose-700 rounded-full text-[9px] font-bold uppercase tracking-widest border border-rose-200">
                                    Out of Stock
                                </span>
                            )}
                        </div>

                        {/* Title */}
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600 bg-clip-text text-transparent leading-tight tracking-tighter uppercase drop-shadow-lg">
                                    {product.title}
                                </h1>
                                <div className="h-1 w-24 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"></div>
                            </div>

                        </div>

                        {/* Short Details */}
                        {product.shortDetails && (
                            <div className="space-y-4 pb-6 border-b-2 border-slate-100">
                                <h3 className="text-[11px] font-black bg-gradient-to-r from-blue-600 to-blue-600 bg-clip-text text-transparent uppercase tracking-[0.3em]">Key Highlights</h3>
                                <div
                                    dangerouslySetInnerHTML={{ __html: product.shortDetails }}
                                    className="text-slate-600 text-sm font-medium leading-relaxed space-y-2 prose-sm prose-slate list-disc list-inside"
                                />
                            </div>
                        )}

                        {/* Pricing & Actions */}
                            <div className="space-y-6 p-4 sm:p-6 md:p-8 bg-gradient-to-br from-slate-50 via-white to-blue-50/30 rounded-3xl border-2 border-slate-200 backdrop-blur-sm shadow-lg shadow-blue-100/30 hover:shadow-xl hover:shadow-blue-100/50 transition-all duration-300">
                            {/* Price */}
                            <div className="space-y-3">
                                <div className="flex items-baseline gap-3 sm:gap-4 flex-wrap">
                                    <span className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600 bg-clip-text text-transparent tracking-tighter">
                                        ${product.price?.toFixed(2)}
                                    </span>
                                </div>
                            </div>

                            {product.countInStock > 0 && (
                                <>
                                    <div className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-slate-100">
                                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest whitespace-nowrap">Quantity:</span>
                                        <div className="flex items-center border-2 border-slate-200 rounded-xl overflow-hidden bg-slate-50 ml-auto">
                                            <button
                                                onClick={() => setQty(Math.max(1, qty - 1))}
                                                className="px-3 py-2 hover:bg-white text-slate-400 hover:text-slate-900 transition-all hover:shadow-sm"
                                            > − </button>
                                            <span className="px-4 text-sm font-black text-slate-900 min-w-[3rem] text-center">{qty}</span>
                                            <button
                                                onClick={() => setQty(Math.min(product.countInStock, qty + 1))}
                                                className="px-3 py-2 hover:bg-white text-slate-400 hover:text-slate-900 transition-all hover:shadow-sm"
                                            > + </button>
                                        </div>
                                    </div>
                                </>
                            )}

                            {/* Action Buttons */}
                            <div className="flex flex-col sm:flex-row gap-3">
                                <button
                                    onClick={addToCartHandler}
                                    disabled={product.countInStock === 0}
                                    className={`flex-1 py-4 px-6 rounded-2xl transition-all font-black uppercase text-[11px] tracking-widest shadow-lg hover:shadow-xl active:scale-95 flex items-center justify-center gap-2
                                        ${product.countInStock > 0
                                            ? 'bg-gradient-to-r from-slate-900 to-slate-800 text-white hover:shadow-slate-900/30 hover:from-black hover:to-slate-900'
                                            : 'bg-slate-100 text-slate-400 cursor-not-allowed shadow-none'}`}
                                >
                                    <ShoppingCart size={18} />
                                    {product.countInStock > 0 ? 'Add to Cart' : 'Out of Stock'}
                                </button>
                                {product.countInStock > 0 && (
                                    <button
                                        onClick={buyNowHandler}
                                        className="flex-1 py-4 px-6 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-2xl hover:from-blue-600 hover:to-blue-700 transition-all font-black uppercase text-[11px] tracking-widest shadow-lg hover:shadow-xl shadow-blue-200 active:scale-95"
                                    >
                                        Buy Now
                                    </button>
                                )}
                            </div>

                            {/* Trust Badges */}
                            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-slate-100">
                                <div className="flex flex-col items-center gap-2">
                                    <Truck className="text-blue-500" size={20} />
                                    <span className="text-[9px] font-bold text-slate-600 text-center">Fast Delivery</span>
                                </div>
                                <div className="flex flex-col items-center gap-2">
                                    <Shield className="text-blue-500" size={20} />
                                    <span className="text-[9px] font-bold text-slate-600 text-center">Secure Payment</span>
                                </div>
                                <div className="flex flex-col items-center gap-2">
                                    <RotateCcw className="text-emerald-500" size={20} />
                                    <span className="text-[9px] font-bold text-slate-600 text-center">Easy Returns</span>
                                </div>
                            </div>
                        </div>

                        {/* Key Specs */}
                        {(product.technology || product.mainFunction || product.wireless || product.shortSpecification) && (
                            <div className="space-y-4">
                                <h3 className="text-[11px] font-black bg-gradient-to-r from-blue-600 to-blue-600 bg-clip-text text-transparent uppercase tracking-[0.3em]">Specifications</h3>
                                <div className="flex flex-col gap-3">
                                    {Array.isArray(product.technology) && product.technology.length > 0 && (
                                        <div className="p-3 bg-gradient-to-r from-blue-50 to-blue-100/50 border border-blue-200 rounded-xl">
                                            <span className="text-[10px] font-black text-slate-700 uppercase tracking-widest block mb-1">Technology</span>
                                            <span className="text-sm font-bold text-slate-900">{product.technology.join(', ')}</span>
                                        </div>
                                    )}
                                    {Array.isArray(product.mainFunction) && product.mainFunction.length > 0 && (
                                        <div className="p-3 bg-gradient-to-r from-purple-50 to-purple-100/50 border border-purple-200 rounded-xl">
                                            <span className="text-[10px] font-black text-slate-700 uppercase tracking-widest block mb-1">Main Function</span>
                                            <span className="text-sm font-bold text-slate-900">{product.mainFunction.join(', ')}</span>
                                        </div>
                                    )}
                                    {product.wireless && (
                                        <div className="p-3 bg-gradient-to-r from-emerald-50 to-emerald-100/50 border border-emerald-200 rounded-xl">
                                            <span className="text-[10px] font-black text-slate-700 uppercase tracking-widest block mb-1">Wireless</span>
                                            <span className="text-sm font-bold text-slate-900">{product.wireless}</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Tabbed Content */}
                <div className="border-t-2 border-slate-100 pt-12 md:pt-16">
                    <div className="flex gap-8 md:gap-12 overflow-x-auto pb-px scrollbar-hide">
                        {["overview", "specifications", "reviews"].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`py-4 text-sm font-black uppercase tracking-[0.2em] transition-all relative whitespace-nowrap pb-4
                                    ${activeTab === tab 
                                        ? 'bg-gradient-to-r from-blue-600 to-blue-600 bg-clip-text text-transparent' 
                                        : 'text-slate-400 hover:text-slate-600'}`}
                            >
                                {tab}
                                {activeTab === tab && (
                                    <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full" />
                                )}
                            </button>
                        ))}
                    </div>

                    <div className="py-12 md:py-16">
                        {/* Overview Tab */}
                        {activeTab === "overview" && (
                            <div className="max-w-4xl animate-fadeIn">
                                <p className="text-slate-600 font-medium leading-relaxed text-base md:text-lg mb-8">
                                    {product.description}
                                </p>
                                {product.overview && (
                                    <div dangerouslySetInnerHTML={{ __html: product.overview }} className="prose prose-slate max-w-none text-slate-600 prose-sm md:prose-base" />
                                )}
                            </div>
                        )}

                        {/* Specifications Tab */}
                        {activeTab === "specifications" && (
                            <div className="animate-fadeIn">
                                {product.technicalSpecification ? (
                                    <div dangerouslySetInnerHTML={{ __html: product.technicalSpecification }} className="prose prose-slate max-w-none text-slate-600 prose-sm md:prose-base" />
                                ) : (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {[
                                            { label: 'Brand', value: product.brand },
                                            { label: 'Color', value: product.color },
                                            { label: 'Width', value: product.width ? `${product.width}"` : null },
                                            { label: 'Height', value: product.height ? `${product.height}"` : null },
                                            { label: 'Depth', value: product.depth ? `${product.depth}"` : null },
                                            { label: 'Screen Size', value: product.screenSize },
                                        ].map(item => (
                                            item.value && (
                                                <div key={item.label} className="p-4 bg-gradient-to-br from-slate-50 to-slate-100/50 rounded-2xl border border-slate-100 hover:shadow-md transition-all">
                                                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-2">{item.label}</span>
                                                    <span className="font-bold text-slate-900 uppercase text-sm">{item.value}</span>
                                                </div>
                                            )
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Reviews Tab */}
                        {activeTab === "reviews" && (
                            <div className="space-y-8 animate-fadeIn">
                                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 pb-8 border-b-2 border-slate-100">
                                    <div>
                                        <h2 className="text-3xl md:text-4xl font-black bg-gradient-to-r from-blue-600 to-blue-600 bg-clip-text text-transparent uppercase tracking-tighter mb-4">Verified Feedback</h2>

                                    </div>
                                    <div className="w-full md:w-auto flex flex-col items-end gap-2">
                                        {showReviewLoginMessage && (
                                            <div className="p-3 bg-gradient-to-r from-red-50 to-rose-50 text-red-600 rounded-xl text-[10px] font-bold border border-red-200 animate-pulse text-center w-full">
                                                Please login to write a review
                                            </div>
                                        )}
                                        {showEligibilityMessage && (
                                            <div className="p-3 bg-gradient-to-r from-blue-50 to-amber-50 text-blue-600 rounded-xl text-[10px] font-bold border border-blue-200 animate-pulse text-center w-full">
                                                Please purchase and receive this item to review
                                            </div>
                                        )}
                                        <button 
                                            onClick={handleWriteReview}
                                            className="w-full md:w-auto px-6 py-3 border-2 border-slate-900 text-slate-900 rounded-2xl font-black uppercase text-[11px] tracking-widest hover:bg-gradient-to-r hover:from-blue-600 hover:to-blue-600 hover:text-white hover:shadow-lg transition-all hover:shadow-slate-900/30 hover:border-transparent"
                                        >
                                            Write a Review
                                        </button>
                                    </div>
                                </div>

                                {product.reviews && product.reviews.length > 0 ? (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {product.reviews.map((review, index) => (
                                            <div key={index} className="p-6 bg-gradient-to-br from-slate-50 to-slate-100/50 rounded-2xl border-2 border-slate-100 hover:shadow-lg hover:border-slate-200 transition-all space-y-4">
                                                <div className="flex justify-between items-start gap-4">
                                                    <div>
                                                        <span className="font-black text-[11px] uppercase tracking-widest text-slate-900 block">{review.name}</span>
                                                        <div className="flex gap-1 mt-2">
                                                            {[1, 2, 3, 4, 5].map(s => (
                                                                <Star key={s} size={14} className={`${review.rating >= s ? 'fill-blue-400 text-blue-400' : 'text-slate-200'}`} />
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                                <p className="text-slate-600 text-sm font-medium leading-relaxed italic">"{review.comment}"</p>
                                            </div>
                                        ))}
                                    </div>
                                ) : null}
                            </div>
                        )}
                    </div>
                </div>

                {/* Related Products Section */}
                {Array.isArray(relatedProducts) && relatedProducts.length > 0 && (
                    <div className="mt-12 sm:mt-16 lg:mt-24 pt-8 sm:pt-12 lg:pt-16 border-t-2 border-slate-100">
                        <div className="mb-6 sm:mb-8 lg:mb-12">
                            <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black bg-gradient-to-r from-blue-600 to-blue-600 bg-clip-text text-transparent uppercase tracking-tighter mb-2">You Might Also Like</h3>
                            <p className="text-slate-600 text-sm sm:text-base font-medium">Explore other products in the same category</p>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {relatedProducts.filter(p => p && p._id !== product._id && p.slug !== (product.slug || productSlug)).slice(0, 4).map((item) => (
                                <Link 
                                    to={`/product/${item.slug || item._id}`} 
                                    key={item._id}
                                    className="group bg-white border-2 border-slate-100 rounded-3xl p-4 hover:shadow-lg hover:shadow-blue-200/30 hover:border-blue-200 transition-all duration-300 block"
                                    onClick={() => window.scrollTo(0, 0)}
                                >
                                    <div className="aspect-square bg-gradient-to-br from-slate-50 to-slate-100/50 rounded-2xl mb-4 overflow-hidden p-4 flex items-center justify-center">
                                        <ProductImage 
                                            src={item.image || (item.images && item.images.length > 0 ? (item.images[0].startsWith('http') ? item.images[0] : `${import.meta.env.VITE_API_URL?.replace('/api', '') || ''}${item.images[0]}`) : '/assets/printer.png')} 
                                            alt={item.title} 
                                            className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
                                        />
                                    </div>
                                    <h4 className="font-bold text-slate-900 text-sm line-clamp-2 mb-2 group-hover:text-blue-600 transition-colors">{item.title}</h4>
                                    <div className="flex items-center justify-between">
                                        <span className="text-lg font-black bg-gradient-to-r from-blue-600 to-blue-600 bg-clip-text text-transparent">${item.price?.toFixed(2)}</span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductDetails;

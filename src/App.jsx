import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { useEffect, lazy, Suspense } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllProducts } from './redux/actions/productActions';
import { fetchCartFromDB } from './redux/actions/cartActions';
import { ImagePreloadProvider } from './lib/ImagePreloadContext';

import Header from './components/Header';
import Footer from './components/Footer';
import HomeMain from './components/home/HomeMain';
import ScrollToTop from './components/ScrollToTop';
import ErrorBoundary from './components/common/ErrorBoundary';

// Lazy loaded routes
const ProfilePage = lazy(() => import('./components/profile/ProfilePage'));
const UnderConstruction = lazy(() => import('./components/common/UnderConstruction'));
const AboutMain = lazy(() => import('./components/about/AboutMain'));
const PrivacyPolicy = lazy(() => import('./components/privacyPolicy/PrivacyPolicy'));
const TermsAndConditions = lazy(() => import('./components/TermsAndConditions'));

// Admin Imports (lazy)
const AdminLogin = lazy(() => import('./components/admin/Auth/AdminLogin'));
const AdminLayout = lazy(() => import('./components/admin/Layout/AdminLayout'));
const AdminDashboard = lazy(() => import('./components/admin/Pages/AdminDashboard'));
const AdminCategories = lazy(() => import('./components/admin/Pages/AdminCategories'));
const AdminProducts = lazy(() => import('./components/admin/Pages/AdminProducts'));
const AdminOrders = lazy(() => import('./components/admin/Pages/AdminOrders'));
const AdminCustomers = lazy(() => import('./components/admin/Pages/AdminCustomers'));
const AdminChat = lazy(() => import('./components/admin/Pages/AdminChat'));
const AdminAnalytics = lazy(() => import('./components/admin/Pages/AdminAnalytics'));
const AdminSettings = lazy(() => import('./components/admin/Pages/AdminSettings'));

const Cart = lazy(() => import('./components/Cart'));
const Checkout = lazy(() => import('./components/Checkout'));
const ProductDetails = lazy(() => import('./components/productsCategories/ProductDetails'));
const OrderDetails = lazy(() => import('./components/order/OrderDetails'));
const TrackOrder = lazy(() => import('./components/order/TrackOrder'));
const ReturnsAndExchanges = lazy(() => import('./components/order/ReturnsAndExchanges'));
const FAQMain = lazy(() => import('./components/faq/FAQMain'));
const RefundReturnPolicy = lazy(() => import('./components/privacyPolicy/RefundReturnPolicy'));
const ReturnExchangePolicy = lazy(() => import('./components/privacyPolicy/ReturnExchangePolicy'));
const ShippingPolicy = lazy(() => import('./components/privacyPolicy/ShippingPolicy'));
const CookiePolicy = lazy(() => import('./components/privacyPolicy/CookiePolicy'));
const Disclaimer = lazy(() => import('./components/privacyPolicy/Disclaimer'));
const ContactMain = lazy(() => import('./components/contact/ContactMain'));
const EULA = lazy(() => import('./components/policies/EULA'));
const DoNotSell = lazy(() => import('./components/policies/DoNotSell'));

// Blog Imports (lazy)
const BlogsMain = lazy(() => import('./components/blogs/BlogsMain'));
const HowChoosePrinter2026 = lazy(() => import('./components/blogs/posts/HowChoosePrinter2026'));
const InkjetVsLaser2026 = lazy(() => import('./components/blogs/posts/InkjetVsLaser2026'));
const PrintYields2026 = lazy(() => import('./components/blogs/posts/PrintYields2026'));
const WirelessPrinting2026 = lazy(() => import('./components/blogs/posts/WirelessPrinting2026'));
const ExtendPrinterLife2026 = lazy(() => import('./components/blogs/posts/ExtendPrinterLife2026'));
const TrustedRetailers2026 = lazy(() => import('./components/blogs/posts/TrustedRetailers2026'));
const ShopMain = lazy(() => import('./components/shop/ShopMain'));

function App() {
    const location = useLocation();
    const isAdminRoute = location.pathname.startsWith('/admin');
    const dispatch = useDispatch();
    const { allLoaded } = useSelector((state) => state.productList);
    const { userInfo } = useSelector((state) => state.userLogin);

    // Prefetch all products in background on app mount (once)
    useEffect(() => {
        if (!allLoaded) {
            dispatch(fetchAllProducts());
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch]);

    // Restore cart from DB if user is logged in (e.g. page refresh)
    useEffect(() => {
        if (userInfo?.token) {
            dispatch(fetchCartFromDB());
        }
    }, [dispatch, userInfo?.token]);

    return (
        <ImagePreloadProvider>
        <div className="flex flex-col min-h-screen">
            {!isAdminRoute && <Header />}
            <ScrollToTop />

            <main className={`flex-grow ${isAdminRoute ? 'h-screen overflow-hidden' : ''}`}>
                <Suspense fallback={<div className="flex items-center justify-center min-h-[60vh]"><div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div></div>}>
                <ErrorBoundary>
                <Routes>
                    {/* Public Routes */}
                    <Route path="/" element={<HomeMain />} />
                    {/* <Route path="/product-category/all-in-one-printers" element={<AllInOne />} />
                    <Route path="/product-category/large-format-printers" element={<LargeFormat />} />
                    <Route path="/product-category/inkjet-printers" element={<InkjetPrinters />} />
                    <Route path="/product-category/laser-printers" element={<LaserPrinters />} />
                    <Route path="/product-category/led-printers" element={<LedPrinters />} />
                    <Route path="/product-category/ink-toner" element={<InkToner />} /> */}
                    {/* <Route path="/customer-service" element={<CustomerMain />} /> */}
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/checkout" element={<Checkout />} />
                    <Route path="/order/:id" element={<OrderDetails />} />
                    <Route path="/profile" element={<ProfilePage />} />
                    
                    {/* Blogs */}
                    <Route path="/blogs" element={<BlogsMain />} />
                    <Route path="/blogs/how-choose-right-printer-2026-guide" element={<HowChoosePrinter2026 />} />
                    <Route path="/blogs/inkjet-vs-laser-printers-2026" element={<InkjetVsLaser2026 />} />
                    <Route path="/blogs/understanding-print-yields-page-counts-2026" element={<PrintYields2026 />} />
                    <Route path="/blogs/wireless-printing-easy-modern-printers-2026" element={<WirelessPrinting2026 />} />
                    <Route path="/blogs/tips-extend-printer-life-running-smoothly-2026" element={<ExtendPrinterLife2026 />} />
                    <Route path="/blogs/buy-printing-supplies-trusted-retailers-2026" element={<TrustedRetailers2026 />} />

                    <Route path="/product/:productSlug" element={<ProductDetails />} />

                    {/*order*/}
                    <Route path="/track-order" element={<TrackOrder />} />
                    <Route path="/returns-exchanges" element={<ReturnsAndExchanges />} />
                    <Route path="/faq" element={<FAQMain />} />


                    {/* other static routes */}
                    <Route path="/about" element={<AboutMain />} />
                    <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                    <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
                    <Route path="/refund-return-policy" element={<RefundReturnPolicy />} />
                    <Route path="/return-exchange-policy" element={<ReturnExchangePolicy />} />
                    <Route path="/shipping-policy" element={<ShippingPolicy />} />
                    <Route path="/cookie-policy" element={<CookiePolicy />} />
                    {/* <Route path="/ccpa-privacy-policy" element={<CCPAPrivacyPolicy />} /> */}
                    <Route path="/disclaimer" element={<Disclaimer />} />
                    <Route path="/contact-us" element={<ContactMain />} />
                    <Route path="/eula" element={<EULA />} />
                    <Route path="/do-not-sell" element={<DoNotSell /> } />

                    {/* Admin Routes */}
                    <Route path="/admin/login" element={<AdminLogin />} />
                    <Route path="/admin" element={<AdminLayout />}>
                        <Route index element={<Navigate to="/admin/dashboard" replace />} />
                        <Route path="dashboard" element={<AdminDashboard />} />
                        <Route path="categories" element={<AdminCategories />} />
                        <Route path="products" element={<AdminProducts />} />
                        <Route path="orders" element={<AdminOrders />} />
                        <Route path="customers" element={<AdminCustomers />} />
                        <Route path="chat" element={<AdminChat />} />
                        <Route path="analytics" element={<AdminAnalytics />} />
                        <Route path="settings" element={<AdminSettings />} />
                        <Route path="*" element={<UnderConstruction />} />
                    </Route>

                    {/* Placeholder Routes for Public Site */}
                    <Route path="/shop" element={<ShopMain />} />

                    {/* Catch-all */}
                    <Route path="*" element={<UnderConstruction />} />
                </Routes>
                </ErrorBoundary>
                </Suspense>
            </main>

            {!isAdminRoute && <Footer />}
        </div>
        </ImagePreloadProvider>
    );
}

export default App;

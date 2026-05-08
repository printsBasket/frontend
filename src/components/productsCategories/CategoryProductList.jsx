import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../../redux/actions/productActions";
import ProductGrid from "./ProductGrid";


const CategoryProductList = ({ categoryName, heading, enableFlowLayout = false, itemLimit = null }) => {
    const dispatch = useDispatch();

    const productList = useSelector((state) => state.productList);
    const { loading, error, products, page, pages, allProducts = [], allLoaded } = productList;

    // Only fetch from API if allProducts isn't loaded yet
    useEffect(() => {
        if (!allLoaded) {
            dispatch(listProducts('', categoryName, 1, '', '', '', [], '', '', []));
        }
    }, [dispatch, categoryName, allLoaded]);

    // Use allProducts if available, filtering by category; fall back to paginated products
    const sourceProducts = allLoaded
        ? (categoryName
            ? allProducts.filter(p => {
                const catName = p.category?.name || '';
                return catName.toLowerCase() === categoryName.toLowerCase();
            })
            : allProducts)
        : (Array.isArray(products) ? products : []);

    const safeProducts = sourceProducts;
    const displayProducts = itemLimit ? safeProducts.slice(0, itemLimit) : safeProducts;
    const formattedProducts = displayProducts.map(product => ({
        ...product,
        image: product.image 
            ? (product.image.startsWith('http') ? product.image : `${import.meta.env.VITE_API_URL?.replace('/api', '') || ''}${product.image}`)
            : (product.images && product.images.length > 0 
                ? (product.images[0].startsWith('http') ? product.images[0] : `${import.meta.env.VITE_API_URL?.replace('/api', '') || ''}${product.images[0]}`) 
                : "/assets/printer.png"),
        link: `/product/${product.slug || product._id}`
    }));

    if (error && !allLoaded) return <div className="py-20 text-center font-black uppercase text-[10px] tracking-[0.3em] text-red-500">{error}</div>;

    if (!loading && !allLoaded && safeProducts.length === 0) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-20 text-center">
                <h2 className="text-3xl font-semibold text-gray-900 mb-6">{heading || categoryName}</h2>
                <div className="py-20 bg-slate-50 rounded-[2.5rem] border border-dashed border-slate-200">
                    <p className="font-black uppercase text-[10px] tracking-[0.4em] text-slate-400">Products Coming Soon</p>
                    <p className="mt-4 text-slate-500 text-sm font-medium">We are currently stocking this category. Please check back later.</p>
                </div>
            </div>
        );
    }

    return (
         <div className="flex flex-col">
            <ProductGrid
                heading={heading || categoryName}
                products={formattedProducts}
                enableFlowLayout={enableFlowLayout}
            />
        </div>
    );
};

export default CategoryProductList;

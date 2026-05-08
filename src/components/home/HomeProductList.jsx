import React from "react";
import CategoryProductList from "../productsCategories/CategoryProductList";

const HomeProductList = ({ enableFlowLayout = false }) => {
    // categoryName="" means fetch all, itemLimit=15 shows only 15 items without load more button
    return <CategoryProductList categoryName="" heading="Trending products" enableFlowLayout={enableFlowLayout} itemLimit={15} />;
};

export default HomeProductList;

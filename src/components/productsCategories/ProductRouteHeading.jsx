import React from "react";

const ProductRouteHeading = ({
    breadcrumbs = [],
    title,
    description,
}) => {
    return (
        <section className="relative bg-gradient-to-b from-gray-50 via-white to-gray-100 border-b">
            <div className="max-w-7xl mx-auto px-4 py-10 sm:py-14 md:py-20 text-center">

                {/* Title */}
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-900">
                    {title}
                </h1>

                {/* Breadcrumbs */}
                <nav className="mt-4 text-sm text-gray-500 flex justify-center flex-wrap items-center">
                    {breadcrumbs.map((item, index) => (
                        <span key={index} className="flex items-center">
                            {item.link ? (
                                <a
                                    href={item.link}
                                    className="hover:text-gray-900 transition-colors"
                                >
                                    {item.label}
                                </a>
                            ) : (
                                <span className="text-gray-700 font-medium">
                                    {item.label}
                                </span>
                            )}

                            {index < breadcrumbs.length - 1 && (
                                <span className="mx-2 text-gray-400">/</span>
                            )}
                        </span>
                    ))}
                </nav>

                {/* Description */}
                {description && (
                    <p className="mt-6 text-gray-600 max-w-3xl mx-auto text-base md:text-lg">
                        {description}
                    </p>
                )}
            </div>

            {/* Subtle bottom divider */}
            <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
        </section>
    );
};

export default ProductRouteHeading;

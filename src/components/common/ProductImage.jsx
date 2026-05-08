import React, { useState } from 'react';

const FALLBACK = '/assets/printer.png';

const ProductImage = ({ src, alt, className = '', ...props }) => {
    const [loaded, setLoaded] = useState(false);

    const { width, height, loading: loadingAttr, ...restProps } = props;

    return (
        <div className="relative w-full h-full flex items-center justify-center">
            {/* Spinner overlay - covers the area until image loads */}
            {!loaded && (
                <div className="absolute inset-0 flex items-center justify-center z-20 bg-gray-50">
                    <div className="w-8 h-8 border-[3px] border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
                </div>
            )}
            <img
                src={src || FALLBACK}
                alt={alt}
                width={width}
                height={height}
                loading={loadingAttr}
                className={className}
                onLoad={() => setLoaded(true)}
                onError={(e) => {
                    if (!e.target.dataset.fb) {
                        e.target.dataset.fb = '1';
                        e.target.src = FALLBACK;
                    } else {
                        setLoaded(true);
                    }
                }}
                {...restProps}
            />
        </div>
    );
};

export default ProductImage;

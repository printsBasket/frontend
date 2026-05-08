import React, { createContext, useContext, useEffect, useState, useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';

const ImagePreloadContext = createContext({
  imageStatus: {},
  allImagesPreloaded: false,
  getImageUrl: () => null,
  isImageReady: () => true,
  isImageLoaded: () => true,
});

export const useImagePreload = () => useContext(ImagePreloadContext);

// Resolve a product's primary image to a full URL
function resolveImageUrl(product) {
  const baseUrl = import.meta.env.VITE_API_URL?.replace('/api', '') || '';
  if (product.image) {
    return product.image.startsWith('http') ? product.image : `${baseUrl}${product.image}`;
  }
  if (product.images && product.images.length > 0) {
    return product.images[0].startsWith('http') ? product.images[0] : `${baseUrl}${product.images[0]}`;
  }
  return null;
}

export const ImagePreloadProvider = ({ children }) => {
  const { allProducts = [], allLoaded } = useSelector((state) => state.productList);
  const [imageStatus, setImageStatus] = useState({}); // url -> 'loading' | 'loaded' | 'error'

  // Background preload images (warms browser cache, non-blocking)
  useEffect(() => {
    if (!allLoaded || allProducts.length === 0) return;

    let cancelled = false;

    const urls = [...new Set(
      allProducts.map((p) => resolveImageUrl(p)).filter(Boolean)
    )];

    // Batch preload with concurrency limit to avoid saturating connections
    const CONCURRENT = 6;
    let index = 0;

    const loadNext = () => {
      if (cancelled || index >= urls.length) return;
      const url = urls[index++];
      const img = new Image();
      img.onload = () => {
        if (!cancelled) {
          setImageStatus((prev) => ({ ...prev, [url]: 'loaded' }));
        }
        loadNext();
      };
      img.onerror = () => {
        if (!cancelled) {
          setImageStatus((prev) => ({ ...prev, [url]: 'error' }));
        }
        loadNext();
      };
      img.src = url;
    };

    // Start initial batch
    for (let i = 0; i < Math.min(CONCURRENT, urls.length); i++) {
      loadNext();
    }

    return () => { cancelled = true; };
  }, [allLoaded, allProducts]);

  // Derive allImagesPreloaded from actual imageStatus (no race condition)
  const allImagesPreloaded = useMemo(() => {
    if (!allLoaded || allProducts.length === 0) return false;
    return allProducts.every((product) => {
      const url = resolveImageUrl(product);
      if (!url) return true;
      const status = imageStatus[url];
      return status === 'loaded' || status === 'error';
    });
  }, [allLoaded, allProducts, imageStatus]);

  const getImageUrl = useCallback((product) => resolveImageUrl(product), []);

  const isImageReady = useCallback(
    (product) => {
      const url = resolveImageUrl(product);
      if (!url) return true;
      const status = imageStatus[url];
      return status === 'loaded' || status === 'error';
    },
    [imageStatus]
  );

  const isImageLoaded = useCallback(
    (product) => {
      const url = resolveImageUrl(product);
      if (!url) return true;
      return imageStatus[url] === 'loaded';
    },
    [imageStatus]
  );

  return (
    <ImagePreloadContext.Provider value={{ imageStatus, allImagesPreloaded, getImageUrl, isImageReady, isImageLoaded }}>
      {children}
    </ImagePreloadContext.Provider>
  );
};

export default ImagePreloadContext;

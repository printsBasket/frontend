import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, Search, Loader2, Star, X, Filter } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllProducts } from '../../redux/actions/productActions';
import { useImagePreload } from '../../lib/ImagePreloadContext';
import ProductImage from '../common/ProductImage';
import SEO from '../common/SEO';

const ITEMS_PER_PAGE = 12;

const ShopMain = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedTechnology, setSelectedTechnology] = useState('');
  const [selectedUsageCategory, setSelectedUsageCategory] = useState([]);
  const [selectedWireless, setSelectedWireless] = useState('');
  const [selectedMainFunction, setSelectedMainFunction] = useState([]);
  const [selectedRating, setSelectedRating] = useState(0);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');

  // Use global image preload context (images start preloading on app mount)
  const { getImageUrl: getProductImageUrl } = useImagePreload();

  const productList = useSelector((state) => state.productList);
  const { allProducts = [], allLoading: loading, allError: error, allLoaded } = productList;

  // Filter options
  const brands = ['Brother', 'Canon', 'Epson', 'HP'];
  const technologies = ['Inkjet', 'Laser', 'Laser (B/W)'];
  const usageCategories = [
    { label: 'Home', value: 'Home' },
    { label: 'Office', value: 'Office' },
    { label: 'Mobile', value: 'Mobile' },
    { label: 'Photo', value: 'Photo' }
  ];
  const wirelessOptions = ['Yes', 'No'];
  const mainFunctions = ['Print', 'Scan', 'Copy', 'Fax', 'Print Only'];
  const ratings = [5, 4, 3, 2, 1];

  // Debounce search term (wait 500ms after user stops typing)
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  // allProducts prefetched by App.jsx — only fetch if somehow missed
  useEffect(() => {
    if (!allLoaded) {
      dispatch(fetchAllProducts());
    }
  }, [dispatch, allLoaded]);

  // Reset to page 1 when any filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearchTerm, selectedBrand, selectedTechnology, selectedUsageCategory, selectedWireless, selectedMainFunction, selectedRating, priceRange, sortBy]);

  // Filter products client-side for instant UI
  const getFilteredProducts = () => {
    let filtered = allProducts;
    if (debouncedSearchTerm) {
      filtered = filtered.filter(p => p.title?.toLowerCase().includes(debouncedSearchTerm.toLowerCase()));
    }
    if (selectedBrand) {
      filtered = filtered.filter(p => p.brand?.toLowerCase() === selectedBrand.toLowerCase());
    }
    if (selectedTechnology) {
      filtered = filtered.filter(p => Array.isArray(p.technology) ? p.technology.includes(selectedTechnology) : p.technology === selectedTechnology);
    }
    if (selectedUsageCategory.length > 0) {
      filtered = filtered.filter(p => Array.isArray(p.usageCategory) && selectedUsageCategory.some(cat => p.usageCategory.includes(cat)));
    }
    if (selectedWireless) {
      filtered = filtered.filter(p => p.wireless === selectedWireless);
    }
    if (selectedMainFunction.length > 0) {
      filtered = filtered.filter(p => Array.isArray(p.mainFunction) && selectedMainFunction.some(f => p.mainFunction.includes(f)));
    }
    return filtered;
  };

  const productsToShow = getFilteredProducts();

  // Handle URL query parameters on mount
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    
    // Read URL parameters and set filters
    if (params.has('search')) {
      setSearchTerm(params.get('search'));
    }
    if (params.has('technology')) {
      setSelectedTechnology(params.get('technology'));
    }
    if (params.has('usageCategory')) {
      setSelectedUsageCategory([params.get('usageCategory')]);
    }
    if (params.has('brand')) {
      setSelectedBrand(params.get('brand'));
    }
  }, [location.search]);

  const handleUsageCategoryChange = (category) => {
    setSelectedUsageCategory((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
    setCurrentPage(1);
  };
  const handleMainFunctionChange = (func) => {
    setSelectedMainFunction((prev) =>
      prev.includes(func)
        ? prev.filter((f) => f !== func)
        : [...prev, func]
    );
    setCurrentPage(1);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setSortBy('');
    setSearchTerm('');
    setSelectedBrand('');
    setSelectedTechnology('');
    setSelectedUsageCategory([]);
    setSelectedWireless('');
    setSelectedMainFunction([]);
    setSelectedRating(0);
    setPriceRange([0, 1000]);
    setCurrentPage(1);
  };

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

  const filteredByPrice = productsToShow.filter(
    (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
  );

  const filteredByRatingUnsorted = filteredByPrice.filter(
    (p) => selectedRating === 0 || Math.round(p.rating || 0) >= selectedRating
  );

  const filteredByRating = [...filteredByRatingUnsorted].sort((a, b) => {
    if (sortBy === 'lowToHigh') return a.price - b.price;
    if (sortBy === 'highToLow') return b.price - a.price;
    return 0;
  });

  const itemsPerPage = ITEMS_PER_PAGE;
  const totalPages = Math.ceil(filteredByRating.length / itemsPerPage);
  const paginatedProducts = filteredByRating.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const hasActiveFilters =
    sortBy ||
    searchTerm ||
    selectedBrand ||
    selectedTechnology ||
    selectedUsageCategory.length > 0 ||
    selectedWireless ||
    selectedMainFunction.length > 0 ||
    selectedRating > 0 ||
    priceRange[0] > 0 ||
    priceRange[1] < 1000;

  return (
    <div className="min-h-screen bg-gray-50">
      <SEO
          title="Shop Printers & Supplies"
          description="Browse our full collection of inkjet, laser, and all-in-one printers. Filter by brand, technology, and price. Free shipping on orders."
          canonical="/shop"
      />
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 py-6 sm:py-8 lg:py-12 text-center">
          <p className="text-gray-600 mb-2">
            <Link to="/" className="text-blue-600 hover:text-blue-700 font-medium">
              Home
            </Link>
            {' / '}
            <span className="text-gray-800 font-medium">Shop</span>
          </p>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-600 mb-4">
            Shop
          </h1>
          <div className="h-1 w-24 bg-gradient-to-r from-blue-500 to-blue-500 mx-auto"></div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-6 sm:py-8 md:pt-12 lg:pt-20 pt-5">
        {/* Mobile Search and Filter Bar */}
        <div className="lg:hidden mb-6 space-y-3">
          {/* Mobile Search Bar */}
          <form onSubmit={handleSearchSubmit} className="bg-white rounded-lg shadow-md p-4 border border-gray-200">
            <div className="relative flex gap-2">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="bg-gradient-to-r from-blue-600 to-blue-600 text-white px-4 py-2 rounded-lg hover:shadow-lg transition"
              >
                <Search size={18} />
              </button>
            </div>
          </form>

          {/* Mobile Filter and Sort Row */}
          <div className="flex gap-3 items-stretch">
            {/* Mobile Filter Button */}
            <button
              onClick={() => setIsFilterDrawerOpen(true)}
              className="flex-1 bg-white border border-gray-200 rounded-lg shadow-md p-4 flex items-center gap-3 hover:bg-gray-50 transition"
            >
              {/* Filter Icon - Matching image style */}
              <div className="flex items-center gap-1.5">
                <div className="w-5 h-5 flex flex-col justify-center gap-1">
                  <div className="w-full h-0.5 bg-amber-600"></div>
                  <div className="w-full h-0.5 bg-amber-600"></div>
                  <div className="w-full h-0.5 bg-amber-600"></div>
                </div>
              </div>
              <span className="font-semibold text-gray-900 text-sm">Filters</span>
            </button>

            {/* Mobile Sort Dropdown */}
            <select
              value={sortBy}
              onChange={(e) => {
                setSortBy(e.target.value);
                setCurrentPage(1);
              }}
              className="bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium text-gray-700 cursor-pointer shadow-md hover:shadow-md transition whitespace-nowrap"
            >
              <option value="">Sort by latest</option>
              <option value="lowToHigh">Price: Low to High</option>
              <option value="highToLow">Price: High to Low</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Sidebar - Filters (Hidden on Mobile) */}
          <div className="hidden lg:block lg:col-span-1 space-y-6">
            {/* Search Bar */}
            <form onSubmit={handleSearchSubmit} className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
              <h3 className="font-bold text-gray-900 mb-4">Search Products</h3>
              <div className="relative flex">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="submit"
                  className="ml-2 bg-gradient-to-r from-blue-600 to-blue-600 text-white px-4 py-2 rounded-lg hover:shadow-lg transition"
                >
                  <Search size={18} />
                </button>
              </div>
            </form>

            {/* Clear Filters Button */}
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="w-full bg-red-50 border border-red-200 text-red-700 font-semibold py-2 rounded-lg hover:bg-red-100 transition"
              >
                Clear All Filters
              </button>
            )}

            {/* Brand Filter */}
            <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center justify-between">
                Filter by Brand
                <ChevronDown size={18} />
              </h3>
              <div className="space-y-2">
                <label className="flex items-center gap-3 cursor-pointer hover:text-blue-600 transition">
                  <input
                    type="radio"
                    name="brand"
                    value=""
                    checked={selectedBrand === ''}
                    onChange={(e) => {
                      setSelectedBrand(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="w-4 h-4 text-blue-600"
                  />
                  <span className="text-sm text-gray-700">All Brands</span>
                </label>
                {brands.map((brand) => (
                  <label
                    key={brand}
                    className="flex items-center gap-3 cursor-pointer hover:text-blue-600 transition"
                  >
                    <input
                      type="radio"
                      name="brand"
                      value={brand}
                      checked={selectedBrand === brand}
                      onChange={(e) => {
                        setSelectedBrand(e.target.value);
                        setCurrentPage(1);
                      }}
                      className="w-4 h-4 text-blue-600"
                    />
                    <span className="text-sm text-gray-700">{brand}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Technology Filter */}
            <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
              <h3 className="font-bold text-gray-900 mb-4">Printer Type</h3>
              <div className="space-y-2">
                <label className="flex items-center gap-3 cursor-pointer hover:text-blue-600 transition">
                  <input
                    type="radio"
                    name="technology"
                    value=""
                    checked={selectedTechnology === ''}
                    onChange={(e) => {
                      setSelectedTechnology(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="w-4 h-4 text-blue-600"
                  />
                  <span className="text-sm text-gray-700">All Types</span>
                </label>
                {technologies.map((tech) => (
                  <label
                    key={tech}
                    className="flex items-center gap-3 cursor-pointer hover:text-blue-600 transition"
                  >
                    <input
                      type="radio"
                      name="technology"
                      value={tech}
                      checked={selectedTechnology === tech}
                      onChange={(e) => {
                        setSelectedTechnology(e.target.value);
                        setCurrentPage(1);
                      }}
                      className="w-4 h-4 text-blue-600"
                    />
                    <span className="text-sm text-gray-700">{tech === 'Laser (B/W)' ? 'Laser Printers (B/W)' : tech + ' Printers'}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Usage Category Filter */}
            <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
              <h3 className="font-bold text-gray-900 mb-4">Use Case</h3>
              <div className="space-y-2">
                {usageCategories.map((category) => (
                  <label
                    key={category.value}
                    className="flex items-center gap-3 cursor-pointer hover:text-blue-600 transition"
                  >
                    <input
                      type="checkbox"
                      checked={selectedUsageCategory.includes(category.value)}
                      onChange={() => handleUsageCategoryChange(category.value)}
                      className="w-4 h-4 text-blue-600 rounded"
                    />
                    <span className="text-sm text-gray-700">{category.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Wireless Filter */}
            <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
              <h3 className="font-bold text-gray-900 mb-4">Wireless</h3>
              <div className="space-y-2">
                <label className="flex items-center gap-3 cursor-pointer hover:text-blue-600 transition">
                  <input
                    type="radio"
                    name="wireless"
                    value=""
                    checked={selectedWireless === ''}
                    onChange={() => setSelectedWireless('')}
                    className="w-4 h-4 text-blue-600"
                  />
                  <span className="text-sm text-gray-700">All</span>
                </label>
                {wirelessOptions.map((opt) => (
                  <label key={opt} className="flex items-center gap-3 cursor-pointer hover:text-blue-600 transition">
                    <input
                      type="radio"
                      name="wireless"
                      value={opt}
                      checked={selectedWireless === opt}
                      onChange={() => setSelectedWireless(opt)}
                      className="w-4 h-4 text-blue-600"
                    />
                    <span className="text-sm text-gray-700">{opt}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Main Function Filter */}
            <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
              <h3 className="font-bold text-gray-900 mb-4">Main Function</h3>
              <div className="space-y-2">
                {mainFunctions.map((func) => (
                  <label key={func} className="flex items-center gap-3 cursor-pointer hover:text-blue-600 transition">
                    <input
                      type="checkbox"
                      checked={selectedMainFunction.includes(func)}
                      onChange={() => handleMainFunctionChange(func)}
                      className="w-4 h-4 text-blue-600 rounded"
                    />
                    <span className="text-sm text-gray-700">{func}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price Range Filter */}
            <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
              <h3 className="font-bold text-gray-900 mb-4">Price Range</h3>
              <div className="space-y-2">
                <div className="flex justify-between text-sm text-gray-700 font-semibold mb-3">
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1000"
                  value={priceRange[0]}
                  onChange={(e) => {
                    const value = Math.min(parseInt(e.target.value), priceRange[1]);
                    setPriceRange([value, priceRange[1]]);
                  }}
                  className="w-full h-2 bg-gradient-to-r from-blue-300 to-blue-300 rounded-lg appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, #2364eb 0%, #2364eb ${((priceRange[0]) / 1000) * 100}%, #3b82f6 ${((priceRange[0]) / 1000) * 100}%, #3b82f6 100%)`
                  }}
                />
                <input
                  type="range"
                  min="0"
                  max="1000"
                  value={priceRange[1]}
                  onChange={(e) => {
                    const value = Math.max(parseInt(e.target.value), priceRange[0]);
                    setPriceRange([priceRange[0], value]);
                  }}
                  className="w-full h-2 bg-gradient-to-r from-blue-300 to-blue-300 rounded-lg appearance-none cursor-pointer mt-2"
                  style={{
                    background: `linear-gradient(to right, #2364eb 0%, #2364eb ${((priceRange[0]) / 1000) * 100}%, #3b82f6 ${((priceRange[0]) / 1000) * 100}%, #3b82f6 ${((priceRange[1]) / 1000) * 100}%, #d1d5db ${((priceRange[1]) / 1000) * 100}%, #d1d5db 100%)`
                  }}
                />
              </div>
            </div>

            {/* Rating Filter */}
            <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
              <h3 className="font-bold text-gray-900 mb-4">Filter by Rating</h3>
              <div className="space-y-3">
                <label className="flex items-center gap-3 cursor-pointer hover:text-blue-600 transition">
                  <input
                    type="radio"
                    name="desktopRating"
                    value="0"
                    checked={selectedRating === 0}
                    onChange={() => setSelectedRating(0)}
                    className="w-4 h-4 text-blue-600"
                  />
                  <span className="text-sm text-gray-700">All Ratings</span>
                </label>
                {ratings.map((star) => (
                  <label key={star} className="flex items-center gap-3 cursor-pointer hover:text-blue-600 transition">
                    <input
                      type="radio"
                      name="desktopRating"
                      value={star}
                      checked={selectedRating === star}
                      onChange={() => setSelectedRating(star)}
                      className="w-4 h-4 text-blue-600"
                    />
                    <div className="flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <span
                          key={i}
                          className={`text-sm ${
                            i < star ? 'text-yellow-400' : 'text-gray-300'
                          }`}
                        >
                          ★
                        </span>
                      ))}
                      <span className="text-xs text-gray-500 ml-1">& up</span>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Right Content - Products */}
          <div className="lg:col-span-3">
            {/* Top Bar - Results and Sort */}
            <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 mb-8">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <p className="text-gray-700 font-semibold">
                    Showing{' '}
                    <span className="font-bold text-gray-900">
                      {filteredByRating.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0}–
                      {Math.min(currentPage * itemsPerPage, filteredByRating.length)}
                    </span>{' '}
                    of <span className="font-bold text-gray-900">{filteredByRating.length}</span> results
                  </p>
                  {hasActiveFilters && (
                    <p className="text-xs text-gray-500 mt-1">Filters applied</p>
                  )}
                </div>
                <div className="hidden sm:flex items-center gap-2">
                  <select
                    value={sortBy}
                    onChange={(e) => {
                      setSortBy(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white font-medium text-gray-700 cursor-pointer"
                  >
                    <option value="">Sort by latest</option>
                    <option value="lowToHigh">Price: Low to High</option>
                    <option value="highToLow">Price: High to Low</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Loading State - Skeleton Cards */}
            {loading && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {Array.from({ length: ITEMS_PER_PAGE }).map((_, i) => (
                  <div key={i} className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden animate-pulse">
                    <div className="bg-gray-200 aspect-[4/3] sm:aspect-square"></div>
                    <div className="p-4 space-y-3">
                      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                      <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                      <div className="h-3 bg-gray-200 rounded w-1/3"></div>
                      <div className="h-5 bg-gray-200 rounded w-1/4"></div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Error State */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-8 text-center">
                <p className="text-red-700 font-semibold text-lg">Error loading products</p>
                <p className="text-red-600 text-sm mt-2">{error}</p>
              </div>
            )}

            {/* Products Grid */}
            {!loading && filteredByRating.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {paginatedProducts.map((product) => (
                  <Link
                    key={product._id}
                    to={`/product/${product.slug || product._id}`}
                    className="group bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                  >
                    {/* Product Image Container */}
                    <div className="relative bg-gray-50 aspect-[4/3] sm:aspect-square overflow-hidden flex items-center justify-center p-2.5 sm:p-3">
                        <ProductImage
                          src={getProductImageUrl(product) || '/assets/printer.png'}
                          alt={product.title}
                          width="320"
                          height="320"
                          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                        />


                    </div>

                    {/* Product Info */}
                    <div className="p-4">
                      <h3 className="font-bold text-gray-900 text-sm mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                        {product.title}
                      </h3>

                      {/* Category */}
                      <p className="text-xs text-gray-500 mb-2">{product.category?.name || 'Uncategorized'}</p>

                      {/* Price */}
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-lg text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-600">
                          ${product.price?.toFixed(2) || '0.00'}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}

            {/* Empty State */}
            {!loading && filteredByRating.length === 0 && !error && (
              <div className="text-center py-20">
                <div className="inline-block mb-4">
                  <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center text-4xl mb-4">
                    🔍
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">No products found</h3>
                <p className="text-gray-600 mb-6">Try adjusting your filters to find what you're looking for.</p>
                <button
                  onClick={clearFilters}
                  className="bg-gradient-to-r from-blue-600 to-blue-600 text-white font-bold px-6 py-3 rounded-lg hover:shadow-lg transition"
                >
                  Clear Filters
                </button>
              </div>
            )}

            {/* Pagination */}
            {!loading && totalPages > 1 && filteredByRating.length > 0 && (
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12 pb-8">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="px-6 py-3 bg-white border border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
                >
                  Previous
                </button>

                <div className="flex items-center gap-2">
                  {Array.from({ length: Math.min(totalPages, 5) }).map((_, idx) => {
                    const pageNum = idx + 1;
                    return (
                      <button
                        key={pageNum}
                        onClick={() => setCurrentPage(pageNum)}
                        className={`px-4 py-2 rounded-lg font-semibold transition ${
                          currentPage === pageNum
                            ? 'bg-gradient-to-r from-blue-600 to-blue-600 text-white shadow-md'
                            : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                  {totalPages > 5 && (
                    <span className="text-gray-600 font-semibold">... Page {currentPage} of {totalPages}</span>
                  )}
                </div>

                <button
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-600 text-white rounded-lg font-semibold hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition"
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Filter Drawer */}
        {isFilterDrawerOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            {/* Overlay */}
            <div
              className="absolute inset-0 bg-black/40 transition-opacity"
              onClick={() => setIsFilterDrawerOpen(false)}
            ></div>

            {/* Drawer Panel */}
            <div className="absolute left-0 top-0 bottom-0 w-80 max-w-[90vw] bg-white shadow-xl overflow-y-auto animate-in slide-in-from-left">
              {/* Drawer Header */}
              <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between">
                <h2 className="text-lg font-bold text-gray-900">Filters</h2>
                <button
                  onClick={() => setIsFilterDrawerOpen(false)}
                  className="text-gray-500 hover:text-gray-700 transition"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Drawer Content */}
              <div className="p-4 space-y-6">
                {/* Clear Filters Button */}
                {hasActiveFilters && (
                  <button
                    onClick={() => {
                      clearFilters();
                      setIsFilterDrawerOpen(false);
                    }}
                    className="w-full bg-red-50 border border-red-200 text-red-700 font-semibold py-2 rounded-lg hover:bg-red-100 transition"
                  >
                    Clear All Filters
                  </button>
                )}

                {/* Brand Filter */}
                <div>
                  <h3 className="font-bold text-gray-900 mb-3 flex items-center justify-between">
                    Filter by Brand
                    <ChevronDown size={18} />
                  </h3>
                  <div className="space-y-2">
                    <label className="flex items-center gap-3 cursor-pointer hover:text-blue-600 transition">
                      <input
                        type="radio"
                        name="brand"
                        value=""
                        checked={selectedBrand === ''}
                        onChange={(e) => {
                          setSelectedBrand(e.target.value);
                          setCurrentPage(1);
                        }}
                        className="w-4 h-4 text-blue-600"
                      />
                      <span className="text-sm text-gray-700">All Brands</span>
                    </label>
                    {brands.map((brand) => (
                      <label
                        key={brand}
                        className="flex items-center gap-3 cursor-pointer hover:text-blue-600 transition"
                      >
                        <input
                          type="radio"
                          name="brand"
                          value={brand}
                          checked={selectedBrand === brand}
                          onChange={(e) => {
                            setSelectedBrand(e.target.value);
                            setCurrentPage(1);
                          }}
                          className="w-4 h-4 text-blue-600"
                        />
                        <span className="text-sm text-gray-700">{brand}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Technology Filter */}
                <div>
                  <h3 className="font-bold text-gray-900 mb-3">Printer Type</h3>
                  <div className="space-y-2">
                    <label className="flex items-center gap-3 cursor-pointer hover:text-blue-600 transition">
                      <input
                        type="radio"
                        name="technology"
                        value=""
                        checked={selectedTechnology === ''}
                        onChange={(e) => {
                          setSelectedTechnology(e.target.value);
                          setCurrentPage(1);
                        }}
                        className="w-4 h-4 text-blue-600"
                      />
                      <span className="text-sm text-gray-700">All Types</span>
                    </label>
                    {technologies.map((tech) => (
                      <label
                        key={tech}
                        className="flex items-center gap-3 cursor-pointer hover:text-blue-600 transition"
                      >
                        <input
                          type="radio"
                          name="technology"
                          value={tech}
                          checked={selectedTechnology === tech}
                          onChange={(e) => {
                            setSelectedTechnology(e.target.value);
                            setCurrentPage(1);
                          }}
                          className="w-4 h-4 text-blue-600"
                        />
                        <span className="text-sm text-gray-700">{tech === 'Laser (B/W)' ? 'Laser Printers (B/W)' : tech + ' Printers'}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Usage Category Filter */}
                <div>
                  <h3 className="font-bold text-gray-900 mb-3">Use Case</h3>
                  <div className="space-y-2">
                    {usageCategories.map((category) => (
                      <label
                        key={category.value}
                        className="flex items-center gap-3 cursor-pointer hover:text-blue-600 transition"
                      >
                        <input
                          type="checkbox"
                          checked={selectedUsageCategory.includes(category.value)}
                          onChange={() => handleUsageCategoryChange(category.value)}
                          className="w-4 h-4 text-blue-600 rounded"
                        />
                        <span className="text-sm text-gray-700">{category.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Wireless Filter */}
                <div>
                  <h3 className="font-bold text-gray-900 mb-3">Wireless</h3>
                  <div className="space-y-2">
                    <label className="flex items-center gap-3 cursor-pointer hover:text-blue-600 transition">
                      <input
                        type="radio"
                        name="mobileWireless"
                        value=""
                        checked={selectedWireless === ''}
                        onChange={() => setSelectedWireless('')}
                        className="w-4 h-4 text-blue-600"
                      />
                      <span className="text-sm text-gray-700">All</span>
                    </label>
                    {wirelessOptions.map((opt) => (
                      <label key={opt} className="flex items-center gap-3 cursor-pointer hover:text-blue-600 transition">
                        <input
                          type="radio"
                          name="mobileWireless"
                          value={opt}
                          checked={selectedWireless === opt}
                          onChange={() => setSelectedWireless(opt)}
                          className="w-4 h-4 text-blue-600"
                        />
                        <span className="text-sm text-gray-700">{opt}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Main Function Filter */}
                <div>
                  <h3 className="font-bold text-gray-900 mb-3">Main Function</h3>
                  <div className="space-y-2">
                    {mainFunctions.map((func) => (
                      <label key={func} className="flex items-center gap-3 cursor-pointer hover:text-blue-600 transition">
                        <input
                          type="checkbox"
                          checked={selectedMainFunction.includes(func)}
                          onChange={() => handleMainFunctionChange(func)}
                          className="w-4 h-4 text-blue-600 rounded"
                        />
                        <span className="text-sm text-gray-700">{func}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Price Filter */}
                <div>
                  <h3 className="font-bold text-gray-900 mb-3">Price Range</h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm text-gray-700 font-semibold mb-3">
                        <span>${priceRange[0]}</span>
                        <span>${priceRange[1]}</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="1000"
                        value={priceRange[0]}
                        onChange={(e) => {
                          const value = Math.min(parseInt(e.target.value), priceRange[1]);
                          setPriceRange([value, priceRange[1]]);
                        }}
                        className="w-full h-2 bg-gradient-to-r from-blue-300 to-blue-300 rounded-lg appearance-none cursor-pointer"
                        style={{
                          background: `linear-gradient(to right, #2364eb 0%, #2364eb ${((priceRange[0] - 0) / 1000) * 100}%, #3b82f6 ${((priceRange[0] - 0) / 1000) * 100}%, #3b82f6 100%)`
                        }}
                      />
                      <input
                        type="range"
                        min="0"
                        max="1000"
                        value={priceRange[1]}
                        onChange={(e) => {
                          const value = Math.max(parseInt(e.target.value), priceRange[0]);
                          setPriceRange([priceRange[0], value]);
                        }}
                        className="w-full h-2 bg-gradient-to-r from-blue-300 to-blue-300 rounded-lg appearance-none cursor-pointer mt-2"
                        style={{
                          background: `linear-gradient(to right, #2364eb 0%, #2364eb ${((priceRange[0] - 0) / 1000) * 100}%, #3b82f6 ${((priceRange[0] - 0) / 1000) * 100}%, #3b82f6 ${((priceRange[1] - 0) / 1000) * 100}%, #d1d5db ${((priceRange[1] - 0) / 1000) * 100}%, #d1d5db 100%)`
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* Rating Filter */}
                <div>
                  <h3 className="font-bold text-gray-900 mb-3">Filter by Rating</h3>
                  <div className="space-y-3">
                    <label className="flex items-center gap-3 cursor-pointer hover:text-blue-600 transition">
                      <input
                        type="radio"
                        name="rating"
                        value="0"
                        checked={selectedRating === 0}
                        onChange={() => setSelectedRating(0)}
                        className="w-4 h-4 text-blue-600"
                      />
                      <span className="text-sm text-gray-700">All Ratings</span>
                    </label>
                    {ratings.map((star) => (
                      <label key={star} className="flex items-center gap-3 cursor-pointer hover:text-blue-600 transition">
                        <input
                          type="radio"
                          name="rating"
                          value={star}
                          checked={selectedRating === star}
                          onChange={() => setSelectedRating(star)}
                          className="w-4 h-4 text-blue-600"
                        />
                        <div className="flex items-center gap-1">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <span
                              key={i}
                              className={`text-sm ${
                                i < star ? 'text-yellow-400' : 'text-gray-300'
                              }`}
                            >
                              ★
                            </span>
                          ))}
                          <span className="text-xs text-gray-500 ml-1">& up</span>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Close Button */}
                <button
                  onClick={() => setIsFilterDrawerOpen(false)}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-600 text-white py-3 rounded-lg font-bold hover:shadow-lg transition mt-6"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShopMain;

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const ExploreCategoriesSection = () => {
  const navigate = useNavigate();

  const categories = [
    {
      name: 'Home Printers',
      description: 'Perfect for personal use',
      filter: 'Home',
      icon: '🏠'
    },
    {
      name: 'Office Printers',
      description: 'Built for productivity',
      filter: 'Office',
      icon: '💼'
    },
    {
      name: 'Inkjet Printers',
      description: 'Color and detail',
      filter: 'Inkjet',
      icon: '🖨️'
    },
    {
      name: 'Laser Printers',
      description: 'Speed and efficiency',
      filter: 'Laser',
      icon: '⚡'
    }
  ];

  const handleCategoryClick = (filter, filterType) => {
    // Navigate to shop with the appropriate filter parameter
    if (filterType === 'usage') {
      navigate(`/shop?usageCategory=${filter}`);
    } else if (filterType === 'technology') {
      navigate(`/shop?technology=${filter}`);
    }
  };

  return (
    <div className="w-full bg-white border-t border-b border-gray-200 py-10 sm:py-14 lg:py-16">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-12">
        {/* Section Header */}
        <div className="mb-8 sm:mb-10 lg:mb-12 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Explore Printer<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-600"> Categories</span>
          </h2>
          <p className="text-gray-600 text-sm sm:text-base lg:text-lg">
            Browse commonly requested printer-related categories to quickly find relevant information and options.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Home Printers */}
          <button
            onClick={() => handleCategoryClick('Home', 'usage')}
            className="group relative bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 p-4 sm:p-5 lg:p-6 text-left border border-blue-200 hover:border-blue-400"
          >
            <div className="absolute top-0 right-0 w-20 h-20 bg-blue-200 rounded-full opacity-50 -mr-10 -mt-10 group-hover:scale-150 transition-transform duration-300"></div>
            <div className="relative z-10">
              <div className="text-5xl mb-4">🏠</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Home Printers</h3>
              <p className="text-gray-700 text-sm mb-4">Perfect for personal use and small tasks</p>
              <div className="flex items-center text-blue-600 font-semibold text-sm group-hover:text-blue-600 transition">
                Explore <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </button>

          {/* Office Printers */}
          <button
            onClick={() => handleCategoryClick('Office', 'usage')}
            className="group relative bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 p-4 sm:p-5 lg:p-6 text-left border border-purple-200 hover:border-purple-400"
          >
            <div className="absolute top-0 right-0 w-20 h-20 bg-purple-200 rounded-full opacity-50 -mr-10 -mt-10 group-hover:scale-150 transition-transform duration-300"></div>
            <div className="relative z-10">
              <div className="text-5xl mb-4">💼</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Office Printers</h3>
              <p className="text-gray-700 text-sm mb-4">Built for productivity and efficiency</p>
              <div className="flex items-center text-blue-600 font-semibold text-sm group-hover:text-purple-600 transition">
                Explore <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </button>

          {/* Inkjet Printers */}
          <button
            onClick={() => handleCategoryClick('Inkjet', 'technology')}
            className="group relative bg-gradient-to-br from-rose-50 to-rose-100 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 p-4 sm:p-5 lg:p-6 text-left border border-rose-200 hover:border-rose-400"
          >
            <div className="absolute top-0 right-0 w-20 h-20 bg-rose-200 rounded-full opacity-50 -mr-10 -mt-10 group-hover:scale-150 transition-transform duration-300"></div>
            <div className="relative z-10">
              <div className="text-5xl mb-4">🖨️</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Inkjet Printers</h3>
              <p className="text-gray-700 text-sm mb-4">Color quality and detail in every print</p>
              <div className="flex items-center text-blue-600 font-semibold text-sm group-hover:text-rose-600 transition">
                Explore <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </button>

          {/* Laser Printers */}
          <button
            onClick={() => handleCategoryClick('Laser', 'technology')}
            className="group relative bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 p-4 sm:p-5 lg:p-6 text-left border border-amber-200 hover:border-amber-400"
          >
            <div className="absolute top-0 right-0 w-20 h-20 bg-amber-200 rounded-full opacity-50 -mr-10 -mt-10 group-hover:scale-150 transition-transform duration-300"></div>
            <div className="relative z-10">
              <div className="text-5xl mb-4">⚡</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Laser Printers</h3>
              <p className="text-gray-700 text-sm mb-4">Speed and efficiency for high volume</p>
              <div className="flex items-center text-blue-600 font-semibold text-sm group-hover:text-amber-600 transition">
                Explore <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExploreCategoriesSection;

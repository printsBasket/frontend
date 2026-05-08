import React, { useRef, useState } from "react";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const Reviews = () => {
  const [activeDot, setActiveDot] = useState(0);

  const reviews = [
    { name: "Williams Roney", location: "Denver, CO", title: "Straightforward Process", quote: "The ordering process was straightforward, and the product arrived within the expected delivery timeframe.", rating: 4 },
    { name: "Mary Serdachny", location: "Vancouver, BC", title: "Clear Information", quote: "Product information was clearly presented, which made it easier to choose the right printer.", rating: 5 },
    { name: "Judith Diamond", location: "Boston, MA", title: "Secure Packaging", quote: "The packaging was secure, and the item was delivered in good condition.", rating: 4.5 },
    { name: "Pamela Duff", location: "Calgary, AB", title: "Easy Navigation", quote: "The website layout is simple and easy to navigate, especially when comparing different printer options.", rating: 5 },
    { name: "Marty Veldman", location: "Phoenix, AZ", title: "Helpful Updates", quote: "Delivery updates were helpful, and tracking information was provided as expected.", rating: 5 },
    { name: "Patricia Grunow", location: "Toronto, ON", title: "Matched Description", quote: "The product matched the description, and setup instructions were easy to follow.", rating: 5 },
    { name: "William B Adams Jr", location: "Portland, OR", title: "Smooth Checkout", quote: "The checkout process was smooth, and there were no unexpected issues during ordering.", rating: 5 },
    { name: "Jennifer Thompson", location: "Montreal, QC", title: "Well Organized", quote: "Product categories are well organized, making it easier to find suitable options.", rating: 5 },
  ];

  const handleScrollTo = (index) => {
    // We target the ID of the first card in every pair (0, 2, 4, 6, 8)
    const element = document.getElementById(`review-card-${index * 2}`);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "start",
      });
      setActiveDot(index);
    }
  };

  return (
    <section className="bg-white py-10 sm:py-14 lg:py-16">
      <div className="max-w-7xl mx-auto px-3 sm:px-4">
        <div className="text-center mb-8 sm:mb-10 lg:mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-gray-800 mb-4">What Customers Say</h2>
          <p className="text-gray-500 text-sm sm:text-base">Real experiences shared by our community.</p>
        </div>

        {/* Scrollable Container */}
        <div className="flex overflow-x-auto gap-6 pb-10 no-scrollbar snap-x snap-mandatory">
          {reviews.map((review, index) => (
            <div
              id={`review-card-${index}`} // Critical for the scroll to work
              key={index}
              className="min-w-[85%] sm:min-w-[70%] md:min-w-[calc(50%-12px)] bg-white rounded-2xl p-5 sm:p-6 lg:p-8 border border-gray-100 shadow-sm snap-start flex flex-col min-h-[240px] sm:min-h-[260px] lg:min-h-[280px]"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => {
                  if (i < Math.floor(review.rating)) return <FaStar key={i} className="text-blue-400 w-4 h-4" />;
                  if (i < review.rating) return <FaStarHalfAlt key={i} className="text-blue-400 w-4 h-4" />;
                  return <FaRegStar key={i} className="text-gray-300 w-4 h-4" />;
                })}
              </div>
              <h4 className="text-gray-700 font-bold mb-2">{review.title}</h4>
              <p className="text-gray-500 text-sm italic flex-grow">"{review.quote}"</p>
              <div className="mt-6 border-t pt-4">
                <p className="font-bold text-gray-900 text-sm">{review.name}</p>
                <p className="text-gray-400 text-[10px] uppercase tracking-tighter">{review.location}</p>
              </div>
            </div>
          ))}
        </div>

        {/* 5 Dots - Each scrolls 2 reviews */}
        <div className="flex justify-center gap-3 mt-4">
          {[...Array(5)].map((_, i) => (
            <button
              key={i}
              onClick={() => handleScrollTo(i)}
              aria-label={`Go to review group ${i + 1}`}
              className={`h-2.5 rounded-full transition-all duration-500 ${
                activeDot === i ? 'bg-blue-500 w-8' : 'bg-gray-200 w-2.5'
              }`}
            />
          ))}
        </div>
      </div>

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </section>
  );
};

export default Reviews;

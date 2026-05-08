import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import whyUs from "/assets/whyus.jpg"; // replace with your image

const WhyChooseUs = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      question: "Do you sell only genuine printers?",
      answer: "Yes. All printers available on our website are 100% genuine and sourced directly from trusted manufacturers and authorized suppliers. We do not sell refurbished, used, or counterfeit products."
    },
    {
      question: "How can I choose the right printer for my needs?",
      answer: "Our website features detailed filters and comparison tools. You can also contact our support team for a personalized recommendation based on your printing volume and budget."
    },
    {
      question: "Are pricing and product details transparent?",
      answer: "Absolutely. The price you see is the price you pay. We provide detailed specifications and clear breakdowns of any shipping costs before you hit the checkout."
    },
    {
      question: "Is the checkout and payment process secure?",
      answer: "We use industry-standard SSL encryption and partner with trusted payment gateways to ensure your financial information is never stored or compromised."
    }
  ];

  return (
    <section className="py-10 sm:py-14 lg:py-16 px-3 sm:px-4 max-w-7xl mx-auto font-sans">
      {/* Header Section */}
      <div className="text-center mb-10 sm:mb-14 lg:mb-16">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-gray-800 mb-4">
          Why Choose Our Printer Store
        </h2>
        <p className="text-gray-500 max-w-2xl mx-auto text-sm sm:text-base lg:text-lg">
          We are committed to delivering quality, transparency, and customer satisfaction at every stage of the experience.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
        {/* Left Side: Product Image */}
        <div className="flex justify-center">
          <img 
            src={whyUs}
            alt="Why choose Prints Basket" 
            width="448"
            height="448"
            className="w-full max-w-md h-auto object-contain"
            loading="lazy"
          />
        </div>

        {/* Right Side: Accordion */}
        <div className="space-y-0 border-t border-gray-200">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-gray-200">
              <button
                onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
                className="w-full py-5 flex justify-between items-center text-left transition-colors hover:bg-gray-50 px-2"
              >
                <span className={`text-sm sm:text-base lg:text-lg font-medium ${openIndex === index ? 'text-gray-900' : 'text-gray-700'}`}>
                  {faq.question}
                </span>
                {openIndex === index ? (
                  <ChevronUp className="w-5 h-5 text-blue-500" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-800" />
                )}
              </button>
              
              <div 
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openIndex === index ? 'max-h-40 opacity-100 mb-5' : 'max-h-0 opacity-0'
                }`}
              >
                <p className="text-gray-500 leading-relaxed px-2">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;

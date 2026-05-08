import React, { useState } from "react";

const FAQContent = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

    const faqData = [
    {
      q: "What is Prints Basket?",
      a: "Prints Basket is an independent online retailer operated by 16904599 CANADA INC, offering printers and printing supplies for home, office, and business use across the United States and Canada."
    },
    {
      q: "Are you affiliated with brands like HP, Canon, or Epson?",
      a: "No. Prints Basket operates independently and is not affiliated with or endorsed by any manufacturer unless explicitly stated. All brand names and trademarks are used for identification purposes only."
    },
    {
      q: "Where do you ship?",
      a: "We currently ship across the United States and Canada. Shipping availability may vary based on location and carrier service."
    },
    {
      q: "Do you offer free shipping?",
      a: "Yes, free shipping may be available on qualifying orders. Shipping eligibility and conditions are shown at checkout."
    },
    {
      q: "How long does delivery take?",
      a: "Estimated delivery times: United States 3–7 business days, Canada 3–8 business days. Delivery times are estimates and may vary depending on location, carrier delays, or external factors."
    },
    {
      q: "How can I track my order?",
      a: "Once your order is shipped, you will receive a tracking number via email. You can use this to track your shipment through the carrier's website."
    },
    {
      q: "What is your return policy?",
      a: "We offer a 30-day return window for eligible items. Products must be unused and in original packaging unless defective. For full details, please refer to our Return & Refund Policy."
    },
    {
      q: "How long does it take to receive a refund?",
      a: "Refunds are processed within 3–5 business days after the returned item is received and inspected. Final timing may depend on your payment provider."
    },
    {
      q: "What if I receive a damaged or incorrect item?",
      a: "If your order arrives damaged or incorrect: Contact us within 48 hours of delivery, Provide photos of the product and packaging, and We will arrange a replacement or refund as appropriate."
    },
    {
      q: "Can I cancel my order?",
      a: "Orders can be canceled before shipment only. Once shipped, cancellations are not possible, but you may return the item according to our policy."
    },
    {
      q: "Do your products come with a warranty?",
      a: "Yes, most products include a manufacturer warranty, where applicable. Warranty terms are provided by the respective brand."
    },
    {
      q: "Do you provide technical support?",
      a: "We offer general product guidance and assistance, but we do not provide official manufacturer technical support. For detailed technical issues or warranty claims, customers may need to contact the manufacturer directly."
    },
    {
      q: "How is my personal information protected?",
      a: "We take privacy seriously and only collect necessary information to process orders and provide support. We do not sell or share personal data for advertising purposes. For more details, please review our Privacy Policy."
    },
    {
      q: "Do you use cookies or tracking technologies?",
      a: "We use essential cookies only to ensure website functionality, such as cart and checkout. We do not use advertising or tracking cookies."
    },
    {
      q: "How can I contact customer support?",
      a: "Prints Basket (16904599 CANADA INC) - Email: support@printsbasket.com, Phone: +1 (888) 322-5251, Live Chat: Available on www.printsbasket.com"
    }
  ];

  return (
    <section className="w-full bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 lg:py-16">

        {/* Header */}
        <div className="text-center mb-8 sm:mb-10 lg:mb-12">
          {/* <div className="mb-6">
            <img
              src={heroImage}
              alt="Prints Basket FAQ"
              className="w-full max-w-sm mx-auto h-32 sm:h-36 lg:h-40 object-cover rounded-lg shadow-md"
            />
          </div> */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            FAQs
          </h1>
          <p className="max-w-3xl mx-auto text-gray-600 text-base sm:text-lg">
            Find quick answers to common questions about our products, printers, setup, shipping, and more. If you need help, our team is here to assist you.
          </p>
        </div>

        {/* FAQ List */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
          <div className="divide-y divide-gray-100">
            {faqData.map((faq, faqIndex) => {
              const isOpen = openIndex === faqIndex;
              return (
                <div key={faqIndex} className="p-4">
                  <button
                    onClick={() => toggleFAQ(faqIndex)}
                    className="w-full text-left flex justify-between items-center hover:bg-gray-50 p-2 rounded transition-colors"
                  >
                    <h3 className="text-sm sm:text-base font-medium text-gray-900 pr-4">
                      {faq.q}
                    </h3>
                    <span className={`transform transition-transform text-gray-500 ${isOpen ? 'rotate-180' : ''}`}>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </span>
                  </button>
                  {isOpen && (
                    <div className="mt-3 p-3 bg-blue-50 rounded-lg border-l-4 border-blue-200">
                      <p className="text-gray-700 leading-relaxed">
                        {faq.a}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Contact Section */}
        <div className="mt-6 sm:mt-8 bg-gradient-to-r from-blue-50 to-blue-50 border border-blue-200 p-4 sm:p-6 rounded-lg text-center">
          <h3 className="text-lg sm:text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-600 mb-3">
            Still Need Help?
          </h3>
          <p className="text-gray-700 mb-4">
            Our support team is here to help with any questions or concerns.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 text-gray-700">
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span className="font-medium">support@printsbasket.com</span>
            </div>
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
              </svg>
              <span className="font-medium">www.printsbasket.com</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default FAQContent;


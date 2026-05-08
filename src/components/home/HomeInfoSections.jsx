import React from "react";
import { Truck, Headphones, Shield, MapPin, Mail, Phone, CheckCircle2 } from "lucide-react";

const HomeInfoSections = () => {
  return (
    <div className="w-full bg-white">
      {/* Independent Retailer Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="mb-6 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2 text-center sm:text-left">
              An Independent eCommerce Retailer
            </h2>
            <div className="w-16 sm:w-20 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full mx-auto sm:mx-0"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-md">
              <p className="text-gray-700 text-sm sm:text-base lg:text-lg leading-relaxed">
                <strong>16904599 CANADA INC, DBA Prints Basket</strong>, based in Kitchener, Ontario, Canada, operates as an independent online retailer focused exclusively on printers and related equipment for home, office, and professional use.
              </p>
            </div>

            <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-md">
              <p className="text-gray-700 text-sm sm:text-base lg:text-lg leading-relaxed">
                Serving customers across the United States and Canada, the platform supports both individual users and businesses with reliable printing solutions and a structured online shopping experience.
              </p>
            </div>

            <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-md md:col-span-2">
              <p className="text-gray-700 text-sm sm:text-base lg:text-lg leading-relaxed mb-3">
                We are not a marketplace or a multi-seller platform. Every product available on the website is sourced through verified distribution channels and managed directly under our operational responsibility.
              </p>
              <p className="text-gray-700 text-sm sm:text-base lg:text-lg leading-relaxed">
                This approach allows for better control over product accuracy, availability, and fulfillment, ensuring customers interact with a single, accountable retailer rather than multiple sellers with inconsistent policies.
              </p>
            </div>
          </div>

          <div className="mt-6 sm:mt-8 bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-md border-l-4 border-blue-600">
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">What We Provide</h3>
            <ul className="space-y-2 sm:space-y-3">
              <li className="flex items-start gap-2 sm:gap-3">
                <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <span className="text-sm sm:text-base text-gray-700">Free shipping across the United States and Canada</span>
              </li>
              <li className="flex items-start gap-2 sm:gap-3">
                <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <span className="text-sm sm:text-base text-gray-700">Manufacturer warranty on all products</span>
              </li>
              <li className="flex items-start gap-2 sm:gap-3">
                <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <span className="text-sm sm:text-base text-gray-700">Support for both business and home customers</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* What We Sell */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2 text-center sm:text-left">
              What We Sell
            </h2>
            <div className="w-16 sm:w-20 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full mx-auto sm:mx-0"></div>
            <p className="text-gray-600 text-sm sm:text-base lg:text-lg mt-4 leading-relaxed">
              We offer a focused selection of printers and essential printing supplies designed to meet the needs of both home users and business environments. Our product range is carefully organized to help customers find the right solution based on usage, performance, and reliability.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4">
            {[
              { title: "Home Printers", desc: "Compact and easy-to-use printers suitable for everyday tasks such as documents, schoolwork, and personal use." },
              { title: "Office Printers", desc: "Reliable and efficient printers built for productivity, ideal for business environments and regular document workflows." },
              { title: "Inkjet Printers", desc: "Designed for high-quality color printing, making them suitable for photos, graphics, and detailed output." },
              { title: "Laser Printers", desc: "Fast and cost-efficient printing solutions for high-volume tasks and professional document handling." },
              { title: "Ink & Toner", desc: "A range of compatible ink and toner supplies to support consistent print quality and long-term usage." }
            ].map((item, idx) => (
              <div key={idx} className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-3 sm:p-4 border border-blue-100 hover:shadow-md transition-shadow">
                <h3 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">{item.title}</h3>
                <p className="text-gray-700 text-xs sm:text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who We Serve */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2 text-center sm:text-left">
              Who We Serve
            </h2>
            <div className="w-16 sm:w-20 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full mx-auto sm:mx-0"></div>
            <p className="text-gray-600 text-sm sm:text-base lg:text-lg mt-4 leading-relaxed">
              Our platform is designed to support a wide range of customers with different printing needs, from everyday use to professional environments.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {[
              { title: "Home Users", desc: "Individuals and families looking for reliable printers for daily tasks such as documents, schoolwork, and personal printing." },
              { title: "Small Businesses", desc: "Business owners who need dependable printing solutions for invoices, reports, and regular office operations." },
              { title: "Office & Corporate Teams", desc: "Work environments that require efficient, high-performance printers for consistent and high-volume printing." },
              { title: "Professionals & Remote Workers", desc: "Individuals working from home or in professional roles who need reliable and easy-to-use printing solutions." }
            ].map((item, idx) => (
              <div key={idx} className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-md hover:shadow-lg transition-shadow">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2 text-center sm:text-left">
              Why Choose Us
            </h2>
            <div className="w-16 sm:w-20 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full mx-auto sm:mx-0"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-8">
            <div className="lg:col-span-2 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-lg sm:rounded-xl p-4 sm:p-6 border border-blue-200">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3">Clear, Reliable, and Focused</h3>
              <p className="text-gray-700 text-sm sm:text-base leading-relaxed mb-4">
                We provide a carefully selected range of printers and related products through a simple and structured shopping experience. Every detail — from product information to checkout — is designed to help customers make confident decisions without confusion.
              </p>
              <ul className="space-y-2 sm:space-y-3">
                <li className="flex items-start gap-2 sm:gap-3">
                  <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm sm:text-base text-gray-700">Curated Product Selection – Relevant printers for home and business use</span>
                </li>
                <li className="flex items-start gap-2 sm:gap-3">
                  <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm sm:text-base text-gray-700">Clear Product Information – Accurate details for informed decisions</span>
                </li>
                <li className="flex items-start gap-2 sm:gap-3">
                  <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm sm:text-base text-gray-700">Transparent Pricing – No hidden fees or misleading offers</span>
                </li>
                <li className="flex items-start gap-2 sm:gap-3">
                  <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm sm:text-base text-gray-700">Easy Shopping Experience – Smooth browsing and checkout process</span>
                </li>
                <li className="flex items-start gap-2 sm:gap-3">
                  <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm sm:text-base text-gray-700">Reliable Delivery – Serving customers across the United States and Canada</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Our Service Commitment */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2 text-center sm:text-left">
              Our Service Commitment
            </h2>
            <div className="w-16 sm:w-20 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full mx-auto sm:mx-0"></div>
            <p className="text-gray-600 text-sm sm:text-base lg:text-lg mt-4 leading-relaxed">
              We focus on providing a reliable and transparent experience at every step — from ordering to delivery and ongoing support.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {[
              { icon: Truck, title: "Free Shipping", desc: "Enjoy free shipping across the United States and Canada on orders over $299, with secure packaging and reliable delivery." },
              { icon: MapPin, title: "Order Tracking", desc: "Stay informed with real-time tracking updates. Once your order is shipped, tracking details are provided so you can monitor delivery progress." },
              { icon: Shield, title: "Warranty", desc: "All products are backed by a manufacturer warranty, ensuring quality, reliability, and peace of mind after purchase." },
              { icon: Headphones, title: "Support", desc: "Access dedicated support for both home and business customers. Assistance is available for product selection, order updates, and post-purchase inquiries." }
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-md hover:shadow-lg transition-shadow">
                  <div className="flex items-start gap-3 sm:gap-4">
                    <Icon className="w-8 h-8 sm:w-10 sm:h-10 text-blue-600 flex-shrink-0 mt-1" />
                    <div className="min-w-0">
                      <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">{item.title}</h3>
                      <p className="text-gray-600 text-xs sm:text-sm lg:text-base leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomeInfoSections;

import React from "react";
import { Link } from "react-router-dom";
import SEO from '../common/SEO';

const Disclaimer = () => {
  return (
    <section className="w-full bg-gradient-to-b from-blue-50 via-white to-blue-50 min-h-screen py-16">
      <SEO title="Disclaimer | Prints Basket" description="Read the Prints Basket disclaimer regarding product information accuracy, usage, trademarks, and warranties." canonical="/disclaimer" />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">

        {/* Breadcrumb Navigation */}
        <div className="flex justify-center items-center gap-2 text-sm text-gray-600">
          <Link to="/" className="hover:text-blue-600 transition">Home</Link>
          <span>/</span>
          <span className="text-gray-900 font-medium">Disclaimer</span>
        </div>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">
            Disclaimer
          </h1>
          <div className="mt-2 h-1 w-24 bg-gradient-to-r from-blue-500 to-blue-500 rounded-full mx-auto"></div>
          <p className="mt-6 text-gray-600 text-xs sm:text-sm md:text-base leading-relaxed max-w-3xl mx-auto">
            Last Updated: March 25, 2026
          </p>
        </div>

        <div className="space-y-10">

          {/* Introduction */}
          <div className="space-y-4 bg-white rounded-lg p-6 shadow-sm border-l-4 border-blue-500">
            <p className="text-gray-700 leading-relaxed text-sm sm:text-base md:text-base">
              Prints Basket is committed to providing accurate, clear, and helpful information to support informed purchasing decisions. This Disclaimer applies to all content, products, and services available on our website.
            </p>
          </div>

          {/* 1. Product Information & Accuracy */}
          <div className="space-y-4">
            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900">1. Product Information & Accuracy</h2>
            <p className="text-gray-600 leading-relaxed text-sm sm:text-base md:text-base">
              We make reasonable efforts to ensure that product details—including specifications, descriptions, pricing, availability, and images—are accurate and up to date. However:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 text-sm sm:text-base md:text-base">
              <li>Product specifications, features, and packaging may change without notice by manufacturers</li>
              <li>Product appearance (such as color) may vary depending on display settings and lighting conditions</li>
              <li>Print yields and performance metrics are based on manufacturer standards and may vary in actual use</li>
              <li>Occasional typographical errors or outdated information may occur</li>
              <li>All product information is provided on an "as-is" and "as-available" basis for general reference only.</li>
              <li>We do not guarantee that all product details are always complete, current, or error-free.</li>
            </ul>
          </div>

          {/* 2. Usage & Performance Disclaimer */}
          <div className="space-y-4">
            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900">2. Usage & Performance Disclaimer</h2>
            <p className="text-gray-600 leading-relaxed text-sm sm:text-base md:text-base">
              Product performance may vary based on factors outside our control, including:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 text-sm sm:text-base md:text-base">
              <li>Usage frequency and print volume</li>
              <li>Environmental conditions (temperature, humidity, dust)</li>
              <li>Paper type and print settings</li>
              <li>Maintenance and device condition</li>
              <li>Use of compatible or third-party consumables</li>
            </ul>
            <div className="bg-yellow-50 rounded-lg p-4 border-l-4 border-yellow-500 mt-3">
              <p className="text-gray-600 text-sm sm:text-base">
                <strong>Important:</strong> Any references to cost savings, efficiency, or performance are general estimates only and are not guaranteed. Prints Basket does not guarantee specific print yields, cost savings, or performance outcomes.
              </p>
            </div>
          </div>

          {/* 3. Independent Retailer & Trademark Disclaimer */}
          <div className="space-y-4">
            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900">3. Independent Retailer & Trademark Disclaimer</h2>
            <p className="text-gray-600 leading-relaxed text-sm sm:text-base md:text-base">
              All product names, logos, trademarks, and brand images (including but not limited to HP, Canon, Epson, Brother, and others) are the property of their respective owners and are used strictly for identification and compatibility purposes.
            </p>
            <div className="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-500 mt-3">
              <p className="text-gray-700 font-medium text-sm sm:text-base mb-2">Prints Basket:</p>
              <ul className="list-disc list-inside text-gray-600 space-y-1 text-sm sm:text-base">
                <li>Operates as an independent online retailer</li>
                <li>Is not affiliated with, endorsed by, or officially authorized by any manufacturer unless explicitly stated</li>
                <li>Does not claim any official partnership, certification, or dealership status</li>
              </ul>
            </div>
          </div>

          {/* 4. Manufacturer Warranty Disclaimer */}
          <div className="space-y-4">
            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900">4. Manufacturer Warranty Disclaimer</h2>
            <p className="text-gray-600 leading-relaxed text-sm sm:text-base md:text-base">
              Manufacturer warranties are provided solely by the respective brands and are subject to their individual terms and conditions.
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 text-sm sm:text-base md:text-base">
              <li>Warranty coverage may vary by product, region, and usage</li>
              <li>Use of third-party or non-OEM consumables may affect warranty eligibility depending on manufacturer policies</li>
              <li>Customers are advised to review manufacturer warranty documentation for full details.</li>
            </ul>
          </div>

          {/* 5. No Professional or Technical Advice */}
          <div className="space-y-4">
            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900">5. No Professional or Technical Advice</h2>
            <p className="text-gray-600 leading-relaxed text-sm sm:text-base md:text-base">
              All information on this website is provided for general informational purposes only and should not be considered professional, technical, or legal advice.
            </p>
            <p className="text-gray-600 leading-relaxed text-sm sm:text-base md:text-base">
              Customers are responsible for verifying:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 text-sm sm:text-base md:text-base">
              <li>Product compatibility</li>
              <li>Installation and usage requirements</li>
              <li>Warranty terms and limitations</li>
            </ul>
            <p className="text-gray-600 leading-relaxed text-sm sm:text-base md:text-base mt-2">
              For clarification, customers are encouraged to contact us prior to purchase.
            </p>
          </div>

          {/* 6. Limitation of Reliance */}
          <div className="space-y-4">
            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900">6. Limitation of Reliance</h2>
            <p className="text-gray-600 leading-relaxed text-sm sm:text-base md:text-base">
              Users agree that any reliance on the information provided on this website is at their own discretion.
            </p>
            <p className="text-gray-600 leading-relaxed text-sm sm:text-base md:text-base">
              Prints Basket shall not be held liable for decisions made based on website content or product descriptions.
            </p>
          </div>

          {/* 7. Contact Us */}
          <div className="space-y-4 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-6 text-white">
            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold">7. Contact Us</h2>
            <p className="leading-relaxed text-sm sm:text-base md:text-base">
              For product inquiries, clarification, or assistance before making a purchase, please contact us:
            </p>
            <div className="space-y-2 text-blue-50 text-sm sm:text-base">
              <p><strong>Prints Basket (16904599 CANADA INC)</strong></p>
              <p>📧 <strong>Email:</strong> <a href="mailto:support@printsbasket.com" className="underline hover:text-white">support@printsbasket.com</a></p>
              <p>📞 <strong>Phone:</strong> +1 (888) 322-5251</p>
              <p>📍 <strong>Registered Address:</strong><br/>95 Broadacre Dr<br/>Kitchener, ON N2R 0S5<br/>Canada</p>
            </div>
            <p className="text-blue-50 text-sm leading-relaxed mt-3">
              We are committed to providing clear and helpful assistance to all customers.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Disclaimer;

import React from "react";
import { Link } from "react-router-dom";
import SEO from './common/SEO';

const TermsAndConditions = () => {
  return (
    <section className="w-full bg-gradient-to-b from-blue-50 via-white to-blue-50 min-h-screen py-16">
      <SEO title="Terms & Conditions | Prints Basket" description="Read the Prints Basket terms and conditions governing your use of our website and services." canonical="/terms-and-conditions" />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">

        {/* Breadcrumb Navigation */}
        <div className="flex justify-center items-center gap-2 text-sm text-gray-600">
          <Link to="/" className="hover:text-blue-600 transition">Home</Link>
          <span>/</span>
          <span className="text-gray-900 font-medium">Terms & Conditions</span>
        </div>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">
            Terms & Conditions
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
              Please read these Terms & Conditions carefully before using our website or purchasing products.
            </p>
          </div>

          {/* 1. Agreement to Terms */}
          <div className="space-y-4">
            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900">1. Agreement to Terms</h2>
            <div className="space-y-3 border-l-4 border-blue-300 pl-4">
              <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                By accessing or using the Prints Basket website, you agree to be bound by these Terms & Conditions. If you do not agree with any part of these terms, you must discontinue use of the website immediately.
              </p>
              <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                Prints Basket, operated by 16904599 CANADA INC, functions as an independent online retailer offering printers and related products. We are not affiliated with or endorsed by any manufacturer unless explicitly stated.
              </p>
            </div>
          </div>

          {/* 2. Definitions and Interpretation */}
          <div className="space-y-4">
            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900">2. Definitions</h2>
            <p className="text-gray-600 leading-relaxed mb-3 text-sm sm:text-base">
              For the purposes of these Terms:
            </p>
            <div className="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-500">
              <ul className="list-disc list-inside text-gray-600 space-y-2 text-sm sm:text-base">
                <li><strong>"Company," "we," "us," or "our"</strong> refers to Prints Basket</li>
                <li><strong>"User," "Customer," "you," or "your"</strong> refers to any person using the website</li>
                <li><strong>"Products"</strong> refers to printers, ink, toner, and related accessories</li>
                <li><strong>"Services"</strong> refers to website functionality, order processing, and customer support</li>
                <li><strong>"Content"</strong> refers to all materials on the website, including text, images, and product details</li>
              </ul>
            </div>
          </div>

          {/* 3. Use of Website */}
          <div className="space-y-4">
            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900">3. Use of Website</h2>
            <p className="text-gray-600 leading-relaxed mb-3 text-sm sm:text-base">
              You agree to use the website only for lawful purposes and in accordance with these Terms. You agree that you will:
            </p>
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <ul className="list-disc list-inside text-gray-600 space-y-2 text-sm sm:text-base">
                <li>Provide accurate and complete information during checkout</li>
                <li>Maintain the confidentiality of your account details</li>
                <li>Use the website without disrupting its functionality or security</li>
                <li>Comply with all applicable laws and regulations</li>
              </ul>
            </div>

            <div className="mt-4 bg-red-50 rounded-lg p-4 border-l-4 border-red-400">
              <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-800 mb-3">Prohibited Activities</h3>
              <p className="text-gray-600 mb-3 text-sm sm:text-base">You may not:</p>
              <ul className="list-disc list-inside text-gray-600 space-y-2 text-sm sm:text-base">
                <li>Engage in fraudulent, deceptive, or misleading practices</li>
                <li>Attempt unauthorized access to systems or data</li>
                <li>Upload malware or harmful code</li>
                <li>Interfere with website performance or security</li>
                <li>Misuse product information or content</li>
              </ul>
            </div>
          </div>

          {/* 4. Product Information & Disclaimer */}
          <div className="space-y-4">
            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900">4. Product Information & Disclaimer</h2>
            <p className="text-gray-600 leading-relaxed mb-4 text-sm sm:text-base">
              We strive to ensure that all product information is accurate and up to date. However:
            </p>
            <div className="bg-amber-50 rounded-lg p-4 border-l-4 border-amber-500">
              <ul className="list-disc list-inside text-gray-600 space-y-2 text-sm sm:text-base">
                <li>Product descriptions, specifications, and images are provided for general informational purposes only</li>
                <li>Minor inaccuracies or typographical errors may occur</li>
                <li>Product availability and pricing may change without notice</li>
                <li>Manufacturers may update specifications or packaging</li>
              </ul>
            </div>
            <div className="mt-4 bg-blue-50 rounded-lg p-4 border-l-4 border-blue-500">
              <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-800 mb-3">Important Disclaimer</h3>
              <p className="text-gray-600 text-sm sm:text-base">
                All product names, logos, and trademarks are the property of their respective owners and are used for identification purposes only. Prints Basket operates independently and does not claim official authorization unless explicitly stated.
              </p>
            </div>
          </div>

          {/* 5. Orders & Payment */}
          <div className="space-y-4">
            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900">5. Orders & Payment</h2>
            <p className="text-gray-600 leading-relaxed mb-4 text-sm sm:text-base">
              By placing an order, you agree that:
            </p>
            <div className="bg-gradient-to-r from-blue-50 to-blue-50 rounded-lg p-4 border border-gray-200">
              <ul className="list-disc list-inside text-gray-600 space-y-2 text-sm sm:text-base">
                <li>All orders are subject to acceptance and availability</li>
                <li>We reserve the right to cancel or refuse any order (e.g., fraud suspicion, incorrect pricing, or stock issues)</li>
                <li>Payment must be completed before order processing</li>
                <li>You are responsible for providing accurate billing and shipping details</li>
              </ul>
            </div>
            <p className="text-gray-600 leading-relaxed mt-4 text-sm sm:text-base">
              <strong>Additional charges may include:</strong> Applicable taxes, Shipping and handling fees.
            </p>
            <p className="text-gray-600 leading-relaxed mt-3 text-sm sm:text-base">
              If an order is canceled after payment, a full refund will be issued.
            </p>
          </div>

          {/* 6. Shipping & Delivery */}
          <div className="space-y-4">
            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900">6. Shipping & Delivery</h2>
            <ul className="list-disc list-inside text-gray-600 space-y-2 text-sm sm:text-base mb-4">
              <li>Delivery timelines are estimates only and may vary</li>
              <li>Risk of loss transfers once the order is handed to the carrier</li>
              <li>Customers must ensure accurate delivery details</li>
              <li>Additional fees may apply for remote or special delivery locations</li>
              <li>International orders may be subject to customs duties or taxes</li>
            </ul>
            <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
              Please refer to our Shipping Policy for complete details.
            </p>
          </div>

          {/* 7. Returns & Refunds */}
          <div className="space-y-4">
            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900">7. Returns & Refunds</h2>
            <p className="text-gray-600 leading-relaxed mb-4 text-sm sm:text-base">
              Returns and refunds are subject to our Return & Refund Policy:
            </p>
            <div className="bg-indigo-50 rounded-lg p-4 border-l-4 border-indigo-500">
              <ul className="list-disc list-inside text-gray-600 space-y-2 text-sm sm:text-base">
                <li>Returns must be initiated within the specified return window</li>
                <li>Items must be unused and in original packaging unless defective</li>
                <li>Refunds are processed after inspection</li>
                <li>Certain items may not be eligible for return</li>
              </ul>
            </div>
          </div>

          {/* 8. Intellectual Property */}
          <div className="space-y-4">
            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900">8. Intellectual Property</h2>
            <p className="text-gray-600 leading-relaxed mb-4 text-sm sm:text-base">
              All website content is protected by applicable intellectual property laws. You may not:
            </p>
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <ul className="list-disc list-inside text-gray-600 space-y-2 text-sm sm:text-base">
                <li>Copy, reproduce, or distribute content without permission</li>
                <li>Use trademarks, logos, or brand names without authorization</li>
              </ul>
            </div>
            <p className="text-gray-600 leading-relaxed mt-4 text-sm sm:text-base">
              All third-party trademarks remain the property of their respective owners.
            </p>
          </div>

          {/* 9. Limitation of Liability */}
          <div className="space-y-4">
            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900">9. Limitation of Liability</h2>
            <div className="bg-yellow-50 rounded-lg p-4 border-l-4 border-yellow-500">
              <p className="text-gray-700 leading-relaxed text-sm sm:text-base mb-3">
                To the maximum extent permitted by law:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2 text-sm sm:text-base mb-3">
                <li>We are not liable for indirect, incidental, or consequential damages</li>
                <li>We are not responsible for losses due to misuse of products or third-party services</li>
                <li>We are not liable for delays caused by shipping carriers or external providers</li>
              </ul>
              <p className="text-gray-600 text-sm sm:text-base">
                Our total liability is limited to the amount paid for the purchased product.
              </p>
            </div>
          </div>

          {/* 10. Compliance & Fair Use */}
          <div className="space-y-4">
            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900">10. Compliance & Fair Use</h2>
            <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
              We are committed to transparent and fair business practices in accordance with applicable advertising and consumer protection standards. Users agree not to misuse the website for deceptive, abusive, or unlawful purposes.
            </p>
          </div>

          {/* 11. Governing Law */}
          <div className="space-y-4">
            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900">11. Governing Law</h2>
            <div className="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-500">
              <p className="text-gray-600 leading-relaxed mb-3 text-sm sm:text-base">
                These Terms are governed by:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2 text-sm sm:text-base">
                <li>Canadian law for customers located in Canada</li>
                <li>Applicable U.S. laws for customers located in the United States</li>
              </ul>
              <p className="text-gray-600 mt-3 text-sm sm:text-base">
                Any disputes shall be resolved in the appropriate jurisdiction based on the customer's location.
              </p>
            </div>
          </div>

          {/* 12. Changes to Terms */}
          <div className="space-y-4">
            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900">12. Changes to Terms</h2>
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                We may update these Terms periodically. Any changes will be posted on this page with an updated "Last Updated" date. Continued use of the website constitutes acceptance of revised Terms.
              </p>
            </div>
          </div>

          {/* 13. Contact Us */}
          <div className="space-y-4 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-6 text-white">
            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold">13. Contact Us</h2>
            <p className="leading-relaxed text-sm sm:text-base">
              For any questions, concerns, or requests related to these Terms & Conditions, you may contact us using the details below:
            </p>
            <div className="space-y-2 text-blue-50 text-sm sm:text-base">
              <p><strong>Prints Basket (16904599 CANADA INC)</strong></p>
              <p>📧 <strong>Email:</strong> <a href="mailto:support@printsbasket.com" className="underline hover:text-white">support@printsbasket.com</a></p>
              <p>📞 <strong>Phone:</strong> +1 (888) 322-5251</p>
              <p>📍 <strong>Registered Address:</strong>
                <br/>95 Broadacre Dr
                <br/>Kitchener, ON N2R 0S5
                <br/>Canada</p>
            </div>
            <p className="text-blue-100 mt-4 text-sm sm:text-base">
              We are committed to responding promptly and handling all inquiries in accordance with applicable laws and standard business practices.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default TermsAndConditions;

import React from "react";
import { Link } from "react-router-dom";
import SEO from '../common/SEO';

const ShippingPolicy = () => {
  return (
    <section className="w-full bg-gradient-to-b from-blue-50 via-white to-blue-50 min-h-screen py-16">
      <SEO title="Shipping Policy | Prints Basket" description="Learn about Prints Basket shipping methods, delivery estimates, costs, and tracking for orders across the US and Canada." canonical="/shipping-policy" />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">

        {/* Breadcrumb Navigation */}
        <div className="flex justify-center items-center gap-2 text-sm text-gray-600">
          <Link to="/" className="hover:text-blue-600 transition">Home</Link>
          <span>/</span>
          <span className="text-gray-900 font-medium">Shipping Policy</span>
        </div>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">
            Shipping Policy
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
              At Prints Basket, we are committed to providing clear, reliable, and transparent shipping services across the United States and Canada. This Shipping Policy outlines how orders are processed, shipped, and delivered.
            </p>
          </div>

          {/* 1. Order Processing Time */}
          <div className="space-y-4">
            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900">1. Order Processing Time</h2>
            <div className="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-500">
              <ul className="list-disc list-inside text-gray-600 space-y-2 text-sm sm:text-base">
                <li>Orders are typically processed within 1–2 business days after payment confirmation</li>
                <li>Orders placed on weekends or holidays are processed on the next business day</li>
                <li>Processing times may vary due to product availability or high order volume</li>
              </ul>
              <p className="text-gray-600 mt-3">
                <strong>You will receive:</strong>
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-1 text-sm sm:text-base">
                <li>An order confirmation email after purchase</li>
                <li>A shipping confirmation email with tracking details once dispatched</li>
              </ul>
            </div>
          </div>

          {/* 2. Shipping Regions */}
          <div className="space-y-4">
            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900">2. Shipping Regions</h2>
            <p className="text-gray-600 leading-relaxed mb-4 text-sm sm:text-base">
              We currently ship to:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 text-sm sm:text-base">
              <li>🇺🇸 <strong>United States</strong> – All states (excluding certain restricted areas)</li>
              <li>🇨🇦 <strong>Canada</strong> – All provinces and territories</li>
            </ul>
          </div>

          {/* 3. Shipping Methods & Delivery Estimates */}
          <div className="space-y-4">
            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900">3. Shipping Methods & Delivery Estimates</h2>
            <p className="text-gray-600 leading-relaxed mb-4 text-sm sm:text-base">
              We partner with reliable and recognized logistics providers to ensure safe, secure, and timely delivery of all orders. Shipping methods are selected based on delivery location, order size, and service availability.
            </p>
            <div className="overflow-x-auto bg-white rounded-lg border border-gray-200">
              <table className="w-full">
                <thead className="bg-blue-100 border-b border-gray-200">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold text-gray-800">Location</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-800">Standard Shipping</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-800">Expedited Shipping</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-200">
                    <td className="px-4 py-3 text-gray-600 font-medium">United States</td>
                    <td className="px-4 py-3 text-gray-600">3–7 business days</td>
                    <td className="px-4 py-3 text-gray-600">2–4 business days</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-gray-600 font-medium">Canada</td>
                    <td className="px-4 py-3 text-gray-600">3–8 business days</td>
                    <td className="px-4 py-3 text-gray-600">2–5 business days</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="bg-yellow-50 rounded-lg p-4 border-l-4 border-yellow-500 mt-4">
              <p className="text-gray-700 font-medium mb-2 text-sm sm:text-base">Important Notice:</p>
              <ul className="list-disc list-inside text-gray-600 space-y-1 text-sm sm:text-base">
                <li>Delivery timelines are estimated and not guaranteed</li>
                <li>Additional transit time may be required for remote or rural areas</li>
                <li>Delivery delays may occur due to weather conditions, transportation disruptions, or other external factors beyond our control</li>
                <li>Shipping services are subject to availability based on destination and operational constraints</li>
              </ul>
            </div>
          </div>

          {/* 4. Shipping Costs */}
          <div className="space-y-4">
            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900">4. Shipping Costs</h2>
            <p className="text-gray-600 leading-relaxed mb-4 text-sm sm:text-base">
              Shipping charges are calculated at checkout based on:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 text-sm sm:text-base mb-4">
              <li>Delivery location</li>
              <li>Package weight and dimensions</li>
              <li>Selected shipping method</li>
            </ul>
            <p className="text-gray-600 font-medium text-sm sm:text-base mb-2">
              Free Shipping Offer:
            </p>
            <p className="text-gray-600 text-sm sm:text-base mb-4">
              We offer free standard shipping on orders over $249 (where applicable).
            </p>
            <p className="text-gray-600 text-sm sm:text-base">
              Promotional shipping offers, including free shipping, may be available during specific campaigns and are subject to change without prior notice.
            </p>
          </div>

          {/* 5. Order Tracking */}
          <div className="space-y-4">
            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900">5. Order Tracking</h2>
            <ul className="list-disc list-inside text-gray-600 space-y-2 text-sm sm:text-base">
              <li>Tracking details are provided via email once your order is shipped</li>
              <li>Tracking updates may take up to 24 hours to appear in the carrier system</li>
              <li>Customers can track shipments directly through the carrier's website</li>
            </ul>
          </div>

          {/* 6. Delivery Conditions & Customer Responsibility */}
          <div className="space-y-4">
            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900">6. Delivery Conditions & Customer Responsibility</h2>
            <p className="text-gray-600 leading-relaxed mb-4 text-sm sm:text-base">
              To ensure successful delivery:
            </p>
            <p className="text-gray-600 mb-4 text-sm sm:text-base">
              Customers must provide accurate and complete shipping information
            </p>
            <p className="text-gray-600 leading-relaxed mb-4 font-medium text-sm sm:text-base">
              Prints Basket is not responsible for:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 text-sm sm:text-base mb-4">
              <li>Delivery failures due to incorrect or incomplete addresses</li>
              <li>Delays caused by carriers or external factors</li>
              <li>Packages lost due to incorrect details provided by the customer</li>
            </ul>
            <p className="text-gray-600 text-sm sm:text-base">
              If an order is returned due to address issues, additional shipping charges may apply for re-delivery.
            </p>
          </div>

          {/* 7. Restricted Shipping Locations */}
          <div className="space-y-4">
            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900">7. Restricted Shipping Locations</h2>
            <p className="text-gray-600 leading-relaxed mb-4 text-sm sm:text-base">
              We currently do not ship to:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 text-sm sm:text-base mb-4">
              <li>P.O. Boxes (depending on carrier limitations)</li>
              <li>APO/FPO/DPO military addresses</li>
              <li>Areas with limited or restricted carrier access</li>
            </ul>
            <p className="text-gray-600 text-sm sm:text-base">
              If an order cannot be fulfilled due to location restrictions, customers will be notified and refunded if applicable.
            </p>
          </div>

          {/* 8. Damaged, Missing, or Incorrect Items */}
          <div className="space-y-4">
            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900">8. Damaged, Missing, or Incorrect Items</h2>
            <p className="text-gray-600 leading-relaxed mb-4 text-sm sm:text-base">
              If your order arrives damaged, incomplete, or incorrect:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 text-sm sm:text-base mb-4">
              <li>Contact us within 48 hours of delivery</li>
              <li>Provide: Order number, Clear photos of the item and packaging, Description of the issue</li>
            </ul>
            <p className="text-gray-600 text-sm sm:text-base">
              We will review and provide a replacement, exchange, or resolution as appropriate.
            </p>
          </div>

          {/* 9. Customs, Duties & Taxes */}
          <div className="space-y-4">
            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900">9. Customs, Duties & Taxes</h2>
            <p className="text-gray-600 leading-relaxed mb-4 text-sm sm:text-base">
              For Canadian and cross-border shipments:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 text-sm sm:text-base">
              <li>Orders may be subject to customs duties, taxes, or import fees</li>
              <li>These charges are the customer's responsibility</li>
              <li>Customs processing may cause additional delays</li>
              <li>We comply with all applicable trade and import regulations.</li>
            </ul>
          </div>

          {/* 10. Lost or Stolen Packages */}
          <div className="space-y-4">
            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900">10. Lost or Stolen Packages</h2>
            <p className="text-gray-600 leading-relaxed mb-4 text-sm sm:text-base">
              If tracking shows "Delivered" but you have not received your package:
            </p>
            <ol className="list-decimal list-inside text-gray-600 space-y-2 text-sm sm:text-base mb-4">
              <li>Check with neighbors or household members</li>
              <li>Allow up to 24 hours for delivery updates</li>
              <li>Contact the shipping carrier</li>
              <li>If unresolved, contact our support team</li>
            </ol>
            <p className="text-gray-600 text-sm sm:text-base">
              <strong>Please note:</strong> Resolutions (replacement or refund) depend on the carrier's investigation and confirmation.
            </p>
          </div>

          {/* 11. Order Cancellations */}
          <div className="space-y-4">
            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900">11. Order Cancellations</h2>
            <ul className="list-disc list-inside text-gray-600 space-y-2 text-sm sm:text-base">
              <li>Orders may be canceled only before shipment</li>
              <li>Once dispatched, cancellations are no longer possible</li>
              <li>Customers may initiate a return after delivery per our Return Policy</li>
            </ul>
          </div>

          {/* 12. Compliance & Transparency */}
          <div className="space-y-4">
            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900">12. Compliance & Transparency</h2>
            <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
              We are committed to fair and transparent business practices. Shipping timelines, costs, and conditions are clearly disclosed to ensure compliance with consumer protection and advertising standards.
            </p>
          </div>

          {/* 13. Contact Us */}
          <div className="space-y-4 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-6 text-white">
            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold">13. Contact Us</h2>
            <p className="leading-relaxed text-sm sm:text-base">
              For any shipping-related inquiries, order updates, or assistance, please contact us:
            </p>
            <div className="space-y-3 text-blue-50 text-sm sm:text-base">
              <p><strong>Prints Basket (16904599 CANADA INC)</strong></p>
              <p>📧 <strong>Email:</strong> <a href="mailto:support@printsbasket.com" className="underline hover:text-white">support@printsbasket.com</a></p>
              <p>📞 <strong>Phone:</strong> +1 (888) 322-5251</p>
              <p>📍 <strong>Registered Address:</strong><br/>95 Broadacre Dr<br/>Kitchener, ON N2R 0S5<br/>Canada</p>
              <p>🌐 <strong>Website:</strong> <a href="https://www.printsbasket.com" target="_blank" rel="noopener noreferrer" className="underline hover:text-white">www.printsbasket.com</a></p>
            </div>
            <p className="text-blue-100 mt-4 text-sm">
              We are committed to responding promptly and assisting you with all shipping-related concerns.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ShippingPolicy;

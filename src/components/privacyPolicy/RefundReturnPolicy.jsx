import React from "react";
import { Link } from "react-router-dom";
import SEO from '../common/SEO';

const RefundReturnPolicy = () => {
  return (
    <section className="w-full bg-gradient-to-b from-blue-50 via-white to-blue-50 min-h-screen py-16">
      <SEO title="Refund Policy | Prints Basket" description="Read the Prints Basket refund and return policy. Learn about our 30-day return window, refund processing, and return conditions." canonical="/refund-return-policy" />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">

        {/* Breadcrumb Navigation */}
        <div className="flex justify-center items-center gap-2 text-sm text-gray-600">
          <Link to="/" className="hover:text-blue-600 transition">Home</Link>
          <span>/</span>
          <span className="text-gray-900 font-medium">Refund Policy</span>
        </div>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">
            Refund Policy
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
              At Prints Basket, we are committed to providing a fair, transparent, and customer-friendly refund process. This policy outlines the conditions under which refunds are issued and how returns are handled.
            </p>
          </div>

          {/* 1. 30-Day Return Window */}
          <div className="space-y-4">
            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900">1. 30-Day Return Window</h2>
            <ul className="list-disc list-inside text-gray-600 space-y-2 text-sm sm:text-base md:text-base">
              <li>Eligible items may be returned within 30 days of delivery.</li>
              <li>Returns outside this timeframe may not be accepted unless required under applicable consumer protection laws.</li>
            </ul>
          </div>

          {/* 2. Condition of Returned Items */}
          <div className="space-y-4">
            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900">2. Condition of Returned Items</h2>
            <p className="text-gray-600 leading-relaxed text-sm sm:text-base md:text-base">
              To qualify for a refund, items must be:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 text-sm sm:text-base md:text-base">
              <li>Unused and in original condition</li>
              <li>In original packaging</li>
              <li>Complete with all accessories, manuals, and components</li>
            </ul>
            <div className="bg-green-50 rounded-lg p-4 border-l-4 border-green-500 mt-3">
              <p className="text-gray-600 text-sm sm:text-base">
                <strong>Exception:</strong> Defective or damaged items may be returned even if opened, subject to inspection.
              </p>
            </div>
          </div>

          {/* 3. Refund Processing */}
          <div className="space-y-4">
            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900">3. Refund Processing</h2>
            <ul className="list-disc list-inside text-gray-600 space-y-2 text-sm sm:text-base md:text-base">
              <li>Refunds are issued after the returned item is received and inspected</li>
              <li>Approved refunds are processed within 3–5 business days</li>
              <li>Refunds are issued to the original payment method</li>
            </ul>
            <div className="bg-yellow-50 rounded-lg p-4 border-l-4 border-yellow-500 mt-3">
              <p className="text-gray-600 text-sm sm:text-base">
                <strong>⚠️ Warning:</strong> Processing times may vary depending on your bank or payment provider.
              </p>
            </div>
          </div>

          {/* 4. Return Eligibility */}
          <div className="space-y-4">
            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900">4. Return Eligibility</h2>
            
            <div className="space-y-3">
              <div className="bg-green-50 rounded-lg p-4 border-l-4 border-green-500">
                <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-2">✔️ Returnable Items</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-1 text-sm sm:text-base">
                  <li>Unused and unopened printers</li>
                  <li>Sealed ink and toner cartridges</li>
                  <li>Accessories in original condition</li>
                  <li>Defective or malfunctioning products</li>
                  <li>Incorrect items received</li>
                </ul>
              </div>

              <div className="bg-red-50 rounded-lg p-4 border-l-4 border-red-400">
                <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-2">❌ Non-Returnable Items</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-1 text-sm sm:text-base">
                  <li>Opened or used ink/toner cartridges (unless defective)</li>
                  <li>Items damaged due to misuse or improper handling</li>
                  <li>Products returned without original packaging or missing components</li>
                  <li>Customized, personalized, or special-order items</li>
                  <li>Items returned after the 30-day return period</li>
                </ul>
              </div>
            </div>
          </div>

          {/* 5. How to Request a Return */}
          <div className="space-y-4">
            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900">5. How to Request a Return</h2>
            
            <div className="space-y-3">
              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-2">Step 1: Submit a Request</h3>
                <p className="text-gray-600 text-sm sm:text-base mb-2">Email us at <a href="mailto:support@printsbasket.com" className="text-blue-600 underline">support@printsbasket.com</a> with:</p>
                <ul className="list-disc list-inside text-gray-600 space-y-1 text-sm sm:text-base">
                  <li>Order number</li>
                  <li>Product details and condition</li>
                  <li>Reason for return</li>
                  <li>Preferred resolution (refund or replacement)</li>
                </ul>
              </div>

              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-2">Step 2: Receive Authorization</h3>
                <p className="text-gray-600 text-sm sm:text-base mb-2">If approved, you will receive:</p>
                <ul className="list-disc list-inside text-gray-600 space-y-1 text-sm sm:text-base">
                  <li>A Return Merchandise Authorization (RMA) number</li>
                  <li>Return instructions</li>
                  <li>A prepaid return label (if applicable)</li>
                </ul>
                <p className="text-gray-600 text-sm sm:text-base italic mt-2">⚠️ Returns without prior authorization may not be accepted.</p>
              </div>

              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-2">Step 3: Ship the Item</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-1 text-sm sm:text-base">
                  <li>Pack the item securely to prevent damage</li>
                  <li>Include all original contents</li>
                  <li>Clearly label the RMA number</li>
                </ul>
              </div>

              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-2">Step 4: Inspection & Refund</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-1 text-sm sm:text-base">
                  <li>Items are inspected within 2 business days of receipt</li>
                  <li>Approved refunds are processed within 3–5 business days</li>
                  <li>If applicable, original shipping charges may be refunded for defective or incorrect items.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* 6. Refund Timeframes */}
          <div className="space-y-4">
            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900">6. Refund Timeframes</h2>
            <div className="overflow-x-auto bg-white rounded-lg border border-gray-200">
              <table className="w-full text-sm">
                <thead className="bg-blue-100 border-b border-gray-200">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold text-gray-800">Payment Method</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-800">Estimated Time</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-800">Notes</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-200">
                    <td className="px-4 py-3 text-gray-600 text-sm">Credit Card</td>
                    <td className="px-4 py-3 text-gray-600 text-sm">3–5 business days</td>
                    <td className="px-4 py-3 text-gray-600 text-xs">May take additional billing cycle</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="px-4 py-3 text-gray-600 text-sm">Debit Card</td>
                    <td className="px-4 py-3 text-gray-600 text-sm">3–5 business days</td>
                    <td className="px-4 py-3 text-gray-600 text-xs">Reflected in bank account</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-gray-600 text-sm">PayPal</td>
                    <td className="px-4 py-3 text-gray-600 text-sm">1–3 business days</td>
                    <td className="px-4 py-3 text-gray-600 text-xs">Typically faster</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* 7. Return Shipping Responsibility */}
          <div className="space-y-4">
            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900">7. Return Shipping Responsibility</h2>
            
            <div className="space-y-3">
              <div className="bg-green-50 rounded-lg p-4 border-l-4 border-green-500">
                <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-2">✔️ Covered by Prints Basket</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-1 text-sm sm:text-base">
                  <li>Defective or damaged items</li>
                  <li>Incorrect items shipped</li>
                  <li>Approved returns where required by law</li>
                </ul>
              </div>

              <div className="bg-amber-50 rounded-lg p-4 border-l-4 border-amber-500">
                <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-2">⚠ Customer Responsibility</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-1 text-sm sm:text-base">
                  <li>Change-of-mind returns</li>
                  <li>Non-defective items</li>
                </ul>
                <p className="text-gray-600 text-sm mt-2">Shipping costs may vary depending on location and carrier. Exact costs are communicated during return authorization.</p>
              </div>
            </div>
          </div>

          {/* 8. Exchanges */}
          <div className="space-y-4">
            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900">8. Exchanges</h2>
            <p className="text-gray-600 leading-relaxed text-sm sm:text-base md:text-base">
              We primarily process refunds instead of direct exchanges to ensure faster resolution.
            </p>
            <p className="text-gray-600 leading-relaxed text-sm sm:text-base md:text-base">
              To exchange a product:
            </p>
            <ol className="list-decimal list-inside text-gray-600 space-y-2 text-sm sm:text-base md:text-base">
              <li>Return the original item following this policy</li>
              <li>Place a new order for the desired item</li>
            </ol>
          </div>

          {/* 9. Damaged or Defective Items */}
          <div className="space-y-4">
            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900">9. Damaged or Defective Items</h2>
            <p className="text-gray-600 leading-relaxed text-sm sm:text-base md:text-base">
              If your order arrives damaged or defective:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 text-sm sm:text-base md:text-base">
              <li>Contact us within 48 hours of delivery</li>
              <li>Provide photos of the item and packaging</li>
              <li>We will provide a prompt resolution, including replacement or refund.</li>
              <li>No restocking fees apply for defective or incorrect items.</li>
            </ul>
          </div>

          {/* 10. Manufacturer Warranty */}
          <div className="space-y-4">
            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900">10. Manufacturer Warranty</h2>
            <p className="text-gray-600 leading-relaxed text-sm sm:text-base md:text-base">
              Some products may be covered under the manufacturer's warranty.
            </p>
            <p className="text-gray-600 leading-relaxed text-sm sm:text-base md:text-base">
              We can assist you in initiating a warranty claim where applicable.
            </p>
          </div>

          {/* 11. Order Cancellations */}
          <div className="space-y-4">
            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900">11. Order Cancellations</h2>
            <ul className="list-disc list-inside text-gray-600 space-y-2 text-sm sm:text-base md:text-base">
              <li>Orders may be canceled before shipment only</li>
              <li>Once shipped, cancellations are not possible</li>
              <li>Customers may return the item after delivery per this policy</li>
            </ul>
          </div>

          {/* 12. International Returns */}
          <div className="space-y-4">
            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900">12. International Returns</h2>
            <ul className="list-disc list-inside text-gray-600 space-y-2 text-sm sm:text-base md:text-base">
              <li>30-day return window applies</li>
              <li>Customers are responsible for return shipping costs</li>
              <li>Customs duties and import fees are non-refundable</li>
              <li>Refunds are issued in the original currency</li>
              <li>Additional processing time may apply</li>
            </ul>
          </div>

          {/* 13. Compliance & Transparency */}
          <div className="space-y-4">
            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900">13. Compliance & Transparency</h2>
            <p className="text-gray-600 leading-relaxed text-sm sm:text-base md:text-base">
              We are committed to fair and transparent refund practices in accordance with applicable consumer protection laws and advertising standards.
            </p>
            <p className="text-gray-600 leading-relaxed text-sm sm:text-base md:text-base">
              This policy clearly outlines eligibility, timelines, and responsibilities to avoid confusion or misleading expectations.
            </p>
          </div>

          {/* 14. Contact Us */}
          <div className="space-y-4 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-6 text-white">
            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold">14. Contact Us</h2>
            <p className="leading-relaxed text-sm sm:text-base md:text-base">
              For any refund-related inquiries, return requests, or assistance, please contact us:
            </p>
            <div className="space-y-2 text-blue-50 text-sm sm:text-base">
              <p><strong>Prints Basket (16904599 CANADA INC)</strong></p>
              <p>📧 <strong>Email:</strong> <a href="mailto:support@printsbasket.com" className="underline hover:text-white">support@printsbasket.com</a></p>
              <p>📞 <strong>Phone:</strong> +1 (888) 322-5251</p>
              <p>📍 <strong>Registered Address:</strong><br/>95 Broadacre Dr<br/>Kitchener, ON N2R 0S5<br/>Canada</p>
              <p>💬 <strong>Live Chat:</strong> Available on <a href="https://www.printsbasket.com" target="_blank" rel="noopener noreferrer" className="underline hover:text-white">www.printsbasket.com</a></p>
            </div>
            <p className="text-blue-50 text-sm leading-relaxed mt-3">
              We are committed to responding promptly and assisting you with all refund and return-related concerns.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default RefundReturnPolicy;

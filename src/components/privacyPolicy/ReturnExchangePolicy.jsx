import React from "react";
import ReturnExchangeForm from "./ReturnExchangeForm";
import SEO from '../common/SEO';

const ReturnExchangePolicy = () => {
  return (
    <section className="w-full bg-gradient-to-br from-slate-50 via-white to-blue-50/20 min-h-screen py-16">
      <SEO title="Return & Exchange Policy | Prints Basket" description="Learn about the Prints Basket return and exchange policy. Start a return or exchange request easily." canonical="/return-exchange-policy" />
      {/* Background Patterns */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-200/10 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-br from-blue-200/10 to-transparent rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black bg-gradient-to-r from-blue-600 to-blue-600 bg-clip-text text-transparent mb-3">
            Return & Exchange Policy
          </h1>
          <div className="h-1 w-24 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600 text-xs sm:text-sm md:text-base">Last Updated: March 25, 2026</p>
        </div>

        <div className="space-y-10">

          {/* Key Benefits */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-white to-blue-50/30 rounded-3xl p-8 shadow-lg shadow-blue-100/30 border-2 border-slate-100 space-y-4 backdrop-blur-sm text-center">
              <div className="text-3xl sm:text-4xl">📅</div>
              <h3 className="text-base sm:text-lg md:text-xl font-black text-slate-900">30-Day Return Window</h3>
              <p className="text-slate-700 text-xs sm:text-sm leading-relaxed">Eligible items may be returned within 30 days of the delivery date, provided they meet the return conditions outlined below.</p>
            </div>

            <div className="bg-gradient-to-br from-white to-blue-50/30 rounded-3xl p-8 shadow-lg shadow-blue-100/30 border-2 border-slate-100 space-y-4 backdrop-blur-sm text-center">
              <div className="text-3xl sm:text-4xl">📦</div>
              <h3 className="text-base sm:text-lg md:text-xl font-black text-slate-900">Prepaid Return Shipping</h3>
              <p className="text-slate-700 text-xs sm:text-sm leading-relaxed">For approved returns, Prints Basket provides prepaid return shipping labels. Return authorization is required before sending any item back.</p>
            </div>

            <div className="bg-gradient-to-br from-white to-blue-50/30 rounded-3xl p-8 shadow-lg shadow-blue-100/30 border-2 border-slate-100 space-y-4 backdrop-blur-sm text-center">
              <div className="text-3xl sm:text-4xl">⚡</div>
              <h3 className="text-base sm:text-lg md:text-xl font-black text-slate-900">Fast Refund Processing</h3>
              <p className="text-slate-700 text-xs sm:text-sm leading-relaxed">Once your returned item is received and inspected, refunds are processed within 3–5 business days to your original payment method.</p>
            </div>
          </div>

          {/* Form Section */}
          <div>
            <h2 className="text-lg sm:text-2xl md:text-3xl font-black bg-gradient-to-r from-blue-600 to-blue-600 bg-clip-text text-transparent uppercase tracking-tighter mb-8">Start a Return or Exchange</h2>
            <ReturnExchangeForm />
          </div>

          {/* Return Eligibility */}
          <div className="bg-gradient-to-br from-white to-blue-50/30 rounded-3xl p-8 md:p-10 shadow-lg shadow-blue-100/30 border-2 border-slate-100 space-y-8 backdrop-blur-sm">
            <h2 className="text-lg sm:text-xl md:text-2xl font-black bg-gradient-to-r from-blue-600 to-blue-600 bg-clip-text text-transparent uppercase tracking-tighter">Return Eligibility</h2>

            {/* Eligible Items */}
            <div>
              <h3 className="text-base sm:text-lg md:text-xl font-black text-slate-900 mb-4">✔ Eligible Items</h3>
              <p className="text-slate-700 leading-relaxed mb-4 text-sm sm:text-base">The following items are eligible for return if they are unused, unopened, and in original packaging:</p>
              <ul className="space-y-2 ml-4">
                <li className="text-slate-700 text-sm sm:text-base flex items-start gap-2"><span className="text-blue-600 font-bold">•</span> Printers</li>
                <li className="text-slate-700 text-sm sm:text-base flex items-start gap-2"><span className="text-blue-600 font-bold">•</span> Ink cartridges</li>
                <li className="text-slate-700 text-sm sm:text-base flex items-start gap-2"><span className="text-blue-600 font-bold">•</span> Toner cartridges</li>
                <li className="text-slate-700 text-sm sm:text-base flex items-start gap-2"><span className="text-blue-600 font-bold">•</span> Paper products</li>
                <li className="text-slate-700 text-sm sm:text-base flex items-start gap-2"><span className="text-blue-600 font-bold">•</span> Printing accessories</li>
              </ul>
            </div>

            {/* Special Conditions */}
            <div className="border-t-2 border-slate-100 pt-8">
              <h3 className="text-base sm:text-lg md:text-xl font-black text-slate-900 mb-4">⚙️ Special Conditions</h3>
              <div className="space-y-4">
                <div>
                  <p className="font-black text-slate-900 text-sm sm:text-base mb-2">Defective or Damaged Items:</p>
                  <ul className="space-y-1 ml-4">
                    <li className="text-slate-700 text-xs sm:text-sm flex items-start gap-2"><span className="text-blue-600">•</span> Items received defective or damaged may be returned within 30 days</li>
                    <li className="text-slate-700 text-xs sm:text-sm flex items-start gap-2"><span className="text-blue-600">•</span> Opened ink or toner cartridges are only eligible if defective</li>
                  </ul>
                </div>
                <div>
                  <p className="font-black text-slate-900 text-sm sm:text-base mb-2">Incorrect Items:</p>
                  <p className="text-slate-700 text-xs sm:text-sm ml-4">If you receive the wrong product, please contact us for a replacement or refund</p>
                </div>
              </div>
            </div>

            {/* Non-Returnable Items */}
            <div className="border-t-2 border-slate-100 pt-8">
              <h3 className="text-base sm:text-lg md:text-xl font-black text-red-600 mb-4">❌ Non-Returnable Items</h3>
              <p className="text-slate-700 leading-relaxed mb-4 text-sm sm:text-base">The following items are not eligible for return:</p>
              <ul className="space-y-1 ml-4">
                <li className="text-slate-700 text-xs sm:text-sm flex items-start gap-2"><span className="text-red-600">•</span> Used or partially used ink/toner cartridges (unless defective)</li>
                <li className="text-slate-700 text-xs sm:text-sm flex items-start gap-2"><span className="text-red-600">•</span> Opened or used products (unless defective)</li>
                <li className="text-slate-700 text-xs sm:text-sm flex items-start gap-2"><span className="text-red-600">•</span> Digital or downloadable products</li>
                <li className="text-slate-700 text-xs sm:text-sm flex items-start gap-2"><span className="text-red-600">•</span> Custom, special-order, or personalized items</li>
                <li className="text-slate-700 text-xs sm:text-sm flex items-start gap-2"><span className="text-red-600">•</span> Items returned without original packaging or missing components</li>
              </ul>
            </div>

            {/* Final Sale Items */}
            <div className="border-t-2 border-slate-100 pt-8">
              <h3 className="text-base sm:text-lg md:text-xl font-black text-slate-900 mb-4">🔒 Final Sale Items</h3>
              <p className="text-slate-700 leading-relaxed text-sm sm:text-base">Certain promotional or clearance items may be marked as Final Sale and are not eligible for return or exchange.</p>
            </div>
          </div>

          {/* Packaging Requirements */}
          <div className="bg-gradient-to-br from-white to-blue-50/30 rounded-3xl p-8 md:p-10 shadow-lg shadow-blue-100/30 border-2 border-slate-100 space-y-6 backdrop-blur-sm">
            <h2 className="text-lg sm:text-xl md:text-2xl font-black bg-gradient-to-r from-blue-600 to-blue-600 bg-clip-text text-transparent uppercase tracking-tighter">Packaging Requirements</h2>
            
            <p className="text-slate-700 leading-relaxed font-medium text-sm sm:text-base">To ensure safe return and successful processing:</p>
            
            <ul className="space-y-3">
              <li className="text-slate-700 text-sm sm:text-base flex items-start gap-3"><span className="text-blue-600 font-bold text-lg">•</span> Items must include all original accessories, manuals, and packaging</li>
              <li className="text-slate-700 text-sm sm:text-base flex items-start gap-3"><span className="text-blue-600 font-bold text-lg">•</span> Products must be securely packed to prevent damage during transit</li>
              <li className="text-slate-700 text-sm sm:text-base flex items-start gap-3"><span className="text-red-600 font-bold text-lg">•</span> We reserve the right to deny returns or apply partial refunds if items are damaged due to improper packaging.</li>
            </ul>
          </div>
          <div className="bg-gradient-to-br from-white to-blue-50/30 rounded-3xl p-8 md:p-10 shadow-lg shadow-blue-100/30 border-2 border-slate-100 space-y-6 backdrop-blur-sm">
            <h2 className="text-lg sm:text-xl md:text-2xl font-black bg-gradient-to-r from-blue-600 to-blue-600 bg-clip-text text-transparent uppercase tracking-tighter">Exchange Policy</h2>
            
            <ul className="space-y-3">
              <li className="text-slate-700 text-sm sm:text-base flex items-start gap-3"><span className="text-blue-600 font-bold text-lg">•</span> Exchanges are available for defective or incorrect items only</li>
              <li className="text-slate-700 text-sm sm:text-base flex items-start gap-3"><span className="text-blue-600 font-bold text-lg">•</span> Replacement is subject to product availability</li>
              <li className="text-slate-700 text-sm sm:text-base flex items-start gap-3"><span className="text-blue-600 font-bold text-lg">•</span> If a replacement is not available, a full refund will be issued</li>
            </ul>
          </div>

          {/* How to Request a Return */}
          <div className="bg-gradient-to-br from-white to-blue-50/30 rounded-3xl p-8 md:p-10 shadow-lg shadow-blue-100/30 border-2 border-slate-100 space-y-6 backdrop-blur-sm">
            <h2 className="text-lg sm:text-xl md:text-2xl font-black bg-gradient-to-r from-blue-600 to-blue-600 bg-clip-text text-transparent uppercase tracking-tighter">How to Request a Return</h2>
            
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="text-2xl font-bold text-blue-600 flex-shrink-0">1</div>
                <p className="text-slate-700 font-medium pt-1 text-sm sm:text-base">Submit a return request with your order details</p>
              </div>
              <div className="flex items-start gap-4">
                <div className="text-2xl font-bold text-blue-600 flex-shrink-0">2</div>
                <p className="text-slate-700 font-medium pt-1 text-sm sm:text-base">Wait for approval and receive a prepaid return label</p>
              </div>
              <div className="flex items-start gap-4">
                <div className="text-2xl font-bold text-slate-600 flex-shrink-0">3</div>
                <p className="text-slate-700 font-medium pt-1 text-sm sm:text-base">Ship the item securely in original packaging</p>
              </div>
              <div className="flex items-start gap-4">
                <div className="text-2xl font-bold text-green-600 flex-shrink-0">4</div>
                <p className="text-slate-700 font-medium pt-1 text-sm sm:text-base">Once received and inspected, your refund or exchange will be processed</p>
              </div>
            </div>
          </div>

          {/* Important Notes */}
          <div className="bg-gradient-to-br from-amber-50/50 to-orange-50/50 rounded-3xl p-8 md:p-10 shadow-lg shadow-orange-100/30 border-2 border-orange-200 space-y-6 backdrop-blur-sm">
            <h2 className="text-lg sm:text-xl md:text-2xl font-black bg-gradient-to-r from-orange-600 to-orange-600 bg-clip-text text-transparent uppercase tracking-tighter">Important Notes (Compliance & Transparency)</h2>
            
            <ul className="space-y-3">
              <li className="text-slate-700 text-sm sm:text-base flex items-start gap-3"><span className="text-orange-600 font-bold text-lg">•</span> Returns without prior approval may not be accepted</li>
              <li className="text-slate-700 text-sm sm:text-base flex items-start gap-3"><span className="text-orange-600 font-bold text-lg">•</span> Refund timelines may vary based on banks or payment providers</li>
              <li className="text-slate-700 text-sm sm:text-base flex items-start gap-3"><span className="text-orange-600 font-bold text-lg">•</span> We reserve the right to verify return eligibility before approval</li>
              <li className="text-slate-700 text-sm sm:text-base flex items-start gap-3"><span className="text-orange-600 font-bold text-lg">•</span> This policy does not affect your statutory rights under applicable consumer laws</li>
            </ul>
          </div>

          {/* Need Help */}
          <div className="bg-gradient-to-br from-white to-blue-50/30 rounded-3xl p-8 md:p-10 shadow-lg shadow-blue-100/30 border-2 border-slate-100 space-y-6 backdrop-blur-sm">
            <h2 className="text-lg sm:text-xl md:text-2xl font-black bg-gradient-to-r from-blue-600 to-blue-600 bg-clip-text text-transparent uppercase tracking-tighter">Need Help? Contact Us</h2>
            
            <p className="text-slate-700 leading-relaxed font-medium text-sm sm:text-base">For any return requests, questions, or support:</p>

            <div className="space-y-4 text-sm sm:text-base">
              <div>
                <p className="font-black text-slate-900 mb-2">Prints Basket (16904599 CANADA INC)</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-xl">📧</span>
                <div>
                  <p className="font-black text-slate-900">Email:</p>
                  <a href="mailto:support@printsbasket.com" className="text-blue-600 hover:text-blue-700 font-bold transition-colors">support@printsbasket.com</a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-xl">📞</span>
                <div>
                  <p className="font-black text-slate-900">Phone:</p>
                  <p className="text-slate-700">+1 (888) 322-5251</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-xl">📍</span>
                <div>
                  <p className="font-black text-slate-900 mb-1">Registered Address:</p>
                  <p className="text-slate-700">95 Broadacre Dr<br/>Kitchener, ON N2R 0S5<br/>Canada</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-xl">💬</span>
                <div>
                  <p className="font-black text-slate-900">Live Chat:</p>
                  <p className="text-slate-700">Available on <a href="https://www.printsbasket.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 font-bold">www.printsbasket.com</a></p>
                </div>
              </div>
            </div>

            <div className="border-t-2 border-slate-200 pt-6">
              <p className="text-slate-700 text-sm sm:text-base">
                We are committed to assisting you promptly and ensuring a smooth return and refund experience.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ReturnExchangePolicy;

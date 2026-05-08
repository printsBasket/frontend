import React from "react";
import { Link } from "react-router-dom";
import SEO from '../common/SEO';

const CCPAPrivacyPolicy = () => {
  return (
    <section className="w-full bg-gradient-to-b from-blue-50 via-white to-blue-50 min-h-screen py-16">
      <SEO title="CCPA Privacy Notice | Prints Basket" description="California Consumer Privacy Act (CCPA) notice. Learn about your privacy rights as a California resident at Prints Basket." canonical="/ccpa-privacy-policy" />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">

        {/* Breadcrumb Navigation */}
        <div className="flex justify-center items-center gap-2 text-sm text-gray-600">
          <Link to="/" className="hover:text-blue-600 transition">Home</Link>
          <span>/</span>
          <span className="text-gray-900 font-medium">CCPA Privacy Notice</span>
        </div>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">
            Do Not Sell or Share My Personal Information
          </h1>
          <div className="mt-2 h-1 w-24 bg-gradient-to-r from-blue-500 to-blue-500 rounded-full mx-auto"></div>
          <p className="text-gray-600 text-xs sm:text-sm md:text-base leading-relaxed max-w-3xl mx-auto mt-2"><strong>CCPA/CPRA Notice</strong></p>
          <p className="mt-6 text-gray-600 text-xs sm:text-sm md:text-base leading-relaxed max-w-3xl mx-auto">
            Last Updated: March 25, 2026
          </p>
          <p className="mt-4 text-gray-600 text-sm sm:text-base md:text-base leading-relaxed max-w-3xl mx-auto">
            This page is provided in accordance with the California Consumer Privacy Act (CCPA) and the California Privacy Rights Act (CPRA). These laws provide California residents with specific rights regarding their personal information.
          </p>
        </div>

        <div className="space-y-10">

          {/* 1. Our Commitment to Your Privacy */}
          <div className="space-y-4">
            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900">1. Our Commitment to Your Privacy</h2>
            <p className="text-gray-600 leading-relaxed text-sm sm:text-base md:text-base">
              Prints Basket respects your privacy and is committed to transparent data practices.
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 text-sm sm:text-base md:text-base">
              <li>We do NOT sell personal information</li>
              <li>We do NOT share personal information for cross-context behavioral advertising</li>
              <li>We do NOT use advertising cookies, tracking pixels, or profiling technologies</li>
              <li>Even though we do not sell or share data, California residents have the right to submit requests under applicable laws.</li>
            </ul>
          </div>

          {/* 2. Your Rights Under CCPA/CPRA */}
          <div className="space-y-4">
            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900">2. Your Rights Under CCPA/CPRA</h2>
            <p className="text-gray-600 leading-relaxed text-sm sm:text-base md:text-base">
              California residents have the following specific rights:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 text-sm sm:text-base md:text-base">
              <li><strong>Right to Know:</strong> Request and receive information about the personal information we collect, use, or share.</li>
              <li><strong>Right to Delete:</strong> Request deletion of your personal information (subject to legal exceptions).</li>
              <li><strong>Right to Correct:</strong> Request correction of inaccurate personal information.</li>
              <li><strong>Right to Opt-Out:</strong> Opt out of the "sale" or "sharing" of personal information (though we don't engage in these practices).</li>
              <li><strong>Right to Limit Use of Sensitive Personal Information:</strong> Direct us to limit the use of sensitive personal information to necessary business purposes (we do not use sensitive data).</li>
              <li><strong>Right to Non-Discrimination:</strong> Exercise these rights without experiencing discrimination, including denial of service or different pricing.</li>
              <li><strong>Right to Exercise Rights at Anytime:</strong> You may submit requests at any time, and we will respond within the timeframes mandated by law (typically 45 days).</li>
            </ul>
          </div>

          {/* 3. Our Data Practices */}
          <div className="space-y-4">
            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900">3. Our Data Practices</h2>
            <p className="text-gray-600 leading-relaxed text-sm sm:text-base md:text-base">
              Prints Basket adheres to strict data protection practices:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 text-sm sm:text-base md:text-base">
              <li>We do NOT sell personal information to third parties.</li>
              <li>We do NOT share personal information for advertising purposes.</li>
              <li>We only disclose information to trusted service providers under strict contractual obligations.</li>
              <li>We maintain industry-standard security measures to protect your data at all times.</li>
            </ul>
          </div>

          {/* 4. Categories of Personal Information We Collect */}
          <div className="space-y-4">
            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900">4. Categories of Personal Information We Collect</h2>
            <p className="text-gray-600 leading-relaxed text-sm sm:text-base md:text-base">
              We collect only limited information required for our eCommerce operations, including:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 text-sm sm:text-base md:text-base">
              <li>Contact information (name, email address, phone number)</li>
              <li>Billing and shipping address</li>
              <li>Order details and transaction history</li>
              <li>Customer support communications</li>
              <li>Essential technical/session data (e.g., cookies for cart and security)</li>
              <li>We do not use or disclose sensitive personal information for advertising purposes.</li>
            </ul>
          </div>

          {/* 5. No Sale or Sharing of Personal Information */}
          <div className="space-y-4">
            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900">5. No Sale or Sharing of Personal Information</h2>
            <p className="text-gray-600 leading-relaxed text-sm sm:text-base md:text-base">
              In the preceding 12 months, Prints Basket has:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 text-sm sm:text-base md:text-base">
              <li>Not sold personal information</li>
              <li>Not shared personal information for cross-context behavioral advertising</li>
              <li>Only disclosed information to trusted service providers (e.g., payment processors, shipping partners) strictly for business operations</li>
              <li>All service providers are contractually required to use data only for authorized purposes.</li>
            </ul>
          </div>

          {/* 6. Cookies & Tracking Technologies */}
          <div className="space-y-4">
            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900">6. Cookies & Tracking Technologies</h2>
            <p className="text-gray-600 leading-relaxed text-sm sm:text-base md:text-base">
              Prints Basket does not use:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 text-sm sm:text-base md:text-base">
              <li>Advertising or tracking cookies</li>
              <li>Analytics tools or behavioral profiling technologies</li>
              <li>Third-party marketing or retargeting pixels</li>
            </ul>
            <p className="text-gray-600 leading-relaxed text-sm sm:text-base md:text-base mt-2">
              We only use strictly necessary cookies required for:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 text-sm sm:text-base md:text-base">
              <li>Cart functionality</li>
              <li>Secure checkout</li>
              <li>Account login</li>
              <li>Website security and performance</li>
            </ul>
          </div>

          {/* 7. How to Submit a Request */}
          <div className="space-y-4">
            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900">7. How to Submit a Request</h2>
            <p className="text-gray-600 leading-relaxed text-sm sm:text-base md:text-base">
              You may submit a request to exercise your rights using the method below:
            </p>
            <div className="bg-white rounded-lg p-4 border border-gray-200 mt-3">
              <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-2">Email Request</h3>
              <p className="text-gray-600 text-sm sm:text-base mb-2">Send your request to: <a href="mailto:support@printsbasket.com" className="text-blue-600 underline">support@printsbasket.com</a></p>
              <p className="text-gray-600 text-sm sm:text-base mb-2"><strong>Subject Line:</strong> "CCPA Request"</p>
              <p className="text-gray-600 text-sm sm:text-base mb-2">Please include:</p>
              <ul className="list-disc list-inside text-gray-600 space-y-1 text-sm sm:text-base">
                <li>Full name</li>
                <li>Email address</li>
                <li>Order number (if applicable)</li>
                <li>Type of request (Access, Delete, Correct, or Opt-Out)</li>
              </ul>
            </div>
          </div>

          {/* 8. Verification Process */}
          <div className="space-y-4">
            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900">8. Verification Process</h2>
            <p className="text-gray-600 leading-relaxed text-sm sm:text-base md:text-base">
              To protect your personal information, we may verify your identity by requesting:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 text-sm sm:text-base md:text-base">
              <li>Email confirmation</li>
              <li>Order details or transaction history</li>
              <li>Basic account information</li>
            </ul>
            <p className="text-gray-600 leading-relaxed text-sm sm:text-base md:text-base mt-2">
              We will respond to verified requests within 45 days, as required by law.
            </p>
          </div>

          {/* 9. Authorized Agents */}
          <div className="space-y-4">
            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900">9. Authorized Agents</h2>
            <p className="text-gray-600 leading-relaxed text-sm sm:text-base md:text-base">
              You may designate an authorized agent to submit a request on your behalf.
            </p>
            <p className="text-gray-600 leading-relaxed text-sm sm:text-base md:text-base">
              We may require proof of authorization and identity verification before processing such requests.
            </p>
          </div>

          {/* 10. Non-Discrimination Statement */}
          <div className="space-y-4">
            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900">10. Non-Discrimination Statement</h2>
            <p className="text-gray-600 leading-relaxed text-sm sm:text-base md:text-base">
              Prints Basket will not:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 text-sm sm:text-base md:text-base">
              <li>Deny goods or services</li>
              <li>Charge different prices</li>
              <li>Provide a lower level of service</li>
              <li>Discriminate against you in any way</li>
              <li>â€¦for exercising your privacy rights under applicable laws.</li>
            </ul>
          </div>

          {/* 11. Contact Us */}
          <div className="space-y-4 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-6 text-white">
            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold">11. Contact Us</h2>
            <p className="leading-relaxed text-sm sm:text-base md:text-base">
              For any questions about this notice or your privacy rights, please contact us:
            </p>
            <div className="space-y-2 text-blue-50 text-sm sm:text-base">
              <p><strong>Prints Basket (16904599 CANADA INC)</strong></p>
              <p>ðŸ“§ <strong>Email:</strong> <a href="mailto:support@printsbasket.com" className="underline hover:text-white">support@printsbasket.com</a></p>
              <p>ðŸ“ž <strong>Phone:</strong> +1 (888) 322-5251</p>
              <p>ðŸ“ <strong>Registered Address:</strong><br/>95 Broadacre Dr<br/>Kitchener, ON N2R 0S5<br/>Canada</p>
            </div>
            <p className="text-blue-50 text-sm leading-relaxed mt-3">
              We are committed to handling all privacy-related requests promptly and in accordance with applicable data protection laws.
            </p>
          </div>


        </div>
      </div>
    </section>
  );
};

export default CCPAPrivacyPolicy;

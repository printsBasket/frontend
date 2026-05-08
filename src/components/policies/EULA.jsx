import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../common/SEO';

const EULA = () => {
  return (
    <section className="w-full bg-gradient-to-b from-blue-50 via-white to-blue-50 min-h-screen py-16">
      <SEO title="End User License Agreement (EULA) | Prints Basket" description="Read the Prints Basket End User License Agreement governing your access and use of the platform." canonical="/eula" />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">

        {/* Breadcrumb Navigation */}
        <div className="flex justify-center items-center gap-2 text-sm text-gray-600">
          <Link to="/" className="hover:text-blue-600 transition">Home</Link>
          <span>/</span>
          <span className="text-gray-900 font-medium">EULA</span>
        </div>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">
            End User License Agreement (EULA)
          </h1>
          <div className="mt-2 h-1 w-24 bg-gradient-to-r from-blue-500 to-blue-500 rounded-full mx-auto"></div>
          <p className="mt-6 text-gray-600 text-xs sm:text-sm md:text-base leading-relaxed max-w-3xl mx-auto">
            Last Updated: March 25, 2026
          </p>
          <p className="mt-4 text-gray-600 text-sm sm:text-base md:text-base leading-relaxed max-w-3xl mx-auto">
            This End User License Agreement ("Agreement") governs your access to and use of the Prints Basket website and related services ("Platform"). By accessing or using the Platform, you agree to be bound by this Agreement. If you do not agree, you must discontinue use immediately.
          </p>
        </div>

        <div className="space-y-10">

          {/* 1. License Grant */}
          <div className="space-y-4">
            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900">1. License Grant</h2>
            <p className="text-gray-600 leading-relaxed text-sm sm:text-base md:text-base">
              Prints Basket, operated by 16904599 CANADA INC, grants you a limited, non-exclusive, non-transferable, and revocable license to access and use the Platform for personal or legitimate business purposes, subject to this Agreement and applicable laws.
            </p>
            <p className="text-gray-600 leading-relaxed text-sm sm:text-base md:text-base">
              You may not transfer, sublicense, or assign your access rights without prior written consent.
            </p>
          </div>
          aske
          {/* 2. User Responsibilities */}
          <div className="space-y-4">
            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900">2. User Responsibilities</h2>
            <p className="text-gray-600 leading-relaxed text-sm sm:text-base md:text-base">
              By using the Platform, you agree to:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 text-sm sm:text-base md:text-base">
              <li>Use the Platform only for lawful purposes</li>
              <li>Provide accurate and complete information</li>
              <li>Maintain the confidentiality of your account credentials</li>
              <li>Use the Platform in a manner that does not disrupt functionality or security</li>
              <li>Comply with all applicable laws and regulations</li>
            </ul>
            <p className="text-gray-600 leading-relaxed text-sm sm:text-base md:text-base">
              You are responsible for all activities conducted under your account.
            </p>
          </div>

          {/* 3. Prohibited Activities */}
          <div className="space-y-4">
            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900">3. Prohibited Activities</h2>
            <p className="text-gray-600 leading-relaxed text-sm sm:text-base md:text-base">
              You agree not to:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 text-sm sm:text-base md:text-base">
              <li>Copy, reproduce, or distribute Platform content without authorization</li>
              <li>Attempt to bypass or disable security features</li>
              <li>Use bots, scrapers, or automated tools without permission</li>
              <li>Upload malicious code, malware, or harmful content</li>
              <li>Interfere with Platform performance or operations</li>
              <li>Engage in fraudulent, deceptive, or misleading activities</li>
              <li>Infringe on intellectual property rights</li>
            </ul>
            <div className="bg-red-50 border-l-4 border-red-400 p-4 mt-4">
              <p className="text-red-700 text-sm sm:text-base">
                <strong>⚠️ Warning:</strong> Violation of these terms may result in suspension, termination, or legal action.
              </p>
            </div>
          </div>

          {/* 4. Ownership & Intellectual Property */}
          <div className="space-y-4">
            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900">4. Ownership & Intellectual Property</h2>
            <p className="text-gray-600 leading-relaxed text-sm sm:text-base md:text-base">
              All content on the Platform—including text, graphics, product information, logos, software, and design—is owned by Prints Basket or its licensors and is protected by applicable intellectual property laws.
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 text-sm sm:text-base md:text-base">
              <li>No ownership rights are transferred to users</li>
              <li>Unauthorized use or reproduction is prohibited</li>
            </ul>
            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mt-4">
              <p className="text-gray-700 text-sm sm:text-base font-medium mb-2">Third-Party Trademarks</p>
              <p className="text-gray-600 text-sm sm:text-base">
                All third-party brand names and trademarks (e.g., HP, Canon, Epson, Brother) belong to their respective owners and are used for identification purposes only. Prints Basket operates as an independent online retailer and is not affiliated with or endorsed by any manufacturer unless explicitly stated.
              </p>
            </div>
          </div>

          {/* 5. Suspension & Termination */}
          <div className="space-y-4">
            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900">5. Suspension & Termination</h2>
            <p className="text-gray-600 leading-relaxed text-sm sm:text-base md:text-base">
              We reserve the right to suspend or terminate access to the Platform without prior notice if:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 text-sm sm:text-base md:text-base">
              <li>You violate this Agreement</li>
              <li>Suspicious, fraudulent, or harmful activity is detected</li>
              <li>Required by law or regulatory authority</li>
              <li>Platform maintenance, updates, or discontinuation occur</li>
            </ul>
            <p className="text-gray-600 leading-relaxed text-sm sm:text-base md:text-base">
              Upon termination, your right to use the Platform ends immediately.
            </p>
          </div>

          {/* 6. Disclaimer of Warranties */}
          <div className="space-y-4">
            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900">6. Disclaimer of Warranties</h2>
            <p className="text-gray-600 leading-relaxed text-sm sm:text-base md:text-base">
              The Platform is provided on an "as-is" and "as-available" basis.
            </p>
            <p className="text-gray-600 leading-relaxed text-sm sm:text-base md:text-base">
              We do not guarantee:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 text-sm sm:text-base md:text-base">
              <li>Continuous or uninterrupted access</li>
              <li>Error-free or secure operation at all times</li>
              <li>Compatibility with all devices or browsers</li>
              <li>Complete accuracy or reliability of all content</li>
            </ul>
            <p className="text-gray-600 leading-relaxed text-sm sm:text-base md:text-base font-medium">
              Use of the Platform is at your own risk.
            </p>
          </div>

          {/* 7. Limitation of Liability */}
          <div className="space-y-4">
            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900">7. Limitation of Liability</h2>
            <p className="text-gray-600 leading-relaxed text-sm sm:text-base md:text-base">
              To the maximum extent permitted by law, Prints Basket is not liable for:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 text-sm sm:text-base md:text-base">
              <li>Indirect, incidental, or consequential damages</li>
              <li>Loss of profits, revenue, or business opportunities</li>
              <li>Data loss or system interruptions</li>
              <li>Delays or errors caused by third-party services</li>
            </ul>
            <p className="text-gray-600 leading-relaxed text-sm sm:text-base md:text-base">
              Our total liability shall not exceed the amount paid for the relevant product or service.
            </p>
          </div>

          {/* 8. Compliance & Fair Use */}
          <div className="space-y-4">
            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900">8. Compliance & Fair Use</h2>
            <p className="text-gray-600 leading-relaxed text-sm sm:text-base md:text-base">
              We are committed to maintaining a fair, transparent, and compliant platform.
            </p>
            <p className="text-gray-600 leading-relaxed text-sm sm:text-base md:text-base">
              Users agree not to misuse the Platform for deceptive, unlawful, or harmful purposes.
            </p>
          </div>

          {/* 9. Governing Law */}
          <div className="space-y-4">
            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900">9. Governing Law</h2>
            <p className="text-gray-600 leading-relaxed text-sm sm:text-base md:text-base">
              This Agreement is governed by:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 text-sm sm:text-base md:text-base">
              <li>Canadian law for customers located in Canada</li>
              <li>Applicable U.S. laws for customers located in the United States</li>
            </ul>
            <p className="text-gray-600 leading-relaxed text-sm sm:text-base md:text-base">
              Any disputes will be handled in the appropriate jurisdiction based on the user's location.
            </p>
          </div>

          {/* 10. Changes to This Agreement */}
          <div className="space-y-4">
            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900">10. Changes to This Agreement</h2>
            <p className="text-gray-600 leading-relaxed text-sm sm:text-base md:text-base">
              We may update this Agreement at any time. Changes become effective upon posting.
            </p>
            <p className="text-gray-600 leading-relaxed text-sm sm:text-base md:text-base">
              Continued use of the Platform after updates constitutes acceptance of the revised terms.
            </p>
          </div>

          {/* 11. Contact Us */}
          <div className="space-y-4 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-6 text-white">
            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold">11. Contact Us</h2>
            <p className="leading-relaxed text-sm sm:text-base md:text-base">
              For any questions regarding this Agreement or your use of the Platform, please contact us:
            </p>
            <div className="space-y-2 text-blue-50 text-sm sm:text-base">
              <p><strong>Prints Basket (16904599 CANADA INC)</strong></p>
              <p>📧 <strong>Email:</strong> <a href="mailto:support@printsbasket.com" className="underline hover:text-white">support@printsbasket.com</a></p>
              <p>📞 <strong>Phone:</strong> +1 (888) 322-5251</p>
              <p>📍 <strong>Registered Address:</strong><br />95 Broadacre Dr<br />Kitchener, ON N2R 0S5<br />Canada</p>
            </div>
            <p className="text-blue-50 text-sm leading-relaxed mt-3">
              We are committed to responding promptly and assisting with any inquiries.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default EULA;

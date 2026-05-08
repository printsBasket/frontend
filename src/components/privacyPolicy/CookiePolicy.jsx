import React from "react";
import { Link } from "react-router-dom";
import SEO from '../common/SEO';

const CookiePolicy = () => {
  return (
    <section className="w-full bg-gradient-to-b from-blue-50 via-white to-blue-50 min-h-screen py-16">
      <SEO title="Cookie Policy | Prints Basket" description="Learn how Prints Basket uses cookies and similar technologies. Understand your choices regarding cookie usage on our website." canonical="/cookie-policy" />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">

        {/* Breadcrumb Navigation */}
        <div className="flex justify-center items-center gap-2 text-sm text-gray-600">
          <Link to="/" className="hover:text-blue-600 transition">Home</Link>
          <span>/</span>
          <span className="text-gray-900 font-medium">Cookie Policy</span>
        </div>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">
            Cookie Policy
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
              This Cookie Policy explains how Prints Basket ("we," "our," or "us") uses cookies and similar technologies to operate, secure, and improve our website. It also explains your choices regarding cookie usage.
            </p>
            <p className="text-gray-700 leading-relaxed text-sm sm:text-base md:text-base">
              By continuing to use our website, you acknowledge the use of cookies as described in this policy. Where applicable, you will be provided with options to manage your cookie preferences.
            </p>
          </div>

          {/* 1. What Are Cookies */}
          <div className="space-y-4">
            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900">1. What Are Cookies?</h2>
            <p className="text-gray-600 leading-relaxed text-sm sm:text-base md:text-base">
              Cookies are small text files stored on your device (computer, smartphone, or tablet) when you visit a website. They help websites function properly, maintain secure sessions, and remember basic preferences.
            </p>
            <div className="bg-yellow-50 rounded-lg p-4 border-l-4 border-yellow-500">
              <p className="text-gray-700 font-medium text-sm mb-2">Important:</p>
              <p className="text-gray-600 text-sm sm:text-base">
                Cookies used on our website do not store sensitive personal information such as your full payment details. Any personal data you provide is handled in accordance with our Privacy Policy.
              </p>
            </div>
          </div>

          {/* 2. Types of Cookies We Use */}
          <div className="space-y-4">
            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900">2. Types of Cookies We Use</h2>
            <p className="text-gray-600 leading-relaxed text-sm sm:text-base md:text-base">
              Prints Basket uses limited, essential, and functional cookies only to ensure proper website operation.
            </p>

            <div className="overflow-x-auto bg-white rounded-lg border border-gray-200 mb-4">
              <table className="w-full text-sm">
                <thead className="bg-blue-100 border-b border-gray-200">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold text-gray-800">Cookie Type</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-800">Purpose</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-800">Examples</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-800">Consent Required</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-200">
                    <td className="px-4 py-3 text-gray-600 font-medium">Strictly Necessary</td>
                    <td className="px-4 py-3 text-gray-600">Enable core website functionality and security</td>
                    <td className="px-4 py-3 text-gray-600 text-xs">Cart sessions, login authentication</td>
                    <td className="px-4 py-3 text-gray-600 font-medium text-green-600">No (Required)</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-gray-600 font-medium">Functional</td>
                    <td className="px-4 py-3 text-gray-600">Store basic preferences for usability</td>
                    <td className="px-4 py-3 text-gray-600 text-xs">Language or region settings</td>
                    <td className="px-4 py-3 text-gray-600 font-medium text-blue-600">Implied</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="bg-red-50 rounded-lg p-4 border-l-4 border-red-400">
              <p className="text-gray-700 font-medium mb-2 text-sm">We Do Not Use</p>
              <ul className="list-disc list-inside text-gray-600 space-y-1 text-sm sm:text-base">
                <li>Advertising or behavioral tracking cookies</li>
                <li>Third-party retargeting or remarketing cookies</li>
                <li>Social media tracking pixels</li>
                <li>Analytics or profiling tools</li>
              </ul>
            </div>
          </div>

          {/* 3. Purpose of Cookies */}
          <div className="space-y-4">
            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900">3. Purpose of Cookies</h2>
            <p className="text-gray-600 leading-relaxed text-sm sm:text-base md:text-base">
              The cookies we use are necessary for:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 text-sm sm:text-base md:text-base">
              <li>Maintaining your shopping cart and checkout session</li>
              <li>Securing login sessions and protecting account data</li>
              <li>Processing orders through secure connections</li>
              <li>Remembering basic preferences (such as language or region)</li>
              <li>Ensuring overall website performance and reliability</li>
            </ul>
            <div className="bg-yellow-50 rounded-lg p-4 border-l-4 border-yellow-500">
              <p className="text-gray-600 text-sm sm:text-base">
                <strong>⚠️ Warning:</strong> Disabling essential cookies may prevent key features such as checkout, account login, or cart functionality from working properly.
              </p>
            </div>
          </div>

          {/* 4. Cookie Consent & User Control */}
          <div className="space-y-4">
            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900">4. Cookie Consent & User Control</h2>
            <p className="text-gray-600 leading-relaxed text-sm sm:text-base md:text-base">
              You have control over how cookies are used:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 text-sm sm:text-base md:text-base">
              <li>You can accept or reject non-essential cookies (if implemented in future updates)</li>
              <li>You can disable cookies through your browser settings</li>
              <li>You can delete stored cookies at any time</li>
              <li>At present, since we only use essential cookies, a full opt-out may affect website functionality.</li>
            </ul>
          </div>

          {/* 5. Managing Cookies in Your Browser */}
          <div className="space-y-4">
            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900">5. Managing Cookies in Your Browser</h2>
            <p className="text-gray-600 leading-relaxed text-sm sm:text-base md:text-base">
              You can manage cookies through your browser settings:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 text-sm sm:text-base md:text-base">
              <li><strong>Google Chrome:</strong> Settings → Privacy & Security → Cookies and Site Data</li>
              <li><strong>Mozilla Firefox:</strong> Settings → Privacy & Security → Cookies and Site Data</li>
              <li><strong>Safari:</strong> Preferences → Privacy → Cookies</li>
              <li><strong>Microsoft Edge:</strong> Settings → Cookies and Site Permissions</li>
            </ul>
            <div className="bg-yellow-50 rounded-lg p-4 border-l-4 border-yellow-500 mt-4">
              <p className="text-gray-600 text-sm sm:text-base">
                Blocking or deleting cookies may impact certain features of the website.
              </p>
            </div>
          </div>

          {/* 6. Third-Party Cookies */}
          <div className="space-y-4">
            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900">6. Third-Party Cookies</h2>
            <p className="text-gray-600 leading-relaxed text-sm sm:text-base md:text-base">
              We do not currently use third-party cookies for advertising, analytics, or behavioral tracking.
            </p>
            <p className="text-gray-600 leading-relaxed text-sm sm:text-base md:text-base">
              If third-party services (such as payment processors or live chat tools) require cookies for functionality:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 text-sm sm:text-base md:text-base">
              <li>Their usage will be clearly disclosed</li>
              <li>This policy will be updated accordingly</li>
            </ul>
          </div>

          {/* 7. Data Privacy and Cookies */}
          <div className="space-y-4">
            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900">7. Data Privacy and Cookies</h2>
            <p className="text-gray-600 leading-relaxed text-sm sm:text-base md:text-base">
              Any limited data collected through cookies (such as session identifiers or preferences) is processed in accordance with our Privacy Policy.
            </p>
            <p className="text-gray-600 leading-relaxed text-sm sm:text-base md:text-base">
              We do not use cookies to collect or store sensitive personal information.
            </p>
          </div>

          {/* 8. Policy Updates */}
          <div className="space-y-4">
            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900">8. Policy Updates</h2>
            <p className="text-gray-600 leading-relaxed text-sm sm:text-base md:text-base">
              We may update this Cookie Policy from time to time to reflect changes in legal requirements or website functionality. Updates will be posted on this page with a revised "Last Updated" date.
            </p>
          </div>

          {/* 9. Contact Us */}
          <div className="space-y-4 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-6 text-white">
            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold">9. Contact Us</h2>
            <p className="leading-relaxed text-sm sm:text-base md:text-base">
              For any questions about this Cookie Policy or your cookie preferences, please contact us:
            </p>
            <div className="space-y-2 text-blue-50 text-sm sm:text-base">
              <p><strong>Prints Basket (16904599 CANADA INC)</strong></p>
              <p>📧 <strong>Email:</strong> <a href="mailto:support@printsbasket.com" className="underline hover:text-white">support@printsbasket.com</a></p>
              <p>📞 <strong>Phone:</strong> +1 (888) 322-5251</p>
              <p>📍 <strong>Registered Address:</strong><br/>95 Broadacre Dr<br/>Kitchener, ON N2R 0S5<br/>Canada</p>
            </div>
            <p className="text-blue-50 text-sm leading-relaxed mt-3">
              We are committed to transparency and will respond promptly to any inquiries regarding cookies and data usage.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default CookiePolicy;

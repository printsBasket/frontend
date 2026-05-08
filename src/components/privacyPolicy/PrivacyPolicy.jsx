import React from "react";
import { Link } from "react-router-dom";
import SEO from '../common/SEO';

const PrivacyPolicy = () => {
  return (
    <section className="w-full bg-gradient-to-b from-blue-50 via-white to-blue-50 min-h-screen py-16">
      <SEO title="Privacy Policy | Prints Basket" description="Learn how Prints Basket collects, uses, and protects your personal information. Read our full privacy policy for details on data practices." canonical="/privacy-policy" />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">

        {/* Breadcrumb Navigation */}
        <div className="flex justify-center items-center gap-2 text-sm text-gray-600">
          <Link to="/" className="hover:text-blue-600 transition">Home</Link>
          <span>/</span>
          <span className="text-gray-900 font-medium">Privacy Policy</span>
        </div>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">
            Privacy Policy
          </h1>
          <div className="mt-2 h-1 w-24 bg-gradient-to-r from-blue-500 to-blue-500 rounded-full mx-auto"></div>
          <p className="mt-6 text-gray-600 text-xs sm:text-sm md:text-base leading-relaxed max-w-3xl mx-auto">
            Effective Date: March 25, 2026 • Last Updated: March 25, 2026
          </p>
        </div>

        <div className="space-y-10">

          {/* Introduction */}
          <div className="space-y-4 bg-white rounded-lg p-6 shadow-sm border-l-4 border-blue-500">
            <p className="text-gray-700 leading-relaxed text-sm sm:text-base md:text-base">
              <strong>Prints Basket</strong> ("we," "our," or "us") is committed to protecting your privacy and ensuring full transparency in how your personal information is collected, used, and managed. This Privacy Policy explains our data practices in accordance with applicable laws in the United States and Canada, including expectations under Microsoft Advertising and Google Ads policies.
            </p>
          </div>

          {/* 1. Data Controller Information */}
          <div className="space-y-4">
            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900">1. Data Controller Information</h2>
            <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
              <p className="text-gray-700 space-y-2 text-sm sm:text-base">
                <span className="block"><strong>Prints Basket (16904599 CANADA INC)</strong></span>
                <span className="block"><strong>📧 Email:</strong> <a href="mailto:support@printsbasket.com" className="text-blue-600 underline hover:text-blue-700">support@printsbasket.com</a></span>
                <span className="block"><strong>📞 Phone:</strong> +1 (888) 322-5251</span>
                <span className="block"><strong>📍 Address:</strong> 95 Broadacre Dr, Kitchener, ON N2R 0S5, Canada</span>
              </p>
            </div>
          </div>

          {/* 2. Information We Collect */}
          <div className="space-y-4">
            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900">2. Information We Collect</h2>
            <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
              We collect only the information necessary to operate our eCommerce platform, process orders, and provide customer support.
            </p>

            <div className="pl-4 space-y-4 border-l-4 border-blue-300">
              <div>
                <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-800">2.1 Information You Provide</h3>
                <p className="text-gray-600 mt-2 mb-3 text-sm sm:text-base">When you interact with our website, we may collect:</p>
                <ul className="list-disc list-inside text-gray-600 space-y-1 ml-2 text-sm sm:text-base">
                  <li>Name</li>
                  <li>Email address</li>
                  <li>Phone number</li>
                  <li>Billing and shipping address</li>
                  <li>Order and transaction details</li>
                  <li>Account login credentials (if applicable)</li>
                  <li>Customer service communications</li>
                </ul>
                <p className="text-gray-600 mt-3 text-sm">
                  <strong>Payment Information:</strong> Payments are processed securely via PCI DSS–compliant third-party providers. We do not store full credit/debit card details.
                </p>
              </div>

              <div>
                <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-800">2.2 Information Collected Automatically</h3>
                <p className="text-gray-600 mt-2 mb-3 text-sm sm:text-base">When you browse our website, certain data may be collected automatically:</p>
                <ul className="list-disc list-inside text-gray-600 space-y-1 ml-2 text-sm sm:text-base">
                  <li>IP address</li>
                  <li>Browser type and version</li>
                  <li>Device type and operating system</li>
                  <li>Pages visited and session activity</li>
                  <li>Cart and checkout session data</li>
                  <li>Basic device metrics</li>
                </ul>
              </div>
            </div>
          </div>

          {/* 3. How We Use Your Information */}
          <div className="space-y-4">
            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900">3. How We Use Your Information</h2>
            <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
              We use your information for legitimate business purposes only:
            </p>

            <div className="pl-4 space-y-3 border-l-4 border-blue-300">
              <div>
                <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-800">3.1 Order Processing</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-1 mt-2 text-sm sm:text-base">
                  <li>Process and fulfill purchases</li>
                  <li>Send order confirmations and updates</li>
                  <li>Coordinate shipping and delivery</li>
                </ul>
              </div>

              <div>
                <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-800">3.2 Customer Support</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-1 mt-2 text-sm sm:text-base">
                  <li>Respond to inquiries</li>
                  <li>Provide assistance with orders, returns, or issues</li>
                </ul>
              </div>

              <div>
                <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-800">3.3 Security & Compliance</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-1 mt-2 text-sm sm:text-base">
                  <li>Detect fraud or unauthorized activity</li>
                  <li>Maintain website security</li>
                  <li>Comply with legal obligations</li>
                </ul>
              </div>

              <div>
                <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-800">3.4 Website Functionality</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-1 mt-2 text-sm sm:text-base">
                  <li>Ensure proper site performance</li>
                  <li>Improve user experience and checkout flow</li>
                </ul>
              </div>

              <p className="text-gray-600 mt-3 text-sm italic">
                <strong>Legal Basis:</strong> Contractual necessity, legitimate business interest, legal compliance, and user consent where applicable.
              </p>
            </div>
          </div>

          {/* 4. Information Sharing */}
          <div className="space-y-4">
            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900">4. How We Share Information</h2>
            <p className="text-gray-700 leading-relaxed font-medium text-sm sm:text-base mb-4">
              We do not sell or rent your personal data. We only share information when necessary:
            </p>

            <div className="space-y-4">
              <div className="bg-amber-50 rounded-lg p-4 border-l-4 border-amber-500">
                <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-800 mb-3">4.1 Service Providers</h3>
                <p className="text-gray-600 mb-3 text-sm sm:text-base">We may share data with trusted partners for:</p>
                <ul className="list-disc list-inside text-gray-600 space-y-1 mb-3 text-sm sm:text-base">
                  <li>Payment processing</li>
                  <li>Shipping and logistics</li>
                  <li>Website hosting and security</li>
                  <li>Customer support systems</li>
                </ul>
                <p className="text-gray-600 font-medium mb-2 text-sm">All partners are required to maintain confidentiality and use data only for authorized purposes.</p>
              </div>

              <div className="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-400">
                <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-800 mb-3">4.2 Legal Requirements</h3>
                <p className="text-gray-600 text-sm sm:text-base">We may disclose data if required by:</p>
                <ul className="list-disc list-inside text-gray-600 space-y-1 mt-2 text-sm sm:text-base">
                  <li>Law enforcement</li>
                  <li>Court orders</li>
                  <li>Regulatory authorities</li>
                </ul>
              </div>

              <div>
                <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-800 mb-2">4.3 Business Transfers</h3>
                <p className="text-gray-600 text-sm sm:text-base">
                  In case of a merger or acquisition, your data may be transferred. Users will be notified of such changes.
                </p>
              </div>

              <div>
                <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-800 mb-2">4.4 With Consent</h3>
                <p className="text-gray-600 text-sm sm:text-base">
                  We will share your information only when you explicitly authorize us to do so.
                </p>
              </div>
            </div>
          </div>

          {/* 5. Cookies & Tracking Technologies */}
          <div className="space-y-4">
            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900">5. Cookies & Tracking Technologies</h2>
            <p className="text-gray-600 leading-relaxed mb-4 text-sm sm:text-base">
              We are committed to transparency regarding tracking and data usage.
            </p>
            
            <div className="pl-4 space-y-4 border-l-4 border-blue-300">
              <div>
                <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-800">5.1 Types of Cookies We Use</h3>
                <p className="text-gray-600 mb-3 text-sm sm:text-base">We use limited and essential cookies, including:</p>
                <ul className="list-disc list-inside text-gray-600 space-y-1 text-sm sm:text-base">
                  <li>Cart and checkout functionality cookies</li>
                  <li>Session and security cookies</li>
                  <li>Basic preference cookies (e.g., region/language)</li>
                </ul>
              </div>

              <div>
                <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-800">5.2 Analytics & Tracking Disclosure</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-1 text-sm sm:text-base">
                  <li>We do not use behavioral advertising cookies or cross-site tracking technologies.</li>
                  <li>We do not sell or share personal data for advertising purposes.</li>
                  <li>If analytics or tracking tools (such as conversion tracking or performance measurement tools) are implemented in the future, they will be clearly disclosed in this policy.</li>
                </ul>
              </div>

              <div>
                <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-800">5.3 Third-Party Technologies</h3>
                <p className="text-gray-600 text-sm sm:text-base">
                  Some third-party service providers (such as payment processors or hosting services) may use limited technical cookies necessary for their functionality.
                </p>
              </div>

              <div>
                <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-800">5.4 Cookie Consent & Control</h3>
                <p className="text-gray-600 mb-3 font-medium text-sm sm:text-base">You have full control over cookie usage:</p>
                <ul className="list-disc list-inside text-gray-600 space-y-1 text-sm sm:text-base">
                  <li>You can accept or reject non-essential cookies through our cookie banner (if applicable)</li>
                  <li>You can disable cookies via browser settings</li>
                  <li>You can manage preferences through your device settings</li>
                </ul>
                <p className="text-gray-600 mt-3 text-sm">
                  ⚠️ <strong>Note:</strong> Disabling essential cookies may impact website functionality (e.g., checkout process).
                </p>
              </div>
            </div>
          </div>

          {/* 6. Your Privacy Rights */}
          <div className="space-y-4">
            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900">6. Your Privacy Rights</h2>
            <p className="text-gray-600 leading-relaxed mb-4 text-sm sm:text-base">
              Depending on your location (including Canada and certain U.S. states), you may have the following rights:
            </p>
            <div className="bg-indigo-50 rounded-lg p-4 border-l-4 border-indigo-500">
              <ul className="list-disc list-inside text-gray-600 space-y-1 mb-4 text-sm sm:text-base">
                <li>Access your personal data</li>
                <li>Request correction of inaccurate data</li>
                <li>Request deletion of your data</li>
                <li>Restrict or object to data processing</li>
                <li>Withdraw consent</li>
                <li>Request data portability</li>
              </ul>
              <p className="text-gray-700 font-medium text-sm sm:text-base">To exercise your rights:</p>
              <p className="text-gray-600 mt-2 text-sm sm:text-base">
                📧 <a href="mailto:support@printsbasket.com" className="text-blue-600 underline">support@printsbasket.com</a>
              </p>
              <p className="text-gray-600 mt-3 text-sm">
                We respond to verified requests within 30 days.
              </p>
            </div>
          </div>

          {/* 7. Opt-Out Options */}
          <div className="space-y-4">
            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900">7. Opt-Out Options</h2>
            
            <div className="pl-4 space-y-4 border-l-4 border-blue-300">
              <div>
                <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-800">7.1 Email Communications</h3>
                <p className="text-gray-600 mb-3 text-sm sm:text-base">You may opt out of non-essential emails by:</p>
                <ul className="list-disc list-inside text-gray-600 space-y-1 text-sm sm:text-base">
                  <li>Clicking "Unsubscribe" in emails</li>
                  <li>Contacting us directly</li>
                </ul>
                <p className="text-gray-600 mt-3 text-sm italic">
                  Transactional emails (order updates, invoices) will still be sent as necessary.
                </p>
              </div>

              <div>
                <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-800">7.2 Tracking & Cookies</h3>
                <p className="text-gray-600 mb-3 text-sm sm:text-base">You can:</p>
                <ul className="list-disc list-inside text-gray-600 space-y-1 text-sm sm:text-base">
                  <li>Disable cookies via browser settings</li>
                  <li>Reject non-essential cookies (if enabled)</li>
                  <li>Limit tracking through device or browser privacy controls</li>
                </ul>
              </div>
            </div>
          </div>

          {/* 8. Data Retention */}
          <div className="space-y-4">
            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900">8. Data Retention</h2>
            <p className="text-gray-600 leading-relaxed mb-4 text-sm sm:text-base">
              We retain personal data only as long as necessary to:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-1 pl-4 text-sm sm:text-base">
              <li>Complete transactions</li>
              <li>Provide customer support</li>
              <li>Meet legal obligations</li>
              <li>Prevent fraud</li>
            </ul>
            <p className="text-gray-600 mt-4 text-sm sm:text-base">
              Data is securely deleted or anonymized when no longer required.
            </p>
          </div>

          {/* 9. Data Security */}
          <div className="space-y-4">
            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900">9. Data Security</h2>
            <p className="text-gray-600 leading-relaxed mb-4 text-sm sm:text-base">
              We implement industry-standard safeguards:
            </p>
            <div className="bg-gradient-to-r from-blue-50 to-blue-50 rounded-lg p-4 border border-gray-200 mb-4">
              <ul className="list-disc list-inside text-gray-600 space-y-1 text-sm sm:text-base">
                <li>HTTPS/TLS encryption</li>
                <li>Secure servers and firewalls</li>
                <li>Access controls</li>
                <li>Regular monitoring and audits</li>
                <li>PCI DSS–compliant payment systems</li>
              </ul>
            </div>
          </div>

          {/* 10. Third-Party Links */}
          <div className="space-y-4">
            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900">10. Third-Party Links</h2>
            <p className="text-gray-600 leading-relaxed mb-3 text-sm sm:text-base">
              Our website may contain links to external sites. We are not responsible for their privacy practices. Please review their policies before sharing information.
            </p>
          </div>

          {/* 11. Children's Privacy */}
          <div className="space-y-4">
            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900">11. Children's Privacy</h2>
            <p className="text-gray-600 leading-relaxed mb-3 text-sm sm:text-base">
              We do not knowingly collect data from children under 13. If such data is identified, it will be removed promptly.
            </p>
          </div>

          {/* 12. Policy Updates */}
          <div className="space-y-4">
            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900">12. Policy Updates</h2>
            <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
              We may update this Privacy Policy periodically. Changes will be posted with a revised "Last Updated" date.
            </p>
          </div>

          {/* 13. Contact Us */}
          <div className="space-y-4 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-6 text-white">
            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold">13. Contact Us</h2>
            <p className="leading-relaxed text-sm sm:text-base">
              For any privacy-related inquiries, data requests, or concerns, you may contact us using the details below:
            </p>
            <div className="space-y-2 text-blue-50 text-sm sm:text-base">
              <p><strong>Prints Basket (16904599 CANADA INC)</strong></p>
              <p>📧 <strong>Email:</strong> <a href="mailto:support@printsbasket.com" className="underline hover:text-white">support@printsbasket.com</a></p>
              <p>📞 <strong>Phone:</strong> +1 (888) 322-5251</p>
              <p>📍 <strong>Address:</strong> 95 Broadacre Dr, Kitchener, ON N2R 0S5, Canada</p>
            </div>
            <p className="text-blue-100 mt-4 text-sm sm:text-base">
              We are committed to responding promptly and handling all privacy-related requests in accordance with applicable data protection laws.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default PrivacyPolicy;

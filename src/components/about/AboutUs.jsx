import React from "react";
import { CheckCircle2, Globe, Package, Users, Zap, Shield, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

const AboutUs = () => {
  return (
    <div className="w-full bg-white">
      {/* Header Section */}
      {/* <section className="py-8 sm:py-12 lg:py-16 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">
            About Us — Prints Basket
          </h1>
          <div className="w-16 sm:w-24 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full"></div>
        </div>
      </section> */}

      {/* An Independent eCommerce Retailer */}
      <section className="py-8 sm:py-12 lg:py-16 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-6 sm:mb-8 text-center sm:text-left">
            An Independent eCommerce Retailer
          </h2>

          <div className="space-y-4 sm:space-y-6">
            <p className="text-sm sm:text-base lg:text-lg text-gray-700 leading-relaxed">
              <strong>16904599 CANADA INC, DBA Prints Basket</strong>, based in Kitchener, Ontario, Canada, operates as an independent online retailer focused exclusively on printers and related equipment for home, office, and professional use.
            </p>

            <p className="text-sm sm:text-base lg:text-lg text-gray-700 leading-relaxed">
              Serving customers across the United States and Canada, the platform supports both individual users and businesses with reliable printing solutions and a structured online shopping experience.
            </p>

            <p className="text-sm sm:text-base lg:text-lg text-gray-700 leading-relaxed">
              We are not a marketplace or a multi-seller platform. Every product available on the website is sourced through verified distribution channels and managed directly under our operational responsibility.
            </p>

            <p className="text-sm sm:text-base lg:text-lg text-gray-700 leading-relaxed">
              This approach allows for better control over product accuracy, availability, and fulfillment, ensuring customers interact with a single, accountable retailer rather than multiple sellers with inconsistent policies.
            </p>

            <div className="bg-blue-50 rounded-lg sm:rounded-xl p-4 sm:p-6 border-l-4 border-blue-600 mt-6">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">To Enhance the Overall Experience, We Provide:</h3>
              <ul className="space-y-2 sm:space-y-3">
                <li className="flex items-start gap-2 sm:gap-3">
                  <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm lg:text-base text-gray-700">Free shipping across the United States and Canada</span>
                </li>
                <li className="flex items-start gap-2 sm:gap-3">
                  <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm lg:text-base text-gray-700">Manufacturer warranty on all products (where applicable)</span>
                </li>
                <li className="flex items-start gap-2 sm:gap-3">
                  <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm lg:text-base text-gray-700">Support for both business and home customers</span>
                </li>
              </ul>
            </div>

            <p className="text-sm sm:text-base lg:text-lg text-gray-700 leading-relaxed italic">
              The focus is on delivering a clear, reliable, and professional purchasing experience from product selection through delivery.
            </p>
          </div>
        </div>
      </section>

      {/* Registered & Legitimate Business */}
      <section className="py-8 sm:py-12 lg:py-16 bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-6 sm:mb-8">
            Registered & Legitimate Business
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-md border border-gray-200 flex items-start gap-3 sm:gap-4">
              <Shield className="w-8 h-8 sm:w-10 sm:h-10 text-blue-600 flex-shrink-0 mt-1" />
              <div className="min-w-0">
                <p className="text-xs sm:text-sm lg:text-base text-gray-700 leading-relaxed">
                  Prints Basket operates under a registered Canadian business entity, ensuring that all operations—from product listings to order fulfillment and customer support—are conducted through a structured and accountable business framework.
                </p>
              </div>
            </div>

            <div className="bg-blue-50 rounded-lg sm:rounded-xl p-4 sm:p-6 border border-blue-200">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3">Business Entity</h3>
              <p className="text-xs sm:text-sm lg:text-base text-gray-700 font-semibold mb-2">16904599 CANADA INC</p>
              <p className="text-xs sm:text-sm lg:text-base text-gray-700">DBA Prints Basket</p>
            </div>
          </div>
        </div>
      </section>

      {/* Business Information */}
      <section className="py-8 sm:py-12 lg:py-16 bg-gradient-to-br from-blue-900 to-indigo-900 text-white">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 sm:gap-8 mb-6 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center sm:text-left">Business Information</h2>
            <a
              href="https://ised-isde.canada.ca/cc/lgcy/fdrlCrpDtls.html?lang=eng&corpId=16904599"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-base sm:text-lg font-semibold text-blue-300 hover:text-blue-100 transition border-b-2 border-blue-300 hover:border-blue-100 pb-1 hover:scale-105 transform duration-300"
            >
              <CheckCircle2 size={24} className="flex-shrink-0" />
              <span>Registered & Legitimate Business</span>
              <Shield size={24} className="flex-shrink-0" />
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <div className="bg-white/10 backdrop-blur rounded-lg sm:rounded-xl p-4 sm:p-6 border border-white/20">
              <h3 className="text-base sm:text-lg font-semibold mb-3">Company</h3>
              <p className="text-xs sm:text-sm leading-relaxed text-blue-100 font-semibold">16904599 CANADA INC</p>
              <p className="text-xs sm:text-sm leading-relaxed text-blue-100">DBA Prints Basket</p>
            </div>

            <div className="bg-white/10 backdrop-blur rounded-lg sm:rounded-xl p-4 sm:p-6 border border-white/20">
              <h3 className="text-base sm:text-lg font-semibold mb-3">Address</h3>
              <p className="text-xs sm:text-sm leading-relaxed text-blue-100">
                95 Broadacre Dr<br />
                Kitchener, ON N2R 0S5<br />
                Canada
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur rounded-lg sm:rounded-xl p-4 sm:p-6 border border-white/20">
              <h3 className="text-base sm:text-lg font-semibold mb-3">Email</h3>
              <p className="text-xs sm:text-sm leading-relaxed text-blue-100">support@printsbasket.com</p>
            </div>

            <div className="bg-white/10 backdrop-blur rounded-lg sm:rounded-xl p-4 sm:p-6 border border-white/20">
              <h3 className="text-base sm:text-lg font-semibold mb-3">Website</h3>
              <p className="text-xs sm:text-sm leading-relaxed text-blue-100">www.printsbasket.com</p>
            </div>
          </div>
        </div>
      </section>

      {/* Focused on Practical Printer Use */}
      <section className="py-8 sm:py-12 lg:py-16 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="mb-6 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 flex items-center gap-3">
              <Zap className="w-8 h-8 sm:w-10 sm:h-10 text-blue-600 flex-shrink-0" />
              Focused on Practical Printer Use
            </h2>
          </div>

          <div className="space-y-4 sm:space-y-6">
            <p className="text-sm sm:text-base lg:text-lg text-gray-700 leading-relaxed">
              Printers are not simple purchases. They are selected based on workload, compatibility, consumables, and long-term usability.
            </p>

            <p className="text-sm sm:text-base lg:text-lg text-gray-700 leading-relaxed">
              Our goal is to simplify this process by focusing only on products that serve clear and practical use cases. Instead of listing hundreds of similar options, products are organized in a way that helps customers quickly identify what fits their needs—based on usage, environment, and performance—without unnecessary complexity.
            </p>
          </div>
        </div>
      </section>

      {/* Accuracy Over Promotion */}
      <section className="py-8 sm:py-12 lg:py-16 bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-6 sm:mb-8">
            Accuracy Over Promotion
          </h2>

          <div className="space-y-4 sm:space-y-6">
            <p className="text-sm sm:text-base lg:text-lg text-gray-700 leading-relaxed">
              Product listings are designed to inform, not persuade. Specifications, compatibility details, and features are presented clearly and factually. We avoid exaggerated claims, unclear language, or promises that cannot be consistently verified.
            </p>

            <p className="text-sm sm:text-base lg:text-lg text-gray-700 leading-relaxed">
              This allows customers to make decisions based on real product information rather than marketing language.
            </p>
          </div>
        </div>
      </section>

      {/* Structured Fulfillment & Logistics */}
      <section className="py-8 sm:py-12 lg:py-16 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="mb-6 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 flex items-center gap-3">
              <Package className="w-8 h-8 sm:w-10 sm:h-10 text-blue-600 flex-shrink-0" />
              Structured Fulfillment & Logistics
            </h2>
          </div>

          <div className="space-y-4 sm:space-y-6">
            <p className="text-sm sm:text-base lg:text-lg text-gray-700 leading-relaxed">
              Orders are handled through established processes designed to maintain consistency and reliability. Products are shipped as factory-sealed units and packaged carefully to reduce the risk of damage during transit.
            </p>

            <p className="text-sm sm:text-base lg:text-lg text-gray-700 leading-relaxed">
              Delivery timelines are communicated based on realistic expectations. While external factors may occasionally affect shipping, the focus remains on providing clear and accurate information at every stage.
            </p>
          </div>
        </div>
      </section>

      {/* How We Work */}
      <section className="py-8 sm:py-12 lg:py-16 bg-gradient-to-br from-blue-50 to-indigo-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2 text-center sm:text-left">How We Work</h2>
          <p className="text-sm sm:text-base lg:text-lg text-gray-700 mb-6 sm:mb-8 leading-relaxed">
            Every part of the process is built around clarity and consistency—from product selection to post-purchase support.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {[
              {
                title: "Product Evaluation & Selection",
                desc: "Before a product is listed, it is evaluated based on availability, intended use, consumable access, and long-term usability. Products are selected for their relevance, not just to expand the catalog. This ensures customers see practical and useful options rather than overwhelming choices."
              },
              {
                title: "Accurate Listings & Documentation",
                desc: "Product pages are structured to provide clear and useful information. Specifications, compatibility details, and usage guidance are presented to help customers understand the product—not to promote it unnecessarily."
              },
              {
                title: "Transparent Pricing & Checkout",
                desc: "Pricing reflects actual value based on sourcing and logistics. There are no artificial discounts or misleading offers. Customers see clear pricing without hidden fees or unexpected conditions. The checkout process is simple, direct, and easy to follow."
              },
              {
                title: "Order Handling & Fulfillment",
                desc: "Orders are processed through a consistent and reliable workflow. Products are packed securely and shipped through trusted carriers. Inventory is managed to reflect real-time availability. Shipping timelines are shared clearly to avoid confusion or unrealistic expectations."
              },
              {
                title: "Customer Communication",
                desc: "Communication is handled in a clear and structured manner. Support is available for product inquiries, order updates, and post-purchase assistance, with a focus on accurate and helpful responses."
              },
              {
                title: "Policy-Driven Operations",
                desc: "Returns, refunds, and order-related processes are handled according to clearly defined policies. This ensures consistency and helps customers understand what to expect at every stage."
              }
            ].map((item, idx) => (
              <div key={idx} className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-md hover:shadow-lg transition-shadow">
                <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-xs sm:text-sm lg:text-base text-gray-700 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What Makes Prints Basket Different */}
      <section className="py-8 sm:py-12 lg:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-6 sm:mb-8 text-center sm:text-left">
            What Makes Prints Basket Different
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {[
              {
                icon: TrendingUp,
                title: "Focused Catalog, Not Overloaded Listings",
                desc: "Many online stores list a large number of similar products, which can make choosing difficult. Our catalog is intentionally selective, ensuring each product serves a clear purpose—whether for home use, office work, or professional environments."
              },
              {
                icon: Globe,
                title: "Clarity Over Marketing Language",
                desc: "Product information is presented clearly and factually. Instead of relying on promotional language, listings focus on real-world usage, compatibility, and performance so customers can make informed decisions."
              },
              {
                icon: CheckCircle2,
                title: "Long-Term Usability in Mind",
                desc: "Product selection considers long-term usage, including consumable availability and ongoing support. This helps reduce post-purchase issues and ensures better reliability over time."
              },
              {
                icon: Shield,
                title: "Clear Responsibility",
                desc: "All operations—from product listings to order fulfillment and customer support—are handled within a single system. Customers know exactly who they are buying from and who is responsible for the process."
              },
              {
                icon: Users,
                title: "Predictable Process",
                desc: "Delivery timelines and order handling are based on realistic expectations rather than best-case scenarios. This helps create a more predictable and reliable experience."
              },
              {
                icon: Zap,
                title: "Built for Informed Buyers",
                desc: "Prints Basket is designed for customers who value clarity, accuracy, and reliability. The focus is on helping users make informed decisions without pressure, confusion, or unnecessary complexity."
              }
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg sm:rounded-xl p-4 sm:p-6 border border-blue-200 hover:shadow-md transition-shadow">
                  <div className="flex items-start gap-3 sm:gap-4 mb-3">
                    <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-blue-600 flex-shrink-0 mt-0.5" />
                    <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-gray-900">{item.title}</h3>
                  </div>
                  <p className="text-xs sm:text-sm lg:text-base text-gray-700 leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-8 sm:py-12 lg:py-16 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4">
            Start Your Shopping Experience
          </h2>
          <p className="text-xs sm:text-sm lg:text-base mb-6 sm:mb-8 opacity-95 max-w-2xl mx-auto">
            Discover a focused selection of quality printers backed by our commitment to accuracy, reliability, and clear communication.
          </p>
          <Link to="/shop" className="inline-block bg-white text-blue-600 font-semibold px-6 sm:px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors text-sm sm:text-base">
            Shop Now
          </Link>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;

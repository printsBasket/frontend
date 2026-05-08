import React from 'react';
import { Link } from 'react-router-dom';
import ContactForm from './ContactForm';
import SEO from '../common/SEO';

const ContactMain = () => {
  return (
    <section className="w-full bg-gray-50">
      <SEO
          title="Contact Us"
          description="Get in touch with PrintsBasket. We're here to help with your printer and printing supply needs. Email, phone, or send us a message."
          canonical="/contact-us"
      />
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-10 sm:py-14 lg:py-16">
        
        {/* Breadcrumb */}
        <div className="text-center mb-12">
          <p className="text-gray-600 mb-8">
            <Link to="/" className="text-blue-600 hover:text-blue-700">Home</Link> / Contact Us
          </p>

          {/* Header */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-600 mb-4">
            Contact Us
          </h1>
          <div className="h-1 w-24 bg-gradient-to-r from-blue-500 to-blue-500 mx-auto mb-6"></div>
          <p className="text-base sm:text-lg lg:text-xl text-gray-700 font-semibold mb-4">Have questions? Get in touch!</p>
          <p className="max-w-2xl mx-auto text-gray-600 text-sm sm:text-base">
            At Prints Basket, we are committed to providing clear, helpful, and timely support for all product and order-related inquiries. Whether you need assistance with an order, have questions about a product, or want more information about our policies, our team is here to help.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 mt-8 sm:mt-12">
          
          {/* Contact Information */}
          <div className="space-y-8">
            <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 border border-gray-200">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Get In Touch</h2>

              {/* Address */}
              <div className="mb-6 pb-6 border-b border-gray-200">
                <div className="flex items-start">
                  <span className="text-2xl mr-4">📍</span>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Address</h3>
                    <p className="text-gray-600">95 Broadacre Dr<br/>Kitchener, ON N2R 0S5, Canada</p>
                  </div>
                </div>
              </div>

              {/* Phone */}
              <div className="mb-6 pb-6 border-b border-gray-200">
                <div className="flex items-start">
                  <span className="text-2xl mr-4">📞</span>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Phone</h3>
                    <p className="text-gray-600"><a href="tel:+18883225251" className="text-blue-600 hover:text-blue-700">+1 (888) 322-5251</a></p>
                  </div>
                </div>
              </div>

              {/* Email */}
              <div>
                <div className="flex items-start">
                  <span className="text-2xl mr-4">📧</span>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Email</h3>
                    <p className="text-gray-600"><a href="mailto:support@printsbasket.com" className="text-blue-600 hover:text-blue-700">support@printsbasket.com</a></p>
                  </div>
                </div>
              </div>
            </div>

            {/* Live Chat Support */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg shadow-md p-4 sm:p-6 border border-blue-200">
              <div className="flex items-center mb-4">
                <span className="text-2xl sm:text-3xl mr-3">💬</span>
                <h3 className="text-base sm:text-lg lg:text-xl font-bold text-blue-900">Live Chat Support</h3>
              </div>
              <p className="text-gray-700 mb-4">Get instant assistance right on our website. Live chat is available for:</p>
              <ul className="space-y-2 text-gray-700 mb-4">
                <li className="flex items-center"><span className="text-blue-600 mr-2">•</span> Product inquiries</li>
                <li className="flex items-center"><span className="text-blue-600 mr-2">•</span> Order status questions</li>
                <li className="flex items-center"><span className="text-blue-600 mr-2">•</span> Return & refund support</li>
                <li className="flex items-center"><span className="text-blue-600 mr-2">•</span> General shopping concerns</li>
              </ul>
              <p className="text-sm text-gray-600">Visit: <span className="font-semibold">www.printsbasket.com</span></p>
            </div>

            {/* Support Hours */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg shadow-md p-4 sm:p-6 border border-green-200">
              <div className="flex items-center mb-4">
                <span className="text-2xl sm:text-3xl mr-3">🕐</span>
                <h3 className="text-base sm:text-lg lg:text-xl font-bold text-green-900">Customer Support Hours</h3>
              </div>
              <p className="text-gray-700 mb-4">We're available to help during:</p>
              <div className="space-y-2 text-gray-700">
                <p><strong>Monday – Friday:</strong> 9 AM – 6 PM</p>
                <p><strong>Saturday:</strong> 10 AM – 4 PM</p>
                <p><strong>Sunday:</strong> Closed</p>
              </div>
              <p className="text-sm text-gray-600 mt-3 italic">(Availability may vary on holidays.)</p>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <ContactForm />
          </div>
        </div>

        {/* Additional Support Section */}
        <div className="mt-10 sm:mt-14 lg:mt-16 bg-gradient-to-r from-amber-50 to-blue-50 rounded-lg shadow-md p-4 sm:p-6 lg:p-8 border border-blue-200">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Additional Support</h2>
          <p className="text-gray-700 mb-4 sm:mb-6 text-sm sm:text-base">You may also contact us if you need help with:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start">
              <span className="text-blue-600 mr-3 text-xl">✓</span>
              <p className="text-gray-700">Return or refund requests</p>
            </div>
            <div className="flex items-start">
              <span className="text-blue-600 mr-3 text-xl">✓</span>
              <p className="text-gray-700">Shipping or delivery questions</p>
            </div>
            <div className="flex items-start">
              <span className="text-blue-600 mr-3 text-xl">✓</span>
              <p className="text-gray-700">Product details or compatibility</p>
            </div>
            <div className="flex items-start">
              <span className="text-blue-600 mr-3 text-xl">✓</span>
              <p className="text-gray-700">Policy information (Shipping, Returns, Warranty, Privacy)</p>
            </div>
          </div>
          <p className="text-gray-700 mt-6 italic">We aim to provide clear and reliable responses for a smooth customer experience.</p>
        </div>

      </div>
    </section>
  );
};

export default ContactMain;

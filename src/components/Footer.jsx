import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { MapPin, Mail, Phone } from "lucide-react";

const Footer = () => {



useEffect(() => {
    const sealDiv = document.getElementById("siteseal");
    if (!sealDiv) return;

    // Prevent multiple script loads
    if (window._godaddySealLoaded || sealDiv.innerHTML.trim() !== '') return;
    
    const loadSeal = () => {
      try {
        const script = document.createElement("script");
        script.src = "https://seal.godaddy.com/getSealBasic?sealID=3cUA1XaqHzZ1nqhWZ2f3ZtcXx4KUQ725FR4F4VIpr8rZBF6Wd5EZMgSqErsT";
        script.async = true;
        script.onerror = () => console.error("Failed to load GoDaddy seal");

        script.onload = () => {
          window._godaddySealLoaded = true;
        };

        sealDiv.appendChild(script);
      } catch (error) {
        console.error("Error loading GoDaddy seal:", error);
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          loadSeal();
          observer.disconnect();
        }
      },
      { rootMargin: "200px" }
    );
    observer.observe(sealDiv);

    return () => {
      observer.disconnect();
      // Cleanup on unmount
      if (sealDiv && window._godaddySealLoaded) {
        const scripts = sealDiv.querySelectorAll('script');
        scripts.forEach(s => {
          if (s.src.includes('godaddy')) {
            try { s.parentNode?.removeChild(s); } catch (e) {}
          }
        });
      }
    };
  }, []);
  return (
    <footer className="bg-gradient-to-br from-black via-[#0b0b0b] to-[#3b1f00] text-white pt-8 sm:pt-10 lg:pt-12 pb-6 sm:pb-8 w-full">

      {/* TOP SECTION - Main Links & Contact */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 mb-8">

        {/* LOGO + COMPANY INFO */}
        <div>
          <img
            src="/logo-bgremove-224.png"
            alt="Prints Basket Logo"
            width="224"
            height="54"
            className="block w-32 h-auto mb-4 object-contain"
            loading="lazy"
          />
          <h4 className="font-bold text-base sm:text-lg mb-2">Prints Basket</h4>
          <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
            Independent retailer for printers and printing solutions across North America.
          </p>
        </div>

        {/* POLICIES */}
        <div>
          <h3 className="font-semibold mb-4 text-base sm:text-lg">Policies</h3>
          <ul className="space-y-2 text-gray-300 text-sm sm:text-base">
            <li><Link to="/privacy-policy" className="hover:text-blue-400 transition">Privacy Policy</Link></li>
            <li><Link to="/terms-and-conditions" className="hover:text-blue-400 transition">Terms & Conditions</Link></li>
            <li><Link to="/return-exchange-policy" className="hover:text-blue-400 transition">Return & Exchange</Link></li>
            <li><Link to="/shipping-policy" className="hover:text-blue-400 transition">Shipping Policy</Link></li>
            <li><Link to="/cookie-policy" className="hover:text-blue-400 transition">Cookie Policy</Link></li>
            <li><Link to="/refund-return-policy" className="hover:text-blue-400 transition">Refund Policy</Link></li>
          </ul>
        </div>

        {/* LINKS */}
        <div>
          <h3 className="font-semibold mb-4 text-base sm:text-lg">Company</h3>
          <ul className="space-y-2 text-gray-300 text-sm sm:text-base">
            <li><Link to="/shop" className="hover:text-blue-400 transition">Shop</Link></li>
            <li><Link to="/about" className="hover:text-blue-400 transition">About Us</Link></li>
            <li><Link to="/blogs" className="hover:text-blue-400 transition">Blogs</Link></li>
            <li><Link to="/faq" className="hover:text-blue-400 transition">FAQ</Link></li>
            <li><Link to="/track-order" className="hover:text-blue-400 transition">Track Order</Link></li>
            <li><Link to="/contact-us" className="hover:text-blue-400 transition">Support</Link></li>
          </ul>
        </div>

        {/* CONTACT */}
        <div>
          <h3 className="font-semibold mb-4 text-base sm:text-lg">Contact Us</h3>
          <div className="space-y-3 text-gray-300 text-sm sm:text-base">
            <div>
              <p className="font-semibold text-white">Prints Basket (16904599 CANADA INC.)</p>
            </div>
            <div className="flex items-start gap-2">
              <MapPin size={14} className="mt-0.5 flex-shrink-0" />
              <p>95 Broadacre Dr, Kitchener, ON N2R 0S5, Canada</p>
            </div>
            <div className="flex items-center gap-2">
              <Mail size={14} className="flex-shrink-0" />
              <p>support@printsbasket.com</p>
            </div>
            <div className="flex items-center gap-2">
              <Phone size={14} className="flex-shrink-0" />
              <p>+1 (888) 322-5251</p>
            </div>
          </div>

          {/* Security Badge */}
          <div className="mt-4">
            <div id="siteseal" className="min-h-[62px]"></div>
          </div>
        </div>

      </div>

      {/* DISCLAIMER SECTION */}
      <div className="border-t border-gray-700 pt-8 mt-8">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          <div className="bg-gray-900/50 rounded-lg p-4 sm:p-6 border border-gray-800">
            <h3 className="text-base sm:text-lg font-semibold text-blue-400 mb-4">Important Notice</h3>
            <div className="space-y-4 text-gray-300 text-sm sm:text-base leading-relaxed">
              <p>
                <strong>Trademarks & Product Information:</strong> All product names, images, brand logos, and trademarks displayed on this website are the property of their respective owners and are used solely for identification and compatibility purposes. 16904599 CANADA INC, DBA Prints Basket operates as an independent e-commerce retailer and is not affiliated with, endorsed by, or sponsored by any manufacturer unless explicitly stated.
              </p>
              <p>
                <strong>Product Availability & Accuracy:</strong> Product availability, specifications, and pricing are subject to change without prior notice. While we make every effort to ensure that information on this website is accurate and up to date, Prints Basket does not guarantee that all content is complete, current, or free from errors.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 mt-8 pt-6 border-t border-gray-700 flex flex-col sm:flex-row justify-between items-center text-gray-400 text-sm sm:text-base gap-4">

        <p>PrintsBasket © 2026. All rights reserved.</p>

        <div className="flex gap-4 flex-wrap justify-center sm:justify-end">
          <Link to="/do-not-sell" className="hover:text-blue-400 transition">
            Do Not Sell
          </Link>
          <span className="text-gray-600">|</span>
          <Link to="/eula" className="hover:text-blue-400 transition">
            EULA
          </Link>
          <span className="text-gray-600">|</span>
          <Link to="/disclaimer" className="hover:text-blue-400 transition">
            Disclaimer
          </Link>
        </div>

      </div>

    </footer>
  );
};

export default Footer;

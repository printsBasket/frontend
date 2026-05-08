import React, { useState } from "react";
import { ShoppingCart, Search, User, X, Menu } from "lucide-react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/actions/userActions";
import AuthDrawer from "./AuthDrawer";

const Header = () => {
  const [authOpen, setAuthOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const logoutHandler = () => {
    dispatch(logout());
    setIsUserMenuOpen(false);
    navigate("/");
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery)}`);
      setIsSearchOpen(false);
      setSearchQuery("");
    }
  };

  const handleSearchClick = () => {
    setIsSearchOpen(true);
  };

  const navItem =
    "relative after:absolute after:left-0 after:-bottom-2 after:h-[2px] after:bg-black after:w-0 after:transition-all after:duration-300";

  return (
    <>
      <header className="w-full bg-white border-b">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-3 sm:px-4 lg:px-6 py-3 sm:py-4 lg:py-5">

          {/* LOGO */}
          <NavLink to="/" aria-label="Go to homepage">
            <img src="/logo-bgremove-224.png" alt="Prints Basket Logo" width="224" height="54" className="block w-32 h-auto object-contain" loading="eager" />
          </NavLink>

          {/* DESKTOP NAV */}
          <nav className="hidden md:flex gap-6 lg:gap-10 text-gray-700 font-medium text-[15px]">
            <NavLink to="/" className={({ isActive }) =>
              `${navItem} ${isActive ? "text-black after:w-full" : "hover:text-[#2364EB]"}`
            }>Home</NavLink>

            <NavLink to="/about" className={({ isActive }) =>
              `${navItem} ${isActive ? "text-black after:w-full" : "hover:text-[#2364EB]"}`
            }>About Us</NavLink>

            <NavLink to="/shop" className={({ isActive }) =>
              `${navItem} ${isActive ? "text-black after:w-full" : "hover:text-[#2364EB]"}`
            }>Shop</NavLink>

            <NavLink to="/contact-us" className={({ isActive }) =>
              `${navItem} ${isActive ? "text-black after:w-full" : "hover:text-[#2364EB]"}`
            }>Contact Us</NavLink>
          </nav>

          {/* RIGHT ICONS */}
          <div className="flex items-center gap-4 md:gap-6">

            <button
              onClick={handleSearchClick}
              className="hover:text-blue-500 transition-colors"
              aria-label="Search products"
            >
              <Search size={22} />
            </button>

            {userInfo ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-2 p-1 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold text-sm uppercase">
                    {userInfo.firstName?.charAt(0) || userInfo.name?.charAt(0)}
                  </div>
                  <span className="hidden sm:block text-sm font-medium text-gray-700">{userInfo.firstName || userInfo.name}</span>
                </button>

                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50 animate-in fade-in zoom-in-95 duration-200">
                    <div className="px-4 py-3 border-b border-gray-100 mb-1">
                      <p className="text-xs text-gray-500">Signed in as</p>
                      <p className="text-sm font-semibold text-gray-800 truncate">{userInfo.email}</p>
                    </div>
                    {userInfo.isAdmin ? (
                      <Link
                        to="/admin/dashboard"
                        className="block px-4 py-2 text-sm text-blue-600 font-bold hover:bg-blue-50 transition-colors"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        Admin Dashboard
                      </Link>
                    ) : (
                      <Link
                        to="/profile"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        My Profile
                      </Link>
                    )}
                    <button
                      onClick={logoutHandler}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors border-t border-gray-100 mt-1"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button aria-label="Login or register" className="bg-transparent border-none p-0 cursor-pointer" onClick={() => setAuthOpen(true)}>
                <User size={22} />
              </button>
            )}

            <div className="relative cursor-pointer">
              <NavLink to="/cart" aria-label="Shopping cart"><ShoppingCart size={22} /></NavLink>
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 text-[10px] bg-blue-500 text-white px-1.5 rounded-full font-bold">
                  {cartItems.reduce((acc, item) => acc + item.qty, 0)}
                </span>
              )}
            </div>

            {/* MOBILE MENU ICON */}
            <button
              aria-label="Open menu"
              className="md:hidden cursor-pointer bg-transparent border-none p-0"
              onClick={() => setMobileMenuOpen(true)}
            >
              <Menu size={22} />
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE MENU */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-black/40 z-50 flex">
          <div className="bg-white w-3/4 max-w-xs h-full p-6 relative flex flex-col">
            <button
              aria-label="Close menu"
              className="absolute top-4 right-4 cursor-pointer text-gray-500 bg-transparent border-none p-0"
              onClick={() => setMobileMenuOpen(false)}
            >
              <X size={24} />
            </button>
            
            <nav className="flex flex-col gap-4 mt-8 flex-1">
              <NavLink to="/" onClick={() => setMobileMenuOpen(false)} className="text-gray-700 font-medium hover:text-blue-500">Home</NavLink>
              <NavLink to="/about" onClick={() => setMobileMenuOpen(false)} className="text-gray-700 font-medium hover:text-blue-500">About Us</NavLink>
              <NavLink to="/shop" onClick={() => setMobileMenuOpen(false)} className="text-gray-700 font-medium hover:text-blue-500">Shop</NavLink>
              <NavLink to="/contact-us" onClick={() => setMobileMenuOpen(false)} className="text-gray-700 font-medium hover:text-blue-500">Contact Us</NavLink>
            </nav>

            {/* Mobile Profile Section */}
            {userInfo ? (
              <div className="mt-auto pt-6 border-t border-gray-200">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold text-sm uppercase">
                    {userInfo.firstName?.charAt(0) || userInfo.name?.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-800">{userInfo.firstName || userInfo.name}</p>
                    <p className="text-xs text-gray-500">{userInfo.email}</p>
                  </div>
                </div>
                <div className="space-y-2">
                  {userInfo.isAdmin ? (
                    <Link
                      to="/admin/dashboard"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block w-full px-3 py-2 text-sm text-blue-600 font-bold hover:bg-blue-50 rounded transition-colors"
                    >
                      Admin Dashboard
                    </Link>
                  ) : (
                    <Link
                      to="/profile"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded transition-colors"
                    >
                      My Profile
                    </Link>
                  )}
                  <button
                    onClick={() => {
                      logoutHandler();
                      setMobileMenuOpen(false);
                    }}
                    className="w-full px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded transition-colors text-left font-medium"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <div className="mt-auto pt-6 border-t border-gray-200">
                <button
                  onClick={() => {
                    setAuthOpen(true);
                    setMobileMenuOpen(false);
                  }}
                  className="w-full px-3 py-2 bg-blue-500 text-white rounded font-medium hover:bg-blue-600 transition-colors"
                >
                  Login / Register
                </button>
              </div>
            )}
          </div>
          <div
            className="flex-1"
            onClick={() => setMobileMenuOpen(false)}
          ></div>
        </div>
      )}

      {/* AUTH DRAWER */}
      <AuthDrawer isOpen={authOpen} onClose={() => setAuthOpen(false)} />

      {/* SEARCH MODAL */}
      {isSearchOpen && (
        <div className="fixed inset-0 bg-black/40 z-[60] flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl p-4 sm:p-6 relative animate-in fade-in zoom-in-95 duration-200">
            {/* Close Button */}
            <button
              onClick={() => {
                setIsSearchOpen(false);
                setSearchQuery("");
              }}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors"
              aria-label="Close search"
            >
              <X size={24} />
            </button>

            {/* Search Title */}
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Search Products</h2>

            {/* Search Form */}
            <form onSubmit={handleSearchSubmit} className="flex gap-3">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for printers, ink, toner..."
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                autoFocus
              />
              <button
                type="submit"
                className="bg-gradient-to-r from-blue-600 to-blue-600 text-white px-6 py-3 rounded-lg hover:shadow-lg transition-all font-semibold flex items-center gap-2"
              >
                <Search size={20} />
                <span className="hidden sm:inline">Search</span>
              </button>
            </form>

            {/* Popular Searches */}
            <div className="mt-8">
              <h3 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-4">Popular searches</h3>
              <div className="flex flex-wrap gap-3">
                {['HP Printers', 'Canon Ink', 'Laser Toner', 'Inkjet Cartridges', 'Brother Printer', 'Photo Paper'].map((term) => (
                  <button
                    key={term}
                    onClick={() => {
                      setSearchQuery(term);
                      navigate(`/shop?search=${encodeURIComponent(term)}`);
                      setIsSearchOpen(false);
                    }}
                    className="px-4 py-2 rounded-full bg-gray-100 border border-gray-300 text-gray-700 text-sm font-medium hover:border-blue-500 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;

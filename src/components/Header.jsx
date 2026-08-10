import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiSearch, FiShoppingCart, FiHeart, FiUser, FiMenu, FiX } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useAuth } from '../context/AuthContext';
import logoImage from '../assets/logo.png';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const { getCartCount } = useCart();
  const { wishlistItems } = useWishlist();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } finally {
      setIsMenuOpen(false);
      navigate('/');
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${searchQuery}`);
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      {/* Top Bar - Simplified on Mobile */}
      

      {/* Main Header */}
      <div className="container mx-auto px-4 py-3 md:py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <img 
              src={logoImage} 
              alt="Catalixo Global" 
              className="h-8 md:h-10 w-auto object-contain"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-gray-700 hover:text-primary-600 font-medium transition-colors">
              Home
            </Link>
            <Link to="/products" className="text-gray-700 hover:text-primary-600 font-medium transition-colors">
              Products
            </Link>
            <Link to="/brands" className="text-gray-700 hover:text-primary-600 font-medium transition-colors">
              Brands
            </Link>
            {/* Categories link removed as categories page is not required */}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3 md:gap-4">
            {/* Search - Hidden on small mobile */}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="hidden sm:block text-gray-700 hover:text-primary-600 transition-colors p-2"
              aria-label="Search"
            >
              <FiSearch size={20} />
            </button>

            {/* Wishlist - Slightly smaller on mobile */}
            <Link
              to="/wishlist"
              className="relative text-gray-700 hover:text-primary-600 transition-colors p-2"
              aria-label="Wishlist"
            >
              <FiHeart size={20} />
              {wishlistItems.length > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-4 h-4 md:w-5 md:h-5 flex items-center justify-center font-bold">
                  {wishlistItems.length}
                </span>
              )}
            </Link>

            {/* Cart */}
            <Link
              to="/cart"
              className="relative text-gray-700 hover:text-primary-600 transition-colors p-2"
              aria-label="Shopping Cart"
            >
              <FiShoppingCart size={20} />
              {getCartCount() > 0 && (
                <span className="absolute top-0 right-0 bg-primary-600 text-white text-xs rounded-full w-4 h-4 md:w-5 md:h-5 flex items-center justify-center font-bold">
                  {getCartCount()}
                </span>
              )}
            </Link>

            {/* User Menu - Hidden on mobile, shown in mobile menu */}
            <div className="relative group hidden sm:block">
              <button className="text-gray-700 hover:text-primary-600 transition-colors p-2" aria-label="User menu">
                <FiUser size={20} />
              </button>
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                {user ? (
                  <>
                    <Link to="/profile" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                      My Profile
                    </Link>
                    <Link to="/orders" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                      My Orders
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link to="/login" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                      Login
                    </Link>
                    <Link to="/register" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                      Register
                    </Link>
                  </>
                )}
              </div>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-gray-700 hover:text-primary-600 transition-colors p-2"
              aria-label="Menu"
            >
              {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>

        {/* Search Bar */}
        {isSearchOpen && (
          <div className="mt-4">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Search products, brands..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full input-field pr-10"
                autoFocus
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary-600"
              >
                <FiSearch size={20} />
              </button>
            </form>
          </div>
        )}
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 shadow-lg">
          <nav className="container mx-auto px-4 py-4 flex flex-col gap-2">
            <Link
              to="/"
              onClick={() => setIsMenuOpen(false)}
              className="text-gray-700 hover:text-primary-600 font-medium py-3 px-4 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Home
            </Link>
            <Link
              to="/products"
              onClick={() => setIsMenuOpen(false)}
              className="text-gray-700 hover:text-primary-600 font-medium py-3 px-4 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Products
            </Link>
            <Link
              to="/brands"
              onClick={() => setIsMenuOpen(false)}
              className="text-gray-700 hover:text-primary-600 font-medium py-3 px-4 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Brands
            </Link>
            {/* Categories link removed in mobile menu */}
            
            {/* Mobile-only links */}
            <div className="sm:hidden border-t border-gray-200 mt-2 pt-2">
              <button
                onClick={() => {
                  setIsSearchOpen(true);
                  setIsMenuOpen(false);
                }}
                className="w-full text-left text-gray-700 hover:text-primary-600 font-medium py-3 px-4 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
              >
                <FiSearch size={18} />
                Search
              </button>
              {user ? (
                <>
                  <Link
                    to="/profile"
                    onClick={() => setIsMenuOpen(false)}
                    className="text-gray-700 hover:text-primary-600 font-medium py-3 px-4 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
                  >
                    <FiUser size={18} />
                    My Profile
                  </Link>
                  <Link
                    to="/orders"
                    onClick={() => setIsMenuOpen(false)}
                    className="text-gray-700 hover:text-primary-600 font-medium py-3 px-4 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    My Orders
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left text-red-600 hover:text-red-700 font-medium py-3 px-4 rounded-lg hover:bg-red-50 transition-colors flex items-center gap-2"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="text-gray-700 hover:text-primary-600 font-medium py-3 px-4 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
                >
                  <FiUser size={18} />
                  Login
                </Link>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;


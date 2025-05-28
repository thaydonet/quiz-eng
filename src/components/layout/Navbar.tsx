import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BookOpen, Menu, X, User, BarChart } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path ? 'text-blue-800 font-bold' : 'text-gray-700 hover:text-blue-800';
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <BookOpen className="h-8 w-8 text-blue-800" />
              <span className="ml-2 text-xl font-bold text-blue-900">EnglishPrep</span>
            </Link>
          </div>
          
          {/* Desktop menu */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            <Link to="/" className={`px-3 py-2 text-sm font-medium ${isActive('/')}`}>
              Home
            </Link>
            <Link to="/tests" className={`px-3 py-2 text-sm font-medium ${isActive('/tests')}`}>
              Practice Tests
            </Link>
            <Link to="/profile" className={`px-3 py-2 text-sm font-medium ${isActive('/profile')}`}>
              My Profile
            </Link>
            <button className="ml-4 px-4 py-2 text-sm font-medium text-white bg-blue-800 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              Login
            </button>
          </div>
          
          {/* Mobile menu button */}
          <div className="flex md:hidden items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-800 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg rounded-b-lg">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link 
              to="/" 
              className={`block px-3 py-2 rounded-md text-base font-medium ${isActive('/') ? 'bg-blue-100 text-blue-800' : 'text-gray-700 hover:bg-gray-100 hover:text-blue-800'}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/tests" 
              className={`block px-3 py-2 rounded-md text-base font-medium ${isActive('/tests') ? 'bg-blue-100 text-blue-800' : 'text-gray-700 hover:bg-gray-100 hover:text-blue-800'}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Practice Tests
            </Link>
            <Link 
              to="/profile" 
              className={`block px-3 py-2 rounded-md text-base font-medium ${isActive('/profile') ? 'bg-blue-100 text-blue-800' : 'text-gray-700 hover:bg-gray-100 hover:text-blue-800'}`}
              onClick={() => setIsMenuOpen(false)}
            >
              My Profile
            </Link>
            <button 
              className="w-full mt-2 px-4 py-2 text-sm font-medium text-white bg-blue-800 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              onClick={() => setIsMenuOpen(false)}
            >
              Login
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
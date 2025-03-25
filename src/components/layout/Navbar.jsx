
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when changing routes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass py-2 shadow-sm' : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold text-primary">
            Sudoku
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={`transition-colors ${
                location.pathname === '/'
                  ? 'text-primary font-medium'
                  : 'hover:text-primary'
              }`}
            >
              Home
            </Link>
            <Link
              to="/game"
              className={`transition-colors ${
                location.pathname === '/game'
                  ? 'text-primary font-medium'
                  : 'hover:text-primary'
              }`}
            >
              Play
            </Link>
            <Link
              to="/about"
              className={`transition-colors ${
                location.pathname === '/about'
                  ? 'text-primary font-medium'
                  : 'hover:text-primary'
              }`}
            >
              About
            </Link>
            <Link
              to="/game"
              className="premium-button animate-fade-in"
            >
              Play Now
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden flex items-center"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden absolute left-0 right-0 top-full glass animate-fade-in px-4 py-4 mt-2 rounded-lg shadow-md">
            <div className="flex flex-col space-y-4">
              <Link
                to="/"
                className={`transition-colors py-2 ${
                  location.pathname === '/'
                    ? 'text-primary font-medium'
                    : 'hover:text-primary'
                }`}
              >
                Home
              </Link>
              <Link
                to="/game"
                className={`transition-colors py-2 ${
                  location.pathname === '/game'
                    ? 'text-primary font-medium'
                    : 'hover:text-primary'
                }`}
              >
                Play
              </Link>
              <Link
                to="/about"
                className={`transition-colors py-2 ${
                  location.pathname === '/about'
                    ? 'text-primary font-medium'
                    : 'hover:text-primary'
                }`}
              >
                About
              </Link>
              <Link
                to="/game"
                className="premium-button w-full text-center py-3"
              >
                Play Now
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;


import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto py-8 border-t border-border">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <Link to="/" className="text-xl font-bold text-primary">
              Sudoku
            </Link>
            <p className="text-sm text-muted-foreground mt-1">
              Elegant puzzle solving experience
            </p>
          </div>

          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-8 items-center">
            <Link to="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <Link to="/game" className="hover:text-primary transition-colors">
              Play
            </Link>
            <Link to="/about" className="hover:text-primary transition-colors">
              About
            </Link>
          </div>
        </div>

        <div className="mt-8 pt-4 border-t border-border text-center text-sm text-muted-foreground">
          <p>© {currentYear} Sudoku. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

"use client";

import Link from "next/link";
import { useState } from "react";

export const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white text-gray-900 fixed top-0 left-0 right-0 z-50 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">O</span>
              </div>
              <span className="text-xl font-semibold text-gray-900">Omnistrate</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link href="/" className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium">
              Home
            </Link>
            <a
              href="https://omnistrate.com/about"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium"
            >
              About Us
            </a>
            <Link
              href="https://omnistrate.com/documentation"
              target="_blank"
              className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium"
            >
              Documentation
            </Link>
            <Link
              href="https://omnistrate.com/pricing"
              target="_blank"
              className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium"
            >
              Pricing
            </Link>
          </nav>

          {/* Desktop CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              href="https://omnistrate.com/sign-in"
              target="_blank"
              className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium border border-gray-300 rounded-md hover:border-gray-400"
            >
              Sign in
            </Link>
            <Link
              href="https://omnistrate.com/book-demo"
              target="_blank"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 text-sm font-medium rounded-md"
            >
              Book a demo
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-600 hover:text-gray-900 focus:outline-none focus:text-gray-900"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-gray-50 border-t border-gray-200">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link href="/" className="text-gray-700 hover:text-gray-900 block px-3 py-2 text-base font-medium">
              Home
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-gray-900 block px-3 py-2 text-base font-medium">
              About
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-gray-900 block px-3 py-2 text-base font-medium">
              Contact Us
            </Link>
            <Link href="/sign-in" className="text-gray-700 hover:text-gray-900 block px-3 py-2 text-base font-medium">
              Sign In
            </Link>
            <Link href="/sign-up" className="text-gray-700 hover:text-gray-900 block px-3 py-2 text-base font-medium">
              Sign Up
            </Link>
            <Link href="/book-demo" className="text-gray-700 hover:text-gray-900 block px-3 py-2 text-base font-medium">
              Book a demo
            </Link>
            <Link href="/pricing" className="text-gray-700 hover:text-gray-900 block px-3 py-2 text-base font-medium">
              Pricing
            </Link>
            <Link href="/support" className="text-gray-700 hover:text-gray-900 block px-3 py-2 text-base font-medium">
              Support
            </Link>
            <Link
              href="/documentation"
              className="text-gray-700 hover:text-gray-900 block px-3 py-2 text-base font-medium"
            >
              Documentation
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

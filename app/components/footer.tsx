import React from "react";
import Container from "@/app/components/container";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200">
      <Container>
        <div className="py-12">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-6 gap-12 mb-8">
            {/* Logo Column */}
            <div className="md:col-span-1">
              <div className="flex items-center space-x-2">
                <div className="w-9 h-9 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">O</span>
                </div>
                <span className="text-xl font-semibold text-gray-900">Omnistrate</span>
              </div>
            </div>

            {/* Company Column */}
            <div>
              <h3 className="text-gray-400 font-normal mb-4">Company</h3>
              <ul className="space-y-2">
                <li>
                  <a href="https://www.omnistrate.com/about" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-gray-900 transition-colors text-[15px]">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="https://www.omnistrate.com/contact" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-gray-900 transition-colors text-[15px]">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="https://www.omnistrate.com/careers" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-gray-900 transition-colors text-[15px]">
                    Careers
                  </a>
                </li>
              </ul>
            </div>

            {/* Product Column */}
            <div>
              <h3 className="text-gray-400 font-normal mb-4">Product</h3>
              <ul className="space-y-2">
                <li>
                  <a href="https://omnistrate.cloud/signin" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-gray-900 transition-colors text-[15px]">
                    Sign In
                  </a>
                </li>
                <li>
                  <a href="https://omnistrate.cloud/signup" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-gray-900 transition-colors text-[15px]">
                    Sign Up
                  </a>
                </li>
                <li>
                  <a href="https://omnistrate.com/pricing" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-gray-900 transition-colors text-[15px]">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="https://www.omnistrate.com/support" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-gray-900 transition-colors text-[15px]">
                    Support
                  </a>
                </li>
                <li>
                  <a href="https://www.omnistrate.com/demo" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-gray-900 transition-colors text-[15px]">
                    Demo
                  </a>
                </li>
              </ul>
            </div>

            {/* Resources Column */}
            <div>
              <h3 className="text-gray-400 font-normal mb-4">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <a href="/" className="text-gray-700 hover:text-gray-900 transition-colors text-[15px]">
                    Engineering Blog
                  </a>
                </li>
                <li>
                  <a href="https://www.omnistrate.com/community" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-gray-900 transition-colors text-[15px]">
                    Community
                  </a>
                </li>
                <li>
                  <a href="https://www.omnistrate.com/partners" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-gray-900 transition-colors text-[15px]">
                    Partners
                  </a>
                </li>
                <li>
                  <a href="https://www.omnistrate.com/press" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-gray-900 transition-colors text-[15px]">
                    Press Release
                  </a>
                </li>
                <li>
                  <a href="https://www.omnistrate.com/aws-saas-offer" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-gray-900 transition-colors text-[15px]">
                    AWS SaaS Offer
                  </a>
                </li>
              </ul>
            </div>

            {/* Documentation Column */}
            <div>
              <h3 className="text-gray-400 font-normal mb-4">Documentation</h3>
              <ul className="space-y-2">
                <li>
                  <a href="https://docs.omnistrate.com/" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-gray-900 transition-colors text-[15px]">
                    Quick Start
                  </a>
                </li>
                <li>
                  <a href="https://docs.omnistrate.com/" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-gray-900 transition-colors text-[15px]">
                    Tutorial
                  </a>
                </li>
                <li>
                  <a href="https://api.omnistrate.cloud/docs/external/" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-gray-900 transition-colors text-[15px]">
                    API Reference
                  </a>
                </li>
                <li>
                  <a href="https://www.omnistrate.com/terms" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-gray-900 transition-colors text-[15px]">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="https://www.omnistrate.com/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-gray-900 transition-colors text-[15px]">
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>

            {/* Social Column */}
            <div>
              <h3 className="text-gray-400 font-normal mb-4">Social</h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                  <Link href="https://linkedin.com/company/omnistrate" className="text-gray-700 hover:text-gray-900 transition-colors text-[15px]">
                    LinkedIn
                  </Link>
                </div>
                <div className="flex items-center space-x-2">
                  <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                  <Link href="https://twitter.com/omnistrate" className="text-gray-700 hover:text-gray-900 transition-colors text-[15px]">
                    Twitter
                  </Link>
                </div>
                <div className="flex items-center space-x-2">
                  <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  <Link href="https://facebook.com/omnistrate" className="text-gray-700 hover:text-gray-900 transition-colors text-[15px]">
                    Facebook
                  </Link>
                </div>
              </div>

              {/* SOC Compliance Badge */}
              <div className="mt-6">
                <div className="w-24 h-24 bg-blue-500 rounded-full flex items-center justify-center shadow-lg">
                  <div className="text-white text-center leading-tight">
                    <div className="text-xs font-semibold">AICPA</div>
                    <div className="text-2xl font-bold">SOC</div>
                    <div className="text-[9px] font-medium">Service</div>
                    <div className="text-[9px] font-medium">Organizations</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Copyright */}
          <div className="border-t border-gray-200 pt-6 mt-8">
            <p className="text-gray-400 text-sm">
              © 2025 Omnistrate.Inc All rights reserved.
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;

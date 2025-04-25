"use client"

import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import CTAButton from './CTA-button';

interface NavItem {
  label: string;
  sectionId: string;
}

const navItems: NavItem[] = [
  { label: 'About Us', sectionId: 'about' },
  { label: 'How It Works', sectionId: 'how-it-works' },
  // { label: 'FAQs', sectionId: 'faqs' },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);


  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    setIsOpen(false);
  };

  return (
    <nav className="w-full shadow-md z-50 p-4 sm:px-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-2">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div>
            <Link className="flex items-center justify-center" href={"/"}>    
           
              <Image
                src="/buk-logo.png" 
                alt="Logo" 
                width={160}
                height={50}
                className="h-10 w-auto"
                priority
              />
              {" "}SUGBUK
              </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-10">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => scrollToSection(item.sectionId)}
                className="relative group text-gray-700 hover:text-gray-900 transition-colors duration-200"
              >
                <span>{item.label}</span>
                <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-blue-500 group-hover:w-full transition-all duration-300 ease-out -translate-x-1/2" />
              </button>
            ))}
            <CTAButton />
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-sectext hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-purple-500"
            >
              {isOpen ? (
                <X className="h-8 w-8 z-50 text-primary" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`${
          isOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
        } md:hidden fixed inset-0 z-40 bg-white transition-all duration-300 ease-in-out transform`}
      >
        <div className="pt-20 pb-6 px-4">
          <div className="flex flex-col space-y-6">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => scrollToSection(item.sectionId)}
                className="relative group text-left text-lg text-gray-600 hover:text-gray-900 transition-colors duration-200"
              >
                <span>{item.label}</span>
                <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300 ease-out -translate-x-1/2" />
              </button>
            ))}
            <CTAButton />
            <Link
              href='https://wa.me/+2349038868845'
              className="bg-primary text-white hover:bg-white hover:text-primary px-6 py-2.5 rounded-md text-sm font-medium transition-colors duration-300 w-full">
              Report a concern
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
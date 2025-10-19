"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import NavLink from "./nav-link";


const unauthenticatedLinks = [
  { href: "/sign-in", label: "Sign In" },
  { href: "/about", label: "About Us" },
  { href: "/talk-to-rep", label: "Share a Concern" },
  // { href: "/sign-up", label: "Sign Up" }, // Commented out because I don't know if we should use this
];


export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null)

  // if outside of the navbar is clicked in mobile view, close the menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        navRef.current && 
        !navRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [navRef]);


  const pathname = usePathname();



  const closeMenu = () => setIsOpen(false);

  const Navlinks = unauthenticatedLinks;

  return (
    <nav className="bg-white/90 text-[#333333] shadow-md sticky top-0 z-40 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between h-16">
          {/* Logo and Desktop Navigation */}
          <div className="flex justify-between items-center w-full">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" aria-label="SUGBUK Home" className="flex items-center">
                <Image
                  src="/sug-logo.jpeg"
                  alt="SUGBUK Logo"
                  width={70}
                  height={70}
                  className="h-12 md:h-14 w-auto"
                />
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden sm:flex sm:space-x-4">
              {Navlinks.map((link) => (
                <NavLink
                  key={link.href}
                  href={link.href}
                  label={link.label}
                  isActive={pathname === link.href}
                />
              ))}
            </div>
           
          </div>


          {/* Mobile menu button */}
          <div className="flex items-center sm:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 focus:outline-none"
              aria-controls="mobile-menu"
              aria-expanded={isOpen}
              ref={buttonRef}
              onClick={() => setIsOpen(prev => !prev)}
            >
              <span className="sr-only">
                {isOpen ? "Close main menu" : "Open main menu"}
              </span>
              {isOpen ? (
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            ref={navRef}
            className="absolute top-20 bg-white right-2 px-8 py-6 rounded-lg shadow-lg sm:hidden overflow-hidden"
          >
            <div className="grid place-content-center px-2 pt-2 pb-3 space-y-1">
              {Navlinks.map((link) => (
                <NavLink
                  key={`mobile-${link.href}`}
                  href={link.href}
                  label={link.label}
                  isActive={pathname === link.href}
                  isMobile={true}
                  onClick={closeMenu}
                />
              ))}
              
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
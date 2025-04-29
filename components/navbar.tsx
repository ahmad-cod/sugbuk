"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useProfile } from "@/contexts/ProfileContext";

type UserProfile = {
  // id: string;
  // email: string;
  first_name: string;
  last_name: string;
  avatar_url?: string;
};

type NavLinkProps = {
  href: string;
  label: string;
  isActive: boolean;
  isMobile?: boolean;
  onClick?: () => void;
};

const NavLink = ({ href, label, isActive, isMobile, onClick }: NavLinkProps) => {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`relative px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ease-in-out ${
        isMobile ? "w-full text-center py-4 text-base" : ""
      } ${
        isActive
          ? "text-indigo-600"
          : "text-gray-700 hover:text-indigo-600 hover:bg-indigo-50"
      }`}
      aria-current={isActive ? "page" : undefined}
    >
      {label}
      {isActive && (
        <motion.span
          className="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-600 rounded-full"
          layoutId="activeNavIndicator"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        />
      )}
    </Link>
  );
};

const AvatarInitials = ({ firstname, lastname }: { firstname: string; lastname: string }) => {
  const initials = `${firstname.charAt(0)}${lastname.charAt(0)}`.toUpperCase();

  return (
    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-indigo-600 text-white text-sm font-medium">
      {initials}
    </div>
  );
};

const AvatarMenu = ({
  profile,
  signOut,
}: {
  profile: UserProfile;
  signOut: () => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = () => setIsOpen(false);
    if (isOpen) {
      document.addEventListener("click", handleClickOutside);
      return () => document.removeEventListener("click", handleClickOutside);
    }
  }, [isOpen]);

  return (
    <div className="relative">
      <button
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
        className="flex items-center focus:outline-none"
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-label="User menu"
      >
        <div className="flex items-center justify-center overflow-hidden rounded-full ring-2 ring-white transition-all duration-200 ease-in-out hover:ring-indigo-100">
          {profile.avatar_url ? (
            <Image
              src={profile.avatar_url}
              alt={`${profile.first_name} ${profile.last_name}`}
              width={32}
              height={32}
              className="h-8 w-8 object-cover"
            />
          ) : (
            <AvatarInitials firstname={profile.first_name} lastname={profile.last_name} />
          )}
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50"
            role="menu"
            aria-orientation="vertical"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="border-b border-gray-100 px-4 py-3">
              <p className="text-sm font-medium text-gray-900">
                {profile.first_name} {profile.last_name}
              </p>
              <p className="truncate text-xs text-gray-500">
                {/* {profile.email} */}
              </p>
            </div>
            <Link
              href="/profile"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-150"
              role="menuitem"
              onClick={() => setIsOpen(false)}
            >
              Profile
            </Link>
            <button
              onClick={() => {
                signOut();
                setIsOpen(false);
              }}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-150"
              role="menuitem"
            >
              Logout
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { profile, isLoading, logout } = useProfile();
  // const [profile, setProfile] = useState<UserProfile | null>(null);
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logout();
      router.push("/");
    } catch (error) {
      console.error("Error logging out: ", error);
    }
  };

  const closeMenu = () => setIsOpen(false);

  // Links based on authentication state
  const authenticatedLinks = [
    { href: "/talk-to-rep", label: "Talk to Your Rep" },
    { href: "/feedbacks", label: "Feedbacks" },
  ];

  const unauthenticatedLinks = [
    { href: "/sign-in", label: "Sign In" },
    { href: "/talk-to-rep", label: "Share a Feedback" },
    // { href: "/sign-up", label: "Sign Up" },
  ];

  console.log("Profile: ", profile);

  const links = profile ? authenticatedLinks : unauthenticatedLinks;

  return (
    <nav className="bg-white border-b border-gray-100 shadow-sm sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and Desktop Navigation */}
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" aria-label="SUGBUK Home" className="flex items-center">
                <span className="text-xl font-bold text-indigo-600">SUGBUK</span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden sm:ml-6 sm:flex sm:items-center sm:space-x-4">
              {links.map((link) => (
                <NavLink
                  key={link.href}
                  href={link.href}
                  label={link.label}
                  isActive={pathname === link.href}
                />
              ))}
            </div>
          </div>

          {/* Right side - Avatar for desktop */}
          <div className="hidden sm:flex sm:items-center">
            {isLoading ? (
              <div className="h-8 w-8 rounded-full bg-gray-200 animate-pulse"></div>
            ) : profile ? (
              <AvatarMenu profile={profile} signOut={handleLogout} />
            ) : null}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center sm:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 focus:outline-none"
              aria-controls="mobile-menu"
              aria-expanded={isOpen}
              onClick={() => setIsOpen(!isOpen)}
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
            className="sm:hidden overflow-hidden"
          >
            <div className="flex flex-col px-2 pt-2 pb-3 space-y-1">
              {links.map((link) => (
                <NavLink
                  key={`mobile-${link.href}`}
                  href={link.href}
                  label={link.label}
                  isActive={pathname === link.href}
                  isMobile={true}
                  onClick={closeMenu}
                />
              ))}
              
              {profile && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex items-center px-3 py-2">
                    {profile.avatar_url ? (
                      <Image
                        src={profile.avatar_url}
                        alt="User avatar"
                        width={40}
                        height={40}
                        className="h-8 w-8 rounded-full object-cover"
                      />
                    ) : (
                      <AvatarInitials firstname={profile.first_name} lastname={profile.last_name} />
                    )}
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-700">
                        {profile.first_name} {profile.last_name}
                      </p>
                      {/* <p className="text-xs text-gray-500 truncate">{profile.email}</p> */}
                    </div>
                  </div>
                  
                  <Link
                    href="/profile"
                    className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 transition-colors duration-150"
                    onClick={closeMenu}
                  >
                    Profile
                  </Link>
                  
                  <button
                    onClick={() => {
                      handleLogout();
                      closeMenu();
                    }}
                    className="block w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 transition-colors duration-150"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
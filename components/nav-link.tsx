import Link from "next/link";
import { motion } from "framer-motion";

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
          : "hover:text-indigo-600 hover:bg-indigo-50"
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

export default NavLink;
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#212529] text-white py-5 text-center">
      <div className="flex flex-col md:flex-row justify-center items-center gap-2 md:gap-4 text-sm">
        <span>© 2025 SUG-BUK</span>
        <span className="hidden md:inline">•</span>
        <span>Your Voice Matters at Bayero University, Kano</span>
        <span className="hidden md:inline">•</span>
        <span>
          Built by{' '}
          <span className="">Ahmad Aroyehun</span>
        </span>
      </div>
    </footer>
  );
};

export default Footer;
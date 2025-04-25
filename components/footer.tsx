import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 border-t border-gray-300 py-6 sm:py-12 text-center">
      <div className="flex justify-between items-center max-w-5xl mx-auto px-4">
      <p className="text-gray-600 py-6">
          &copy; {new Date().getFullYear()} SUGBUK. All rights reserved.
        </p>
        <ul className="flex justify-center space-x-6">
          <li>
            <a href="/about" className="text-blue-500 hover:underline">
              About
            </a>
          </li>
          <li>
            <a href="/contact" className="text-blue-500 hover:underline">
              Contact
            </a>
          </li>
          <li>
            <a href="/privacy" className="text-blue-500 hover:underline">
              Privacy Policy
            </a>
          </li>
        </ul>
        <p className="text-gray-600">
          New Site, Gwarzo Road, Kano
        </p>
      </div>
      

        {/* <p className="text-gray-600 mb-4">
          Built with ❤️ by 
          <strong>
          <a
            href="https://ahmadaroyehun.netlify.app"
            target="_blank"
            className="font-bold hover:underline"
            rel="noreferrer"
          >
            Ahmad Aroyehun
          </a></strong>
        </p> */}
    </footer>
  );
};

export default Footer;

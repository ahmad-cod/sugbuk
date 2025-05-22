import React from 'react';
import Link from 'next/link';
import { 
   
  Linkedin, 
  Mail, 
  Heart,
  ExternalLink 
} from 'lucide-react';
import Facebook from '../icons/facebook.svg'
import X from '../icons/x.svg'
import Instagram from '../icons/instagram.svg'
import Tiktok from '../icons/tiktok.svg'


const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: 'Instagram',
      href: 'https://instagram.com/sugbuk',
      icon: Instagram,
      color: 'hover:text-pink-500'
    },
    {
      name: 'Twitter',
      href: 'https://x.com/sugbuk2025',
      icon: X,
      color: 'hover:text-gray-500'
    },
    {
      name: 'Facebook',
      href: 'https://facebook.com/sugbuk',
      icon: Facebook,
      color: 'hover:text-blue-600'
    },
    {
      name: 'Tiktok',
      href: 'https://linkedin.com/company/sugbuk',
      icon: Tiktok,
      color: 'hover:text-black'
    },
    {
      name: 'Email',
      href: 'mailto:contact@sugbuk.com',
      icon: Mail,
      color: 'hover:text-emerald-400'
    }
  ];

  return (
    <footer className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-sky-400/10 via-transparent to-blue-400/10 animate-pulse"></div>
      
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-sky-400/50 to-transparent"></div>
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-sky-400/5 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-blue-400/5 rounded-full blur-2xl"></div>

      <div className="relative container mx-auto px-4 py-12">
        {/* Main footer content */}
        <div className="flex flex-col items-center space-y-8">
          
          {/* Brand section */}
          <div className="text-center space-y-3">
            <h3 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-sky-400 to-blue-500 bg-clip-text text-transparent">
              sugbuk
            </h3>
            <p className="text-slate-400 text-sm md:text-base max-w-md mx-auto leading-relaxed">
              Bridging the communication gap between students and their union government
            </p>
          </div>

          {/* Social links */}
          <div className="flex items-center justify-center space-x-6">
            {socialLinks.map((social) => {
              const IconComponent = social.icon;
              return (
                <Link
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group p-3 rounded-full bg-slate-800/50 border border-slate-700/50 backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:bg-slate-700/50 hover:border-slate-600 ${social.color}`}
                  aria-label={`Follow sugbuk on ${social.name}`}
                >
                  <IconComponent className="w-5 h-5 text-slate-400 group-hover:text-current transition-colors duration-300" />
                </Link>
              );
            })}
          </div>

          {/* Quick links */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
            <Link 
              href="/about" 
              className="text-slate-400 hover:text-sky-400 transition-colors duration-300 hover:underline underline-offset-4"
            >
              About
            </Link>
            <Link 
              href="/contact" 
              className="text-slate-400 hover:text-sky-400 transition-colors duration-300 hover:underline underline-offset-4"
            >
              Contact SUG
            </Link>
            <Link 
              href="/updates" 
              className="text-slate-400 hover:text-sky-400 transition-colors duration-300 hover:underline underline-offset-4"
            >
              Updates
            </Link>
            <Link 
              href="/bulletin" 
              className="text-slate-400 hover:text-sky-400 transition-colors duration-300 hover:underline underline-offset-4"
            >
              Weekly Bulletin
            </Link>
          </div>

          {/* Divider */}
          <div className="w-full max-w-2xl h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent"></div>

          {/* Bottom section */}
          <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-4xl space-y-4 md:space-y-0 text-sm text-slate-500">
            
            {/* Copyright */}
            <div className="flex items-center space-x-2">
              <span>&copy; {currentYear} sugbuk. All rights reserved.</span>
            </div>

            {/* Built by credit */}
            <div className="flex items-center space-x-2 group">
              <span>Built with</span>
              <Heart className="w-4 h-4 text-red-400 animate-pulse" />
              <span>by</span>
              <Link
                href="https://github.com/ahmad-cod"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-sky-400 hover:text-sky-300 transition-colors duration-300 flex items-center space-x-1 group-hover:underline underline-offset-4"
              >
                <span>Ahmad Aroyehun</span>
                <ExternalLink className="w-3 h-3 opacity-70 group-hover:opacity-100 transition-opacity duration-300" />
              </Link>
            </div>
          </div>

          {/* Fun tagline */}
          <div className="text-xs text-slate-600 text-center italic">
            "Your voice, our mission 🚀"
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;


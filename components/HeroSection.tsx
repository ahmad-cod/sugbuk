import React, { useState, useEffect } from 'react';
import { Menu, X, Send, MessageCircle, Users, Calendar, ChevronRight } from 'lucide-react';


// Hero Section Component
export const HeroSection = () => {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/90 to-blue-800/90 z-10"></div>
        <img 
          src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1920&q=80" 
          alt="University Campus"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 z-10 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 z-20 relative">
        <div className="text-center max-w-4xl mx-auto animate-fadeInUp">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-purple-200">SUGBUK</span>
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-blue-50 mb-8 max-w-3xl mx-auto leading-relaxed">
            Your voice, your representation, your union. Stay connected with the latest updates and initiatives from your student government.
          </p>
          <button 
            onClick={() => window.open('https://wa.me/your-number', '_blank')}
            className="group bg-white hover:bg-blue-50 text-blue-600 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl inline-flex items-center space-x-2"
          >
            <MessageCircle className="w-5 h-5" />
            <span>Join Our WhatsApp Channel</span>
            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mt-16 max-w-2xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
              <Users className="w-8 h-8 text-white mx-auto mb-2" />
              <div className="text-3xl font-bold text-white mb-1">10K+</div>
              <div className="text-sm text-blue-100">Students</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
              <Calendar className="w-8 h-8 text-white mx-auto mb-2" />
              <div className="text-3xl font-bold text-white mb-1">50+</div>
              <div className="text-sm text-blue-100">Events</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
              <MessageCircle className="w-8 h-8 text-white mx-auto mb-2" />
              <div className="text-3xl font-bold text-white mb-1">24/7</div>
              <div className="text-sm text-blue-100">Support</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-2">
          <div className="w-1.5 h-3 bg-white rounded-full"></div>
        </div>
      </div>
    </section>
  );
};
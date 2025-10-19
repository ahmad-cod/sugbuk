"use client"
import { AboutSection } from "./AboutSection";
import { Footer } from "./Footer";
import { HeroSection } from "./HeroSection";
import { Navigation } from "./Navigation";

const App = () => {
  return (
    <div className="min-h-screen bg-white">
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out;
        }
        
        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out;
        }
        
        .delay-1000 {
          animation-delay: 1s;
        }
        
        /* Smooth scrolling */
        html {
          scroll-behavior: smooth;
        }
        
        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 10px;
        }
        
        ::-webkit-scrollbar-track {
          background: #f1f1f1;
        }
        
        ::-webkit-scrollbar-thumb {
          background: #3b82f6;
          border-radius: 5px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: #2563eb;
        }
      `}</style>
      
      <Navigation />
      <HeroSection />
      <AboutSection />
      <Footer />
    </div>
  );
};

export default App;
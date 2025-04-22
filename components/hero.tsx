import React from 'react'
import Button from './ui/btn'

function Hero() {
  return (
    <section className="w-full bg-gradient-to-r from-blue-400 to-blue-500 text-white p-4 sm:px-20">
        <div className="container mx-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8 md:py-24">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/2 space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                Your Voice Matters at BUK
              </h1>
              <p className="text-lg md:text-xl opacity-90">
              SUGBUK bridges the communication gap between students and their representatives.{" "}
              Stay updated, report concerns, and make your voice heard with our trusted platform.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button href="/talk-to-rep" variant="primary">
                  Talk to Your Rep
                </Button>
                <Button href="/about" variant="secondary">
                  Learn About SUGBUK
                </Button>
              </div>
            </div>
            <div className="md:w-1/2 rounded-lg shadow-xl bg-white p-2 mt-8 md:mt-0">
              <div className="bg-gray-200 w-full h-64 md:h-80 rounded relative">
                {/* Placeholder for hero image */}
                <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                  University Campus Image
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
  )
}

export default Hero
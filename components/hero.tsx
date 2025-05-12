import React from 'react'
import Button from './ui/btn'
import { HERO_TEXT } from '../constants/texts'
import Image from 'next/image'

const Hero: React.FC = () => {
  return (
    <section className="w-full bg-gradient-to-r from-[#005EB8] to-blue-500 text-white p-4 sm:px-20">
        <div className="container max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8 md:py-24">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/2 space-y-6">
              <h1 className="font-heading text-4xl md:text-5xl font-bold leading-tight">
                {HERO_TEXT.title}
              </h1>
              <p className="text-lg md:text-xl text-gray-200">
                {HERO_TEXT.description}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button href="/talk-to-rep" variant="secondary">
                  {HERO_TEXT.ctaPrimary}
                </Button>
              </div>
            </div>
            <div className="w-full md:w-1/2 rounded-lg shadow-xl bg-white p-2 mt-8 md:mt-0">
              <div className="bg-gray-200 w-full h-64 md:h-80 rounded relative">
                {/* Placeholder for hero image */}
                <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                  <Image
                    src={HERO_TEXT.image}
                    alt={HERO_TEXT.imageAlt}
                    fill
                    style={{ objectFit: 'cover' }}
                    className="rounded-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
  )
}

export default Hero
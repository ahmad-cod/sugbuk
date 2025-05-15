"use client"
import React, { useEffect, useState } from 'react'
import Button from './ui/btn'
import { HERO_TEXT } from '../constants/texts'
import Image from 'next/image'

const bgImages = [
  'bg-sug-group',
  'bg-nacoss-nem',
  'bg-hero',
]

const Hero: React.FC = () => {
  const [currentBgIndex, setCurrentBgIndex] = useState(0)
  // effect to change background image every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBgIndex((prevIndex) => (prevIndex + 1) % bgImages.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [])
  return (
    <section className={`w-full ${bgImages[currentBgIndex]} bg-no-repeat bg-cover text-white`}>
        <div className="max-w-screen-2xl bg-gray-900 opacity-70 mx-auto px-4 py-16 sm:px-20 lg:px-24 md:py-24 lg:py-32">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/2 space-y-6">
              <h1 className="font-heading text-4xl md:text-5xl font-bold leading-tight">
                {HERO_TEXT.title}
              </h1>
              <p className="text-lg md:text-xl text-gray-200 font-[500]">
                {HERO_TEXT.description}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button href="/talk-to-rep" variant="secondary">
                  {HERO_TEXT.ctaPrimary}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
  )
}

export default Hero
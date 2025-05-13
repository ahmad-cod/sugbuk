import React from 'react'
import Button from './ui/btn'

export default function CTA() {
  return (
    <section className="w-full bg-gradient-to-l from-[#005EB8] to-blue-500 text-white py-12 md:py-20">
      <div className="container mx-auto px-4 text-center">
        <h2 className="font-heading text-2xl md:text-3xl font-bold mb-6">
          Have a Concern or Idea?
        </h2>
        <p className="font-body text-lg md:text-xl mb-8 max-w-2xl mx-auto opacity-90">
          We're committed to making your university experience better.
          Share your thoughts with your student representatives.
        </p>
        <Button href='talk-to-rep' variant="secondary" size="lg">
          Talk to Your Rep
        </Button>
    </div>
  </section>
  )
}

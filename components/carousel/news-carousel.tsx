'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { NewsItem } from '@/lib/types';
import NewsCard from '../news-card';


interface NewsCarouselProps {
  autoPlay?: boolean;
  autoPlayInterval?: number;
}

// Supabase client

export default function NewsCarousel({ 
  autoPlay = true, 
  autoPlayInterval = 5000 
}: NewsCarouselProps) {
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch news from Supabase
  // useEffect(() => {
  //   async function fetchNews() {
  //     try {
  //       const { data, error } = await supabase
  //         .from('news')
  //         .select('*')
  //         .order('publication_date', { ascending: false })
  //         .limit(10);

  //       if (error) throw error;
        
  //       setNewsItems(data || []);
  //     } catch (err) {
  //       setError('Failed to load news');
  //       console.error('Error fetching news:', err);
        
  //       // Fallback mock data for demo
  //       setNewsItems([
  //         {
  //           id: '1',
  //           title: 'NITDA COMMISSIONS NATIONAL CYBERSECURITY CENTRE AT BUK',
  //           image_url: '/api/placeholder/600/300',
  //           author: 'Publication',
  //           publication_date: 'May 20, 2025',
  //           excerpt: 'Major milestone in cybersecurity infrastructure development',
  //           slug: 'nitda-cybersecurity-centre'
  //         },
  //         {
  //           id: '2',
  //           title: 'BUK SENATE APPROVES ACADEMIC CALENDAR FOR 2024/2025 UNDERGRADUATE SESSION',
  //           image_url: '/api/placeholder/600/300',
  //           author: 'Infoservices',
  //           publication_date: 'May 19, 2025',
  //           excerpt: 'New academic calendar brings exciting changes for students',
  //           slug: 'academic-calendar-2024-2025'
  //         },
  //         {
  //           id: '3',
  //           title: 'STUDENT UNION GOVERNMENT LAUNCHES DIGITAL PLATFORM',
  //           image_url: '/api/placeholder/600/300',
  //           author: 'SUGBUK',
  //           publication_date: 'May 18, 2025',
  //           excerpt: 'Revolutionary platform to enhance student engagement',
  //           slug: 'sug-digital-platform'
  //         },
  //         {
  //           id: '4',
  //           title: 'ANNUAL CULTURAL WEEK CELEBRATION ANNOUNCED',
  //           image_url: '/api/placeholder/600/300',
  //           author: 'Cultural Committee',
  //           publication_date: 'May 17, 2025',
  //           excerpt: 'Week-long celebration of diverse cultures and traditions',
  //           slug: 'cultural-week-2025'
  //         }
  //       ]);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   }

  //   fetchNews();
  // }, []);

  useEffect(() => {
     setNewsItems([
          {
            id: '1',
            title: 'NITDA COMMISSIONS NATIONAL CYBERSECURITY CENTRE AT BUK',
            image_url: '/nitda_cs.jpg',
            author: 'Publication',
            publication_date: 'May 20, 2025',
            excerpt: 'Major milestone in cybersecurity infrastructure development',
            slug: 'nitda-cybersecurity-centre'
          },
          {
            id: '2',
            title: 'BUK SENATE APPROVES ACADEMIC CALENDAR FOR 2024/2025 UNDERGRADUATE SESSION',
            image_url: '/buk-gate.webp',
            author: 'Infoservices',
            publication_date: 'May 19, 2025',
            excerpt: 'New academic calendar brings exciting changes for students',
            slug: 'academic-calendar-2024-2025'
          },
          {
            id: '3',
            title: 'STUDENT UNION GOVERNMENT LAUNCHES DIGITAL PLATFORM',
            image_url: '/nacoss_nem.webp',
            author: 'SUGBUK',
            publication_date: 'May 18, 2025',
            excerpt: 'Revolutionary platform to enhance student engagement',
            slug: 'sug-digital-platform'
          },
          {
            id: '4',
            title: 'ANNUAL CULTURAL WEEK CELEBRATION ANNOUNCED',
            image_url: '/nitda_cs.jpg',
            author: 'Cultural Committee',
            publication_date: 'May 17, 2025',
            excerpt: 'Week-long celebration of diverse cultures and traditions',
            slug: 'cultural-week-2025'
          }
        ]);

        setIsLoading(false);
  }, [])

  // Calculate total slides based on screen size
  const getItemsPerSlide = () => {
    if (typeof window !== 'undefined') {
      return window.innerWidth >= 768 ? 2 : 1;
    }
    return 1;
  };

  const [itemsPerSlide, setItemsPerSlide] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      setItemsPerSlide(getItemsPerSlide());
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const totalSlides = Math.ceil(newsItems.length / itemsPerSlide);

  // Navigation functions
  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  // Auto-play functionality
  useEffect(() => {
    if (!autoPlay || totalSlides <= 1) return;

    const interval = setInterval(nextSlide, autoPlayInterval);
    return () => clearInterval(interval);
  }, [autoPlay, autoPlayInterval, nextSlide, totalSlides]);

  // Get current slide items
  const getCurrentSlideItems = () => {
    const startIndex = currentIndex * itemsPerSlide;
    return newsItems.slice(startIndex, startIndex + itemsPerSlide);
  };

  if (isLoading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 tracking-wider">
              NEWS & EVENTS
            </h2>
          </div>
          <div className="flex justify-center">
            <div className="animate-pulse bg-gray-300 h-64 w-full max-w-4xl rounded-lg"></div>
          </div>
        </div>
      </section>
    );
  }

  if (error || newsItems.length === 0) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 tracking-wider mb-8">
              NEWS & EVENTS
            </h2>
            <p className="text-gray-600">No news available at the moment.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="w-full max-w-7xl mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 tracking-wider">
            NEWS & EVENTS
          </h2>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Navigation Arrows */}
          {totalSlides > 1 && (
            <>
              <button
                onClick={prevSlide}
                className="absolute -left-3 top-1/2 -translate-y-1/2 z-10 bg-transparent hover:bg-white shadow-lg rounded-full p-2 transition-all duration-200 hover:scale-110"
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-6 h-6 text-gray-700" />
              </button>
              
              <button
                onClick={nextSlide}
                className="absolute -right-3 top-1/2 -translate-y-1/2 z-10 bg-transparent hover:bg-white shadow-lg rounded-full p-2 transition-all duration-200 hover:scale-110"
                aria-label="Next slide"
              >
                <ChevronRight className="w-6 h-6 text-gray-700" />
              </button>
            </>
          )}

          {/* Cards Container */}
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ 
                transform: `translateX(-${currentIndex * 100}%)`,
              }}
            >
              {Array.from({ length: totalSlides }).map((_, slideIndex) => {
                const slideItems = newsItems.slice(
                  slideIndex * itemsPerSlide,
                  (slideIndex + 1) * itemsPerSlide
                );

                return (
                  <div 
                    key={slideIndex}
                    className='w-full flex-shrink-0'
                    // className={`flex gap-6 ${itemsPerSlide === 1 ? 'w-full' : 'w-full'}`}
                    // style={{ width: `${100 / totalSlides}%` }}
                  >
                    <div
                      className={`flex ${itemsPerSlide === 1 ? 'justify-center' : 'gap-6'}`}
                    >
                      {slideItems.map((item) => (
                        <div 
                          key={item.id} 
                          className={itemsPerSlide === 1 ? 'w-full max-w-lg' : 'flex-1 min-w-0'}
                        >
                          <NewsCard item={item} />
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Dot Indicators */}
          {totalSlides > 1 && (
            <div className="flex justify-center mt-8 space-x-2">
              {Array.from({ length: totalSlides }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-200 ${
                    index === currentIndex
                      ? 'bg-blue-600 scale-110'
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

"use client"
import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight, Heart, MessageCircle, Share2, MoreHorizontal } from 'lucide-react';
import { usePosts } from '@/hooks/usePosts';
import { Post as FullPost } from '@/types/post';
import Image from 'next/image';
import AvatarInitials from './layout/avatar-initials';
import { formatDistanceToNow } from 'date-fns';

interface Post {
  id: number;
  author: string;
  timestamp: string;
  content: string;
  images?: string[];
  likes: number;
  comments: number;
  shares: number;
}

const ResolutionsFeed: React.FC = () => {
  const [expandedPosts, setExpandedPosts] = useState<Set<string>>(new Set());
  const [fullscreenMedia, setFullscreenMedia] = useState<string[] | null>(null);
  const [currentMediaIndex, setCurrentMediaIndex] = useState<number>(0);
  const { posts, loading } = usePosts();

  const samplePosts: Post[] = [
    {
      id: 1,
      author: "Students' Union Government, SUG - BUK",
      timestamp: "2 hours ago",
      content: "BAYERO UNIVERSITY KANO HOSTS NATIONAL CYBERSECURITY CENTRE: A HUB FOR INNOVATION AND COLLABORATION... This groundbreaking initiative represents a significant milestone in Nigeria's cybersecurity landscape, positioning BUK as a leading institution in the fight against cyber threats. The center will serve as a beacon for research, training, and development of cutting-edge cybersecurity solutions that will benefit not only the university community but the entire nation.",
      images: [
        "https://res.cloudinary.com/annasr800/image/upload/v1746634803/sugbuk-r-uploads/rgxm5xecouiiah4ol5h3.jpg",
        "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop"
      ],
      likes: 24,
      comments: 8,
      shares: 3
    },
    {
      id: 2,
      author: "Students' Union Government, SUG - BUK",
      timestamp: "5 hours ago",
      content: "SWEP CUP FINAL MATCH ALERT! ⚽ Get ready for the most anticipated match of the season! Don't miss this exciting showdown between our finest teams.",
      images: [
        "https://res.cloudinary.com/annasr800/image/upload/v1746634803/sugbuk-r-uploads/rgxm5xecouiiah4ol5h3.jpg"
      ],
      likes: 156,
      comments: 32,
      shares: 12
    },
    {
      id: 3,
      author: "Students' Union Government, SUG - BUK",
      timestamp: "1 day ago",
      content: "Important Update for NET/UME Applicants from the SCE. We are pleased to announce new developments in our admission process. This is to inform all prospective students about the latest updates regarding the School of Continuing Education admission requirements.",
      images: [
        "https://res.cloudinary.com/annasr800/image/upload/v1746832750/sugbuk-r-uploads/hsvqzzypte7hdidn1a1l.png",
        "https://res.cloudinary.com/annasr800/image/upload/v1746634803/sugbuk-r-uploads/rgxm5xecouiiah4ol5h3.jpg",
        "https://res.cloudinary.com/annasr800/image/upload/v1744971819/sugbuk-r-uploads/pl2iib07c5bx3vk9hjoj.jpg"
      ],
      likes: 89,
      comments: 15,
      shares: 7
    },
    {
      id: 4,
      author: "The Vice-Chancellor, Professor Sagir Adamu Abbas, FMAN",
      timestamp: "2 days ago",
      content: "COMMISSIONING NATIONAL CYBERSECURITY CENTRE BAYERO UNIVERSITY KANO - PARTNERSHIP FOR INNOVATION AND DIGITAL ECONOMY. We are proud to announce this historic milestone in our journey towards technological advancement and digital security excellence.",
      images: [
        "https://res.cloudinary.com/annasr800/image/upload/v1749573827/webcam-toy-photo4_xloxid.jpg",
        "https://res.cloudinary.com/annasr800/image/upload/v1744971819/sugbuk-r-uploads/pl2iib07c5bx3vk9hjoj.jpg",
        "https://res.cloudinary.com/annasr800/image/upload/v1747135570/sugbuk-r-uploads/pqjukojwzfwgk0agfq9l.webp",
        "https://res.cloudinary.com/annasr800/image/upload/v1744971819/sugbuk-r-uploads/pl2iib07c5bx3vk9hjoj.jpg"
      ],
      likes: 234,
      comments: 45,
      shares: 23
    },
    {
      id: 5,
      author: "Students' Union Government, SUG - BUK",
      timestamp: "3 days ago",
      content: "Campus Safety Initiative: New Security Measures Implemented. We are committed to ensuring the safety and security of all students, staff, and visitors on our campus.",
      images: [
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=300&fit=crop",
        "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=300&h=300&fit=crop",
        "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=300&h=300&fit=crop",
        "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=300&h=300&fit=crop",
        "https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=300&h=300&fit=crop",
        "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=300&h=300&fit=crop"
      ],
      likes: 167,
      comments: 28,
      shares: 15
    }
  ];

  const toggleExpanded = (postId: string): void => {
    setExpandedPosts(prev => {
      const newSet = new Set(prev);
      if (newSet.has(postId)) {
        newSet.delete(postId);
      } else {
        newSet.add(postId);
      }
      return newSet;
    });
  };

  const openFullscreen = (images: string[], index: number): void => {
    setFullscreenMedia(images);
    setCurrentMediaIndex(index);
  };

  const closeFullscreen = (): void => {
    setFullscreenMedia(null);
    setCurrentMediaIndex(0);
  };

  const navigateMedia = (direction: 'prev' | 'next'): void => {
    if (!fullscreenMedia) return;
    
    if (direction === 'prev') {
      setCurrentMediaIndex(prev => 
        prev > 0 ? prev - 1 : fullscreenMedia.length - 1
      );
    } else {
      setCurrentMediaIndex(prev => 
        prev < fullscreenMedia.length - 1 ? prev + 1 : 0
      );
    }
  };

  const renderImageGrid = (images: string[], postId: string): React.ReactElement => {
    const imageCount = images.length;
    
    if (imageCount === 1) {
      return (
        <div className="w-full h-80 cursor-pointer" onClick={() => openFullscreen(images, 0)}>
          <img src={images[0]} alt="" className="w-full h-full object-cover rounded-lg" />
        </div>
      );
    }
    
    if (imageCount === 2) {
      return (
        <div className="grid grid-cols-1 grid-rows-2 gap-1 h-80">
          {images.map((img: string, idx: number) => (
            <div key={idx} className="cursor-pointer" onClick={() => openFullscreen(images, idx)}>
              <img src={img} alt="" className="w-full h-full object-cover rounded-lg" />
            </div>
          ))}
        </div>
      );
    }
    
    if (imageCount === 3) {
      console.log(posts)
      return (
        <div className="grid grid-rows-2 gap-1 h-80">
          <div className="cursor-pointer" onClick={() => openFullscreen(images, 0)}>
            <img src={images[0]} alt="" className="w-full h-full object-cover rounded-lg" />
          </div>
          <div className="grid grid-cols-2 gap-1">
            {images.slice(1).map((img: string, idx: number) => (
              <div key={idx + 1} className="cursor-pointer" onClick={() => openFullscreen(images, idx + 1)}>
                <img src={img} alt="" className="w-full h-full object-cover rounded-lg" />
              </div>
            ))}
          </div>
        </div>
      );
    }
    
    if (imageCount === 4) {
      return (
        <div className="grid grid-cols-2 grid-rows-2 gap-1 h-80">
          {images.map((img, idx) => (
            <div key={idx} className="cursor-pointer" onClick={() => openFullscreen(images, idx)}>
              <img src={img} alt="" className="w-full h-full object-cover rounded-lg" />
            </div>
          ))}
        </div>
      );
    }
    
    if (imageCount === 5) {
      return (
        <div className="h-80">
          <div className="grid grid-cols-2 gap-1 h-2/5 mb-1">
            {images.slice(0, 2).map((img: string, idx: number) => (
              <div key={idx} className="cursor-pointer" onClick={() => openFullscreen(images, idx)}>
                <img src={img} alt="" className="w-full h-full object-cover rounded-lg" />
              </div>
            ))}
          </div>
          <div className="grid grid-cols-3 gap-1 h-3/5">
            {images.slice(2, 5).map((img: string, idx: number) => (
              <div key={idx + 2} className="cursor-pointer" onClick={() => openFullscreen(images, idx + 2)}>
                <img src={img} alt="" className="w-full h-full object-cover rounded-lg" />
              </div>
            ))}
          </div>
        </div>
      );
    }
    
    // More than 5 images
    const visibleImages: string[] = images.slice(0, 5);
    const remainingCount: number = imageCount - 5;
    
    return (
      <div className="h-80">
        <div className="grid grid-cols-2 gap-1 h-2/5 mb-1">
          {visibleImages.slice(0, 2).map((img: string, idx: number) => (
            <div key={idx} className="cursor-pointer" onClick={() => openFullscreen(images, idx)}>
              <img src={img} alt="" className="w-full h-full object-cover rounded-lg" />
            </div>
          ))}
        </div>
        <div className="grid grid-cols-3 gap-1 h-3/5">
          {visibleImages.slice(2, 4).map((img: string, idx: number) => (
            <div key={idx + 2} className="cursor-pointer" onClick={() => openFullscreen(images, idx + 2)}>
              <img src={img} alt="" className="w-full h-full object-cover rounded-lg" />
            </div>
          ))}
          <div 
            className="relative cursor-pointer" 
            onClick={() => openFullscreen(images, 4)}
          >
            <img src={visibleImages[4]} alt="" className="w-full h-full object-cover rounded-lg" />
            {remainingCount > 0 && (
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-lg">
                <span className="text-white text-xl font-bold">+{remainingCount}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const truncateText = (text: string, maxLines: number = 3): string => {
    const words: string[] = text.split(' ');
    const wordsPerLine: number = 6; // Approximate words per line
    const maxWords: number = maxLines * wordsPerLine;
    
    if (words.length <= maxWords) {
      return text;
    }
    
    return words.slice(0, maxWords).join(' ');
  };


  return (
    <div className="max-w-2xl mx-auto bg-gray-50 min-h-screen">
      <div className="space-y-4 p-4">
        {posts.map((post: FullPost) => {
          const { id, title, content, author, image_urls } = post;
          const { first_name, last_name, full_name, avatar_url } = author!

          const isExpanded: boolean = expandedPosts.has(id);
          // const fullText: string = title ? title + '\n\n' + content : content;
          const fullText: string = content;
          // if content is a string, with multiple new lines, split it into paragraphs
          // const fullText: string = content.split('\n').map((line) => line.trim()).join(' ');
          const paragraphs: string[] = fullText.split('\n').map((line) => line.trim()).filter((line) => line.length > 0);
          const truncatedText: string = truncateText(fullText);
          const shouldTruncate: boolean = fullText.length > truncatedText.length;

          return (
            <div key={post.id} className="bg-white rounded-lg shadow-sm border border-gray-200">
              {/* Post Header */}
              <div className="flex items-center justify-between p-4 pb-3">
                <div className="flex items-center space-x-3">
                  {/* <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">SU</span>
                  </div> */}
                  <div className="">
                  {avatar_url ? (
                    <Image
                      src={avatar_url}
                      alt="User avatar"
                      width={40}
                      height={40}
                      className="h-8 w-8 rounded-full object-cover"
                    />
                  ) : (
                    <AvatarInitials firstname={first_name} lastname={last_name} />
                  )}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-sm">{full_name}</h3>
                    <p className="text-gray-500 text-xs">{formatDistanceToNow(new Date(post.created_at), { addSuffix: true })}</p>
                  </div>
                </div>
                <button className="text-gray-400 hover:text-gray-600">
                  <MoreHorizontal size={20} />
                </button>
              </div>

              {/* Post Content */}
              <div className="px-4 pb-3">
                {title && <h2 className="font-medium text-gray-800 mb-2">{title}</h2>}
                               
                
                   
                {!isExpanded ? (<p className="text-gray-800 text-sm leading-relaxed inline">{truncatedText}</p>)
                 : 
                paragraphs.length > 0 && paragraphs.map((paragraph, index) => (
                  <p key={index} className="text-gray-800 text-sm leading-relaxed mb-2">
                    {paragraph}
                  </p>
                ))}
                  {shouldTruncate && !isExpanded && '...'}
                {shouldTruncate && (
                  <button
                    onClick={() => toggleExpanded(post.id)}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium mt-1"
                  >
                    {isExpanded ? 'See less' : 'See more'}
                  </button>
                )}
              </div>

              {/* Post Images */}
              {image_urls && image_urls.length > 0 && (
                <div className="px-4 pb-3">
                  {renderImageGrid(image_urls, id)}
                </div>
              )}

              {/* Post Actions */}
              {/* <div className="border-t border-gray-100 px-4 py-3">
                <div className="flex items-center justify-between text-gray-500 text-sm mb-2">
                  <span>{post.likes} likes</span>
                  <span>{post.comments} comments • {post.shares} shares</span>
                </div>
                <div className="flex items-center justify-around pt-2 border-t border-gray-100">
                  <button className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors">
                    <Heart size={18} />
                    <span className="text-sm font-medium">Like</span>
                  </button>
                  <button className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors">
                    <MessageCircle size={18} />
                    <span className="text-sm font-medium">Comment</span>
                  </button>
                  <button className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors">
                    <Share2 size={18} />
                    <span className="text-sm font-medium">Share</span>
                  </button>
                </div>
              </div> */}
            </div>
          );
        })}
      </div>

      {/* Fullscreen Modal */}
      {fullscreenMedia && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center">
          <button
            onClick={closeFullscreen}
            className="absolute top-4 left-4 text-white hover:text-gray-300 z-10"
          >
            <X size={24} />
          </button>
          
          {fullscreenMedia.length > 1 && (
            <>
              <button
                onClick={() => navigateMedia('prev')}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300"
              >
                <ChevronLeft size={32} />
              </button>
              <button
                onClick={() => navigateMedia('next')}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300"
              >
                <ChevronRight size={32} />
              </button>
            </>
          )}
          
          <div className="max-w-4xl max-h-full p-8">
            <img
              src={fullscreenMedia[currentMediaIndex]}
              alt=""
              className="max-w-full max-h-full object-contain"
            />
          </div>
          
          {fullscreenMedia.length > 1 && (
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-sm">
              {currentMediaIndex + 1} of {fullscreenMedia.length}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ResolutionsFeed;
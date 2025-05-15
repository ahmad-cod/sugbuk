import Image from "next/image";

interface FeedbackImagesProps {
  images: string[];
  maxDisplay: number;
  fullSize?: boolean;
}

const DEFAULT_IMAGE = "/buk-logo.png";

export default function FeedbackImages({ images, maxDisplay, fullSize = false }: FeedbackImagesProps) {
  const displayImages = images.slice(0, maxDisplay);
  const remainingCount = images.length - maxDisplay;
  
  // Layout classes based on number of visible images
  const getContainerClass = () => {
    if (displayImages.length === 1) return "h-48 sm:h-64";
    return "grid gap-2 grid-cols-2";
  };

  return (
    <div className={getContainerClass()}>
      {displayImages.map((url, idx) => (
        <div 
          key={idx} 
          className={`
            relative rounded-lg overflow-hidden border border-gray-200
            ${displayImages.length === 1 ? 'h-full w-full' : 'h-32'}
            ${fullSize && displayImages.length > 1 ? 'h-48' : ''}
          `}
        >
          <Image 
            src={url || DEFAULT_IMAGE}
            alt={`Feedback image ${idx + 1}`}
            fill
            className="object-cover"
          />
        </div>
      ))}
      
      {/* Show remaining count */}
      {remainingCount > 0 && (
        <div className="relative rounded-lg overflow-hidden border border-gray-200 h-32 bg-gray-100 flex items-center justify-center">
          <span className="text-lg font-medium text-gray-700">+{remainingCount}</span>
        </div>
      )}
    </div>
  );
}

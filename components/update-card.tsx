import Link from 'next/link';
import Image from 'next/image';
import { formatDistanceToNow } from 'date-fns';
import { Update } from '@/lib/types';

interface UpdateCardProps {
  update: Update;
  isPreview?: boolean;
}

export default function UpdateCard({ update, isPreview = false }: UpdateCardProps) {
  const formattedDate = formatDistanceToNow(new Date(update.createdAt), { addSuffix: true });
  
  return (
    <article className="bg-white rounded-xl shadow-md overflow-hidden transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg">
      {update.imageUrl && (
        <div className="relative w-full h-48">
          <Image 
            src={update.imageUrl} 
            alt={update.title}
            fill
            className="object-cover"
          />
        </div>
      )}
      <div className="p-5">
        <div className="flex items-center mb-3">
          {update.authorAvatarUrl ? (
            <Image 
              src={update.authorAvatarUrl} 
              alt={update.authorName}
              width={32}
              height={32}
              className="rounded-full mr-2"
            />
          ) : (
            <div className="w-8 h-8 bg-gray-200 rounded-full mr-2 flex items-center justify-center">
              <span className="text-gray-500 text-sm">{update.authorName.charAt(0)}</span>
            </div>
          )}
          <div>
            <p className="text-sm font-medium text-gray-900">{update.authorName}</p>
            <p className="text-xs text-gray-500">{formattedDate}</p>
          </div>
        </div>
        
        <h3 className="font-bold text-xl mb-2 text-gray-900">{update.title}</h3>
        
        {isPreview ? (
          <p className="text-gray-700 line-clamp-3 mb-4">{update.content}</p>
        ) : (
          <p className="text-gray-700 mb-4">{update.content}</p>
        )}
        
        {update.tags && update.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {update.tags.map(tag => (
              <span 
                key={tag} 
                className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
        
        {isPreview && (
          <Link href={`/updates/${update.id}`} className="text-blue-600 hover:text-blue-800 font-medium text-sm">
            Read more →
          </Link>
        )}
      </div>
    </article>
  );
}
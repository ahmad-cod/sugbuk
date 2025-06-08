import { NewsItem } from "@/lib/types";
import Image from "next/image";

export default function NewsCard({ item }: { item: NewsItem }) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 h-full group min-w-0">
      {/* Image */}
      <div className="relative h-80 md:h-56 overflow-hidden">
        <Image
          src={item.image_url}
          alt={item.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 768px) 95vw, 50vw"
        />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
        <div className="md:hidden absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
          <h3 className="text-lg text-center font-bold text-white line-clamp-2 group-hover:text-blue-400 transition-colors duration-200">
            {item.title}
          </h3>
          
        </div>
      </div>

      {/* Content */}
      <div className="p-6 hidden md:block">
        <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors duration-200 break-words">
          {item.title}
        </h3>
        
        {item.excerpt && (
          <p className="text-gray-600 text-sm mb-4 line-clamp-2 break-words">
            {item.excerpt}
          </p>
        )}

        <div className="flex items-center justify-between text-sm text-gray-500">
          <span className="font-medium truncate">by {item.author}</span>
          <span>{item.publication_date}</span>
        </div>
      </div>
    </div>
  );
}
import { NewsItem } from "@/lib/types";
import Image from "next/image";

export default function NewsCard({ item }: { item: NewsItem }) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 flex-1 group">
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={item.image_url}
          alt={item.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-green-700 transition-colors duration-200">
          {item.title}
        </h3>
        
        {item.excerpt && (
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {item.excerpt}
          </p>
        )}

        <div className="flex items-center justify-between text-sm text-gray-500">
          <span className="font-medium">by {item.author}</span>
          <span>{item.publication_date}</span>
        </div>
      </div>
    </div>
  );
}
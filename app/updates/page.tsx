'use client';

import { useEffect, useState } from 'react';
import { Update } from '@/lib/types';
// import { getAllUpdates } from '@/lib/supabase/updates';
import UpdateCard from '@/components/update-card';
import Link from 'next/link';
import { useIsAdmin } from '@/hooks/useIsAdmin';

export default function UpdatesPage() {
  const [updates, setUpdates] = useState<Update[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const { isAdmin, loading: adminLoading } = useIsAdmin();
  
  useEffect(() => {
    async function fetchUpdates() {
      // const data = await getAllUpdates();
      // setUpdates(data);
      setUpdates([])
      setLoading(false);
    }

    fetchUpdates();
  }, []);

  // Extract all unique tags
  const allTags = Array.from(
    new Set(
      updates
        .flatMap(update => update.tags || [])
        .filter(Boolean)
    )
  );

  // Filter updates by tag if one is selected
  const filteredUpdates = activeTag 
    ? updates.filter(update => update.tags?.includes(activeTag))
    : updates;

  if (loading) {
    return (
      <div className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900">Campus Updates</h1>
            <p className="mt-4 text-xl text-gray-600">Loading latest news and events...</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="animate-pulse bg-white rounded-xl shadow-md overflow-hidden">
                <div className="bg-gray-300 h-48 w-full"></div>
                <div className="p-5">
                  <div className="flex items-center mb-3">
                    <div className="rounded-full bg-gray-300 h-8 w-8 mr-2"></div>
                    <div className="space-y-2">
                      <div className="h-3 bg-gray-300 rounded w-24"></div>
                      <div className="h-2 bg-gray-300 rounded w-16"></div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="h-5 bg-gray-300 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-300 rounded w-full"></div>
                    <div className="h-4 bg-gray-300 rounded w-full"></div>
                    <div className="h-4 bg-gray-300 rounded w-2/3"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900">Campus Updates</h1>
          <p className="mt-4 text-xl text-gray-600">Stay informed with the latest news and events</p>
        </div>
        
        {isAdmin && !adminLoading && (
          <div className="mb-8 flex justify-center">
            <Link 
              href="/post/create" 
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Create New Update
            </Link>
          </div>
        )}
        
        {allTags.length > 0 && (
          <div className="mb-8">
            <div className="flex flex-wrap justify-center gap-2">
              <button
                onClick={() => setActiveTag(null)}
                className={`px-4 py-2 rounded-full text-sm font-medium ${
                  activeTag === null
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                All
              </button>
              {allTags.map(tag => (
                <button
                  key={tag}
                  onClick={() => setActiveTag(tag)}
                  className={`px-4 py-2 rounded-full text-sm font-medium ${
                    activeTag === tag
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        )}
        
        {filteredUpdates.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600">No updates found.</p>
            {activeTag && (
              <button
                onClick={() => setActiveTag(null)}
                className="mt-4 text-blue-600 hover:text-blue-800 font-medium"
              >
                Clear filter
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredUpdates.map(update => (
              <UpdateCard key={update.id} update={update} isPreview={true} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
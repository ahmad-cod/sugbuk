import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getRecentUpdates } from '@/lib/supabase/updates';
import UpdateCard from './update-card';
import { Update } from '@/lib/types';

export default function RecentUpdates() {
  const [updates, setUpdates] = useState<Update[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUpdates() {
      const data = await getRecentUpdates(3);
      setUpdates(data);
      setLoading(false);
    }

    fetchUpdates();
  }, []);

  if (loading) {
    return (
      <div className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Latest Updates</h2>
          <p className="mt-4 text-lg text-gray-600">Loading latest campus news and events...</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(3)].map((_, i) => (
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
    );
  }

  // If there are no updates, don't show this section
  if (updates.length === 0) {
    return null;
  }

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900">Latest Updates</h2>
        <p className="mt-4 text-lg text-gray-600">Stay informed with the most recent campus news and events</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {updates.map(update => (
          <UpdateCard key={update.id} update={update} isPreview={true} />
        ))}
      </div>
      
      <div className="mt-10 text-center">
        <Link href="/updates" className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
          View All Updates
        </Link>
      </div>
    </div>
  );
}
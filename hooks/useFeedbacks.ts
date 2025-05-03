"use client"
import { useState, useEffect } from 'react';
import { Feedback } from '@/app/feedbacks/utils';
import { createClient } from "@/utils/supabase/client";

export function useFeedbacks() {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const supabase = createClient();

  useEffect(() => {
    fetchFeedbacks()
  }, [])

  const fetchFeedbacks = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('feedbacks')
        .select(`
          *,
          profiles:profile_id (
            first_name,
            last_name,
            avatar_url
          )
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setFeedbacks(data as Feedback[]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch feedbacks');
    } finally {
      setIsLoading(false);
    }
  };
  


  const getLastThreeFeedbacks = (limit: number = 3) => {
    return feedbacks.slice(0, limit);
  };

  return {
    feedbacks,
    isLoading,
    error,
    fetchFeedbacks,
    getLastThreeFeedbacks
  };
}
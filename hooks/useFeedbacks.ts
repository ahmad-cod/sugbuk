"use client"
import { useState, useEffect } from 'react';
import { Feedback } from '@/app/feedbacks/utils';
import { createClient } from "@/utils/supabase/client";
import toast from 'react-hot-toast';
import { useProfile } from '@/contexts/ProfileContext';
import { useRouter } from 'next/navigation';
const supabase = createClient();

export function useFeedbacks() {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { profile } = useProfile()
  const router = useRouter()

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

  const insertFeedback = async (data: any) => {
    try {
      const { data: feedbackData, error } = await supabase
        .from("feedbacks")
        .insert([data]);

      if (error) {
        console.error("Error inserting feedback:", error);
      }

      return { feedbackData, error };
    } catch (err) {
      console.error("Error inserting feedback:", err);
    }
  };

  const deleteFeedback = async (feedbackId: string) => {
    if (!profile) return
    // if (profile.role !== 'admin') {

    setIsLoading(true)
    setError(null)
    try {
      // first check if the feedback belongs to the user
      const { data, error: fetchError } = await supabase
        .from('feedbacks')
        .select('profile_id')
        .eq('id', feedbackId)
        .single()

      if (fetchError) throw fetchError
      if (data.profile_id !== profile.id) {
        setError("You are not authorized to delete this feedback")
        return
      }

      console.log('Data from delete', data)

      const { error } = await supabase
        .from('feedbacks')
        .delete()
        .eq('id', feedbackId)
        .single()

      // redirect to the feedbacks page on successful deletion
      router.push('/feedbacks')
      toast.success("Feedback deleted successfully")
      if (error) {
        throw error
      }
      setFeedbacks((prevFeedbacks) => prevFeedbacks?.filter((feedback) => feedback.id !== feedbackId) || null)
    } catch (error) {
      console.error("Error deleting feedback:", error)
      setError("Failed to delete feedback")
      toast.error("Failed to delete feedback")
    } finally {
      setIsLoading(false)
    }
  }
  const updateFeedback = async (id: string, data: any) => {
    try {
      const { data: updatedData, error } = await supabase
        .from("feedbacks")
        .update(data)
        .eq("id", id);
      if (error) {
        console.error("Error updating feedback:", error);
      }
      return { updatedData, error };
    } catch (err) {
      console.error("Error updating feedback:", err);
    }
  };

  return {
    feedbacks,
    isLoading,
    error,
    fetchFeedbacks,
    insertFeedback,
    deleteFeedback,
    updateFeedback,
    getLastThreeFeedbacks
  };
}
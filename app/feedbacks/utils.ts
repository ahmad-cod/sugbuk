import { createClient } from "@/utils/supabase/client";

export interface Feedback {
  id: string;
  subject: string;
  message: string;
  category: string;
  recommendation?: string;
  image_urls?: string[];
  video_urls?: string[];
  is_anonymous: boolean;
  created_at: string;
  profile_id: string;
  profiles?: {
    first_name: string;
    last_name: string;
    avatar_url: string | null;
  };
}

const supabase = createClient();

export async function deleteFeedback(feedbackId: string, profileId: string) {
  try {
    // First verify if the feedback belongs to the user
    const { data: feedbackData, error: fetchError } = await supabase
      .from('feedbacks')
      .select('profile_id')
      .eq('id', feedbackId)
      .single();

    if (fetchError) throw fetchError;
    if (feedbackData.profile_id !== profileId) {
      throw new Error('Unauthorized to delete this feedback');
    }

    const { error } = await supabase
      .from('feedbacks')
      .delete()
      .eq('id', feedbackId);

    if (error) throw error;
    return { success: true, error: null };
  } catch (error) {
    console.error('Error deleting feedback:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Failed to delete feedback' };
  }
}

export async function updateFeedback(
  feedbackId: string, 
  profileId: string, 
  updates: Partial<Feedback>
) {
  try {
    // First verify if the feedback belongs to the user
    const { data: feedbackData, error: fetchError } = await supabase
      .from('feedbacks')
      .select('profile_id')
      .eq('id', feedbackId)
      .single();

    if (fetchError) throw fetchError;
    if (feedbackData.profile_id !== profileId) {
      throw new Error('Unauthorized to update this feedback');
    }

    const { data, error } = await supabase
      .from('feedbacks')
      .update(updates)
      .eq('id', feedbackId)
      .select();

    if (error) throw error;
    return { data: data[0] as Feedback, error: null };
  } catch (error) {
    console.error('Error updating feedback:', error);
    return { data: null, error: error instanceof Error ? error.message : 'Failed to update feedback' };
  }
}

export async function getFeedbackById(feedbackId: string) {
  try {
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
      .eq('id', feedbackId)
      .single();

    if (error) throw error;
    return { data: data as Feedback, error: null };
  } catch (error) {
    console.error('Error fetching feedback:', error);
    return { data: null, error: error instanceof Error ? error.message : 'Failed to fetch feedback' };
  }
}
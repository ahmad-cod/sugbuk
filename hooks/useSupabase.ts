import { createClient } from "@/utils/supabase/client";

const supabase = createClient();

// hook to insert a new row into the feedback database, post database
export const useSupabase = () => {
  const insertFeedback = async (data: any) => {
    const { data: feedbackData, error } = await supabase
      .from("feedbacks")
      .insert([data]);

    if (error) {
      console.error("Error inserting feedback:", error);
    }

    return { feedbackData, error };
  };

  const insertPost = async (data: any) => {
    const { data: postData, error } = await supabase
      .from("posts")
      .insert([data])
      .select();

    if (error) {
      console.error("Error inserting post:", error);
      return null;
    }

    return { postData, error };
  };

  return { insertFeedback, insertPost };
}

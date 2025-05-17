import { createClient } from "@/utils/supabase/server"

export async function fetchFeedbacks() {
  const supabase = await createClient()
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
        .eq('is_private', false)
        .order('created_at', { ascending: false });
    // .limit(3)

  if (error) throw new Error(error.message)
  return data
}

// const fetchFeedbacks = async () => {
//     try {
//       setIsLoading(true);
//       const { data, error } = await supabase
//         .from('feedbacks')
//         .select(`
//           *,
//           profiles:profile_id (
//             first_name,
//             last_name,
//             avatar_url
//           )
//         `)
//         .order('created_at', { ascending: false });

//       if (error) throw error;
//       setFeedbacks(data as Feedback[]);
//     } catch (err) {
//       setError(err instanceof Error ? err.message : 'Failed to fetch feedbacks');
//     } finally {
//       setIsLoading(false);
//     }
//   };
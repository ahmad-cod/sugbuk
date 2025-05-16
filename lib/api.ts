import { createClient } from "@/utils/supabase/server"

export async function fetchFeedbacks() {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('feedbacks')
    .select('*')
    .order('created_at', { ascending: false })
    // .limit(3)

  if (error) throw new Error(error.message)
  return data
}

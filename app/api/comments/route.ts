import { NextRequest, NextResponse } from 'next/server';
// import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
// import { Database } from '@/types/database';
import { createClient } from '@/utils/supabase/server';
import { profile } from 'console';

export async function POST(request: NextRequest) {
  const supabase = await createClient();
  
  // Check if user is authenticated
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: 'User not authenticated' }, { status: 401 });
  }
  // Check if user has a profile
  const { data: profileData, error: profileError } = await supabase
    .from('profiles')
    .select('id')
    .eq('user_id', user.id)
    .single();
  if (profileError || !profileData) {
    return NextResponse.json({ error: 'User profile not found' }, { status: 404 });
  }
  
  
  try {
    const { content, postId, parentCommentId } = await request.json();
    
    const { data, error } = await supabase
      .from('comments')
      .insert({
        content,
        post_id: postId,
        profile_id: profileData.id,
        parent_comment_id: parentCommentId || null,
      })
      .select('*, user:profile_id(id, first_name, last_name, avatar_url)')
      .single();
    
    if (error) throw error;
    
    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
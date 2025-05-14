// module for saving post drafts
import { createClient } from '@/utils/supabase/client';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const supabase = createClient();
  const body = await request.json();
  const { title, content, cover_image, tags } = body;

  // if (!title || !content || !cover_image || !tags) {
  //   return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
  // }

  const { data, error } = await supabase
    .from('posts')
    .insert([
      {
        title,
        content,
        cover_image,
        tags,
        is_published: false,
      },
    ])
    .select('*')
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}
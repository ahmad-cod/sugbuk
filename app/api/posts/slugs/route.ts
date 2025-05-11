import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/client'

const supabase = createClient()
// It returns the post data in JSON format
export async function GET() {
  const { data, error } = await supabase
    .from('posts')
    .select('slug')
    .eq('is_published', 'true');

  console.log('data', data);

  if (error) return NextResponse.json({ error }, { status: 500 });
  return NextResponse.json(data);
}
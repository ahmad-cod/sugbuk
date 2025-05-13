import { createClient } from '@/utils/supabase/client'
import { NextResponse } from 'next/server'

import { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const slug = searchParams.get('slug')
  const supabase = createClient()

  const { data, error } = await supabase
    .from('posts')
    .select('id, title, cover_image, content, author_id, tags, created_at')
    .eq('slug', slug)
    .eq('is_published', true)
    .single()

  if (error || !data) {
    return NextResponse.json({ error: 'Post not found' }, { status: 404 })
  }

  return NextResponse.json(data)
}

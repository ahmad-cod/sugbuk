import { createClient } from '@/utils/supabase/client'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest, { params }: { params: { slug: string } }) {
  const { slug } = params
  if (!slug) {
    return NextResponse.json({ error: 'Slug is required' }, { status: 400 })
  }
  // Check if slug is valid
  const slugRegex = /^[a-zA-Z0-9-]+$/
  if (!slugRegex.test(slug)) {
    return NextResponse.json({ error: 'Invalid slug' }, { status: 400 })
  }

  console.log('slug', slug)
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

import { notFound } from 'next/navigation'
import PostContent from '@/components/post-content'

async function getPostBySlug(slug: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/posts/${slug}`, {
    next: { revalidate: 60 }, // ISR: revalidate every 60s
  })

  if (!res.ok) return null
  return res.json()
}

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/posts/slugs`)
 
  if (!res.ok) {
    console.error('Failed to fetch post slugs: ', await res.text())
    return []
  }

  const posts = await res.json()
  return posts.map((post : any) => ({
    slug: post.slug,
  }))
}

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params
  if (!slug) return notFound()
  const post = await getPostBySlug(slug)

  if (!post) return notFound()

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      {/* <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <p className="text-sm text-gray-500 mb-6">By {post.author_id}</p> */}
      <PostContent data={post} />
    </div>
  )
}

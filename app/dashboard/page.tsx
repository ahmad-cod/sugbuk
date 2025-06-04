'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { createClient } from '@/utils/supabase/client'

export default function DashboardPage() {
  const supabase = createClient()

  const [isAdmin, setIsAdmin] = useState(false)
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({
    totalReports: 0,
    unresolvedReports: 0,
    totalPosts: 0,
    totalResolutions: 0,
  })

  useEffect(() => {
    const fetchData = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (user?.user_metadata?.role !== 'admin') {
        setIsAdmin(false)
        setLoading(false)
        return
      }

      setIsAdmin(true)

      const [reportsRes, postsRes, resolutionsRes] = await Promise.all([
        supabase.from('reports').select('id, status'),
        supabase.from('posts').select('id'),
        supabase.from('feedbacks').select('id'),
      ])

      const allReports = reportsRes.data || []
      const unresolved = allReports.filter((r) => r.status !== 'resolved')

      setStats({
        totalReports: allReports.length,
        unresolvedReports: unresolved.length,
        totalPosts: postsRes.data?.length || 0,
        totalResolutions: resolutionsRes.data?.length || 0,
      })

      setLoading(false)
    }

    fetchData()
  }, [supabase])

  if (loading) return <p className="p-6">Loading...</p>
  if (!isAdmin) return <p className="p-6 text-red-600">Access Denied</p>

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card title="Total Reports" count={stats.totalReports} href="/reports" />
        <Card title="Unresolved Reports" count={stats.unresolvedReports} href="/reports" />
        <Card title="Posts / Updates" count={stats.totalPosts} href="/updates" />
        <Card title="Feedbacks Sent" count={stats.totalResolutions} href="/feedbacks" />
      </div>
    </div>
  )
}

function Card({ title, count, href }: { title: string; count: number; href: string }) {
  return (
    <Link
      href={href}
      className="bg-white shadow p-4 rounded-xl hover:shadow-md transition duration-200 border border-gray-100"
    >
      <h2 className="text-lg font-medium">{title}</h2>
      <p className="text-2xl font-bold text-blue-600">{count}</p>
      <p className="text-sm text-blue-500 mt-1">View Details →</p>
    </Link>
  )
}

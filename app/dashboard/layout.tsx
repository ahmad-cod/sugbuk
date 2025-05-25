// app/admin/layout.tsx
import { ReactNode } from 'react'

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="w-full flex flex-col md:flex-row min-h-screen">
      <aside className="w-full md:w-64 bg-blue-600 text-white p-4">
        <nav className="space-y-2">
          <a href="/reports">Reports</a>
          <a href="/feedbacks">Resolutions</a>
          <a href="/posts">Posts</a>
        </nav>
      </aside>
      <main className="flex-1 p-6 bg-gray-50">{children}</main>
    </div>
  )
}

// app/admin/layout.tsx
import { ReactNode } from 'react'

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="w-full flex flex-col md:flex-row justify-between min-h-screen">
      <aside className="w-full md:w-64 bg-blue-600 text-white sm:p-4">
        {/* <nav className="flex md:flex-col justify-between items-center md:items-start h-[500px] px-2">
          <a className='' href="/reports">Reports</a>
          <a href="/feedbacks">Resolutions</a>
          <a href="/posts">Posts</a>
        </nav> */}
      </aside>
      <main className="flex-1 p-6 bg-gray-50">{children}</main>
    </div>
  )
}

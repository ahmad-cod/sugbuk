"use client"
import { useState } from 'react'
import { createClient } from "@/utils/supabase/client"
import { useRouter } from 'next/navigation'
// import { redirect } from 'next/navigation'

interface ReportFormData {
  title: string
  description: string
  recommendation: string
  is_private: boolean
  // current_status: 'pending' | 'open' | 'in-progress' | 'closed'
}

export default function Report() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState<ReportFormData>({
    title: '',
    description: '',
    recommendation: '',
    is_private: false,
    // current_status: 'pending'
  })

  const supabase = createClient()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)
    const submitData = {
      ...formData,
      created_at: new Date().toISOString()
    }
    console.log('Submitting report...')
    try {
      const { data, error } = await supabase
        .from('reports')
        .insert([submitData])
        .select()
      if (error) throw error
      
      // Redirect to the report list page
      router.push('/reports')
      // router.refresh()
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An unexpected error occurred while submitting the report.')
    } finally {
      setIsSubmitting(false)
    }

    console.log('Report submitted successfully')

  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    const fieldValue = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    setFormData(prev => ({
      ...prev,
      [name]: fieldValue
    }))
  }

  return (
    <section className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Report an Issue</h2>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col">
          <label htmlFor="title" className="mb-1">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="border rounded p-2"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="description" className="mb-1">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            className="border rounded p-2 min-h-[100px]"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="recommendation" className="mb-1">Recommendation</label>
          <textarea
            id="recommendation"
            name="recommendation"
            value={formData.recommendation}
            onChange={handleChange}
            className="border rounded p-2 min-h-[100px]"
          />
        </div>

        {/* <div className="flex flex-col">
          <label htmlFor="current_status" className="mb-1">Status</label>
          <select
            id="current_status"
            name="current_status"
            value={formData.current_status}
            onChange={handleChange}
            className="border rounded p-2"
          >
            <option value="pending">Pending</option>
            <option value="open">Open</option>
            <option value="in-progress">In Progress</option>
            <option value="closed">Closed</option>
          </select>
        </div> */}

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="is_private"
            name="is_private"
            checked={formData.is_private}
            onChange={handleChange}
            className="rounded"
          />
          <label htmlFor="is_private">Make this report private</label>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          { isSubmitting ? 'Submitting...' : 'Submit Report' }
        </button>
      </form>
    </section>
  )
}
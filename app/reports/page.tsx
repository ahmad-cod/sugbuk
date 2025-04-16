'use client'

import { createClient } from "@/utils/supabase/client"
import { useEffect, useState } from "react"

export default function ReportsPage() {
  const [reports, setReports] = useState<any[] | null>(null)
  const supabase = createClient()

  useEffect(() => {
    const getData = async () => {
      const { data } = await supabase.from('reports').select()
      setReports(data)
    }

    getData()
  }, [])

  if (!reports) {
    return <div>Loading...</div>
  }
  return (
    <div>
      <h1>Reports</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Description</th>
            <th>Created At</th>
            {/* <th>Recommendation</th> */}
            <th>Status</th>
            <th>Private</th>
          </tr>
        </thead>
        <tbody>
          {reports.map((report) => (
            <tr key={report.id}>
              <td>{report.id}</td>
              <td>{report.title}</td>
              <td>{report.description}</td>
              <td>{new Date(report.created_at).toLocaleString()}</td>
              {/* <td>{report.recommendation}</td> */}
              <td>{report.current_status}</td>
              <td>{report.is_private ? 'Yes' : 'No'}</td>
              <td>
                <button>Edit</button>
                <button>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button>Add Report</button>
      <button>Export</button>
      <button>Download</button>
      <button>Sync</button>
      <button>Search</button>
      </div>
  )
}
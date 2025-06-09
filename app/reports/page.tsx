"use client"
import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { useIsAdmin } from '@/hooks/useIsAdmin';
import SectionTitle from '@/components/ui/section-title';

interface Report {
  id: string;
  user_id: string;
  title: string;
  description: string;
  status: string;
  created_at: string;
}

export default function ReportsPage() {
  const { isAdmin, loading: adminLoading } = useIsAdmin();
  const supabase = createClient();

  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (adminLoading) return; // Wait until admin check is complete

    async function fetchReports() {
      setLoading(true);
      const { data: { session } } = await supabase.auth.getSession();
      const userId = session?.user.id;

      let query = supabase.from('reports').select('*').order('created_at', { ascending: false });

      if (!isAdmin) {
        query = query.eq('user_id', userId);
      }

      const { data, error } = await query;
      if (error) {
        console.error('Error fetching reports:', error);
      } else {
        setReports(data || []);
      }
      setLoading(false);
    }

    fetchReports();
  }, [isAdmin, adminLoading]);

  const editStatus = async (reportId: string, newStatus: string) => {
    const { error } = await supabase
      .from('reports')
      .update({ status: newStatus })
      .eq('id', reportId);
    if (error) {
      console.error('Error updating report status:', error);
    } else {
      setReports((prev) =>
        prev.map((report) =>
          report.id === reportId ? { ...report, status: newStatus } : report
        )
      );
    }
  };
  const deleteReport = async (reportId: string) => {
    const { error } = await supabase
      .from('reports')
      .delete()
      .eq('id', reportId);
    if (error) {
      console.error('Error deleting report:', error);
    } else {
      setReports((prev) => prev.filter((report) => report.id !== reportId));
    }
  };

  if (loading || adminLoading) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <SectionTitle title='Reports' />
      {reports.length === 0 ? (
        <p>No reports found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reports.map((report) => (
            <div key={report.id} className="border p-4 rounded-xl shadow-sm">
              <h2 className="text-lg font-semibold">{report.title}</h2>
              <p className="text-sm text-gray-600">{report.description}</p>
              <p className="text-xs text-gray-400 mt-1">Status: {report.status}</p>
              <p className="text-xs text-gray-400">Submitted: {new Date(report.created_at).toLocaleString()}</p>
              {/* {isAdmin && (
                <div className="mt-2 flex gap-2">
                  <button className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600">Edit Status</button>
                  <button 
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >Delete</button>
                </div>
              )} */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

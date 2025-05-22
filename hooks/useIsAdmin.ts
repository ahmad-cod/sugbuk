import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { useProfile } from '@/contexts/ProfileContext';

export function useIsAdmin(): { isAdmin: boolean, loading: boolean } {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const { profile } = useProfile();
  const supabase = createClient();

  useEffect(() => {
    async function checkAdminRole() {
      if (!profile) {
        setIsAdmin(false);
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', profile.user_id)
          .single();

        if (error) throw error;
        
        setIsAdmin(data.role === 'admin');
      } catch (error) {
        console.error('Error checking admin role:', error);
        setIsAdmin(false);
      } finally {
        setLoading(false);
      }
    }

    checkAdminRole();
  }, [profile]);

  return { isAdmin, loading };
}
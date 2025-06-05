"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"
import { createClient } from "@/utils/supabase/client"

// user profile type
export interface UserProfile {
  id: number;
  user_id: string;
  first_name: string;
  last_name: string;
  avatar_url: string;
  role: string;
}

interface ProfileContextType {
  profile: UserProfile | null;
  isLoading: boolean;
  error: Error | null;
  refreshProfile: () => Promise<void>; 
  updateProfile: (profile: Partial<UserProfile>) => Promise<void>;
  logout: () => Promise<void>;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export const ProfileProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const supabase = createClient()

  // fetch user profile on initial load
  useEffect(() => {
    fetchProfile()
  }, [])

  const fetchProfile = async () => {
    setIsLoading(true)
    setError(null)

    try {
      // Get current user
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        setProfile(null)
        return
      }

      // get profile data
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_id", user.id)
        .single()

      if (error) throw error

      setProfile(data as UserProfile)
    } catch (err) {
      console.error('Error fetching profile: ', err)
      setError(err instanceof Error ? err : new Error('Failed to fetch profile'))
    } finally {
      setIsLoading(false)
    }
  }

  const refreshProfile = async () => {
    await fetchProfile()
  }

  const updateProfile = async (updates: Partial<UserProfile>) => {
    try {
      if (!profile) throw new Error('No profile to update')
      
      const { error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', profile.id)
        
      if (error) throw error
      
      // Refresh profile after update
      await refreshProfile();
    } catch (err) {
      console.error('Error updating profile:', err)
      throw err
    }
  }

  const logout = async () => {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      setProfile(null)
    } catch (err) {
      console.error('Error logging out: ', err)
      throw err
    }
  }

  return (
    <ProfileContext.Provider value={{ profile, isLoading, error, refreshProfile, updateProfile, logout }}>
      {children}
    </ProfileContext.Provider>
  )
}

// Custom hook to use the ProfileContext
export const useProfile = () => {
  const context = useContext(ProfileContext)
  if (context === undefined) {
    throw new Error('useProfile must be used within a ProfileProvider')
  }
  return context
}
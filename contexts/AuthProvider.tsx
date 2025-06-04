'use client'

import { createContext, useEffect, useState, useContext, ReactNode } from "react"
import { Session } from "@supabase/supabase-js"
import { createClient } from "@/utils/supabase/client"

type sessionType = Session | null;
interface AuthContextType {
  session: sessionType;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  session: null,
  loading: true
})

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const supabase = createClient()
  const [session, setSession] = useState<sessionType>(null)
  const [loading, setLoading] = useState(true)

    useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getSession()
      setSession(data.session)
      setLoading(false)
    }

    getSession()

    const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session)
    })

    return () => {
      listener.subscription.unsubscribe()
    }
  }, [])

  return (
    <AuthContext.Provider value={{ session, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
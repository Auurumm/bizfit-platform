'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { User, Session } from '@supabase/supabase-js'
import { supabase, Profile } from './supabase'

interface AuthContextType {
  user: User | null
  profile: Profile | null
  session: Session | null
  loading: boolean
  signUp: (email: string, password: string, name: string, userType: 'user' | 'expert') => Promise<{ error: any }>
  signIn: (email: string, password: string) => Promise<{ error: any }>
  signOut: () => Promise<void>
  updateProfile: (updates: Partial<Profile>) => Promise<{ error: any }>
  resetPassword: (email: string) => Promise<{ error: any }>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)

  // 프로필 가져오기 (없으면 생성)
  const fetchOrCreateProfile = async (currentUser: User): Promise<Profile | null> => {
    console.log("fetchOrCreateProfile 시작:", currentUser.email)
    
    try {
      // 타임아웃 설정 (5초)
      const timeoutPromise = new Promise<null>((_, reject) => 
        setTimeout(() => reject(new Error('Timeout')), 5000)
      )
      
      const fetchPromise = async () => {
        console.log("프로필 조회 중...")
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', currentUser.id)
          .single()
        
        console.log("프로필 조회 결과:", { data, error })
        
        if (data) {
          return data as Profile
        }
        
        // 프로필이 없으면 생성
        if (error && error.code === 'PGRST116') {
          console.log("프로필 없음, 새로 생성...")
          
          // user_metadata에서 user_type 가져오기 (명시적으로 'expert'일 때만 expert, 그 외 모두 'user')
        const userType = currentUser.user_metadata?.user_type
        const isExpert = userType === 'expert'

        console.log("user_metadata:", currentUser.user_metadata)
        console.log("user_type 판단:", { userType, isExpert })

        const newProfile = {
          id: currentUser.id,
          email: currentUser.email || '',
          name: currentUser.user_metadata?.name || currentUser.email?.split('@')[0] || '',
          user_type: isExpert ? 'expert' : 'user',
          phone: '',
          company: '',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
          
          const { data: created, error: createError } = await supabase
            .from('profiles')
            .insert(newProfile)
            .select()
            .single()
          
          if (createError) {
            console.error('프로필 생성 오류:', createError)
            return null
          }
          
          return created as Profile
        }
        
        console.error('프로필 조회 오류:', error)
        return null
      }
      
      // 타임아웃과 fetch 중 먼저 완료되는 것 반환
      const result = await Promise.race([fetchPromise(), timeoutPromise])
      return result
      
    } catch (err) {
      console.error('fetchOrCreateProfile 예외:', err)
      
      // user_type 판단 (명시적으로 'expert'일 때만)
      const userType = currentUser.user_metadata?.user_type
      const isExpert = userType === 'expert'
      
      // 타임아웃이나 에러 시 임시 프로필 반환
      return {
        id: currentUser.id,
        email: currentUser.email || '',
        name: currentUser.user_metadata?.name || currentUser.email?.split('@')[0] || '사용자',
        user_type: isExpert ? 'expert' : 'user',
        phone: '',
        company: '',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      } as Profile
    }
  }

  useEffect(() => {
    // 현재 세션 확인
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      setSession(session)
      setUser(session?.user ?? null)
      
      if (session?.user) {
        const userProfile = await fetchOrCreateProfile(session.user)
        setProfile(userProfile)
      }
      setLoading(false)
    })

    // 인증 상태 변경 리스너
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log("Auth 상태 변경:", event)
        setSession(session)
        setUser(session?.user ?? null)
        
        if (session?.user) {
          const userProfile = await fetchOrCreateProfile(session.user)
          setProfile(userProfile)
        } else {
          setProfile(null)
        }
        setLoading(false)
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  // 회원가입
  const signUp = async (email: string, password: string, name: string, userType: 'user' | 'expert') => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
          user_type: userType
        }
      }
    })
    
    if (!error && data.user && !data.user.identities?.length) {
      return { error: { message: 'already registered' } }
    }
    
    return { error }
  }

  // 로그인
  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    })
    return { error }
  }

  // 로그아웃
  const signOut = async () => {
    await supabase.auth.signOut()
    setUser(null)
    setProfile(null)
    setSession(null)
  }

  // 프로필 업데이트
  const updateProfile = async (updates: Partial<Profile>) => {
    if (!user) return { error: '로그인이 필요합니다.' }
    
    const { error } = await supabase
      .from('profiles')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', user.id)
    
    if (!error) {
      setProfile(prev => prev ? { ...prev, ...updates } : null)
    }
    
    return { error }
  }

  // 비밀번호 재설정 이메일 발송
  const resetPassword = async (email: string) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`
    })
    return { error }
  }

  return (
    <AuthContext.Provider value={{
      user,
      profile,
      session,
      loading,
      signUp,
      signIn,
      signOut,
      updateProfile,
      resetPassword
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// 타입 정의
export interface Profile {
  id: string
  email: string
  name: string | null
  user_type: 'user' | 'expert'
  company: string | null
  phone: string | null
  created_at: string
  updated_at: string
}

export interface ExpertProfile {
  id: string
  title: string | null
  organization: string | null
  specialties: string[] | null
  location: string | null
  experience: number | null
  price: number | null
  availability: string | null
  image_url: string | null
  description: string | null
  category: string | null
  is_approved: boolean
  created_at: string
}

export interface DiagnosisResult {
  id: string
  user_id: string
  result: any
  created_at: string
}

export interface Bookmark {
  id: string
  user_id: string
  program_id: string
  program_name: string
  created_at: string
}
// 완전히 안전한 Supabase 클라이언트 - 오류 절대 발생 안함

let supabaseClient: any = null

try {
  // 환경 변수 확인
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (url && key) {
    const { createClient } = require("@supabase/supabase-js")
    supabaseClient = createClient(url, key)
    console.log("✅ Supabase 클라이언트 정상 연결")
  } else {
    console.warn("⚠️ Supabase 환경 변수 없음 - 더미 클라이언트 사용")
    // 더미 클라이언트
    supabaseClient = {
      auth: {
        getSession: () => Promise.resolve({ data: { session: null }, error: null }),
        signInWithPassword: () => Promise.resolve({ data: null, error: { message: "Supabase 미설정" } }),
        signOut: () => Promise.resolve({ error: null }),
        onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
      },
      from: () => ({
        select: () => ({ eq: () => ({ single: () => Promise.resolve({ data: null, error: null }) }) }),
        upsert: () => ({ select: () => ({ single: () => Promise.resolve({ data: null, error: null }) }) }),
      }),
    }
  }
} catch (error) {
  console.error("Supabase 초기화 실패:", error)
  // 완전 더미 클라이언트
  supabaseClient = {
    auth: {
      getSession: () => Promise.resolve({ data: { session: null }, error: null }),
      signInWithPassword: () => Promise.resolve({ data: null, error: { message: "연결 실패" } }),
      signOut: () => Promise.resolve({ error: null }),
      onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
    },
    from: () => ({
      select: () => ({ eq: () => ({ single: () => Promise.resolve({ data: null, error: null }) }) }),
      upsert: () => ({ select: () => ({ single: () => Promise.resolve({ data: null, error: null }) }) }),
    }),
  }
}

export const supabase = supabaseClient
export default supabaseClient
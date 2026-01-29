'use client'

import PageHeader from "@/components/sections/PageHeader"
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Layout from "@/components/layout/Layout"
import { supabase } from '@/lib/supabase'

export default function ResetPasswordPage() {
  const router = useRouter()
  
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [validSession, setValidSession] = useState(false)
  const [checking, setChecking] = useState(true)

  useEffect(() => {
    // URL에서 토큰 확인 (Supabase가 자동으로 세션 복원)
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      
      if (session) {
        setValidSession(true)
      } else {
        setError('유효하지 않거나 만료된 링크입니다. 비밀번호 찾기를 다시 시도해주세요.')
      }
      setChecking(false)
    }
    
    checkSession()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (password.length < 6) {
      setError('비밀번호는 6자 이상이어야 합니다.')
      return
    }

    if (password !== confirmPassword) {
      setError('비밀번호가 일치하지 않습니다.')
      return
    }

    setLoading(true)

    const { error } = await supabase.auth.updateUser({
      password: password
    })

    if (error) {
      setError('비밀번호 변경 중 오류가 발생했습니다. 다시 시도해주세요.')
      setLoading(false)
    } else {
      setSuccess(true)
    }
  }

  // 확인 중
  if (checking) {
    return (
      <Layout>
        <section className="py-160">
          <div className="container text-center">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-3 text-muted">링크를 확인하는 중...</p>
          </div>
        </section>
      </Layout>
    )
  }

  return (
    <Layout>
      {/* 페이지 헤더 */}
      <section className="page-header position-relative overflow-hidden pt-160 pb-100" 
        style={{ backgroundColor: '#152833' }}>
        <div className="container position-relative z-1">
          <div className="text-center">
            <h1 className="text-white ds-3 mb-3">비밀번호 재설정</h1>
            <p className="text-white text-opacity-75 fs-5">
              새로운 비밀번호를 설정해주세요
            </p>
          </div>
        </div>
      </section>

      {/* 폼 */}
      <section className="py-120">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-5 col-md-7">
              <div className="card border-0 shadow-lg rounded-4">
                <div className="card-body p-5">
                  
                  {/* 유효하지 않은 링크 */}
                  {!validSession && !success && (
                    <div className="text-center py-4">
                      <div className="icon-shape icon-80 bg-danger bg-opacity-10 rounded-circle mx-auto mb-4 d-flex align-items-center justify-content-center">
                        <i className="bi bi-x-circle text-danger fs-1"></i>
                      </div>
                      <h3 className="mb-3">링크가 만료되었습니다</h3>
                      <p className="text-muted mb-4">{error}</p>
                      <Link href="/login" className="btn btn-primary">
                        비밀번호 찾기 다시 하기
                      </Link>
                    </div>
                  )}

                  {/* 비밀번호 입력 폼 */}
                  {validSession && !success && (
                    <>
                      <div className="text-center mb-5">
                        <div className="icon-shape icon-60 bg-primary bg-opacity-10 rounded-circle mx-auto mb-3 d-flex align-items-center justify-content-center">
                          <i className="bi bi-shield-lock text-primary fs-4"></i>
                        </div>
                        <h3 className="mb-2">새 비밀번호 설정</h3>
                        <p className="text-muted">새로운 비밀번호를 입력해주세요</p>
                      </div>

                      {error && (
                        <div className="alert alert-danger mb-4">
                          <i className="bi bi-exclamation-circle me-2"></i>
                          {error}
                        </div>
                      )}

                      <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                          <label className="form-label">새 비밀번호</label>
                          <input
                            type="password"
                            className="form-control form-control-lg"
                            placeholder="6자 이상 입력"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                          />
                        </div>

                        <div className="mb-4">
                          <label className="form-label">비밀번호 확인</label>
                          <input
                            type="password"
                            className="form-control form-control-lg"
                            placeholder="비밀번호 재입력"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                          />
                        </div>

                        <button 
                          type="submit" 
                          className="btn btn-primary w-100 py-3"
                          disabled={loading}
                        >
                          {loading ? (
                            <>
                              <span className="spinner-border spinner-border-sm me-2"></span>
                              변경 중...
                            </>
                          ) : (
                            <>
                              <i className="bi bi-check-lg me-2"></i>
                              비밀번호 변경
                            </>
                          )}
                        </button>
                      </form>
                    </>
                  )}

                  {/* 성공 */}
                  {success && (
                    <div className="text-center py-4">
                      <div className="icon-shape icon-80 bg-success bg-opacity-10 rounded-circle mx-auto mb-4 d-flex align-items-center justify-content-center">
                        <i className="bi bi-check-circle text-success fs-1"></i>
                      </div>
                      <h3 className="mb-3">비밀번호가 변경되었습니다!</h3>
                      <p className="text-muted mb-4">
                        새로운 비밀번호로 로그인해주세요.
                      </p>
                      <Link href="/login" className="btn btn-primary">
                        로그인하기
                      </Link>
                    </div>
                  )}

                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}
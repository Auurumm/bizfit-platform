'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Layout from "@/components/layout/Layout"
import { useAuth } from '@/lib/AuthContext'

export default function LoginPage() {
  const router = useRouter()
  const { signIn, resetPassword } = useAuth()
  
  const [mode, setMode] = useState<'login' | 'forgot'>('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [resetSent, setResetSent] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const { error } = await signIn(email, password)

    if (error) {
      if (error.message.includes('Invalid login credentials')) {
        setError('이메일 또는 비밀번호가 올바르지 않습니다.')
      } else if (error.message.includes('Email not confirmed')) {
        setError('이메일 인증이 완료되지 않았습니다. 메일함을 확인해주세요.')
      } else {
        setError('로그인 중 오류가 발생했습니다. 다시 시도해주세요.')
      }
      setLoading(false)
    } else {
      router.push('/')
    }
  }

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    
    if (!email) {
      setError('이메일을 입력해주세요.')
      return
    }
    
    setLoading(true)

    const { error } = await resetPassword(email)

    if (error) {
      setError('비밀번호 재설정 이메일 발송 중 오류가 발생했습니다.')
    } else {
      setResetSent(true)
    }
    setLoading(false)
  }

  return (
    <Layout>
      {/* 페이지 헤더 */}
      <section className="page-header position-relative overflow-hidden pt-160 pb-100" 
        style={{ backgroundColor: '#152833' }}>
        <div className="container position-relative z-1">
          <div className="text-center">
            <h1 className="text-white ds-3 mb-3">
              {mode === 'login' ? '로그인' : '비밀번호 찾기'}
            </h1>
            <p className="text-white text-opacity-75 fs-5">
              {mode === 'login' 
                ? '비즈핏에 오신 것을 환영합니다'
                : '가입하신 이메일로 비밀번호 재설정 링크를 보내드립니다'
              }
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
                  
                  {/* 로그인 모드 */}
                  {mode === 'login' && (
                    <>
                      <div className="text-center mb-5">
                        <div className="icon-shape icon-60 bg-primary bg-opacity-10 rounded-circle mx-auto mb-3 d-flex align-items-center justify-content-center">
                          <i className="bi bi-person text-primary fs-4"></i>
                        </div>
                        <h3 className="mb-2">로그인</h3>
                        <p className="text-muted">계정 정보를 입력해주세요</p>
                      </div>

                      {error && (
                        <div className="alert alert-danger mb-4">
                          <i className="bi bi-exclamation-circle me-2"></i>
                          {error}
                        </div>
                      )}

                      <form onSubmit={handleLogin}>
                        <div className="mb-3">
                          <label className="form-label">이메일</label>
                          <input
                            type="email"
                            className="form-control form-control-lg"
                            placeholder="example@email.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                          />
                        </div>

                        <div className="mb-4">
                          <div className="d-flex justify-content-between align-items-center mb-2">
                            <label className="form-label mb-0">비밀번호</label>
                            <button 
                              type="button"
                              className="btn btn-link btn-sm p-0 text-decoration-none"
                              onClick={() => { setMode('forgot'); setError(''); }}
                            >
                              비밀번호를 잊으셨나요?
                            </button>
                          </div>
                          <input
                            type="password"
                            className="form-control form-control-lg"
                            placeholder="비밀번호 입력"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                          />
                        </div>

                        <button 
                          type="submit" 
                          className="btn btn-primary w-100 py-3 mb-4"
                          disabled={loading}
                        >
                          {loading ? (
                            <>
                              <span className="spinner-border spinner-border-sm me-2"></span>
                              로그인 중...
                            </>
                          ) : (
                            <>
                              <i className="bi bi-box-arrow-in-right me-2"></i>
                              로그인
                            </>
                          )}
                        </button>
                      </form>

                      <div className="text-center">
                        <p className="text-muted mb-0">
                          아직 계정이 없으신가요?{' '}
                          <Link href="/register" className="text-primary fw-semibold text-decoration-none">
                            회원가입
                          </Link>
                        </p>
                      </div>
                    </>
                  )}

                  {/* 비밀번호 찾기 모드 */}
                  {mode === 'forgot' && !resetSent && (
                    <>
                      <div className="text-center mb-5">
                        <div className="icon-shape icon-60 bg-warning bg-opacity-10 rounded-circle mx-auto mb-3 d-flex align-items-center justify-content-center">
                          <i className="bi bi-key text-warning fs-4"></i>
                        </div>
                        <h3 className="mb-2">비밀번호 찾기</h3>
                        <p className="text-muted">가입하신 이메일을 입력해주세요</p>
                      </div>

                      {error && (
                        <div className="alert alert-danger mb-4">
                          <i className="bi bi-exclamation-circle me-2"></i>
                          {error}
                        </div>
                      )}

                      <form onSubmit={handleForgotPassword}>
                        <div className="mb-4">
                          <label className="form-label">이메일</label>
                          <input
                            type="email"
                            className="form-control form-control-lg"
                            placeholder="example@email.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                          />
                          <small className="text-muted">
                            가입 시 사용한 이메일 주소를 입력해주세요
                          </small>
                        </div>

                        <button 
                          type="submit" 
                          className="btn btn-primary w-100 py-3 mb-4"
                          disabled={loading}
                        >
                          {loading ? (
                            <>
                              <span className="spinner-border spinner-border-sm me-2"></span>
                              발송 중...
                            </>
                          ) : (
                            <>
                              <i className="bi bi-envelope me-2"></i>
                              비밀번호 재설정 링크 받기
                            </>
                          )}
                        </button>
                      </form>

                      <div className="text-center">
                        <button 
                          className="btn btn-link text-muted text-decoration-none"
                          onClick={() => { setMode('login'); setError(''); }}
                        >
                          <i className="bi bi-arrow-left me-1"></i>
                          로그인으로 돌아가기
                        </button>
                      </div>
                    </>
                  )}

                  {/* 이메일 발송 완료 */}
                  {mode === 'forgot' && resetSent && (
                    <div className="text-center py-4">
                      <div className="icon-shape icon-80 bg-success bg-opacity-10 rounded-circle mx-auto mb-4 d-flex align-items-center justify-content-center">
                        <i className="bi bi-envelope-check text-success fs-1"></i>
                      </div>
                      <h3 className="mb-3">이메일을 확인해주세요</h3>
                      <p className="text-muted mb-4">
                        <strong>{email}</strong>로<br/>
                        비밀번호 재설정 링크를 발송했습니다.
                      </p>
                      <p className="text-muted small mb-4">
                        이메일이 도착하지 않았다면 스팸 폴더를 확인해주세요.
                      </p>
                      <div className="d-flex flex-column gap-2">
                        <button 
                          className="btn btn-outline-primary"
                          onClick={() => { setResetSent(false); setEmail(''); }}
                        >
                          다른 이메일로 다시 시도
                        </button>
                        <button 
                          className="btn btn-link text-muted text-decoration-none"
                          onClick={() => { setMode('login'); setResetSent(false); setError(''); }}
                        >
                          로그인으로 돌아가기
                        </button>
                      </div>
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
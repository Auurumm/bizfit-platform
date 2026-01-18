'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Layout from "@/components/layout/Layout"
import { useAuth } from '@/lib/AuthContext'
import { supabase } from '@/lib/supabase'

// Google Apps Script URL
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyjCdv9Cg3ooAz5E-DE27oOkVhPUCmA_mChScMc5zL_cY81M7EpiK082RSfCVbpn8Xm/exec";

interface ExpertInfo {
  id: string
  name: string
  title: string
  company: string
  specialties: string[]
  location: string
  experience: number
  price: number
  availability: string
  email: string
  category: string
  description: string
  approved: string
  rating: number
  reviews: number
}

export default function MyPage() {
  const router = useRouter()
  const { user, profile, loading: authLoading, signOut, updateProfile } = useAuth()
  
  const [activeTab, setActiveTab] = useState('profile')
  const [editing, setEditing] = useState(false)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState({ type: '', text: '' })
  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    company: ''
  })

  // 진단 결과 & 북마크
  const [diagnosisResults, setDiagnosisResults] = useState<any[]>([])
  const [bookmarks, setBookmarks] = useState<any[]>([])
  const [dataLoading, setDataLoading] = useState(false)
  
  // 전문가 정보
  const [expertInfo, setExpertInfo] = useState<ExpertInfo | null>(null)
  const [expertLoading, setExpertLoading] = useState(false)

  // 로그인 체크
  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login')
    }
  }, [user, authLoading, router])

  // 프로필 데이터 로드
  useEffect(() => {
    if (profile) {
      setFormData({
        name: profile.name || '',
        phone: profile.phone || '',
        company: profile.company || ''
      })
      loadUserData()
      
      // 전문가인 경우 전문가 정보 로드
      if (profile.user_type === 'expert') {
        loadExpertInfo()
      }
    }
  }, [profile])

  const loadUserData = async () => {
    if (!user) return

    setDataLoading(true)
    try {
      // 진단 결과 로드
      const { data: diagnosis } = await supabase
        .from('diagnosis_results')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
      
      if (diagnosis) setDiagnosisResults(diagnosis)

      // 북마크 로드
      const { data: marks } = await supabase
        .from('bookmarks')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
      
      if (marks) setBookmarks(marks)
    } catch (err) {
      console.error("데이터 로드 오류:", err)
    } finally {
      setDataLoading(false)
    }
  }

  // Google Sheet에서 전문가 정보 로드
  const loadExpertInfo = async () => {
    if (!profile?.email) return
    
    setExpertLoading(true)
    try {
      const response = await fetch(`${GOOGLE_SCRIPT_URL}?action=expertsAdmin`)
      const result = await response.json()
      
      if (result.success && result.data) {
        // 이메일로 전문가 찾기
        const expert = result.data.find((e: ExpertInfo) => e.email === profile.email)
        if (expert) {
          setExpertInfo(expert)
        }
      }
    } catch (err) {
      console.error("전문가 정보 로드 오류:", err)
    } finally {
      setExpertLoading(false)
    }
  }

  const handleSaveProfile = async () => {
    setSaving(true)
    setMessage({ type: '', text: '' })

    const { error } = await updateProfile(formData)

    if (error) {
      setMessage({ type: 'error', text: '저장 중 오류가 발생했습니다.' })
    } else {
      setMessage({ type: 'success', text: '프로필이 저장되었습니다.' })
      setEditing(false)
    }
    setSaving(false)
  }

  const handleLogout = async () => {
    await signOut()
    router.push('/')
  }

  const handleDeleteBookmark = async (bookmarkId: string) => {
    await supabase
      .from('bookmarks')
      .delete()
      .eq('id', bookmarkId)
    
    setBookmarks(prev => prev.filter(b => b.id !== bookmarkId))
  }

  // 승인 상태 뱃지
  const getApprovalBadge = (approved: string) => {
    if (approved === 'Y') return { class: 'bg-success', label: '승인됨' }
    if (approved === 'N') return { class: 'bg-danger', label: '거절됨' }
    return { class: 'bg-warning text-dark', label: '승인 대기중' }
  }

  // 카테고리 라벨
  const categoryLabels: Record<string, string> = {
    startup: '창업 컨설팅',
    finance: '재무/회계',
    marketing: '마케팅',
    tech: '기술/R&D',
    legal: '법무',
    hr: '인사/조직',
  }

  // 로딩 중
  if (authLoading) {
    return (
      <Layout>
        <section className="py-160">
          <div className="container text-center">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-3 text-muted">로딩 중...</p>
          </div>
        </section>
      </Layout>
    )
  }

  // 로그인 안 됨
  if (!user) {
    return (
      <Layout>
        <section className="py-160">
          <div className="container text-center">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-3 text-muted">로그인 페이지로 이동합니다...</p>
          </div>
        </section>
      </Layout>
    )
  }

  // 프로필 로딩 중
  if (!profile) {
    return (
      <Layout>
        <section className="py-160">
          <div className="container text-center">
            <div className="spinner-border text-primary mb-3" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="text-muted mb-4">프로필 정보를 불러오는 중...</p>
            <button onClick={() => window.location.reload()} className="btn btn-outline-primary btn-sm">
              새로고침
            </button>
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
            <h1 className="text-white ds-3 mb-3">마이페이지</h1>
            <p className="text-white text-opacity-75 fs-5">
              {profile.name}님, 환영합니다!
            </p>
          </div>
        </div>
      </section>

      {/* 마이페이지 콘텐츠 */}
      <section className="py-80">
        <div className="container">
          <div className="row g-4">
            {/* 사이드바 */}
            <div className="col-lg-3">
              <div className="card border-0 shadow-sm rounded-4">
                <div className="card-body p-4">
                  {/* 프로필 요약 */}
                  <div className="text-center mb-4 pb-4 border-bottom">
                    <div className="icon-shape icon-80 bg-primary bg-opacity-10 rounded-circle mx-auto mb-3 d-flex align-items-center justify-content-center">
                      <i className={`bi ${profile.user_type === 'expert' ? 'bi-briefcase' : 'bi-person'} fs-2 text-primary`}></i>
                    </div>
                    <h5 className="mb-1">{profile.name || '이름 없음'}</h5>
                    <p className="small text-muted mb-2">{profile.email}</p>
                    <span className={`badge ${profile.user_type === 'expert' ? 'bg-warning text-dark' : 'bg-primary'}`}>
                      {profile.user_type === 'expert' ? '전문가' : '일반회원'}
                    </span>
                  </div>

                  {/* 메뉴 */}
                  <nav className="nav flex-column">
                    <button 
                      className={`nav-link text-start px-3 py-2 rounded-2 mb-1 border-0 ${activeTab === 'profile' ? 'bg-primary bg-opacity-10 text-primary' : 'text-muted'}`}
                      onClick={() => setActiveTab('profile')}
                    >
                      <i className="bi bi-person me-2"></i>
                      프로필 관리
                    </button>
                    <button 
                      className={`nav-link text-start px-3 py-2 rounded-2 mb-1 border-0 ${activeTab === 'diagnosis' ? 'bg-primary bg-opacity-10 text-primary' : 'text-muted'}`}
                      onClick={() => setActiveTab('diagnosis')}
                    >
                      <i className="bi bi-clipboard-data me-2"></i>
                      진단 결과
                      {diagnosisResults.length > 0 && (
                        <span className="badge bg-primary ms-2">{diagnosisResults.length}</span>
                      )}
                    </button>
                    <button 
                      className={`nav-link text-start px-3 py-2 rounded-2 mb-1 border-0 ${activeTab === 'bookmarks' ? 'bg-primary bg-opacity-10 text-primary' : 'text-muted'}`}
                      onClick={() => setActiveTab('bookmarks')}
                    >
                      <i className="bi bi-bookmark me-2"></i>
                      북마크
                      {bookmarks.length > 0 && (
                        <span className="badge bg-primary ms-2">{bookmarks.length}</span>
                      )}
                    </button>
                    {profile.user_type === 'expert' && (
                      <button 
                        className={`nav-link text-start px-3 py-2 rounded-2 mb-1 border-0 ${activeTab === 'expert' ? 'bg-primary bg-opacity-10 text-primary' : 'text-muted'}`}
                        onClick={() => setActiveTab('expert')}
                      >
                        <i className="bi bi-briefcase me-2"></i>
                        전문가 정보
                        {expertInfo && expertInfo.approved !== 'Y' && (
                          <span className="badge bg-warning text-dark ms-2">!</span>
                        )}
                      </button>
                    )}
                    <hr className="my-2" />
                    <button 
                      className="nav-link text-start px-3 py-2 rounded-2 text-danger border-0"
                      onClick={handleLogout}
                    >
                      <i className="bi bi-box-arrow-right me-2"></i>
                      로그아웃
                    </button>
                  </nav>
                </div>
              </div>
            </div>

            {/* 메인 콘텐츠 */}
            <div className="col-lg-9">
              {/* 프로필 관리 */}
              {activeTab === 'profile' && (
                <div className="card border-0 shadow-sm rounded-4">
                  <div className="card-header bg-white border-0 p-4">
                    <div className="d-flex justify-content-between align-items-center">
                      <h4 className="mb-0">
                        <i className="bi bi-person text-primary me-2"></i>
                        프로필 관리
                      </h4>
                      {!editing ? (
                        <button 
                          className="btn btn-outline-primary btn-sm"
                          onClick={() => setEditing(true)}
                        >
                          <i className="bi bi-pencil me-1"></i>
                          수정
                        </button>
                      ) : (
                        <div className="d-flex gap-2">
                          <button 
                            className="btn btn-outline-secondary btn-sm"
                            onClick={() => setEditing(false)}
                          >
                            취소
                          </button>
                          <button 
                            className="btn btn-primary btn-sm"
                            onClick={handleSaveProfile}
                            disabled={saving}
                          >
                            {saving ? '저장 중...' : '저장'}
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="card-body p-4">
                    {message.text && (
                      <div className={`alert ${message.type === 'error' ? 'alert-danger' : 'alert-success'} mb-4`}>
                        {message.text}
                      </div>
                    )}

                    <div className="row g-4">
                      <div className="col-md-6">
                        <label className="form-label text-muted small">이메일</label>
                        <input 
                          type="email" 
                          className="form-control bg-light" 
                          value={profile.email} 
                          disabled 
                        />
                        <small className="text-muted">이메일은 변경할 수 없습니다</small>
                      </div>
                      <div className="col-md-6">
                        <label className="form-label text-muted small">회원 유형</label>
                        <input 
                          type="text" 
                          className="form-control bg-light" 
                          value={profile.user_type === 'expert' ? '전문가' : '일반회원'} 
                          disabled 
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label">이름 <span className="text-danger">*</span></label>
                        <input 
                          type="text" 
                          className="form-control" 
                          value={formData.name}
                          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                          disabled={!editing}
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label">연락처</label>
                        <input 
                          type="tel" 
                          className="form-control" 
                          placeholder="010-1234-5678"
                          value={formData.phone}
                          onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                          disabled={!editing}
                        />
                      </div>
                      <div className="col-12">
                        <label className="form-label">회사명</label>
                        <input 
                          type="text" 
                          className="form-control" 
                          placeholder="(주)회사명"
                          value={formData.company}
                          onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
                          disabled={!editing}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* 진단 결과 */}
              {activeTab === 'diagnosis' && (
                <div className="card border-0 shadow-sm rounded-4">
                  <div className="card-header bg-white border-0 p-4">
                    <h4 className="mb-0">
                      <i className="bi bi-clipboard-data text-primary me-2"></i>
                      진단 결과
                    </h4>
                  </div>
                  <div className="card-body p-4">
                    {diagnosisResults.length === 0 ? (
                      <div className="text-center py-5">
                        <i className="bi bi-clipboard-data fs-1 text-muted d-block mb-3"></i>
                        <p className="text-muted mb-3">아직 진단 결과가 없습니다.</p>
                        <Link href="/diagnosis" className="btn btn-primary">
                          AI 진단 시작하기
                        </Link>
                      </div>
                    ) : (
                      <div className="list-group list-group-flush">
                        {diagnosisResults.map((result) => (
                          <div key={result.id} className="list-group-item px-0 py-3">
                            <div className="d-flex justify-content-between align-items-center">
                              <div>
                                <h6 className="mb-1">진단 결과</h6>
                                <small className="text-muted">
                                  {new Date(result.created_at).toLocaleDateString('ko-KR')}
                                </small>
                              </div>
                              <Link href={`/diagnosis/result/${result.id}`} className="btn btn-outline-primary btn-sm">
                                상세보기
                              </Link>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* 북마크 */}
              {activeTab === 'bookmarks' && (
                <div className="card border-0 shadow-sm rounded-4">
                  <div className="card-header bg-white border-0 p-4">
                    <h4 className="mb-0">
                      <i className="bi bi-bookmark text-primary me-2"></i>
                      북마크한 지원사업
                    </h4>
                  </div>
                  <div className="card-body p-4">
                    {bookmarks.length === 0 ? (
                      <div className="text-center py-5">
                        <i className="bi bi-bookmark fs-1 text-muted d-block mb-3"></i>
                        <p className="text-muted mb-3">북마크한 지원사업이 없습니다.</p>
                        <Link href="/programs" className="btn btn-primary">
                          지원사업 둘러보기
                        </Link>
                      </div>
                    ) : (
                      <div className="list-group list-group-flush">
                        {bookmarks.map((bookmark) => (
                          <div key={bookmark.id} className="list-group-item px-0 py-3">
                            <div className="d-flex justify-content-between align-items-center">
                              <div>
                                <h6 className="mb-1">{bookmark.program_name}</h6>
                                <small className="text-muted">
                                  저장일: {new Date(bookmark.created_at).toLocaleDateString('ko-KR')}
                                </small>
                              </div>
                              <button 
                                className="btn btn-outline-danger btn-sm"
                                onClick={() => handleDeleteBookmark(bookmark.id)}
                              >
                                <i className="bi bi-trash"></i>
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* 전문가 정보 (전문가만) */}
              {activeTab === 'expert' && profile.user_type === 'expert' && (
                <div className="card border-0 shadow-sm rounded-4">
                  <div className="card-header bg-white border-0 p-4">
                    <div className="d-flex justify-content-between align-items-center">
                      <h4 className="mb-0">
                        <i className="bi bi-briefcase text-primary me-2"></i>
                        전문가 정보
                      </h4>
                      {expertInfo && (
                        <span className={`badge ${getApprovalBadge(expertInfo.approved).class}`}>
                          {getApprovalBadge(expertInfo.approved).label}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="card-body p-4">
                    {expertLoading ? (
                      <div className="text-center py-5">
                        <div className="spinner-border text-primary" role="status">
                          <span className="visually-hidden">Loading...</span>
                        </div>
                        <p className="mt-3 text-muted">전문가 정보를 불러오는 중...</p>
                      </div>
                    ) : expertInfo ? (
                      <>
                        {/* 승인 대기 알림 */}
                        {expertInfo.approved !== 'Y' && (
                          <div className={`alert ${expertInfo.approved === 'N' ? 'alert-danger' : 'alert-warning'} mb-4`}>
                            <i className={`bi ${expertInfo.approved === 'N' ? 'bi-x-circle' : 'bi-hourglass-split'} me-2`}></i>
                            {expertInfo.approved === 'N' 
                              ? '전문가 등록이 거절되었습니다. 관리자에게 문의해주세요.'
                              : '전문가 승인 대기 중입니다. 승인 후 전문가 페이지에 프로필이 노출됩니다.'
                            }
                          </div>
                        )}

                        {/* 승인됨 알림 */}
                        {expertInfo.approved === 'Y' && (
                          <div className="alert alert-success mb-4">
                            <i className="bi bi-check-circle me-2"></i>
                            전문가로 승인되었습니다! 
                            <Link href={`/experts/${expertInfo.id}`} className="alert-link ms-2">
                              내 프로필 보기 →
                            </Link>
                          </div>
                        )}

                        {/* 전문가 정보 표시 */}
                        <div className="row g-4">
                          <div className="col-md-6">
                            <label className="form-label text-muted small">전문가 ID</label>
                            <input type="text" className="form-control bg-light" value={expertInfo.id} disabled />
                          </div>
                          <div className="col-md-6">
                            <label className="form-label text-muted small">이름</label>
                            <input type="text" className="form-control bg-light" value={expertInfo.name} disabled />
                          </div>
                          <div className="col-md-6">
                            <label className="form-label text-muted small">직함</label>
                            <input type="text" className="form-control bg-light" value={expertInfo.title || '-'} disabled />
                          </div>
                          <div className="col-md-6">
                            <label className="form-label text-muted small">소속</label>
                            <input type="text" className="form-control bg-light" value={expertInfo.company || '-'} disabled />
                          </div>
                          <div className="col-md-6">
                            <label className="form-label text-muted small">카테고리</label>
                            <input type="text" className="form-control bg-light" value={categoryLabels[expertInfo.category] || expertInfo.category || '-'} disabled />
                          </div>
                          <div className="col-md-6">
                            <label className="form-label text-muted small">지역</label>
                            <input type="text" className="form-control bg-light" value={expertInfo.location || '-'} disabled />
                          </div>
                          <div className="col-md-6">
                            <label className="form-label text-muted small">경력</label>
                            <input type="text" className="form-control bg-light" value={expertInfo.experience ? `${expertInfo.experience}년` : '-'} disabled />
                          </div>
                          <div className="col-md-6">
                            <label className="form-label text-muted small">상담료</label>
                            <input type="text" className="form-control bg-light" value={expertInfo.price ? `${expertInfo.price.toLocaleString()}원/시간` : '-'} disabled />
                          </div>
                          <div className="col-12">
                            <label className="form-label text-muted small">전문분야</label>
                            <div className="d-flex flex-wrap gap-2">
                              {expertInfo.specialties?.length > 0 ? (
                                expertInfo.specialties.map((s, i) => (
                                  <span key={i} className="badge bg-primary bg-opacity-10 text-primary px-3 py-2">
                                    {s}
                                  </span>
                                ))
                              ) : (
                                <span className="text-muted">-</span>
                              )}
                            </div>
                          </div>
                          <div className="col-12">
                            <label className="form-label text-muted small">자기소개</label>
                            <textarea 
                              className="form-control bg-light" 
                              rows={4} 
                              value={expertInfo.description || '-'} 
                              disabled 
                            />
                          </div>
                        </div>

                        {/* 통계 */}
                        {expertInfo.approved === 'Y' && (
                          <div className="row g-3 mt-4 pt-4 border-top">
                            <div className="col-6 col-md-3">
                              <div className="text-center p-3 bg-light rounded-3">
                                <i className="bi bi-star-fill text-warning fs-4 d-block mb-2"></i>
                                <h5 className="mb-0">{expertInfo.rating?.toFixed(1) || '0.0'}</h5>
                                <small className="text-muted">평점</small>
                              </div>
                            </div>
                            <div className="col-6 col-md-3">
                              <div className="text-center p-3 bg-light rounded-3">
                                <i className="bi bi-chat-dots text-primary fs-4 d-block mb-2"></i>
                                <h5 className="mb-0">{expertInfo.reviews || 0}</h5>
                                <small className="text-muted">리뷰</small>
                              </div>
                            </div>
                          </div>
                        )}

                        <div className="mt-4 pt-4 border-top">
                          <p className="text-muted small mb-0">
                            <i className="bi bi-info-circle me-1"></i>
                            전문가 정보 수정은 관리자에게 문의해주세요.
                          </p>
                        </div>
                      </>
                    ) : (
                      <div className="text-center py-5">
                        <i className="bi bi-person-x fs-1 text-muted d-block mb-3"></i>
                        <h5 className="text-muted mb-3">전문가 정보가 없습니다</h5>
                        <p className="text-muted mb-4">
                          전문가로 등록하시면 프로필이 전문가 페이지에 노출됩니다.
                        </p>
                        <div className="alert alert-info text-start">
                          <h6 className="alert-heading">
                            <i className="bi bi-lightbulb me-2"></i>
                            전문가 등록 방법
                          </h6>
                          <ol className="mb-0 ps-3">
                            <li>회원가입 시 "전문가"로 가입한 경우 자동 등록됩니다.</li>
                            <li>기존 회원은 관리자에게 문의하여 전문가 등록을 요청해주세요.</li>
                            <li>등록 후 관리자 승인이 완료되면 전문가 페이지에 노출됩니다.</li>
                          </ol>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}
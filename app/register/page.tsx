'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Layout from "@/components/layout/Layout"
import { useAuth } from '@/lib/AuthContext'

// Google Apps Script URL
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyjCdv9Cg3ooAz5E-DE27oOkVhPUCmA_mChScMc5zL_cY81M7EpiK082RSfCVbpn8Xm/exec"

// 전문가 카테고리 옵션
const EXPERT_CATEGORIES = [
  { value: "startup", label: "창업 컨설팅" },
  { value: "finance", label: "재무/회계" },
  { value: "marketing", label: "마케팅" },
  { value: "tech", label: "기술/R&D" },
  { value: "legal", label: "법무" },
  { value: "hr", label: "인사/조직" },
]

// 전문분야 옵션
const SPECIALTY_OPTIONS = [
  "창업지원사업", "정부과제", "R&D기획", "사업계획서",
  "투자유치", "재무관리", "세무회계", "법인설립",
  "특허/지식재산", "마케팅전략", "디지털마케팅", "수출/해외진출",
  "인사노무", "조직관리", "IT/SW개발", "제조/생산"
]

export default function RegisterPage() {
  const router = useRouter()
  const { signUp } = useAuth()
  
  const [step, setStep] = useState(1) // 1: 유형 선택, 2: 기본 정보, 3: 전문가 정보 (전문가만)
  const [userType, setUserType] = useState<'user' | 'expert'>('user')
  
  // 기본 정보
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    passwordConfirm: '',
    name: '',
    phone: '',
    company: '',
    agreeTerms: false,
    agreePrivacy: false
  })
  
  // 전문가 추가 정보
  const [expertData, setExpertData] = useState({
    title: '',           // 직함
    organization: '',    // 소속
    specialties: [] as string[],  // 전문분야 (복수선택)
    location: '',        // 지역
    experience: '',      // 경력 (년)
    price: '',           // 상담료
    availability: '',    // 상담가능시간
    description: '',     // 소개
    category: ''         // 카테고리
  })
  
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleExpertChange = (field: string, value: string | string[]) => {
    setExpertData(prev => ({ ...prev, [field]: value }))
  }

  const toggleSpecialty = (specialty: string) => {
    setExpertData(prev => ({
      ...prev,
      specialties: prev.specialties.includes(specialty)
        ? prev.specialties.filter(s => s !== specialty)
        : [...prev.specialties, specialty]
    }))
  }

  const validateStep2 = () => {
    if (!formData.email || !formData.password || !formData.name) {
      setError('필수 항목을 모두 입력해주세요.')
      return false
    }
    if (formData.password.length < 6) {
      setError('비밀번호는 6자 이상이어야 합니다.')
      return false
    }
    if (formData.password !== formData.passwordConfirm) {
      setError('비밀번호가 일치하지 않습니다.')
      return false
    }
    if (!formData.agreeTerms || !formData.agreePrivacy) {
      setError('필수 약관에 동의해주세요.')
      return false
    }
    return true
  }

  const validateStep3 = () => {
    if (!expertData.title || !expertData.category || expertData.specialties.length === 0) {
      setError('직함, 카테고리, 전문분야는 필수입니다.')
      return false
    }
    return true
  }

  // 전문가 정보를 Google Sheet에 저장
  const registerExpertToSheet = async () => {
    try {
      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "registerExpert",
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          title: expertData.title,
          organization: expertData.organization,
          specialties: expertData.specialties.join(", "),
          location: expertData.location,
          experience: expertData.experience,
          price: expertData.price,
          availability: expertData.availability,
          description: expertData.description,
          category: expertData.category
        }),
      })
      console.log("전문가 정보 Google Sheet 저장 완료")
      return true
    } catch (error) {
      console.error("Google Sheet 저장 오류:", error)
      return false
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    // 전문가인 경우 Step 3 검증
    if (userType === 'expert' && step === 3) {
      if (!validateStep3()) return
    }

    setLoading(true)

    // 1. Supabase 회원가입
    const { error } = await signUp(
      formData.email,
      formData.password,
      formData.name,
      userType
    )

    if (error) {
      if (error.message.includes('already registered')) {
        setError('이미 가입된 이메일입니다.')
      } else {
        setError('회원가입 중 오류가 발생했습니다. 다시 시도해주세요.')
      }
      setLoading(false)
      return
    }

    // 2. 전문가인 경우 Google Sheet에도 저장
    if (userType === 'expert') {
      await registerExpertToSheet()
    }

    setSuccess(true)
    setLoading(false)
  }

  // Step 2에서 다음 버튼 클릭
  const handleStep2Next = () => {
    setError('')
    if (!validateStep2()) return
    
    if (userType === 'expert') {
      setStep(3) // 전문가면 Step 3으로
    } else {
      // 일반 회원이면 바로 가입 처리
      handleSubmit({ preventDefault: () => {} } as React.FormEvent)
    }
  }

  // 성공 화면
  if (success) {
    return (
      <Layout>
        <section className="py-160">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-6 text-center">
                <div className="icon-shape icon-100 bg-success bg-opacity-10 rounded-circle mx-auto mb-4 d-flex align-items-center justify-content-center">
                  <i className="bi bi-check-lg fs-1 text-success"></i>
                </div>
                <h2 className="mb-3">회원가입 완료!</h2>
                <p className="text-muted mb-4">
                  가입하신 이메일로 인증 메일이 발송되었습니다.<br/>
                  이메일을 확인하여 인증을 완료해주세요.
                </p>
                {userType === 'expert' && (
                  <div className="alert alert-info mb-4">
                    <i className="bi bi-info-circle me-2"></i>
                    전문가 프로필은 관리자 승인 후 전문가 페이지에 표시됩니다.
                  </div>
                )}
                <div className="d-flex gap-3 justify-content-center">
                  <Link href="/login" className="btn btn-primary">
                    로그인하기
                  </Link>
                  <Link href="/" className="btn btn-outline-secondary">
                    홈으로
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    )
  }

  // 총 단계 수
  const totalSteps = userType === 'expert' ? 3 : 2

  return (
    <Layout>
      {/* 페이지 헤더 */}
      <section className="page-header position-relative overflow-hidden pt-160 pb-100" 
        style={{ backgroundColor: '#152833' }}>
        <div className="container position-relative z-1">
          <div className="text-center">
            <h1 className="text-white ds-3 mb-3">회원가입</h1>
            <p className="text-white text-opacity-75 fs-5">
              비즈핏과 함께 성장하세요
            </p>
          </div>
        </div>
      </section>

      {/* 회원가입 폼 */}
      <section className="py-120">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-7 col-md-9">
              
              {/* 단계 표시 */}
              <div className="d-flex justify-content-center mb-5">
                <div className="d-flex align-items-center">
                  <div className={`icon-shape icon-40 rounded-circle d-flex align-items-center justify-content-center ${step >= 1 ? 'bg-primary text-white' : 'bg-light text-muted'}`}>
                    1
                  </div>
                  <div className={`mx-3 ${step >= 2 ? 'bg-primary' : 'bg-light'}`} style={{ width: '60px', height: '2px' }}></div>
                  <div className={`icon-shape icon-40 rounded-circle d-flex align-items-center justify-content-center ${step >= 2 ? 'bg-primary text-white' : 'bg-light text-muted'}`}>
                    2
                  </div>
                  {userType === 'expert' && (
                    <>
                      <div className={`mx-3 ${step >= 3 ? 'bg-primary' : 'bg-light'}`} style={{ width: '60px', height: '2px' }}></div>
                      <div className={`icon-shape icon-40 rounded-circle d-flex align-items-center justify-content-center ${step >= 3 ? 'bg-primary text-white' : 'bg-light text-muted'}`}>
                        3
                      </div>
                    </>
                  )}
                </div>
              </div>

              <div className="card border-0 shadow-lg rounded-4">
                <div className="card-body p-5">
                  
                  {/* Step 1: 유형 선택 */}
                  {step === 1 && (
                    <>
                      <div className="text-center mb-5">
                        <h3 className="mb-2">회원 유형 선택</h3>
                        <p className="text-muted">어떤 목적으로 가입하시나요?</p>
                      </div>

                      <div className="row g-4 mb-4">
                        {/* 일반 회원 */}
                        <div className="col-6">
                          <div 
                            className={`card h-100 cursor-pointer transition-all ${userType === 'user' ? 'border-primary border-2 shadow' : 'border'}`}
                            style={{ cursor: 'pointer' }}
                            onClick={() => setUserType('user')}
                          >
                            <div className="card-body text-center p-4">
                              <div className={`icon-shape icon-60 rounded-circle mx-auto mb-3 d-flex align-items-center justify-content-center ${userType === 'user' ? 'bg-primary text-white' : 'bg-light text-muted'}`}>
                                <i className="bi bi-person fs-4"></i>
                              </div>
                              <h5 className="mb-2">일반 회원</h5>
                              <p className="text-muted small mb-0">
                                지원사업 추천 받고<br/>전문가 상담 받기
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* 전문가 회원 */}
                        <div className="col-6">
                          <div 
                            className={`card h-100 cursor-pointer transition-all ${userType === 'expert' ? 'border-primary border-2 shadow' : 'border'}`}
                            style={{ cursor: 'pointer' }}
                            onClick={() => setUserType('expert')}
                          >
                            <div className="card-body text-center p-4">
                              <div className={`icon-shape icon-60 rounded-circle mx-auto mb-3 d-flex align-items-center justify-content-center ${userType === 'expert' ? 'bg-primary text-white' : 'bg-light text-muted'}`}>
                                <i className="bi bi-briefcase fs-4"></i>
                              </div>
                              <h5 className="mb-2">전문가 회원</h5>
                              <p className="text-muted small mb-0">
                                전문가로 등록하고<br/>상담 서비스 제공
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <button 
                        className="btn btn-primary w-100 py-3"
                        onClick={() => setStep(2)}
                      >
                        다음
                        <i className="bi bi-arrow-right ms-2"></i>
                      </button>
                    </>
                  )}

                  {/* Step 2: 기본 정보 입력 */}
                  {step === 2 && (
                    <>
                      <div className="text-center mb-5">
                        <div className={`icon-shape icon-60 rounded-circle mx-auto mb-3 d-flex align-items-center justify-content-center ${userType === 'expert' ? 'bg-warning bg-opacity-10' : 'bg-primary bg-opacity-10'}`}>
                          <i className={`bi ${userType === 'expert' ? 'bi-briefcase text-warning' : 'bi-person text-primary'} fs-4`}></i>
                        </div>
                        <h3 className="mb-2">기본 정보</h3>
                        <p className="text-muted">계정 정보를 입력해주세요</p>
                      </div>

                      {error && (
                        <div className="alert alert-danger mb-4">
                          <i className="bi bi-exclamation-circle me-2"></i>
                          {error}
                        </div>
                      )}

                      <form onSubmit={(e) => { e.preventDefault(); handleStep2Next(); }}>
                        <div className="mb-3">
                          <label className="form-label">이메일 <span className="text-danger">*</span></label>
                          <input
                            type="email"
                            className="form-control"
                            placeholder="example@email.com"
                            value={formData.email}
                            onChange={(e) => handleChange('email', e.target.value)}
                            required
                          />
                        </div>

                        <div className="row g-3 mb-3">
                          <div className="col-md-6">
                            <label className="form-label">비밀번호 <span className="text-danger">*</span></label>
                            <input
                              type="password"
                              className="form-control"
                              placeholder="6자 이상 입력"
                              value={formData.password}
                              onChange={(e) => handleChange('password', e.target.value)}
                              required
                            />
                          </div>
                          <div className="col-md-6">
                            <label className="form-label">비밀번호 확인 <span className="text-danger">*</span></label>
                            <input
                              type="password"
                              className="form-control"
                              placeholder="비밀번호 재입력"
                              value={formData.passwordConfirm}
                              onChange={(e) => handleChange('passwordConfirm', e.target.value)}
                              required
                            />
                          </div>
                        </div>

                        <div className="row g-3 mb-3">
                          <div className="col-md-6">
                            <label className="form-label">이름 <span className="text-danger">*</span></label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="홍길동"
                              value={formData.name}
                              onChange={(e) => handleChange('name', e.target.value)}
                              required
                            />
                          </div>
                          <div className="col-md-6">
                            <label className="form-label">연락처</label>
                            <input
                              type="tel"
                              className="form-control"
                              placeholder="010-1234-5678"
                              value={formData.phone}
                              onChange={(e) => handleChange('phone', e.target.value)}
                            />
                          </div>
                        </div>

                        {userType === 'user' && (
                          <div className="mb-4">
                            <label className="form-label">회사명</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="(주)회사명"
                              value={formData.company}
                              onChange={(e) => handleChange('company', e.target.value)}
                            />
                          </div>
                        )}

                        {/* 약관 동의 */}
                        <div className="mb-4 p-3 bg-light rounded-3">
                          <div className="form-check mb-2">
                            <input 
                              type="checkbox" 
                              className="form-check-input" 
                              id="agreeTerms"
                              checked={formData.agreeTerms}
                              onChange={(e) => handleChange('agreeTerms', e.target.checked)}
                            />
                            <label className="form-check-label" htmlFor="agreeTerms">
                              <span className="text-danger">[필수]</span> 이용약관에 동의합니다
                            </label>
                          </div>
                          <div className="form-check">
                            <input 
                              type="checkbox" 
                              className="form-check-input" 
                              id="agreePrivacy"
                              checked={formData.agreePrivacy}
                              onChange={(e) => handleChange('agreePrivacy', e.target.checked)}
                            />
                            <label className="form-check-label" htmlFor="agreePrivacy">
                              <span className="text-danger">[필수]</span> 개인정보 처리방침에 동의합니다
                            </label>
                          </div>
                        </div>

                        <div className="d-flex gap-3">
                          <button 
                            type="button"
                            className="btn btn-outline-secondary flex-fill py-3"
                            onClick={() => setStep(1)}
                          >
                            <i className="bi bi-arrow-left me-2"></i>
                            이전
                          </button>
                          <button 
                            type="submit" 
                            className="btn btn-primary flex-fill py-3"
                            disabled={loading}
                          >
                            {userType === 'expert' ? (
                              <>
                                다음
                                <i className="bi bi-arrow-right ms-2"></i>
                              </>
                            ) : loading ? (
                              <>
                                <span className="spinner-border spinner-border-sm me-2"></span>
                                가입 중...
                              </>
                            ) : (
                              '가입하기'
                            )}
                          </button>
                        </div>
                      </form>
                    </>
                  )}

                  {/* Step 3: 전문가 정보 입력 */}
                  {step === 3 && userType === 'expert' && (
                    <>
                      <div className="text-center mb-5">
                        <div className="icon-shape icon-60 rounded-circle mx-auto mb-3 d-flex align-items-center justify-content-center bg-warning bg-opacity-10">
                          <i className="bi bi-person-badge text-warning fs-4"></i>
                        </div>
                        <h3 className="mb-2">전문가 정보</h3>
                        <p className="text-muted">전문가 프로필 정보를 입력해주세요</p>
                      </div>

                      {error && (
                        <div className="alert alert-danger mb-4">
                          <i className="bi bi-exclamation-circle me-2"></i>
                          {error}
                        </div>
                      )}

                      <form onSubmit={handleSubmit}>
                        <div className="row g-3 mb-3">
                          <div className="col-md-6">
                            <label className="form-label">직함 <span className="text-danger">*</span></label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="예: 창업컨설턴트, 세무사"
                              value={expertData.title}
                              onChange={(e) => handleExpertChange('title', e.target.value)}
                              required
                            />
                          </div>
                          <div className="col-md-6">
                            <label className="form-label">소속</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="예: (주)비즈핏"
                              value={expertData.organization}
                              onChange={(e) => handleExpertChange('organization', e.target.value)}
                            />
                          </div>
                        </div>

                        <div className="mb-3">
                          <label className="form-label">카테고리 <span className="text-danger">*</span></label>
                          <select
                            className="form-select"
                            value={expertData.category}
                            onChange={(e) => handleExpertChange('category', e.target.value)}
                            required
                          >
                            <option value="">카테고리 선택</option>
                            {EXPERT_CATEGORIES.map(cat => (
                              <option key={cat.value} value={cat.value}>{cat.label}</option>
                            ))}
                          </select>
                        </div>

                        <div className="mb-3">
                          <label className="form-label">전문분야 <span className="text-danger">*</span> (복수 선택)</label>
                          <div className="d-flex flex-wrap gap-2">
                            {SPECIALTY_OPTIONS.map(specialty => (
                              <span
                                key={specialty}
                                className={`badge px-3 py-2 ${expertData.specialties.includes(specialty) ? 'bg-primary' : 'bg-light text-dark border'}`}
                                style={{ cursor: 'pointer' }}
                                onClick={() => toggleSpecialty(specialty)}
                              >
                                {expertData.specialties.includes(specialty) && <i className="bi bi-check me-1"></i>}
                                {specialty}
                              </span>
                            ))}
                          </div>
                          {expertData.specialties.length > 0 && (
                            <small className="text-muted mt-2 d-block">
                              선택됨: {expertData.specialties.join(", ")}
                            </small>
                          )}
                        </div>

                        <div className="row g-3 mb-3">
                          <div className="col-md-4">
                            <label className="form-label">지역</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="예: 서울"
                              value={expertData.location}
                              onChange={(e) => handleExpertChange('location', e.target.value)}
                            />
                          </div>
                          <div className="col-md-4">
                            <label className="form-label">경력 (년)</label>
                            <input
                              type="number"
                              className="form-control"
                              placeholder="예: 10"
                              value={expertData.experience}
                              onChange={(e) => handleExpertChange('experience', e.target.value)}
                            />
                          </div>
                          <div className="col-md-4">
                            <label className="form-label">상담료 (원/시간)</label>
                            <input
                              type="number"
                              className="form-control"
                              placeholder="예: 100000"
                              value={expertData.price}
                              onChange={(e) => handleExpertChange('price', e.target.value)}
                            />
                          </div>
                        </div>

                        <div className="mb-3">
                          <label className="form-label">상담 가능 시간</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="예: 평일 10:00~18:00"
                            value={expertData.availability}
                            onChange={(e) => handleExpertChange('availability', e.target.value)}
                          />
                        </div>

                        <div className="mb-4">
                          <label className="form-label">자기소개</label>
                          <textarea
                            className="form-control"
                            rows={4}
                            placeholder="전문가로서의 경험과 강점을 소개해주세요"
                            value={expertData.description}
                            onChange={(e) => handleExpertChange('description', e.target.value)}
                          />
                        </div>

                        <div className="alert alert-warning mb-4">
                          <i className="bi bi-info-circle me-2"></i>
                          전문가 프로필은 <strong>관리자 승인 후</strong> 전문가 페이지에 표시됩니다.
                        </div>

                        <div className="d-flex gap-3">
                          <button 
                            type="button"
                            className="btn btn-outline-secondary flex-fill py-3"
                            onClick={() => setStep(2)}
                          >
                            <i className="bi bi-arrow-left me-2"></i>
                            이전
                          </button>
                          <button 
                            type="submit" 
                            className="btn btn-primary flex-fill py-3"
                            disabled={loading}
                          >
                            {loading ? (
                              <>
                                <span className="spinner-border spinner-border-sm me-2"></span>
                                가입 중...
                              </>
                            ) : (
                              '가입하기'
                            )}
                          </button>
                        </div>
                      </form>
                    </>
                  )}

                  <div className="text-center mt-4">
                    <p className="text-muted mb-0">
                      이미 계정이 있으신가요?{' '}
                      <Link href="/login" className="text-primary fw-semibold text-decoration-none">
                        로그인
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}
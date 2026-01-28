'use client'

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Layout from "@/components/layout/Layout"
import { useAuth } from '@/lib/AuthContext'
import { supabase } from '@/lib/supabase'

// Google Apps Script URL
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyjCdv9Cg3ooAz5E-DE27oOkVhPUCmA_mChScMc5zL_cY81M7EpiK082RSfCVbpn8Xm/exec"

type UserType = 'user' | 'expert' | null
type Step = 1 | 2 | 3

const categories = [
  { id: "startup", name: "창업 컨설팅" },
  { id: "finance", name: "재무/회계" },
  { id: "marketing", name: "마케팅" },
  { id: "tech", name: "기술/R&D" },
  { id: "legal", name: "법무" },
  { id: "hr", name: "인사/조직" },
]

export default function RegisterPage() {
  const router = useRouter()
  const { signUp } = useAuth()
  const fileInputRef = useRef<HTMLInputElement>(null)
  
  const [step, setStep] = useState<Step>(1)
  const [userType, setUserType] = useState<UserType>(null)
  
  // 기본 정보
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  
  // 전문가 추가 정보
  const [expertData, setExpertData] = useState({
    title: '',
    company: '',
    category: '',
    specialties: '',
    location: '',
    experience: '',
    price: '',
    availability: '',
    description: ''
  })
  
  // 이미지 업로드
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [uploadingImage, setUploadingImage] = useState(false)
  
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  // 이미지 선택 핸들러
  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // 파일 크기 체크 (5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('이미지 크기는 5MB 이하여야 합니다.')
      return
    }

    // 파일 타입 체크
    if (!file.type.startsWith('image/')) {
      setError('이미지 파일만 업로드 가능합니다.')
      return
    }

    setImageFile(file)
    setError('')

    // 미리보기 생성
    const reader = new FileReader()
    reader.onloadend = () => {
      setImagePreview(reader.result as string)
    }
    reader.readAsDataURL(file)
  }

  // 이미지 제거
  const handleImageRemove = () => {
    setImageFile(null)
    setImagePreview(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  // Supabase Storage에 이미지 업로드
  const uploadImage = async (userId: string): Promise<string | null> => {
    if (!imageFile) return null

    setUploadingImage(true)
    try {
      const fileExt = imageFile.name.split('.').pop()
      const fileName = `${userId}/profile.${fileExt}`

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(fileName, imageFile, {
          cacheControl: '3600',
          upsert: true
        })

      if (uploadError) {
        console.error('이미지 업로드 오류:', uploadError)
        return null
      }

      // 공개 URL 가져오기
      const { data } = supabase.storage
        .from('avatars')
        .getPublicUrl(fileName)

      return data.publicUrl
    } catch (err) {
      console.error('이미지 업로드 예외:', err)
      return null
    } finally {
      setUploadingImage(false)
    }
  }

  // 1단계: 유형 선택
  const handleTypeSelect = (type: UserType) => {
    setUserType(type)
    setStep(2)
  }

  // 2단계: 기본 정보 제출
  const handleBasicSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (password !== passwordConfirm) {
      setError('비밀번호가 일치하지 않습니다.')
      return
    }

    if (password.length < 6) {
      setError('비밀번호는 6자 이상이어야 합니다.')
      return
    }

    if (userType === 'expert') {
      setStep(3)
    } else {
      handleFinalSubmit()
    }
  }

  // 최종 제출
  const handleFinalSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    setError('')
    setLoading(true)

    try {
      // 1. Supabase 회원가입
      const { error: signUpError } = await signUp(email, password, name, userType || 'user')

      if (signUpError) {
        if (signUpError.message === 'already registered') {
          setError('이미 가입된 이메일입니다.')
        } else {
          setError('회원가입 중 오류가 발생했습니다.')
        }
        setLoading(false)
        return
      }

      // 2. 전문가인 경우 이미지 업로드 & Google Sheet 등록
      if (userType === 'expert') {
        // 임시 ID 생성 (실제로는 Supabase에서 생성된 ID 사용)
        const tempId = `EXP-${Date.now()}`
        
        // 이미지 업로드
        let imageUrl = ''
        if (imageFile) {
          const uploadedUrl = await uploadImage(tempId)
          if (uploadedUrl) {
            imageUrl = uploadedUrl
          }
        }

        // Google Sheet에 전문가 등록
        await fetch(GOOGLE_SCRIPT_URL, {
          method: "POST",
          mode: "no-cors",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            action: "registerExpert",
            email: email,
            name: name,
            phone: phone,
            title: expertData.title,
            company: expertData.company,
            category: expertData.category,
            specialties: expertData.specialties,
            location: expertData.location,
            experience: expertData.experience,
            price: expertData.price,
            availability: expertData.availability,
            description: expertData.description,
            image: imageUrl
          }),
        })
      }

      setSuccess(true)
    } catch (err) {
      console.error('회원가입 오류:', err)
      setError('회원가입 중 오류가 발생했습니다.')
    } finally {
      setLoading(false)
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
                    전문가 승인 후 전문가 페이지에 프로필이 노출됩니다.
                  </div>
                )}
                <Link href="/login" className="btn btn-primary">
                  로그인하러 가기
                </Link>
              </div>
            </div>
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
            <h1 className="text-white ds-3 mb-3">회원가입</h1>
            <p className="text-white text-opacity-75 fs-5">
              {step === 1 && '가입 유형을 선택해주세요'}
              {step === 2 && '기본 정보를 입력해주세요'}
              {step === 3 && '전문가 정보를 입력해주세요'}
            </p>
          </div>
        </div>
      </section>

      {/* 진행 단계 표시 */}
      <section className="py-4 bg-white border-bottom">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6">
              <div className="d-flex justify-content-between align-items-center">
                {[1, 2, 3].map((s) => (
                  <div key={s} className="d-flex align-items-center">
                    <div 
                      className={`icon-shape icon-40 rounded-circle d-flex align-items-center justify-content-center
                        ${step >= s ? 'bg-primary text-white' : 'bg-light text-muted'}`}
                    >
                      {step > s ? <i className="bi bi-check"></i> : s}
                    </div>
                    {s < 3 && (
                      <div 
                        className={`mx-2 ${step > s ? 'bg-primary' : 'bg-light'}`}
                        style={{ width: '60px', height: '3px' }}
                      ></div>
                    )}
                  </div>
                ))}
              </div>
              <div className="d-flex justify-content-between mt-2">
                <small className={step >= 1 ? 'text-primary' : 'text-muted'}>유형 선택</small>
                <small className={step >= 2 ? 'text-primary' : 'text-muted'}>기본 정보</small>
                <small className={step >= 3 ? 'text-primary' : 'text-muted'}>
                  {userType === 'expert' ? '전문가 정보' : '완료'}
                </small>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 폼 */}
      <section className="py-80">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6">
              
              {error && (
                <div className="alert alert-danger mb-4">
                  <i className="bi bi-exclamation-circle me-2"></i>
                  {error}
                </div>
              )}

              {/* Step 1: 유형 선택 */}
              {step === 1 && (
                <div className="row g-4">
                  <div className="col-md-6">
                    <div 
                      className="card border-0 shadow-sm rounded-4 h-100 cursor-pointer hover-up"
                      onClick={() => handleTypeSelect('user')}
                      style={{ cursor: 'pointer' }}
                    >
                      <div className="card-body p-5 text-center">
                        <div className="icon-shape icon-80 bg-primary bg-opacity-10 rounded-circle mx-auto mb-4 d-flex align-items-center justify-content-center">
                          <i className="bi bi-person fs-1 text-primary"></i>
                        </div>
                        <h4 className="mb-3">일반 회원</h4>
                        <p className="text-muted mb-0">
                          지원사업 추천, AI 진단,<br/>전문가 상담 서비스 이용
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div 
                      className="card border-0 shadow-sm rounded-4 h-100 cursor-pointer hover-up"
                      onClick={() => handleTypeSelect('expert')}
                      style={{ cursor: 'pointer' }}
                    >
                      <div className="card-body p-5 text-center">
                        <div className="icon-shape icon-80 bg-warning bg-opacity-10 rounded-circle mx-auto mb-4 d-flex align-items-center justify-content-center">
                          <i className="bi bi-briefcase fs-1 text-warning"></i>
                        </div>
                        <h4 className="mb-3">전문가</h4>
                        <p className="text-muted mb-0">
                          전문가로 등록하여<br/>상담 서비스 제공
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 text-center mt-4">
                    <p className="text-muted mb-0">
                      이미 계정이 있으신가요?{' '}
                      <Link href="/login" className="text-primary">로그인</Link>
                    </p>
                  </div>
                </div>
              )}

              {/* Step 2: 기본 정보 */}
              {step === 2 && (
                <div className="card border-0 shadow-sm rounded-4">
                  <div className="card-body p-5">
                    <div className="d-flex align-items-center mb-4">
                      <button 
                        className="btn btn-link text-muted p-0 me-3"
                        onClick={() => setStep(1)}
                      >
                        <i className="bi bi-arrow-left fs-5"></i>
                      </button>
                      <div>
                        <span className={`badge ${userType === 'expert' ? 'bg-warning' : 'bg-primary'} mb-2`}>
                          {userType === 'expert' ? '전문가' : '일반회원'}
                        </span>
                        <h4 className="mb-0">기본 정보</h4>
                      </div>
                    </div>

                    <form onSubmit={handleBasicSubmit}>
                      <div className="mb-3">
                        <label className="form-label">이메일 <span className="text-danger">*</span></label>
                        <input
                          type="email"
                          className="form-control"
                          placeholder="example@email.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                      </div>

                      <div className="mb-3">
                        <label className="form-label">비밀번호 <span className="text-danger">*</span></label>
                        <input
                          type="password"
                          className="form-control"
                          placeholder="6자 이상"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                        />
                      </div>

                      <div className="mb-3">
                        <label className="form-label">비밀번호 확인 <span className="text-danger">*</span></label>
                        <input
                          type="password"
                          className="form-control"
                          placeholder="비밀번호 재입력"
                          value={passwordConfirm}
                          onChange={(e) => setPasswordConfirm(e.target.value)}
                          required
                        />
                      </div>

                      <div className="mb-3">
                        <label className="form-label">이름 <span className="text-danger">*</span></label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="홍길동"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          required
                        />
                      </div>

                      <div className="mb-4">
                        <label className="form-label">연락처</label>
                        <input
                          type="tel"
                          className="form-control"
                          placeholder="010-1234-5678"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                        />
                      </div>

                      <button 
                        type="submit" 
                        className="btn btn-primary w-100 py-3"
                        disabled={loading}
                      >
                        {userType === 'expert' ? '다음 단계' : (loading ? '가입 중...' : '회원가입')}
                        {userType === 'expert' && <i className="bi bi-arrow-right ms-2"></i>}
                      </button>
                    </form>
                  </div>
                </div>
              )}

              {/* Step 3: 전문가 정보 */}
              {step === 3 && userType === 'expert' && (
                <div className="card border-0 shadow-sm rounded-4">
                  <div className="card-body p-5">
                    <div className="d-flex align-items-center mb-4">
                      <button 
                        className="btn btn-link text-muted p-0 me-3"
                        onClick={() => setStep(2)}
                      >
                        <i className="bi bi-arrow-left fs-5"></i>
                      </button>
                      <div>
                        <span className="badge bg-warning mb-2">전문가</span>
                        <h4 className="mb-0">전문가 정보</h4>
                      </div>
                    </div>

                    <form onSubmit={handleFinalSubmit}>
                      {/* 프로필 이미지 업로드 */}
                      <div className="mb-4">
                        <label className="form-label">프로필 이미지</label>
                        <div className="d-flex align-items-center gap-4">
                          <div 
                            className="position-relative"
                            style={{ width: '120px', height: '120px' }}
                          >
                            {imagePreview ? (
                              <>
                                <img 
                                  src={imagePreview} 
                                  alt="프로필 미리보기"
                                  className="rounded-circle w-100 h-100"
                                  style={{ objectFit: 'cover' }}
                                />
                                <button
                                  type="button"
                                  className="btn btn-danger btn-sm position-absolute top-0 end-0 rounded-circle"
                                  onClick={handleImageRemove}
                                  style={{ width: '30px', height: '30px', padding: 0 }}
                                >
                                  <i className="bi bi-x"></i>
                                </button>
                              </>
                            ) : (
                              <div 
                                className="w-100 h-100 rounded-circle bg-light d-flex align-items-center justify-content-center border"
                                style={{ cursor: 'pointer' }}
                                onClick={() => fileInputRef.current?.click()}
                              >
                                <i className="bi bi-camera fs-2 text-muted"></i>
                              </div>
                            )}
                          </div>
                          <div>
                            <input
                              ref={fileInputRef}
                              type="file"
                              accept="image/*"
                              className="d-none"
                              onChange={handleImageSelect}
                            />
                            <button
                              type="button"
                              className="btn btn-outline-primary btn-sm"
                              onClick={() => fileInputRef.current?.click()}
                            >
                              <i className="bi bi-upload me-2"></i>
                              이미지 선택
                            </button>
                            <p className="text-muted small mt-2 mb-0">
                              JPG, PNG 파일 (최대 5MB)
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="row g-3">
                        <div className="col-md-6">
                          <label className="form-label">직함 <span className="text-danger">*</span></label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="대표 컨설턴트"
                            value={expertData.title}
                            onChange={(e) => setExpertData(prev => ({ ...prev, title: e.target.value }))}
                            required
                          />
                        </div>
                        <div className="col-md-6">
                          <label className="form-label">소속 <span className="text-danger">*</span></label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="(주)컨설팅회사"
                            value={expertData.company}
                            onChange={(e) => setExpertData(prev => ({ ...prev, company: e.target.value }))}
                            required
                          />
                        </div>
                        <div className="col-md-6">
                          <label className="form-label">전문 분야 <span className="text-danger">*</span></label>
                          <select
                            className="form-select"
                            value={expertData.category}
                            onChange={(e) => setExpertData(prev => ({ ...prev, category: e.target.value }))}
                            required
                          >
                            <option value="">선택하세요</option>
                            {categories.map(cat => (
                              <option key={cat.id} value={cat.id}>{cat.name}</option>
                            ))}
                          </select>
                        </div>
                        <div className="col-md-6">
                          <label className="form-label">세부 전문분야</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="사업계획서, 투자유치 (쉼표로 구분)"
                            value={expertData.specialties}
                            onChange={(e) => setExpertData(prev => ({ ...prev, specialties: e.target.value }))}
                          />
                        </div>
                        <div className="col-md-6">
                          <label className="form-label">지역</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="서울"
                            value={expertData.location}
                            onChange={(e) => setExpertData(prev => ({ ...prev, location: e.target.value }))}
                          />
                        </div>
                        <div className="col-md-6">
                          <label className="form-label">경력 (년)</label>
                          <input
                            type="number"
                            className="form-control"
                            placeholder="10"
                            value={expertData.experience}
                            onChange={(e) => setExpertData(prev => ({ ...prev, experience: e.target.value }))}
                          />
                        </div>
                        <div className="col-md-6">
                          <label className="form-label">상담료 (원/시간)</label>
                          <input
                            type="number"
                            className="form-control"
                            placeholder="100000"
                            value={expertData.price}
                            onChange={(e) => setExpertData(prev => ({ ...prev, price: e.target.value }))}
                          />
                        </div>
                        <div className="col-md-6">
                          <label className="form-label">상담 가능 시간</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="평일 10-18시"
                            value={expertData.availability}
                            onChange={(e) => setExpertData(prev => ({ ...prev, availability: e.target.value }))}
                          />
                        </div>
                        <div className="col-12">
                          <label className="form-label">자기소개</label>
                          <textarea
                            className="form-control"
                            rows={4}
                            placeholder="전문가로서의 경력과 강점을 소개해주세요"
                            value={expertData.description}
                            onChange={(e) => setExpertData(prev => ({ ...prev, description: e.target.value }))}
                          ></textarea>
                        </div>
                      </div>

                      <button 
                        type="submit" 
                        className="btn btn-primary w-100 py-3 mt-4"
                        disabled={loading || uploadingImage}
                      >
                        {loading || uploadingImage ? (
                          <>
                            <span className="spinner-border spinner-border-sm me-2"></span>
                            {uploadingImage ? '이미지 업로드 중...' : '가입 처리 중...'}
                          </>
                        ) : (
                          <>
                            <i className="bi bi-check-lg me-2"></i>
                            회원가입 완료
                          </>
                        )}
                      </button>
                    </form>
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
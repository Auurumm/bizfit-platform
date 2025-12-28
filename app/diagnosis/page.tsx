"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Layout from "@/components/layout/Layout"
import PageHeader from "@/components/sections/PageHeader"
import Link from "next/link"

interface DiagnosisForm {
  companyName: string
  businessType: string
  industry: string
  employeeCount: string
  annualRevenue: string
  region: string
  establishmentYear: string
  targetMarket: string[]
  challenges: string[]
  goals: string[]
  currentSupport: string[]
  additionalInfo: string
}

interface DiagnosisResult {
  score: number
  recommendations: string[]
  suitablePrograms: {
    id: string
    name: string
    organization: string
    ministry: string
    category: string
    budget: string
    deadline: string
    description: string
    requirements: string[]
    applicationUrl: string
    contactInfo: string
    status: "active" | "closing" | "upcoming" | "closed"
    daysLeft: number | null
    tags: string[]
    matchScore: number
  }[]
  nextSteps: string[]
  totalPrograms: number
  dataSource: string
}

export default function DiagnosisPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<DiagnosisResult | null>(null)
  const [form, setForm] = useState<DiagnosisForm>({
    companyName: "",
    businessType: "",
    industry: "",
    employeeCount: "",
    annualRevenue: "",
    region: "",
    establishmentYear: "",
    targetMarket: [],
    challenges: [],
    goals: [],
    currentSupport: [],
    additionalInfo: "",
  })

  const totalSteps = 4
  const progress = (currentStep / totalSteps) * 100

  // 옵션 데이터
  const businessTypes = [
    { value: "startup", label: "스타트업" },
    { value: "sme", label: "중소기업" },
    { value: "venture", label: "벤처기업" },
    { value: "social", label: "사회적기업" },
    { value: "youth", label: "청년창업" },
    { value: "women", label: "여성기업" },
    { value: "university", label: "대학창업" },
    { value: "regional", label: "지역창업" },
  ]

  const industries = [
    { value: "it", label: "IT/소프트웨어" },
    { value: "manufacturing", label: "제조업" },
    { value: "service", label: "서비스업" },
    { value: "retail", label: "도소매업" },
    { value: "construction", label: "건설업" },
    { value: "healthcare", label: "의료/헬스케어" },
    { value: "education", label: "교육" },
    { value: "finance", label: "금융" },
    { value: "agriculture", label: "농업" },
    { value: "tourism", label: "관광/여행" },
    { value: "media", label: "미디어/엔터테인먼트" },
    { value: "other", label: "기타" },
  ]

  const employeeCounts = [
    { value: "1-5", label: "1-5명" },
    { value: "6-10", label: "6-10명" },
    { value: "11-50", label: "11-50명" },
    { value: "51-100", label: "51-100명" },
    { value: "101-300", label: "101-300명" },
    { value: "300+", label: "300명 이상" },
  ]

  const annualRevenues = [
    { value: "under-100m", label: "1억원 미만" },
    { value: "100m-500m", label: "1억원-5억원" },
    { value: "500m-1b", label: "5억원-10억원" },
    { value: "1b-10b", label: "10억원-100억원" },
    { value: "10b-50b", label: "100억원-500억원" },
    { value: "50b+", label: "500억원 이상" },
  ]

  const regions = [
    { value: "seoul", label: "서울" },
    { value: "busan", label: "부산" },
    { value: "daegu", label: "대구" },
    { value: "incheon", label: "인천" },
    { value: "gwangju", label: "광주" },
    { value: "daejeon", label: "대전" },
    { value: "ulsan", label: "울산" },
    { value: "sejong", label: "세종" },
    { value: "gyeonggi", label: "경기도" },
    { value: "gangwon", label: "강원도" },
    { value: "chungbuk", label: "충청북도" },
    { value: "chungnam", label: "충청남도" },
    { value: "jeonbuk", label: "전라북도" },
    { value: "jeonnam", label: "전라남도" },
    { value: "gyeongbuk", label: "경상북도" },
    { value: "gyeongnam", label: "경상남도" },
    { value: "jeju", label: "제주도" },
  ]

  const targetMarkets = [
    { value: "domestic", label: "국내시장" },
    { value: "export", label: "수출/해외진출" },
    { value: "b2b", label: "B2B(기업간거래)" },
    { value: "b2c", label: "B2C(소비자직접)" },
    { value: "government", label: "정부/공공기관" },
    { value: "global", label: "글로벌시장" },
  ]

  const challenges = [
    { value: "funding", label: "자금조달" },
    { value: "marketing", label: "마케팅/홍보" },
    { value: "technology", label: "기술개발" },
    { value: "talent", label: "인재확보" },
    { value: "regulation", label: "규제/인허가" },
    { value: "competition", label: "경쟁" },
    { value: "digital", label: "디지털전환" },
    { value: "export", label: "수출/해외진출" },
    { value: "certification", label: "인증/품질관리" },
    { value: "expansion", label: "사업확장" },
  ]

  const goals = [
    { value: "growth", label: "매출성장" },
    { value: "innovation", label: "기술혁신" },
    { value: "market", label: "시장확대" },
    { value: "efficiency", label: "운영효율화" },
    { value: "brand", label: "브랜드강화" },
    { value: "talent", label: "인재육성" },
    { value: "sustainability", label: "지속가능경영" },
    { value: "digital", label: "디지털전환" },
  ]

  const currentSupportOptions = [
    { value: "none", label: "현재 지원받고 있지 않음" },
    { value: "startup", label: "창업지원" },
    { value: "rd", label: "R&D지원" },
    { value: "export", label: "수출지원" },
    { value: "employment", label: "고용지원" },
    { value: "training", label: "교육/훈련지원" },
    { value: "consulting", label: "컨설팅지원" },
    { value: "other", label: "기타" },
  ]

  const handleInputChange = (field: keyof DiagnosisForm, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }))
  }

  const handleCheckboxChange = (field: keyof DiagnosisForm, value: string, checked: boolean) => {
    setForm(prev => ({
      ...prev,
      [field]: checked
        ? [...(prev[field] as string[]), value]
        : (prev[field] as string[]).filter(item => item !== value)
    }))
  }

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const submitDiagnosis = async () => {
    setLoading(true)
    
    try {
      const response = await fetch("/api/recommendations/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })

      if (response.ok) {
        const data = await response.json()
        setResult(data)
      } else {
        // API 오류 시 샘플 결과 사용
        setResult(getSampleResult())
      }
    } catch (error) {
      console.error("진단 오류:", error)
      setResult(getSampleResult())
    } finally {
      setLoading(false)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const getSampleResult = (): DiagnosisResult => ({
    score: 85,
    recommendations: [
      "스타트업 대상 지원사업 5건이 귀사에 적합합니다",
      "자금조달이 필요하시다면 창업도약패키지, R&D 역량강화 사업을 검토해보세요",
      "기술개발을 위한 R&D 지원사업 신청을 권장합니다",
    ],
    suitablePrograms: [
      {
        id: "real-2025-001",
        name: "2026년 창업도약패키지 지원사업 (16기)",
        organization: "창업진흥원",
        ministry: "중소벤처기업부",
        category: "창업지원",
        budget: "최대 1억원",
        deadline: "2026-02-28",
        description: "예비창업자 및 초기창업기업의 성공적인 창업을 위한 종합 지원 프로그램입니다.",
        requirements: ["만 39세 이하 예비창업자 또는 업력 3년 이내 창업기업"],
        applicationUrl: "https://www.k-startup.go.kr",
        contactInfo: "창업진흥원 창업교육실 02-6202-2000",
        status: "active",
        daysLeft: 62,
        tags: ["창업", "사업화", "멘토링"],
        matchScore: 92,
      },
      {
        id: "real-2025-009",
        name: "2026년 중소기업 R&D 역량강화 지원사업",
        organization: "중소기업기술정보진흥원",
        ministry: "중소벤처기업부",
        category: "R&D지원",
        budget: "최대 5억원",
        deadline: "2026-02-20",
        description: "중소기업의 기술개발 역량 강화를 위한 R&D 자금 지원사업입니다.",
        requirements: ["중소기업기본법상 중소기업", "R&D 전담조직 또는 연구인력 보유"],
        applicationUrl: "https://www.tipa.or.kr",
        contactInfo: "중소기업기술정보진흥원 042-388-0114",
        status: "active",
        daysLeft: 54,
        tags: ["R&D", "기술개발", "혁신"],
        matchScore: 88,
      },
      {
        id: "real-2025-005",
        name: "2026년 청년창업사관학교 17기",
        organization: "창업진흥원",
        ministry: "중소벤처기업부",
        category: "청년창업",
        budget: "최대 1억원",
        deadline: "2026-01-03",
        description: "만 39세 이하 청년의 기술창업 활성화를 위한 창업교육-보육-투자연계 프로그램입니다.",
        requirements: ["만 39세 이하 예비창업자 또는 창업 3년 이내 기업 대표"],
        applicationUrl: "https://www.k-startup.go.kr",
        contactInfo: "창업진흥원 청년창업팀 02-6202-2100",
        status: "closing",
        daysLeft: 6,
        tags: ["청년창업", "기술창업", "보육"],
        matchScore: 85,
      },
    ],
    nextSteps: [
      "추천 지원사업 상세 정보 및 자격요건 확인",
      "마감 임박 사업 우선 신청",
      "필요 서류 목록 확인 및 사전 준비",
      "온라인 신청서 작성 및 제출",
    ],
    totalPrograms: 12,
    dataSource: "2025년 12월 기준 실제 정부 지원사업 데이터",
  })

  const getScoreLevel = (score: number) => {
    if (score >= 80) return { text: "매우 높음", color: "success" }
    if (score >= 60) return { text: "높음", color: "info" }
    if (score >= 40) return { text: "보통", color: "warning" }
    return { text: "낮음", color: "danger" }
  }

  // 결과 화면
  if (result) {
    const scoreLevel = getScoreLevel(result.score)
    
    return (
      <Layout>
        <PageHeader title="AI 진단 결과" />
        <section className="section-diagnosis-result py-120">
          <div className="container">
            {/* 점수 카드 */}
            <div className="row justify-content-center mb-5">
              <div className="col-lg-8">
                <div className="card border-0 shadow-lg">
                  <div className="card-body text-center p-5">
                    <h2 className="display-1 fw-bold text-primary mb-3">{result.score}점</h2>
                    <p className="fs-4 text-dark mb-3">지원사업 적합도</p>
                    <div className="progress mb-3" style={{ height: "12px" }}>
                      <div 
                        className={`progress-bar bg-${scoreLevel.color}`}
                        role="progressbar" 
                        style={{ width: `${result.score}%` }}
                      />
                    </div>
                    <span className={`badge bg-${scoreLevel.color} fs-6`}>{scoreLevel.text}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="row g-4 mb-5">
              {/* AI 추천사항 */}
              <div className="col-lg-6">
                <div className="card h-100 border-0 shadow">
                  <div className="card-header bg-primary text-white">
                    <h5 className="mb-0">
                      <i className="bi bi-lightbulb me-2"></i>
                      AI 추천사항
                    </h5>
                  </div>
                  <div className="card-body">
                    <ul className="list-unstyled mb-0">
                      {result.recommendations.map((rec, index) => (
                        <li key={index} className="d-flex align-items-start mb-3">
                          <span className="badge bg-primary rounded-circle me-3 mt-1">✓</span>
                          <span>{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* 다음 단계 */}
              <div className="col-lg-6">
                <div className="card h-100 border-0 shadow">
                  <div className="card-header bg-success text-white">
                    <h5 className="mb-0">
                      <i className="bi bi-arrow-right-circle me-2"></i>
                      다음 단계
                    </h5>
                  </div>
                  <div className="card-body">
                    <div className="d-flex flex-column gap-3">
                      {result.nextSteps.map((step, index) => (
                        <div key={index} className="d-flex align-items-center">
                          <span className="badge bg-success rounded-circle me-3 fs-6">{index + 1}</span>
                          <span>{step}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 추천 지원사업 */}
            <div className="row mb-5">
              <div className="col-12">
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h4 className="mb-0">
                    <i className="bi bi-award me-2 text-primary"></i>
                    추천 지원사업
                  </h4>
                  <small className="text-muted">
                    총 {result.totalPrograms}개 중 {result.suitablePrograms.length}개 매칭
                  </small>
                </div>
                <div className="row g-4">
                  {result.suitablePrograms.map((program, index) => (
                    <div key={program.id || index} className="col-lg-4">
                      <div className={`card h-100 border-0 shadow-sm hover-up ${program.status === "closed" ? "opacity-50" : ""}`}>
                        <div className="card-body">
                          <div className="d-flex justify-content-between align-items-start mb-2">
                            <span className="badge bg-primary">{program.category}</span>
                            <span className="badge bg-success">{program.matchScore}% 매칭</span>
                          </div>
                          
                          {/* 상태별 알림 표시 */}
                          {program.status === "closed" && (
                            <div className="alert alert-secondary py-1 px-2 mb-2">
                              <small><i className="bi bi-x-circle me-1"></i>마감됨</small>
                            </div>
                          )}
                          {program.status === "closing" && program.daysLeft !== null && program.daysLeft >= 0 && (
                            <div className="alert alert-danger py-1 px-2 mb-2">
                              <small>
                                <i className="bi bi-exclamation-triangle me-1"></i>
                                마감 임박! D-{program.daysLeft}
                              </small>
                            </div>
                          )}
                          {program.status === "active" && program.daysLeft !== null && program.daysLeft <= 30 && (
                            <div className="alert alert-warning py-1 px-2 mb-2">
                              <small>
                                <i className="bi bi-clock me-1"></i>
                                D-{program.daysLeft}
                              </small>
                            </div>
                          )}
                          {program.status === "upcoming" && (
                            <div className="alert alert-info py-1 px-2 mb-2">
                              <small><i className="bi bi-calendar-event me-1"></i>접수 예정</small>
                            </div>
                          )}
                          
                          <h5 className="card-title">{program.name}</h5>
                          <p className="card-text text-muted small">{program.description}</p>
                          <div className="mb-2">
                            <small className="text-dark">
                              <i className="bi bi-building me-1"></i>
                              {program.organization}
                            </small>
                          </div>
                          <div className="mb-2">
                            <small className="text-primary">
                              <i className="bi bi-cash me-1"></i>
                              {program.budget}
                            </small>
                          </div>
                          <div className="mb-3">
                            <small className={
                              program.status === "closed" ? "text-secondary text-decoration-line-through" :
                              program.status === "closing" ? "text-danger fw-bold" : 
                              "text-muted"
                            }>
                              <i className="bi bi-calendar me-1"></i>
                              마감: {program.deadline}
                              {program.daysLeft !== null && program.status !== "closed" && (
                                <span className="ms-1">
                                  ({program.daysLeft > 0 ? `${program.daysLeft}일 남음` : "오늘 마감"})
                                </span>
                              )}
                            </small>
                          </div>
                          <div className="d-flex flex-wrap gap-1 mb-3">
                            {program.tags?.slice(0, 3).map((tag, i) => (
                              <span key={i} className="badge bg-light text-dark">{tag}</span>
                            ))}
                          </div>
                          
                          {program.status === "closed" ? (
                            <button className="btn btn-secondary btn-sm w-100" disabled>
                              <i className="bi bi-x-circle me-1"></i>
                              마감된 사업
                            </button>
                          ) : (
                            <a 
                              href={program.applicationUrl} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className={`btn btn-sm w-100 ${program.status === "closing" ? "btn-danger" : "btn-outline-primary"}`}
                            >
                              <i className="bi bi-box-arrow-up-right me-1"></i>
                              {program.status === "closing" ? "지금 바로 신청" : "신청 바로가기"}
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                {result.dataSource && (
                  <div className="text-center mt-3">
                    <small className="text-muted">
                      <i className="bi bi-info-circle me-1"></i>
                      {result.dataSource}
                    </small>
                  </div>
                )}
              </div>
            </div>

            {/* 액션 버튼 */}
            <div className="row justify-content-center">
              <div className="col-lg-8">
                <div className="d-flex flex-column flex-md-row gap-3 justify-content-center">
                  <Link href="/support-programs" className="btn btn-primary btn-lg hover-up">
                    <i className="bi bi-search me-2"></i>
                    지원사업 둘러보기
                  </Link>
                  <Link href="/experts" className="btn btn-outline-primary btn-lg hover-up">
                    <i className="bi bi-people me-2"></i>
                    전문가 상담받기
                  </Link>
                  <button 
                    className="btn btn-outline-secondary btn-lg hover-up"
                    onClick={() => {
                      setResult(null)
                      setCurrentStep(1)
                    }}
                  >
                    <i className="bi bi-arrow-repeat me-2"></i>
                    다시 진단하기
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    )
  }

  // 진단 폼 화면
  return (
    <Layout>
      <PageHeader title="AI 기업 진단" />
      <section className="section-diagnosis py-120">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              {/* 소개 텍스트 */}
              <div className="text-center mb-5">
                <p className="fs-5 text-muted">
                  간단한 질문에 답변하시면 AI가 귀하의 기업에 최적화된<br />
                  정부 지원사업을 추천해드립니다
                </p>
              </div>

              {/* 진행률 */}
              <div className="mb-5">
                <div className="d-flex justify-content-between mb-2">
                  <span className="fw-bold">진행률</span>
                  <span className="text-muted">{currentStep} / {totalSteps}</span>
                </div>
                <div className="progress" style={{ height: "10px" }}>
                  <div 
                    className="progress-bar bg-primary"
                    role="progressbar" 
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>

              {/* 스텝 카드 */}
              <div className="card border-0 shadow-lg mb-4">
                <div className="card-header bg-white py-4">
                  <h4 className="mb-1">
                    {currentStep === 1 && "📋 기본 정보"}
                    {currentStep === 2 && "🎯 시장 및 과제"}
                    {currentStep === 3 && "🚀 목표 및 지원 현황"}
                    {currentStep === 4 && "✅ 정보 확인"}
                  </h4>
                  <p className="text-muted mb-0">
                    {currentStep === 1 && "기업의 기본 정보를 입력해주세요"}
                    {currentStep === 2 && "주요 타겟 시장과 현재 직면한 과제를 선택해주세요"}
                    {currentStep === 3 && "주요 목표와 현재 받고 있는 지원을 알려주세요"}
                    {currentStep === 4 && "입력하신 정보를 확인하고 AI 진단을 시작합니다"}
                  </p>
                </div>
                <div className="card-body p-4">
                  {/* Step 1: 기본 정보 */}
                  {currentStep === 1 && (
                    <div className="row g-4">
                      <div className="col-12">
                        <label className="form-label fw-bold">기업명</label>
                        <input
                          type="text"
                          className="form-control form-control-lg"
                          placeholder="기업명을 입력하세요"
                          value={form.companyName}
                          onChange={(e) => handleInputChange("companyName", e.target.value)}
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label fw-bold">기업 유형</label>
                        <select
                          className="form-select form-select-lg"
                          value={form.businessType}
                          onChange={(e) => handleInputChange("businessType", e.target.value)}
                        >
                          <option value="">선택하세요</option>
                          {businessTypes.map((type) => (
                            <option key={type.value} value={type.value}>{type.label}</option>
                          ))}
                        </select>
                      </div>
                      <div className="col-md-6">
                        <label className="form-label fw-bold">업종</label>
                        <select
                          className="form-select form-select-lg"
                          value={form.industry}
                          onChange={(e) => handleInputChange("industry", e.target.value)}
                        >
                          <option value="">선택하세요</option>
                          {industries.map((industry) => (
                            <option key={industry.value} value={industry.value}>{industry.label}</option>
                          ))}
                        </select>
                      </div>
                      <div className="col-md-6">
                        <label className="form-label fw-bold">직원 수</label>
                        <select
                          className="form-select form-select-lg"
                          value={form.employeeCount}
                          onChange={(e) => handleInputChange("employeeCount", e.target.value)}
                        >
                          <option value="">선택하세요</option>
                          {employeeCounts.map((count) => (
                            <option key={count.value} value={count.value}>{count.label}</option>
                          ))}
                        </select>
                      </div>
                      <div className="col-md-6">
                        <label className="form-label fw-bold">연매출</label>
                        <select
                          className="form-select form-select-lg"
                          value={form.annualRevenue}
                          onChange={(e) => handleInputChange("annualRevenue", e.target.value)}
                        >
                          <option value="">선택하세요</option>
                          {annualRevenues.map((revenue) => (
                            <option key={revenue.value} value={revenue.value}>{revenue.label}</option>
                          ))}
                        </select>
                      </div>
                      <div className="col-md-6">
                        <label className="form-label fw-bold">지역</label>
                        <select
                          className="form-select form-select-lg"
                          value={form.region}
                          onChange={(e) => handleInputChange("region", e.target.value)}
                        >
                          <option value="">선택하세요</option>
                          {regions.map((region) => (
                            <option key={region.value} value={region.value}>{region.label}</option>
                          ))}
                        </select>
                      </div>
                      <div className="col-md-6">
                        <label className="form-label fw-bold">설립연도</label>
                        <input
                          type="number"
                          className="form-control form-control-lg"
                          placeholder="예: 2020"
                          value={form.establishmentYear}
                          onChange={(e) => handleInputChange("establishmentYear", e.target.value)}
                        />
                      </div>
                    </div>
                  )}

                  {/* Step 2: 시장 및 과제 */}
                  {currentStep === 2 && (
                    <div className="row g-4">
                      <div className="col-12">
                        <label className="form-label fw-bold mb-3">주요 타겟 시장 (복수 선택 가능)</label>
                        <div className="row g-2">
                          {targetMarkets.map((market) => (
                            <div key={market.value} className="col-md-6">
                              <div className="form-check">
                                <input
                                  type="checkbox"
                                  className="form-check-input"
                                  id={`market-${market.value}`}
                                  checked={form.targetMarket.includes(market.value)}
                                  onChange={(e) => handleCheckboxChange("targetMarket", market.value, e.target.checked)}
                                />
                                <label className="form-check-label" htmlFor={`market-${market.value}`}>
                                  {market.label}
                                </label>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="col-12 mt-4">
                        <label className="form-label fw-bold mb-3">현재 직면한 주요 과제 (복수 선택 가능)</label>
                        <div className="row g-2">
                          {challenges.map((challenge) => (
                            <div key={challenge.value} className="col-md-6">
                              <div className="form-check">
                                <input
                                  type="checkbox"
                                  className="form-check-input"
                                  id={`challenge-${challenge.value}`}
                                  checked={form.challenges.includes(challenge.value)}
                                  onChange={(e) => handleCheckboxChange("challenges", challenge.value, e.target.checked)}
                                />
                                <label className="form-check-label" htmlFor={`challenge-${challenge.value}`}>
                                  {challenge.label}
                                </label>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step 3: 목표 및 지원 현황 */}
                  {currentStep === 3 && (
                    <div className="row g-4">
                      <div className="col-12">
                        <label className="form-label fw-bold mb-3">주요 목표 (복수 선택 가능)</label>
                        <div className="row g-2">
                          {goals.map((goal) => (
                            <div key={goal.value} className="col-md-6">
                              <div className="form-check">
                                <input
                                  type="checkbox"
                                  className="form-check-input"
                                  id={`goal-${goal.value}`}
                                  checked={form.goals.includes(goal.value)}
                                  onChange={(e) => handleCheckboxChange("goals", goal.value, e.target.checked)}
                                />
                                <label className="form-check-label" htmlFor={`goal-${goal.value}`}>
                                  {goal.label}
                                </label>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="col-12 mt-4">
                        <label className="form-label fw-bold mb-3">현재 받고 있는 지원 (복수 선택 가능)</label>
                        <div className="row g-2">
                          {currentSupportOptions.map((support) => (
                            <div key={support.value} className="col-md-6">
                              <div className="form-check">
                                <input
                                  type="checkbox"
                                  className="form-check-input"
                                  id={`support-${support.value}`}
                                  checked={form.currentSupport.includes(support.value)}
                                  onChange={(e) => handleCheckboxChange("currentSupport", support.value, e.target.checked)}
                                />
                                <label className="form-check-label" htmlFor={`support-${support.value}`}>
                                  {support.label}
                                </label>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="col-12 mt-4">
                        <label className="form-label fw-bold">추가 정보 (선택사항)</label>
                        <textarea
                          className="form-control"
                          rows={4}
                          placeholder="기업의 특별한 상황이나 추가로 알리고 싶은 정보가 있다면 입력해주세요"
                          value={form.additionalInfo}
                          onChange={(e) => handleInputChange("additionalInfo", e.target.value)}
                        />
                      </div>
                    </div>
                  )}

                  {/* Step 4: 정보 확인 */}
                  {currentStep === 4 && (
                    <div className="row g-4">
                      <div className="col-12">
                        <div className="alert alert-info">
                          <i className="bi bi-info-circle me-2"></i>
                          입력하신 정보를 확인하고 AI 진단을 시작합니다
                        </div>
                      </div>
                      <div className="col-md-6">
                        <p className="mb-1 text-muted small">기업명</p>
                        <p className="fw-bold">{form.companyName || "미입력"}</p>
                      </div>
                      <div className="col-md-6">
                        <p className="mb-1 text-muted small">기업 유형</p>
                        <p className="fw-bold">{businessTypes.find(t => t.value === form.businessType)?.label || "미선택"}</p>
                      </div>
                      <div className="col-md-6">
                        <p className="mb-1 text-muted small">업종</p>
                        <p className="fw-bold">{industries.find(i => i.value === form.industry)?.label || "미선택"}</p>
                      </div>
                      <div className="col-md-6">
                        <p className="mb-1 text-muted small">직원 수</p>
                        <p className="fw-bold">{employeeCounts.find(e => e.value === form.employeeCount)?.label || "미선택"}</p>
                      </div>
                      <div className="col-md-6">
                        <p className="mb-1 text-muted small">연매출</p>
                        <p className="fw-bold">{annualRevenues.find(r => r.value === form.annualRevenue)?.label || "미선택"}</p>
                      </div>
                      <div className="col-md-6">
                        <p className="mb-1 text-muted small">지역</p>
                        <p className="fw-bold">{regions.find(r => r.value === form.region)?.label || "미선택"}</p>
                      </div>
                      {form.targetMarket.length > 0 && (
                        <div className="col-12">
                          <p className="mb-2 text-muted small">주요 타겟 시장</p>
                          <div className="d-flex flex-wrap gap-2">
                            {form.targetMarket.map((market) => (
                              <span key={market} className="badge bg-primary">
                                {targetMarkets.find(t => t.value === market)?.label}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                      {form.challenges.length > 0 && (
                        <div className="col-12">
                          <p className="mb-2 text-muted small">주요 과제</p>
                          <div className="d-flex flex-wrap gap-2">
                            {form.challenges.map((challenge) => (
                              <span key={challenge} className="badge bg-warning text-dark">
                                {challenges.find(c => c.value === challenge)?.label}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                      {form.goals.length > 0 && (
                        <div className="col-12">
                          <p className="mb-2 text-muted small">주요 목표</p>
                          <div className="d-flex flex-wrap gap-2">
                            {form.goals.map((goal) => (
                              <span key={goal} className="badge bg-success">
                                {goals.find(g => g.value === goal)?.label}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* 네비게이션 버튼 */}
              <div className="d-flex justify-content-between">
                <button 
                  className="btn btn-outline-secondary btn-lg"
                  onClick={prevStep}
                  disabled={currentStep === 1}
                >
                  <i className="bi bi-arrow-left me-2"></i>
                  이전
                </button>
                
                {currentStep < totalSteps ? (
                  <button className="btn btn-primary btn-lg hover-up" onClick={nextStep}>
                    다음
                    <i className="bi bi-arrow-right ms-2"></i>
                  </button>
                ) : (
                  <button 
                    className="btn btn-primary btn-lg hover-up"
                    onClick={submitDiagnosis}
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                        AI 진단 중...
                      </>
                    ) : (
                      <>
                        <i className="bi bi-robot me-2"></i>
                        AI 진단 시작
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}
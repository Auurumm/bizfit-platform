"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Layout from "@/components/layout/Layout"
import PageHeader from "@/components/sections/PageHeader"
import Link from "next/link"
import { useAuth } from "@/lib/AuthContext"
import { supabase } from "@/lib/supabase"

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

interface GovernmentProgram {
  id: string
  title: string
  organization: string
  ministry: string
  category: string
  budget: string
  deadline: string
  registrationDate: string
  description: string
  requirements: string[]
  applicationUrl: string
  contactInfo: string
  status: "active" | "closing" | "upcoming" | "closed"
  tags: string[]
  region: string
  targetCompany: string
  supportType: string
  targetBusinessTypes?: string[]
  targetIndustries?: string[]
  targetChallenges?: string[]
  targetGoals?: string[]
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

// ============================================
// XML 파서 함수 (브라우저용)
// ============================================

function parseXMLToPrograms(xmlText: string): GovernmentProgram[] {
  try {
    const parser = new DOMParser()
    const xmlDoc = parser.parseFromString(xmlText, "text/xml")
    
    // 에러 체크
    const resultCode = xmlDoc.querySelector("resultCode")?.textContent
    if (resultCode !== "00") {
      console.log("API 에러:", xmlDoc.querySelector("resultMsg")?.textContent)
      return []
    }

    const items = xmlDoc.querySelectorAll("item")
    const programs: GovernmentProgram[] = []

    items.forEach((item, index) => {
      const getText = (tag: string) => item.querySelector(tag)?.textContent || ""
      
      const title = getText("title")
      const deadline = getText("applicationEndDate")
      
      programs.push({
        id: `mss-${getText("itemId") || index}`,
        title: title,
        organization: "중소벤처기업부",
        ministry: "중소벤처기업부",
        category: categorizeProgram(title),
        budget: "지원금액 상세페이지 확인",
        deadline: deadline || "상시접수",
        registrationDate: getText("applicationStartDate"),
        description: cleanDescription(getText("dataContents")),
        requirements: ["상세페이지에서 자격요건 확인"],
        applicationUrl: getText("viewUrl") || "https://www.mss.go.kr",
        contactInfo: formatContact(getText("writerName"), getText("writerPosition"), getText("writerPhone")),
        status: determineStatus(deadline),
        tags: extractTags(title),
        region: "전국",
        targetCompany: "중소기업",
        supportType: "정부지원사업",
        targetBusinessTypes: ["sme", "startup", "venture"],
        targetIndustries: inferIndustries(title),
        targetChallenges: inferChallenges(title),
        targetGoals: ["growth", "innovation"],
      })
    })

    return programs
  } catch (error) {
    console.error("XML 파싱 오류:", error)
    return []
  }
}

function categorizeProgram(title: string): string {
  const lower = title.toLowerCase()
  if (lower.includes("창업") || lower.includes("스타트업")) return "창업지원"
  if (lower.includes("수출") || lower.includes("해외") || lower.includes("글로벌") || lower.includes("동반진출")) return "수출지원"
  if (lower.includes("r&d") || lower.includes("연구") || lower.includes("기술")) return "R&D지원"
  if (lower.includes("고용") || lower.includes("일자리") || lower.includes("채용")) return "고용지원"
  if (lower.includes("디지털") || lower.includes("스마트") || lower.includes("ict")) return "디지털전환"
  if (lower.includes("금융") || lower.includes("자금") || lower.includes("대출")) return "자금지원"
  return "정부지원사업"
}

function cleanDescription(content: string): string {
  const cleaned = content
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&middot;/g, "·")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/\s+/g, " ")
    .trim()
  return cleaned.length > 200 ? cleaned.substring(0, 200) + "..." : cleaned
}

function formatContact(name: string, position: string, phone: string): string {
  const parts = [name, position, phone].filter(Boolean)
  return parts.length > 0 ? parts.join(" / ") : "중소벤처기업부 1357"
}

function determineStatus(deadline: string): "active" | "closing" | "upcoming" | "closed" {
  if (!deadline) return "active"
  
  const deadlineDate = new Date(deadline)
  if (isNaN(deadlineDate.getTime())) return "active"
  
  const now = new Date()
  const daysUntil = Math.ceil((deadlineDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))

  if (daysUntil < 0) return "closed"
  if (daysUntil <= 7) return "closing"
  if (daysUntil > 60) return "upcoming"
  return "active"
}

function extractTags(title: string): string[] {
  const tags: string[] = []
  const keywords = ["창업", "스타트업", "벤처", "수출", "R&D", "디지털", "스마트", "금융", "혁신", "글로벌"]
  keywords.forEach(kw => {
    if (title.includes(kw)) tags.push(kw)
  })
  return tags.slice(0, 5)
}

function inferIndustries(title: string): string[] {
  const industries: string[] = []
  if (title.includes("제조") || title.includes("공장")) industries.push("manufacturing")
  if (title.includes("IT") || title.includes("소프트웨어") || title.includes("디지털") || title.includes("팹리스")) industries.push("it")
  if (title.includes("서비스")) industries.push("service")
  if (industries.length === 0) industries.push("it", "manufacturing", "service")
  return industries
}

function inferChallenges(title: string): string[] {
  const challenges: string[] = []
  if (title.includes("자금") || title.includes("금융") || title.includes("투자")) challenges.push("funding")
  if (title.includes("수출") || title.includes("해외") || title.includes("동반진출")) challenges.push("export")
  if (title.includes("기술") || title.includes("R&D")) challenges.push("technology")
  if (title.includes("인력") || title.includes("채용") || title.includes("고용")) challenges.push("talent")
  if (challenges.length === 0) challenges.push("funding", "growth")
  return challenges
}

export default function DiagnosisPage() {
  const router = useRouter()
  const { user, profile } = useAuth()
  
  const [currentStep, setCurrentStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<DiagnosisResult | null>(null)
  const [programs, setPrograms] = useState<GovernmentProgram[]>([])
  
  // 결과 저장 관련 상태
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved" | "error">("idle")
  const [showLoginModal, setShowLoginModal] = useState(false)

  const totalSteps = 4
  const progress = (currentStep / totalSteps) * 100

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
    additionalInfo: ""
  })

  // 옵션 데이터
  const businessTypes = [
    { value: "startup", label: "예비창업자" },
    { value: "early", label: "초기창업 (3년 이내)" },
    { value: "sme", label: "중소기업" },
    { value: "venture", label: "벤처기업" },
    { value: "social", label: "사회적기업" },
    { value: "youth", label: "청년창업" },
    { value: "female", label: "여성기업" },
    { value: "university", label: "대학/연구소" },
  ]

  const industries = [
    { value: "it", label: "IT/소프트웨어" },
    { value: "manufacturing", label: "제조업" },
    { value: "bio", label: "바이오/헬스케어" },
    { value: "service", label: "서비스업" },
    { value: "retail", label: "유통/물류" },
    { value: "content", label: "콘텐츠/미디어" },
    { value: "food", label: "식품/농업" },
    { value: "energy", label: "에너지/환경" },
    { value: "finance", label: "금융/핀테크" },
    { value: "education", label: "교육" },
  ]

  const employeeCounts = [
    { value: "1", label: "1인 (대표자만)" },
    { value: "2-5", label: "2-5명" },
    { value: "6-10", label: "6-10명" },
    { value: "11-50", label: "11-50명" },
    { value: "51-100", label: "51-100명" },
    { value: "100+", label: "100명 이상" },
  ]

  const revenues = [
    { value: "none", label: "매출 없음" },
    { value: "under1", label: "1억 미만" },
    { value: "1-5", label: "1-5억" },
    { value: "5-10", label: "5-10억" },
    { value: "10-50", label: "10-50억" },
    { value: "50+", label: "50억 이상" },
  ]

  const regions = [
    { value: "seoul", label: "서울" },
    { value: "gyeonggi", label: "경기" },
    { value: "incheon", label: "인천" },
    { value: "busan", label: "부산" },
    { value: "daegu", label: "대구" },
    { value: "gwangju", label: "광주" },
    { value: "daejeon", label: "대전" },
    { value: "ulsan", label: "울산" },
    { value: "sejong", label: "세종" },
    { value: "gangwon", label: "강원" },
    { value: "chungbuk", label: "충북" },
    { value: "chungnam", label: "충남" },
    { value: "jeonbuk", label: "전북" },
    { value: "jeonnam", label: "전남" },
    { value: "gyeongbuk", label: "경북" },
    { value: "gyeongnam", label: "경남" },
    { value: "jeju", label: "제주" },
  ]

  const challengeOptions = [
    { value: "funding", label: "자금 확보" },
    { value: "marketing", label: "마케팅/홍보" },
    { value: "export", label: "해외 진출" },
    { value: "technology", label: "기술 개발" },
    { value: "talent", label: "인력 채용" },
    { value: "digital", label: "디지털 전환" },
    { value: "certification", label: "인증/특허" },
    { value: "efficiency", label: "업무 효율화" },
  ]

  const goalOptions = [
    { value: "growth", label: "매출 성장" },
    { value: "export", label: "수출 확대" },
    { value: "innovation", label: "기술 혁신" },
    { value: "employment", label: "고용 확대" },
    { value: "digital", label: "디지털화" },
    { value: "sustainability", label: "지속가능경영" },
    { value: "ipo", label: "상장/투자유치" },
    { value: "efficiency", label: "비용 절감" },
  ]

  const currentSupportOptions = [
    { value: "none", label: "없음" },
    { value: "central", label: "중앙부처 지원사업" },
    { value: "local", label: "지자체 지원사업" },
    { value: "public", label: "공공기관 지원" },
    { value: "private", label: "민간 투자" },
    { value: "loan", label: "정책자금 대출" },
  ]

  const handleInputChange = (field: keyof DiagnosisForm, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }))
  }

  const handleMultiSelect = (field: keyof DiagnosisForm, value: string) => {
    setForm(prev => {
      const currentValues = prev[field] as string[]
      if (currentValues.includes(value)) {
        return { ...prev, [field]: currentValues.filter(v => v !== value) }
      } else {
        return { ...prev, [field]: [...currentValues, value] }
      }
    })
  }

  const nextStep = () => {
    if (currentStep < totalSteps) setCurrentStep(currentStep + 1)
  }

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1)
  }

  const getDaysUntilDeadline = (deadline: string) => {
    if (!deadline || deadline === "상시접수") return null
    const deadlineDate = new Date(deadline)
    if (isNaN(deadlineDate.getTime())) return null
    const now = new Date()
    return Math.ceil((deadlineDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
  }

  // 결과 저장 함수
  const saveResult = async () => {
    if (!user) {
      setShowLoginModal(true)
      return
    }

    if (!result) return

    setSaveStatus("saving")

    try {
      const { error } = await supabase
        .from('diagnosis_results')
        .insert({
          user_id: user.id,
          result: {
            score: result.score,
            recommendations: result.recommendations,
            suitablePrograms: result.suitablePrograms,
            nextSteps: result.nextSteps,
            totalPrograms: result.totalPrograms,
            form: form
          }
        })

      if (error) throw error

      setSaveStatus("saved")
    } catch (error) {
      console.error("저장 오류:", error)
      setSaveStatus("error")
    }
  }

  // 백업 데이터
  const getBackupPrograms = (): GovernmentProgram[] => [
    {
      id: "backup-003",
      title: "2026년 소상공인 디지털 전환 지원사업",
      organization: "소상공인시장진흥공단",
      ministry: "중소벤처기업부",
      category: "디지털전환",
      budget: "최대 3,000만원",
      deadline: "2026-03-31",
      registrationDate: "2025-12-15",
      description: "소상공인의 디지털 역량 강화를 위한 스마트 기기·솔루션 도입 지원",
      requirements: ["소상공인 확인서 보유", "영업 중인 사업자"],
      applicationUrl: "https://www.semas.or.kr",
      contactInfo: "소진공 1588-5302",
      status: "active",
      tags: ["디지털전환", "스마트화"],
      region: "전국",
      targetCompany: "소상공인",
      supportType: "디지털지원",
      targetBusinessTypes: ["sme", "startup"],
      targetIndustries: ["retail", "service", "food"],
      targetChallenges: ["digital", "efficiency"],
      targetGoals: ["digital", "efficiency"],
    },
    {
      id: "backup-004",
      title: "2026년 중소기업 스마트공장 구축 지원",
      organization: "중소벤처기업부",
      ministry: "중소벤처기업부",
      category: "제조지원",
      budget: "지원금액 상세페이지 확인",
      deadline: "2026-05-29",
      registrationDate: "2026-01-02",
      description: "대중소 상생형 스마트공장 구축 지원",
      requirements: ["제조업 중소기업"],
      applicationUrl: "https://www.mss.go.kr/site/smba/ex/bbs/View.do?cbIdx=310&bcIdx=1064406",
      contactInfo: "김민주 / 제조혁신과 / 044-204-7257",
      status: "active",
      tags: ["스마트공장", "제조혁신"],
      region: "전국",
      targetCompany: "중소기업",
      supportType: "제조지원",
      targetBusinessTypes: ["sme", "venture"],
      targetIndustries: ["manufacturing"],
      targetChallenges: ["digital", "efficiency"],
      targetGoals: ["efficiency", "digital"],
    },
    {
      id: "backup-001",
      title: "2026년 창업도약패키지 지원사업",
      organization: "창업진흥원",
      ministry: "중소벤처기업부",
      category: "창업지원",
      budget: "최대 1억원",
      deadline: "2026-02-28",
      registrationDate: "2025-12-20",
      description: "예비창업자 및 초기창업기업의 성공적인 창업을 위한 종합 지원",
      requirements: ["만 39세 이하 예비창업자", "업력 3년 이내"],
      applicationUrl: "https://www.k-startup.go.kr",
      contactInfo: "창업진흥원 02-6202-2000",
      status: "active",
      tags: ["창업", "사업화"],
      region: "전국",
      targetCompany: "예비창업자",
      supportType: "종합지원",
      targetBusinessTypes: ["startup", "youth", "university"],
      targetIndustries: ["it", "manufacturing", "service"],
      targetChallenges: ["funding", "marketing", "technology"],
      targetGoals: ["growth", "innovation"],
    },
  ]

  const getSampleResult = (): DiagnosisResult => ({
    score: 75,
    recommendations: [
      "스타트업 대상 지원사업을 찾았습니다",
      "자금조달이 필요하시다면 창업지원사업을 검토해보세요",
    ],
    suitablePrograms: getBackupPrograms().slice(0, 3).map(p => ({
      id: p.id,
      name: p.title,
      organization: p.organization,
      ministry: p.ministry,
      category: p.category,
      budget: p.budget,
      deadline: p.deadline,
      description: p.description,
      requirements: p.requirements,
      applicationUrl: p.applicationUrl,
      contactInfo: p.contactInfo,
      status: p.status,
      daysLeft: getDaysUntilDeadline(p.deadline),
      tags: p.tags,
      matchScore: 80,
    })),
    nextSteps: ["추천 지원사업 상세 정보 확인", "자격요건 검토"],
    totalPrograms: 5,
    dataSource: "백업 데이터",
  })

  const getScoreLevel = (score: number) => {
    if (score >= 80) return { text: "매우 높음", color: "success" }
    if (score >= 60) return { text: "높음", color: "info" }
    if (score >= 40) return { text: "보통", color: "warning" }
    return { text: "낮음", color: "danger" }
  }

  const submitDiagnosis = async () => {
    setLoading(true)
    // 실제 로직 (간소화)
    await new Promise(resolve => setTimeout(resolve, 2000))
    setResult(getSampleResult())
    setLoading(false)
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
            <div className="row mb-5">
              <div className="col-lg-4 mb-4">
                <div className="card border-0 shadow-lg h-100" style={{ background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" }}>
                  <div className="card-body text-center text-white p-5">
                    <h5 className="mb-3">종합 적합도 점수</h5>
                    <div className="display-1 fw-bold mb-2">{result.score}</div>
                    <span className={`badge bg-${scoreLevel.color} fs-6`}>{scoreLevel.text}</span>
                  </div>
                </div>
              </div>
              <div className="col-lg-8 mb-4">
                <div className="card border-0 shadow-sm h-100">
                  <div className="card-body p-4">
                    <h5 className="card-title mb-4">
                      <i className="bi bi-lightbulb me-2 text-warning"></i>
                      AI 추천 분석
                    </h5>
                    <ul className="list-unstyled">
                      {result.recommendations.map((rec, idx) => (
                        <li key={idx} className="mb-3 d-flex align-items-start">
                          <i className="bi bi-check-circle-fill text-success me-2 mt-1"></i>
                          <span>{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* 결과 저장 카드 */}
            <div className="row mb-5">
              <div className="col-12">
                <div className="card border-0 shadow-sm bg-primary bg-opacity-10">
                  <div className="card-body p-4">
                    <div className="row align-items-center">
                      <div className="col-lg-8">
                        <h5 className="mb-2">
                          <i className="bi bi-bookmark-star me-2 text-primary"></i>
                          진단 결과를 저장하세요
                        </h5>
                        <p className="text-muted mb-0">
                          {user 
                            ? "마이페이지에서 언제든 결과를 다시 확인할 수 있습니다." 
                            : "회원가입하시면 진단 결과를 저장하고, 맞춤 지원사업 알림을 받을 수 있습니다."
                          }
                        </p>
                      </div>
                      <div className="col-lg-4 text-lg-end mt-3 mt-lg-0">
                        {saveStatus === "saved" ? (
                          <span className="btn btn-success disabled">
                            <i className="bi bi-check-lg me-2"></i>
                            저장 완료
                          </span>
                        ) : saveStatus === "saving" ? (
                          <button className="btn btn-primary" disabled>
                            <span className="spinner-border spinner-border-sm me-2"></span>
                            저장 중...
                          </button>
                        ) : (
                          <button className="btn btn-primary" onClick={saveResult}>
                            <i className="bi bi-bookmark me-2"></i>
                            {user ? "결과 저장하기" : "저장하고 회원가입"}
                          </button>
                        )}
                      </div>
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
                            </small>
                          </div>
                          <div className="d-flex flex-wrap gap-1 mb-3">
                            {program.tags?.slice(0, 3).map((tag, i) => (
                              <span key={i} className="badge bg-light text-dark">{tag}</span>
                            ))}
                          </div>
                          
                          {program.status === "closed" ? (
                            <button className="btn btn-secondary btn-sm w-100" disabled>
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

            {/* 다음 단계 */}
            <div className="row mb-5">
              <div className="col-12">
                <div className="card border-0 shadow-sm">
                  <div className="card-body p-4">
                    <h5 className="card-title mb-4">
                      <i className="bi bi-signpost-split me-2 text-info"></i>
                      다음 단계
                    </h5>
                    <div className="row">
                      {result.nextSteps.map((step, idx) => (
                        <div key={idx} className="col-md-6 col-lg-3 mb-3">
                          <div className="d-flex align-items-center">
                            <span className="badge bg-primary rounded-circle me-2" style={{ width: "24px", height: "24px", lineHeight: "16px" }}>
                              {idx + 1}
                            </span>
                            <span className="small">{step}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 버튼 */}
            <div className="text-center">
              <button className="btn btn-outline-primary me-3" onClick={() => { setResult(null); setCurrentStep(1); setSaveStatus("idle") }}>
                <i className="bi bi-arrow-repeat me-2"></i>
                다시 진단하기
              </button>
              <Link href="/experts" className="btn btn-primary">
                <i className="bi bi-person-lines-fill me-2"></i>
                전문가 상담 신청
              </Link>
            </div>
          </div>
        </section>

        {/* 로그인 유도 모달 */}
        {showLoginModal && (
          <div 
            className="modal fade show d-block" 
            style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
            onClick={(e) => e.target === e.currentTarget && setShowLoginModal(false)}
          >
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content rounded-4">
                <div className="modal-body p-5 text-center">
                  <div className="icon-shape icon-80 bg-primary bg-opacity-10 rounded-circle mx-auto mb-4 d-flex align-items-center justify-content-center">
                    <i className="bi bi-person-plus fs-1 text-primary"></i>
                  </div>
                  <h4 className="mb-3">회원가입이 필요해요</h4>
                  <p className="text-muted mb-4">
                    진단 결과를 저장하고, 맞춤 지원사업 알림을 받으시려면<br/>
                    회원가입이 필요합니다.
                  </p>
                  <div className="d-flex gap-3 justify-content-center">
                    <button 
                      className="btn btn-outline-secondary"
                      onClick={() => setShowLoginModal(false)}
                    >
                      다음에 할게요
                    </button>
                    <Link href="/register" className="btn btn-primary">
                      회원가입하기
                    </Link>
                  </div>
                  <div className="mt-3">
                    <small className="text-muted">
                      이미 계정이 있으신가요? <Link href="/login" className="text-primary">로그인</Link>
                    </small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </Layout>
    )
  }

  // 설문 단계 화면
  return (
    <Layout>
      <PageHeader title="AI 기업 진단" />
      <section className="section-diagnosis py-120">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">

              {/* 진행률 */}
              <div className="mb-5">
                <div className="d-flex justify-content-between mb-2">
                  <span className="text-muted">진행률</span>
                  <span className="text-primary fw-bold">{currentStep}/{totalSteps}</span>
                </div>
                <div className="progress" style={{ height: "8px" }}>
                  <div 
                    className="progress-bar bg-primary" 
                    style={{ width: `${progress}%`, transition: "width 0.3s ease" }}
                  />
                </div>
              </div>

              {/* Step 1: 기본 정보 */}
              {currentStep === 1 && (
                <div className="card border-0 shadow-sm">
                  <div className="card-body p-5">
                    <h4 className="card-title mb-4">
                      <i className="bi bi-building me-2 text-primary"></i>
                      기업 기본 정보
                    </h4>
                    
                    <div className="mb-4">
                      <label className="form-label fw-bold">기업명</label>
                      <input 
                        type="text" 
                        className="form-control form-control-lg"
                        placeholder="기업명을 입력하세요"
                        value={form.companyName}
                        onChange={(e) => handleInputChange("companyName", e.target.value)}
                      />
                    </div>

                    <div className="mb-4">
                      <label className="form-label fw-bold">기업 유형</label>
                      <div className="row g-2">
                        {businessTypes.map(type => (
                          <div key={type.value} className="col-6 col-md-4">
                            <div 
                              className={`card cursor-pointer ${form.businessType === type.value ? 'border-primary bg-primary bg-opacity-10' : 'border'}`}
                              onClick={() => handleInputChange("businessType", type.value)}
                              style={{ cursor: "pointer" }}
                            >
                              <div className="card-body text-center py-3">
                                <span className={form.businessType === type.value ? 'text-primary fw-bold' : ''}>{type.label}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mb-4">
                      <label className="form-label fw-bold">주요 업종</label>
                      <div className="row g-2">
                        {industries.map(ind => (
                          <div key={ind.value} className="col-6 col-md-4">
                            <div 
                              className={`card cursor-pointer ${form.industry === ind.value ? 'border-primary bg-primary bg-opacity-10' : 'border'}`}
                              onClick={() => handleInputChange("industry", ind.value)}
                              style={{ cursor: "pointer" }}
                            >
                              <div className="card-body text-center py-3">
                                <span className={form.industry === ind.value ? 'text-primary fw-bold' : ''}>{ind.label}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="text-end">
                      <button 
                        className="btn btn-primary btn-lg" 
                        onClick={nextStep}
                        disabled={!form.businessType || !form.industry}
                      >
                        다음 <i className="bi bi-arrow-right ms-2"></i>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: 기업 현황 */}
              {currentStep === 2 && (
                <div className="card border-0 shadow-sm">
                  <div className="card-body p-5">
                    <h4 className="card-title mb-4">
                      <i className="bi bi-graph-up me-2 text-primary"></i>
                      기업 현황
                    </h4>
                    
                    <div className="mb-4">
                      <label className="form-label fw-bold">직원 수</label>
                      <div className="row g-2">
                        {employeeCounts.map(count => (
                          <div key={count.value} className="col-6 col-md-4">
                            <div 
                              className={`card cursor-pointer ${form.employeeCount === count.value ? 'border-primary bg-primary bg-opacity-10' : 'border'}`}
                              onClick={() => handleInputChange("employeeCount", count.value)}
                              style={{ cursor: "pointer" }}
                            >
                              <div className="card-body text-center py-3">
                                <span className={form.employeeCount === count.value ? 'text-primary fw-bold' : ''}>{count.label}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mb-4">
                      <label className="form-label fw-bold">연 매출</label>
                      <div className="row g-2">
                        {revenues.map(rev => (
                          <div key={rev.value} className="col-6 col-md-4">
                            <div 
                              className={`card cursor-pointer ${form.annualRevenue === rev.value ? 'border-primary bg-primary bg-opacity-10' : 'border'}`}
                              onClick={() => handleInputChange("annualRevenue", rev.value)}
                              style={{ cursor: "pointer" }}
                            >
                              <div className="card-body text-center py-3">
                                <span className={form.annualRevenue === rev.value ? 'text-primary fw-bold' : ''}>{rev.label}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mb-4">
                      <label className="form-label fw-bold">지역</label>
                      <select 
                        className="form-select form-select-lg"
                        value={form.region}
                        onChange={(e) => handleInputChange("region", e.target.value)}
                      >
                        <option value="">지역을 선택하세요</option>
                        {regions.map(reg => (
                          <option key={reg.value} value={reg.value}>{reg.label}</option>
                        ))}
                      </select>
                    </div>

                    <div className="d-flex justify-content-between">
                      <button className="btn btn-outline-secondary btn-lg" onClick={prevStep}>
                        <i className="bi bi-arrow-left me-2"></i> 이전
                      </button>
                      <button className="btn btn-primary btn-lg" onClick={nextStep}>
                        다음 <i className="bi bi-arrow-right ms-2"></i>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: 과제 및 목표 */}
              {currentStep === 3 && (
                <div className="card border-0 shadow-sm">
                  <div className="card-body p-5">
                    <h4 className="card-title mb-4">
                      <i className="bi bi-bullseye me-2 text-primary"></i>
                      현재 과제 및 목표
                    </h4>
                    
                    <div className="mb-4">
                      <label className="form-label fw-bold">현재 직면한 과제 (복수 선택)</label>
                      <div className="row g-2">
                        {challengeOptions.map(challenge => (
                          <div key={challenge.value} className="col-6 col-md-4">
                            <div 
                              className={`card cursor-pointer ${form.challenges.includes(challenge.value) ? 'border-primary bg-primary bg-opacity-10' : 'border'}`}
                              onClick={() => handleMultiSelect("challenges", challenge.value)}
                              style={{ cursor: "pointer" }}
                            >
                              <div className="card-body text-center py-3">
                                <span className={form.challenges.includes(challenge.value) ? 'text-primary fw-bold' : ''}>{challenge.label}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mb-4">
                      <label className="form-label fw-bold">사업 목표 (복수 선택)</label>
                      <div className="row g-2">
                        {goalOptions.map(goal => (
                          <div key={goal.value} className="col-6 col-md-4">
                            <div 
                              className={`card cursor-pointer ${form.goals.includes(goal.value) ? 'border-primary bg-primary bg-opacity-10' : 'border'}`}
                              onClick={() => handleMultiSelect("goals", goal.value)}
                              style={{ cursor: "pointer" }}
                            >
                              <div className="card-body text-center py-3">
                                <span className={form.goals.includes(goal.value) ? 'text-primary fw-bold' : ''}>{goal.label}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="d-flex justify-content-between">
                      <button className="btn btn-outline-secondary btn-lg" onClick={prevStep}>
                        <i className="bi bi-arrow-left me-2"></i> 이전
                      </button>
                      <button 
                        className="btn btn-primary btn-lg" 
                        onClick={nextStep}
                        disabled={form.challenges.length === 0 || form.goals.length === 0}
                      >
                        다음 <i className="bi bi-arrow-right ms-2"></i>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 4: 지원사업 경험 */}
              {currentStep === 4 && (
                <div className="card border-0 shadow-sm">
                  <div className="card-body p-5">
                    <h4 className="card-title mb-4">
                      <i className="bi bi-clipboard-check me-2 text-primary"></i>
                      지원사업 경험
                    </h4>
                    
                    <div className="mb-4">
                      <label className="form-label fw-bold">현재 받고 있거나 받은 지원 (복수 선택)</label>
                      <div className="row g-2">
                        {currentSupportOptions.map(support => (
                          <div key={support.value} className="col-6 col-md-4">
                            <div 
                              className={`card cursor-pointer ${form.currentSupport.includes(support.value) ? 'border-primary bg-primary bg-opacity-10' : 'border'}`}
                              onClick={() => handleMultiSelect("currentSupport", support.value)}
                              style={{ cursor: "pointer" }}
                            >
                              <div className="card-body text-center py-3">
                                <span className={form.currentSupport.includes(support.value) ? 'text-primary fw-bold' : ''}>{support.label}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mb-4">
                      <label className="form-label fw-bold">추가 정보 (선택사항)</label>
                      <textarea 
                        className="form-control"
                        rows={4}
                        placeholder="추가로 알려주실 내용이 있으면 입력해주세요"
                        value={form.additionalInfo}
                        onChange={(e) => handleInputChange("additionalInfo", e.target.value)}
                      />
                    </div>

                    <div className="d-flex justify-content-between">
                      <button className="btn btn-outline-secondary btn-lg" onClick={prevStep}>
                        <i className="bi bi-arrow-left me-2"></i> 이전
                      </button>
                      <button 
                        className="btn btn-success btn-lg" 
                        onClick={submitDiagnosis}
                        disabled={loading}
                      >
                        {loading ? (
                          <>
                            <span className="spinner-border spinner-border-sm me-2"></span>
                            분석 중...
                          </>
                        ) : (
                          <>
                            <i className="bi bi-magic me-2"></i>
                            AI 진단 시작
                          </>
                        )}
                      </button>
                    </div>
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
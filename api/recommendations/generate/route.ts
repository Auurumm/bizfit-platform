import { NextRequest, NextResponse } from "next/server"

// ============================================
// 타입 정의
// ============================================

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

interface RealGovernmentProgram {
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
  // 매칭용 필드
  targetBusinessTypes?: string[]
  targetIndustries?: string[]
  targetChallenges?: string[]
  targetGoals?: string[]
  score?: number
}

// ============================================
// 정부 공공데이터 API Fetcher
// ============================================

class RealGovernmentDataFetcher {
  private readonly baseUrls = {
    g2b: "https://apis.data.go.kr/1230000/BidPublicInfoService04",
    sme: "https://apis.data.go.kr/1160100/service/GetBizStartupInfoService",
    msit: "https://apis.data.go.kr/1262000/TechSupportService",
    motie: "https://apis.data.go.kr/1160200/service/GetTradeInfoService",
    moel: "https://apis.data.go.kr/1490000/JobSupportService",
  }

  private getServiceKeys() {
    return {
      g2b: process.env.G2B_SERVICE_KEY || "",
      sme: process.env.SME_SERVICE_KEY || "",
      msit: process.env.MSIT_SERVICE_KEY || "",
      motie: process.env.MOTIE_SERVICE_KEY || "",
      moel: process.env.MOEL_SERVICE_KEY || "",
    }
  }

  private async fetchWithRetry(url: string, maxRetries = 2): Promise<any> {
    for (let attempt = 0; attempt <= maxRetries; attempt++) {
      try {
        console.log(`🔄 API 호출 시도 ${attempt + 1}/${maxRetries + 1}: ${url.substring(0, 80)}...`)
        
        const res = await fetch(url, {
          headers: { Accept: "application/json" },
          cache: "no-store",
        })
        
        if (!res.ok) {
          throw new Error(`HTTP ${res.status}: ${res.statusText}`)
        }
        
        const text = await res.text()
        
        // XML 응답 체크
        if (text.startsWith("<?xml") || text.startsWith("<")) {
          console.log("⚠️ XML 응답 수신, JSON 변환 필요")
          throw new Error("XML response received instead of JSON")
        }
        
        return JSON.parse(text)
      } catch (err) {
        console.error(`❌ API 호출 실패 (시도 ${attempt + 1}):`, err)
        if (attempt === maxRetries) throw err
        
        const delay = 500 * Math.pow(2, attempt)
        await new Promise(r => setTimeout(r, delay))
      }
    }
  }

  // 나라장터 조달공고 조회
  async fetchG2BData(): Promise<RealGovernmentProgram[]> {
    const serviceKey = this.getServiceKeys().g2b
    if (!serviceKey) {
      console.log("⚠️ G2B_SERVICE_KEY 없음")
      return []
    }

    try {
      const today = new Date()
      const thirtyDaysAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000)
      
      const params = new URLSearchParams({
        serviceKey: serviceKey,
        numOfRows: "50",
        pageNo: "1",
        inqryDiv: "1",
        inqryBgnDt: this.formatDate(thirtyDaysAgo),
        inqryEndDt: this.formatDate(today),
        type: "json",
      })

      const url = `${this.baseUrls.g2b}/getBidPblancListInfoThngPPSSrch?${params}`
      const data = await this.fetchWithRetry(url)
      
      console.log("✅ G2B API 응답:", JSON.stringify(data).substring(0, 200))
      
      return this.parseG2BData(data)
    } catch (error) {
      console.error("❌ G2B API 호출 실패:", error)
      return []
    }
  }

  // 중소벤처기업부 지원사업 조회
  async fetchSMEData(): Promise<RealGovernmentProgram[]> {
    const serviceKey = this.getServiceKeys().sme
    if (!serviceKey) {
      console.log("⚠️ SME_SERVICE_KEY 없음")
      return []
    }

    try {
      const params = new URLSearchParams({
        serviceKey: serviceKey,
        numOfRows: "30",
        pageNo: "1",
        type: "json",
      })

      const url = `${this.baseUrls.sme}/getBizStartupInfo?${params}`
      const data = await this.fetchWithRetry(url)
      
      console.log("✅ SME API 응답:", JSON.stringify(data).substring(0, 200))
      
      return this.parseSMEData(data)
    } catch (error) {
      console.error("❌ SME API 호출 실패:", error)
      return []
    }
  }

  // 과기정통부 지원사업 조회
  async fetchMSITData(): Promise<RealGovernmentProgram[]> {
    const serviceKey = this.getServiceKeys().msit
    if (!serviceKey) {
      console.log("⚠️ MSIT_SERVICE_KEY 없음")
      return []
    }

    try {
      const params = new URLSearchParams({
        serviceKey: serviceKey,
        numOfRows: "20",
        pageNo: "1",
        type: "json",
      })

      const url = `${this.baseUrls.msit}/getTechSupportList?${params}`
      const data = await this.fetchWithRetry(url)
      
      console.log("✅ MSIT API 응답:", JSON.stringify(data).substring(0, 200))
      
      return this.parseMSITData(data)
    } catch (error) {
      console.error("❌ MSIT API 호출 실패:", error)
      return []
    }
  }

  // 산업통상자원부 지원사업 조회
  async fetchMOTIEData(): Promise<RealGovernmentProgram[]> {
    const serviceKey = this.getServiceKeys().motie
    if (!serviceKey) {
      console.log("⚠️ MOTIE_SERVICE_KEY 없음")
      return []
    }

    try {
      const params = new URLSearchParams({
        serviceKey: serviceKey,
        numOfRows: "20",
        pageNo: "1",
        type: "json",
      })

      const url = `${this.baseUrls.motie}/getExportSupportInfo?${params}`
      const data = await this.fetchWithRetry(url)
      
      console.log("✅ MOTIE API 응답:", JSON.stringify(data).substring(0, 200))
      
      return this.parseMOTIEData(data)
    } catch (error) {
      console.error("❌ MOTIE API 호출 실패:", error)
      return []
    }
  }

  // 실시간 정부 지원사업 데이터 조회
  async fetchRealTimePrograms(): Promise<{
    success: boolean
    data: RealGovernmentProgram[]
    totalCount: number
    error?: string
    sources: string[]
  }> {
    console.log("🚀 실시간 정부 지원사업 데이터 조회 시작...")
    console.log("📋 환경변수 확인:", {
      G2B: !!process.env.G2B_SERVICE_KEY,
      SME: !!process.env.SME_SERVICE_KEY,
      MSIT: !!process.env.MSIT_SERVICE_KEY,
      MOTIE: !!process.env.MOTIE_SERVICE_KEY,
    })

    let allPrograms: RealGovernmentProgram[] = []
    const sources: string[] = []

    // 병렬로 모든 API 호출
    const [g2bResult, smeResult, msitResult, motieResult] = await Promise.allSettled([
      this.fetchG2BData(),
      this.fetchSMEData(),
      this.fetchMSITData(),
      this.fetchMOTIEData(),
    ])

    // 성공한 데이터들 병합
    if (g2bResult.status === "fulfilled" && g2bResult.value.length > 0) {
      allPrograms.push(...g2bResult.value)
      sources.push(`나라장터(${g2bResult.value.length}건)`)
    }
    if (smeResult.status === "fulfilled" && smeResult.value.length > 0) {
      allPrograms.push(...smeResult.value)
      sources.push(`중소벤처기업부(${smeResult.value.length}건)`)
    }
    if (msitResult.status === "fulfilled" && msitResult.value.length > 0) {
      allPrograms.push(...msitResult.value)
      sources.push(`과기정통부(${msitResult.value.length}건)`)
    }
    if (motieResult.status === "fulfilled" && motieResult.value.length > 0) {
      allPrograms.push(...motieResult.value)
      sources.push(`산업통상자원부(${motieResult.value.length}건)`)
    }

    // API에서 데이터를 가져오지 못한 경우 백업 데이터 사용
    if (allPrograms.length === 0) {
      console.log("⚠️ 모든 API 호출 실패, 백업 데이터 사용")
      allPrograms = this.getBackupData()
      sources.push("백업 데이터")
    }

    // 최신 등록일 순으로 정렬
    allPrograms.sort((a, b) => {
      const dateA = new Date(a.registrationDate || "1970-01-01").getTime()
      const dateB = new Date(b.registrationDate || "1970-01-01").getTime()
      return dateB - dateA
    })

    console.log(`✅ 총 ${allPrograms.length}개 지원사업 조회 완료`)

    return {
      success: true,
      data: allPrograms,
      totalCount: allPrograms.length,
      sources,
    }
  }

  // 데이터 파싱 메서드들
  private parseG2BData(data: any): RealGovernmentProgram[] {
    try {
      const items = data?.response?.body?.items
      if (!items) return []

      const itemArray = Array.isArray(items) ? items : [items]
      
      return itemArray.filter(Boolean).map((item: any) => ({
        id: `g2b-${item.bidNtceNo || Date.now()}`,
        title: item.bidNtceNm || "조달공고",
        organization: item.ntceInsttNm || "조달청",
        ministry: "조달청",
        category: "조달공고",
        budget: item.presmptPrce ? `${Number(item.presmptPrce).toLocaleString()}원` : "예산 미공개",
        deadline: this.parseDate(item.bidClseDt) || this.getDefaultDeadline(),
        registrationDate: this.parseDate(item.bidNtceDt) || new Date().toISOString().split("T")[0],
        description: item.bidNtceDtl || "조달공고 상세내용",
        requirements: ["조달청 입찰 참가자격 보유", "관련 업종 사업자등록증"],
        applicationUrl: `https://www.g2b.go.kr`,
        contactInfo: item.ntceInsttOfclTelNo || "조달청 고객센터 1588-0800",
        status: this.determineStatus(item.bidClseDt),
        tags: ["조달", "입찰", "공공구매"],
        region: item.dminsttNm || "전국",
        targetCompany: "중소기업",
        supportType: "조달계약",
        targetBusinessTypes: ["sme", "venture", "startup"],
        targetIndustries: ["manufacturing", "it", "service"],
        targetChallenges: ["funding", "expansion"],
        targetGoals: ["growth", "market"],
      }))
    } catch (error) {
      console.error("G2B 데이터 파싱 오류:", error)
      return []
    }
  }

  private parseSMEData(data: any): RealGovernmentProgram[] {
    try {
      const items = data?.response?.body?.items?.item
      if (!items) return []

      const itemArray = Array.isArray(items) ? items : [items]
      
      return itemArray.filter(Boolean).map((item: any) => ({
        id: `sme-${item.bizId || Date.now()}`,
        title: item.bizNm || "중소기업 지원사업",
        organization: "중소벤처기업부",
        ministry: "중소벤처기업부",
        category: "창업지원",
        budget: item.sprtAmt || "지원금액 별도 확인",
        deadline: this.parseDate(item.rcptEndDt) || this.getDefaultDeadline(),
        registrationDate: this.parseDate(item.rcptBgnDt) || new Date().toISOString().split("T")[0],
        description: item.bizCn || "중소기업 지원사업",
        requirements: [item.sprtTrgt || "중소기업"],
        applicationUrl: item.detailUrl || "https://www.mss.go.kr",
        contactInfo: "중소벤처기업부 1357",
        status: this.determineStatus(item.rcptEndDt),
        tags: ["중소기업", "창업", "지원금"],
        region: "전국",
        targetCompany: item.sprtTrgt || "중소기업",
        supportType: "자금지원",
        targetBusinessTypes: ["sme", "startup", "venture"],
        targetIndustries: ["it", "manufacturing", "service"],
        targetChallenges: ["funding", "marketing", "technology"],
        targetGoals: ["growth", "innovation"],
      }))
    } catch (error) {
      console.error("SME 데이터 파싱 오류:", error)
      return []
    }
  }

  private parseMSITData(data: any): RealGovernmentProgram[] {
    try {
      const items = data?.response?.body?.items?.item
      if (!items) return []

      const itemArray = Array.isArray(items) ? items : [items]
      
      return itemArray.filter(Boolean).map((item: any) => ({
        id: `msit-${item.prgmId || Date.now()}`,
        title: item.prgmNm || "과기정통부 지원사업",
        organization: "과학기술정보통신부",
        ministry: "과학기술정보통신부",
        category: "ICT지원",
        budget: item.sprtScale || "지원규모 별도 확인",
        deadline: this.parseDate(item.aplcEndDt) || this.getDefaultDeadline(),
        registrationDate: this.parseDate(item.aplcBgnDt) || new Date().toISOString().split("T")[0],
        description: item.prgmCn || "ICT 분야 지원사업",
        requirements: ["ICT 분야 기업"],
        applicationUrl: item.dtlUrl || "https://www.msit.go.kr",
        contactInfo: "과기정통부 1335",
        status: this.determineStatus(item.aplcEndDt),
        tags: ["ICT", "기술개발", "R&D"],
        region: "전국",
        targetCompany: "ICT기업",
        supportType: "기술지원",
        targetBusinessTypes: ["startup", "venture", "sme"],
        targetIndustries: ["it", "media"],
        targetChallenges: ["technology", "digital"],
        targetGoals: ["innovation", "digital"],
      }))
    } catch (error) {
      console.error("MSIT 데이터 파싱 오류:", error)
      return []
    }
  }

  private parseMOTIEData(data: any): RealGovernmentProgram[] {
    try {
      const items = data?.response?.body?.items?.item
      if (!items) return []

      const itemArray = Array.isArray(items) ? items : [items]
      
      return itemArray.filter(Boolean).map((item: any) => ({
        id: `motie-${item.sptPrgmId || Date.now()}`,
        title: item.sptPrgmNm || "산업통상자원부 지원사업",
        organization: "산업통상자원부",
        ministry: "산업통상자원부",
        category: "수출지원",
        budget: item.sptAmt || "지원금액 별도 확인",
        deadline: this.parseDate(item.aplcEndDt) || this.getDefaultDeadline(),
        registrationDate: this.parseDate(item.aplcBgnDt) || new Date().toISOString().split("T")[0],
        description: item.sptCn || "수출기업 지원사업",
        requirements: ["수출실적 또는 계획 보유"],
        applicationUrl: item.dtlUrl || "https://www.motie.go.kr",
        contactInfo: "산업통상자원부 1600-0720",
        status: this.determineStatus(item.aplcEndDt),
        tags: ["수출", "해외진출", "무역"],
        region: "전국",
        targetCompany: "수출기업",
        supportType: "수출지원금",
        targetBusinessTypes: ["sme", "venture"],
        targetIndustries: ["manufacturing", "it", "retail"],
        targetChallenges: ["export", "marketing"],
        targetGoals: ["market", "growth"],
      }))
    } catch (error) {
      console.error("MOTIE 데이터 파싱 오류:", error)
      return []
    }
  }

  // 유틸리티 메서드들
  private formatDate(date: Date): string {
    return date.toISOString().split("T")[0].replace(/-/g, "")
  }

  private parseDate(dateStr: string): string {
    if (!dateStr) return ""
    
    // YYYYMMDD 형식을 YYYY-MM-DD로 변환
    if (/^\d{8}$/.test(dateStr)) {
      return `${dateStr.slice(0, 4)}-${dateStr.slice(4, 6)}-${dateStr.slice(6, 8)}`
    }
    
    // YYYY-MM-DD 형식 그대로 반환
    if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
      return dateStr
    }
    
    return dateStr
  }

  private getDefaultDeadline(): string {
    const date = new Date()
    date.setMonth(date.getMonth() + 2)
    return date.toISOString().split("T")[0]
  }

  private determineStatus(deadline: string): "active" | "closing" | "upcoming" | "closed" {
    if (!deadline) return "active"

    const deadlineDate = new Date(this.parseDate(deadline))
    const now = new Date()
    const daysUntil = Math.ceil((deadlineDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))

    if (daysUntil < 0) return "closed"
    if (daysUntil <= 7) return "closing"
    if (daysUntil > 60) return "upcoming"
    return "active"
  }

  // 백업 데이터 (API 실패 시 사용)
  private getBackupData(): RealGovernmentProgram[] {
    return [
      {
        id: "backup-001",
        title: "2026년 창업도약패키지 지원사업",
        organization: "창업진흥원",
        ministry: "중소벤처기업부",
        category: "창업지원",
        budget: "최대 1억원",
        deadline: "2026-02-28",
        registrationDate: "2025-12-20",
        description: "예비창업자 및 초기창업기업의 성공적인 창업을 위한 종합 지원 프로그램입니다.",
        requirements: ["만 39세 이하 예비창업자 또는 업력 3년 이내 창업기업"],
        applicationUrl: "https://www.k-startup.go.kr",
        contactInfo: "창업진흥원 02-6202-2000",
        status: "active",
        tags: ["창업", "사업화", "멘토링"],
        region: "전국",
        targetCompany: "예비창업자",
        supportType: "종합지원",
        targetBusinessTypes: ["startup", "youth", "university"],
        targetIndustries: ["it", "manufacturing", "service"],
        targetChallenges: ["funding", "marketing", "technology"],
        targetGoals: ["growth", "innovation", "market"],
      },
      {
        id: "backup-002",
        title: "2025년 고용창출 장려금 지원사업",
        organization: "고용노동부",
        ministry: "고용노동부",
        category: "고용지원",
        budget: "월 최대 80만원/인",
        deadline: "상시접수",
        registrationDate: "2025-01-01",
        description: "신규 직원 채용 기업 대상 인건비 지원사업입니다.",
        requirements: ["고용보험 가입 사업장", "신규 근로자 6개월 이상 고용 유지"],
        applicationUrl: "https://www.ei.go.kr",
        contactInfo: "고용노동부 1350",
        status: "active",
        tags: ["고용", "인건비", "채용"],
        region: "전국",
        targetCompany: "전체기업",
        supportType: "인건비지원",
        targetBusinessTypes: ["sme", "startup", "venture", "social"],
        targetIndustries: ["it", "manufacturing", "service", "retail"],
        targetChallenges: ["talent", "expansion"],
        targetGoals: ["talent", "growth"],
      },
    ]
  }
}

// Fetcher 인스턴스 생성
const dataFetcher = new RealGovernmentDataFetcher()

// ============================================
// 마감일 기준 상태 동적 계산 함수
// ============================================

function calculateProgramStatus(deadline: string): "active" | "closing" | "upcoming" | "closed" {
  if (!deadline || deadline === "상시접수") return "active"
  
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  
  const deadlineDate = new Date(deadline)
  deadlineDate.setHours(23, 59, 59, 999)
  
  const daysUntilDeadline = Math.ceil((deadlineDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
  
  if (daysUntilDeadline < 0) return "closed"
  if (daysUntilDeadline <= 7) return "closing"
  if (daysUntilDeadline > 60) return "upcoming"
  return "active"
}

function getDaysUntilDeadline(deadline: string): number | null {
  if (!deadline || deadline === "상시접수") return null
  
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  
  const deadlineDate = new Date(deadline)
  deadlineDate.setHours(0, 0, 0, 0)
  
  return Math.ceil((deadlineDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
}

// ============================================
// 규칙 기반 매칭 로직
// ============================================

function calculateMatchScore(form: DiagnosisForm, program: RealGovernmentProgram): number {
  let score = 0
  let maxScore = 0

  // 1. 기업 유형 매칭 (30점)
  maxScore += 30
  if (program.targetBusinessTypes?.includes(form.businessType)) {
    score += 30
  } else if (program.targetBusinessTypes?.some(t => 
    (t === "sme" && ["startup", "venture"].includes(form.businessType)) ||
    (t === "startup" && ["youth", "university"].includes(form.businessType))
  )) {
    score += 15
  }

  // 2. 업종 매칭 (20점)
  maxScore += 20
  if (program.targetIndustries?.includes(form.industry)) {
    score += 20
  }

  // 3. 과제 매칭 (25점)
  if (form.challenges.length > 0 && program.targetChallenges) {
    maxScore += 25
    const matchedChallenges = form.challenges.filter(c => 
      program.targetChallenges!.includes(c)
    ).length
    score += (matchedChallenges / Math.max(form.challenges.length, 1)) * 25
  }

  // 4. 목표 매칭 (25점)
  if (form.goals.length > 0 && program.targetGoals) {
    maxScore += 25
    const matchedGoals = form.goals.filter(g => 
      program.targetGoals!.includes(g)
    ).length
    score += (matchedGoals / Math.max(form.goals.length, 1)) * 25
  }

  // 5. 지역 매칭 (보너스 10점)
  if (program.region === "전국" || program.region === form.region) {
    score += 10
    maxScore += 10
  }

  // 6. 마감 상태에 따른 처리
  const dynamicStatus = calculateProgramStatus(program.deadline)
  if (dynamicStatus === "closed") {
    score = 0
  } else if (dynamicStatus === "closing") {
    score *= 0.9
  }

  return maxScore > 0 ? Math.round((score / maxScore) * 100) : 0
}

function generateRecommendations(form: DiagnosisForm, topPrograms: RealGovernmentProgram[]): string[] {
  const recommendations: string[] = []

  const businessTypeLabels: Record<string, string> = {
    startup: "스타트업",
    sme: "중소기업",
    venture: "벤처기업",
    social: "사회적기업",
    youth: "청년창업기업",
    women: "여성기업",
    university: "대학창업기업",
    regional: "지역창업기업",
  }

  if (form.businessType && topPrograms.length > 0) {
    const label = businessTypeLabels[form.businessType] || form.businessType
    recommendations.push(`${label} 대상 지원사업 ${topPrograms.length}건이 귀사에 적합합니다`)
  }

  if (form.challenges.includes("funding")) {
    recommendations.push("자금조달이 필요하시다면 창업지원사업, R&D 사업을 검토해보세요")
  }
  if (form.challenges.includes("export")) {
    recommendations.push("해외진출을 준비 중이시라면 수출지원 사업을 추천드립니다")
  }
  if (form.challenges.includes("talent")) {
    recommendations.push("인재확보가 필요하시다면 고용지원 사업을 활용하세요")
  }

  const closingPrograms = topPrograms.filter(p => calculateProgramStatus(p.deadline) === "closing")
  if (closingPrograms.length > 0) {
    recommendations.push(`⚠️ ${closingPrograms.length}건의 지원사업이 마감 임박입니다!`)
  }

  return recommendations.slice(0, 5)
}

function generateNextSteps(form: DiagnosisForm, topPrograms: RealGovernmentProgram[]): string[] {
  const steps = [
    "추천 지원사업 상세 정보 및 자격요건 확인",
    "필요 서류 목록 확인 및 사전 준비",
  ]

  if (topPrograms.some(p => calculateProgramStatus(p.deadline) === "closing")) {
    steps.push("마감 임박 사업 우선 신청")
  }

  steps.push("온라인 신청서 작성 및 제출")
  steps.push("신청 후 진행상황 모니터링")

  return steps.slice(0, 5)
}

// ============================================
// API 엔드포인트
// ============================================

export async function POST(request: NextRequest) {
  try {
    const form: DiagnosisForm = await request.json()

    // 실제 정부 API에서 데이터 가져오기
    console.log("📡 정부 API 데이터 요청 중...")
    const apiResponse = await dataFetcher.fetchRealTimePrograms()
    
    console.log(`📊 API 응답: ${apiResponse.totalCount}개 지원사업, 출처: ${apiResponse.sources.join(", ")}`)

    // 각 지원사업에 대해 매칭 점수 계산
    const scoredPrograms = apiResponse.data.map(program => ({
      ...program,
      score: calculateMatchScore(form, program),
    }))

    // 점수순 정렬 후 상위 5개 선택
    const topPrograms = scoredPrograms
      .filter(p => (p.score || 0) > 20 && calculateProgramStatus(p.deadline) !== "closed")
      .sort((a, b) => (b.score || 0) - (a.score || 0))
      .slice(0, 5)

    const overallScore = topPrograms.length > 0
      ? Math.round(topPrograms.reduce((sum, p) => sum + (p.score || 0), 0) / topPrograms.length)
      : 50

    const recommendations = generateRecommendations(form, topPrograms)
    const nextSteps = generateNextSteps(form, topPrograms)

    const result = {
      score: overallScore,
      recommendations,
      suitablePrograms: topPrograms.map(p => {
        const dynamicStatus = calculateProgramStatus(p.deadline)
        const daysLeft = getDaysUntilDeadline(p.deadline)
        
        return {
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
          status: dynamicStatus,
          daysLeft,
          tags: p.tags,
          matchScore: p.score,
        }
      }),
      nextSteps,
      totalPrograms: apiResponse.data.filter(p => calculateProgramStatus(p.deadline) !== "closed").length,
      dataSource: `실시간 정부 API (${apiResponse.sources.join(", ")})`,
    }

    return NextResponse.json(result)
  } catch (error) {
    console.error("❌ 추천 생성 오류:", error)
    return NextResponse.json(
      { error: "추천 생성 중 오류가 발생했습니다" },
      { status: 500 }
    )
  }
}

// GET: 전체 지원사업 목록 조회
export async function GET() {
  try {
    const apiResponse = await dataFetcher.fetchRealTimePrograms()
    const activePrograms = apiResponse.data.filter(p => calculateProgramStatus(p.deadline) !== "closed")
    
    return NextResponse.json({
      success: true,
      data: activePrograms,
      totalCount: activePrograms.length,
      sources: apiResponse.sources,
      dataSource: `실시간 정부 API (${apiResponse.sources.join(", ")})`,
    })
  } catch (error) {
    console.error("❌ 지원사업 조회 오류:", error)
    return NextResponse.json(
      { error: "지원사업 조회 중 오류가 발생했습니다" },
      { status: 500 }
    )
  }
}
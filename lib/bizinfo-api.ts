// ============================================
// 기업마당(bizinfo.go.kr) API 연동 (개선 버전)
// - 마감일 파싱 개선
// - 캐싱 추가 (5분)
// - 마감 임박순 정렬
// ============================================

// 기업마당 API 원본 응답 타입
export interface BizinfoProgram {
    pblancId: string           // 공고ID
    pblancNm: string           // 공고명
    jrsdInsttNm: string        // 주관기관명
    excInsttNm: string         // 수행기관명
    sportRealmLclasCodeNm: string  // 지원분야 대분류
    sportRealmMlsfcCodeNm: string  // 지원분야 중분류
    bizPrdCn: string           // 사업기간 내용
    reqstBeginEndDe: string    // 신청시작~종료일
    reqstMthPapersCn: string   // 신청방법/서류 내용
    sportCn: string            // 지원내용
    trgetNm: string            // 지원대상명
    pldirSportCn: string       // 융자조건 지원내용
    bsnsSumryCn: string        // 사업요약 내용
    detailPgUrl: string        // 상세페이지 URL (구버전)
    pblancUrl: string          // 공고 상세페이지 URL (상대경로)
    rceptEngnHmpgUrl: string   // 접수기관 홈페이지 URL
    createdDt: string          // 등록일
    modifiedDt: string         // 수정일
  }
  
  export interface BizinfoApiResponse {
    jsonArray?: BizinfoProgram[]
    totalCnt?: number
    resultCode?: string
    resultMsg?: string
  }
  
  // 표준화된 프로그램 인터페이스
  export interface GovernmentProgram {
    id: string
    title: string
    organization: string
    ministry: string
    category: string
    budget: string
    deadline: string
    deadlineDate: Date | null  // 정렬용 Date 객체
    registrationDate: string
    description: string
    requirements: string[]
    applicationUrl: string
    contactInfo: string
    status: "active" | "closing" | "upcoming" | "closed"
    daysLeft: number | null
    tags: string[]
    region: string
    targetCompany: string
    supportType: string
    // 매칭용 필드
    matching: {
      businessTypes: string[]
      industries: string[]
      challenges: string[]
      goals: string[]
    }
  }
  
  // ============================================
  // 캐시 설정
  // ============================================
  interface CacheData {
    programs: GovernmentProgram[]
    totalCount: number
    lastUpdated: string
    dataSource: string
    cachedAt: number
  }
  
  let programsCache: CacheData | null = null
  const CACHE_DURATION = 6 * 60 * 60 * 1000 // 6시간
  
  function isCacheValid(): boolean {
    if (!programsCache) return false
    return Date.now() - programsCache.cachedAt < CACHE_DURATION
  }
  
  // ============================================
// 마감일 파싱 (개선 버전)
// ============================================
function parseDeadline(reqstBeginEndDe: string, bizPrdCn: string): { 
    deadlineStr: string
    deadlineDate: Date | null 
  } {
    const source = reqstBeginEndDe || bizPrdCn || ""
    
    // 상시접수 패턴
    const alwaysOpenPatterns = [
      "상시", "수시", "소진시", "예산소진", "예산 소진", "마감시", "별도공지", "추후공지", "미정"
    ]
    
    if (!source || alwaysOpenPatterns.some(p => source.includes(p))) {
      return { deadlineStr: "상시접수", deadlineDate: null }
    }
  
    let deadlineDate: Date | null = null
    let deadlineStr = "상시접수"
  
    // 패턴 1: YYYYMMDD ~ YYYYMMDD (공백 있거나 없거나)
    const compactRangeMatch = source.match(/(\d{8})\s*~\s*(\d{8})/)
    if (compactRangeMatch) {
      const endDate = compactRangeMatch[2]
      const year = parseInt(endDate.substring(0, 4))
      const month = parseInt(endDate.substring(4, 6)) - 1
      const day = parseInt(endDate.substring(6, 8))
      deadlineDate = new Date(year, month, day)
      deadlineStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
      return { deadlineStr, deadlineDate }
    }
  
    // 패턴 2: YYYYMMDD 단일
    const compactSingleMatch = source.match(/(\d{8})/)
    if (compactSingleMatch) {
      const dateStr = compactSingleMatch[1]
      const year = parseInt(dateStr.substring(0, 4))
      const month = parseInt(dateStr.substring(4, 6)) - 1
      const day = parseInt(dateStr.substring(6, 8))
      deadlineDate = new Date(year, month, day)
      deadlineStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
      return { deadlineStr, deadlineDate }
    }
  
    // 패턴 3: YYYY-MM-DD 또는 YYYY.MM.DD
    const rangePatterns = [
      /~\s*(\d{4})[-./](\d{1,2})[-./](\d{1,2})/,
      /(\d{4})[-./](\d{1,2})[-./](\d{1,2})\s*까지/,
    ]
  
    for (const pattern of rangePatterns) {
      const match = source.match(pattern)
      if (match) {
        const year = parseInt(match[1])
        const month = parseInt(match[2]) - 1
        const day = parseInt(match[3])
        deadlineDate = new Date(year, month, day)
        deadlineStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
        return { deadlineStr, deadlineDate }
      }
    }
  
    return { deadlineStr, deadlineDate }
  }
  
  // ============================================
  // 상태 계산 함수
  // ============================================
  export function calculateProgramStatus(
    deadlineDate: Date | null
  ): "active" | "closing" | "upcoming" | "closed" {
    if (!deadlineDate) {
      return "active" // 상시접수
    }
  
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    
    const deadline = new Date(deadlineDate)
    deadline.setHours(23, 59, 59, 999)
  
    const daysUntilDeadline = Math.ceil(
      (deadline.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
    )
  
    if (daysUntilDeadline < 0) return "closed"
    if (daysUntilDeadline <= 7) return "closing"
    if (daysUntilDeadline > 60) return "upcoming"
    return "active"
  }
  
  export function getDaysUntilDeadline(deadlineDate: Date | null): number | null {
    if (!deadlineDate) return null
  
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    
    const deadline = new Date(deadlineDate)
    deadline.setHours(0, 0, 0, 0)
  
    return Math.ceil(
      (deadline.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
    )
  }
  
  // ============================================
  // 카테고리 매핑
  // ============================================
  function mapCategory(lclass: string, mclass: string): string {
    const categoryMap: Record<string, string> = {
      "창업지원": "창업지원",
      "창업": "창업지원",
      "기술개발": "R&D지원",
      "기술": "R&D지원",
      "연구개발": "R&D지원",
      "R&D": "R&D지원",
      "수출": "수출지원",
      "해외": "수출지원",
      "글로벌": "수출지원",
      "판로·해외진출": "수출지원",
      "고용": "고용지원",
      "인력": "고용지원",
      "일자리": "고용지원",
      "제조": "제조업지원",
      "스마트": "제조업지원",
      "ICT": "ICT지원",
      "정보통신": "ICT지원",
      "디지털": "ICT지원",
      "여성": "여성기업",
      "사회적": "사회적기업",
      "벤처": "벤처지원",
      "금융": "금융지원",
      "자금": "금융지원",
      "융자": "금융지원",
      "경영": "경영지원",
      "컨설팅": "경영지원",
      "마케팅": "마케팅지원",
      "판로": "마케팅지원",
      "시설·공간·입지": "시설지원",
      "행사·네트워크": "네트워크",
    }
  
    // 정확히 일치하는 경우 먼저 체크
    if (categoryMap[lclass]) return categoryMap[lclass]
    if (categoryMap[mclass]) return categoryMap[mclass]
  
    // 포함 여부 체크
    const combined = `${lclass || ""} ${mclass || ""}`
    for (const [keyword, category] of Object.entries(categoryMap)) {
      if (combined.includes(keyword)) {
        return category
      }
    }
    
    return lclass || mclass || "기타지원"
  }
  
  // ============================================
  // 매칭 조건 추출
  // ============================================
  function extractMatching(program: BizinfoProgram): GovernmentProgram["matching"] {
    const text = `${program.pblancNm || ""} ${program.sportCn || ""} ${program.trgetNm || ""} ${program.bsnsSumryCn || ""} ${program.sportRealmLclasCodeNm || ""} ${program.sportRealmMlsfcCodeNm || ""}`.toLowerCase()
    
    const businessTypes: string[] = []
    const industries: string[] = []
    const challenges: string[] = []
    const goals: string[] = []
  
    // 기업 유형 매칭
    if (text.includes("창업") || text.includes("예비창업") || text.includes("스타트업")) {
      businessTypes.push("startup")
    }
    if (text.includes("청년") || text.includes("39세") || text.includes("청소년")) {
      businessTypes.push("youth")
    }
    if (text.includes("중소기업") || text.includes("중소")) {
      businessTypes.push("sme")
    }
    if (text.includes("소상공인") || text.includes("소기업")) {
      businessTypes.push("small")
    }
    if (text.includes("벤처")) {
      businessTypes.push("venture")
    }
    if (text.includes("여성")) {
      businessTypes.push("women")
    }
    if (text.includes("사회적기업") || text.includes("사회적")) {
      businessTypes.push("social")
    }
    if (text.includes("대학") || text.includes("학생")) {
      businessTypes.push("university")
    }
    if (text.includes("지역") || text.includes("로컬")) {
      businessTypes.push("regional")
    }
    if (businessTypes.length === 0) {
      businessTypes.push("sme", "startup")
    }
  
    // 산업 분야 매칭
    if (text.includes("it") || text.includes("ict") || text.includes("소프트웨어") || text.includes("정보통신") || text.includes("sw")) {
      industries.push("it")
    }
    if (text.includes("제조") || text.includes("생산") || text.includes("공장")) {
      industries.push("manufacturing")
    }
    if (text.includes("서비스")) {
      industries.push("service")
    }
    if (text.includes("의료") || text.includes("헬스") || text.includes("바이오") || text.includes("제약")) {
      industries.push("healthcare")
    }
    if (text.includes("유통") || text.includes("소매") || text.includes("판매") || text.includes("이커머스")) {
      industries.push("retail")
    }
    if (text.includes("농업") || text.includes("식품") || text.includes("농식품") || text.includes("축산")) {
      industries.push("agriculture")
    }
    if (text.includes("관광") || text.includes("문화") || text.includes("콘텐츠") || text.includes("엔터")) {
      industries.push("tourism", "media")
    }
    if (text.includes("건설") || text.includes("건축")) {
      industries.push("construction")
    }
    if (text.includes("에너지") || text.includes("환경") || text.includes("친환경")) {
      industries.push("energy")
    }
    if (industries.length === 0) {
      industries.push("it", "manufacturing", "service")
    }
  
    // 경영 과제 매칭
    if (text.includes("자금") || text.includes("융자") || text.includes("투자") || text.includes("금융") || text.includes("대출")) {
      challenges.push("funding")
    }
    if (text.includes("기술") || text.includes("r&d") || text.includes("연구") || text.includes("개발")) {
      challenges.push("technology")
    }
    if (text.includes("마케팅") || text.includes("홍보") || text.includes("판로") || text.includes("광고")) {
      challenges.push("marketing")
    }
    if (text.includes("수출") || text.includes("해외") || text.includes("글로벌") || text.includes("무역")) {
      challenges.push("export")
    }
    if (text.includes("인력") || text.includes("고용") || text.includes("채용") || text.includes("인재") || text.includes("교육")) {
      challenges.push("talent")
    }
    if (text.includes("디지털") || text.includes("스마트") || text.includes("전환") || text.includes("ai") || text.includes("자동화")) {
      challenges.push("digital")
    }
    if (challenges.length === 0) {
      challenges.push("funding", "technology")
    }
  
    // 목표 매칭
    if (text.includes("성장") || text.includes("확대") || text.includes("도약") || text.includes("scale")) {
      goals.push("growth")
    }
    if (text.includes("혁신") || text.includes("신기술") || text.includes("개발") || text.includes("r&d")) {
      goals.push("innovation")
    }
    if (text.includes("시장") || text.includes("진출") || text.includes("판로") || text.includes("매출")) {
      goals.push("market")
    }
    if (text.includes("효율") || text.includes("생산성") || text.includes("개선") || text.includes("절감")) {
      goals.push("efficiency")
    }
    if (goals.length === 0) {
      goals.push("growth", "innovation")
    }
  
    return { businessTypes, industries, challenges, goals }
  }
  
  // ============================================
  // 태그 추출
  // ============================================
  function extractTags(program: BizinfoProgram): string[] {
    const tags: string[] = []
    const text = `${program.pblancNm || ""} ${program.sportRealmLclasCodeNm || ""} ${program.sportRealmMlsfcCodeNm || ""}`
  
    const tagKeywords = [
      "창업", "R&D", "수출", "해외진출", "고용", "인력",
      "제조", "스마트공장", "ICT", "디지털", "혁신",
      "여성", "청년", "사회적기업", "벤처", "기술개발",
      "마케팅", "판로", "컨설팅", "교육", "멘토링",
      "융자", "투자", "보증", "인증", "특허", "소상공인"
    ]
  
    for (const keyword of tagKeywords) {
      if (text.includes(keyword)) {
        tags.push(keyword)
      }
    }
  
    // 대분류를 태그로 추가
    if (program.sportRealmLclasCodeNm && !tags.includes(program.sportRealmLclasCodeNm)) {
      tags.push(program.sportRealmLclasCodeNm)
    }
  
    return tags.slice(0, 5)
  }
  
  // ============================================
  // 신청 URL 생성
  // ============================================
  function buildApplicationUrl(program: BizinfoProgram): string {
    // 1. 접수기관 홈페이지가 있으면 우선 사용
    if (program.rceptEngnHmpgUrl && program.rceptEngnHmpgUrl.startsWith("http")) {
      return program.rceptEngnHmpgUrl
    }
    
    // 2. 공고 상세페이지 URL (상대경로 → 절대경로)
    if (program.pblancUrl) {
      if (program.pblancUrl.startsWith("http")) {
        return program.pblancUrl
      }
      return `https://www.bizinfo.go.kr${program.pblancUrl}`
    }
    
    // 3. 구버전 상세페이지 URL
    if (program.detailPgUrl) {
      if (program.detailPgUrl.startsWith("http")) {
        return program.detailPgUrl
      }
      return `https://www.bizinfo.go.kr${program.detailPgUrl}`
    }
    
    // 4. 공고 ID가 있으면 직접 URL 생성
    if (program.pblancId) {
      return `https://www.bizinfo.go.kr/web/lay1/bbs/S1T122C128/AS/74/view.do?pblancId=${program.pblancId}`
    }
    
    // 5. 기본값
    return "https://www.bizinfo.go.kr"
  }
  
  // ============================================
  // 설명 텍스트 정리 (HTML 태그 제거)
  // ============================================
  function cleanDescription(html: string): string {
    if (!html) return ""
    
    return html
      .replace(/<[^>]*>/g, ' ')  // HTML 태그 제거
      .replace(/&nbsp;/g, ' ')
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/\s+/g, ' ')      // 다중 공백 제거
      .trim()
      .substring(0, 500)         // 최대 500자
  }
  
  // ============================================
  // 기업마당 API 데이터를 표준 형식으로 변환
  // ============================================
  function transformBizinfoProgram(program: BizinfoProgram): GovernmentProgram {
    const { deadlineStr, deadlineDate } = parseDeadline(program.reqstBeginEndDe, program.bizPrdCn)
    const status = calculateProgramStatus(deadlineDate)
    const daysLeft = getDaysUntilDeadline(deadlineDate)
  
    // 지원금액 추출 시도
    let budget = "상세내용 참조"
    const budgetSources = [program.pldirSportCn, program.sportCn, program.bsnsSumryCn]
    
    for (const source of budgetSources) {
      if (source) {
        // 금액 패턴 매칭 (억, 만원, 원)
        const budgetMatch = source.match(/최대\s*[\d,]+\s*(억|만원|원)|[\d,]+\s*(억원|만원|원)\s*(이내|한도|지원)/i)
        if (budgetMatch) {
          budget = budgetMatch[0]
          break
        }
        // 단순 숫자 + 단위
        const simpleMatch = source.match(/[\d,]+\s*(억|만원|원)/)
        if (simpleMatch && budget === "상세내용 참조") {
          budget = simpleMatch[0]
        }
      }
    }
  
    // 설명 추출 (bsnsSumryCn 우선, 없으면 sportCn)
    const description = cleanDescription(program.bsnsSumryCn || program.sportCn || program.pblancNm || "")
  
    return {
      id: program.pblancId || `bizinfo-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      title: program.pblancNm || "제목 없음",
      organization: program.excInsttNm || program.jrsdInsttNm || "미정",
      ministry: program.jrsdInsttNm || "미정",
      category: mapCategory(program.sportRealmLclasCodeNm, program.sportRealmMlsfcCodeNm),
      budget,
      deadline: deadlineStr,
      deadlineDate,
      registrationDate: program.createdDt || new Date().toISOString().split("T")[0],
      description,
      requirements: program.trgetNm 
        ? program.trgetNm.split(/[,;·\n]/).map(s => s.trim()).filter(Boolean).slice(0, 5)
        : ["상세내용 참조"],
      applicationUrl: buildApplicationUrl(program),
      contactInfo: "기업마당 1357",
      status,
      daysLeft,
      tags: extractTags(program),
      region: "전국",
      targetCompany: program.trgetNm?.substring(0, 50) || "전체기업",
      supportType: program.sportRealmMlsfcCodeNm || program.sportRealmLclasCodeNm || "종합지원",
      matching: extractMatching(program),
    }
  }
  
  // ============================================
  // 프로그램 정렬 (마감 임박순)
  // ============================================
  function sortByDeadline(programs: GovernmentProgram[]): GovernmentProgram[] {
    return programs.sort((a, b) => {
      // 마감된 것은 맨 뒤로
      if (a.status === "closed" && b.status !== "closed") return 1
      if (a.status !== "closed" && b.status === "closed") return -1
      
      // 상시접수는 마감된 것 바로 앞으로
      if (a.deadlineDate === null && b.deadlineDate !== null) return 1
      if (a.deadlineDate !== null && b.deadlineDate === null) return -1
      
      // 둘 다 날짜가 있으면 가까운 순
      if (a.deadlineDate && b.deadlineDate) {
        return a.deadlineDate.getTime() - b.deadlineDate.getTime()
      }
      
      return 0
    })
  }
  
  // ============================================
  // 기업마당 API 호출
  // ============================================
  export async function fetchBizinfoPrograms(options?: {
    searchCnt?: number
    pblancNm?: string
    forceRefresh?: boolean
  }): Promise<{
    programs: GovernmentProgram[]
    totalCount: number
    lastUpdated: string
    dataSource: string
  }> {
    // 캐시 확인 (강제 새로고침이 아닌 경우)
    if (!options?.forceRefresh && isCacheValid() && programsCache) {
      console.log("📦 캐시된 데이터 사용")
      return {
        programs: programsCache.programs,
        totalCount: programsCache.totalCount,
        lastUpdated: programsCache.lastUpdated,
        dataSource: programsCache.dataSource + " (캐시)",
      }
    }
  
    const apiKey = process.env.BIZINFO_API_KEY
    
    if (!apiKey) {
      console.warn("⚠️ BIZINFO_API_KEY가 설정되지 않았습니다. 백업 데이터를 사용합니다.")
      return loadBackupData("API 키 미설정")
    }
  
    const searchCnt = options?.searchCnt || 100
    const baseUrl = "https://www.bizinfo.go.kr/uss/rss/bizinfoApi.do"
    
    const params = new URLSearchParams({
      crtfcKey: apiKey,
      dataType: "json",
      searchCnt: searchCnt.toString(),
    })
  
    if (options?.pblancNm) {
      params.append("pblancNm", options.pblancNm)
    }
  
    const url = `${baseUrl}?${params.toString()}`
  
    try {
      console.log(`🔄 기업마당 API 호출: ${url.substring(0, 80)}...`)
      
      const response = await fetch(url, {
        headers: {
          Accept: "application/json",
        },
        cache: "no-store",
      })
  
      if (!response.ok) {
        throw new Error(`API 응답 오류: ${response.status}`)
      }
  
      const data: BizinfoApiResponse = await response.json()
      
      // 디버깅용 로그
      const jsonStr = JSON.stringify(data).substring(0, 500)
      console.log(`📦 API 응답 (처음 500자): ${jsonStr}`)
      console.log(`📊 API 응답 구조: resultCode=${data.resultCode}, totalCnt=${data.totalCnt}, jsonArray 길이=${data.jsonArray?.length}`)
  
      if (!data.jsonArray || data.jsonArray.length === 0) {
        console.warn("⚠️ API에서 데이터가 없습니다. 백업 데이터를 사용합니다.")
        return loadBackupData("API 응답 없음")
      }
  
      // 데이터 변환
      let programs = data.jsonArray.map(transformBizinfoProgram)
      
      // 마감된 공고 제외 (선택적)
      // programs = programs.filter(p => p.status !== "closed")
      
      // 마감 임박순 정렬
      programs = sortByDeadline(programs)
      
      console.log(`✅ 기업마당 API에서 ${programs.length}개 지원사업 로드 완료`)
  
      const result = {
        programs,
        totalCount: data.totalCnt || programs.length,
        lastUpdated: new Date().toISOString().split("T")[0],
        dataSource: "기업마당(bizinfo.go.kr) 실시간 API",
      }
  
      // 캐시 저장
      programsCache = {
        ...result,
        cachedAt: Date.now(),
      }
  
      return result
    } catch (error) {
      console.error("❌ 기업마당 API 호출 오류:", error)
      return loadBackupData("API 오류")
    }
  }
  
  // ============================================
  // 백업 데이터 로드 (API 실패 시)
  // ============================================
  async function loadBackupData(reason: string): Promise<{
    programs: GovernmentProgram[]
    totalCount: number
    lastUpdated: string
    dataSource: string
  }> {
    try {
      const { loadProgramsFromXml } = await import("./programs-xml")
      const xmlData = await loadProgramsFromXml()
      
      // XML 데이터에도 deadlineDate 추가
      const programs = xmlData.programs.map(p => ({
        ...p,
        deadlineDate: p.deadline && p.deadline !== "상시접수" 
          ? new Date(p.deadline) 
          : null
      }))
      
      return {
        programs: sortByDeadline(programs),
        totalCount: xmlData.totalCount,
        lastUpdated: xmlData.lastUpdated,
        dataSource: `로컬 백업 데이터 (${reason})`,
      }
    } catch (xmlError) {
      console.error("❌ 백업 데이터 로드 오류:", xmlError)
      return {
        programs: [],
        totalCount: 0,
        lastUpdated: new Date().toISOString().split("T")[0],
        dataSource: "데이터 로드 실패",
      }
    }
  }
  
  // ============================================
  // 필터링 함수
  // ============================================
  export function filterPrograms(
    programs: GovernmentProgram[],
    filters: {
      category?: string
      status?: string
      search?: string
      showClosed?: boolean
    }
  ): GovernmentProgram[] {
    let result = [...programs]
  
    // 마감된 공고 필터
    if (!filters.showClosed) {
      result = result.filter(p => p.status !== "closed")
    }
  
    // 카테고리 필터
    if (filters.category) {
      result = result.filter(p => p.category === filters.category)
    }
  
    // 상태 필터
    if (filters.status) {
      result = result.filter(p => p.status === filters.status)
    }
  
    // 검색어 필터
    if (filters.search) {
      const query = filters.search.toLowerCase()
      result = result.filter(p =>
        p.title.toLowerCase().includes(query) ||
        p.organization.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query) ||
        p.tags.some(tag => tag.toLowerCase().includes(query)) ||
        p.category.toLowerCase().includes(query)
      )
    }
  
    return result
  }
  
  // ============================================
  // 매칭 점수 계산 (AI 진단용)
  // ============================================
  export interface DiagnosisForm {
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
  
  export function calculateMatchScore(
    program: GovernmentProgram,
    form: DiagnosisForm
  ): number {
    let score = 0
    const maxScore = 100
  
    // 1. 기업 유형 매칭 (30점)
    const businessTypeMap: Record<string, string[]> = {
      startup: ["startup", "youth", "university"],
      sme: ["sme", "startup", "small"],
      midsize: ["sme"],
      large: [],
      social: ["social"],
      small: ["small", "sme", "startup"],
    }
  
    const userTypes = businessTypeMap[form.businessType] || []
    const typeMatches = userTypes.filter((t) =>
      program.matching.businessTypes.includes(t)
    ).length
  
    if (typeMatches > 0) {
      score += Math.min(30, typeMatches * 15)
    }
  
    // 2. 산업 분야 매칭 (20점)
    if (program.matching.industries.includes(form.industry)) {
      score += 20
    }
  
    // 3. 경영 과제 매칭 (25점)
    const challengeMatches = form.challenges.filter((c) =>
      program.matching.challenges.includes(c)
    ).length
  
    score += Math.min(25, challengeMatches * 10)
  
    // 4. 목표 매칭 (25점)
    const goalMatches = form.goals.filter((g) =>
      program.matching.goals.includes(g)
    ).length
  
    score += Math.min(25, goalMatches * 10)
  
    // 5. 지역 보너스 (10점)
    if (
      program.region === "전국" ||
      program.region === form.region ||
      program.region === "지역별"
    ) {
      score += 10
    }
  
    // 6. 마감 상태 페널티
    if (program.status === "closed") {
      score = 0
    } else if (program.status === "closing") {
      score *= 0.9
    }
  
    return Math.round(Math.min(score, maxScore))
  }
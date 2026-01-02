import { promises as fs } from "fs"
import path from "path"

// ============================================
// 타입 정의
// ============================================
export interface GovernmentProgram {
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

export interface ProgramsData {
  lastUpdated: string
  totalCount: number
  programs: GovernmentProgram[]
}

// ============================================
// 상태 계산 함수
// ============================================
export function calculateProgramStatus(
  deadline: string,
  explicitStatus?: string
): "active" | "closing" | "upcoming" | "closed" {
  // 명시적 상태가 closed인 경우
  if (explicitStatus === "closed") return "closed"

  // 상시접수
  if (!deadline || deadline === "상시접수") return "active"

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const deadlineDate = new Date(deadline)
  deadlineDate.setHours(23, 59, 59, 999)

  const daysUntilDeadline = Math.ceil(
    (deadlineDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
  )

  if (daysUntilDeadline < 0) return "closed" // 마감됨
  if (daysUntilDeadline <= 7) return "closing" // 마감 임박 (7일 이내)
  if (daysUntilDeadline > 60) return "upcoming" // 예정 (60일 이상)
  return "active" // 진행중
}

export function getDaysUntilDeadline(deadline: string): number | null {
  if (!deadline || deadline === "상시접수") return null

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const deadlineDate = new Date(deadline)
  deadlineDate.setHours(0, 0, 0, 0)

  return Math.ceil(
    (deadlineDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
  )
}

// ============================================
// XML 파싱 함수 (Simple DOM Parser)
// ============================================
function getTextContent(xml: string, tagName: string): string {
  const regex = new RegExp(`<${tagName}>([\\s\\S]*?)</${tagName}>`, "i")
  const match = xml.match(regex)
  return match ? decodeXmlEntities(match[1].trim()) : ""
}

function getArrayContent(xml: string, parentTag: string, itemTag: string): string[] {
  const parentRegex = new RegExp(`<${parentTag}>([\\s\\S]*?)</${parentTag}>`, "i")
  const parentMatch = xml.match(parentRegex)
  if (!parentMatch) return []

  const itemRegex = new RegExp(`<${itemTag}>([\\s\\S]*?)</${itemTag}>`, "gi")
  const items: string[] = []
  let match

  while ((match = itemRegex.exec(parentMatch[1])) !== null) {
    items.push(decodeXmlEntities(match[1].trim()))
  }

  return items
}

function getCommaSeparated(xml: string, tagName: string): string[] {
  const content = getTextContent(xml, tagName)
  return content ? content.split(",").map((s) => s.trim()) : []
}

function getAttribute(tagString: string, attrName: string): string {
  // tagString은 <program id="xxx" status="yyy"> 같은 형태
  const regex = new RegExp(`${attrName}\\s*=\\s*["']([^"']*)["']`, "i")
  const match = tagString.match(regex)
  return match ? match[1] : ""
}

function decodeXmlEntities(text: string): string {
  return text
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
}

// ============================================
// XML 파일 로드 및 파싱
// ============================================
export async function loadProgramsFromXml(): Promise<ProgramsData> {
  try {
    // public/data/programs.xml 파일 경로
    const xmlPath = path.join(process.cwd(), "public", "data", "programs.xml")
    const xmlContent = await fs.readFile(xmlPath, "utf-8")

    // 메타데이터 추출
    const programsTagMatch = xmlContent.match(/<programs([^>]*)>/)
    const lastUpdated = programsTagMatch
      ? getAttribute(programsTagMatch[0], "lastUpdated")
      : new Date().toISOString().split("T")[0]

    // 개별 프로그램 추출
    const programRegex = /<program\s+([^>]*)>([\s\S]*?)<\/program>/gi
    const programs: GovernmentProgram[] = []
    let match

    while ((match = programRegex.exec(xmlContent)) !== null) {
      const attributesString = match[1] // id="xxx" status="yyy" 부분
      const programXml = match[2]

      const id = getAttribute(attributesString, "id")
      const explicitStatus = getAttribute(attributesString, "status")

      const deadline = getTextContent(programXml, "deadline")
      const status = calculateProgramStatus(deadline, explicitStatus)
      const daysLeft = getDaysUntilDeadline(deadline)

      // 매칭 정보 추출
      const matchingXml =
        programXml.match(/<matching>([\s\S]*?)<\/matching>/)?.[1] || ""

      const program: GovernmentProgram = {
        id,
        title: getTextContent(programXml, "title"),
        organization: getTextContent(programXml, "organization"),
        ministry: getTextContent(programXml, "ministry"),
        category: getTextContent(programXml, "category"),
        budget: getTextContent(programXml, "budget"),
        deadline,
        registrationDate: getTextContent(programXml, "registrationDate"),
        description: getTextContent(programXml, "description"),
        requirements: getArrayContent(programXml, "requirements", "item"),
        applicationUrl: getTextContent(programXml, "applicationUrl"),
        contactInfo: getTextContent(programXml, "contactInfo"),
        status,
        daysLeft,
        tags: getArrayContent(programXml, "tags", "tag"),
        region: getTextContent(programXml, "region"),
        targetCompany: getTextContent(programXml, "targetCompany"),
        supportType: getTextContent(programXml, "supportType"),
        matching: {
          businessTypes: getCommaSeparated(matchingXml, "businessTypes"),
          industries: getCommaSeparated(matchingXml, "industries"),
          challenges: getCommaSeparated(matchingXml, "challenges"),
          goals: getCommaSeparated(matchingXml, "goals"),
        },
      }

      programs.push(program)
    }

    return {
      lastUpdated,
      totalCount: programs.length,
      programs,
    }
  } catch (error) {
    console.error("XML 파일 로드 오류:", error)
    throw new Error("지원사업 데이터를 불러올 수 없습니다.")
  }
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
    sme: ["sme", "startup"],
    midsize: ["sme"],
    large: [],
    social: ["social"],
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
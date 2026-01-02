// lib/xml-parser.ts

import { parseString } from 'xml2js'
import fs from 'fs'
import path from 'path'
import type { GovernmentProgram, ProgramMatching } from '@/types/program'

/**
 * XML 파일에서 정부 지원사업 데이터 로드
 */
export async function loadProgramsFromXML(): Promise<GovernmentProgram[]> {
  try {
    // XML 파일 경로
    const xmlPath = path.join(process.cwd(), 'public', 'data', 'programs.xml')
    
    // 파일 존재 확인
    if (!fs.existsSync(xmlPath)) {
      console.error('❌ XML 파일을 찾을 수 없습니다:', xmlPath)
      return []
    }
    
    // XML 파일 읽기
    const xmlData = fs.readFileSync(xmlPath, 'utf-8')
    
    // XML 파싱
    const result = await parseXMLString(xmlData)
    
    // 프로그램 배열 추출 및 변환
    const programs = result.programs.program || []
    
    return programs.map((p: any) => transformProgramData(p))
  } catch (error) {
    console.error('❌ XML 로드 실패:', error)
    return []
  }
}

/**
 * XML 문자열 파싱 (Promise 기반)
 */
function parseXMLString(xmlData: string): Promise<any> {
  return new Promise((resolve, reject) => {
    parseString(xmlData, { explicitArray: false }, (err, result) => {
      if (err) {
        reject(err)
      } else {
        resolve(result)
      }
    })
  })
}

/**
 * XML 데이터를 GovernmentProgram 타입으로 변환
 */
function transformProgramData(xmlProgram: any): GovernmentProgram {
  // requirements 배열 처리
  const requirements = Array.isArray(xmlProgram.requirements?.item)
    ? xmlProgram.requirements.item
    : xmlProgram.requirements?.item
    ? [xmlProgram.requirements.item]
    : []

  // tags 배열 처리
  const tags = Array.isArray(xmlProgram.tags?.tag)
    ? xmlProgram.tags.tag
    : xmlProgram.tags?.tag
    ? [xmlProgram.tags.tag]
    : []

  // 마감일까지 남은 일수 계산
  const daysLeft = calculateDaysLeft(xmlProgram.deadline)
  
  // 상태 결정
  const status = determineStatus(xmlProgram, daysLeft)

  // matching 데이터 처리
  const matching = xmlProgram.matching ? transformMatchingData(xmlProgram.matching) : undefined

  return {
    id: xmlProgram.$.id || xmlProgram.id,
    title: xmlProgram.title,
    organization: xmlProgram.organization,
    ministry: xmlProgram.ministry,
    category: xmlProgram.category,
    budget: xmlProgram.budget,
    deadline: xmlProgram.deadline,
    registrationDate: xmlProgram.registrationDate,
    description: xmlProgram.description,
    requirements,
    applicationUrl: xmlProgram.applicationUrl,
    contactInfo: xmlProgram.contactInfo,
    status,
    tags,
    region: xmlProgram.region,
    targetCompany: xmlProgram.targetCompany,
    supportType: xmlProgram.supportType,
    daysLeft,
    matching,
  }
}

/**
 * matching 데이터 변환
 */
function transformMatchingData(xmlMatching: any): ProgramMatching {
  return {
    businessTypes: xmlMatching.businessTypes?.split(',').map((s: string) => s.trim()) || [],
    industries: xmlMatching.industries?.split(',').map((s: string) => s.trim()) || [],
    challenges: xmlMatching.challenges?.split(',').map((s: string) => s.trim()) || [],
    goals: xmlMatching.goals?.split(',').map((s: string) => s.trim()) || [],
  }
}

/**
 * 마감일까지 남은 일수 계산
 */
function calculateDaysLeft(deadline: string): number | null {
  if (deadline === "상시접수") {
    return null
  }

  try {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    
    const deadlineDate = new Date(deadline)
    deadlineDate.setHours(0, 0, 0, 0)
    
    const diffTime = deadlineDate.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    
    return diffDays
  } catch {
    return null
  }
}

/**
 * 프로그램 상태 결정
 */
function determineStatus(
  xmlProgram: any,
  daysLeft: number | null
): "active" | "closing" | "upcoming" | "closed" {
  // XML에 status 속성이 있으면 우선 사용
  if (xmlProgram.$.status === "closed") {
    return "closed"
  }

  // 상시접수
  if (daysLeft === null) {
    return "active"
  }

  // 마감됨
  if (daysLeft < 0) {
    return "closed"
  }

  // 마감 임박 (7일 이하)
  if (daysLeft <= 7) {
    return "closing"
  }

  // 접수 예정 (등록일이 미래인 경우)
  const registrationDate = new Date(xmlProgram.registrationDate)
  const today = new Date()
  if (registrationDate > today) {
    return "upcoming"
  }

  // 진행중
  return "active"
}

/**
 * 카테고리별 프로그램 필터링
 */
export async function getProgramsByCategory(category: string): Promise<GovernmentProgram[]> {
  const allPrograms = await loadProgramsFromXML()
  return allPrograms.filter(p => p.category === category)
}

/**
 * 상태별 프로그램 필터링
 */
export async function getProgramsByStatus(status: string): Promise<GovernmentProgram[]> {
  const allPrograms = await loadProgramsFromXML()
  return allPrograms.filter(p => p.status === status)
}

/**
 * ID로 특정 프로그램 찾기
 */
export async function getProgramById(id: string): Promise<GovernmentProgram | null> {
  const allPrograms = await loadProgramsFromXML()
  return allPrograms.find(p => p.id === id) || null
}

/**
 * 검색어로 프로그램 찾기
 */
export async function searchPrograms(query: string): Promise<GovernmentProgram[]> {
  const allPrograms = await loadProgramsFromXML()
  const lowerQuery = query.toLowerCase()
  
  return allPrograms.filter(p => 
    p.title.toLowerCase().includes(lowerQuery) ||
    p.organization.toLowerCase().includes(lowerQuery) ||
    p.description.toLowerCase().includes(lowerQuery) ||
    p.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
  )
}
// app/api/recommendations/generate/route.ts

import { NextRequest, NextResponse } from 'next/server'
import { loadProgramsFromXML } from '@/lib/xml-parser'
import type { GovernmentProgram } from '@/types/program'

export const dynamic = 'force-dynamic'

/**
 * AI 진단 결과 타입
 */
interface DiagnosisForm {
  businessType: string    // startup, sme, venture, youth, women, university, regional, social
  industry: string        // it, manufacturing, service, healthcare, education, retail, agriculture, media, tourism
  employees?: number
  revenue?: number
  age?: number
  challenges?: string[]   // funding, marketing, technology, digital, talent, export, expansion, efficiency, certification
  goals?: string[]        // growth, innovation, market, brand, digital, sustainability, efficiency, talent
}

/**
 * POST /api/recommendations/generate
 * AI 진단 폼 제출 → 맞춤형 지원사업 추천
 */
export async function POST(request: NextRequest) {
  try {
    const form: DiagnosisForm = await request.json()

    // XML에서 모든 프로그램 로드
    const allPrograms = await loadProgramsFromXML()

    // 마감된 사업 제외
    const activePrograms = allPrograms.filter(p => p.status !== 'closed')

    // 매칭 점수 계산
    const scoredPrograms = activePrograms
      .map(program => ({
        ...program,
        matchScore: calculateMatchScore(form, program),
      }))
      .filter(p => p.matchScore > 20) // 최소 20점 이상만
      .sort((a, b) => b.matchScore - a.matchScore)
      .slice(0, 10) // 상위 10개

    // 전체 매칭 점수 계산
    const overallScore = scoredPrograms.length > 0
      ? Math.round(scoredPrograms.reduce((sum, p) => sum + p.matchScore, 0) / scoredPrograms.length)
      : 50

    // 추천 문구 생성
    const recommendations = generateRecommendations(form, scoredPrograms)

    // 다음 단계 안내
    const nextSteps = generateNextSteps(scoredPrograms)

    return NextResponse.json({
      success: true,
      score: overallScore,
      recommendations,
      programs: scoredPrograms,
      nextSteps,
      totalPrograms: activePrograms.length,
      dataSource: 'XML 기반 정부 지원사업 데이터',
    })
  } catch (error) {
    console.error('❌ 추천 생성 실패:', error)

    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : '추천 생성 중 오류 발생',
        score: 0,
        recommendations: [],
        programs: [],
        nextSteps: [],
      },
      { status: 500 }
    )
  }
}

/**
 * GET /api/recommendations/generate
 * 모든 활성 프로그램 반환 (진단 없이)
 */
export async function GET() {
  try {
    const allPrograms = await loadProgramsFromXML()
    const activePrograms = allPrograms.filter(p => p.status !== 'closed')

    return NextResponse.json({
      success: true,
      programs: activePrograms,
      totalCount: activePrograms.length,
      dataSource: 'XML 기반 정부 지원사업 데이터',
    })
  } catch (error) {
    console.error('❌ 프로그램 로드 실패:', error)

    return NextResponse.json(
      {
        success: false,
        programs: [],
        totalCount: 0,
        error: error instanceof Error ? error.message : '데이터 로드 실패',
      },
      { status: 500 }
    )
  }
}

/**
 * 매칭 점수 계산 알고리즘
 * 
 * 점수 배분:
 * - 기업 유형: 30점
 * - 산업 분야: 20점
 * - 해결 과제: 25점
 * - 목표: 25점
 * - 지역: 5점
 * - 보너스: 15점
 * 
 * 최대 120점 → 100점 스케일로 변환
 */
function calculateMatchScore(form: DiagnosisForm, program: GovernmentProgram): number {
  let score = 0
  let maxScore = 100

  // matching 데이터가 없으면 기본 점수만 (모든 프로그램 표시)
  if (!program.matching) {
    return 30 // 기본 점수
  }

  const { businessTypes, industries, challenges, goals } = program.matching

  // ============================================
  // 1. 기업 유형 매칭 (30점)
  // ============================================
  if (businessTypes.includes(form.businessType)) {
    score += 30
  } else if (isCompatibleBusinessType(form.businessType, businessTypes)) {
    // 호환 가능한 유형 (예: startup → sme, youth → startup)
    score += 15
  }

  // ============================================
  // 2. 산업 분야 매칭 (20점)
  // ============================================
  if (industries.includes(form.industry)) {
    score += 20
  }

  // ============================================
  // 3. 해결 과제 매칭 (25점)
  // ============================================
  if (form.challenges && form.challenges.length > 0) {
    const matchedChallenges = form.challenges.filter(c => challenges.includes(c))
    const challengeScore = (matchedChallenges.length / form.challenges.length) * 25
    score += Math.round(challengeScore)
  }

  // ============================================
  // 4. 목표 매칭 (25점)
  // ============================================
  if (form.goals && form.goals.length > 0) {
    const matchedGoals = form.goals.filter(g => goals.includes(g))
    const goalScore = (matchedGoals.length / form.goals.length) * 25
    score += Math.round(goalScore)
  }

  // ============================================
  // 5. 지역 매칭 (5점)
  // ============================================
  if (program.region === '전국') {
    score += 5
  }

  // ============================================
  // 6. 보너스 점수 (최대 15점)
  // ============================================

  // 청년 창업 보너스
  if (form.businessType === 'youth' && program.category.includes('청년')) {
    score += 10
  }

  // 여성 기업 보너스
  if (form.businessType === 'women' && program.category.includes('여성')) {
    score += 10
  }

  // 대학 창업 보너스
  if (form.businessType === 'university' && program.category.includes('대학')) {
    score += 10
  }

  // 사회적 기업 보너스
  if (form.businessType === 'social' && program.category.includes('사회적')) {
    score += 10
  }

  // 매출액 기반 보너스
  if (form.revenue !== undefined) {
    // 매출 50억 이하 중소기업
    if (form.revenue < 50 && program.targetCompany.includes('중소기업')) {
      score += 5
    }
    // 초기 스타트업 (매출 10억 이하)
    if (form.revenue < 10 && program.category.includes('창업')) {
      score += 5
    }
  }

  // 직원 수 기반 보너스
  if (form.employees !== undefined) {
    // 소규모 기업 (직원 50명 이하)
    if (form.employees < 50 && program.category.includes('창업')) {
      score += 3
    }
  }

  // ============================================
  // 7. 상태 기반 감점
  // ============================================
  if (program.status === 'closing') {
    // 마감 임박 사업은 10% 감점 (긴급성 강조)
    score *= 0.9
  }

  // 최대 120점을 100점 스케일로 변환
  return Math.min(Math.round(score), 100)
}

/**
 * 호환 가능한 기업 유형 확인
 */
function isCompatibleBusinessType(
  formType: string,
  programTypes: string[]
): boolean {
  const compatibilityMap: Record<string, string[]> = {
    startup: ['sme', 'venture'],
    youth: ['startup', 'sme'],
    university: ['startup', 'youth'],
    women: ['startup', 'sme'],
    social: ['sme'],
    regional: ['startup', 'sme'],
  }

  const compatibleTypes = compatibilityMap[formType] || []
  return programTypes.some(t => compatibleTypes.includes(t))
}

/**
 * 추천 문구 생성
 */
function generateRecommendations(
  form: DiagnosisForm,
  programs: GovernmentProgram[]
): string[] {
  const recommendations: string[] = []

  // 기업 유형별 메시지
  const typeLabels: Record<string, string> = {
    startup: '스타트업',
    sme: '중소기업',
    venture: '벤처기업',
    social: '사회적기업',
    youth: '청년창업기업',
    women: '여성기업',
    university: '대학창업',
    regional: '지역창업',
  }

  const typeLabel = typeLabels[form.businessType] || '귀사'
  recommendations.push(`${typeLabel}에 적합한 지원사업 ${programs.length}건을 찾았습니다`)

  // 과제별 추천
  if (form.challenges) {
    if (form.challenges.includes('funding')) {
      const fundingPrograms = programs.filter(p =>
        p.category.includes('창업') || p.category.includes('R&D')
      )
      if (fundingPrograms.length > 0) {
        recommendations.push(
          `💰 자금조달: ${fundingPrograms[0].title} 등 ${fundingPrograms.length}건 추천`
        )
      }
    }

    if (form.challenges.includes('export')) {
      const exportPrograms = programs.filter(p => p.category.includes('수출'))
      if (exportPrograms.length > 0) {
        recommendations.push(
          `🌏 해외진출: ${exportPrograms[0].title} 등 ${exportPrograms.length}건 추천`
        )
      }
    }

    if (form.challenges.includes('talent')) {
      const talentPrograms = programs.filter(p => p.category.includes('고용'))
      if (talentPrograms.length > 0) {
        recommendations.push(
          `👥 인재확보: ${talentPrograms[0].title} 등 ${talentPrograms.length}건 추천`
        )
      }
    }

    if (form.challenges.includes('digital')) {
      const digitalPrograms = programs.filter(
        p => p.category.includes('ICT') || p.category.includes('디지털')
      )
      if (digitalPrograms.length > 0) {
        recommendations.push(
          `💻 디지털전환: ${digitalPrograms[0].title} 등 ${digitalPrograms.length}건 추천`
        )
      }
    }

    if (form.challenges.includes('technology')) {
      const techPrograms = programs.filter(p => p.category.includes('R&D'))
      if (techPrograms.length > 0) {
        recommendations.push(
          `🔬 기술개발: ${techPrograms[0].title} 등 ${techPrograms.length}건 추천`
        )
      }
    }
  }

  // 마감 임박 경고
  const closingPrograms = programs.filter(p => p.status === 'closing')
  if (closingPrograms.length > 0) {
    recommendations.push(
      `⚠️ ${closingPrograms.length}건이 마감 임박! 빠른 신청을 권장합니다`
    )
  }

  // 상시 접수 안내
  const ongoingPrograms = programs.filter(p => p.deadline === '상시접수')
  if (ongoingPrograms.length > 0) {
    recommendations.push(
      `📅 ${ongoingPrograms.length}건은 상시 접수 가능합니다`
    )
  }

  return recommendations.slice(0, 5) // 최대 5개
}

/**
 * 다음 단계 안내 생성
 */
function generateNextSteps(programs: GovernmentProgram[]): string[] {
  const steps: string[] = []

  if (programs.length === 0) {
    return [
      '진단 정보를 조정하여 다시 검색해보세요',
      '전체 지원사업 목록을 확인해보세요',
      '문의하기를 통해 맞춤 상담을 받아보세요',
    ]
  }

  // 기본 단계
  steps.push('추천 지원사업 상세 정보 및 자격요건 확인')
  steps.push('필요 서류 목록 확인 및 사전 준비')

  // 마감 임박 사업이 있으면
  const closingPrograms = programs.filter(p => p.status === 'closing')
  if (closingPrograms.length > 0) {
    steps.push(`⚠️ 마감 임박 사업(${closingPrograms.length}건) 우선 신청`)
  }

  steps.push('온라인 신청서 작성 및 제출')
  steps.push('신청 후 진행상황 모니터링')

  // 추가 조언
  if (programs.some(p => p.category.includes('R&D'))) {
    steps.push('💡 R&D 사업의 경우 기술개발계획서를 미리 준비하세요')
  }

  if (programs.some(p => p.category.includes('수출'))) {
    steps.push('💡 수출 사업의 경우 수출실적 증빙자료를 준비하세요')
  }

  return steps.slice(0, 6) // 최대 6개
}
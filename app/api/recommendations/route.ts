import { NextRequest, NextResponse } from "next/server"
import {
  loadProgramsFromXml,
  calculateMatchScore,
  GovernmentProgram,
  DiagnosisForm,
} from "@/lib/programs-xml"

// ============================================
// POST: AI 진단 기반 추천
// ============================================

export async function POST(request: NextRequest) {
  try {
    const form: DiagnosisForm = await request.json()

    // XML에서 프로그램 로드
    const data = await loadProgramsFromXml()

    // 각 프로그램에 매칭 점수 계산
    const scoredPrograms = data.programs.map((program) => ({
      ...program,
      matchScore: calculateMatchScore(program, form),
    }))

    // 점수순 정렬 후 상위 5개 선택 (30점 이상, 마감된 사업 제외)
    const topPrograms = scoredPrograms
      .filter((p) => p.matchScore > 30 && p.status !== "closed")
      .sort((a, b) => b.matchScore - a.matchScore)
      .slice(0, 5)

    // 전체 점수 (상위 프로그램 평균)
    const overallScore =
      topPrograms.length > 0
        ? Math.round(
            topPrograms.reduce((sum, p) => sum + p.matchScore, 0) /
              topPrograms.length
          )
        : 0

    // 맞춤 추천 메시지 생성
    const recommendations = generateRecommendations(form, topPrograms)

    // 다음 단계 생성
    const nextSteps = generateNextSteps(form, topPrograms)

    // 응답 데이터
    const result = {
      score: overallScore,
      recommendations,
      suitablePrograms: topPrograms.map((p) => ({
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
        daysLeft: p.daysLeft,
        tags: p.tags,
        matchScore: p.matchScore,
      })),
      nextSteps,
      totalPrograms: data.programs.filter((p) => p.status !== "closed").length,
      dataSource: `${data.lastUpdated} 기준 정부 지원사업 데이터`,
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

// ============================================
// 맞춤 추천 메시지 생성
// ============================================
function generateRecommendations(
  form: DiagnosisForm,
  topPrograms: (GovernmentProgram & { matchScore: number })[]
): string[] {
  const recommendations: string[] = []

  // 기업 유형별 메시지
  const businessTypeMessages: Record<string, string> = {
    startup: "스타트업 대상 지원사업",
    sme: "중소기업 대상 지원사업",
    midsize: "중견기업 대상 지원사업",
    social: "사회적기업 대상 지원사업",
  }

  if (businessTypeMessages[form.businessType]) {
    recommendations.push(
      `${businessTypeMessages[form.businessType]} ${topPrograms.length}건이 귀사에 적합합니다.`
    )
  }

  // 도전 과제별 메시지
  if (form.challenges.includes("funding")) {
    const fundingPrograms = topPrograms.filter(
      (p) =>
        p.category.includes("창업") ||
        p.category.includes("R&D") ||
        p.supportType.includes("자금")
    )
    if (fundingPrograms.length > 0) {
      recommendations.push(
        `자금조달이 필요하시다면 ${fundingPrograms
          .slice(0, 2)
          .map((p) => p.title.split(" ").slice(0, 3).join(" "))
          .join(", ")} 등을 검토해보세요.`
      )
    }
  }

  if (form.challenges.includes("technology")) {
    recommendations.push(
      "기술개발을 위한 R&D 지원사업 신청을 권장합니다."
    )
  }

  if (form.challenges.includes("export")) {
    recommendations.push(
      "해외 진출을 위한 수출 지원사업을 확인해보세요."
    )
  }

  if (form.challenges.includes("talent")) {
    recommendations.push(
      "인재 확보를 위한 고용 장려금 지원사업이 도움이 될 수 있습니다."
    )
  }

  // 마감 임박 알림
  const closingPrograms = topPrograms.filter((p) => p.status === "closing")
  if (closingPrograms.length > 0) {
    recommendations.push(
      `⚠️ ${closingPrograms.length}건의 지원사업이 마감 임박입니다. 서둘러 신청하세요!`
    )
  }

  return recommendations.slice(0, 5)
}

// ============================================
// 다음 단계 생성
// ============================================
function generateNextSteps(
  form: DiagnosisForm,
  topPrograms: (GovernmentProgram & { matchScore: number })[]
): string[] {
  const steps = [
    "추천 지원사업 상세 정보 및 자격요건 확인",
    "필요 서류 목록 확인 및 사전 준비",
  ]

  if (topPrograms.some((p) => p.status === "closing")) {
    steps.push("마감 임박 사업 우선 신청")
  }

  if (form.currentSupport.includes("none")) {
    steps.push("전문가 상담을 통한 최적 지원사업 선정")
  }

  steps.push("온라인 신청서 작성 및 제출")
  steps.push("신청 후 진행상황 모니터링")

  return steps.slice(0, 5)
}
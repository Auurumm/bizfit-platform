import { NextRequest, NextResponse } from "next/server"
import { fetchBizinfoPrograms, filterPrograms, GovernmentProgram } from "@/lib/bizinfo-api"

// ============================================
// GET: 지원사업 목록 또는 상세 조회
// ============================================
// /api/programs                    → 전체 목록 (마감 임박순)
// /api/programs?id=xxx             → 특정 사업 상세
// /api/programs?search=창업        → 검색
// /api/programs?category=창업지원  → 카테고리 필터
// /api/programs?status=active      → 상태 필터
// /api/programs?showClosed=true    → 마감된 공고 포함
// /api/programs?refresh=true       → 캐시 무시하고 새로고침
// ============================================

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    
    // 파라미터 추출
    const id = searchParams.get("id")
    const search = searchParams.get("search")
    const category = searchParams.get("category")
    const status = searchParams.get("status")
    const showClosed = searchParams.get("showClosed") === "true"
    const forceRefresh = searchParams.get("refresh") === "true"
    const count = searchParams.get("count")

    // 기업마당 API에서 데이터 로드 (캐싱 적용)
    const data = await fetchBizinfoPrograms({
      searchCnt: count ? parseInt(count) : 100,
      forceRefresh,
    })

    // 특정 ID 조회 (상세 페이지용)
    if (id) {
      const program = data.programs.find((p) => p.id === id)

      if (!program) {
        return NextResponse.json(
          { success: false, error: "지원사업을 찾을 수 없습니다" },
          { status: 404 }
        )
      }

      return NextResponse.json({
        success: true,
        program: formatProgramForResponse(program),
        dataSource: data.dataSource,
      })
    }

    // 필터링 적용
    const filteredPrograms = filterPrograms(data.programs, {
      category: category || undefined,
      status: status || undefined,
      search: search || undefined,
      showClosed,
    })

    // 응답 포맷 변환
    const programs = filteredPrograms.map(formatProgramForResponse)

    return NextResponse.json({
      success: true,
      programs,
      totalCount: programs.length,
      totalAvailable: data.totalCount,
      lastUpdated: data.lastUpdated,
      dataSource: data.dataSource,
      filters: {
        category,
        status,
        search,
        showClosed,
      },
    })
  } catch (error) {
    console.error("❌ 지원사업 조회 오류:", error)
    return NextResponse.json(
      { success: false, error: "지원사업 조회 중 오류가 발생했습니다" },
      { status: 500 }
    )
  }
}

// ============================================
// 응답 포맷 변환
// ============================================
function formatProgramForResponse(program: GovernmentProgram) {
  return {
    id: program.id,
    title: program.title,
    name: program.title,  // 호환성
    organization: program.organization,
    ministry: program.ministry,
    category: program.category,
    budget: program.budget,
    deadline: program.deadline,
    daysLeft: program.daysLeft,
    registrationDate: program.registrationDate,
    description: program.description,
    requirements: program.requirements,
    applicationUrl: program.applicationUrl,
    contactInfo: program.contactInfo,
    status: program.status,
    tags: program.tags,
    region: program.region,
    targetCompany: program.targetCompany,
    supportType: program.supportType,
  }
}
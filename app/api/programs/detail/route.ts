// app/api/programs/detail/route.ts

import { NextRequest, NextResponse } from 'next/server'
import { getProgramById } from '@/lib/xml-parser'

export const dynamic = 'force-dynamic'

/**
 * GET /api/programs/detail?id={programId}
 * 특정 지원사업 상세 정보 조회
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json(
        { success: false, error: '프로그램 ID가 필요합니다' },
        { status: 400 }
      )
    }

    const program = await getProgramById(id)

    if (!program) {
      return NextResponse.json(
        { success: false, error: '프로그램을 찾을 수 없습니다' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: program,
    })
  } catch (error) {
    console.error('❌ 프로그램 상세 조회 실패:', error)
    
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : '알 수 없는 오류',
      },
      { status: 500 }
    )
  }
}
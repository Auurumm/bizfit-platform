/**
 * 전문가 API 라우트
 * GET /api/experts - 전문가 목록 조회
 * GET /api/experts?id=xxx - 전문가 상세 조회
 * GET /api/experts?specialty=xxx - 전문분야별 조회
 * GET /api/experts?industry=xxx - 산업별 조회
 * GET /api/experts?search=xxx - 검색
 */

import { NextRequest, NextResponse } from "next/server";
import {
  loadExpertsFromXml,
  getExpertById,
  getExpertsBySpecialty,
  getExpertsByIndustry,
  searchExperts,
  getExpertsStats,
} from "@/lib/experts-xml";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const specialty = searchParams.get("specialty");
    const industry = searchParams.get("industry");
    const search = searchParams.get("search");
    const stats = searchParams.get("stats");

    // 통계 조회
    if (stats === "true") {
      const statsData = await getExpertsStats();
      return NextResponse.json({
        success: true,
        data: statsData,
      });
    }

    // ID로 단일 전문가 조회
    if (id) {
      const expert = await getExpertById(id);
      if (!expert) {
        return NextResponse.json(
          { success: false, error: "전문가를 찾을 수 없습니다." },
          { status: 404 }
        );
      }
      return NextResponse.json({
        success: true,
        data: expert,
      });
    }

    // 전문분야별 조회
    if (specialty) {
      const experts = await getExpertsBySpecialty(specialty);
      return NextResponse.json({
        success: true,
        data: experts,
        count: experts.length,
      });
    }

    // 산업별 조회
    if (industry) {
      const experts = await getExpertsByIndustry(industry);
      return NextResponse.json({
        success: true,
        data: experts,
        count: experts.length,
      });
    }

    // 검색
    if (search) {
      const experts = await searchExperts(search);
      return NextResponse.json({
        success: true,
        data: experts,
        count: experts.length,
        query: search,
      });
    }

    // 전체 목록 조회
    const { experts, metadata } = await loadExpertsFromXml();
    return NextResponse.json({
      success: true,
      data: experts,
      metadata,
      count: experts.length,
    });
  } catch (error) {
    console.error("전문가 API 오류:", error);
    return NextResponse.json(
      { success: false, error: "서버 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
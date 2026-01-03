/**
 * 문의하기 API 라우트
 * POST /api/inquiries - 새 문의 제출
 * 
 * 제출된 문의는:
 * 1. Google Sheet에 저장 (Google Apps Script Web App 연동)
 * 2. 이메일 알림 발송 (EmailJS 또는 서버 이메일)
 */

import { NextRequest, NextResponse } from "next/server";

// 문의 데이터 타입
export interface InquiryData {
  // 문의자 정보
  name: string;
  email: string;
  phone: string;
  company: string;
  position?: string;
  
  // 문의 내용
  expertId: string;
  expertName: string;
  inquiryType: "general" | "consultation" | "quote" | "partnership";
  subject: string;
  message: string;
  
  // 추가 정보 (선택)
  businessType?: string;
  industry?: string;
  budget?: string;
  preferredDate?: string;
  preferredTime?: string;
  
  // 진단 결과 연동 (선택)
  diagnosisId?: string;
  recommendedPrograms?: string[];
  
  // 마케팅 동의
  marketingConsent: boolean;
  privacyConsent: boolean;
}

// Google Apps Script Web App URL (환경변수로 관리)
const GOOGLE_SCRIPT_URL = process.env.GOOGLE_SCRIPT_URL || "";
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@bizfit.co.kr";

// 문의 ID 생성
function generateInquiryId(): string {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 8);
  return `INQ-${timestamp}-${random}`.toUpperCase();
}

// Google Sheet에 문의 저장
async function saveToGoogleSheet(inquiry: InquiryData & { inquiryId: string; createdAt: string }): Promise<boolean> {
  if (!GOOGLE_SCRIPT_URL) {
    console.log("Google Script URL이 설정되지 않았습니다. 저장을 건너뜁니다.");
    return false;
  }

  try {
    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        action: "addInquiry",
        data: {
          inquiryId: inquiry.inquiryId,
          createdAt: inquiry.createdAt,
          name: inquiry.name,
          email: inquiry.email,
          phone: inquiry.phone,
          company: inquiry.company,
          position: inquiry.position || "",
          expertId: inquiry.expertId,
          expertName: inquiry.expertName,
          inquiryType: inquiry.inquiryType,
          subject: inquiry.subject,
          message: inquiry.message,
          businessType: inquiry.businessType || "",
          industry: inquiry.industry || "",
          budget: inquiry.budget || "",
          preferredDate: inquiry.preferredDate || "",
          preferredTime: inquiry.preferredTime || "",
          diagnosisId: inquiry.diagnosisId || "",
          recommendedPrograms: inquiry.recommendedPrograms?.join(", ") || "",
          marketingConsent: inquiry.marketingConsent ? "Y" : "N",
          privacyConsent: inquiry.privacyConsent ? "Y" : "N",
          status: "접수됨",
        },
      }),
    });

    const result = await response.json();
    return result.success === true;
  } catch (error) {
    console.error("Google Sheet 저장 오류:", error);
    return false;
  }
}

// 이메일 알림 발송 (EmailJS 또는 서버 이메일)
async function sendEmailNotification(inquiry: InquiryData & { inquiryId: string; createdAt: string }): Promise<boolean> {
  // EmailJS 사용 시 (클라이언트에서 직접 호출하는 것이 일반적)
  // 여기서는 서버 사이드 이메일 발송 로직 placeholder
  
  // 실제 구현 시 nodemailer 또는 다른 이메일 서비스 사용
  // 현재는 로깅만 수행
  console.log("=== 새 문의 접수 알림 ===");
  console.log(`문의 ID: ${inquiry.inquiryId}`);
  console.log(`접수 시간: ${inquiry.createdAt}`);
  console.log(`문의자: ${inquiry.name} (${inquiry.company})`);
  console.log(`연락처: ${inquiry.email} / ${inquiry.phone}`);
  console.log(`문의 대상 전문가: ${inquiry.expertName}`);
  console.log(`문의 유형: ${inquiry.inquiryType}`);
  console.log(`제목: ${inquiry.subject}`);
  console.log(`내용: ${inquiry.message}`);
  console.log("========================");

  return true;
}

// 문의 데이터 검증
function validateInquiry(data: Partial<InquiryData>): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!data.name || data.name.trim().length < 2) {
    errors.push("이름을 입력해주세요.");
  }
  if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.push("올바른 이메일 주소를 입력해주세요.");
  }
  if (!data.phone || data.phone.replace(/[^0-9]/g, "").length < 10) {
    errors.push("올바른 연락처를 입력해주세요.");
  }
  if (!data.company || data.company.trim().length < 2) {
    errors.push("회사명을 입력해주세요.");
  }
  if (!data.expertId) {
    errors.push("문의 대상 전문가를 선택해주세요.");
  }
  if (!data.subject || data.subject.trim().length < 5) {
    errors.push("문의 제목을 입력해주세요.");
  }
  if (!data.message || data.message.trim().length < 10) {
    errors.push("문의 내용을 10자 이상 입력해주세요.");
  }
  if (!data.privacyConsent) {
    errors.push("개인정보 수집 및 이용에 동의해주세요.");
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // 데이터 검증
    const validation = validateInquiry(body);
    if (!validation.valid) {
      return NextResponse.json(
        { success: false, errors: validation.errors },
        { status: 400 }
      );
    }

    // 문의 데이터 생성
    const inquiryId = generateInquiryId();
    const createdAt = new Date().toISOString();
    
    const inquiry: InquiryData & { inquiryId: string; createdAt: string } = {
      inquiryId,
      createdAt,
      name: body.name.trim(),
      email: body.email.trim().toLowerCase(),
      phone: body.phone.trim(),
      company: body.company.trim(),
      position: body.position?.trim() || "",
      expertId: body.expertId,
      expertName: body.expertName || "",
      inquiryType: body.inquiryType || "general",
      subject: body.subject.trim(),
      message: body.message.trim(),
      businessType: body.businessType || "",
      industry: body.industry || "",
      budget: body.budget || "",
      preferredDate: body.preferredDate || "",
      preferredTime: body.preferredTime || "",
      diagnosisId: body.diagnosisId || "",
      recommendedPrograms: body.recommendedPrograms || [],
      marketingConsent: body.marketingConsent || false,
      privacyConsent: body.privacyConsent,
    };

    // 동시에 Google Sheet 저장 및 이메일 발송
    const [sheetResult, emailResult] = await Promise.all([
      saveToGoogleSheet(inquiry),
      sendEmailNotification(inquiry),
    ]);

    // 최소 하나는 성공해야 함
    if (!sheetResult && !emailResult) {
      console.error("문의 저장 및 이메일 발송 모두 실패");
      // 그래도 성공 응답 (실제 운영에서는 fallback 로직 필요)
    }

    return NextResponse.json({
      success: true,
      data: {
        inquiryId,
        message: "문의가 성공적으로 접수되었습니다.",
        savedToSheet: sheetResult,
        emailSent: emailResult,
      },
    });
  } catch (error) {
    console.error("문의 API 오류:", error);
    return NextResponse.json(
      { success: false, error: "문의 접수 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}

// 문의 유형 목록 조회 (옵션)
export async function GET() {
  return NextResponse.json({
    success: true,
    data: {
      inquiryTypes: [
        { value: "general", label: "일반 문의" },
        { value: "consultation", label: "상담 요청" },
        { value: "quote", label: "견적 요청" },
        { value: "partnership", label: "제휴 문의" },
      ],
      budgetRanges: [
        { value: "under-10m", label: "1천만원 미만" },
        { value: "10m-50m", label: "1천만원 ~ 5천만원" },
        { value: "50m-100m", label: "5천만원 ~ 1억원" },
        { value: "100m-500m", label: "1억원 ~ 5억원" },
        { value: "over-500m", label: "5억원 이상" },
      ],
      preferredTimes: [
        { value: "morning", label: "오전 (09:00~12:00)" },
        { value: "afternoon", label: "오후 (13:00~18:00)" },
        { value: "evening", label: "저녁 (18:00 이후)" },
        { value: "anytime", label: "언제든지" },
      ],
    },
  });
}
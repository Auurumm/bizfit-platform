"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

// 전문가 타입
interface Expert {
  id: string;
  name: string;
  title: string;
  organization: string;
  profileImage: string;
  introduction: string;
  experience: number;
  successRate: number;
  consultingCount: number;
  specialties: string[];
  certifications: string[];
  industries: string[];
  contact: {
    email: string;
    phone: string;
  };
  availableTime: string;
  consultingFee: string;
  rating: number;
  reviewCount: number;
}

// 문의 폼 타입
interface InquiryForm {
  name: string;
  email: string;
  phone: string;
  company: string;
  position: string;
  inquiryType: string;
  subject: string;
  message: string;
  preferredTime: string;
  privacyConsent: boolean;
  marketingConsent: boolean;
}

// 문의 유형 옵션
const inquiryTypes = [
  { value: "general", label: "일반 문의" },
  { value: "consultation", label: "상담 요청" },
  { value: "quote", label: "견적 요청" },
  { value: "partnership", label: "제휴 문의" },
];

// 선호 시간 옵션
const preferredTimes = [
  { value: "morning", label: "오전 (09:00~12:00)" },
  { value: "afternoon", label: "오후 (13:00~18:00)" },
  { value: "evening", label: "저녁 (18:00 이후)" },
  { value: "anytime", label: "언제든지" },
];

export default function ExpertDetailPage() {
  const params = useParams();
  const expertId = params.id as string;

  const [expert, setExpert] = useState<Expert | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 문의 폼 상태
  const [showInquiryForm, setShowInquiryForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const [form, setForm] = useState<InquiryForm>({
    name: "",
    email: "",
    phone: "",
    company: "",
    position: "",
    inquiryType: "consultation",
    subject: "",
    message: "",
    preferredTime: "anytime",
    privacyConsent: false,
    marketingConsent: false,
  });

  // 전문가 정보 로드
  useEffect(() => {
    async function loadExpert() {
      try {
        const response = await fetch(`/api/experts?id=${expertId}`);
        const result = await response.json();
        if (result.success) {
          setExpert(result.data);
        } else {
          setError("전문가 정보를 찾을 수 없습니다.");
        }
      } catch {
        setError("서버 연결 오류가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    }
    if (expertId) loadExpert();
  }, [expertId]);

  // 폼 입력 핸들러
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  // 전화번호 포맷팅
  const formatPhoneNumber = (value: string) => {
    const numbers = value.replace(/[^0-9]/g, "");
    if (numbers.length <= 3) return numbers;
    if (numbers.length <= 7) return `${numbers.slice(0, 3)}-${numbers.slice(3)}`;
    return `${numbers.slice(0, 3)}-${numbers.slice(3, 7)}-${numbers.slice(7, 11)}`;
  };

  // 문의 제출
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          expertId: expert?.id,
          expertName: expert?.name,
        }),
      });
      const result = await response.json();
      if (result.success) {
        setSubmitSuccess(true);
        setShowInquiryForm(false);
      } else {
        setSubmitError(result.errors?.join(", ") || "문의 접수에 실패했습니다.");
      }
    } catch {
      setSubmitError("서버 연결 오류가 발생했습니다.");
    } finally {
      setSubmitting(false);
    }
  };

  // 별점 렌더링
  const renderStars = (rating: number) => (
    <div className="flex items-center gap-0.5">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          className={`w-5 h-5 ${i < Math.floor(rating) ? "text-yellow-400 fill-current" : "text-gray-300"}`}
          viewBox="0 0 20 20"
        >
          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
        </svg>
      ))}
      <span className="ml-2 text-lg font-semibold text-gray-900">{rating.toFixed(1)}</span>
      <span className="text-sm text-gray-500 ml-1">({expert?.reviewCount}개 리뷰)</span>
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">전문가 정보를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  if (error || !expert) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <p className="text-gray-600">{error || "전문가를 찾을 수 없습니다."}</p>
          <Link href="/experts" className="mt-4 inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            전문가 목록으로
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 헤더 */}
      <header className="bg-white shadow-sm">
        <div className="max-w-5xl mx-auto px-4 py-4">
          <Link href="/experts" className="inline-flex items-center text-gray-600 hover:text-gray-900">
            <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            전문가 목록
          </Link>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8">
        {/* 성공 메시지 */}
        {submitSuccess && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-green-800">문의가 접수되었습니다!</h3>
                <p className="text-sm text-green-700">{expert.name} 전문가가 빠른 시일 내에 연락드릴 예정입니다.</p>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 메인 콘텐츠 */}
          <div className="lg:col-span-2 space-y-6">
            {/* 프로필 카드 */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-start gap-6">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center text-4xl flex-shrink-0">
                  {expert.name.charAt(0)}
                </div>
                <div className="flex-1">
                  <h1 className="text-2xl font-bold text-gray-900">{expert.name}</h1>
                  <p className="text-lg text-gray-600">{expert.title}</p>
                  <p className="text-gray-500">{expert.organization}</p>
                  <div className="mt-3">{renderStars(expert.rating)}</div>
                </div>
              </div>
              <div className="mt-6 grid grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="text-center">
                  <p className="text-2xl font-bold text-gray-900">{expert.experience}년</p>
                  <p className="text-sm text-gray-500">경력</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-blue-600">{expert.successRate}%</p>
                  <p className="text-sm text-gray-500">성공률</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-gray-900">{expert.consultingCount}건</p>
                  <p className="text-sm text-gray-500">상담 이력</p>
                </div>
              </div>
            </div>

            {/* 소개 */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">전문가 소개</h2>
              <p className="text-gray-700 leading-relaxed">{expert.introduction}</p>
            </div>

            {/* 전문분야 */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">전문분야</h2>
              <div className="flex flex-wrap gap-2">
                {expert.specialties.map((specialty, idx) => (
                  <span key={idx} className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-full text-sm">{specialty}</span>
                ))}
              </div>
            </div>

            {/* 자격증 */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">보유 자격</h2>
              <ul className="space-y-2">
                {expert.certifications.map((cert, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-gray-700">
                    <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {cert}
                  </li>
                ))}
              </ul>
            </div>

            {/* 산업분야 */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">담당 산업</h2>
              <div className="flex flex-wrap gap-2">
                {expert.industries.map((industry, idx) => (
                  <span key={idx} className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-full text-sm">{industry}</span>
                ))}
              </div>
            </div>
          </div>

          {/* 사이드바 */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-4">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">상담 안내</h2>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500">상담 가능 시간</p>
                  <p className="font-medium text-gray-900">{expert.availableTime}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">상담 비용</p>
                  <p className="font-medium text-gray-900">{expert.consultingFee}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">연락처</p>
                  <p className="font-medium text-gray-900">{expert.contact.phone}</p>
                </div>
              </div>
              <button
                onClick={() => setShowInquiryForm(true)}
                className="w-full mt-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
              >
                문의하기
              </button>
              <p className="mt-3 text-xs text-gray-500 text-center">문의 접수 후 1~2 영업일 내 연락드립니다.</p>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6">
              <h3 className="font-semibold text-gray-900 mb-2">더 많은 전문가가 필요하신가요?</h3>
              <p className="text-sm text-gray-600 mb-4">AI 진단을 통해 기업에 맞는 전문가를 추천받으세요.</p>
              <Link href="/diagnosis" className="inline-block w-full text-center py-2 bg-white text-blue-600 font-medium rounded-lg hover:bg-blue-50">
                AI 진단받기
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* 문의하기 모달 */}
      {showInquiryForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-gray-900">문의하기</h2>
                <p className="text-sm text-gray-500">{expert.name} 전문가에게 문의</p>
              </div>
              <button onClick={() => setShowInquiryForm(false)} className="p-2 hover:bg-gray-100 rounded-full">
                <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {submitError && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">{submitError}</div>
              )}

              {/* 문의자 정보 */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-4">문의자 정보</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">이름 <span className="text-red-500">*</span></label>
                    <input type="text" name="name" value={form.name} onChange={handleInputChange} required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="홍길동" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">이메일 <span className="text-red-500">*</span></label>
                    <input type="email" name="email" value={form.email} onChange={handleInputChange} required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="email@company.com" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">연락처 <span className="text-red-500">*</span></label>
                    <input type="tel" name="phone" value={form.phone}
                      onChange={(e) => setForm((prev) => ({ ...prev, phone: formatPhoneNumber(e.target.value) }))} required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="010-0000-0000" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">회사명 <span className="text-red-500">*</span></label>
                    <input type="text" name="company" value={form.company} onChange={handleInputChange} required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="(주)회사명" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">직책</label>
                    <input type="text" name="position" value={form.position} onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="대표이사" />
                  </div>
                </div>
              </div>

              {/* 문의 내용 */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-4">문의 내용</h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">문의 유형 <span className="text-red-500">*</span></label>
                      <select name="inquiryType" value={form.inquiryType} onChange={handleInputChange} required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                        {inquiryTypes.map((type) => (<option key={type.value} value={type.value}>{type.label}</option>))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">선호 연락 시간</label>
                      <select name="preferredTime" value={form.preferredTime} onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                        {preferredTimes.map((time) => (<option key={time.value} value={time.value}>{time.label}</option>))}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">문의 제목 <span className="text-red-500">*</span></label>
                    <input type="text" name="subject" value={form.subject} onChange={handleInputChange} required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="정부지원사업 신청 관련 상담 요청" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">문의 내용 <span className="text-red-500">*</span></label>
                    <textarea name="message" value={form.message} onChange={handleInputChange} required rows={5}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none" placeholder="문의하실 내용을 자세히 작성해주세요." />
                  </div>
                </div>
              </div>

              {/* 동의 사항 */}
              <div className="space-y-3 pt-4 border-t border-gray-200">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input type="checkbox" name="privacyConsent" checked={form.privacyConsent} onChange={handleInputChange} required
                    className="w-5 h-5 mt-0.5 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                  <span className="text-sm text-gray-700">
                    <span className="text-red-500">[필수]</span> 개인정보 수집 및 이용에 동의합니다.
                  </span>
                </label>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input type="checkbox" name="marketingConsent" checked={form.marketingConsent} onChange={handleInputChange}
                    className="w-5 h-5 mt-0.5 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                  <span className="text-sm text-gray-700">[선택] 마케팅 정보 수신에 동의합니다.</span>
                </label>
              </div>

              {/* 제출 버튼 */}
              <div className="flex gap-3">
                <button type="button" onClick={() => setShowInquiryForm(false)}
                  className="flex-1 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50">
                  취소
                </button>
                <button type="submit" disabled={submitting}
                  className="flex-1 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed">
                  {submitting ? "제출 중..." : "문의 제출"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
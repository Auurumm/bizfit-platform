"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

// 문의 데이터 타입 (Google Sheet에서 조회)
interface Inquiry {
  inquiryId: string;
  createdAt: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  position: string;
  expertId: string;
  expertName: string;
  inquiryType: string;
  subject: string;
  message: string;
  status: "접수됨" | "진행중" | "완료" | "취소";
}

// 전문가 데이터 타입
interface Expert {
  id: string;
  name: string;
  title: string;
  organization: string;
  specialties: string[];
  consultingCount: number;
  rating: number;
}

// 탭 옵션
type TabType = "inquiries" | "experts";

// 문의 유형 라벨
const inquiryTypeLabels: Record<string, string> = {
  general: "일반 문의",
  consultation: "상담 요청",
  quote: "견적 요청",
  partnership: "제휴 문의",
};

// 상태 스타일
const statusStyles: Record<string, string> = {
  접수됨: "bg-yellow-100 text-yellow-800",
  진행중: "bg-blue-100 text-blue-800",
  완료: "bg-green-100 text-green-800",
  취소: "bg-gray-100 text-gray-800",
};

// 샘플 문의 데이터 (실제로는 API에서 조회)
const sampleInquiries: Inquiry[] = [
  {
    inquiryId: "INQ-M4K2X-ABC123",
    createdAt: "2025-12-28T10:30:00Z",
    name: "김창업",
    email: "kim@startup.com",
    phone: "010-1234-5678",
    company: "(주)스타트업",
    position: "대표이사",
    expertId: "expert-001",
    expertName: "김정훈",
    inquiryType: "consultation",
    subject: "R&D 지원사업 신청 관련 상담 요청",
    message: "안녕하세요. 저희 회사는 AI 기반 솔루션을 개발하는 스타트업입니다. R&D 지원사업 신청에 대해 상담받고 싶습니다.",
    status: "접수됨",
  },
  {
    inquiryId: "INQ-K3J5Y-DEF456",
    createdAt: "2025-12-27T14:15:00Z",
    name: "이제조",
    email: "lee@manufacturing.co.kr",
    phone: "010-9876-5432",
    company: "제조테크",
    position: "경영지원팀장",
    expertId: "expert-003",
    expertName: "박민수",
    inquiryType: "quote",
    subject: "스마트공장 구축 컨설팅 견적 요청",
    message: "스마트공장 도입을 검토 중입니다. 정부지원사업을 활용한 구축 컨설팅 견적을 부탁드립니다.",
    status: "진행중",
  },
  {
    inquiryId: "INQ-P9Q1Z-GHI789",
    createdAt: "2025-12-26T09:00:00Z",
    name: "박수출",
    email: "park@export.com",
    phone: "010-5555-6666",
    company: "(주)글로벌트레이드",
    position: "해외영업팀장",
    expertId: "expert-004",
    expertName: "최유나",
    inquiryType: "general",
    subject: "수출바우처 사업 관련 문의",
    message: "수출바우처 신청 자격과 절차에 대해 문의드립니다.",
    status: "완료",
  },
];

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<TabType>("inquiries");
  const [inquiries, setInquiries] = useState<Inquiry[]>(sampleInquiries);
  const [experts, setExperts] = useState<Expert[]>([]);
  const [loading, setLoading] = useState(false);
  
  // 필터 상태
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState("");
  
  // 선택된 문의 상세
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);

  // 전문가 목록 로드
  useEffect(() => {
    async function loadExperts() {
      try {
        const response = await fetch("/api/experts");
        const result = await response.json();
        if (result.success) {
          setExperts(result.data);
        }
      } catch (err) {
        console.error("전문가 로드 오류:", err);
      }
    }
    loadExperts();
  }, []);

  // 날짜 포맷
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // 필터된 문의 목록
  const filteredInquiries = inquiries.filter((inquiry) => {
    if (statusFilter && inquiry.status !== statusFilter) return false;
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        inquiry.name.toLowerCase().includes(query) ||
        inquiry.company.toLowerCase().includes(query) ||
        inquiry.subject.toLowerCase().includes(query) ||
        inquiry.expertName.toLowerCase().includes(query) ||
        inquiry.inquiryId.toLowerCase().includes(query)
      );
    }
    return true;
  });

  // 상태 변경
  const handleStatusChange = (inquiryId: string, newStatus: Inquiry["status"]) => {
    setInquiries((prev) =>
      prev.map((inq) =>
        inq.inquiryId === inquiryId ? { ...inq, status: newStatus } : inq
      )
    );
    if (selectedInquiry?.inquiryId === inquiryId) {
      setSelectedInquiry((prev) => prev ? { ...prev, status: newStatus } : null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* 헤더 */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">관리자 페이지</h1>
              <p className="text-sm text-gray-500">문의 관리 및 전문가 관리</p>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/" className="text-gray-600 hover:text-gray-900 text-sm">
                홈으로
              </Link>
              <Link href="/experts" className="text-gray-600 hover:text-gray-900 text-sm">
                전문가 찾기
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6">
        {/* 탭 네비게이션 */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setActiveTab("inquiries")}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeTab === "inquiries"
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-600 hover:bg-gray-50"
            }`}
          >
            문의 관리
            <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-blue-500/20">
              {inquiries.filter((i) => i.status === "접수됨").length}
            </span>
          </button>
          <button
            onClick={() => setActiveTab("experts")}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeTab === "experts"
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-600 hover:bg-gray-50"
            }`}
          >
            전문가 관리
          </button>
        </div>

        {/* 문의 관리 탭 */}
        {activeTab === "inquiries" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* 문의 목록 */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-sm">
                {/* 필터 */}
                <div className="p-4 border-b border-gray-200">
                  <div className="flex gap-4">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="이름, 회사, 제목 검색"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">전체 상태</option>
                      <option value="접수됨">접수됨</option>
                      <option value="진행중">진행중</option>
                      <option value="완료">완료</option>
                      <option value="취소">취소</option>
                    </select>
                  </div>
                </div>

                {/* 목록 */}
                <div className="divide-y divide-gray-200">
                  {filteredInquiries.length === 0 ? (
                    <div className="p-8 text-center text-gray-500">
                      문의 내역이 없습니다.
                    </div>
                  ) : (
                    filteredInquiries.map((inquiry) => (
                      <div
                        key={inquiry.inquiryId}
                        onClick={() => setSelectedInquiry(inquiry)}
                        className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors ${
                          selectedInquiry?.inquiryId === inquiry.inquiryId
                            ? "bg-blue-50"
                            : ""
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <span
                                className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                                  statusStyles[inquiry.status]
                                }`}
                              >
                                {inquiry.status}
                              </span>
                              <span className="text-xs text-gray-500">
                                {inquiryTypeLabels[inquiry.inquiryType]}
                              </span>
                            </div>
                            <h3 className="mt-1 font-medium text-gray-900 truncate">
                              {inquiry.subject}
                            </h3>
                            <p className="mt-1 text-sm text-gray-600">
                              {inquiry.name} ({inquiry.company})
                            </p>
                            <p className="mt-1 text-xs text-gray-500">
                              담당: {inquiry.expertName} · {formatDate(inquiry.createdAt)}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>

            {/* 문의 상세 */}
            <div className="lg:col-span-1">
              {selectedInquiry ? (
                <div className="bg-white rounded-xl shadow-sm p-6 sticky top-4">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold text-gray-900">문의 상세</h2>
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full ${
                        statusStyles[selectedInquiry.status]
                      }`}
                    >
                      {selectedInquiry.status}
                    </span>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <p className="text-xs text-gray-500">문의 ID</p>
                      <p className="font-mono text-sm">{selectedInquiry.inquiryId}</p>
                    </div>

                    <div>
                      <p className="text-xs text-gray-500">문의자</p>
                      <p className="font-medium">{selectedInquiry.name}</p>
                      <p className="text-sm text-gray-600">
                        {selectedInquiry.company} · {selectedInquiry.position}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-gray-500">연락처</p>
                      <p className="text-sm">{selectedInquiry.phone}</p>
                      <p className="text-sm text-blue-600">{selectedInquiry.email}</p>
                    </div>

                    <div>
                      <p className="text-xs text-gray-500">담당 전문가</p>
                      <p className="font-medium">{selectedInquiry.expertName}</p>
                    </div>

                    <div>
                      <p className="text-xs text-gray-500">문의 유형</p>
                      <p className="text-sm">
                        {inquiryTypeLabels[selectedInquiry.inquiryType]}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-gray-500">제목</p>
                      <p className="font-medium">{selectedInquiry.subject}</p>
                    </div>

                    <div>
                      <p className="text-xs text-gray-500">내용</p>
                      <p className="text-sm text-gray-700 whitespace-pre-wrap">
                        {selectedInquiry.message}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-gray-500">접수일시</p>
                      <p className="text-sm">{formatDate(selectedInquiry.createdAt)}</p>
                    </div>

                    {/* 상태 변경 */}
                    <div className="pt-4 border-t border-gray-200">
                      <p className="text-xs text-gray-500 mb-2">상태 변경</p>
                      <div className="flex gap-2">
                        {(["접수됨", "진행중", "완료", "취소"] as const).map((status) => (
                          <button
                            key={status}
                            onClick={() =>
                              handleStatusChange(selectedInquiry.inquiryId, status)
                            }
                            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                              selectedInquiry.status === status
                                ? statusStyles[status]
                                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                            }`}
                          >
                            {status}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-xl shadow-sm p-8 text-center">
                  <div className="text-gray-400 text-4xl mb-4">📋</div>
                  <p className="text-gray-500">문의를 선택하면 상세 내용이 표시됩니다.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* 전문가 관리 탭 */}
        {activeTab === "experts" && (
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      전문가
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      소속
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      전문분야
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      상담건수
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      평점
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      액션
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {experts.map((expert) => (
                    <tr key={expert.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-medium">
                            {expert.name.charAt(0)}
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{expert.name}</p>
                            <p className="text-sm text-gray-500">{expert.title}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {expert.organization}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-1">
                          {expert.specialties.slice(0, 2).map((s, i) => (
                            <span
                              key={i}
                              className="px-2 py-0.5 bg-blue-50 text-blue-700 text-xs rounded-full"
                            >
                              {s}
                            </span>
                          ))}
                          {expert.specialties.length > 2 && (
                            <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full">
                              +{expert.specialties.length - 2}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <span className="font-medium text-gray-900">
                          {expert.consultingCount}건
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <div className="flex items-center justify-center gap-1">
                          <svg
                            className="w-4 h-4 text-yellow-400 fill-current"
                            viewBox="0 0 20 20"
                          >
                            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                          </svg>
                          <span className="font-medium">{expert.rating.toFixed(1)}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <Link
                          href={`/experts/${expert.id}`}
                          className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                        >
                          상세보기
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 통계 요약 */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl shadow-sm p-4">
            <p className="text-sm text-gray-500">총 문의</p>
            <p className="text-2xl font-bold text-gray-900">{inquiries.length}건</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-4">
            <p className="text-sm text-gray-500">접수 대기</p>
            <p className="text-2xl font-bold text-yellow-600">
              {inquiries.filter((i) => i.status === "접수됨").length}건
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-4">
            <p className="text-sm text-gray-500">진행중</p>
            <p className="text-2xl font-bold text-blue-600">
              {inquiries.filter((i) => i.status === "진행중").length}건
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-4">
            <p className="text-sm text-gray-500">등록 전문가</p>
            <p className="text-2xl font-bold text-gray-900">{experts.length}명</p>
          </div>
        </div>
      </main>
    </div>
  );
}
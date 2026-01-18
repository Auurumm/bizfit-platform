"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Layout from "@/components/layout/Layout";

// Google Apps Script URL
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyjCdv9Cg3ooAz5E-DE27oOkVhPUCmA_mChScMc5zL_cY81M7EpiK082RSfCVbpn8Xm/exec";

// 타입 정의
interface Inquiry {
  rowIndex: number;
  inquiryId: string;
  createdAt: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  position: string;
  expertName: string;
  inquiryType: string;
  subject: string;
  message: string;
  status: "접수됨" | "진행중" | "완료" | "취소";
}

interface Expert {
  id: string;
  name: string;
  title: string;
  company: string;
  specialties: string[];
  location: string;
  experience: number;
  price: number;
  availability: string;
  email: string;
  category: string;
  description: string;
  rating: number;
  reviews: number;
  approved: string;
}

type TabType = "inquiries" | "experts";

const categoryLabels: Record<string, string> = {
  startup: "창업 컨설팅",
  finance: "재무/회계",
  marketing: "마케팅",
  tech: "기술/R&D",
  legal: "법무",
  hr: "인사/조직",
};

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<TabType>("inquiries");
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [experts, setExperts] = useState<Expert[]>([]);
  const [loading, setLoading] = useState(true);
  const [expertsLoading, setExpertsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // 필터
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState("");
  const [expertFilter, setExpertFilter] = useState<string>("all");
  const [expertSearch, setExpertSearch] = useState("");
  
  // 선택 상태
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
  const [selectedExpert, setSelectedExpert] = useState<Expert | null>(null);
  
  // 로딩 상태
  const [updatingStatus, setUpdatingStatus] = useState<string | null>(null);
  const [updatingApproval, setUpdatingApproval] = useState<string | null>(null);

  // 문의 로드
  const loadInquiries = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`${GOOGLE_SCRIPT_URL}?action=list`);
      const result = await response.json();
      if (result.success) {
        setInquiries(result.data);
      } else {
        setError(result.message || "문의 목록을 불러오는데 실패했습니다.");
      }
    } catch (err) {
      console.error("문의 로드 오류:", err);
      setError("서버와 연결할 수 없습니다.");
    } finally {
      setLoading(false);
    }
  }, []);

  // 전문가 로드
  const loadExperts = useCallback(async () => {
    try {
      setExpertsLoading(true);
      const response = await fetch(`${GOOGLE_SCRIPT_URL}?action=expertsAdmin`);
      const result = await response.json();
      if (result.success) {
        setExperts(result.data);
      }
    } catch (err) {
      console.error("전문가 로드 오류:", err);
    } finally {
      setExpertsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadInquiries();
    loadExperts();
  }, [loadInquiries, loadExperts]);

  // 날짜 포맷
  const formatDate = (dateStr: string) => {
    if (!dateStr) return "-";
    try {
      const date = new Date(dateStr);
      if (isNaN(date.getTime())) return dateStr;
      return date.toLocaleDateString("ko-KR", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return dateStr;
    }
  };

  // 필터링
  const filteredInquiries = inquiries.filter((inquiry) => {
    if (statusFilter && inquiry.status !== statusFilter) return false;
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        inquiry.name?.toLowerCase().includes(query) ||
        inquiry.company?.toLowerCase().includes(query) ||
        inquiry.subject?.toLowerCase().includes(query) ||
        inquiry.inquiryId?.toLowerCase().includes(query)
      );
    }
    return true;
  });

  const filteredExperts = experts.filter((expert) => {
    if (expertFilter === "pending" && expert.approved !== "") return false;
    if (expertFilter === "approved" && expert.approved !== "Y") return false;
    if (expertFilter === "rejected" && expert.approved !== "N") return false;
    if (expertSearch) {
      const query = expertSearch.toLowerCase();
      return (
        expert.name?.toLowerCase().includes(query) ||
        expert.email?.toLowerCase().includes(query) ||
        expert.title?.toLowerCase().includes(query)
      );
    }
    return true;
  });

  // 문의 상태 변경
  const handleStatusChange = async (inquiryId: string, newStatus: Inquiry["status"]) => {
    try {
      setUpdatingStatus(inquiryId);
      
      // no-cors 모드로 요청
      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "updateStatus", inquiryId, status: newStatus }),
      });
      
      // 로컬 상태 업데이트
      setInquiries((prev) =>
        prev.map((inq) => (inq.inquiryId === inquiryId ? { ...inq, status: newStatus } : inq))
      );
      if (selectedInquiry?.inquiryId === inquiryId) {
        setSelectedInquiry((prev) => (prev ? { ...prev, status: newStatus } : null));
      }
      
    } catch (err) {
      console.error("상태 변경 오류:", err);
      alert("상태 변경 중 오류가 발생했습니다.");
    } finally {
      setUpdatingStatus(null);
    }
  };

  // 전문가 승인 상태 변경
  const handleApprovalChange = async (expertId: string, approved: "Y" | "N") => {
    try {
      setUpdatingApproval(expertId);
      
      // no-cors 모드로 요청 (CORS 우회)
      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "updateExpertApproval", expertId, approved }),
      });
      
      // no-cors에서는 응답을 읽을 수 없으므로 성공으로 가정하고 로컬 상태 업데이트
      setExperts((prev) =>
        prev.map((exp) => (exp.id === expertId ? { ...exp, approved } : exp))
      );
      if (selectedExpert?.id === expertId) {
        setSelectedExpert((prev) => (prev ? { ...prev, approved } : null));
      }
      
      alert(approved === "Y" ? "전문가가 승인되었습니다! ✅" : "전문가가 거절되었습니다.");
      
    } catch (err) {
      console.error("승인 상태 변경 오류:", err);
      alert("승인 상태 변경 중 오류가 발생했습니다.");
    } finally {
      setUpdatingApproval(null);
    }
  };

  // 통계
  const pendingInquiries = inquiries.filter((i) => i.status === "접수됨").length;
  const pendingExperts = experts.filter((e) => !e.approved || e.approved === "").length;
  const approvedExperts = experts.filter((e) => e.approved === "Y").length;

  // 상태 뱃지 스타일
  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      접수됨: "bg-warning bg-opacity-10 text-warning",
      진행중: "bg-info bg-opacity-10 text-info",
      완료: "bg-success bg-opacity-10 text-success",
      취소: "bg-secondary bg-opacity-10 text-secondary",
    };
    return styles[status] || styles["접수됨"];
  };

  // 승인 뱃지 스타일
  const getApprovalBadge = (approved: string) => {
    if (approved === "Y") return { class: "bg-success bg-opacity-10 text-success", label: "승인됨" };
    if (approved === "N") return { class: "bg-danger bg-opacity-10 text-danger", label: "거절됨" };
    return { class: "bg-warning bg-opacity-10 text-warning", label: "대기중" };
  };

  return (
    <Layout>
      {/* 헤더 */}
      <section className="page-header position-relative overflow-hidden pt-160 pb-80" style={{ backgroundColor: '#152833' }}>
        <div className="container position-relative z-1">
          <div className="row align-items-center">
            <div className="col-lg-8">
              <span className="btn-text text-primary fw-semibold rounded-pill border border-primary px-3 py-2 d-inline-block mb-3">
                <i className="bi bi-shield-lock me-2"></i>
                관리자 전용
              </span>
              <h1 className="text-white ds-3 mb-3">관리자 대시보드</h1>
              <p className="text-white text-opacity-75 fs-5 mb-0">
                문의 관리 및 전문가 승인을 한 곳에서 처리하세요
              </p>
            </div>
            <div className="col-lg-4 text-lg-end mt-4 mt-lg-0">
              <button
                onClick={() => { loadInquiries(); loadExperts(); }}
                className="btn btn-outline-light me-2"
              >
                <i className="bi bi-arrow-clockwise me-2"></i>
                새로고침
              </button>
              <Link href="/" className="btn btn-primary">
                <i className="bi bi-house me-2"></i>
                홈으로
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 통계 카드 */}
      <section className="py-5 bg-white border-bottom">
        <div className="container">
          <div className="row g-4">
            <div className="col-6 col-md-3">
              <div className="card border-0 bg-primary bg-opacity-10 rounded-4 h-100">
                <div className="card-body p-4">
                  <div className="d-flex align-items-center justify-content-between">
                    <div>
                      <p className="text-muted small mb-1">총 문의</p>
                      <h3 className="mb-0 text-primary">{inquiries.length}</h3>
                    </div>
                    <div className="icon-shape icon-50 bg-primary bg-opacity-20 rounded-circle d-flex align-items-center justify-content-center">
                      <i className="bi bi-chat-dots text-primary fs-5"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-6 col-md-3">
              <div className="card border-0 bg-warning bg-opacity-10 rounded-4 h-100">
                <div className="card-body p-4">
                  <div className="d-flex align-items-center justify-content-between">
                    <div>
                      <p className="text-muted small mb-1">대기 문의</p>
                      <h3 className="mb-0 text-warning">{pendingInquiries}</h3>
                    </div>
                    <div className="icon-shape icon-50 bg-warning bg-opacity-20 rounded-circle d-flex align-items-center justify-content-center">
                      <i className="bi bi-hourglass-split text-warning fs-5"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-6 col-md-3">
              <div className="card border-0 bg-info bg-opacity-10 rounded-4 h-100">
                <div className="card-body p-4">
                  <div className="d-flex align-items-center justify-content-between">
                    <div>
                      <p className="text-muted small mb-1">승인 대기</p>
                      <h3 className="mb-0 text-info">{pendingExperts}</h3>
                    </div>
                    <div className="icon-shape icon-50 bg-info bg-opacity-20 rounded-circle d-flex align-items-center justify-content-center">
                      <i className="bi bi-person-badge text-info fs-5"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-6 col-md-3">
              <div className="card border-0 bg-success bg-opacity-10 rounded-4 h-100">
                <div className="card-body p-4">
                  <div className="d-flex align-items-center justify-content-between">
                    <div>
                      <p className="text-muted small mb-1">활성 전문가</p>
                      <h3 className="mb-0 text-success">{approvedExperts}</h3>
                    </div>
                    <div className="icon-shape icon-50 bg-success bg-opacity-20 rounded-circle d-flex align-items-center justify-content-center">
                      <i className="bi bi-person-check text-success fs-5"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 메인 콘텐츠 */}
      <section className="py-80 bg-secondary-2">
        <div className="container">
          {/* 에러 메시지 */}
          {error && (
            <div className="alert alert-danger mb-4">
              <div className="d-flex align-items-center justify-content-between">
                <div>
                  <i className="bi bi-exclamation-triangle me-2"></i>
                  {error}
                </div>
                <button onClick={loadInquiries} className="btn btn-sm btn-outline-danger">
                  다시 시도
                </button>
              </div>
            </div>
          )}

          {/* 탭 네비게이션 */}
          <div className="d-flex gap-3 mb-4">
            <button
              onClick={() => setActiveTab("inquiries")}
              className={`btn btn-lg px-4 ${activeTab === "inquiries" ? "btn-primary" : "btn-outline-secondary bg-white"}`}
            >
              <i className="bi bi-chat-left-text me-2"></i>
              문의 관리
              {pendingInquiries > 0 && (
                <span className="badge bg-warning text-dark ms-2">{pendingInquiries}</span>
              )}
            </button>
            <button
              onClick={() => setActiveTab("experts")}
              className={`btn btn-lg px-4 ${activeTab === "experts" ? "btn-primary" : "btn-outline-secondary bg-white"}`}
            >
              <i className="bi bi-people me-2"></i>
              전문가 관리
              {pendingExperts > 0 && (
                <span className="badge bg-warning text-dark ms-2">{pendingExperts}</span>
              )}
            </button>
          </div>

          {/* 문의 관리 탭 */}
          {activeTab === "inquiries" && (
            <div className="row g-4">
              {/* 문의 목록 */}
              <div className="col-lg-7">
                {/* 필터 */}
                <div className="card border-0 shadow-sm rounded-4 mb-4">
                  <div className="card-body p-4">
                    <div className="row g-3">
                      <div className="col-md-8">
                        <div className="position-relative">
                          <input
                            type="text"
                            className="form-control form-control-lg ps-5"
                            placeholder="이름, 회사, 제목으로 검색..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                          />
                          <i className="bi bi-search position-absolute top-50 start-0 translate-middle-y ms-3 text-muted"></i>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <select
                          className="form-select form-select-lg"
                          value={statusFilter}
                          onChange={(e) => setStatusFilter(e.target.value)}
                        >
                          <option value="">전체 상태</option>
                          <option value="접수됨">🟡 접수됨</option>
                          <option value="진행중">🔵 진행중</option>
                          <option value="완료">🟢 완료</option>
                          <option value="취소">⚪ 취소</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 목록 */}
                <div className="card border-0 shadow-sm rounded-4">
                  {loading ? (
                    <div className="card-body p-5 text-center">
                      <div className="spinner-border text-primary mb-3" role="status"></div>
                      <p className="text-muted mb-0">문의 목록을 불러오는 중...</p>
                    </div>
                  ) : filteredInquiries.length === 0 ? (
                    <div className="card-body p-5 text-center">
                      <i className="bi bi-inbox fs-1 text-muted d-block mb-3"></i>
                      <h5 className="text-muted">문의가 없습니다</h5>
                      <p className="text-muted small mb-0">
                        {searchQuery || statusFilter ? "검색 조건을 변경해보세요" : "아직 접수된 문의가 없습니다"}
                      </p>
                    </div>
                  ) : (
                    <div className="list-group list-group-flush">
                      {filteredInquiries.map((inquiry) => (
                        <div
                          key={inquiry.inquiryId}
                          onClick={() => setSelectedInquiry(inquiry)}
                          className={`list-group-item list-group-item-action p-4 border-0 border-bottom ${
                            selectedInquiry?.inquiryId === inquiry.inquiryId ? "bg-primary bg-opacity-10" : ""
                          }`}
                          style={{ cursor: "pointer" }}
                        >
                          <div className="d-flex justify-content-between align-items-start">
                            <div className="flex-grow-1">
                              <div className="d-flex align-items-center gap-2 mb-2">
                                <span className={`badge ${getStatusBadge(inquiry.status)}`}>
                                  {inquiry.status}
                                </span>
                                <small className="text-muted font-monospace">{inquiry.inquiryId}</small>
                              </div>
                              <h6 className="mb-1">{inquiry.subject || "(제목 없음)"}</h6>
                              <p className="text-muted small mb-1">
                                <i className="bi bi-person me-1"></i>
                                {inquiry.name}
                                {inquiry.company && ` · ${inquiry.company}`}
                              </p>
                              <p className="text-muted small mb-0">
                                {inquiry.expertName && (
                                  <>
                                    <i className="bi bi-briefcase me-1"></i>
                                    {inquiry.expertName} · 
                                  </>
                                )}
                                <i className="bi bi-clock ms-1 me-1"></i>
                                {formatDate(inquiry.createdAt)}
                              </p>
                            </div>
                            <i className="bi bi-chevron-right text-muted"></i>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* 문의 상세 */}
              <div className="col-lg-5">
                <div className="card border-0 shadow-sm rounded-4 sticky-top" style={{ top: "100px" }}>
                  {selectedInquiry ? (
                    <div className="card-body p-4">
                      <div className="d-flex justify-content-between align-items-center mb-4">
                        <h5 className="mb-0">
                          <i className="bi bi-file-text text-primary me-2"></i>
                          문의 상세
                        </h5>
                        <span className={`badge ${getStatusBadge(selectedInquiry.status)}`}>
                          {selectedInquiry.status}
                        </span>
                      </div>

                      <div className="mb-4 pb-4 border-bottom">
                        <small className="text-muted text-uppercase">문의 정보</small>
                        <p className="font-monospace small text-muted mb-2">{selectedInquiry.inquiryId}</p>
                        <h5 className="mb-0">{selectedInquiry.subject || "(제목 없음)"}</h5>
                      </div>

                      <div className="row g-3 mb-4 pb-4 border-bottom">
                        <div className="col-6">
                          <small className="text-muted d-block">문의자</small>
                          <strong>{selectedInquiry.name}</strong>
                        </div>
                        <div className="col-6">
                          <small className="text-muted d-block">회사</small>
                          <span>{selectedInquiry.company || "-"}</span>
                        </div>
                        <div className="col-6">
                          <small className="text-muted d-block">연락처</small>
                          <span>{selectedInquiry.phone || "-"}</span>
                        </div>
                        <div className="col-6">
                          <small className="text-muted d-block">이메일</small>
                          <a href={`mailto:${selectedInquiry.email}`} className="text-primary text-decoration-none">
                            {selectedInquiry.email || "-"}
                          </a>
                        </div>
                        <div className="col-12">
                          <small className="text-muted d-block">담당 전문가</small>
                          <span>{selectedInquiry.expertName || "-"}</span>
                        </div>
                      </div>

                      <div className="mb-4 pb-4 border-bottom">
                        <small className="text-muted d-block mb-2">문의 내용</small>
                        <p className="mb-0 text-secondary" style={{ whiteSpace: "pre-wrap" }}>
                          {selectedInquiry.message || "-"}
                        </p>
                      </div>

                      <div className="mb-3">
                        <small className="text-muted d-block mb-2">접수일시</small>
                        <span>{formatDate(selectedInquiry.createdAt)}</span>
                      </div>

                      <hr className="my-4" />

                      <div>
                        <small className="text-muted d-block mb-3">상태 변경</small>
                        <div className="d-flex flex-wrap gap-2">
                          {(["접수됨", "진행중", "완료", "취소"] as const).map((status) => (
                            <button
                              key={status}
                              onClick={() => handleStatusChange(selectedInquiry.inquiryId, status)}
                              disabled={updatingStatus === selectedInquiry.inquiryId}
                              className={`btn btn-sm ${
                                selectedInquiry.status === status
                                  ? status === "접수됨" ? "btn-warning" 
                                    : status === "진행중" ? "btn-info"
                                    : status === "완료" ? "btn-success"
                                    : "btn-secondary"
                                  : "btn-outline-secondary"
                              }`}
                            >
                              {updatingStatus === selectedInquiry.inquiryId ? (
                                <span className="spinner-border spinner-border-sm"></span>
                              ) : (
                                status
                              )}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="card-body p-5 text-center">
                      <i className="bi bi-hand-index fs-1 text-muted d-block mb-3"></i>
                      <h6 className="text-muted">문의를 선택하세요</h6>
                      <p className="text-muted small mb-0">좌측 목록에서 문의를 클릭하면<br/>상세 정보가 표시됩니다</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* 전문가 관리 탭 */}
          {activeTab === "experts" && (
            <div className="row g-4">
              {/* 전문가 목록 */}
              <div className="col-lg-7">
                {/* 필터 */}
                <div className="card border-0 shadow-sm rounded-4 mb-4">
                  <div className="card-body p-4">
                    <div className="row g-3">
                      <div className="col-md-8">
                        <div className="position-relative">
                          <input
                            type="text"
                            className="form-control form-control-lg ps-5"
                            placeholder="이름, 이메일, 직함으로 검색..."
                            value={expertSearch}
                            onChange={(e) => setExpertSearch(e.target.value)}
                          />
                          <i className="bi bi-search position-absolute top-50 start-0 translate-middle-y ms-3 text-muted"></i>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <select
                          className="form-select form-select-lg"
                          value={expertFilter}
                          onChange={(e) => setExpertFilter(e.target.value)}
                        >
                          <option value="all">전체</option>
                          <option value="pending">🟡 승인 대기</option>
                          <option value="approved">🟢 승인됨</option>
                          <option value="rejected">🔴 거절됨</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 목록 */}
                <div className="card border-0 shadow-sm rounded-4">
                  {expertsLoading ? (
                    <div className="card-body p-5 text-center">
                      <div className="spinner-border text-primary mb-3" role="status"></div>
                      <p className="text-muted mb-0">전문가 목록을 불러오는 중...</p>
                    </div>
                  ) : filteredExperts.length === 0 ? (
                    <div className="card-body p-5 text-center">
                      <i className="bi bi-people fs-1 text-muted d-block mb-3"></i>
                      <h5 className="text-muted">전문가가 없습니다</h5>
                      <p className="text-muted small mb-0">
                        {expertSearch || expertFilter !== "all" ? "검색 조건을 변경해보세요" : "등록된 전문가가 없습니다"}
                      </p>
                    </div>
                  ) : (
                    <div className="list-group list-group-flush">
                      {filteredExperts.map((expert) => {
                        const approval = getApprovalBadge(expert.approved);
                        return (
                          <div
                            key={expert.id}
                            onClick={() => setSelectedExpert(expert)}
                            className={`list-group-item list-group-item-action p-4 border-0 border-bottom ${
                              selectedExpert?.id === expert.id ? "bg-primary bg-opacity-10" : ""
                            }`}
                            style={{ cursor: "pointer" }}
                          >
                            <div className="d-flex align-items-center gap-3">
                              <div className="icon-shape icon-60 bg-primary bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center flex-shrink-0">
                                <span className="fw-bold text-primary fs-5">
                                  {expert.name?.charAt(0) || "?"}
                                </span>
                              </div>
                              <div className="flex-grow-1">
                                <div className="d-flex align-items-center gap-2 mb-1">
                                  <h6 className="mb-0">{expert.name}</h6>
                                  <span className={`badge ${approval.class}`}>{approval.label}</span>
                                </div>
                                <p className="text-muted small mb-1">{expert.title}</p>
                                <p className="text-muted small mb-0">
                                  <i className="bi bi-envelope me-1"></i>
                                  {expert.email || "-"}
                                </p>
                              </div>
                              <i className="bi bi-chevron-right text-muted"></i>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>

              {/* 전문가 상세 */}
              <div className="col-lg-5">
                <div className="card border-0 shadow-sm rounded-4 sticky-top" style={{ top: "100px" }}>
                  {selectedExpert ? (
                    <div className="card-body p-4">
                      {/* 프로필 헤더 */}
                      <div className="text-center mb-4 pb-4 border-bottom">
                        <div className="icon-shape icon-80 bg-primary bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3">
                          <span className="fw-bold text-primary fs-3">
                            {selectedExpert.name?.charAt(0) || "?"}
                          </span>
                        </div>
                        <h5 className="mb-1">{selectedExpert.name}</h5>
                        <p className="text-muted mb-2">{selectedExpert.title}</p>
                        <span className={`badge ${getApprovalBadge(selectedExpert.approved).class}`}>
                          {getApprovalBadge(selectedExpert.approved).label}
                        </span>
                      </div>

                      {/* 기본 정보 */}
                      <div className="row g-3 mb-4 pb-4 border-bottom">
                        <div className="col-12">
                          <small className="text-muted d-block">이메일</small>
                          <a href={`mailto:${selectedExpert.email}`} className="text-primary text-decoration-none">
                            {selectedExpert.email || "-"}
                          </a>
                        </div>
                        <div className="col-6">
                          <small className="text-muted d-block">소속</small>
                          <span>{selectedExpert.company || "-"}</span>
                        </div>
                        <div className="col-6">
                          <small className="text-muted d-block">카테고리</small>
                          <span>{categoryLabels[selectedExpert.category] || selectedExpert.category || "-"}</span>
                        </div>
                        <div className="col-6">
                          <small className="text-muted d-block">지역</small>
                          <span>{selectedExpert.location || "-"}</span>
                        </div>
                        <div className="col-6">
                          <small className="text-muted d-block">경력</small>
                          <span>{selectedExpert.experience ? `${selectedExpert.experience}년` : "-"}</span>
                        </div>
                        <div className="col-6">
                          <small className="text-muted d-block">상담료</small>
                          <span className="text-primary fw-semibold">
                            {selectedExpert.price ? `${selectedExpert.price.toLocaleString()}원/시간` : "-"}
                          </span>
                        </div>
                        <div className="col-6">
                          <small className="text-muted d-block">상담가능</small>
                          <span>{selectedExpert.availability || "-"}</span>
                        </div>
                      </div>

                      {/* 전문분야 */}
                      <div className="mb-4 pb-4 border-bottom">
                        <small className="text-muted d-block mb-2">전문분야</small>
                        <div className="d-flex flex-wrap gap-2">
                          {selectedExpert.specialties?.length > 0 ? (
                            selectedExpert.specialties.map((s, i) => (
                              <span key={i} className="badge bg-primary bg-opacity-10 text-primary px-3 py-2">
                                {s}
                              </span>
                            ))
                          ) : (
                            <span className="text-muted">-</span>
                          )}
                        </div>
                      </div>

                      {/* 자기소개 */}
                      <div className="mb-4">
                        <small className="text-muted d-block mb-2">자기소개</small>
                        <p className="text-secondary mb-0" style={{ whiteSpace: "pre-wrap" }}>
                          {selectedExpert.description || "-"}
                        </p>
                      </div>

                      <hr className="my-4" />

                      {/* 승인 버튼 */}
                      <div>
                        <small className="text-muted d-block mb-3">승인 관리</small>
                        <div className="d-grid gap-2">
                          <button
                            onClick={() => handleApprovalChange(selectedExpert.id, "Y")}
                            disabled={updatingApproval === selectedExpert.id || selectedExpert.approved === "Y"}
                            className={`btn btn-lg ${selectedExpert.approved === "Y" ? "btn-success" : "btn-outline-success"}`}
                          >
                            {updatingApproval === selectedExpert.id ? (
                              <span className="spinner-border spinner-border-sm me-2"></span>
                            ) : (
                              <i className="bi bi-check-circle me-2"></i>
                            )}
                            {selectedExpert.approved === "Y" ? "승인됨" : "승인하기"}
                          </button>
                          <button
                            onClick={() => handleApprovalChange(selectedExpert.id, "N")}
                            disabled={updatingApproval === selectedExpert.id || selectedExpert.approved === "N"}
                            className={`btn btn-lg ${selectedExpert.approved === "N" ? "btn-danger" : "btn-outline-danger"}`}
                          >
                            {updatingApproval === selectedExpert.id ? (
                              <span className="spinner-border spinner-border-sm me-2"></span>
                            ) : (
                              <i className="bi bi-x-circle me-2"></i>
                            )}
                            {selectedExpert.approved === "N" ? "거절됨" : "거절하기"}
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="card-body p-5 text-center">
                      <i className="bi bi-person-badge fs-1 text-muted d-block mb-3"></i>
                      <h6 className="text-muted">전문가를 선택하세요</h6>
                      <p className="text-muted small mb-0">좌측 목록에서 전문가를 클릭하면<br/>상세 정보가 표시됩니다</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}
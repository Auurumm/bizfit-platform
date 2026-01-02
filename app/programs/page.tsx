"use client"

import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import Layout from "@/components/layout/Layout"
import {
  Search,
  Building,
  Calendar,
  Tag,
  CheckCircle,
  XCircle,
  AlertCircle,
  Clock,
  Filter,
  ChevronLeft,
  ChevronRight,
  Inbox,
  RefreshCw,
  ExternalLink,
} from "lucide-react"

// ============================================
// 타입 정의
// ============================================
interface GovernmentProgram {
  id: string
  title: string
  organization: string
  ministry: string
  category: string
  budget: string
  deadline: string
  daysLeft: number | null
  description: string
  requirements: string[]
  applicationUrl: string
  contactInfo: string
  status: "active" | "closing" | "upcoming" | "closed"
  tags: string[]
  region: string
  targetCompany: string
  supportType: string
}

interface ProgramsResponse {
  success: boolean
  programs: GovernmentProgram[]
  totalCount: number
  totalAvailable: number
  dataSource: string
  lastUpdated: string
}

// ============================================
// 필터 옵션
// ============================================
const CATEGORY_OPTIONS = [
  { value: "", label: "전체 분야" },
  { value: "창업지원", label: "창업지원" },
  { value: "R&D지원", label: "R&D지원" },
  { value: "수출지원", label: "수출지원" },
  { value: "고용지원", label: "고용지원" },
  { value: "ICT지원", label: "ICT지원" },
  { value: "제조업지원", label: "제조업지원" },
  { value: "금융지원", label: "금융지원" },
  { value: "경영지원", label: "경영지원" },
  { value: "여성기업", label: "여성기업" },
  { value: "사회적기업", label: "사회적기업" },
]

const STATUS_OPTIONS = [
  { value: "", label: "전체 상태" },
  { value: "closing", label: "🔥 마감 임박" },
  { value: "active", label: "✅ 진행중" },
  { value: "upcoming", label: "📅 접수 예정" },
  { value: "closed", label: "⏹️ 마감됨" },
]

export default function ProgramsPage() {
  const [programs, setPrograms] = useState<GovernmentProgram[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [dataSource, setDataSource] = useState("")
  const [totalAvailable, setTotalAvailable] = useState(0)

  // 필터 상태
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("")
  const [statusFilter, setStatusFilter] = useState("")
  const [showClosed, setShowClosed] = useState(false)

  // 페이지네이션
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 12

  // ============================================
  // 데이터 로드
  // ============================================
  const fetchPrograms = useCallback(async (refresh = false) => {
    try {
      setLoading(true)
      setError(null)

      // 쿼리 파라미터 구성
      const params = new URLSearchParams()
      if (categoryFilter) params.append("category", categoryFilter)
      if (statusFilter) params.append("status", statusFilter)
      if (searchQuery) params.append("search", searchQuery)
      if (showClosed) params.append("showClosed", "true")
      if (refresh) params.append("refresh", "true")

      const url = `/api/programs${params.toString() ? `?${params.toString()}` : ""}`
      const response = await fetch(url)

      if (!response.ok) {
        throw new Error("지원사업 데이터를 불러오는데 실패했습니다.")
      }

      const data: ProgramsResponse = await response.json()
      
      if (data.success) {
        setPrograms(data.programs)
        setDataSource(data.dataSource)
        setTotalAvailable(data.totalAvailable || data.totalCount)
      } else {
        throw new Error("데이터를 불러올 수 없습니다.")
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "오류가 발생했습니다.")
    } finally {
      setLoading(false)
    }
  }, [categoryFilter, statusFilter, searchQuery, showClosed])

  // 초기 로드
  useEffect(() => {
    fetchPrograms()
  }, [fetchPrograms])

  // 페이지 리셋 (필터 변경 시)
  useEffect(() => {
    setCurrentPage(1)
  }, [categoryFilter, statusFilter, searchQuery, showClosed])

  // ============================================
  // 페이지네이션 계산
  // ============================================
  const totalPages = Math.ceil(programs.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const currentPrograms = programs.slice(startIndex, startIndex + itemsPerPage)

  // ============================================
  // 상태 배지 컴포넌트
  // ============================================
  const StatusBadge = ({ status, daysLeft }: { status: string; daysLeft: number | null }) => {
    switch (status) {
      case "closed":
        return (
          <span className="badge bg-secondary text-white px-3 py-2 fs-7">
            <XCircle size={14} className="me-1" />
            마감
          </span>
        )
      case "closing":
        return (
          <span className="badge bg-danger text-white px-3 py-2 fs-7 fw-bold">
            <AlertCircle size={14} className="me-1" />
            {daysLeft !== null ? `D-${daysLeft}` : "마감임박"}
          </span>
        )
      case "upcoming":
        return (
          <span className="badge bg-info text-white px-3 py-2 fs-7">
            <Clock size={14} className="me-1" />
            접수예정
          </span>
        )
      default:
        return (
          <span className="badge bg-success text-white px-3 py-2 fs-7">
            <CheckCircle size={14} className="me-1" />
            {daysLeft !== null && daysLeft <= 30 ? `D-${daysLeft}` : "진행중"}
          </span>
        )
    }
  }

  // ============================================
  // D-day 배지 컴포넌트
  // ============================================
  const DdayBadge = ({ daysLeft, status }: { daysLeft: number | null; status: string }) => {
    if (status === "closed") {
      return <span className="badge bg-secondary">마감</span>
    }
    
    if (daysLeft === null) {
      return <span className="badge bg-primary bg-opacity-75">상시</span>
    }

    if (daysLeft <= 0) {
      return <span className="badge bg-secondary">마감</span>
    }

    if (daysLeft <= 7) {
      return <span className="badge bg-danger fw-bold">D-{daysLeft}</span>
    }

    if (daysLeft <= 30) {
      return <span className="badge bg-warning text-dark">D-{daysLeft}</span>
    }

    return <span className="badge bg-primary">D-{daysLeft}</span>
  }

  // ============================================
  // 렌더링 - 로딩
  // ============================================
  if (loading && programs.length === 0) {
    return (
      <Layout breadcrumbTitle="지원사업 목록">
        <section className="section-programs-list position-relative overflow-hidden py-120">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-6">
                <div className="text-center py-5">
                  <div className="spinner-border text-primary mb-4" role="status" style={{ width: '4rem', height: '4rem' }}>
                    <span className="visually-hidden">로딩중...</span>
                  </div>
                  <h3 className="mb-3">지원사업 정보를 불러오는 중...</h3>
                  <p className="text-muted">기업마당에서 최신 정보를 가져오고 있습니다</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    )
  }

  // ============================================
  // 렌더링 - 에러
  // ============================================
  if (error) {
    return (
      <Layout breadcrumbTitle="지원사업 목록">
        <section className="section-programs-list position-relative overflow-hidden py-120">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-6">
                <div className="card border-danger">
                  <div className="card-body text-center py-5">
                    <div className="icon-shape icon-lg bg-danger bg-opacity-10 rounded-circle mx-auto mb-4">
                      <AlertCircle className="text-danger" size={48} />
                    </div>
                    <h3 className="mb-3">오류가 발생했습니다</h3>
                    <p className="text-muted mb-4">{error}</p>
                    <button 
                      className="btn btn-primary hover-up" 
                      onClick={() => fetchPrograms(true)}
                    >
                      다시 시도
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    )
  }

  // ============================================
  // 렌더링 - 메인 콘텐츠
  // ============================================
  return (
    <Layout breadcrumbTitle="지원사업 목록">
      {/* 히어로 섹션 */}
      <section className="section-programs-hero position-relative overflow-hidden pt-80 pb-80 bg-primary">
        <div className="container position-relative z-1">
          <div className="row align-items-center">
            <div className="col-lg-8" data-aos="fade-right">
              <h1 className="ds-2 text-white mb-3">
                <strong>정부 지원사업</strong> 목록
              </h1>
              <p className="fs-5 text-white opacity-75 mb-4">
                전체 <strong className="text-warning">{totalAvailable}개</strong> 중{" "}
                <strong className="text-warning">{programs.length}개</strong> 표시
                {statusFilter === "closing" && " (마감 임박 순)"}
              </p>
              <div className="d-flex flex-wrap gap-3">
                <span className="badge bg-white text-primary px-3 py-2">
                  <CheckCircle size={16} className="me-1" />
                  마감 임박순 정렬
                </span>
                <span className="badge bg-white text-primary px-3 py-2">
                  <Filter size={16} className="me-1" />
                  맞춤 필터링
                </span>
                <button 
                  className="badge bg-white bg-opacity-25 text-white px-3 py-2 border-0"
                  onClick={() => fetchPrograms(true)}
                  disabled={loading}
                >
                  <RefreshCw size={16} className={`me-1 ${loading ? 'spinner-border spinner-border-sm' : ''}`} />
                  새로고침
                </button>
              </div>
            </div>
            <div className="col-lg-4 text-lg-end mt-4 mt-lg-0" data-aos="fade-left">
              <Link href="/diagnosis" className="btn btn-light btn-lg px-5 py-3 hover-up">
                <span className="me-2">AI 진단받기</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M15.8167 7.55759C15.8165 7.5574 15.8163 7.55719 15.8161 7.557L12.5504 4.307C12.3057 4.06353 11.91 4.06444 11.6665 4.30912C11.423 4.55378 11.4239 4.9495 11.6686 5.193L13.8612 7.375H0.625C0.279813 7.375 0 7.65481 0 8C0 8.34519 0.279813 8.625 0.625 8.625H13.8612L11.6686 10.807C11.4239 11.0505 11.423 11.4462 11.6665 11.6909C11.91 11.9356 12.3058 11.9364 12.5504 11.693L15.8162 8.443C15.8163 8.44281 15.8165 8.44259 15.8167 8.4424C16.0615 8.19809 16.0607 7.80109 15.8167 7.55759Z" fill="currentColor"/>
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 메인 콘텐츠 */}
      <section className="section-programs-list position-relative overflow-hidden py-80">
        <div className="container position-relative z-1">
          {/* 필터 섹션 */}
          <div className="card border-0 shadow-sm mb-5" data-aos="fade-up">
            <div className="card-body p-lg-4 p-3">
              <div className="row g-3">
                {/* 검색 */}
                <div className="col-lg-4">
                  <div className="position-relative">
                    <div className="position-absolute top-50 start-0 translate-middle-y ms-3">
                      <Search size={18} className="text-muted" />
                    </div>
                    <input
                      type="text"
                      className="form-control ps-5"
                      placeholder="사업명, 기관명, 키워드로 검색..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>

                {/* 카테고리 필터 */}
                <div className="col-lg-2 col-md-4">
                  <select
                    className="form-select"
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                  >
                    {CATEGORY_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* 상태 필터 */}
                <div className="col-lg-2 col-md-4">
                  <select
                    className="form-select"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                  >
                    {STATUS_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* 마감 사업 표시 토글 */}
                <div className="col-lg-2 col-md-4">
                  <div className="form-check form-switch d-flex align-items-center h-100">
                    <input
                      className="form-check-input me-2"
                      type="checkbox"
                      id="showClosed"
                      checked={showClosed}
                      onChange={(e) => setShowClosed(e.target.checked)}
                    />
                    <label className="form-check-label" htmlFor="showClosed">
                      마감 포함
                    </label>
                  </div>
                </div>

                {/* 필터 초기화 */}
                <div className="col-lg-2 col-md-12">
                  <button
                    className="btn btn-outline-secondary w-100"
                    onClick={() => {
                      setSearchQuery("")
                      setCategoryFilter("")
                      setStatusFilter("")
                      setShowClosed(false)
                    }}
                  >
                    필터 초기화
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* 지원사업 카드 그리드 */}
          {currentPrograms.length === 0 ? (
            <div className="text-center py-5" data-aos="fade-up">
              <div className="icon-shape icon-xxl bg-light rounded-circle mx-auto mb-4">
                <Inbox size={64} className="text-muted" />
              </div>
              <h4 className="mb-3">검색 결과가 없습니다</h4>
              <p className="text-muted mb-4">다른 검색어나 필터를 사용해보세요.</p>
              <button 
                className="btn btn-outline-primary"
                onClick={() => {
                  setSearchQuery("")
                  setCategoryFilter("")
                  setStatusFilter("")
                  setShowClosed(false)
                }}
              >
                필터 초기화
              </button>
            </div>
          ) : (
            <>
              <div className="row g-4">
                {currentPrograms.map((program, index) => (
                  <div key={program.id} className="col-lg-4 col-md-6">
                    <div
                      className={`card h-100 border-0 shadow-sm hover-up ${
                        program.status === "closed" ? "opacity-60" : ""
                      }`}
                      data-aos="fade-up"
                      data-aos-delay={index * 30}
                    >
                      <div className="card-body p-4 d-flex flex-column">
                        {/* 상단: 카테고리 & 상태 */}
                        <div className="d-flex justify-content-between align-items-start mb-3">
                          <span className="badge bg-primary bg-opacity-10 text-primary px-3 py-2 fs-7">
                            {program.category}
                          </span>
                          <StatusBadge status={program.status} daysLeft={program.daysLeft} />
                        </div>

                        {/* 사업명 */}
                        <h5 className="card-title mb-3 fw-bold" style={{ minHeight: '48px' }}>
                          <Link
                            href={`/programs/${program.id}`}
                            className="text-decoration-none text-dark hover-effect-1"
                          >
                            {program.title.length > 45
                              ? `${program.title.substring(0, 45)}...`
                              : program.title}
                          </Link>
                        </h5>

                        {/* 기관 */}
                        <div className="d-flex align-items-center mb-3">
                          <Building size={16} className="text-muted me-2 flex-shrink-0" />
                          <span className="text-muted fs-7 text-truncate">
                            {program.organization}
                          </span>
                        </div>

                        {/* 설명 */}
                        <p className="card-text text-muted fs-7 flex-grow-1 mb-3" style={{ minHeight: '60px' }}>
                          {program.description.length > 80
                            ? `${program.description.substring(0, 80)}...`
                            : program.description || "상세내용은 공고를 확인해주세요."}
                        </p>

                        {/* 마감일 정보 (개선됨) */}
                        <div className="mb-3">
                          <div className="d-flex align-items-center justify-content-between p-3 bg-light rounded-3">
                            <div className="d-flex align-items-center">
                              <Calendar size={16} className="text-primary me-2" />
                              <span className="fs-7 text-muted">마감일</span>
                            </div>
                            <div className="text-end">
                              <div className={`fw-semibold fs-7 ${
                                program.status === "closing" ? "text-danger" : 
                                program.status === "closed" ? "text-secondary" : "text-dark"
                              }`}>
                                {program.deadline}
                              </div>
                              <DdayBadge daysLeft={program.daysLeft} status={program.status} />
                            </div>
                          </div>
                        </div>

                        {/* 태그 */}
                        <div className="d-flex flex-wrap gap-1 mb-3">
                          {program.tags.slice(0, 3).map((tag, i) => (
                            <span 
                              key={i} 
                              className="badge bg-light text-dark border fs-8"
                              style={{ cursor: 'pointer' }}
                              onClick={() => setSearchQuery(tag)}
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* 카드 푸터 */}
                      <div className="card-footer bg-transparent border-0 p-4 pt-0">
                        <div className="d-flex gap-2">
                          <Link
                            href={`/programs/${program.id}`}
                            className="btn btn-outline-primary btn-sm flex-grow-1 hover-up"
                          >
                            상세보기
                          </Link>
                          {program.status !== "closed" && (
                            <a
                              href={program.applicationUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={`btn btn-sm flex-grow-1 hover-up d-flex align-items-center justify-content-center gap-1 ${
                                program.status === "closing" ? "btn-danger" : "btn-primary"
                              }`}
                            >
                              신청하기
                              <ExternalLink size={14} />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* 페이지네이션 */}
              {totalPages > 1 && (
                <nav className="mt-5" data-aos="fade-up">
                  <ul className="pagination justify-content-center align-items-center gap-1 flex-nowrap mb-0">
                    {/* 처음 */}
                    <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                      <button
                        className="page-link border rounded-2 px-3"
                        onClick={() => setCurrentPage(1)}
                        disabled={currentPage === 1}
                      >
                        처음
                      </button>
                    </li>

                    {/* 페이지 번호들 (최대 10개) */}
                    {Array.from({ length: Math.min(10, totalPages) }, (_, i) => {
                      let page: number
                      if (totalPages <= 10) {
                        page = i + 1
                      } else if (currentPage <= 5) {
                        page = i + 1
                      } else if (currentPage >= totalPages - 4) {
                        page = totalPages - 9 + i
                      } else {
                        page = currentPage - 4 + i
                      }
                      return page
                    }).map(page => (
                      <li key={page} className="page-item">
                        <button
                          className={`page-link border-0 px-3 ${
                            currentPage === page ? "fw-bold text-dark" : "text-muted"
                          }`}
                          onClick={() => setCurrentPage(page)}
                        >
                          {page}
                        </button>
                      </li>
                    ))}

                    {/* 다음 */}
                    <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
                      <button
                        className="page-link border rounded-2 px-3"
                        onClick={() => setCurrentPage(currentPage + 1)}
                        disabled={currentPage === totalPages}
                      >
                        다음
                      </button>
                    </li>

                    {/* 마지막 */}
                    <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
                      <button
                        className="page-link border rounded-2 px-3"
                        onClick={() => setCurrentPage(totalPages)}
                        disabled={currentPage === totalPages}
                      >
                        마지막
                      </button>
                    </li>
                  </ul>
                </nav>
              )}
            </>
          )}

          {/* 데이터 출처 
          {dataSource && (
            <div className="text-center mt-5" data-aos="fade-up">
              <p className="text-muted fs-7 mb-0">
                <i className="bi bi-info-circle me-2"></i>
                {dataSource} | 마감 임박순 정렬
              </p>
            </div>
          )}
          */}
        </div>
      </section>
    </Layout>
  )
}
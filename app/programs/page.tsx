"use client"

import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import Layout from "@/components/layout/Layout"
import PageHeader from "@/components/sections/PageHeader"
import { useAuth } from "@/lib/AuthContext"
import { supabase } from "@/lib/supabase"
import {
  Search,
  Building,
  Calendar,
  CheckCircle,
  XCircle,
  AlertCircle,
  Clock,
  Filter,
  Inbox,
  RefreshCw,
  ExternalLink,
  Bookmark,
  BookmarkCheck,
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
  const { user } = useAuth()
  
  const [programs, setPrograms] = useState<GovernmentProgram[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [dataSource, setDataSource] = useState("")
  const [totalAvailable, setTotalAvailable] = useState(0)

  // 북마크 상태
  const [bookmarks, setBookmarks] = useState<Set<string>>(new Set())
  const [bookmarkLoading, setBookmarkLoading] = useState<string | null>(null)
  const [showLoginModal, setShowLoginModal] = useState(false)

  // 필터 상태
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("")
  const [statusFilter, setStatusFilter] = useState("")
  const [showClosed, setShowClosed] = useState(false)

  // 페이지네이션
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 12

  // ============================================
  // 북마크 로드
  // ============================================
  const loadBookmarks = useCallback(async () => {
    if (!user) {
      setBookmarks(new Set())
      return
    }

    try {
      const { data, error } = await supabase
        .from('bookmarks')
        .select('program_id')
        .eq('user_id', user.id)

      if (error) throw error

      const bookmarkSet = new Set(data?.map(b => b.program_id) || [])
      setBookmarks(bookmarkSet)
    } catch (error) {
      console.error('북마크 로드 오류:', error)
    }
  }, [user])

  // ============================================
  // 북마크 토글
  // ============================================
  const toggleBookmark = async (program: GovernmentProgram) => {
    if (!user) {
      setShowLoginModal(true)
      return
    }

    setBookmarkLoading(program.id)

    try {
      const isBookmarked = bookmarks.has(program.id)

      if (isBookmarked) {
        const { error } = await supabase
          .from('bookmarks')
          .delete()
          .eq('user_id', user.id)
          .eq('program_id', program.id)

        if (error) throw error

        setBookmarks(prev => {
          const newSet = new Set(prev)
          newSet.delete(program.id)
          return newSet
        })
      } else {
        const { error } = await supabase
          .from('bookmarks')
          .insert({
            user_id: user.id,
            program_id: program.id,
            program_name: program.title
          })

        if (error) throw error

        setBookmarks(prev => new Set([...prev, program.id]))
      }
    } catch (error) {
      console.error('북마크 토글 오류:', error)
    } finally {
      setBookmarkLoading(null)
    }
  }

  // ============================================
  // 데이터 로드
  // ============================================
  const fetchPrograms = useCallback(async (refresh = false) => {
    try {
      setLoading(true)
      setError(null)

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

  useEffect(() => {
    fetchPrograms()
  }, [fetchPrograms])

  useEffect(() => {
    loadBookmarks()
  }, [loadBookmarks])

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
      <Layout>
        <PageHeader title="지원사업" />
        <section className="py-120">
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
      <Layout>
        <PageHeader title="지원사업" />
        <section className="py-120">
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
    <Layout>
      <PageHeader title="지원사업" />
      
      {/* 메인 콘텐츠 */}
      <section className="py-120">
        <div className="container">
          {/* 상단 정보 */}
          <div className="d-flex flex-wrap justify-content-between align-items-center mb-5" data-aos="fade-up">
            <div>
              <p className="text-muted mb-0">
                전체 <strong className="text-primary">{totalAvailable}개</strong> 중{" "}
                <strong className="text-primary">{programs.length}개</strong> 표시
                {statusFilter === "closing" && " (마감 임박 순)"}
              </p>
            </div>
            <div className="d-flex flex-wrap gap-2 mt-3 mt-md-0">
              <span className="badge bg-light text-dark px-3 py-2">
                <CheckCircle size={14} className="me-1" />
                마감 임박순 정렬
              </span>
              {user && (
                <span className="badge bg-light text-dark px-3 py-2">
                  <Bookmark size={14} className="me-1" />
                  북마크 {bookmarks.size}개
                </span>
              )}
              <button 
                className="badge bg-primary text-white px-3 py-2 border-0"
                onClick={() => fetchPrograms(true)}
                disabled={loading}
                style={{ cursor: 'pointer' }}
              >
                <RefreshCw size={14} className={`me-1 ${loading ? 'spinner-border spinner-border-sm' : ''}`} />
                새로고침
              </button>
            </div>
          </div>

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
                        {/* 상단: 카테고리 & 상태 & 북마크 */}
                        <div className="d-flex justify-content-between align-items-start mb-3">
                          <div className="d-flex align-items-center gap-2 flex-wrap">
                            <span className="badge bg-primary bg-opacity-10 text-primary px-3 py-2 fs-7">
                              {program.category}
                            </span>
                            <StatusBadge status={program.status} daysLeft={program.daysLeft} />
                          </div>
                          {/* 북마크 버튼 */}
                          <button
                            className={`btn btn-sm p-1 ${bookmarks.has(program.id) ? 'text-warning' : 'text-muted'}`}
                            onClick={() => toggleBookmark(program)}
                            disabled={bookmarkLoading === program.id}
                            title={bookmarks.has(program.id) ? '북마크 해제' : '북마크 추가'}
                            style={{ background: 'transparent', border: 'none' }}
                          >
                            {bookmarkLoading === program.id ? (
                              <span className="spinner-border spinner-border-sm"></span>
                            ) : bookmarks.has(program.id) ? (
                              <BookmarkCheck size={20} />
                            ) : (
                              <Bookmark size={20} />
                            )}
                          </button>
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

                        {/* 마감일 정보 */}
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
                    <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                      <button
                        className="page-link border rounded-2 px-3"
                        onClick={() => setCurrentPage(1)}
                        disabled={currentPage === 1}
                      >
                        처음
                      </button>
                    </li>

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

                    <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
                      <button
                        className="page-link border rounded-2 px-3"
                        onClick={() => setCurrentPage(currentPage + 1)}
                        disabled={currentPage === totalPages}
                      >
                        다음
                      </button>
                    </li>

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
        </div>
      </section>

      {/* 로그인 유도 모달 */}
      {showLoginModal && (
        <div 
          className="modal fade show d-block" 
          style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
          onClick={(e) => e.target === e.currentTarget && setShowLoginModal(false)}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content rounded-4">
              <div className="modal-body p-5 text-center">
                <div className="icon-shape icon-80 bg-warning bg-opacity-10 rounded-circle mx-auto mb-4 d-flex align-items-center justify-content-center">
                  <Bookmark className="text-warning" size={40} />
                </div>
                <h4 className="mb-3">북마크하려면 로그인이 필요해요</h4>
                <p className="text-muted mb-4">
                  관심 있는 지원사업을 저장하고,<br/>
                  마감 알림을 받으시려면 로그인해주세요.
                </p>
                <div className="d-flex gap-3 justify-content-center">
                  <button 
                    className="btn btn-outline-secondary"
                    onClick={() => setShowLoginModal(false)}
                  >
                    다음에 할게요
                  </button>
                  <Link href="/login" className="btn btn-primary">
                    로그인하기
                  </Link>
                </div>
                <div className="mt-3">
                  <small className="text-muted">
                    아직 계정이 없으신가요? <Link href="/register" className="text-primary">회원가입</Link>
                  </small>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  )
}
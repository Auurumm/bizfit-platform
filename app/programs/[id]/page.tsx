"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Target,
  Building,
  Phone,
  ExternalLink,
  Download,
  Share2,
  Heart,
  Clock,
  Award,
  TrendingUp,
  CheckCircle,
  Info,
  FileText,
  Tag,
} from "lucide-react"
import Layout from "@/components/layout/Layout"

interface RealGovernmentProgram {
  id: string
  title: string
  organization: string
  ministry: string
  category: string
  budget: string
  deadline: string
  registrationDate: string
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

export default function SupportProgramDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [program, setProgram] = useState<RealGovernmentProgram | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string>("")
  const [favorite, setFavorite] = useState(false)

  const programId = params.id as string

  useEffect(() => {
    const fetchProgramDetail = async () => {
      try {
        setLoading(true)
        setError("")

        const response = await fetch(`/api/programs?id=${programId}`)
        
        if (!response.ok) {
          const sampleProgram: RealGovernmentProgram = {
            id: programId,
            title: "2024년 중소기업 디지털 전환 지원사업",
            organization: "중소벤처기업부",
            ministry: "중소벤처기업부",
            category: "ICT지원",
            budget: "최대 5억원",
            deadline: "2024-12-31",
            registrationDate: "2024-01-15",
            description: "중소기업의 디지털 전환을 지원하는 종합 지원사업입니다. 클라우드 도입, AI 기술 적용, 디지털 마케팅 등 다양한 분야에서 지원을 제공합니다.",
            requirements: [
              "중소기업기본법에 따른 중소기업",
              "사업자등록 후 3년 이상 경영",
              "매출액 500억원 이하",
              "디지털 전환 계획서 제출",
              "사업계획서 및 예산서 제출"
            ],
            applicationUrl: "https://www.semas.or.kr",
            contactInfo: "02-1234-5678",
            status: "active",
            tags: ["디지털전환", "AI", "클라우드", "중소기업"],
            region: "전국",
            targetCompany: "중소기업",
            supportType: "보조금"
          }
          
          setProgram(sampleProgram)
        } else {
          const result = await response.json()
          if (result.success) {
            setProgram(result.program)
          } else {
            throw new Error(result.error || "데이터를 불러올 수 없습니다")
          }
        }
      } catch (error) {
        console.error("❌ 프로그램 상세 정보 로드 실패:", error)
        setError(error instanceof Error ? error.message : "데이터를 불러올 수 없습니다")
      } finally {
        setLoading(false)
      }
    }

    if (programId) {
      fetchProgramDetail()
    }
  }, [programId])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-success text-white"
      case "closing":
        return "bg-danger text-white"
      case "upcoming":
        return "bg-info text-white"
      default:
        return "bg-secondary text-white"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "active":
        return "접수중"
      case "closing":
        return "마감임박"
      case "upcoming":
        return "접수예정"
      default:
        return "종료"
    }
  }

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      창업지원: "bg-primary text-white",
      "R&D지원": "bg-purple text-white",
      수출지원: "bg-success text-white",
      제조업지원: "bg-warning text-dark",
      청년창업: "bg-pink text-white",
      여성기업: "bg-danger text-white",
      대학창업: "bg-indigo text-white",
      지역창업: "bg-amber text-white",
      ICT지원: "bg-info text-white",
      조달공고: "bg-secondary text-white",
    }
    return colors[category] || "bg-secondary text-white"
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const getDaysUntilDeadline = (deadline: string) => {
    const today = new Date()
    const deadlineDate = new Date(deadline)
    const diffTime = deadlineDate.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  const toggleFavorite = () => {
    setFavorite(!favorite)
  }

  const shareProgram = () => {
    if (navigator.share) {
      navigator.share({
        title: program?.title || "지원사업",
        text: program?.description || "",
        url: window.location.href,
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
      alert("링크가 복사되었습니다!")
    }
  }

  if (loading) {
    return (
      <Layout breadcrumbTitle="지원사업 상세">
        <section className="section-program-detail position-relative overflow-hidden py-120">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-8">
                <div className="text-center py-5">
                  <div className="spinner-border text-primary mb-4" role="status" style={{ width: '4rem', height: '4rem' }}>
                    <span className="visually-hidden">Loading...</span>
                  </div>
                  <h3 className="mb-3">지원사업 상세 정보 로드 중</h3>
                  <p className="text-muted">상세 정보를 불러오고 있습니다...</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    )
  }

  if (error || !program) {
    return (
      <Layout breadcrumbTitle="지원사업 상세">
        <section className="section-program-detail position-relative overflow-hidden py-120">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-8">
                <div className="card border-danger">
                  <div className="card-body text-center py-5">
                    <div className="icon-shape icon-lg bg-danger bg-opacity-10 rounded-circle mx-auto mb-4">
                      <i className="bi bi-exclamation-triangle text-danger fs-3"></i>
                    </div>
                    <h3 className="mb-3">오류가 발생했습니다</h3>
                    <p className="text-muted mb-4">{error}</p>
                    <div className="d-flex gap-3 justify-content-center">
                      <button onClick={() => router.back()} className="btn btn-outline-secondary">
                        <ArrowLeft className="me-2" size={16} />
                        목록으로
                      </button>
                      <button onClick={() => router.push("/")} className="btn btn-primary">
                        홈으로
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    )
  }

  const daysLeft = getDaysUntilDeadline(program.deadline)

  return (
    <Layout breadcrumbTitle="지원사업 상세">
      <section className="section-program-detail position-relative overflow-hidden py-120">
        <div className="container position-relative z-1">
          {/* Header Actions */}
          <div className="row mb-5">
            <div className="col-12">
              <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-4">
                <button 
                  onClick={() => router.back()} 
                  className="btn btn-outline-secondary hover-up"
                >
                  <ArrowLeft className="me-2" size={16} />
                  <span>목록으로</span>
                </button>
                <div className="d-flex align-items-center gap-2">
                  <button 
                    onClick={toggleFavorite}
                    className="btn btn-outline-secondary icon-shape icon-md hover-up"
                  >
                    <Heart 
                      size={18}
                      className={favorite ? "text-danger" : ""}
                      fill={favorite ? "currentColor" : "none"}
                    />
                  </button>
                  <button 
                    onClick={shareProgram}
                    className="btn btn-outline-secondary icon-shape icon-md hover-up"
                  >
                    <Share2 size={18} />
                  </button>
                </div>
              </div>

              {/* Status and Category Badges */}
              <div className="d-flex flex-wrap align-items-center gap-2 mb-4">
                <span className={`badge ${getStatusColor(program.status)} px-3 py-2 fs-7 fw-semibold`}>
                  {getStatusText(program.status)}
                </span>
                <span className={`badge ${getCategoryColor(program.category)} px-3 py-2 fs-7`}>
                  {program.category}
                </span>
                {daysLeft <= 7 && daysLeft > 0 && (
                  <span className="badge bg-warning text-dark px-3 py-2 fs-7 fw-bold">
                    D-{daysLeft}
                  </span>
                )}
              </div>

              {/* Title Section */}
              <h1 className="ds-3 mb-4 text-anime-style-3">{program.title}</h1>
              <div className="d-flex flex-column gap-2 mb-2">
                <p className="fs-5 text-primary fw-semibold mb-0">
                  {program.ministry} • {program.organization}
                </p>
                <p className="text-muted fs-6">
                  <Clock size={16} className="me-2" />
                  등록일: {formatDate(program.registrationDate)}
                </p>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="row g-4">
            {/* Left Column - Main Info */}
            <div className="col-lg-8">
              {/* Description Card */}
              <div className="card border-0 shadow-sm mb-4" data-aos="fade-up">
                <div className="card-body p-lg-5 p-4">
                  <div className="d-flex align-items-center mb-4">
                    <div className="icon-shape icon-md bg-primary bg-opacity-10 rounded-3 me-3">
                      <FileText className="text-primary" size={24} />
                    </div>
                    <h4 className="mb-0 fw-bold">지원사업 개요</h4>
                  </div>
                  <p className="text-muted lh-lg mb-0">{program.description}</p>
                </div>
              </div>

              {/* Requirements Card */}
              <div className="card border-0 shadow-sm mb-4" data-aos="fade-up" data-aos-delay="100">
                <div className="card-body p-lg-5 p-4">
                  <div className="d-flex align-items-center mb-4">
                    <div className="icon-shape icon-md bg-success bg-opacity-10 rounded-3 me-3">
                      <CheckCircle className="text-success" size={24} />
                    </div>
                    <h4 className="mb-0 fw-bold">신청 요건</h4>
                  </div>
                  <ul className="list-unstyled mb-0">
                    {program.requirements.map((req, index) => (
                      <li key={index} className="d-flex align-items-start mb-3">
                        <div className="bg-primary rounded-circle me-3 mt-1" style={{ width: '8px', height: '8px', minWidth: '8px' }}></div>
                        <span className="text-muted">{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Tags Card */}
              <div className="card border-0 shadow-sm" data-aos="fade-up" data-aos-delay="200">
                <div className="card-body p-lg-5 p-4">
                  <div className="d-flex align-items-center mb-4">
                    <div className="icon-shape icon-md bg-info bg-opacity-10 rounded-3 me-3">
                      <Tag className="text-info" size={24} />
                    </div>
                    <h4 className="mb-0 fw-bold">관련 태그</h4>
                  </div>
                  <div className="d-flex flex-wrap gap-2">
                    {program.tags.map((tag, index) => (
                      <span key={index} className="badge bg-light text-dark border px-3 py-2 fs-7">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Sidebar */}
            <div className="col-lg-4">
              {/* Budget Card */}
              <div 
                className="card border-0 shadow-sm mb-4 bg-gradient" 
                style={{ background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)' }}
                data-aos="fade-up"
              >
                <div className="card-body p-4">
                  <div className="d-flex align-items-center mb-3">
                    <Award className="text-white me-2" size={24} />
                    <h5 className="mb-0 text-white fw-bold">지원금액</h5>
                  </div>
                  <div className="display-5 fw-bold text-white mb-2">{program.budget}</div>
                  <p className="text-white opacity-75 mb-0 fs-7">지원 유형: {program.supportType}</p>
                </div>
              </div>

              {/* Key Info Card */}
              <div className="card border-0 shadow-sm mb-4" data-aos="fade-up" data-aos-delay="100">
                <div className="card-body p-4">
                  <div className="d-flex align-items-center mb-4">
                    <div className="icon-shape icon-md bg-primary bg-opacity-10 rounded-3 me-2">
                      <Info className="text-primary" size={20} />
                    </div>
                    <h5 className="mb-0 fw-bold">주요 정보</h5>
                  </div>
                  
                  <div className="mb-3 pb-3 border-bottom">
                    <div className="d-flex align-items-center justify-content-between">
                      <span className="text-muted d-flex align-items-center fs-7">
                        <Calendar size={16} className="me-2" />
                        신청마감
                      </span>
                      <span className={`fw-semibold fs-7 ${daysLeft <= 7 ? 'text-danger' : ''}`}>
                        {formatDate(program.deadline)}
                      </span>
                    </div>
                  </div>
                  
                  <div className="mb-3 pb-3 border-bottom">
                    <div className="d-flex align-items-center justify-content-between">
                      <span className="text-muted d-flex align-items-center fs-7">
                        <MapPin size={16} className="me-2" />
                        지원지역
                      </span>
                      <span className="fw-semibold fs-7">{program.region}</span>
                    </div>
                  </div>
                  
                  <div>
                    <div className="d-flex align-items-center justify-content-between">
                      <span className="text-muted d-flex align-items-center fs-7">
                        <Target size={16} className="me-2" />
                        지원대상
                      </span>
                      <span className="fw-semibold fs-7">{program.targetCompany}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Info Card */}
              <div className="card border-0 shadow-sm mb-4" data-aos="fade-up" data-aos-delay="200">
                <div className="card-body p-4">
                  <div className="d-flex align-items-center mb-4">
                    <div className="icon-shape icon-md bg-warning bg-opacity-10 rounded-3 me-2">
                      <Phone className="text-warning" size={20} />
                    </div>
                    <h5 className="mb-0 fw-bold">문의처</h5>
                  </div>
                  <div className="d-flex flex-column gap-3">
                    <div className="d-flex align-items-center">
                      <Building size={18} className="text-muted me-2" />
                      <span className="text-muted fs-7">{program.organization}</span>
                    </div>
                    <div className="d-flex align-items-center">
                      <Phone size={18} className="text-muted me-2" />
                      <a href={`tel:${program.contactInfo}`} className="text-muted fs-7 hover-effect-1">
                        {program.contactInfo}
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="d-flex flex-column gap-3" data-aos="fade-up" data-aos-delay="300">
                <button 
                  onClick={() => window.open(program.applicationUrl, "_blank")}
                  className="btn btn-primary w-100 py-3 hover-up"
                >
                  <ExternalLink size={18} className="me-2" />
                  <span>공식 신청하기</span>
                </button>
                <button className="btn btn-outline-secondary w-100 py-3 hover-up">
                  <Download size={18} className="me-2" />
                  <span>상세 자료 다운로드</span>
                </button>
              </div>
            </div>
          </div>

          {/* Related Programs */}
          <div className="row mt-5">
            <div className="col-12">
              <div className="card border-0 shadow-sm" data-aos="fade-up">
                <div className="card-body p-lg-5 p-4">
                  <div className="d-flex align-items-center mb-4">
                    <div className="icon-shape icon-md bg-primary bg-opacity-10 rounded-3 me-3">
                      <TrendingUp className="text-primary" size={24} />
                    </div>
                    <div>
                      <h4 className="mb-1 fw-bold">관련 지원사업</h4>
                      <p className="text-muted mb-0 fs-7">이 지원사업과 유사한 다른 지원사업들을 확인해보세요</p>
                    </div>
                  </div>
                  <div className="text-center py-5">
                    <p className="text-muted mb-4">관련 지원사업 추천 기능은 곧 업데이트됩니다</p>
                    <button 
                      onClick={() => router.push("/programs")} 
                      className="btn btn-outline-primary hover-up"
                    >
                      전체 지원사업 보기
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}
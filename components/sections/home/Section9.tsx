'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface GovernmentProgram {
  id: string
  title: string
  organization: string
  category: string
  deadline: string
  daysLeft: number | null
  status: string
}

// 폴백 데이터 (API 로딩 전 즉시 표시)
const FALLBACK_PROGRAMS: GovernmentProgram[] = [
  {
    id: 'fb-1',
    title: '중소기업 R&D 역량강화 지원사업',
    organization: '중소벤처기업부',
    category: 'R&D지원',
    deadline: '상시모집',
    daysLeft: null,
    status: 'active'
  },
  {
    id: 'fb-2', 
    title: '청년 창업 지원 프로그램',
    organization: '창업진흥원',
    category: '창업지원',
    deadline: '상시모집',
    daysLeft: null,
    status: 'active'
  },
  {
    id: 'fb-3',
    title: '수출 바우처 지원사업',
    organization: 'KOTRA',
    category: '수출지원',
    deadline: '상시모집',
    daysLeft: null,
    status: 'active'
  }
]

export default function Section9() {
  const [programs, setPrograms] = useState<GovernmentProgram[]>(FALLBACK_PROGRAMS)
  const [isRealData, setIsRealData] = useState(false)

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const response = await fetch('/api/programs?status=closing')
        const data = await response.json()
        
        if (data.success && data.programs?.length > 0) {
          setPrograms(data.programs.slice(0, 3))
          setIsRealData(true)
        }
      } catch (error) {
        console.error('지원사업 로드 오류:', error)
      }
    }

    fetchPrograms()
  }, [])

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      '창업지원': 'bg-primary',
      'R&D지원': 'bg-success',
      '수출지원': 'bg-info',
      '고용지원': 'bg-warning',
      'ICT지원': 'bg-danger',
      '제조업지원': 'bg-secondary',
      '금융지원': 'bg-dark',
    }
    return colors[category] || 'bg-primary'
  }

  const getDdayText = (daysLeft: number | null, status: string) => {
    if (status === 'closed') return '마감'
    if (daysLeft === null) return '상시'
    if (daysLeft <= 0) return '마감'
    return `D-${daysLeft}`
  }

  return (
    <>
      <section className="law-firm-home-section-9 pt-120 pb-120 position-relative overflow-hidden">
        <div className="container">
          <div className="text-center">
            <span className="content-top btn-text text-primary fw-semibold rounded-pill border border-primary px-3 py-2 bg-white">
              최신 지원사업
            </span>
            <h2 className="mt-3">
              {isRealData ? '마감 임박 지원사업' : '주요 지원사업'}
            </h2>
            <p className="text-muted mt-2">
              {isRealData 
                ? '놓치지 마세요! 곧 마감되는 지원사업입니다' 
                : '다양한 정부 지원사업을 확인하세요'}
            </p>
          </div>

          <div className="row mt-8">
            {programs.map((program, index) => (
              <div key={program.id} className="col-lg-4" data-aos="fade-up" data-aos-delay={index * 100}>
                <div className="card-news position-relative mb-lg-0 mb-8 hover-up">
                  <Link
                    href={program.id.startsWith('fb-') ? '/programs' : `/programs/${program.id}`}
                    className="card-news-img position-relative d-block"
                  >
                    {/* 기존 이미지 사용 (img-1.png ~ img-3.png) */}
                    <img
                      className="w-100"
                      src={`assets/imgs/pages/law-firm/page-home/home-section-9/img-${index + 1}.png`}
                      alt={program.title}
                    />
                    <span className={`text-uppercase fw-bold fs-8 text-white ${getCategoryColor(program.category)} px-2 py-1 position-absolute top-100 end-0 translate-middle-y me-5 z-1`}>
                      {program.category}
                    </span>
                  </Link>
                  <div className="card-news-body">
                    <div className="d-flex card-news-information mt-5 gap-4">
                      <div className="d-flex align-items-center gap-1">
                        <i className="bi bi-calendar text-primary"></i>
                        <p className="mb-0">{program.deadline}</p>
                      </div>
                      {program.daysLeft !== null && (
                        <div className="d-flex align-items-center gap-1">
                          <span className={`badge ${program.daysLeft <= 7 ? 'bg-danger' : 'bg-warning text-dark'}`}>
                            {getDdayText(program.daysLeft, program.status)}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="d-flex align-items-center gap-1 mt-2">
                      <i className="bi bi-building text-primary"></i>
                      <span className="mb-0 text-muted small">{program.organization}</span>
                    </div>
                    <div className="card-news-title mt-2">
                      <Link href={program.id.startsWith('fb-') ? '/programs' : `/programs/${program.id}`}>
                        <h6>{program.title.length > 40 ? `${program.title.substring(0, 40)}...` : program.title}</h6>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link href="/programs" className="btn btn-outline-secondary">
              <span>전체 지원사업 보기</span>
              <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 16 16" fill="none">
                <path d="M15.8167 7.55759C15.8165 7.5574 15.8163 7.55719 15.8161 7.557L12.5504 4.307C12.3057 4.06353 11.91 4.06444 11.6665 4.30912C11.423 4.55378 11.4239 4.9495 11.6686 5.193L13.8612 7.375H0.625C0.279813 7.375 0 7.65481 0 8C0 8.34519 0.279813 8.625 0.625 8.625H13.8612L11.6686 10.807C11.4239 11.0505 11.423 11.4462 11.6665 11.6909C11.91 11.9356 12.3058 11.9364 12.5504 11.693L15.8162 8.443C15.8163 8.44281 15.8165 8.44259 15.8167 8.4424C16.0615 8.19809 16.0607 7.80109 15.8167 7.55759Z" fill="#B98E44"/>
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
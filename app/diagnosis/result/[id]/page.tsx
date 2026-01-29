'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'
import Layout from "@/components/layout/Layout"
import PageHeader from "@/components/sections/PageHeader"
import { useAuth } from '@/lib/AuthContext'
import { supabase } from '@/lib/supabase'

export default function DiagnosisResultPage() {
  const router = useRouter()
  const params = useParams()
  const { user, loading: authLoading } = useAuth()
  
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login')
    }
  }, [user, authLoading, router])

  useEffect(() => {
    if (user && params.id) {
      loadResult()
    }
  }, [user, params.id])

  const loadResult = async () => {
    try {
      const { data, error } = await supabase
        .from('diagnosis_results')
        .select('*')
        .eq('id', params.id)
        .eq('user_id', user?.id)
        .single()

      if (error) throw error
      if (!data) {
        setError('진단 결과를 찾을 수 없습니다.')
        return
      }
      setResult(data)
    } catch (err) {
      console.error('로드 오류:', err)
      setError('진단 결과를 불러오는 중 오류가 발생했습니다.')
    } finally {
      setLoading(false)
    }
  }

  const getScoreLevel = (score: number) => {
    if (score >= 80) return { text: "매우 높음", color: "success" }
    if (score >= 60) return { text: "높음", color: "info" }
    if (score >= 40) return { text: "보통", color: "warning" }
    return { text: "낮음", color: "danger" }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  if (authLoading || loading) {
    return (
      <Layout>
        <PageHeader title="진단 결과" />
        <section className="py-120">
          <div className="container text-center">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">로딩중...</span>
            </div>
            <p className="mt-3 text-muted">진단 결과를 불러오는 중...</p>
          </div>
        </section>
      </Layout>
    )
  }

  if (error) {
    return (
      <Layout>
        <PageHeader title="진단 결과" />
        <section className="py-120">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-6 text-center">
                <div className="icon-shape icon-80 bg-danger bg-opacity-10 rounded-circle mx-auto mb-4 d-flex align-items-center justify-content-center">
                  <i className="bi bi-exclamation-triangle fs-1 text-danger"></i>
                </div>
                <h4 className="mb-3">{error}</h4>
                <div className="d-flex gap-3 justify-content-center">
                  <Link href="/mypage" className="btn btn-outline-primary">
                    <i className="bi bi-arrow-left me-2"></i>
                    마이페이지로
                  </Link>
                  <Link href="/diagnosis" className="btn btn-primary">
                    <i className="bi bi-plus-lg me-2"></i>
                    새 진단 시작
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    )
  }

  if (!result) return null

  const diagnosisData = result.result
  const scoreLevel = getScoreLevel(diagnosisData.score)

  return (
    <Layout>
      <PageHeader title="진단 결과" />
      
      <section className="py-120">
        <div className="container">
          {/* 상단 정보 */}
          <div className="row mb-4">
            <div className="col-12">
              <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
                <div>
                  <p className="text-muted mb-0">
                    <i className="bi bi-calendar me-2"></i>
                    진단일: {formatDate(result.created_at)}
                  </p>
                </div>
                <div className="d-flex gap-2">
                  <Link href="/mypage" className="btn btn-outline-secondary btn-sm">
                    <i className="bi bi-arrow-left me-1"></i>
                    마이페이지
                  </Link>
                  <Link href="/diagnosis" className="btn btn-primary btn-sm">
                    <i className="bi bi-arrow-repeat me-1"></i>
                    다시 진단
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* 점수 카드 */}
          <div className="row mb-5">
            <div className="col-lg-4 mb-4">
              <div className="card border-0 shadow-lg h-100" style={{ background: "linear-gradient(135deg, #B98E44 0%, #96712e 100%)" }}>
                <div className="card-body text-center text-white p-5">
                  <h5 className="mb-3">종합 적합도 점수</h5>
                  <div className="display-1 fw-bold mb-2">{diagnosisData.score}</div>
                  <span className="badge bg-white text-dark fs-6">{scoreLevel.text}</span>
                </div>
              </div>
            </div>
            <div className="col-lg-8 mb-4">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body p-4">
                  <h5 className="card-title mb-4">
                    <i className="bi bi-lightbulb me-2 text-warning"></i>
                    AI 추천 분석
                  </h5>
                  <ul className="list-unstyled mb-0">
                    {diagnosisData.recommendations?.map((rec: string, idx: number) => (
                      <li key={idx} className="mb-3 d-flex align-items-start">
                        <i className="bi bi-check-circle-fill text-success me-2 mt-1"></i>
                        <span>{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* 입력 정보 요약 */}
          {diagnosisData.form && (
            <div className="row mb-5">
              <div className="col-12">
                <div className="card border-0 shadow-sm">
                  <div className="card-body p-4">
                    <h5 className="card-title mb-4">
                      <i className="bi bi-building me-2 text-primary"></i>
                      진단 입력 정보
                    </h5>
                    <div className="row g-3">
                      {diagnosisData.form.companyName && (
                        <div className="col-md-4">
                          <small className="text-muted d-block">기업명</small>
                          <span>{diagnosisData.form.companyName}</span>
                        </div>
                      )}
                      {diagnosisData.form.businessType && (
                        <div className="col-md-4">
                          <small className="text-muted d-block">기업 유형</small>
                          <span>{diagnosisData.form.businessType}</span>
                        </div>
                      )}
                      {diagnosisData.form.industry && (
                        <div className="col-md-4">
                          <small className="text-muted d-block">업종</small>
                          <span>{diagnosisData.form.industry}</span>
                        </div>
                      )}
                      {diagnosisData.form.employeeCount && (
                        <div className="col-md-4">
                          <small className="text-muted d-block">직원 수</small>
                          <span>{diagnosisData.form.employeeCount}</span>
                        </div>
                      )}
                      {diagnosisData.form.region && (
                        <div className="col-md-4">
                          <small className="text-muted d-block">지역</small>
                          <span>{diagnosisData.form.region}</span>
                        </div>
                      )}
                      {diagnosisData.form.challenges?.length > 0 && (
                        <div className="col-md-6">
                          <small className="text-muted d-block mb-1">현재 과제</small>
                          <div className="d-flex flex-wrap gap-1">
                            {diagnosisData.form.challenges.map((c: string, i: number) => (
                              <span key={i} className="badge bg-light text-dark">{c}</span>
                            ))}
                          </div>
                        </div>
                      )}
                      {diagnosisData.form.goals?.length > 0 && (
                        <div className="col-md-6">
                          <small className="text-muted d-block mb-1">사업 목표</small>
                          <div className="d-flex flex-wrap gap-1">
                            {diagnosisData.form.goals.map((g: string, i: number) => (
                              <span key={i} className="badge bg-light text-dark">{g}</span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 추천 지원사업 */}
          {diagnosisData.suitablePrograms?.length > 0 && (
            <div className="row mb-5">
              <div className="col-12">
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h4 className="mb-0">
                    <i className="bi bi-award me-2 text-primary"></i>
                    추천 지원사업
                  </h4>
                  <small className="text-muted">
                    총 {diagnosisData.suitablePrograms.length}개 매칭
                  </small>
                </div>
                <div className="row g-4">
                  {diagnosisData.suitablePrograms.map((program: any, index: number) => (
                    <div key={program.id || index} className="col-lg-4">
                      <div className="card h-100 border-0 shadow-sm d-flex flex-column">
                        <div className="card-body d-flex flex-column">
                          <div className="d-flex justify-content-between align-items-start mb-2">
                            <span className="badge bg-primary">{program.category}</span>
                            <span className="badge bg-success">{program.matchScore}% 매칭</span>
                          </div>
                          
                          <h5 className="card-title">{program.name}</h5>
                          <p className="card-text text-muted small">{program.description}</p>
                          <div className="mb-2">
                            <small className="text-dark">
                              <i className="bi bi-building me-1"></i>
                              {program.organization}
                            </small>
                          </div>
                          <div className="mb-2">
                            <small className="text-primary">
                              <i className="bi bi-cash me-1"></i>
                              {program.budget}
                            </small>
                          </div>
                          <div className="mb-3">
                            <small className="text-muted">
                              <i className="bi bi-calendar me-1"></i>
                              마감: {program.deadline}
                            </small>
                          </div>
                          
                          <div className="mt-auto">
                            <a 
                              href={program.applicationUrl} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="btn btn-primary btn-sm w-100"
                            >
                              <i className="bi bi-box-arrow-up-right me-1"></i>
                              신청 바로가기
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 다음 단계 */}
          {diagnosisData.nextSteps?.length > 0 && (
            <div className="row mb-5">
              <div className="col-12">
                <div className="card border-0 shadow-sm">
                  <div className="card-body p-4">
                    <h5 className="card-title mb-4">
                      <i className="bi bi-signpost-split me-2 text-info"></i>
                      다음 단계
                    </h5>
                    <div className="row g-3">
                      {diagnosisData.nextSteps.map((step: string, idx: number) => (
                        <div key={idx} className="col-md-6 col-lg-3">
                          <div className="d-flex align-items-start">
                            <span 
                              className="badge bg-primary rounded-circle me-3 flex-shrink-0 d-flex align-items-center justify-content-center" 
                              style={{ width: "28px", height: "28px" }}
                            >
                              {idx + 1}
                            </span>
                            <span className="small">{step}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 하단 버튼 */}
          <div className="text-center">
            <Link href="/diagnosis" className="btn btn-outline-primary me-3">
              <i className="bi bi-arrow-repeat me-2"></i>
              다시 진단하기
            </Link>
            <Link href="/experts" className="btn btn-primary">
              <i className="bi bi-person-lines-fill me-2"></i>
              전문가 상담 신청
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  )
}
'use client'

import { useState } from 'react'
import Link from "next/link"

const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyjCdv9Cg3ooAz5E-DE27oOkVhPUCmA_mChScMc5zL_cY81M7EpiK082RSfCVbpn8Xm/exec"

export default function Section1() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    })
    const [submitting, setSubmitting] = useState(false)
    const [submitted, setSubmitted] = useState(false)
    const [error, setError] = useState('')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setSubmitting(true)
        setError('')
        
        try {
            await fetch(GOOGLE_SCRIPT_URL, {
                method: 'POST',
                mode: 'no-cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    action: 'contact',
                    name: formData.name,
                    email: formData.email,
                    message: formData.message
                })
            })
            
            setSubmitted(true)
        } catch (err) {
            console.error('문의 전송 오류:', err)
            setError('전송 중 오류가 발생했습니다. 다시 시도해주세요.')
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <>
            {/* 지도 섹션 - 상단 */}
            <section className="position-relative pt-80">
                <div className="container">
                    {/* 지도 */}
                    <div className="rounded-4 overflow-hidden shadow-sm" style={{ height: '400px' }}>
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3261.8!2d129.2847!3d35.5456!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3567ce7a1e6d1a1d%3A0x1234567890abcdef!2z7Jq47IKw6rSR7Jet7IucIOyauOyjvOq1sCDrspTshJzsnY0g64yA66as66GcIDIw!5e0!3m2!1sko!2skr!4v1700000000000!5m2!1sko!2skr"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        />
                    </div>

                    {/* 연락처 카드 - 지도 아래 */}
                    <div className="row g-4 mt-5">
                        <div className="col-md-4">
                            <div className="card border-0 shadow-sm h-100 rounded-4">
                                <div className="card-body p-4 text-center">
                                    <div className="icon-shape icon-60 bg-primary bg-opacity-10 rounded-circle mx-auto mb-3 d-flex align-items-center justify-content-center">
                                        <i className="bi bi-geo-alt text-primary fs-4"></i>
                                    </div>
                                    <h6 className="fw-bold mb-2">주소</h6>
                                    <p className="text-muted mb-0 small">
                                        울산광역시 울주군 범서읍<br />대리로 20, 6층 601-22호
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card border-0 shadow-sm h-100 rounded-4">
                                <div className="card-body p-4 text-center">
                                    <div className="icon-shape icon-60 bg-primary bg-opacity-10 rounded-circle mx-auto mb-3 d-flex align-items-center justify-content-center">
                                        <i className="bi bi-telephone text-primary fs-4"></i>
                                    </div>
                                    <h6 className="fw-bold mb-2">전화</h6>
                                    <a href="tel:010-3374-4650" className="text-muted text-decoration-none">
                                        010-3374-4650
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card border-0 shadow-sm h-100 rounded-4">
                                <div className="card-body p-4 text-center">
                                    <div className="icon-shape icon-60 bg-primary bg-opacity-10 rounded-circle mx-auto mb-3 d-flex align-items-center justify-content-center">
                                        <i className="bi bi-envelope text-primary fs-4"></i>
                                    </div>
                                    <h6 className="fw-bold mb-2">이메일</h6>
                                    <a href="mailto:official.haedeun@gmail.com" className="text-muted text-decoration-none small">
                                        official.haedeun@gmail.com
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 문의하기 섹션 */}
            <section className="position-relative overflow-hidden bg-light">
                <div className="container py-120">
                    <div className="row justify-content-center">
                        <div className="col-lg-8">
                            {/* 헤더 */}
                            <div className="text-center mb-5">
                                <span className="btn-text text-primary fw-semibold rounded-pill border border-primary px-3 py-2 bg-white">
                                    문의하기
                                </span>
                                <h2 className="mb-4 mt-4 fw-medium">
                                    비즈핏에 문의하세요
                                </h2>
                                <p className="text-muted">
                                    지원사업, 전문가 상담, 서비스 이용 등 궁금한 점이 있으시면<br />
                                    언제든 문의해주세요. 빠르게 답변드리겠습니다.
                                </p>
                            </div>

                            {/* 폼 카드 */}
                            <div className="card border-0 shadow-sm rounded-4">
                                <div className="card-body p-5">
                                    {submitted ? (
                                        <div className="text-center py-4">
                                            <div className="icon-shape icon-80 bg-success bg-opacity-10 rounded-circle mx-auto mb-4 d-flex align-items-center justify-content-center">
                                                <i className="bi bi-check-lg text-success fs-1"></i>
                                            </div>
                                            <h4 className="mb-3">문의가 접수되었습니다</h4>
                                            <p className="text-muted mb-4">
                                                입력하신 이메일로 확인 메일이 발송되었습니다.<br />
                                                빠른 시간 내에 답변드리겠습니다.
                                            </p>
                                            <button 
                                                className="btn btn-outline-primary"
                                                onClick={() => {
                                                    setSubmitted(false)
                                                    setFormData({ name: '', email: '', message: '' })
                                                }}
                                            >
                                                새로운 문의하기
                                            </button>
                                        </div>
                                    ) : (
                                        <form onSubmit={handleSubmit}>
                                            <div className="row g-4">
                                                <div className="col-md-6">
                                                    <label htmlFor="username" className="form-label fw-semibold">
                                                        기업명 / 성함 <span className="text-danger">*</span>
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className="form-control form-control-lg"
                                                        name="name"
                                                        placeholder="홍길동 / (주)비즈핏"
                                                        id="username"
                                                        value={formData.name}
                                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                        required
                                                    />
                                                </div>
                                                <div className="col-md-6">
                                                    <label htmlFor="email" className="form-label fw-semibold">
                                                        이메일 주소 <span className="text-danger">*</span>
                                                    </label>
                                                    <input
                                                        type="email"
                                                        className="form-control form-control-lg"
                                                        name="email"
                                                        placeholder="example@company.com"
                                                        id="email"
                                                        value={formData.email}
                                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                        required
                                                    />
                                                </div>
                                                <div className="col-12">
                                                    <label htmlFor="message" className="form-label fw-semibold">
                                                        문의 내용 <span className="text-danger">*</span>
                                                    </label>
                                                    <textarea
                                                        name="message"
                                                        id="message"
                                                        rows={6}
                                                        className="form-control form-control-lg"
                                                        placeholder="궁금한 점을 자유롭게 작성해주세요"
                                                        value={formData.message}
                                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                                        required
                                                    />
                                                </div>
                                                
                                                {error && (
                                                    <div className="col-12">
                                                        <div className="alert alert-danger mb-0">
                                                            <i className="bi bi-exclamation-circle me-2"></i>
                                                            {error}
                                                        </div>
                                                    </div>
                                                )}
                                                
                                                <div className="col-12">
                                                    <button
                                                        className="btn btn-primary btn-lg w-100"
                                                        type="submit"
                                                        disabled={submitting}
                                                    >
                                                        {submitting ? (
                                                            <>
                                                                <span className="spinner-border spinner-border-sm me-2"></span>
                                                                전송 중...
                                                            </>
                                                        ) : (
                                                            <>
                                                                <i className="bi bi-send me-2"></i>
                                                                문의하기
                                                            </>
                                                        )}
                                                    </button>
                                                </div>
                                            </div>
                                        </form>
                                    )}
                                </div>
                            </div>

                            {/* 추가 안내 */}
                            <div className="text-center mt-5">
                                <p className="text-muted mb-0">
                                    <i className="bi bi-clock me-2"></i>
                                    평일 09:00 - 18:00 상담 가능 | 이메일 문의는 24시간 접수
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
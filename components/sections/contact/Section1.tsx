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
            {/*bizfit contact section 1*/}
            <section className="law-firm-contact-section-1 position-relative overflow-hidden">
                <div className="container py-120">
                    <div className="row align-items-center">
                        <div className="col-lg-6 pe-lg-8 col-12">
                            <span className="content-top btn-text text-primary fw-semibold rounded-pill border border-primary px-3 py-2 bg-white">
                                문의하기
                            </span>
                            <h2 className="mb-4 mt-3 fw-medium">
                                비즈핏에 문의하세요
                            </h2>
                            <p className="text-muted mb-5">
                                지원사업, 전문가 상담, 서비스 이용 등 궁금한 점이 있으시면<br />
                                언제든 문의해주세요. 빠르게 답변드리겠습니다.
                            </p>

                            {submitted ? (
                                <div className="card border-0 shadow-sm p-5 text-center">
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
                                <form onSubmit={handleSubmit} className="input-group mb-3 mt-4 position-relative">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <label htmlFor="username" className="fs-7 fw-bold mb-3">
                                                기업명 / 성함
                                            </label>
                                            <input
                                                type="text"
                                                className="py-3 form-control rounded-0"
                                                name="name"
                                                placeholder="홍길동 / (주)비즈핏"
                                                id="username"
                                                value={formData.name}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                required
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <label htmlFor="email" className="fs-7 fw-bold mb-3">
                                                이메일 주소
                                            </label>
                                            <input
                                                type="email"
                                                className="py-3 form-control rounded-0"
                                                name="email"
                                                placeholder="example@company.com"
                                                id="email"
                                                value={formData.email}
                                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                required
                                            />
                                        </div>
                                        <div className="col-12 mt-5">
                                            <label htmlFor="message" className="fs-7 fw-bold mb-3">
                                                문의 내용
                                            </label>
                                            <textarea
                                                name="message"
                                                id="message"
                                                cols={30}
                                                rows={8}
                                                className="py-3 form-control rounded-0"
                                                placeholder="궁금한 점을 자유롭게 작성해주세요"
                                                value={formData.message}
                                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                                required
                                            />
                                        </div>
                                        
                                        {error && (
                                            <div className="col-12 mt-3">
                                                <div className="alert alert-danger mb-0">
                                                    <i className="bi bi-exclamation-circle me-2"></i>
                                                    {error}
                                                </div>
                                            </div>
                                        )}
                                        
                                        <div className="col-12 mt-5">
                                            <button
                                                aria-label="submit"
                                                className="btn btn-primary hover-up"
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
                                                        <span>문의하기</span>
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            width={16}
                                                            height={16}
                                                            viewBox="0 0 16 16"
                                                            fill="none"
                                                        >
                                                            <g clipPath="url(#clip0_886_362)">
                                                                <path
                                                                    d="M15.8167 7.55759C15.8165 7.5574 15.8163 7.55719 15.8161 7.557L12.5504 4.307C12.3057 4.06353 11.91 4.06444 11.6665 4.30912C11.423 4.55378 11.4239 4.9495 11.6686 5.193L13.8612 7.375H0.625C0.279813 7.375 0 7.65481 0 8C0 8.34519 0.279813 8.625 0.625 8.625H13.8612L11.6686 10.807C11.4239 11.0505 11.423 11.4462 11.6665 11.6909C11.91 11.9356 12.3058 11.9364 12.5504 11.693L15.8162 8.443C15.8163 8.44281 15.8165 8.44259 15.8167 8.4424C16.0615 8.19809 16.0607 7.80109 15.8167 7.55759Z"
                                                                    fill="white"
                                                                />
                                                            </g>
                                                        </svg>
                                                    </>
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            )}
                        </div>
                        <div className="col-lg-6 ms-lg-auto mt-lg-0 mt-5 d-none d-lg-block">
                            <div data-aos="zoom-in">
                                <img
                                    src="assets/imgs/pages/law-firm/page-contact/img-1.png"
                                    alt="비즈핏"
                                />
                            </div>
                            
                            {/* 연락처 정보 카드 */}
                            <div className="row g-4 mt-4">
                                <div className="col-6">
                                    <div className="card border-0 shadow-sm p-4 h-100">
                                        <div className="d-flex align-items-center mb-3">
                                            <div className="icon-shape icon-50 bg-primary bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center me-3">
                                                <i className="bi bi-envelope text-primary"></i>
                                            </div>
                                            <h6 className="mb-0 fw-bold">이메일</h6>
                                        </div>
                                        <a href="mailto:official.haedeun@gmail.com" className="text-muted hover-effect-1" style={{ whiteSpace: 'nowrap' }}>
                                            official.haedeun@gmail.com
                                        </a>
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="card border-0 shadow-sm p-4 h-100">
                                        <div className="d-flex align-items-center mb-3">
                                            <div className="icon-shape icon-50 bg-primary bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center me-3">
                                                <i className="bi bi-telephone text-primary"></i>
                                            </div>
                                            <h6 className="mb-0 fw-bold">전화</h6>
                                        </div>
                                        <a href="tel:010-3374-4650" className="text-muted hover-effect-1" style={{ whiteSpace: 'nowrap' }}>
                                            010-3374-4650
                                        </a>
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="card border-0 shadow-sm p-4">
                                        <div className="d-flex align-items-center mb-3">
                                            <div className="icon-shape icon-50 bg-primary bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center me-3">
                                                <i className="bi bi-geo-alt text-primary"></i>
                                            </div>
                                            <h6 className="mb-0 fw-bold">주소</h6>
                                        </div>
                                        <p className="text-muted mb-0">
                                            울산광역시 남구 테크노산업로 55번길
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* 지도 - 울산 위치로 변경 */}
                <div className="container-fluid">
                    <div className="contact-map">
                        <iframe
                            className="map"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3288.5!2d129.3!3d35.5!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzXCsDMwJzAwLjAiTiAxMjnCsDE4JzAwLjAiRQ!5e0!3m2!1sko!2skr!4v1700000000000!5m2!1sko!2skr"
                            width={600}
                            height={450}
                            style={{ border: 0 }}
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        />
                    </div>
                </div>
            </section>
        </>
    )
}
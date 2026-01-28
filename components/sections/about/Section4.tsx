'use client'

import { useState } from 'react'
import Link from "next/link"

export default function Section4() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    })
    const [submitting, setSubmitting] = useState(false)
    const [submitted, setSubmitted] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setSubmitting(true)
        
        // 여기에 실제 폼 제출 로직 추가
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        setSubmitting(false)
        setSubmitted(true)
    }

    return (
        <>
            {/*bizfit about section 4 - 문의 폼*/}
            <section className="law-firm-about-section-4 position-relative py-120 bg-secondary-2 overflow-hidden">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-6 pe-lg-8 col-12">
                            <span className="content-top btn-text text-primary fw-semibold rounded-pill border border-primary px-3 py-2 bg-secondary-2">
                                문의하기
                            </span>
                            <h2 className="my-3">무료 상담 신청</h2>
                            <p className="text-muted mb-4">
                                지원사업에 대해 궁금한 점이 있으시면 언제든 문의해주세요.
                                전문 상담원이 빠르게 답변드리겠습니다.
                            </p>

                            {submitted ? (
                                <div className="card border-0 shadow-sm p-5 text-center">
                                    <div className="icon-shape icon-80 bg-success bg-opacity-10 rounded-circle mx-auto mb-4 d-flex align-items-center justify-content-center">
                                        <i className="bi bi-check-lg text-success fs-1"></i>
                                    </div>
                                    <h4 className="mb-3">문의가 접수되었습니다</h4>
                                    <p className="text-muted mb-4">
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
                                                        <span>상담 신청하기</span>
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            width={16}
                                                            height={16}
                                                            viewBox="0 0 16 16"
                                                            fill="none"
                                                        >
                                                            <g clipPath="url(#clip0_1466_2165)">
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
                            <div data-aos="fade-left" data-aos-delay={400}>
                                <img
                                    src="assets/imgs/pages/law-firm/page-about/img-1.png"
                                    alt="비즈핏"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
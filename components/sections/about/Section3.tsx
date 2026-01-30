import Link from "next/link"

export default function Section3() {
    return (
        <>
            {/*bizfit about section 3 - 비전*/}
            <section className="law-firm-about-section-3 position-relative py-120 overflow-hidden">
                <div className="container">
                    <div className="row align-items-center">
                        {/* 왼쪽: 비전 */}
                        <div className="col-lg-6 pe-lg-5" data-aos="fade-right">
                            <span className="content-top btn-text text-primary fw-semibold rounded-pill border border-primary px-3 py-2 bg-white">
                                우리의 비전
                            </span>
                            <h2 className="mt-3 mb-4" style={{ wordBreak: 'keep-all' }}>
								모든 중소기업이 <strong>성장 기회를 놓치지 않는 세상</strong>
							</h2>
                            <p className="text-muted mb-4">
                                매년 수천 개의 정부 지원사업이 공고되지만,
                                정보 부족으로 신청조차 하지 못하는 기업이 많습니다.
                            </p>
                            <p className="text-muted mb-4">
                                비즈핏은 복잡한 지원사업 정보를 쉽게 정리하고,
                                AI 기술로 기업별 맞춤 추천을 제공하여
                                더 많은 기업이 성장의 기회를 얻을 수 있도록 돕습니다.
                            </p>
                            <Link href="/diagnosis" className="btn btn-primary hover-up">
                                <span>무료 AI 진단 시작하기</span>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width={16}
                                    height={16}
                                    viewBox="0 0 16 16"
                                    fill="none"
                                >
                                    <path
                                        d="M15.8167 7.55759C15.8165 7.5574 15.8163 7.55719 15.8161 7.557L12.5504 4.307C12.3057 4.06353 11.91 4.06444 11.6665 4.30912C11.423 4.55378 11.4239 4.9495 11.6686 5.193L13.8612 7.375H0.625C0.279813 7.375 0 7.65481 0 8C0 8.34519 0.279813 8.625 0.625 8.625H13.8612L11.6686 10.807C11.4239 11.0505 11.423 11.4462 11.6665 11.6909C11.91 11.9356 12.3058 11.9364 12.5504 11.693L15.8162 8.443C15.8163 8.44281 15.8165 8.44259 15.8167 8.4424C16.0615 8.19809 16.0607 7.80109 15.8167 7.55759Z"
                                        fill="white"
                                    />
                                </svg>
                            </Link>
                        </div>

                        {/* 오른쪽: 이런 분들께 추천 */}
                        <div className="col-lg-6 mt-5 mt-lg-0" data-aos="fade-left">
                            <div className="card border-0 shadow-lg p-4 p-lg-5">
                                <h4 className="fw-bold mb-4">
                                    <i className="bi bi-check-circle-fill text-primary me-2"></i>
                                    이런 분들께 추천합니다
                                </h4>
                                <ul className="list-unstyled mb-0">
                                    <li className="d-flex align-items-start mb-3">
                                        <i className="bi bi-check2 text-primary me-3 mt-1"></i>
                                        <span>처음 지원사업을 신청하는 <strong>예비창업자</strong></span>
                                    </li>
                                    <li className="d-flex align-items-start mb-3">
                                        <i className="bi bi-check2 text-primary me-3 mt-1"></i>
                                        <span>적합한 지원사업을 찾기 어려운 <strong>중소기업 대표님</strong></span>
                                    </li>
                                    <li className="d-flex align-items-start mb-3">
                                        <i className="bi bi-check2 text-primary me-3 mt-1"></i>
                                        <span>사업계획서 작성에 도움이 필요한 <strong>스타트업</strong></span>
                                    </li>
                                    <li className="d-flex align-items-start mb-3">
                                        <i className="bi bi-check2 text-primary me-3 mt-1"></i>
                                        <span>R&D, 수출, 고용 등 <strong>특정 분야 지원</strong>이 필요한 기업</span>
                                    </li>
                                    <li className="d-flex align-items-start">
                                        <i className="bi bi-check2 text-primary me-3 mt-1"></i>
                                        <span>마감 공고를 놓치지 않고 챙기고 싶은 <strong>담당자</strong></span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
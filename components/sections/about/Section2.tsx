import Link from "next/link"

export default function Section2() {
    return (
        <>
            {/*bizfit about section 2 - 핵심 서비스*/}
            <section className="law-firm-about-section-2 position-relative py-120 bg-secondary-2 overflow-hidden">
                <div className="container">
                    <div className="text-center mb-5">
                        <span className="content-top btn-text text-primary fw-semibold rounded-pill border border-primary px-3 py-2 bg-white">
                            핵심 서비스
                        </span>
                        <h2 className="mt-3">
                            비즈핏이 제공하는 <strong>4가지 핵심 가치</strong>
                        </h2>
                        <p className="text-muted mt-3">
                            복잡한 지원사업, 이제 비즈핏과 함께 쉽고 빠르게 해결하세요
                        </p>
                    </div>

                    <div className="row g-4">
                        {/* AI 맞춤 진단 */}
                        <div className="col-lg-3 col-md-6" data-aos="fade-up" data-aos-delay={100}>
                            <div className="card h-100 border-0 shadow-sm text-center p-4 hover-up">
                                <div className="icon-shape icon-80 bg-primary bg-opacity-10 rounded-circle mx-auto mb-4 d-flex align-items-center justify-content-center">
                                    <i className="bi bi-cpu text-primary fs-1"></i>
                                </div>
                                <h5 className="fw-bold mb-3">AI 맞춤 진단</h5>
                                <p className="text-muted mb-0">
                                    간단한 기업 정보 입력만으로 2분 내에 
                                    귀하의 기업에 적합한 지원사업을 추천받으세요.
                                </p>
                            </div>
                        </div>

                        {/* 실시간 데이터 연동 */}
                        <div className="col-lg-3 col-md-6" data-aos="fade-up" data-aos-delay={200}>
                            <div className="card h-100 border-0 shadow-sm text-center p-4 hover-up">
                                <div className="icon-shape icon-80 bg-success bg-opacity-10 rounded-circle mx-auto mb-4 d-flex align-items-center justify-content-center">
                                    <i className="bi bi-graph-up-arrow text-success fs-1"></i>
                                </div>
                                <h5 className="fw-bold mb-3">실시간 데이터 연동</h5>
                                <p className="text-muted mb-0">
                                    기업마당 공공데이터와 실시간 연동하여
                                    마감 임박 공고를 놓치지 않고 확인할 수 있습니다.
                                </p>
                            </div>
                        </div>

                        {/* 전문가 네트워크 */}
                        <div className="col-lg-3 col-md-6" data-aos="fade-up" data-aos-delay={300}>
                            <div className="card h-100 border-0 shadow-sm text-center p-4 hover-up">
                                <div className="icon-shape icon-80 bg-warning bg-opacity-10 rounded-circle mx-auto mb-4 d-flex align-items-center justify-content-center">
                                    <i className="bi bi-people text-warning fs-1"></i>
                                </div>
                                <h5 className="fw-bold mb-3">전문가 네트워크</h5>
                                <p className="text-muted mb-0">
                                    R&D, 창업, 수출, 자금 등 분야별 전문가가
                                    지원사업 신청 전 과정을 도와드립니다.
                                </p>
                            </div>
                        </div>

                        {/* 맞춤 알림 서비스 */}
                        <div className="col-lg-3 col-md-6" data-aos="fade-up" data-aos-delay={400}>
                            <div className="card h-100 border-0 shadow-sm text-center p-4 hover-up">
                                <div className="icon-shape icon-80 bg-info bg-opacity-10 rounded-circle mx-auto mb-4 d-flex align-items-center justify-content-center">
                                    <i className="bi bi-bell text-info fs-1"></i>
                                </div>
                                <h5 className="fw-bold mb-3">맞춤 알림 서비스</h5>
                                <p className="text-muted mb-0">
                                    관심 분야 지원사업이 새로 등록되거나
                                    마감이 임박하면 알림을 받아보세요.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* 숫자로 보는 비즈핏 */}
                    <div className="row g-4 mt-5 pt-5 border-top">
                        <div className="col-lg-3 col-md-6 text-center" data-aos="fade-up" data-aos-delay={100}>
                            <div className="display-4 fw-bold text-primary mb-2">5,000+</div>
                            <p className="text-muted mb-0">등록된 지원사업</p>
                        </div>
                        <div className="col-lg-3 col-md-6 text-center" data-aos="fade-up" data-aos-delay={200}>
                            <div className="display-4 fw-bold text-primary mb-2">1,200+</div>
                            <p className="text-muted mb-0">매칭된 기업</p>
                        </div>
                        <div className="col-lg-3 col-md-6 text-center" data-aos="fade-up" data-aos-delay={300}>
                            <div className="display-4 fw-bold text-primary mb-2">50+</div>
                            <p className="text-muted mb-0">전문가 네트워크</p>
                        </div>
                        <div className="col-lg-3 col-md-6 text-center" data-aos="fade-up" data-aos-delay={400}>
                            <div className="display-4 fw-bold text-primary mb-2">4.8</div>
                            <p className="text-muted mb-0">고객 만족도</p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
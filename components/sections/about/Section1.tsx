import Link from "next/link"

export default function Section1() {
    return (
        <>
            {/*bizfit about section 1*/}
            <section className="law-firm-about-section-1 position-relative pt-150 overflow-hidden">
                <div className="container position-relative z-1 pb-250">
                    <div className="row align-items-center">
                        <div className="col-lg-6 order-2 order-lg-1">
                            <div className="position-relative d-inline-block mt-lg-0 mt-5">
                                <div className="position-relative z-0">
                                    <img
                                        className="wow img-custom-anim-left"
                                        src="assets/imgs/pages/law-firm/page-home/home-section-4/img-1.png"
                                        alt="비즈핏"
                                    />
                                </div>
                                <div
                                    className="d-none d-md-block"
                                    data-aos="fade-up"
                                    data-aos-delay={200}
                                >
                                        <img
                                            className="position-absolute z-2 border border-4 border-white shadow"
                                            src="assets/imgs/pages/law-firm/page-home/home-section-4/img-2.png"
                                            alt="비즈핏"
                                            style={{ bottom: '-30px', left: '210px' }}
                                        />
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 order-1 order-lg-2">
                            <span className="content-top btn-text text-primary fw-semibold rounded-pill border border-primary px-3 py-2 bg-white">
                                비즈핏 소개
                            </span>
                            <h2
                                className="mt-3 mb-4"
                                data-aos="fade-right"
                                data-aos-delay={500}
                            >
                                중소기업의 성장을 위한
                                <br />
                                <strong>맞춤형 지원사업 매칭</strong>
                            </h2>
                            <p>
                                비즈핏은 AI 기술을 활용하여 중소기업과 스타트업에 최적화된 
                                정부 지원사업을 자동으로 매칭해주는 플랫폼입니다. 
                                복잡한 지원사업 정보를 한눈에 파악하고, 
                                기업 맞춤형 추천을 받아보세요.
                            </p>
                            <p className="mb-6">
                                기업마당 공공데이터와 실시간 연동하여 항상 최신 정보를 제공하며,
                                분야별 전문가 네트워크를 통해 지원사업 신청부터 
                                사업계획서 작성까지 원스톱으로 지원합니다.
                            </p>
                            <Link href="/contact" className="btn btn-outline-secondary hover-up">
                                <span>문의하기</span>
                                <svg
                                    className="fill-primary"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width={16}
                                    height={16}
                                    viewBox="0 0 16 16"
                                    fill="none"
                                >
                                    <g clipPath="url(#clip0_1008_1294)">
                                        <path
                                            d="M15.8167 7.55759C15.8165 7.5574 15.8163 7.55719 15.8161 7.557L12.5504 4.307C12.3057 4.06353 11.91 4.06444 11.6665 4.30912C11.423 4.55378 11.4239 4.9495 11.6686 5.193L13.8612 7.375H0.625C0.279813 7.375 0 7.65481 0 8C0 8.34519 0.279813 8.625 0.625 8.625H13.8612L11.6686 10.807C11.4239 11.0505 11.423 11.4462 11.6665 11.6909C11.91 11.9356 12.3058 11.9364 12.5504 11.693L15.8162 8.443C15.8163 8.44281 15.8165 8.44259 15.8167 8.4424C16.0615 8.19809 16.0607 7.80109 15.8167 7.55759Z"
                                            fill="#B98E44"
                                        />
                                    </g>
                                </svg>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
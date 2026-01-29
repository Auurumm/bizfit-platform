import Link from "next/link"

export default function Section4() {
    return (
        <>
            {/*bizfit about section 4 - CTA*/}
            <section className="position-relative py-120 bg-primary overflow-hidden">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-8 text-center mx-auto">
                            <h2 className="text-white mb-4">
                                지금 바로 <strong>무료 AI 진단</strong>을 시작하세요
                            </h2>
                            <p className="text-white opacity-75 mb-5 fs-5">
                                2분이면 귀하의 기업에 맞는 지원사업을 추천받을 수 있습니다.
                            </p>
                            <div className="d-flex flex-wrap gap-3 justify-content-center">
                                <Link href="/diagnosis" className="btn btn-light btn-lg hover-up">
                                    <span>AI 진단 시작하기</span>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width={16}
                                        height={16}
                                        viewBox="0 0 16 16"
                                        fill="none"
                                    >
                                        <path
                                            d="M15.8167 7.55759C15.8165 7.5574 15.8163 7.55719 15.8161 7.557L12.5504 4.307C12.3057 4.06353 11.91 4.06444 11.6665 4.30912C11.423 4.55378 11.4239 4.9495 11.6686 5.193L13.8612 7.375H0.625C0.279813 7.375 0 7.65481 0 8C0 8.34519 0.279813 8.625 0.625 8.625H13.8612L11.6686 10.807C11.4239 11.0505 11.423 11.4462 11.6665 11.6909C11.91 11.9356 12.3058 11.9364 12.5504 11.693L15.8162 8.443C15.8163 8.44281 15.8165 8.44259 15.8167 8.4424C16.0615 8.19809 16.0607 7.80109 15.8167 7.55759Z"
                                            fill="currentColor"
                                        />
                                    </svg>
                                </Link>
                                <Link href="/contact" className="btn btn-outline-light btn-lg hover-up">
                                    <span>문의하기</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
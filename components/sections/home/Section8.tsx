import Link from 'next/link'

export default function Section8() {
	return (
		<>
			{/*bizfit CTA 섹션*/}
			<section className="law-firm-home-section-8 pt-120 pb-120 position-relative overflow-hidden bg-dark">
				<div className="container">
					<div className="newsletter-bg rounded-top-5 position-relative">
						<div className="container pt-120 pb-120">
							<div className="row">
								<div className="col-lg-5">
									<span className="content-top btn-text text-primary fw-semibold rounded-pill border border-primary px-3 py-2 bg-transparent">
										문의하기
									</span>
									<h2 className="mt-3 text-white">
										지금 바로
										<strong className="position-relative">
											시작하세요
										</strong>
									</h2>
									<p className="text-white opacity-75 mt-4">
										AI 진단부터 전문가 상담까지, 
										비즈핏이 귀하의 기업 성장을 도와드립니다.
									</p>
									<div className="d-flex flex-md-row flex-column gap-5 mt-7">
										<div>
											<div className="icon">
												<svg
													className="stroke-primary"
													xmlns="http://www.w3.org/2000/svg"
													width={60}
													height={60}
													viewBox="0 0 60 60"
													fill="none"
												>
													<g clipPath="url(#clip0_349_948)">
														<path
															d="M41.25 25C48.845 25 55 30.0375 55 36.25C55 39.7425 53.055 42.8625 50 44.925V50L45.09 47.055C43.8317 47.3522 42.543 47.5015 41.25 47.5C33.655 47.5 27.5 42.4625 27.5 36.25C27.5 30.0375 33.655 25 41.25 25Z"
															stroke="#0D6EFD"
															strokeWidth={2}
															strokeLinecap="round"
															strokeLinejoin="round"
														/>
														<path
															d="M27.9925 39.245C26.2675 39.735 24.4175 40 22.5 40C20.2785 40.0048 18.0717 39.6398 15.97 38.92L10 42.5V35.4975C6.9075 32.7925 5 29.0875 5 25C5 16.715 12.835 10 22.5 10C31.955 10 39.6575 16.425 40 24.4625V25.045"
															stroke="#0D6EFD"
															strokeWidth={2}
															strokeLinecap="round"
															strokeLinejoin="round"
														/>
													</g>
												</svg>
											</div>
											<Link href="mailto:support@bizfit.kr">
												<h6 className="mt-5 mb-3 fs-20 text-white">
													support@bizfit.kr
												</h6>
											</Link>
											<p className="mb-0">
												이메일 문의는 24시간 접수 가능합니다.
											</p>
										</div>
										<div>
											<div className="icon">
												<svg
													className="stroke-primary"
													xmlns="http://www.w3.org/2000/svg"
													width={60}
													height={60}
													viewBox="0 0 60 60"
													fill="none"
												>
													<g clipPath="url(#clip0_349_2617)">
														<path
															d="M29.8325 12.5H12.5V52.5H45V32.5"
															stroke="#0D6EFD"
															strokeWidth={2}
															strokeLinecap="round"
															strokeLinejoin="round"
														/>
														<path
															d="M35 42.5H22.5"
															stroke="#0D6EFD"
															strokeWidth={2}
															strokeLinecap="round"
															strokeLinejoin="round"
														/>
														<path
															d="M22.5 32.5H35V22.5H22.5V32.5Z"
															stroke="#0D6EFD"
															strokeWidth={2}
															strokeLinecap="round"
															strokeLinejoin="round"
														/>
													</g>
												</svg>
											</div>
											<a href="tel:1588-0000">
												<h6 className="mt-5 mb-3 fs-20 text-white">
													1588-0000
												</h6>
											</a>
											<p className="mb-0">
												평일 09:00 - 18:00 상담 가능
											</p>
										</div>
									</div>
									<div className="d-flex flex-wrap gap-3 mt-7">
										<Link href="/diagnosis" className="btn btn-primary">
											<span>무료 AI 진단</span>
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
										<Link href="/contact" className="btn btn-outline-secondary bg-transparent text-white border-white border-opacity-50">
											<span>문의하기</span>
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
								</div>
								<div className="col-lg-6 offset-lg-1 text-end mt-lg-0 mt-8">
									<div className="position-relative d-inline-block">
										<img
											className="position-relative z-1"
											src="assets/imgs/pages/law-firm/page-home/home-section-8/img.png"
											alt="BizFit"
										/>
										<div className="circle-1 position-absolute top-md-50 top-100 start-md-0 start-50 translate-middle z-0" />
										<div className="circle-2 position-absolute top-md-50 top-100 start-md-0 start-50 translate-middle z-0" />
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	)
}
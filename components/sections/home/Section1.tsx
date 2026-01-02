import Link from "next/link";

export default function Section1() {
	return (
		<>
			{/*bizfit home section 1*/}
			<section
				className="law-firm-home-section-1 position-relative pt-150 overflow-hidden"
				data-background="assets/imgs/pages/law-firm/page-home/home-section-1/bg-img.png"
			>
				<div className="overlay" />
				<div className="container position-relative z-1 pt-8 text-lg-start text-center">
					<div className="row align-items-center">
						<div className="col-lg-6 col-md-12 px-md-0 pb-lg-0 pb-10">
							<span className="content-top btn-text text-primary fw-semibold rounded-pill border border-primary px-3 py-2">
								#01 정부지원사업 매칭 플랫폼
							</span>
							<h1 className="text-white ds-1 mt-4 text-anime-style-222">
								정부 지원사업
								<br />
								한눈에 찾고
								<strong className="position-relative text-anime-style-3 ms-3">
									AI로 추천
									<span className="position-absolute top-50 start-50 translate-middle d-none d-md-block">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width={274}
											height={73}
											viewBox="0 0 274 73"
											fill="none"
										>
											<path
												d="M1 41.8062C48.1986 17.6383 163.699 -21.1402 248.109 17.089C353.623 64.8755 91.7525 75.8609 56.2169 70.9174C28.4292 67.0518 -0.640106 29.1729 41.4559 6.10354"
												stroke="#B98E44"
												strokeWidth={2}
											/>
										</svg>
									</span>
								</strong>
							</h1>
							<p className="text-white fs-5 mt-4 opacity-75">
								실시간 정부 지원사업 정보와 AI 기반 맞춤 추천으로
								<br />
								귀하의 기업에 최적화된 지원사업을 찾아보세요
							</p>
							<div className="d-flex flex-wrap gap-3 mt-5 justify-content-lg-start justify-content-center">
								<Link
									href="/diagnosis"
									className="btn btn-primary"
									data-aos="fade-up"
								>
									<span>AI 진단 시작하기</span>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width={16}
										height={16}
										viewBox="0 0 16 16"
										fill="none"
									>
										<g clipPath="url(#clip0_964_205)">
											<path
												d="M15.8167 7.55759C15.8165 7.5574 15.8163 7.55719 15.8161 7.557L12.5504 4.307C12.3057 4.06353 11.91 4.06444 11.6665 4.30912C11.423 4.55378 11.4239 4.9495 11.6686 5.193L13.8612 7.375H0.625C0.279813 7.375 0 7.65481 0 8C0 8.34519 0.279813 8.625 0.625 8.625H13.8612L11.6686 10.807C11.4239 11.0505 11.423 11.4462 11.6665 11.6909C11.91 11.9356 12.3058 11.9364 12.5504 11.693L15.8162 8.443C15.8163 8.44281 15.8165 8.44259 15.8167 8.4424C16.0615 8.19809 16.0607 7.80109 15.8167 7.55759Z"
												fill="white"
											/>
										</g>
									</svg>
								</Link>
								<Link
									href="/programs"
									className="btn btn-outline-secondary bg-transparent text-white border-white border-opacity-50"
									data-aos="fade-up"
									data-aos-delay={200}
								>
									<span>지원사업 둘러보기</span>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width={16}
										height={16}
										viewBox="0 0 16 16"
										fill="none"
									>
										<g clipPath="url(#clip0_964_205)">
											<path
												d="M15.8167 7.55759C15.8165 7.5574 15.8163 7.55719 15.8161 7.557L12.5504 4.307C12.3057 4.06353 11.91 4.06444 11.6665 4.30912C11.423 4.55378 11.4239 4.9495 11.6686 5.193L13.8612 7.375H0.625C0.279813 7.375 0 7.65481 0 8C0 8.34519 0.279813 8.625 0.625 8.625H13.8612L11.6686 10.807C11.4239 11.0505 11.423 11.4462 11.6665 11.6909C11.91 11.9356 12.3058 11.9364 12.5504 11.693L15.8162 8.443C15.8163 8.44281 15.8165 8.44259 15.8167 8.4424C16.0615 8.19809 16.0607 7.80109 15.8167 7.55759Z"
												fill="white"
											/>
										</g>
									</svg>
								</Link>
							</div>
						</div>
						<div className="col-lg-6">
							<div className="position-relative mt-lg-0 mt-80 d-none d-lg-block">
								<div className="position-relative z-1">
									<img
										src="assets/imgs/pages/law-firm/page-home/home-section-1/portrait.png"
										alt="BizFit"
									/>
								</div>
								<div className="position-absolute bottom-0 start-0">
									<div className="bg-circle" data-aos="zoom-in" />
									<div className="position-absolute top-0 end-0 m-6">
										<div className="position-relative z-1">
											<div className="parallax-item">
												<div
													className="icon-shape icon-100 bg-white rounded-circle"
													data-aos="zoom-in"
													data-aos-delay={500}
												>
													{/* AI 브레인 아이콘 */}
													<svg
														xmlns="http://www.w3.org/2000/svg"
														width={40}
														height={40}
														viewBox="0 0 24 24"
														fill="none"
														stroke="#152833"
														strokeWidth={1.5}
														strokeLinecap="round"
														strokeLinejoin="round"
													>
														<path d="M12 4.5a2.5 2.5 0 0 0-4.96-.46 2.5 2.5 0 0 0-1.98 3 2.5 2.5 0 0 0-1.32 4.24 3 3 0 0 0 .34 5.58 2.5 2.5 0 0 0 2.96 3.08 2.5 2.5 0 0 0 4.91.05L12 20V4.5Z"/>
														<path d="M16 8V5c0-1.1.9-2 2-2"/>
														<path d="M12 13h4"/>
														<path d="M12 18h6a2 2 0 0 1 2 2v1"/>
														<path d="M12 8h8"/>
														<path d="M20.5 8a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0Z"/>
														<path d="M16.5 13a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0Z"/>
														<path d="M20.5 21a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0Z"/>
														<path d="M18.5 3a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0Z"/>
													</svg>
												</div>
											</div>
										</div>
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
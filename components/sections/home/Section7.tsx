'use client'
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, Navigation, Pagination } from "swiper/modules"
import Link from "next/link"

const swiperOptions = {
	modules: [Autoplay, Pagination, Navigation],
	slidesPerView: 4,
	spaceBetween: 30,
	autoplay: {
		delay: 3000,
		disableOnInteraction: false,
	},
	loop: true,
	breakpoints: {
		320: {
			slidesPerView: 1,
			spaceBetween: 30,
		},
		575: {
			slidesPerView: 2,
			spaceBetween: 30,
		},
		767: {
			slidesPerView: 2,
			spaceBetween: 30,
		},
		991: {
			slidesPerView: 4,
			spaceBetween: 30,
		},
	}
}

export default function Section7() {
	return (
		<>
			{/*bizfit 전문가 소개*/}
			<section className="law-firm-home-section-7 position-relative overflow-hidden pt-120 pb-120 bg-secondary-2">
				<div className="container">
					<div className="text-center">
						<span className="content-top btn-text text-primary fw-semibold rounded-pill border border-primary px-3 py-2 bg-white">
							전문가 네트워크
						</span>
						<h2 className="mt-3">
							분야별 전문가와 상담하세요
						</h2>
						<p className="text-muted mt-3">
							지원사업 신청부터 사업계획서 작성까지, 전문가가 도와드립니다
						</p>
					</div>
					<div className="row pt-80">
						<div className="col-12 position-relative">
							<Swiper {...swiperOptions} className="swiper slider-4 ps-3">
								<div className="swiper-wrapper z-1">
									<SwiperSlide>
										<div className="card-team overflow-hidden">
											<div className="position-relative d-inline-flex">
												<img
													src="assets/imgs/pages/law-firm/page-home/home-section-7/img-1.png"
													alt="R&D 전문가"
												/>
												<div className="team-overlay">
													<div className="position-absolute top-50 start-50 translate-middle">
														<Link href="/experts" className="btn btn-primary btn-sm">
															상담 문의
														</Link>
													</div>
												</div>
											</div>
											<p className="btn-text text-primary mt-5">R&D 분야</p>
											<Link href="/experts">
												<h5>
													김기술 <strong>전문위원</strong>
												</h5>
											</Link>
											<p className="text-muted small">
												기술개발, 연구개발 지원사업 전문
											</p>
										</div>
									</SwiperSlide>
									<SwiperSlide>
										<div className="card-team overflow-hidden">
											<div className="position-relative d-inline-flex">
												<img
													src="assets/imgs/pages/law-firm/page-home/home-section-7/img-2.png"
													alt="창업 전문가"
												/>
												<div className="team-overlay">
													<div className="position-absolute top-50 start-50 translate-middle">
														<Link href="/experts" className="btn btn-primary btn-sm">
															상담 문의
														</Link>
													</div>
												</div>
											</div>
											<p className="btn-text text-primary mt-5">창업 분야</p>
											<Link href="/experts">
												<h5>
													박창업 <strong>컨설턴트</strong>
												</h5>
											</Link>
											<p className="text-muted small">
												예비창업, 초기창업 지원사업 전문
											</p>
										</div>
									</SwiperSlide>
									<SwiperSlide>
										<div className="card-team overflow-hidden">
											<div className="position-relative d-inline-flex">
												<img
													src="assets/imgs/pages/law-firm/page-home/home-section-7/img-3.png"
													alt="수출 전문가"
												/>
												<div className="team-overlay">
													<div className="position-absolute top-50 start-50 translate-middle">
														<Link href="/experts" className="btn btn-primary btn-sm">
															상담 문의
														</Link>
													</div>
												</div>
											</div>
											<p className="btn-text text-primary mt-5">수출 분야</p>
											<Link href="/experts">
												<h5>
													이글로벌 <strong>매니저</strong>
												</h5>
											</Link>
											<p className="text-muted small">
												해외진출, 수출바우처 지원사업 전문
											</p>
										</div>
									</SwiperSlide>
									<SwiperSlide>
										<div className="card-team overflow-hidden">
											<div className="position-relative d-inline-flex">
												<img
													src="assets/imgs/pages/law-firm/page-home/home-section-7/img-4.png"
													alt="자금 전문가"
												/>
												<div className="team-overlay">
													<div className="position-absolute top-50 start-50 translate-middle">
														<Link href="/experts" className="btn btn-primary btn-sm">
															상담 문의
														</Link>
													</div>
												</div>
											</div>
											<p className="btn-text text-primary mt-5">자금 분야</p>
											<Link href="/experts">
												<h5>
													최자금 <strong>팀장</strong>
												</h5>
											</Link>
											<p className="text-muted small">
												정책자금, 투자유치 지원사업 전문
											</p>
										</div>
									</SwiperSlide>
									<SwiperSlide>
										<div className="card-team overflow-hidden">
											<div className="position-relative d-inline-flex">
												<img
													src="assets/imgs/pages/law-firm/page-home/home-section-7/img-2.png"
													alt="고용 전문가"
												/>
												<div className="team-overlay">
													<div className="position-absolute top-50 start-50 translate-middle">
														<Link href="/experts" className="btn btn-primary btn-sm">
															상담 문의
														</Link>
													</div>
												</div>
											</div>
											<p className="btn-text text-primary mt-5">고용 분야</p>
											<Link href="/experts">
												<h5>
													정인사 <strong>전문위원</strong>
												</h5>
											</Link>
											<p className="text-muted small">
												채용지원, 고용유지 지원사업 전문
											</p>
										</div>
									</SwiperSlide>
								</div>
							</Swiper>
						</div>
					</div>
					<div className="text-center mt-8">
						<Link href="/experts" className="btn btn-outline-secondary">
							<span>전체 전문가 보기</span>
							<svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 16 16" fill="none">
								<path d="M15.8167 7.55759C15.8165 7.5574 15.8163 7.55719 15.8161 7.557L12.5504 4.307C12.3057 4.06353 11.91 4.06444 11.6665 4.30912C11.423 4.55378 11.4239 4.9495 11.6686 5.193L13.8612 7.375H0.625C0.279813 7.375 0 7.65481 0 8C0 8.34519 0.279813 8.625 0.625 8.625H13.8612L11.6686 10.807C11.4239 11.0505 11.423 11.4462 11.6665 11.6909C11.91 11.9356 12.3058 11.9364 12.5504 11.693L15.8162 8.443C15.8163 8.44281 15.8165 8.44259 15.8167 8.4424C16.0615 8.19809 16.0607 7.80109 15.8167 7.55759Z" fill="#B98E44"/>
							</svg>
						</Link>
					</div>
				</div>
			</section>
		</>
	)
}
'use client'
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, Navigation, Pagination } from "swiper/modules"
import Link from 'next/link'

const swiperOptions = {
	modules: [Autoplay, Pagination, Navigation],
	slidesPerView: 3,
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
			slidesPerView: 2,
			spaceBetween: 30,
		},
		1199: {
			slidesPerView: 3,
			spaceBetween: 30,
		},
	}
}

export default function Section3() {
	return (
		<>
			{/*bizfit 지원사업 분야*/}
			<section className="law-firm-home-section-3 position-relative py-120 bg-dark">
				<div className="container">
					<div className="mb-80 swipper-root">
						<span className="content-top btn-text text-primary fw-semibold rounded-pill border border-primary px-3 py-2">
							지원사업 분야
						</span>
						<h2 className="text-white mt-3">
							다양한 분야의 지원사업
						</h2>
					</div>
				</div>
				{/* Swiper */}
				<div className="box-swiper-padding container">
					<Swiper {...swiperOptions} className="swiper slider-4">
						<div className="swiper-wrapper z-1">
							{/* R&D 지원 */}
							<SwiperSlide>
								<div className="card-service position-relative d-inline-block overflow-hidden">
									<div className="card-btn">
										<img
											src="assets/imgs/pages/law-firm/page-home/home-section-3/img-1.png"
											alt="R&D 지원"
										/>
										<div className="position-absolute top-50 start-50 translate-middle">
											<Link
												href="/support-programs?category=rnd"
												className="btn btn-primary hover-up"
											>
												<span>자세히 보기</span>
												<svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 16 16" fill="none">
													<path d="M15.8167 7.55759C15.8165 7.5574 15.8163 7.55719 15.8161 7.557L12.5504 4.307C12.3057 4.06353 11.91 4.06444 11.6665 4.30912C11.423 4.55378 11.4239 4.9495 11.6686 5.193L13.8612 7.375H0.625C0.279813 7.375 0 7.65481 0 8C0 8.34519 0.279813 8.625 0.625 8.625H13.8612L11.6686 10.807C11.4239 11.0505 11.423 11.4462 11.6665 11.6909C11.91 11.9356 12.3058 11.9364 12.5504 11.693L15.8162 8.443C15.8163 8.44281 15.8165 8.44259 15.8167 8.4424C16.0615 8.19809 16.0607 7.80109 15.8167 7.55759Z" fill="white"/>
												</svg>
											</Link>
										</div>
									</div>
									<div className="card-content position-absolute top-50 start-50 w-100 h-100 z-1 translate-middle p-5 d-flex flex-column border border-white border-opacity-10 bg-transparent d-inline-block">
										<svg xmlns="http://www.w3.org/2000/svg" width={70} height={70} viewBox="0 0 24 24" fill="none" stroke="#B98E44" strokeWidth={1.5}>
											<path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z"/>
											<path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z"/>
										</svg>
										<h6 className="text-white mt-auto">
											R&D <strong>지원사업</strong>
										</h6>
										<p className="text-white text-opacity-75 mb-4">
											기술개발, 연구개발 관련<br />
											정부 지원사업을 찾아보세요
										</p>
										<Link href="/support-programs?category=rnd" className="text-white text-opacity-50 btn-text">
											자세히 보기
										</Link>
									</div>
								</div>
							</SwiperSlide>

							{/* 창업 지원 */}
							<SwiperSlide>
								<div className="card-service position-relative d-inline-block overflow-hidden">
									<div className="card-btn">
										<img
											src="assets/imgs/pages/law-firm/page-home/home-section-3/img-1.png"
											alt="창업 지원"
										/>
										<div className="position-absolute top-50 start-50 translate-middle">
											<Link
												href="/support-programs?category=startup"
												className="btn btn-primary hover-up"
											>
												<span>자세히 보기</span>
												<svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 16 16" fill="none">
													<path d="M15.8167 7.55759C15.8165 7.5574 15.8163 7.55719 15.8161 7.557L12.5504 4.307C12.3057 4.06353 11.91 4.06444 11.6665 4.30912C11.423 4.55378 11.4239 4.9495 11.6686 5.193L13.8612 7.375H0.625C0.279813 7.375 0 7.65481 0 8C0 8.34519 0.279813 8.625 0.625 8.625H13.8612L11.6686 10.807C11.4239 11.0505 11.423 11.4462 11.6665 11.6909C11.91 11.9356 12.3058 11.9364 12.5504 11.693L15.8162 8.443C15.8163 8.44281 15.8165 8.44259 15.8167 8.4424C16.0615 8.19809 16.0607 7.80109 15.8167 7.55759Z" fill="white"/>
												</svg>
											</Link>
										</div>
									</div>
									<div className="card-content position-absolute top-50 start-50 w-100 h-100 z-1 translate-middle p-5 d-flex flex-column border border-white border-opacity-10 bg-transparent d-inline-block">
										<svg xmlns="http://www.w3.org/2000/svg" width={70} height={70} viewBox="0 0 24 24" fill="none" stroke="#B98E44" strokeWidth={1.5}>
											<path d="M12 20h9"/>
											<path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
										</svg>
										<h6 className="text-white mt-auto">
											창업 <strong>지원사업</strong>
										</h6>
										<p className="text-white text-opacity-75 mb-4">
											예비창업자, 초기창업기업을 위한<br />
											다양한 지원사업
										</p>
										<Link href="/support-programs?category=startup" className="text-white text-opacity-50 btn-text">
											자세히 보기
										</Link>
									</div>
								</div>
							</SwiperSlide>

							{/* 수출 지원 */}
							<SwiperSlide>
								<div className="card-service position-relative d-inline-block overflow-hidden">
									<div className="card-btn">
										<img
											src="assets/imgs/pages/law-firm/page-home/home-section-3/img-1.png"
											alt="수출 지원"
										/>
										<div className="position-absolute top-50 start-50 translate-middle">
											<Link
												href="/support-programs?category=export"
												className="btn btn-primary hover-up"
											>
												<span>자세히 보기</span>
												<svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 16 16" fill="none">
													<path d="M15.8167 7.55759C15.8165 7.5574 15.8163 7.55719 15.8161 7.557L12.5504 4.307C12.3057 4.06353 11.91 4.06444 11.6665 4.30912C11.423 4.55378 11.4239 4.9495 11.6686 5.193L13.8612 7.375H0.625C0.279813 7.375 0 7.65481 0 8C0 8.34519 0.279813 8.625 0.625 8.625H13.8612L11.6686 10.807C11.4239 11.0505 11.423 11.4462 11.6665 11.6909C11.91 11.9356 12.3058 11.9364 12.5504 11.693L15.8162 8.443C15.8163 8.44281 15.8165 8.44259 15.8167 8.4424C16.0615 8.19809 16.0607 7.80109 15.8167 7.55759Z" fill="white"/>
												</svg>
											</Link>
										</div>
									</div>
									<div className="card-content position-absolute top-50 start-50 w-100 h-100 z-1 translate-middle p-5 d-flex flex-column border border-white border-opacity-10 bg-transparent d-inline-block">
										<svg xmlns="http://www.w3.org/2000/svg" width={70} height={70} viewBox="0 0 24 24" fill="none" stroke="#B98E44" strokeWidth={1.5}>
											<circle cx="12" cy="12" r="10"/>
											<line x1="2" y1="12" x2="22" y2="12"/>
											<path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
										</svg>
										<h6 className="text-white mt-auto">
											수출 <strong>지원사업</strong>
										</h6>
										<p className="text-white text-opacity-75 mb-4">
											해외진출, 수출 바우처 등<br />
											글로벌 성장 지원
										</p>
										<Link href="/support-programs?category=export" className="text-white text-opacity-50 btn-text">
											자세히 보기
										</Link>
									</div>
								</div>
							</SwiperSlide>

							{/* 고용 지원 */}
							<SwiperSlide>
								<div className="card-service position-relative d-inline-block overflow-hidden">
									<div className="card-btn">
										<img
											src="assets/imgs/pages/law-firm/page-home/home-section-3/img-1.png"
											alt="고용 지원"
										/>
										<div className="position-absolute top-50 start-50 translate-middle">
											<Link
												href="/support-programs?category=employment"
												className="btn btn-primary hover-up"
											>
												<span>자세히 보기</span>
												<svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 16 16" fill="none">
													<path d="M15.8167 7.55759C15.8165 7.5574 15.8163 7.55719 15.8161 7.557L12.5504 4.307C12.3057 4.06353 11.91 4.06444 11.6665 4.30912C11.423 4.55378 11.4239 4.9495 11.6686 5.193L13.8612 7.375H0.625C0.279813 7.375 0 7.65481 0 8C0 8.34519 0.279813 8.625 0.625 8.625H13.8612L11.6686 10.807C11.4239 11.0505 11.423 11.4462 11.6665 11.6909C11.91 11.9356 12.3058 11.9364 12.5504 11.693L15.8162 8.443C15.8163 8.44281 15.8165 8.44259 15.8167 8.4424C16.0615 8.19809 16.0607 7.80109 15.8167 7.55759Z" fill="white"/>
												</svg>
											</Link>
										</div>
									</div>
									<div className="card-content position-absolute top-50 start-50 w-100 h-100 z-1 translate-middle p-5 d-flex flex-column border border-white border-opacity-10 bg-transparent d-inline-block">
										<svg xmlns="http://www.w3.org/2000/svg" width={70} height={70} viewBox="0 0 24 24" fill="none" stroke="#B98E44" strokeWidth={1.5}>
											<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
											<circle cx="9" cy="7" r="4"/>
											<path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
											<path d="M16 3.13a4 4 0 0 1 0 7.75"/>
										</svg>
										<h6 className="text-white mt-auto">
											고용 <strong>지원사업</strong>
										</h6>
										<p className="text-white text-opacity-75 mb-4">
											인력채용, 고용유지 등<br />
											인력 관련 지원사업
										</p>
										<Link href="/support-programs?category=employment" className="text-white text-opacity-50 btn-text">
											자세히 보기
										</Link>
									</div>
								</div>
							</SwiperSlide>

							{/* 자금 지원 */}
							<SwiperSlide>
								<div className="card-service position-relative d-inline-block overflow-hidden">
									<div className="card-btn">
										<img
											src="assets/imgs/pages/law-firm/page-home/home-section-3/img-1.png"
											alt="자금 지원"
										/>
										<div className="position-absolute top-50 start-50 translate-middle">
											<Link
												href="/support-programs?category=funding"
												className="btn btn-primary hover-up"
											>
												<span>자세히 보기</span>
												<svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 16 16" fill="none">
													<path d="M15.8167 7.55759C15.8165 7.5574 15.8163 7.55719 15.8161 7.557L12.5504 4.307C12.3057 4.06353 11.91 4.06444 11.6665 4.30912C11.423 4.55378 11.4239 4.9495 11.6686 5.193L13.8612 7.375H0.625C0.279813 7.375 0 7.65481 0 8C0 8.34519 0.279813 8.625 0.625 8.625H13.8612L11.6686 10.807C11.4239 11.0505 11.423 11.4462 11.6665 11.6909C11.91 11.9356 12.3058 11.9364 12.5504 11.693L15.8162 8.443C15.8163 8.44281 15.8165 8.44259 15.8167 8.4424C16.0615 8.19809 16.0607 7.80109 15.8167 7.55759Z" fill="white"/>
												</svg>
											</Link>
										</div>
									</div>
									<div className="card-content position-absolute top-50 start-50 w-100 h-100 z-1 translate-middle p-5 d-flex flex-column border border-white border-opacity-10 bg-transparent d-inline-block">
										<svg xmlns="http://www.w3.org/2000/svg" width={70} height={70} viewBox="0 0 24 24" fill="none" stroke="#B98E44" strokeWidth={1.5}>
											<line x1="12" y1="1" x2="12" y2="23"/>
											<path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
										</svg>
										<h6 className="text-white mt-auto">
											자금 <strong>지원사업</strong>
										</h6>
										<p className="text-white text-opacity-75 mb-4">
											정책자금, 보증, 융자 등<br />
											자금 조달 지원
										</p>
										<Link href="/support-programs?category=funding" className="text-white text-opacity-50 btn-text">
											자세히 보기
										</Link>
									</div>
								</div>
							</SwiperSlide>

							{/* 교육/컨설팅 */}
							<SwiperSlide>
								<div className="card-service position-relative d-inline-block overflow-hidden">
									<div className="card-btn">
										<img
											src="assets/imgs/pages/law-firm/page-home/home-section-3/img-1.png"
											alt="교육/컨설팅"
										/>
										<div className="position-absolute top-50 start-50 translate-middle">
											<Link
												href="/support-programs?category=education"
												className="btn btn-primary hover-up"
											>
												<span>자세히 보기</span>
												<svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 16 16" fill="none">
													<path d="M15.8167 7.55759C15.8165 7.5574 15.8163 7.55719 15.8161 7.557L12.5504 4.307C12.3057 4.06353 11.91 4.06444 11.6665 4.30912C11.423 4.55378 11.4239 4.9495 11.6686 5.193L13.8612 7.375H0.625C0.279813 7.375 0 7.65481 0 8C0 8.34519 0.279813 8.625 0.625 8.625H13.8612L11.6686 10.807C11.4239 11.0505 11.423 11.4462 11.6665 11.6909C11.91 11.9356 12.3058 11.9364 12.5504 11.693L15.8162 8.443C15.8163 8.44281 15.8165 8.44259 15.8167 8.4424C16.0615 8.19809 16.0607 7.80109 15.8167 7.55759Z" fill="white"/>
												</svg>
											</Link>
										</div>
									</div>
									<div className="card-content position-absolute top-50 start-50 w-100 h-100 z-1 translate-middle p-5 d-flex flex-column border border-white border-opacity-10 bg-transparent d-inline-block">
										<svg xmlns="http://www.w3.org/2000/svg" width={70} height={70} viewBox="0 0 24 24" fill="none" stroke="#B98E44" strokeWidth={1.5}>
											<path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
											<path d="M6 12v5c3 3 9 3 12 0v-5"/>
										</svg>
										<h6 className="text-white mt-auto">
											교육 <strong>컨설팅</strong>
										</h6>
										<p className="text-white text-opacity-75 mb-4">
											경영컨설팅, 교육훈련 등<br />
											역량강화 지원
										</p>
										<Link href="/support-programs?category=education" className="text-white text-opacity-50 btn-text">
											자세히 보기
										</Link>
									</div>
								</div>
							</SwiperSlide>
						</div>
					</Swiper>
				</div>
			</section>
		</>
	)
}
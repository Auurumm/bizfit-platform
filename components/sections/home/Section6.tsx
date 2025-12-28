'use client'
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, Navigation, Pagination } from "swiper/modules"
import Link from "next/link"

const swiperOptions = {
	modules: [Autoplay, Pagination, Navigation],
	slidesPerView: 1,
	spaceBetween: 30,
	autoplay: {
		delay: 4000,
		disableOnInteraction: false,
	},
	loop: true,
}

export default function Section6() {
	return (
		<>
			{/*bizfit 고객 후기*/}
			<section className="law-firm-home-section-6 position-relative overflow-hidden pt-120 pb-120">
				<div className="container">
					<div className="text-center">
						<span className="content-top btn-text text-primary fw-semibold rounded-pill border border-primary px-3 py-2 bg-white">
							고객 후기
						</span>
						<h2 className="mt-3">
							비즈핏을 이용한 기업들의 이야기
						</h2>
					</div>
					<div className="row mt-80">
						<div className="col-12">
							<Swiper {...swiperOptions} className="swiper slider-1 overflow-visible pb-2">
								<div className="swiper-wrapper z-1">
									<SwiperSlide>
										<div className="card-testimonial py-5 px-lg-5 px-4 pb-0 rounded-top-5 position-relative">
											<div className="row align-self-stretch position-relative z-1">
												<div className="col-lg-7 p-5 pe-lg-0 border">
													<div className="h-100 d-flex flex-column">
														<div className="d-flex gap-2">
															<i className="bi bi-star-fill text-primary fs-7" />
															<i className="bi bi-star-fill text-primary fs-7" />
															<i className="bi bi-star-fill text-primary fs-7" />
															<i className="bi bi-star-fill text-primary fs-7" />
															<i className="bi bi-star-fill text-primary fs-7" />
														</div>
														<h5 className="mt-3 pb-7 mb-auto pe-lg-8">
															" 비즈핏 덕분에 저희 스타트업에 딱 맞는 정부 지원사업을 
															빠르게 찾을 수 있었습니다. AI 진단이 정말 정확해서 놀랐어요. 
															덕분에 3천만원 규모의 R&D 지원금을 받게 되었습니다. "
														</h5>
														<div className="d-flex align-items-center justify-content-between flex-column flex-md-row border-top pt-3">
															<div className="text-start mt-3">
																<span className="btn-text">김민수 대표</span>
																<p className="fs-7 text-primary">
																	테크스타트업 ABC, 대표이사
																</p>
															</div>
															<div className="right d-flex gap-2 pe-lg-8">
																<div>
																	<h6 className="text-primary mb-0">3,000만원</h6>
																	<p className="mb-0 text-dark">지원금 수혜</p>
																</div>
															</div>
														</div>
													</div>
												</div>
												<div className="col-lg-5 ps-lg-0 d-none d-lg-block">
													<div className="position-relative text-center">
														<img
															src="assets/imgs/pages/law-firm/page-home/home-section-6/img-1.png"
															alt="BizFit"
														/>
													</div>
												</div>
											</div>
										</div>
									</SwiperSlide>
									<SwiperSlide>
										<div className="card-testimonial py-5 px-lg-5 px-4 pb-0 rounded-top-5 position-relative">
											<div className="row align-self-stretch position-relative z-1">
												<div className="col-lg-7 p-5 pe-lg-0 border">
													<div className="h-100 d-flex flex-column">
														<div className="d-flex gap-2">
															<i className="bi bi-star-fill text-primary fs-7" />
															<i className="bi bi-star-fill text-primary fs-7" />
															<i className="bi bi-star-fill text-primary fs-7" />
															<i className="bi bi-star-fill text-primary fs-7" />
															<i className="bi bi-star-fill text-primary fs-7" />
														</div>
														<h5 className="mt-3 pb-7 mb-auto pe-lg-8">
															" 제조업 분야 지원사업이 너무 많아서 어디서부터 
															시작해야 할지 막막했는데, 비즈핏이 딱 맞는 사업을 
															추천해줬어요. 전문가 상담까지 연결되어 신청도 수월했습니다. "
														</h5>
														<div className="d-flex align-items-center justify-content-between flex-column flex-md-row border-top pt-3">
															<div className="text-start mt-3">
																<span className="btn-text">박영희 이사</span>
																<p className="fs-7 text-primary">
																	정밀제조 XYZ, 경영지원 이사
																</p>
															</div>
															<div className="right d-flex gap-2 pe-lg-8">
																<div>
																	<h6 className="text-primary mb-0">5,000만원</h6>
																	<p className="mb-0 text-dark">지원금 수혜</p>
																</div>
															</div>
														</div>
													</div>
												</div>
												<div className="col-lg-5 ps-lg-0 d-none d-lg-block">
													<div className="position-relative text-center">
														<img
															src="assets/imgs/pages/law-firm/page-home/home-section-6/img-2.png"
															alt="BizFit"
														/>
													</div>
												</div>
											</div>
										</div>
									</SwiperSlide>
									<SwiperSlide>
										<div className="card-testimonial py-5 px-lg-5 px-4 pb-0 rounded-top-5 position-relative">
											<div className="row align-self-stretch position-relative z-1">
												<div className="col-lg-7 p-5 pe-lg-0 border">
													<div className="h-100 d-flex flex-column">
														<div className="d-flex gap-2">
															<i className="bi bi-star-fill text-primary fs-7" />
															<i className="bi bi-star-fill text-primary fs-7" />
															<i className="bi bi-star-fill text-primary fs-7" />
															<i className="bi bi-star-fill text-primary fs-7" />
															<i className="bi bi-star-fill text-primary fs-7" />
														</div>
														<h5 className="mt-3 pb-7 mb-auto pe-lg-8">
															" 소상공인으로서 정보 접근이 어려웠는데, 비즈핏 덕분에 
															소상공인 전용 지원사업들을 한눈에 볼 수 있어서 좋았습니다. 
															특히 실시간 업데이트가 정말 유용해요. "
														</h5>
														<div className="d-flex align-items-center justify-content-between flex-column flex-md-row border-top pt-3">
															<div className="text-start mt-3">
																<span className="btn-text">이준호 대표</span>
																<p className="fs-7 text-primary">
																	카페 모닝글로리, 대표
																</p>
															</div>
															<div className="right d-flex gap-2 pe-lg-8">
																<div>
																	<h6 className="text-primary mb-0">1,500만원</h6>
																	<p className="mb-0 text-dark">지원금 수혜</p>
																</div>
															</div>
														</div>
													</div>
												</div>
												<div className="col-lg-5 ps-lg-0 d-none d-lg-block">
													<div className="position-relative text-center">
														<img
															src="assets/imgs/pages/law-firm/page-home/home-section-6/img-3.png"
															alt="BizFit"
														/>
													</div>
												</div>
											</div>
										</div>
									</SwiperSlide>
								</div>
							</Swiper>
						</div>
					</div>
				</div>
			</section>
		</>
	)
}
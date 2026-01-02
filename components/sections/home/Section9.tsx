import Link from 'next/link'

export default function Section9() {
	return (
		<>
			{/*bizfit 최신 지원사업*/}
			<section className="law-firm-home-section-9 pt-120 pb-120 position-relative overflow-hidden">
				<div className="container">
					<div className="text-center">
						<span className="content-top btn-text text-primary fw-semibold rounded-pill border border-primary px-3 py-2 bg-white">
							최신 지원사업
						</span>
						<h2 className="mt-3">
							새로 등록된 지원사업
						</h2>
					</div>
					<div className="row mt-8">
						<div className="col-lg-4">
							<div className="card-news position-relative mb-lg-0 mb-8 hover-up">
								<Link
									href="/programs"
									className="card-news-img position-relative d-block"
								>
									<img
										className="w-100"
										src="assets/imgs/pages/law-firm/page-home/home-section-9/img-1.png"
										alt="BizFit"
									/>
									<span className="text-uppercase fw-bold fs-8 text-white bg-primary px-2 py-1 position-absolute top-100 end-0 translate-middle-y me-5 z-1">
										R&D
									</span>
								</Link>
								<div className="card-news-body">
									<div className="d-flex card-news-information mt-5 gap-4">
										<div className="d-flex align-items-center gap-1">
											<i className="bi bi-calendar text-primary"></i>
											<p className="mb-0">2025.01.15 마감</p>
										</div>
										<div className="d-flex align-items-center gap-1">
											<i className="bi bi-building text-primary"></i>
											<span className="mb-0">중소벤처기업부</span>
										</div>
									</div>
									<div className="card-news-title mt-2">
										<Link href="/programs">
											<h6>2025년 중소기업 R&D 역량강화 지원사업</h6>
										</Link>
									</div>
								</div>
							</div>
						</div>
						<div className="col-lg-4">
							<div className="card-news position-relative mb-lg-0 mb-8 hover-up">
								<Link
									href="/programs"
									className="card-news-img position-relative d-block"
								>
									<img
										className="w-100"
										src="assets/imgs/pages/law-firm/page-home/home-section-9/img-2.png"
										alt="BizFit"
									/>
									<span className="text-uppercase fw-bold fs-8 text-white bg-primary px-2 py-1 position-absolute top-100 end-0 translate-middle-y me-5 z-1">
										수출
									</span>
								</Link>
								<div className="card-news-body">
									<div className="d-flex card-news-information mt-5 gap-4">
										<div className="d-flex align-items-center gap-1">
											<i className="bi bi-calendar text-primary"></i>
											<p className="mb-0">2025.02.28 마감</p>
										</div>
										<div className="d-flex align-items-center gap-1">
											<i className="bi bi-building text-primary"></i>
											<span className="mb-0">KOTRA</span>
										</div>
									</div>
									<div className="card-news-title mt-2">
										<Link href="/programs">
											<h6>글로벌 수출 바우처 지원사업</h6>
										</Link>
									</div>
								</div>
							</div>
						</div>
						<div className="col-lg-4">
							<div className="card-news position-relative mb-lg-0 mb-8 hover-up">
								<Link
									href="/programs"
									className="card-news-img position-relative d-block"
								>
									<img
										className="w-100"
										src="assets/imgs/pages/law-firm/page-home/home-section-9/img-3.png"
										alt="BizFit"
									/>
									<span className="text-uppercase fw-bold fs-8 text-white bg-primary px-2 py-1 position-absolute top-100 end-0 translate-middle-y me-5 z-1">
										고용
									</span>
								</Link>
								<div className="card-news-body">
									<div className="d-flex card-news-information mt-5 gap-4">
										<div className="d-flex align-items-center gap-1">
											<i className="bi bi-calendar text-primary"></i>
											<p className="mb-0">2025.03.31 마감</p>
										</div>
										<div className="d-flex align-items-center gap-1">
											<i className="bi bi-building text-primary"></i>
											<span className="mb-0">고용노동부</span>
										</div>
									</div>
									<div className="card-news-title mt-2">
										<Link href="/programs">
											<h6>청년 디지털 일자리 사업</h6>
										</Link>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="text-center mt-8">
						<Link href="/programs" className="btn btn-outline-secondary">
							<span>전체 지원사업 보기</span>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width={16}
								height={16}
								viewBox="0 0 16 16"
								fill="none"
							>
								<path
									d="M15.8167 7.55759C15.8165 7.5574 15.8163 7.55719 15.8161 7.557L12.5504 4.307C12.3057 4.06353 11.91 4.06444 11.6665 4.30912C11.423 4.55378 11.4239 4.9495 11.6686 5.193L13.8612 7.375H0.625C0.279813 7.375 0 7.65481 0 8C0 8.34519 0.279813 8.625 0.625 8.625H13.8612L11.6686 10.807C11.4239 11.0505 11.423 11.4462 11.6665 11.6909C11.91 11.9356 12.3058 11.9364 12.5504 11.693L15.8162 8.443C15.8163 8.44281 15.8165 8.44259 15.8167 8.4424C16.0615 8.19809 16.0607 7.80109 15.8167 7.55759Z"
									fill="#B98E44"
								/>
							</svg>
						</Link>
					</div>
				</div>
			</section>
		</>
	)
}
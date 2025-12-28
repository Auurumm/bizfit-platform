import Link from "next/link"

export default function Section4() {
	return (
		<>
			{/*bizfit FAQ 섹션*/}
			<section className="law-firm-home-section-4 position-relative overflow-hidden pt-120">
				<div className="container position-relative z-1 pb-md-250">
					<div className="row align-items-center">
						<div className="col-lg-6 order-2 order-lg-1">
							<div className="position-relative d-inline-block mt-lg-0 mt-5">
								<div className="position-relative z-0">
									<img
										className="wow img-custom-anim-left"
										src="assets/imgs/pages/law-firm/page-home/home-section-4/img-1.png"
										alt="BizFit"
									/>
								</div>
								<div className="d-none d-md-block">
									<img
										className="position-absolute top-100 start-100 z-2 translate-middle z-1 border border-4 border-white shadow"
										src="assets/imgs/pages/law-firm/page-home/home-section-4/img-2.png"
										alt="BizFit"
									/>
								</div>
							</div>
						</div>
						<div className="col-lg-6 mt-lg-0 mt-8 order-1 order-lg-2">
							<span className="content-top btn-text text-primary fw-semibold rounded-pill border border-primary px-3 py-2 bg-white">
								자주 묻는 질문
							</span>
							<h2 className="mt-3">
								궁금한 점을
								<strong className="position-relative ms-3">
									해결하세요
								</strong>
							</h2>
							<div className="accordion mt-8">
								<div className="px-0 card border-0 mb-3 collapse-custom">
									<div className="p-0 card-header border-0 rounded-3">
										<Link
											className="px-5 py-2 fw-bold d-flex align-items-center"
											data-bs-toggle="collapse"
											href="#collapse-1"
										>
											<h6 className="text-dark fs-20 mb-0">
												비즈핏은 어떤 서비스인가요?
											</h6>
											<span className="ms-auto arrow" />
										</Link>
									</div>
									<div
										id="collapse-1"
										className="collapse show"
										data-bs-parent=".accordion"
									>
										<p className="px-5 fs-6 fw-regular">
											비즈핏은 AI 기술을 활용하여 귀하의 기업에 최적화된 정부 지원사업을 
											자동으로 매칭해주는 플랫폼입니다. 실시간 공공데이터와 연동하여 
											항상 최신 지원사업 정보를 제공합니다.
										</p>
									</div>
								</div>
								<div className="px-0 card border-0 mb-3 collapse-custom">
									<div className="p-0 card-header border-0 rounded-3">
										<Link
											className="collapsed px-5 py-2 fw-bold d-flex align-items-center"
											data-bs-toggle="collapse"
											href="#collapse-2"
										>
											<h6 className="text-dark fs-20 mb-0">
												AI 진단은 얼마나 걸리나요?
											</h6>
											<span className="ms-auto arrow" />
										</Link>
									</div>
									<div
										id="collapse-2"
										className="collapse"
										data-bs-parent=".accordion"
									>
										<p className="px-5 fs-6 fw-regular">
											간단한 기업 정보 입력만으로 약 2분 내에 AI 진단이 완료됩니다. 
											진단 결과를 바탕으로 맞춤형 지원사업 리스트를 바로 확인하실 수 있습니다.
										</p>
									</div>
								</div>
								<div className="px-0 card border-0 mb-3 collapse-custom">
									<div className="p-0 card-header border-0 rounded-3">
										<Link
											className="collapsed px-5 py-2 fw-bold d-flex align-items-center"
											data-bs-toggle="collapse"
											href="#collapse-3"
										>
											<h6 className="text-dark fs-20 mb-0">
												전문가 상담은 어떻게 받나요?
											</h6>
											<span className="ms-auto arrow" />
										</Link>
									</div>
									<div
										id="collapse-3"
										className="collapse"
										data-bs-parent=".accordion"
									>
										<p className="px-5 fs-6 fw-regular">
											전문가 페이지에서 분야별 전문가 프로필을 확인하고 
											문의하기 버튼을 통해 상담을 요청하실 수 있습니다. 
											빠른 시간 내에 전문가가 연락드립니다.
										</p>
									</div>
								</div>
								<div className="px-0 card border-0 mb-3 collapse-custom">
									<div className="p-0 card-header border-0 rounded-3">
										<Link
											className="collapsed px-5 py-2 fw-bold d-flex align-items-center"
											data-bs-toggle="collapse"
											href="#collapse-4"
										>
											<h6 className="text-dark fs-20 mb-0">
												서비스 이용 비용이 있나요?
											</h6>
											<span className="ms-auto arrow" />
										</Link>
									</div>
									<div
										id="collapse-4"
										className="collapse"
										data-bs-parent=".accordion"
									>
										<p className="px-5 fs-6 fw-regular">
											기본 AI 진단과 지원사업 검색은 무료로 이용 가능합니다. 
											프리미엄 기능과 전문가 상담 서비스는 요금제 페이지에서 
											자세한 내용을 확인하실 수 있습니다.
										</p>
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
'use client'
import Link from "next/link"

export default function Section5() {
	return (
		<>
			{/*bizfit AI 진단 프로세스*/}
			<section className="law-firm-home-section-5 position-relative overflow-hidden">
				<div className="container pb-120 border-top border-primary pt-120">
					<div className="text-center mb-8">
						<span className="content-top btn-text text-primary fw-semibold rounded-pill border border-primary px-3 py-2 bg-white">
							이용 방법
						</span>
						<h2 className="mt-3">
							간단한 <strong>3단계</strong>로 시작하세요
						</h2>
					</div>
					<div className="row g-4">
						<div className="col-lg-4">
							<div className="card border-0 shadow-sm p-5 text-center h-100">
								<div className="icon-shape icon-100 bg-primary bg-opacity-10 rounded-circle mx-auto mb-4">
									<span className="fs-1 fw-bold text-primary">1</span>
								</div>
								<h5 className="mb-3">기업 정보 입력</h5>
								<p className="text-muted mb-0">
									업종, 규모, 지역 등 간단한 기업 정보를 입력합니다. 
									약 5~8개 문항으로 2분이면 완료됩니다.
								</p>
							</div>
						</div>
						<div className="col-lg-4">
							<div className="card border-0 shadow-sm p-5 text-center h-100">
								<div className="icon-shape icon-100 bg-primary bg-opacity-10 rounded-circle mx-auto mb-4">
									<span className="fs-1 fw-bold text-primary">2</span>
								</div>
								<h5 className="mb-3">AI 맞춤 분석</h5>
								<p className="text-muted mb-0">
									AI가 입력된 정보를 분석하여 500개 이상의 지원사업 중 
									귀하의 기업에 적합한 사업을 선별합니다.
								</p>
							</div>
						</div>
						<div className="col-lg-4">
							<div className="card border-0 shadow-sm p-5 text-center h-100">
								<div className="icon-shape icon-100 bg-primary bg-opacity-10 rounded-circle mx-auto mb-4">
									<span className="fs-1 fw-bold text-primary">3</span>
								</div>
								<h5 className="mb-3">맞춤 추천 확인</h5>
								<p className="text-muted mb-0">
									추천된 지원사업 리스트를 확인하고, 
									필요시 전문가 상담을 통해 신청을 진행합니다.
								</p>
							</div>
						</div>
					</div>
					<div className="text-center mt-8">
						<Link href="/diagnosis" className="btn btn-primary btn-lg">
							<span>지금 바로 AI 진단 시작하기</span>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width={16}
								height={16}
								viewBox="0 0 16 16"
								fill="none"
								className="ms-2"
							>
								<path
									d="M15.8167 7.55759C15.8165 7.5574 15.8163 7.55719 15.8161 7.557L12.5504 4.307C12.3057 4.06353 11.91 4.06444 11.6665 4.30912C11.423 4.55378 11.4239 4.9495 11.6686 5.193L13.8612 7.375H0.625C0.279813 7.375 0 7.65481 0 8C0 8.34519 0.279813 8.625 0.625 8.625H13.8612L11.6686 10.807C11.4239 11.0505 11.423 11.4462 11.6665 11.6909C11.91 11.9356 12.3058 11.9364 12.5504 11.693L15.8162 8.443C15.8163 8.44281 15.8165 8.44259 15.8167 8.4424C16.0615 8.19809 16.0607 7.80109 15.8167 7.55759Z"
									fill="white"
								/>
							</svg>
						</Link>
					</div>
				</div>
			</section>
		</>
	)
}
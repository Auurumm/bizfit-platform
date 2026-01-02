import Link from 'next/link'

export default function Footer() {
	return (
		<>
			{/* Footer */}
			<footer>
				<div className="section-footer-12 position-relative overflow-hidden">
					{/* 배경 장식 */}
					<div className="position-absolute top-50 start-50 translate-middle opacity-5 z-0">
						<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.5" strokeLinecap="round" strokeLinejoin="round" className="text-white">
							<path d="M12 4.5a2.5 2.5 0 0 0-4.96-.46 2.5 2.5 0 0 0-1.98 3 2.5 2.5 0 0 0-1.32 4.24 3 3 0 0 0 .34 5.58 2.5 2.5 0 0 0 2.96 3.08 2.5 2.5 0 0 0 4.91.05L12 20V4.5Z"/>
							<path d="M16 8V5c0-1.1.9-2 2-2"/>
							<path d="M12 13h4"/>
							<path d="M12 18h6a2 2 0 0 1 2 2v1"/>
							<path d="M12 8h8"/>
						</svg>
					</div>

					<div className="container-fluid">
						<div className="container position-relative z-2">
							<div className="row pb-120 pt-120">
								{/* 회사 정보 */}
								<div className="col-lg-4 col-md-6 mb-5">
									<Link href="/" className="d-flex align-items-center gap-2 mb-4">
										<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
											<path d="M12 4.5a2.5 2.5 0 0 0-4.96-.46 2.5 2.5 0 0 0-1.98 3 2.5 2.5 0 0 0-1.32 4.24 3 3 0 0 0 .34 5.58 2.5 2.5 0 0 0 2.96 3.08 2.5 2.5 0 0 0 4.91.05L12 20V4.5Z"/>
											<path d="M16 8V5c0-1.1.9-2 2-2"/>
											<path d="M12 13h4"/>
											<path d="M12 18h6a2 2 0 0 1 2 2v1"/>
											<path d="M12 8h8"/>
										</svg>
										<h4 className="mb-0 text-white">비즈핏</h4>
									</Link>
									<p className="text-white opacity-75 mb-4">
										AI 기반 자가진단과 전문가 매칭을 통해 스타트업과 중소기업의 성장을 지원하는 맞춤형 정부지원사업 매칭 플랫폼입니다.
									</p>
									<div className="d-flex flex-column gap-2">
										<a href="https://maps.google.com" className="d-flex align-items-center gap-2 text-white opacity-75 hover-effect-1">
											<i className="bi bi-geo-alt"></i>
											<span>울산광역시 남구 테크노산업로 55번길</span>
										</a>
										<a href="mailto:contact@bizfit.co.kr" className="d-flex align-items-center gap-2 text-white opacity-75 hover-effect-1">
											<i className="bi bi-envelope"></i>
											<span>contact@bizfit.co.kr</span>
										</a>
										<a href="tel:1588-0000" className="d-flex align-items-center gap-2 text-white opacity-75 hover-effect-1">
											<i className="bi bi-telephone"></i>
											<span>1588-0000</span>
										</a>
									</div>
								</div>

								{/* 서비스 */}
								<div className="col-lg-2 col-md-3 col-6 mb-5">
									<h6 className="text-white fw-semibold pb-3">서비스</h6>
									<div className="d-flex flex-column align-items-start gap-2">
										<Link href="/diagnosis" className="hover-effect-1 text-white opacity-75">
											AI 진단
										</Link>
										<Link href="/programs" className="hover-effect-1 text-white opacity-75">
											지원사업
										</Link>
										<Link href="/experts" className="hover-effect-1 text-white opacity-75">
											전문가 매칭
										</Link>
										<Link href="/pricing" className="hover-effect-1 text-white opacity-75">
											요금제
										</Link>
									</div>
								</div>

								{/* 회사 */}
								<div className="col-lg-2 col-md-3 col-6 mb-5">
									<h6 className="text-white fw-semibold pb-3">회사</h6>
									<div className="d-flex flex-column align-items-start gap-2">
										<Link href="/about" className="hover-effect-1 text-white opacity-75">
											회사소개
										</Link>
										<Link href="/team" className="hover-effect-1 text-white opacity-75">
											팀 소개
										</Link>
										<Link href="/news" className="hover-effect-1 text-white opacity-75">
											뉴스
										</Link>
										<Link href="/careers" className="hover-effect-1 text-white opacity-75">
											채용
										</Link>
									</div>
								</div>

								{/* 지원 */}
								<div className="col-lg-2 col-md-3 col-6 mb-5">
									<h6 className="text-white fw-semibold pb-3">지원</h6>
									<div className="d-flex flex-column align-items-start gap-2">
										<Link href="/contact" className="hover-effect-1 text-white opacity-75">
											고객센터
										</Link>
										<Link href="/faq" className="hover-effect-1 text-white opacity-75">
											자주 묻는 질문
										</Link>
										<Link href="/guide" className="hover-effect-1 text-white opacity-75">
											이용가이드
										</Link>
										<Link href="/notice" className="hover-effect-1 text-white opacity-75">
											공지사항
										</Link>
									</div>
								</div>

								{/* 법적 고지 */}
								<div className="col-lg-2 col-md-3 col-6 mb-5">
									<h6 className="text-white fw-semibold pb-3">법적 고지</h6>
									<div className="d-flex flex-column align-items-start gap-2">
										<Link href="/terms" className="hover-effect-1 text-white opacity-75">
											이용약관
										</Link>
										<Link href="/privacy" className="hover-effect-1 text-white opacity-75">
											개인정보처리방침
										</Link>
										<Link href="/cookie" className="hover-effect-1 text-white opacity-75">
											쿠키정책
										</Link>
									</div>
								</div>
							</div>

							{/* 중간 구분선 + 로고 및 빠른 링크 */}
							<div className="d-flex flex-column flex-lg-row gap-3 align-items-center justify-content-between py-4 border-top border-bottom border-opacity-25 border-white">
								<Link className="d-flex align-items-center gap-2" href="/">
									<svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 24 24" fill="none" stroke="#794AFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
										<path d="M12 4.5a2.5 2.5 0 0 0-4.96-.46 2.5 2.5 0 0 0-1.98 3 2.5 2.5 0 0 0-1.32 4.24 3 3 0 0 0 .34 5.58 2.5 2.5 0 0 0 2.96 3.08 2.5 2.5 0 0 0 4.91.05L12 20V4.5Z"/>
										<path d="M16 8V5c0-1.1.9-2 2-2"/>
										<path d="M12 13h4"/>
										<path d="M12 18h6a2 2 0 0 1 2 2v1"/>
										<path d="M12 8h8"/>
									</svg>
									<h5 className="mb-0 text-white">비즈핏</h5>
								</Link>
								<div className="d-flex align-items-center justify-content-center flex-wrap gap-md-4 gap-3">
									<Link href="/diagnosis" className="btn-text text-white hover-effect-1">
										AI 진단
									</Link>
									<Link href="/programs" className="btn-text text-white hover-effect-1">
										지원사업
									</Link>
									<Link href="/experts" className="btn-text text-white hover-effect-1">
										전문가
									</Link>
									<Link href="/pricing" className="btn-text text-white hover-effect-1">
										요금제
									</Link>
									<Link href="/contact" className="btn-text text-white hover-effect-1">
										문의하기
									</Link>
								</div>
							</div>

							{/* 하단 저작권 및 SNS */}
							<div className="d-flex flex-column flex-lg-row gap-3 align-items-center py-4 justify-content-between">
								<div className="d-flex flex-md-row flex-column gap-2 align-items-center text-center">
									<p className="text-white opacity-50 mb-0">
										© 2025 비즈핏(BizFit). All Rights Reserved.
									</p>
									<span className="text-white opacity-25 d-none d-md-inline">|</span>
									<p className="text-white opacity-50 mb-0">
										사업자등록번호: 000-00-00000
									</p>
								</div>
								
								{/* SNS 링크 */}
								<ul className="list-unstyled d-flex mb-0 justify-content-center gap-3">
									<li>
										<a href="https://blog.naver.com" target="_blank" rel="noopener noreferrer" className="d-flex align-items-center justify-content-center rounded-circle bg-white bg-opacity-10 hover-effect-1" style={{ width: '40px', height: '40px' }}>
											<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="white">
												<path d="M16.273 12.845 7.376 0H0v24h7.727V11.155L16.624 24H24V0h-7.727v12.845z"/>
											</svg>
										</a>
									</li>
									<li>
										<a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="d-flex align-items-center justify-content-center rounded-circle bg-white bg-opacity-10 hover-effect-1" style={{ width: '40px', height: '40px' }}>
											<i className="bi bi-instagram text-white"></i>
										</a>
									</li>
									<li>
										<a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer" className="d-flex align-items-center justify-content-center rounded-circle bg-white bg-opacity-10 hover-effect-1" style={{ width: '40px', height: '40px' }}>
											<i className="bi bi-youtube text-white"></i>
										</a>
									</li>
									<li>
										<a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="d-flex align-items-center justify-content-center rounded-circle bg-white bg-opacity-10 hover-effect-1" style={{ width: '40px', height: '40px' }}>
											<i className="bi bi-linkedin text-white"></i>
										</a>
									</li>
									<li>
										<a href="https://pf.kakao.com" target="_blank" rel="noopener noreferrer" className="d-flex align-items-center justify-content-center rounded-circle bg-white bg-opacity-10 hover-effect-1" style={{ width: '40px', height: '40px' }}>
											<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="white">
												<path d="M12 3c-5.52 0-10 3.59-10 8.03 0 2.84 1.87 5.33 4.68 6.73l-.96 3.56c-.08.3.26.54.52.37l4.23-2.79c.5.05 1 .07 1.53.07 5.52 0 10-3.59 10-8.03S17.52 3 12 3z"/>
											</svg>
										</a>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</footer>
		</>
	)
}
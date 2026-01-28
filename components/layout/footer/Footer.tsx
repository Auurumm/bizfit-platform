import Link from 'next/link'

export default function Footer() {
	return (
		<>
			{/* Footer */}
			<footer>
				<div className="section-footer-12 position-relative overflow-hidden">
					<div className="container-fluid">
						<div className="container position-relative z-2">
							<div className="row pb-120 pt-120">
								{/* 회사 정보 */}
								<div className="col-lg-4 col-md-6 mb-5">
									<Link href="/" className="d-flex align-items-center gap-2 mb-4">
										<img 
											src="/assets/imgs/logo.png" 
											alt="비즈핏" 
											style={{ height: '70px', width: 'auto' }}
										/>
									</Link>
									<p className="text-white opacity-75 mb-4">
										AI 기반 자가진단과 전문가 매칭을 통해 스타트업과 중소기업의 성장을 지원하는 맞춤형 정부지원사업 매칭 플랫폼입니다.
									</p>
									<div className="d-flex flex-column gap-2">
										<a href="https://maps.google.com" className="d-flex align-items-center gap-2 text-white opacity-75 hover-effect-1">
											<i className="bi bi-geo-alt"></i>
											<span>울산광역시 남구 테크노산업로 55번길</span>
										</a>
										<a href="mailto:official.haedeun@gmail.com" className="d-flex align-items-center gap-2 text-white opacity-75 hover-effect-1">
											<i className="bi bi-envelope"></i>
											<span>official.haedeun@gmail.com</span>
										</a>
										<a href="tel:010-3374-4650" className="d-flex align-items-center gap-2 text-white opacity-75 hover-effect-1">
											<i className="bi bi-telephone"></i>
											<span>010-3374-4650</span>
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
								<Link href="/">
									<img 
										src="/assets/imgs/logo.png" 
										alt="비즈핏" 
										style={{ height: '70px', width: 'auto' }}
									/>
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

							{/* 하단 저작권 */}
							<div className="d-flex flex-column flex-lg-row gap-3 align-items-center py-4 justify-content-center">
								<div className="d-flex flex-md-row flex-column gap-2 align-items-center text-center">
									<p className="text-white opacity-50 mb-0">
										© 2025 제이앤그로스. All Rights Reserved.
									</p>
									<span className="text-white opacity-25 d-none d-md-inline">|</span>
									<p className="text-white opacity-50 mb-0">
										사업자등록번호: 000-00-00000
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</footer>
		</>
	)
}
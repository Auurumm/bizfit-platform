import Link from 'next/link'

export default function Footer() {
	return (
		<>
			<style jsx global>{`
				.footer-link {
					color: rgba(255, 255, 255, 0.75);
					text-decoration: none;
					transition: all 0.2s ease;
				}
				.footer-link:hover {
					color: #ffffff !important;
					font-weight: 600;  /* 볼드 처리 */
				}
			`}</style>

			{/* Footer */}
			<footer>
				<div className="section-footer-12 position-relative overflow-hidden">
					<div className="container-fluid">
						<div className="container position-relative z-2">
							<div className="row pb-80 pt-80">
								{/* 회사 정보 */}
								<div className="col-lg-5 col-md-6 mb-5 mb-lg-0">
									<Link href="/" className="d-flex align-items-center gap-2 mb-4">
										<img 
											src="/assets/imgs/logo.png" 
											alt="비즈핏" 
											style={{ height: '60px', width: 'auto' }}
										/>
									</Link>
									<p className="text-white opacity-75 mb-4">
										AI 기반 자가진단과 전문가 매칭을 통해<br />
										중소기업의 성장을 지원하는 정부지원사업 매칭 플랫폼
									</p>
									<div className="d-flex flex-column gap-2">
										<a href="mailto:official.haedeun@gmail.com" className="footer-link d-flex align-items-center gap-2">
											<i className="bi bi-envelope"></i>
											<span>official.haedeun@gmail.com</span>
										</a>
										<a href="tel:010-3374-4650" className="footer-link d-flex align-items-center gap-2">
											<i className="bi bi-telephone"></i>
											<span>010-3374-4650</span>
										</a>
									</div>
								</div>

								{/* 서비스 */}
								<div className="col-lg-2 col-md-3 col-6 mb-4 mb-lg-0">
									<h6 className="text-white fw-semibold pb-3">서비스</h6>
									<div className="d-flex flex-column align-items-start gap-2">
										<Link href="/diagnosis" className="footer-link">
											AI 진단
										</Link>
										<Link href="/programs" className="footer-link">
											지원사업
										</Link>
										<Link href="/experts" className="footer-link">
											전문가 매칭
										</Link>
									</div>
								</div>

								{/* 회사 */}
								<div className="col-lg-2 col-md-3 col-6 mb-4 mb-lg-0">
									<h6 className="text-white fw-semibold pb-3">회사</h6>
									<div className="d-flex flex-column align-items-start gap-2">
										<Link href="/about" className="footer-link">
											회사소개
										</Link>
										<Link href="/contact" className="footer-link">
											고객센터
										</Link>
									</div>
								</div>

								{/* 법적 고지 */}
								<div className="col-lg-3 col-md-6 col-6">
									<h6 className="text-white fw-semibold pb-3">법적 고지</h6>
									<div className="d-flex flex-column align-items-start gap-2">
										<Link href="/terms" className="footer-link">
											이용약관
										</Link>
										<Link href="/privacy" className="footer-link">
											개인정보처리방침
										</Link>
									</div>
								</div>
							</div>

							{/* 하단 저작권 */}
							<div className="d-flex flex-column flex-md-row gap-2 align-items-center py-4 justify-content-between border-top border-opacity-25 border-white">
								<p className="text-white opacity-50 mb-0 small">
									© 2025 제이앤그로스. All Rights Reserved.
								</p>
							</div>
						</div>
					</div>
				</div>
			</footer>
		</>
	)
}
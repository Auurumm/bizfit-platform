'use client'
import Link from 'next/link'
import { useState } from 'react'

export default function MobileMenu({ isMobileMenu, handleMobileMenu }: any) {

	const [isAccordion, setIsAccordion] = useState(0)

	const handleAccordion = (key: any) => {
		setIsAccordion(prevState => prevState === key ? null : key)
	}
	return (
		<>
			<div className="mobile-menu-overlay" onClick={handleMobileMenu} />
			<div className={`mobile-header-active mobile-header-wrapper-style ${isMobileMenu ? 'sidebar-visible' : ''}`}>
				<div className="mobile-header-wrapper-inner">
					<div className="mobile-header-logo">
						<Link className="d-flex align-items-center gap-2" href="/">
							{/* 비즈핏 로고 */}
							<svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 24 24" fill="none" stroke="#794AFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
								<path d="M12 4.5a2.5 2.5 0 0 0-4.96-.46 2.5 2.5 0 0 0-1.98 3 2.5 2.5 0 0 0-1.32 4.24 3 3 0 0 0 .34 5.58 2.5 2.5 0 0 0 2.96 3.08 2.5 2.5 0 0 0 4.91.05L12 20V4.5Z"/>
								<path d="M16 8V5c0-1.1.9-2 2-2"/>
								<path d="M12 13h4"/>
								<path d="M12 18h6a2 2 0 0 1 2 2v1"/>
								<path d="M12 8h8"/>
							</svg>
							<h5 className="mb-0">비즈핏</h5>
						</Link>
						<div className={`burger-icon burger-icon-white border rounded-circle ${isMobileMenu ? 'burger-close' : ''}`} onClick={handleMobileMenu}>
							<span className="burger-icon-top" />
							<span className="burger-icon-mid" />
							<span className="burger-icon-bottom" />
						</div>
					</div>
					<div className="mobile-header-content-area">
						<div className="perfect-scroll">
							<div className="mobile-menu-wrap mobile-header-border">
								<nav>
									<ul className="mobile-menu ps-0">
										<li>
											<Link href="/">홈</Link>
										</li>
										<li>
											<Link href="/diagnosis">AI 진단</Link>
										</li>
										<li>
											<Link href="/programs">지원사업</Link>
										</li>
										<li>
											<Link href="/experts">전문가</Link>
										</li>
										<li>
											<Link href="/pricing">요금제</Link>
										</li>
										<li>
											<Link href="/about">소개</Link>
										</li>
										<li>
											<Link href="/contact">문의하기</Link>
										</li>
									</ul>
								</nav>
							</div>
						</div>
					</div>
					<div className="tgmobile__menu-bottom mt-auto">
						<div className="contact-info">
							<ul className="list-wrap">
								<li><span className="opacity-50">이메일:</span> <Link href="mailto:support@bizfit.kr">support@bizfit.kr</Link></li>
								<li><span className="opacity-50">전화:</span> <Link href="tel:1588-0000">1588-0000</Link></li>
							</ul>
						</div>
						<div className="social-links">
							<div className="social-icons gap-4 mt-4">
								<Link href="/#" className="border border-opacity-10 border-white icon-shape icon-md">
									<i className="bi bi-instagram" />
								</Link>
								<Link href="/#" className="border border-opacity-10 border-white icon-shape icon-md">
									<i className="bi bi-youtube" />
								</Link>
								<Link href="/#" className="border border-opacity-10 border-white icon-shape icon-md">
									<i className="bi bi-linkedin" />
								</Link>
							</div>
						</div>
						{/* AI 진단 시작 버튼 */}
						<div className="mt-4">
							<Link href="/diagnosis" className="btn btn-primary w-100 py-3" onClick={handleMobileMenu}>
								AI 진단 시작하기
							</Link>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}
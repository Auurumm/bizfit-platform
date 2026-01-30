'use client'
import Link from 'next/link'
import { useState } from 'react'
import { useAuth } from '@/lib/AuthContext'

export default function MobileMenu({ isMobileMenu, handleMobileMenu }: any) {
	const { user, profile, loading, signOut } = useAuth()
	const [isAccordion, setIsAccordion] = useState(0)

	const handleAccordion = (key: any) => {
		setIsAccordion(prevState => prevState === key ? null : key)
	}

	const handleLogout = async () => {
		await signOut()
		handleMobileMenu()
	}

	return (
		<>
			<div className="mobile-menu-overlay" onClick={handleMobileMenu} />
			<div className={`mobile-header-active mobile-header-wrapper-style ${isMobileMenu ? 'sidebar-visible' : ''}`}>
				<div className="mobile-header-wrapper-inner">
					<div className="mobile-header-logo" style={{ backgroundColor: '#B98E44', padding: '1rem' }}>
						<Link className="d-flex align-items-center" href="/">
							<img 
								src="/assets/imgs/logo.png" 
								alt="비즈핏" 
								style={{ height: '60px', width: 'auto' }}
							/>
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
											<Link href="/" onClick={handleMobileMenu}>홈</Link>
										</li>
										<li>
											<Link href="/diagnosis" onClick={handleMobileMenu}>AI 진단</Link>
										</li>
										<li>
											<Link href="/programs" onClick={handleMobileMenu}>지원사업</Link>
										</li>
										<li>
											<Link href="/experts" onClick={handleMobileMenu}>전문가</Link>
										</li>
										<li>
											<Link href="/pricing" onClick={handleMobileMenu}>요금제</Link>
										</li>
										<li>
											<Link href="/about" onClick={handleMobileMenu}>소개</Link>
										</li>
										<li>
											<Link href="/contact" onClick={handleMobileMenu}>문의하기</Link>
										</li>
									</ul>
								</nav>
							</div>

							{/* 로그인/회원가입 영역 */}
							<div className="d-flex flex-column gap-2 mt-4">
								{user ? (
									<>
										<Link href="/mypage" className="fs-7 d-flex align-items-center px-3">
											<i className="bi bi-person-circle text-white me-1"></i>
											<span className="text-white">{profile?.name || '마이페이지'}</span>
										</Link>
										<button
											onClick={handleLogout}
											className="fs-7 d-flex align-items-center border-0 bg-transparent"
											style={{ cursor: 'pointer' }}
										>
											<i className="bi bi-box-arrow-right text-white me-1"></i>
											<span className="text-white">로그아웃</span>
										</button>
									</>
								) : (
									<>
										<Link href="/login" className="fs-7 d-flex align-items-center px-3">
											<i className="bi bi-person text-white me-1"></i>
											<span className="text-white">로그인</span>
										</Link>
										<Link href="/register" className="fs-7 d-flex align-items-center">
											<i className="bi bi-person-plus text-white me-1"></i>
											<span className="text-white">회원가입</span>
										</Link>
									</>
								)}
							</div>
						</div>
					</div>
					<div className="tgmobile__menu-bottom mt-auto">
						<div className="contact-info">
							<ul className="list-wrap">
								<li><span className="opacity-50">이메일:</span> <Link href="mailto:official.haedeun@gmail.com">official.haedeun@gmail.com</Link></li>
								<li><span className="opacity-50">전화:</span> <Link href="tel:010-3374-4650">010-3374-4650</Link></li>
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
						{/* 로그인 상태에 따른 버튼 */}
						<div className="mt-4">
							{!loading && (
								<>
									{user ? (
										<Link href="/mypage" className="btn btn-primary w-100 py-3" onClick={handleMobileMenu}>
											마이페이지
										</Link>
									) : (
										<Link href="/register" className="btn btn-primary w-100 py-3" onClick={handleMobileMenu}>
											무료 시작하기
										</Link>
									)}
								</>
							)}
						</div>
					</div>
				</div>
			</div>
		</>
	)
}
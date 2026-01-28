'use client'

import Link from 'next/link'
import { useAuth } from '@/lib/AuthContext'
import MobileMenu from '../MobileMenu'

export default function Header({ scroll, isMobileMenu, handleMobileMenu }: any) {
	const { user, profile, loading, signOut } = useAuth()

	const handleLogout = async () => {
		await signOut()
	}

	return (
		<>
			<header>
				<div className="position-relative">
					{/*Top bar*/}
					<div className="top-bar top-bar-6 bg-primary position-relative">
						<div className="container d-flex flex-wrap justify-content-between align-items-center">
							<ul className="navbar-nav border-0 pe-0">
								<li className="nav-item">
									<span className="nav-link fw-semibold d-none d-md-block text-white">
										<i className="bi bi-building fs-7 me-1"></i>
										정부 지원사업 매칭 플랫폼
									</span>
								</li>
							</ul>
							<div className="d-flex justify-content-center gap-3 align-self-stretch">
								{/* 로그인 상태에 따른 표시 */}
								{!loading && (
									<>
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
									</>
								)}
								<a href="mailto:official.haedeun@gmail.com" className="fs-7 d-flex align-items-center px-3 d-none d-md-flex">
									<i className="ri-mail-open-line text-white"></i>
									<span className="text-white">official.haedeun@gmail.com</span>
								</a>
							</div>
						</div>
					</div>
					{/* nav bar */}
					<nav className={`navbar navbar-expand-lg navbar-transparent border-bottom border-top border-white border-opacity-10 p-0 shadow-none ${scroll ? 'navbar-stick top-0 position-fixed' : ''}`}>
						<div className="container mt-3 mb-3">
							<Link className="navbar-brand" href="/">
								<img 
									src="/assets/imgs/logo.png" 
									alt="비즈핏" 
									style={{ height: '100px', width: 'auto' }}
								/>
								</Link>
							<div className="d-none d-lg-flex">
								<ul className="navbar-nav mx-auto gap-4 align-items-lg-center">
									<li className="nav-item">
										<Link className="nav-link text-uppercase" href="/">홈</Link>
									</li>
									<li className="nav-item">
										<Link className="nav-link text-uppercase" href="/diagnosis">AI 진단</Link>
									</li>
									<li className="nav-item">
										<Link className="nav-link text-uppercase" href="/programs">지원사업</Link>
									</li>
									<li className="nav-item">
										<Link className="nav-link text-uppercase" href="/experts">전문가</Link>
									</li>
									<li className="nav-item">
										<Link className="nav-link text-uppercase" href="/pricing">요금제</Link>
									</li>
									<li className="nav-item">
										<Link className="nav-link text-uppercase" href="/about">소개</Link>
									</li>
									<li className="nav-item">
										<Link className="nav-link text-uppercase" href="/contact">문의</Link>
									</li>
								</ul>
							</div>
							<div className="d-flex align-items-center gap-4">
								{/* 로그인 상태에 따른 버튼 */}
								{!loading && (
									<>
										{user ? (
											<Link
												href="/mypage"
												className="btn btn-outline-secondary bg-transparent text-white rounded-0 border-white border-opacity-25 d-none d-md-flex"
											>
												<span className="text-white">마이페이지</span>
												<i className="bi bi-person-circle ms-2"></i>
											</Link>
										) : (
											<Link
												href="/register"
												className="btn btn-outline-secondary bg-transparent text-white rounded-0 border-white border-opacity-25 d-none d-md-flex"
											>
												<span className="text-white">무료 시작하기</span>
												<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
													<g clipPath="url(#clip0_816_117)">
														<path d="M15.8167 7.55759C15.8165 7.5574 15.8163 7.55719 15.8161 7.557L12.5504 4.307C12.3057 4.06353 11.91 4.06444 11.6665 4.30912C11.423 4.55378 11.4239 4.9495 11.6686 5.193L13.8612 7.375H0.625C0.279813 7.375 0 7.65481 0 8C0 8.34519 0.279813 8.625 0.625 8.625H13.8612L11.6686 10.807C11.4239 11.0505 11.423 11.4462 11.6665 11.6909C11.91 11.9356 12.3058 11.9364 12.5504 11.693L15.8162 8.443C15.8163 8.44281 15.8165 8.44259 15.8167 8.4424C16.0615 8.19809 16.0607 7.80109 15.8167 7.55759Z" fill="white" />
													</g>
												</svg>
											</Link>
										)}
									</>
								)}
								<div className="burger-icon burger-icon-white border rounded-3 top-0 end-0 position-relative" onClick={handleMobileMenu}>
									<span className="burger-icon-top"></span>
									<span className="burger-icon-mid"></span>
									<span className="burger-icon-bottom"></span>
								</div>
							</div>
						</div>
					</nav>

					<MobileMenu isMobileMenu={isMobileMenu} handleMobileMenu={handleMobileMenu} />
				</div>
			</header>
		</>
	)
}
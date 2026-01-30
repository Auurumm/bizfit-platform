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
									<i className="bi bi-envelope text-white me-2"></i>
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
									{/*}
									<li className="nav-item">
										<Link className="nav-link text-uppercase" href="/pricing">요금제</Link>
									</li>
									*/}
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
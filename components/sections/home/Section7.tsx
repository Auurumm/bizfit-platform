'use client'
import { useState, useEffect } from 'react'
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, Navigation, Pagination } from "swiper/modules"
import Link from "next/link"

const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyjCdv9Cg3ooAz5E-DE27oOkVhPUCmA_mChScMc5zL_cY81M7EpiK082RSfCVbpn8Xm/exec"

const DEFAULT_IMAGE = "/assets/imgs/default-expert.png"

interface Expert {
	id: string
	name: string
	title: string
	company: string
	specialties: string[]
	image: string
	category: string
}

// Google Drive URL 변환
const convertGoogleDriveUrl = (url: string): string => {
	if (!url) return DEFAULT_IMAGE
	if (url.includes('lh3.googleusercontent.com')) return url
	if (url.startsWith('http') && !url.includes('drive.google.com')) return url
	if (url.startsWith('/') || url.startsWith('assets/')) return url
	
	const patterns = [
		/\/d\/([a-zA-Z0-9_-]+)/,
		/id=([a-zA-Z0-9_-]+)/,
		/\/file\/d\/([a-zA-Z0-9_-]+)/
	]
	
	for (const pattern of patterns) {
		const match = url.match(pattern)
		if (match) {
			return `https://lh3.googleusercontent.com/d/${match[1]}`
		}
	}
	
	return DEFAULT_IMAGE
}

// 카테고리 한글 변환
const getCategoryName = (category: string): string => {
	const names: Record<string, string> = {
		'startup': '창업 분야',
		'finance': '재무/회계 분야',
		'marketing': '마케팅 분야',
		'tech': 'R&D 분야',
		'legal': '법무 분야',
		'hr': '인사/조직 분야',
	}
	return names[category] || category
}

const swiperOptions = {
	modules: [Autoplay, Pagination, Navigation],
	slidesPerView: 4,
	spaceBetween: 30,
	autoplay: {
		delay: 3000,
		disableOnInteraction: false,
	},
	loop: true,
	breakpoints: {
		320: { slidesPerView: 1, spaceBetween: 30 },
		575: { slidesPerView: 2, spaceBetween: 30 },
		767: { slidesPerView: 2, spaceBetween: 30 },
		991: { slidesPerView: 4, spaceBetween: 30 },
	}
}

export default function Section7() {
	const [experts, setExperts] = useState<Expert[]>([])
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const fetchExperts = async () => {
			try {
				const response = await fetch(`${GOOGLE_SCRIPT_URL}?action=experts`)
				const result = await response.json()
				
				if (result.success && result.data?.length > 0) {
					// 전체 전문가를 랜덤으로 섞기
					const shuffled = [...result.data].sort(() => Math.random() - 0.5)
					
					// 이미지 URL 변환
					const expertsWithImages = shuffled.map((expert: Expert) => ({
						...expert,
						image: expert.image 
							? convertGoogleDriveUrl(expert.image)
							: DEFAULT_IMAGE
					}))
					
					setExperts(expertsWithImages)
				}
			} catch (error) {
				console.error('전문가 로드 오류:', error)
			} finally {
				setLoading(false)
			}
		}

		fetchExperts()
	}, [])

	// 로딩 중이거나 전문가가 없으면 섹션 숨김
	if (loading || experts.length === 0) {
		return null
	}

	return (
		<>
			<section className="law-firm-home-section-7 position-relative overflow-hidden pt-120 pb-120 bg-secondary-2">
				<div className="container">
					<div className="text-center">
						<span className="content-top btn-text text-primary fw-semibold rounded-pill border border-primary px-3 py-2 bg-white">
							전문가 네트워크
						</span>
						<h2 className="mt-3">
							분야별 전문가와 상담하세요
						</h2>
						<p className="text-muted mt-3">
							지원사업 신청부터 사업계획서 작성까지, 전문가가 도와드립니다
						</p>
					</div>
					<div className="row pt-80">
						<div className="col-12 position-relative">
							<Swiper {...swiperOptions} className="swiper slider-4 ps-3">
								<div className="swiper-wrapper z-1">
									{experts.map((expert) => (
										<SwiperSlide key={expert.id}>
											<div className="card-team overflow-hidden">
												<div className="position-relative d-inline-flex">
													<img
														src={expert.image}
														alt={expert.name}
														style={{ width: '100%', height: '300px', objectFit: 'cover' }}
														referrerPolicy="no-referrer"
														onError={(e) => {
															const target = e.target as HTMLImageElement
															target.src = DEFAULT_IMAGE
														}}
													/>
													<div className="team-overlay">
														<div className="position-absolute top-50 start-50 translate-middle">
															<Link href="/experts" className="btn btn-primary btn-sm"
															  style={{ whiteSpace: 'nowrap' }}>
																상담 문의
															</Link>
														</div>
													</div>
												</div>
												<p className="btn-text text-primary mt-5">
													{getCategoryName(expert.category)}
												</p>
												<Link href="/experts">
													<h5>
														{expert.name} <strong>{expert.title}</strong>
													</h5>
												</Link>
												<p className="text-muted small">
													{expert.specialties?.slice(0, 2).join(', ') || expert.company}
												</p>
											</div>
										</SwiperSlide>
									))}
								</div>
							</Swiper>
						</div>
					</div>
					<div className="text-center mt-8">
						<Link href="/experts" className="btn btn-outline-secondary">
							<span>전체 전문가 보기</span>
							<svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 16 16" fill="none">
								<path d="M15.8167 7.55759C15.8165 7.5574 15.8163 7.55719 15.8161 7.557L12.5504 4.307C12.3057 4.06353 11.91 4.06444 11.6665 4.30912C11.423 4.55378 11.4239 4.9495 11.6686 5.193L13.8612 7.375H0.625C0.279813 7.375 0 7.65481 0 8C0 8.34519 0.279813 8.625 0.625 8.625H13.8612L11.6686 10.807C11.4239 11.0505 11.423 11.4462 11.6665 11.6909C11.91 11.9356 12.3058 11.9364 12.5504 11.693L15.8162 8.443C15.8163 8.44281 15.8165 8.44259 15.8167 8.4424C16.0615 8.19809 16.0607 7.80109 15.8167 7.55759Z" fill="#B98E44"/>
							</svg>
						</Link>
					</div>
				</div>
			</section>
		</>
	)
}
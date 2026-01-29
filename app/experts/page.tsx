'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import Layout from "@/components/layout/Layout"
import { useAuth } from "@/lib/AuthContext"
import PageHeader from "@/components/sections/PageHeader"

// ⚠️ Google Apps Script 웹 앱 URL을 여기에 입력하세요
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyjCdv9Cg3ooAz5E-DE27oOkVhPUCmA_mChScMc5zL_cY81M7EpiK082RSfCVbpn8Xm/exec"

interface Expert {
	id: string
	name: string
	title: string
	company: string
	specialties: string[]
	rating: number
	reviews: number
	location: string
	experience: number
	price: number
	availability: string
	image: string
	description: string
	category: string
}

interface Review {
	reviewId: string
	createdAt: string
	expertId: string
	expertName: string
	authorName: string
	rating: number
	content: string
}

interface BookingForm {
	name: string
	phone: string
	email: string
	company: string
	position: string
	consultDate: string
	topic: string
	details: string
}

interface ReviewForm {
	authorName: string
	rating: number
	content: string
}

const categories = [
	{ id: "all", name: "전체" },
	{ id: "startup", name: "창업 컨설팅" },
	{ id: "finance", name: "재무/회계" },
	{ id: "marketing", name: "마케팅" },
	{ id: "tech", name: "기술/R&D" },
	{ id: "legal", name: "법무" },
	{ id: "hr", name: "인사/조직" },
]

// 기본 이미지 (단일 이미지로 통일)
const DEFAULT_EXPERT_IMAGE = "/assets/imgs/default-expert.png"

// Google Drive URL을 직접 이미지 URL로 변환
const convertGoogleDriveUrl = (url: string): string => {
	if (!url) return DEFAULT_EXPERT_IMAGE
	
	// 이미 변환된 URL이면 그대로 반환
	if (url.includes('lh3.googleusercontent.com')) {
		return url
	}
	
	// 일반 이미지 URL이면 그대로 반환
	if (url.startsWith('http') && !url.includes('drive.google.com')) {
		return url
	}
	
	// 로컬 이미지면 그대로 반환
	if (url.startsWith('/')) {
		return url
	}
	
	// Google Drive URL 패턴: /d/이미지ID/ 또는 id=이미지ID
	const patterns = [
		/\/d\/([a-zA-Z0-9_-]+)/,           // /d/ID/view 형식
		/id=([a-zA-Z0-9_-]+)/,              // ?id=ID 형식
		/\/file\/d\/([a-zA-Z0-9_-]+)/       // /file/d/ID 형식
	]
	
	for (const pattern of patterns) {
		const match = url.match(pattern)
		if (match) {
			return `https://lh3.googleusercontent.com/d/${match[1]}`
		}
	}
	
	// 변환 불가능하면 기본 이미지 반환
	return DEFAULT_EXPERT_IMAGE
}

export default function ExpertsPage() {
	const { user, profile, loading: authLoading } = useAuth()
	
	const [experts, setExperts] = useState<Expert[]>([])
	const [filteredExperts, setFilteredExperts] = useState<Expert[]>([])
	const [searchTerm, setSearchTerm] = useState("")
	const [selectedCategory, setSelectedCategory] = useState("all")
	const [selectedExpert, setSelectedExpert] = useState<Expert | null>(null)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)
	
	// 모달 상태
	const [modalType, setModalType] = useState<"inquiry" | "detail" | "login" | null>(null)
	
	// 리뷰 관련 상태
	const [expertReviews, setExpertReviews] = useState<Review[]>([])
	const [reviewsLoading, setReviewsLoading] = useState(false)
	const [showReviewForm, setShowReviewForm] = useState(false)
	const [reviewForm, setReviewForm] = useState<ReviewForm>({
		authorName: "",
		rating: 5,
		content: ""
	})
	const [reviewSubmitStatus, setReviewSubmitStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
	
	// 문의 폼 상태
	const [bookingForm, setBookingForm] = useState<BookingForm>({
		name: "",
		phone: "",
		email: "",
		company: "",
		position: "",
		consultDate: "",
		topic: "",
		details: ""
	})
	const [submitStatus, setSubmitStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
	const [submitMessage, setSubmitMessage] = useState("")

	// 전문가 목록 로드
	const loadExperts = useCallback(async () => {
		try {
			setLoading(true)
			setError(null)
			
			const response = await fetch(`${GOOGLE_SCRIPT_URL}?action=experts`)
			const result = await response.json()
			
			if (result.success) {
				// 이미지 URL 변환 적용
				const expertsWithImages = result.data.map((expert: Expert) => ({
					...expert,
					image: convertGoogleDriveUrl(expert.image)
				}))
				
				// 랜덤 셔플
				const shuffled = [...expertsWithImages].sort(() => Math.random() - 0.5)
				
				setExperts(shuffled)
				setFilteredExperts(shuffled)
			} else {
				setError(result.message || "전문가 목록을 불러오는데 실패했습니다.")
			}
		} catch (err) {
			console.error("전문가 로드 오류:", err)
			setError("서버와 연결할 수 없습니다. 잠시 후 다시 시도해주세요.")
		} finally {
			setLoading(false)
		}
	}, [])

	// 특정 전문가의 리뷰 로드
	const loadReviews = useCallback(async (expertId: string) => {
		try {
			setReviewsLoading(true)
			const response = await fetch(`${GOOGLE_SCRIPT_URL}?action=reviews&expertId=${expertId}`)
			const result = await response.json()
			
			if (result.success) {
				setExpertReviews(result.data)
			}
		} catch (err) {
			console.error("리뷰 로드 오류:", err)
		} finally {
			setReviewsLoading(false)
		}
	}, [])

	useEffect(() => {
		loadExperts()
	}, [loadExperts])

	useEffect(() => {
		let filtered = experts

		if (selectedCategory !== "all") {
			filtered = filtered.filter((expert) => expert.category === selectedCategory)
		}

		if (searchTerm) {
			filtered = filtered.filter(
				(expert) =>
					expert.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
					expert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
					expert.specialties.some((s) => s.toLowerCase().includes(searchTerm.toLowerCase()))
			)
		}

		setFilteredExperts(filtered)
	}, [experts, selectedCategory, searchTerm])

	// 상세 모달 열기
	const openDetailModal = (expert: Expert) => {
		setSelectedExpert(expert)
		setModalType("detail")
		setShowReviewForm(false)
		setReviewSubmitStatus("idle")
		loadReviews(expert.id)
		document.body.style.overflow = 'hidden'
	}

	// 문의 모달 열기 (로그인 체크)
	const openInquiryModal = (expert: Expert) => {
		if (authLoading) {
			return
		}
		
		if (!user) {
			setSelectedExpert(expert)
			setModalType("login")
			document.body.style.overflow = 'hidden'
			return
		}

		setSelectedExpert(expert)
		setModalType("inquiry")
		setSubmitStatus("idle")
		
		setBookingForm({
			name: profile?.name || "",
			phone: profile?.phone || "",
			email: profile?.email || user?.email || "",
			company: profile?.company || "",
			position: "",
			consultDate: "",
			topic: "",
			details: ""
		})
		document.body.style.overflow = 'hidden'
	}

	const closeModal = () => {
		setModalType(null)
		setSelectedExpert(null)
		setShowReviewForm(false)
		document.body.style.overflow = 'auto'
	}

	const handleFormChange = (field: keyof BookingForm, value: string) => {
		setBookingForm(prev => ({ ...prev, [field]: value }))
	}

	// 문의 제출
	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		
		if (!bookingForm.name || !bookingForm.phone || !bookingForm.email || !bookingForm.topic) {
			setSubmitStatus("error")
			setSubmitMessage("필수 항목을 모두 입력해주세요.")
			return
		}

		setSubmitStatus("loading")

		try {
			await fetch(GOOGLE_SCRIPT_URL, {
				method: "POST",
				mode: "no-cors",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					action: "submit",
					...bookingForm,
					expertName: selectedExpert?.name || "",
					expertTitle: selectedExpert?.title || "",
					inquiryType: "consultation",
					userId: user?.id || ""
				}),
			})

			setSubmitStatus("success")
			setSubmitMessage("상담 문의가 성공적으로 접수되었습니다. 빠른 시일 내에 연락드리겠습니다.")
			
			setTimeout(() => {
				closeModal()
			}, 3000)
		} catch (error) {
			setSubmitStatus("error")
			setSubmitMessage("문의 접수 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.")
		}
	}

	// 리뷰 제출
	const handleReviewSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		
		if (!reviewForm.content.trim()) {
			return
		}

		setReviewSubmitStatus("loading")

		try {
			await fetch(GOOGLE_SCRIPT_URL, {
				method: "POST",
				mode: "no-cors",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					action: "submitReview",
					expertId: selectedExpert?.id || "",
					expertName: selectedExpert?.name || "",
					authorName: reviewForm.authorName || profile?.name || "익명",
					rating: reviewForm.rating,
					content: reviewForm.content
				}),
			})

			setReviewSubmitStatus("success")
			setReviewForm({ authorName: "", rating: 5, content: "" })
			
			setTimeout(() => {
				if (selectedExpert) {
					loadReviews(selectedExpert.id)
				}
				loadExperts()
				setShowReviewForm(false)
				setReviewSubmitStatus("idle")
			}, 1500)
		} catch (error) {
			setReviewSubmitStatus("error")
		}
	}

	// 별점 렌더링
	const renderStars = (rating: number, interactive: boolean = false, onChange?: (rating: number) => void) => {
		return (
			<div className="d-flex gap-1">
				{[1, 2, 3, 4, 5].map((star) => (
					<i
						key={star}
						className={`bi ${star <= rating ? 'bi-star-fill text-warning' : 'bi-star text-muted'} ${interactive ? 'cursor-pointer' : ''}`}
						style={interactive ? { cursor: 'pointer', fontSize: '1.5rem' } : {}}
						onClick={() => interactive && onChange && onChange(star)}
					></i>
				))}
			</div>
		)
	}

	return (
		<Layout>
			<PageHeader title="전문가 매칭" />
		
			{/* 검색 및 필터 */}
			<section className="py-5 bg-white border-bottom"></section>

			{/* 검색 및 필터 */}
			<section className="py-5 bg-white border-bottom">
				<div className="container">
					<div className="row align-items-center g-4">
						<div className="col-lg-4">
							<div className="position-relative">
								<input
									type="text"
									className="form-control form-control-lg ps-5"
									placeholder="전문가 이름, 전문 분야로 검색"
									value={searchTerm}
									onChange={(e) => setSearchTerm(e.target.value)}
								/>
								<i className="bi bi-search position-absolute top-50 start-0 translate-middle-y ms-3 text-muted"></i>
							</div>
						</div>
						<div className="col-lg-8">
							<div className="d-flex align-items-center gap-2">
								{/* 왼쪽 화살표 */}
								<button 
									className="btn btn-sm btn-outline-secondary rounded-circle flex-shrink-0"
									onClick={() => {
										const container = document.getElementById('filter-container')
										if (container) container.scrollLeft -= 150
									}}
									style={{ width: '32px', height: '32px', padding: 0 }}
								>
									<i className="bi bi-chevron-left"></i>
								</button>
								
								{/* 필터 버튼들 */}
								<div 
									id="filter-container"
									className="d-flex gap-2 align-items-center overflow-hidden flex-grow-1"
									style={{ 
										whiteSpace: 'nowrap',
										scrollBehavior: 'smooth'
									}}
								>
									{categories.map((category) => (
										<button
											key={category.id}
											onClick={() => setSelectedCategory(category.id)}
											className={`btn flex-shrink-0 ${selectedCategory === category.id 
												? 'btn-primary' 
												: 'btn-outline-secondary'}`}
										>
											{category.name}
										</button>
									))}
								</div>
								
								{/* 오른쪽 화살표 */}
								<button 
									className="btn btn-sm btn-outline-secondary rounded-circle flex-shrink-0"
									onClick={() => {
										const container = document.getElementById('filter-container')
										if (container) container.scrollLeft += 150
									}}
									style={{ width: '32px', height: '32px', padding: 0 }}
								>
									<i className="bi bi-chevron-right"></i>
								</button>
								
								{/* 새로고침 */}
								<button
									onClick={loadExperts}
									className="btn btn-outline-secondary flex-shrink-0"
									title="새로고침"
								>
									<i className="bi bi-arrow-clockwise"></i>
								</button>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* 전문가 목록 */}
			<section className="py-120 bg-secondary-2">
				<div className="container">
					{error && (
						<div className="alert alert-warning mb-5">
							<div className="d-flex align-items-center justify-content-between">
								<div>
									<i className="bi bi-exclamation-triangle me-2"></i>
									{error}
								</div>
								<button onClick={loadExperts} className="btn btn-sm btn-outline-warning">
									다시 시도
								</button>
							</div>
						</div>
					)}

					{loading ? (
						<div className="text-center py-8">
							<div className="spinner-border text-primary" role="status">
								<span className="visually-hidden">Loading...</span>
							</div>
							<p className="mt-3 text-muted">전문가 목록을 불러오는 중...</p>
						</div>
					) : filteredExperts.length === 0 ? (
						<div className="text-center py-8">
							<i className="bi bi-people fs-1 text-muted d-block mb-3"></i>
							<h5>검색 결과가 없습니다</h5>
							<p className="text-muted">다른 검색어나 필터를 시도해보세요</p>
							<button 
								className="btn btn-outline-primary mt-3"
								onClick={() => { setSearchTerm(""); setSelectedCategory("all"); }}
							>
								전체 전문가 보기
							</button>
						</div>
					) : (
						<>
							<div className="mb-4">
								<p className="text-muted mb-0">
									총 <strong className="text-dark">{filteredExperts.length}</strong>명의 전문가
								</p>
							</div>

							<div className="row g-4">
								{filteredExperts.map((expert) => (
									<div key={expert.id} className="col-lg-4 col-md-6">
										<div className="card-team overflow-hidden bg-white rounded-4 shadow-sm h-100 hover-up">
											<div className="position-relative">
												<img
													src={expert.image}
													alt={expert.name}
													className="w-100"
													style={{ height: '280px', objectFit: 'cover'  }}
													referrerPolicy="no-referrer"
													onError={(e) => {
														const target = e.target as HTMLImageElement
														target.src = DEFAULT_EXPERT_IMAGE
													}}
												/>
											</div>
											<div className="p-4">
												<div className="d-flex justify-content-between align-items-start mb-2">
													<div>
														<p className="btn-text text-primary mb-1">{expert.title}</p>
														<h5 className="mb-1">{expert.name}</h5>
														<p className="text-muted small mb-0">{expert.company}</p>
													</div>
													<div className="text-end">
														{expert.reviews > 0 ? (
															<>
																<div className="d-flex align-items-center gap-1">
																	<i className="bi bi-star-fill text-warning"></i>
																	<span className="fw-bold">{expert.rating.toFixed(1)}</span>
																</div>
																<small className="text-muted">리뷰 {expert.reviews}개</small>
															</>
														) : (
															<small className="text-muted">리뷰 없음</small>
														)}
													</div>
												</div>
												
												<div className="d-flex flex-wrap gap-1 my-3">
													{expert.specialties.slice(0, 3).map((specialty, index) => (
														<span 
															key={index} 
															className="badge bg-primary bg-opacity-10 text-primary"
														>
															{specialty}
														</span>
													))}
													{expert.specialties.length > 3 && (
														<span className="badge bg-secondary bg-opacity-10 text-secondary">
															+{expert.specialties.length - 3}
														</span>
													)}
												</div>

												<div className="d-flex justify-content-between align-items-center pt-3 border-top">
													<div>
														<i className="bi bi-geo-alt text-muted me-1"></i>
														<small className="text-muted">{expert.location}</small>
													</div>
													<div>
														<i className="bi bi-briefcase text-muted me-1"></i>
														<small className="text-muted">경력 {expert.experience}년</small>
													</div>
												</div>

												<div className="d-flex justify-content-between align-items-center mt-3">
													<div>
														<span className="fs-5 fw-bold text-primary">{expert.price.toLocaleString()}원</span>
														<small className="text-muted">/시간</small>
													</div>
													<span className="badge bg-success bg-opacity-10 text-success">
														<i className="bi bi-clock me-1"></i>
														{expert.availability}
													</span>
												</div>

												<div className="d-flex gap-2 mt-4">
													<button 
														onClick={() => openDetailModal(expert)}
														className="btn btn-outline-secondary flex-fill"
													>
														상세보기
													</button>
													<button 
														onClick={() => openInquiryModal(expert)}
														className="btn btn-primary flex-fill"
													>
														문의하기
													</button>
												</div>
											</div>
										</div>
									</div>
								))}
							</div>
						</>
					)}
				</div>
			</section>

			{/* 로그인 유도 모달 */}
			{modalType === "login" && selectedExpert && (
				<div 
					className="modal fade show d-block" 
					style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
					onClick={(e) => e.target === e.currentTarget && closeModal()}
				>
					<div className="modal-dialog modal-dialog-centered">
						<div className="modal-content rounded-4">
							<div className="modal-body p-5 text-center">
								<div className="icon-shape icon-80 bg-primary bg-opacity-10 rounded-circle mx-auto mb-4 d-flex align-items-center justify-content-center">
									<i className="bi bi-person-plus fs-1 text-primary"></i>
								</div>
								<h4 className="mb-3">로그인이 필요해요</h4>
								<p className="text-muted mb-4">
									<strong>{selectedExpert.name}</strong> 전문가에게 문의하시려면<br/>
									먼저 로그인해주세요.
								</p>
								<div className="d-flex gap-3 justify-content-center">
									<button 
										className="btn btn-outline-secondary"
										onClick={closeModal}
									>
										다음에 할게요
									</button>
									<Link href="/login" className="btn btn-primary">
										로그인하기
									</Link>
								</div>
								<div className="mt-3">
									<small className="text-muted">
										아직 계정이 없으신가요? <Link href="/register" className="text-primary">회원가입</Link>
									</small>
								</div>
							</div>
						</div>
					</div>
				</div>
			)}

			{/* 상세 모달 */}
			{modalType === "detail" && selectedExpert && (
				<div 
					className="modal fade show d-block" 
					style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
					onClick={(e) => e.target === e.currentTarget && closeModal()}
				>
					<div className="modal-dialog modal-dialog-centered modal-lg modal-dialog-scrollable">
						<div className="modal-content rounded-4">
							<div className="modal-header border-0 pb-0">
								<button type="button" className="btn-close" onClick={closeModal}></button>
							</div>
							<div className="modal-body p-4 p-lg-5">
								<div className="d-flex flex-column flex-md-row gap-4 mb-4 pb-4 border-bottom">
									<img 
										src={selectedExpert.image} 
										alt={selectedExpert.name}
										className="rounded-4"
										style={{ width: '200px', height: '200px', objectFit: 'cover'}}
										referrerPolicy="no-referrer"
										onError={(e) => {
											const target = e.target as HTMLImageElement
											target.src = DEFAULT_EXPERT_IMAGE
										}}
									/>
									<div className="flex-grow-1">
										<p className="text-primary btn-text mb-2">{selectedExpert.title}</p>
										<h3 className="mb-1">{selectedExpert.name}</h3>
										<p className="text-muted mb-3">{selectedExpert.company}</p>
										
										<div className="d-flex flex-wrap gap-3 mb-3">
											<div className="d-flex align-items-center">
												<i className="bi bi-geo-alt text-primary me-2"></i>
												<span>{selectedExpert.location}</span>
											</div>
											<div className="d-flex align-items-center">
												<i className="bi bi-briefcase text-primary me-2"></i>
												<span>경력 {selectedExpert.experience}년</span>
											</div>
											{selectedExpert.reviews > 0 && (
												<div className="d-flex align-items-center">
													<i className="bi bi-star-fill text-warning me-2"></i>
													<span>{selectedExpert.rating.toFixed(1)} ({selectedExpert.reviews}개 리뷰)</span>
												</div>
											)}
										</div>

										<div className="d-flex flex-wrap gap-2">
											{selectedExpert.specialties.map((specialty, index) => (
												<span 
													key={index}
													className="badge bg-primary bg-opacity-10 text-primary px-3 py-2"
												>
													{specialty}
												</span>
											))}
										</div>
									</div>
								</div>

								{/* 소개 */}
								<div className="mb-4">
									<h5 className="mb-3">
										<i className="bi bi-person-badge text-primary me-2"></i>
										전문가 소개
									</h5>
									<p className="text-muted">{selectedExpert.description || "상세 소개가 등록되지 않았습니다."}</p>
								</div>

								{/* 리뷰 섹션 */}
								<div>
									<div className="d-flex justify-content-between align-items-center mb-3">
										<h5 className="mb-0">
											<i className="bi bi-chat-quote text-primary me-2"></i>
											리뷰 ({expertReviews.length})
										</h5>
										{!showReviewForm && (
											<button 
												className="btn btn-outline-primary btn-sm"
												onClick={() => setShowReviewForm(true)}
											>
												<i className="bi bi-pencil me-1"></i>
												리뷰 작성
											</button>
										)}
									</div>

									{/* 리뷰 작성 폼 */}
									{showReviewForm && (
										<div className="mb-4">
											<div className="card border rounded-3">
												<div className="card-body">
													{reviewSubmitStatus === "success" ? (
														<div className="text-center py-3">
															<i className="bi bi-check-circle text-success fs-1 d-block mb-2"></i>
															<p className="text-success mb-0">리뷰가 등록되었습니다!</p>
														</div>
													) : (
														<form onSubmit={handleReviewSubmit}>
															<div className="mb-3">
																<label className="form-label">평점</label>
																<div>
																	{renderStars(reviewForm.rating, true, (rating) => 
																		setReviewForm(prev => ({ ...prev, rating }))
																	)}
																</div>
															</div>
															<div className="mb-3">
																<label className="form-label">작성자명 (선택)</label>
																<input
																	type="text"
																	className="form-control"
																	placeholder={profile?.name || "익명으로 등록됩니다"}
																	value={reviewForm.authorName}
																	onChange={(e) => setReviewForm(prev => ({ ...prev, authorName: e.target.value }))}
																/>
															</div>
															<div className="mb-3">
																<label className="form-label">리뷰 내용 <span className="text-danger">*</span></label>
																<textarea
																	className="form-control"
																	rows={3}
																	placeholder="상담 경험을 공유해주세요"
																	value={reviewForm.content}
																	onChange={(e) => setReviewForm(prev => ({ ...prev, content: e.target.value }))}
																	required
																></textarea>
															</div>
															<div className="d-flex gap-2">
																<button 
																	type="button"
																	className="btn btn-outline-secondary"
																	onClick={() => setShowReviewForm(false)}
																>
																	취소
																</button>
																<button 
																	type="submit" 
																	className="btn btn-primary"
																	disabled={reviewSubmitStatus === "loading"}
																>
																	{reviewSubmitStatus === "loading" ? (
																		<><span className="spinner-border spinner-border-sm me-2"></span>등록 중...</>
																	) : (
																		'리뷰 등록'
																	)}
																</button>
															</div>
														</form>
													)}
												</div>
											</div>
										</div>
									)}

									{/* 리뷰 목록 */}
									{reviewsLoading ? (
										<div className="text-center py-4">
											<div className="spinner-border spinner-border-sm text-primary"></div>
										</div>
									) : expertReviews.length === 0 ? (
										<div className="text-center py-4 text-muted">
											<i className="bi bi-chat-square-text fs-1 d-block mb-2"></i>
											<p className="mb-0">아직 등록된 리뷰가 없습니다.</p>
											<small>첫 번째 리뷰를 작성해보세요!</small>
										</div>
									) : (
										<div className="d-flex flex-column gap-3">
											{expertReviews.map((review) => (
												<div key={review.reviewId} className="p-3 bg-light rounded-3">
													<div className="d-flex justify-content-between align-items-start mb-2">
														<div>
															<strong>{review.authorName}</strong>
															<div className="d-flex align-items-center gap-1 mt-1">
																{renderStars(review.rating)}
															</div>
														</div>
														<small className="text-muted">{review.createdAt.split(' ')[0]}</small>
													</div>
													<p className="mb-0 text-muted">{review.content}</p>
												</div>
											))}
										</div>
									)}
								</div>
							</div>
							<div className="modal-footer border-0">
								<div className="d-flex justify-content-between align-items-center w-100">
									<div>
										<span className="fs-4 fw-bold text-primary">{selectedExpert.price.toLocaleString()}원</span>
										<span className="text-muted">/시간</span>
									</div>
									<button 
										className="btn btn-primary"
										onClick={() => {
											closeModal()
											setTimeout(() => openInquiryModal(selectedExpert), 100)
										}}
									>
										문의하기
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			)}

			{/* 문의 모달 */}
			{modalType === "inquiry" && selectedExpert && (
				<div 
					className="modal fade show d-block" 
					style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
					onClick={(e) => e.target === e.currentTarget && closeModal()}
				>
					<div className="modal-dialog modal-dialog-centered modal-lg">
						<div className="modal-content rounded-4">
							<div className="modal-header border-0 pb-0">
								<button type="button" className="btn-close" onClick={closeModal}></button>
							</div>
							<div className="modal-body p-4 p-lg-5">
								{submitStatus === "success" ? (
									<div className="text-center py-5">
										<div className="icon-shape icon-100 bg-success bg-opacity-10 rounded-circle mx-auto mb-4 d-flex align-items-center justify-content-center">
											<i className="bi bi-check-lg fs-1 text-success"></i>
										</div>
										<h4 className="text-success mb-3">문의 접수 완료!</h4>
										<p className="text-muted">{submitMessage}</p>
										<p className="text-muted small">
											문의 내역은 <Link href="/mypage" className="text-primary">마이페이지</Link>에서 확인할 수 있습니다.
										</p>
									</div>
								) : (
									<>
										<div className="d-flex align-items-center gap-4 mb-4 pb-4 border-bottom">
											<img 
												src={selectedExpert.image} 
												alt={selectedExpert.name}
												className="rounded-circle"
												style={{ width: '80px', height: '80px', objectFit: 'cover' }}
												referrerPolicy="no-referrer"
												onError={(e) => {
													const target = e.target as HTMLImageElement
													target.src = DEFAULT_EXPERT_IMAGE
												}}
											/>
											<div>
												<p className="text-primary btn-text mb-1">{selectedExpert.title}</p>
												<h4 className="mb-1">{selectedExpert.name}</h4>
												<p className="text-muted mb-0">{selectedExpert.company}</p>
											</div>
										</div>

										{/* 로그인 사용자 안내 */}
										<div className="alert alert-info mb-4">
											<i className="bi bi-info-circle me-2"></i>
											<strong>{profile?.name || '회원'}님</strong>의 정보가 자동으로 입력되었습니다. 필요시 수정해주세요.
										</div>

										<form onSubmit={handleSubmit}>
											<div className="row g-3">
												<div className="col-md-6">
													<label className="form-label">이름 <span className="text-danger">*</span></label>
													<input
														type="text"
														className="form-control"
														placeholder="홍길동"
														value={bookingForm.name}
														onChange={(e) => handleFormChange("name", e.target.value)}
														required
													/>
												</div>
												<div className="col-md-6">
													<label className="form-label">연락처 <span className="text-danger">*</span></label>
													<input
														type="tel"
														className="form-control"
														placeholder="010-1234-5678"
														value={bookingForm.phone}
														onChange={(e) => handleFormChange("phone", e.target.value)}
														required
													/>
												</div>
												<div className="col-md-6">
													<label className="form-label">이메일 <span className="text-danger">*</span></label>
													<input
														type="email"
														className="form-control"
														placeholder="example@email.com"
														value={bookingForm.email}
														onChange={(e) => handleFormChange("email", e.target.value)}
														required
													/>
												</div>
												<div className="col-md-6">
													<label className="form-label">회사명</label>
													<input
														type="text"
														className="form-control"
														placeholder="(주)회사명"
														value={bookingForm.company}
														onChange={(e) => handleFormChange("company", e.target.value)}
													/>
												</div>
												<div className="col-md-6">
													<label className="form-label">직책</label>
													<input
														type="text"
														className="form-control"
														placeholder="대표이사"
														value={bookingForm.position}
														onChange={(e) => handleFormChange("position", e.target.value)}
													/>
												</div>
												<div className="col-md-6">
													<label className="form-label">희망 상담 일시</label>
													<input
														type="datetime-local"
														className="form-control"
														value={bookingForm.consultDate}
														onChange={(e) => handleFormChange("consultDate", e.target.value)}
													/>
												</div>
												<div className="col-12">
													<label className="form-label">상담 주제 <span className="text-danger">*</span></label>
													<input
														type="text"
														className="form-control"
														placeholder="상담받고 싶은 주제를 입력하세요"
														value={bookingForm.topic}
														onChange={(e) => handleFormChange("topic", e.target.value)}
														required
													/>
												</div>
												<div className="col-12">
													<label className="form-label">상세 내용</label>
													<textarea
														className="form-control"
														rows={4}
														placeholder="현재 상황과 궁금한 점을 자세히 적어주세요"
														value={bookingForm.details}
														onChange={(e) => handleFormChange("details", e.target.value)}
													></textarea>
												</div>
											</div>

											{submitStatus === "error" && (
												<div className="alert alert-danger mt-3 mb-0">
													<i className="bi bi-exclamation-circle me-2"></i>
													{submitMessage}
												</div>
											)}

											<div className="d-flex justify-content-between align-items-center mt-4 pt-4 border-top">
												<div>
													<span className="fs-4 fw-bold text-primary">{selectedExpert.price.toLocaleString()}원</span>
													<span className="text-muted">/시간</span>
												</div>
												<div className="d-flex gap-2">
													<button type="button" className="btn btn-outline-secondary" onClick={closeModal}>
														취소
													</button>
													<button type="submit" className="btn btn-primary" disabled={submitStatus === "loading"}>
														{submitStatus === "loading" ? (
															<><span className="spinner-border spinner-border-sm me-2"></span>접수 중...</>
														) : (
															"문의 접수"
														)}
													</button>
												</div>
											</div>
										</form>
									</>
								)}
							</div>
						</div>
					</div>
				</div>
			)}
		</Layout>
	)
}
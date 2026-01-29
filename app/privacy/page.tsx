import Layout from "@/components/layout/Layout"
import PageHeader from "@/components/sections/PageHeader"

export default function PrivacyPage() {
	return (
		<Layout>
			<PageHeader title="개인정보처리방침" />
			
			<section className="py-120">
				<div className="container">
					<div className="row justify-content-center">
						<div className="col-lg-8">
							{/* 마지막 업데이트 */}
							<div className="mb-5">
								<span className="badge bg-primary bg-opacity-10 text-primary px-3 py-2">
									최종 수정일: 2025년 1월 1일
								</span>
							</div>

							{/* 개요 */}
							<div className="mb-5 p-4 bg-primary bg-opacity-10 rounded-3">
								<p className="mb-0 text-muted lh-lg">
									제이앤그로스(이하 "회사")는 「개인정보 보호법」에 따라 이용자의 개인정보를 보호하고 
									이와 관련한 고충을 신속하고 원활하게 처리할 수 있도록 다음과 같이 개인정보처리방침을 수립·공개합니다.
								</p>
							</div>

							{/* 제1조 */}
							<div className="mb-5">
								<h4 className="fw-bold mb-4">제1조 (개인정보의 수집 항목 및 수집 방법)</h4>
								
								<h6 className="fw-semibold mb-3">1. 수집하는 개인정보 항목</h6>
								<div className="table-responsive mb-4">
									<table className="table table-bordered">
										<thead className="table-light">
											<tr>
												<th style={{ width: '30%' }}>구분</th>
												<th>수집 항목</th>
											</tr>
										</thead>
										<tbody>
											<tr>
												<td><strong>필수 항목</strong></td>
												<td>이메일 주소, 비밀번호, 이름</td>
											</tr>
											<tr>
												<td><strong>선택 항목</strong></td>
												<td>연락처, 회사명, 직책, 사업자등록번호</td>
											</tr>
											<tr>
												<td><strong>자동 수집 항목</strong></td>
												<td>IP 주소, 쿠키, 방문 일시, 서비스 이용 기록, 기기 정보</td>
											</tr>
										</tbody>
									</table>
								</div>

								<h6 className="fw-semibold mb-3">2. 개인정보 수집 방법</h6>
								<ul className="text-muted lh-lg">
									<li className="mb-2">회원가입 및 서비스 이용 과정에서 이용자가 직접 입력</li>
									<li className="mb-2">고객센터를 통한 상담 과정에서 수집</li>
									<li className="mb-2">온라인 문의 및 상담 신청 시 수집</li>
									<li className="mb-2">서비스 이용 과정에서 자동으로 생성·수집</li>
								</ul>
							</div>

							{/* 제2조 */}
							<div className="mb-5">
								<h4 className="fw-bold mb-4">제2조 (개인정보의 수집 및 이용 목적)</h4>
								<p className="text-muted lh-lg mb-3">회사는 수집한 개인정보를 다음의 목적을 위해 이용합니다.</p>
								
								<div className="row g-3">
									<div className="col-md-6">
										<div className="card border h-100">
											<div className="card-body">
												<h6 className="fw-semibold mb-3">
													<i className="bi bi-person-check text-primary me-2"></i>
													회원 관리
												</h6>
												<ul className="text-muted small mb-0">
													<li>회원제 서비스 제공</li>
													<li>본인 확인 및 인증</li>
													<li>회원자격 유지·관리</li>
													<li>부정 이용 방지</li>
												</ul>
											</div>
										</div>
									</div>
									<div className="col-md-6">
										<div className="card border h-100">
											<div className="card-body">
												<h6 className="fw-semibold mb-3">
													<i className="bi bi-gear text-primary me-2"></i>
													서비스 제공
												</h6>
												<ul className="text-muted small mb-0">
													<li>AI 기업 진단 서비스</li>
													<li>정부지원사업 매칭</li>
													<li>전문가 상담 연결</li>
													<li>맞춤형 콘텐츠 제공</li>
												</ul>
											</div>
										</div>
									</div>
									<div className="col-md-6">
										<div className="card border h-100">
											<div className="card-body">
												<h6 className="fw-semibold mb-3">
													<i className="bi bi-megaphone text-primary me-2"></i>
													마케팅 활용
												</h6>
												<ul className="text-muted small mb-0">
													<li>신규 서비스 안내</li>
													<li>이벤트 정보 제공</li>
													<li>서비스 관련 공지</li>
												</ul>
											</div>
										</div>
									</div>
									<div className="col-md-6">
										<div className="card border h-100">
											<div className="card-body">
												<h6 className="fw-semibold mb-3">
													<i className="bi bi-graph-up text-primary me-2"></i>
													서비스 개선
												</h6>
												<ul className="text-muted small mb-0">
													<li>서비스 이용 통계</li>
													<li>서비스 품질 향상</li>
													<li>신규 서비스 개발</li>
												</ul>
											</div>
										</div>
									</div>
								</div>
							</div>

							{/* 제3조 */}
							<div className="mb-5">
								<h4 className="fw-bold mb-4">제3조 (개인정보의 보유 및 이용 기간)</h4>
								<p className="text-muted lh-lg mb-3">
									회사는 법령에 따른 개인정보 보유·이용 기간 또는 이용자로부터 개인정보를 수집 시 
									동의받은 개인정보 보유·이용 기간 내에서 개인정보를 처리·보유합니다.
								</p>
								
								<div className="table-responsive">
									<table className="table table-bordered">
										<thead className="table-light">
											<tr>
												<th style={{ width: '40%' }}>보유 정보</th>
												<th style={{ width: '30%' }}>보유 기간</th>
												<th>근거</th>
											</tr>
										</thead>
										<tbody>
											<tr>
												<td>회원 가입 및 관리 정보</td>
												<td>회원 탈퇴 시까지</td>
												<td>서비스 이용약관</td>
											</tr>
											<tr>
												<td>서비스 이용 기록</td>
												<td>3년</td>
												<td>전자상거래법</td>
											</tr>
											<tr>
												<td>계약 또는 청약철회 기록</td>
												<td>5년</td>
												<td>전자상거래법</td>
											</tr>
											<tr>
												<td>대금결제 및 재화 공급 기록</td>
												<td>5년</td>
												<td>전자상거래법</td>
											</tr>
											<tr>
												<td>소비자 불만 또는 분쟁처리 기록</td>
												<td>3년</td>
												<td>전자상거래법</td>
											</tr>
											<tr>
												<td>접속 기록</td>
												<td>3개월</td>
												<td>통신비밀보호법</td>
											</tr>
										</tbody>
									</table>
								</div>
							</div>

							{/* 제4조 */}
							<div className="mb-5">
								<h4 className="fw-bold mb-4">제4조 (개인정보의 제3자 제공)</h4>
								<p className="text-muted lh-lg mb-3">
									회사는 이용자의 개인정보를 제1조에서 명시한 범위 내에서만 처리하며, 
									이용자의 동의 없이는 본래의 범위를 초과하여 처리하거나 제3자에게 제공하지 않습니다.
								</p>
								<p className="text-muted lh-lg mb-3">다만, 다음의 경우에는 예외로 합니다.</p>
								<ul className="text-muted lh-lg">
									<li className="mb-2">이용자가 사전에 제3자 제공에 동의한 경우</li>
									<li className="mb-2">법령에 의해 제공이 요구되는 경우</li>
									<li className="mb-2">서비스 제공에 관한 계약 이행을 위해 필요한 경우</li>
								</ul>
							</div>

							{/* 제5조 */}
							<div className="mb-5">
								<h4 className="fw-bold mb-4">제5조 (개인정보 처리의 위탁)</h4>
								<p className="text-muted lh-lg mb-3">
									회사는 원활한 서비스 제공을 위해 다음과 같이 개인정보 처리 업무를 위탁하고 있습니다.
								</p>
								
								<div className="table-responsive">
									<table className="table table-bordered">
										<thead className="table-light">
											<tr>
												<th>수탁업체</th>
												<th>위탁 업무</th>
												<th>보유 기간</th>
											</tr>
										</thead>
										<tbody>
											<tr>
												<td>Amazon Web Services</td>
												<td>클라우드 서버 운영</td>
												<td>위탁계약 종료 시</td>
											</tr>
											<tr>
												<td>Supabase</td>
												<td>데이터베이스 관리</td>
												<td>위탁계약 종료 시</td>
											</tr>
										</tbody>
									</table>
								</div>
							</div>

							{/* 제6조 */}
							<div className="mb-5">
								<h4 className="fw-bold mb-4">제6조 (이용자의 권리·의무 및 행사 방법)</h4>
								<p className="text-muted lh-lg mb-3">
									이용자는 회사에 대해 언제든지 다음 각 호의 개인정보 보호 관련 권리를 행사할 수 있습니다.
								</p>
								
								<div className="row g-3 mb-4">
									<div className="col-md-6">
										<div className="d-flex align-items-start">
											<div className="icon-shape icon-sm bg-primary bg-opacity-10 rounded-circle me-3 flex-shrink-0">
												<i className="bi bi-eye text-primary"></i>
											</div>
											<div>
												<h6 className="fw-semibold mb-1">열람권</h6>
												<p className="text-muted small mb-0">개인정보 처리 현황 열람 요구</p>
											</div>
										</div>
									</div>
									<div className="col-md-6">
										<div className="d-flex align-items-start">
											<div className="icon-shape icon-sm bg-primary bg-opacity-10 rounded-circle me-3 flex-shrink-0">
												<i className="bi bi-pencil text-primary"></i>
											</div>
											<div>
												<h6 className="fw-semibold mb-1">정정권</h6>
												<p className="text-muted small mb-0">오류 등이 있을 경우 정정 요구</p>
											</div>
										</div>
									</div>
									<div className="col-md-6">
										<div className="d-flex align-items-start">
											<div className="icon-shape icon-sm bg-primary bg-opacity-10 rounded-circle me-3 flex-shrink-0">
												<i className="bi bi-trash text-primary"></i>
											</div>
											<div>
												<h6 className="fw-semibold mb-1">삭제권</h6>
												<p className="text-muted small mb-0">개인정보 삭제 요구</p>
											</div>
										</div>
									</div>
									<div className="col-md-6">
										<div className="d-flex align-items-start">
											<div className="icon-shape icon-sm bg-primary bg-opacity-10 rounded-circle me-3 flex-shrink-0">
												<i className="bi bi-pause-circle text-primary"></i>
											</div>
											<div>
												<h6 className="fw-semibold mb-1">처리정지권</h6>
												<p className="text-muted small mb-0">개인정보 처리정지 요구</p>
											</div>
										</div>
									</div>
								</div>

								<p className="text-muted lh-lg">
									위 권리 행사는 회사에 대해 서면, 전자우편 등을 통하여 하실 수 있으며, 
									회사는 이에 대해 지체 없이 조치하겠습니다.
								</p>
							</div>

							{/* 제7조 */}
							<div className="mb-5">
								<h4 className="fw-bold mb-4">제7조 (개인정보의 파기)</h4>
								<p className="text-muted lh-lg mb-3">
									회사는 개인정보 보유 기간의 경과, 처리목적 달성 등 개인정보가 불필요하게 되었을 때에는 
									지체 없이 해당 개인정보를 파기합니다.
								</p>
								
								<h6 className="fw-semibold mb-3">파기 방법</h6>
								<ul className="text-muted lh-lg">
									<li className="mb-2">
										<strong>전자적 파일 형태:</strong> 복원이 불가능한 방법으로 영구 삭제
									</li>
									<li className="mb-2">
										<strong>종이 문서:</strong> 분쇄기로 분쇄하거나 소각
									</li>
								</ul>
							</div>

							{/* 제8조 */}
							<div className="mb-5">
								<h4 className="fw-bold mb-4">제8조 (개인정보의 안전성 확보 조치)</h4>
								<p className="text-muted lh-lg mb-3">
									회사는 개인정보의 안전성 확보를 위해 다음과 같은 조치를 취하고 있습니다.
								</p>
								<ul className="text-muted lh-lg">
									<li className="mb-2">
										<strong>관리적 조치:</strong> 내부관리계획 수립·시행, 정기적 직원 교육
									</li>
									<li className="mb-2">
										<strong>기술적 조치:</strong> 개인정보처리시스템 접근 권한 관리, 접근통제시스템 설치, 
										고유식별정보 등의 암호화, 보안프로그램 설치
									</li>
									<li className="mb-2">
										<strong>물리적 조치:</strong> 전산실, 자료보관실 등의 접근 통제
									</li>
								</ul>
							</div>

							{/* 제9조 */}
							<div className="mb-5">
								<h4 className="fw-bold mb-4">제9조 (쿠키의 설치·운영 및 거부)</h4>
								<p className="text-muted lh-lg mb-3">
									회사는 이용자에게 개별적인 맞춤 서비스를 제공하기 위해 이용 정보를 저장하고 
									수시로 불러오는 '쿠키(cookie)'를 사용합니다.
								</p>
								
								<h6 className="fw-semibold mb-3">쿠키 설정 거부 방법</h6>
								<div className="bg-light rounded-3 p-4">
									<ul className="text-muted mb-0">
										<li className="mb-2">
											<strong>Chrome:</strong> 설정 → 개인정보 및 보안 → 쿠키 및 기타 사이트 데이터
										</li>
										<li className="mb-2">
											<strong>Safari:</strong> 환경설정 → 개인정보 보호 → 쿠키 및 웹사이트 데이터 관리
										</li>
										<li className="mb-2">
											<strong>Edge:</strong> 설정 → 쿠키 및 사이트 권한 → 쿠키 및 사이트 데이터 관리
										</li>
									</ul>
								</div>
							</div>

							{/* 제10조 */}
							<div className="mb-5">
								<h4 className="fw-bold mb-4">제10조 (개인정보 보호책임자)</h4>
								<p className="text-muted lh-lg mb-3">
									회사는 개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보 처리와 관련한 
									이용자의 불만처리 및 피해구제 등을 위하여 아래와 같이 개인정보 보호책임자를 지정하고 있습니다.
								</p>
								
								<div className="card border">
									<div className="card-body">
										<div className="row">
											<div className="col-md-6 mb-3 mb-md-0">
												<h6 className="fw-semibold mb-3">개인정보 보호책임자</h6>
												<ul className="list-unstyled text-muted mb-0">
													<li className="mb-1"><strong>성명:</strong> 홍길동</li>
													<li className="mb-1"><strong>직책:</strong> 대표이사</li>
													<li className="mb-1"><strong>연락처:</strong> 010-3374-4650</li>
													<li><strong>이메일:</strong> official.haedeun@gmail.com</li>
												</ul>
											</div>
											<div className="col-md-6">
												<h6 className="fw-semibold mb-3">개인정보 보호담당자</h6>
												<ul className="list-unstyled text-muted mb-0">
													<li className="mb-1"><strong>부서명:</strong> 개발팀</li>
													<li className="mb-1"><strong>연락처:</strong> 010-3374-4650</li>
													<li><strong>이메일:</strong> official.haedeun@gmail.com</li>
												</ul>
											</div>
										</div>
									</div>
								</div>
							</div>

							{/* 제11조 */}
							<div className="mb-5">
								<h4 className="fw-bold mb-4">제11조 (권익침해 구제방법)</h4>
								<p className="text-muted lh-lg mb-3">
									이용자는 아래의 기관에 대해 개인정보 침해에 대한 피해구제, 상담 등을 문의하실 수 있습니다.
								</p>
								
								<div className="row g-3">
									<div className="col-md-6">
										<div className="card border h-100">
											<div className="card-body">
												<h6 className="fw-semibold mb-2">개인정보침해신고센터</h6>
												<p className="text-muted small mb-1">(한국인터넷진흥원 운영)</p>
												<p className="text-muted small mb-1">전화: 118</p>
												<a href="https://privacy.kisa.or.kr" target="_blank" rel="noopener noreferrer" className="small">
													privacy.kisa.or.kr
												</a>
											</div>
										</div>
									</div>
									<div className="col-md-6">
										<div className="card border h-100">
											<div className="card-body">
												<h6 className="fw-semibold mb-2">개인정보분쟁조정위원회</h6>
												<p className="text-muted small mb-1">(개인정보보호위원회 운영)</p>
												<p className="text-muted small mb-1">전화: 1833-6972</p>
												<a href="https://www.kopico.go.kr" target="_blank" rel="noopener noreferrer" className="small">
													www.kopico.go.kr
												</a>
											</div>
										</div>
									</div>
									<div className="col-md-6">
										<div className="card border h-100">
											<div className="card-body">
												<h6 className="fw-semibold mb-2">대검찰청 사이버수사과</h6>
												<p className="text-muted small mb-1">전화: 02-3480-3573</p>
												<a href="https://www.spo.go.kr" target="_blank" rel="noopener noreferrer" className="small">
													www.spo.go.kr
												</a>
											</div>
										</div>
									</div>
									<div className="col-md-6">
										<div className="card border h-100">
											<div className="card-body">
												<h6 className="fw-semibold mb-2">경찰청 사이버안전국</h6>
												<p className="text-muted small mb-1">전화: 182</p>
												<a href="https://cyberbureau.police.go.kr" target="_blank" rel="noopener noreferrer" className="small">
													cyberbureau.police.go.kr
												</a>
											</div>
										</div>
									</div>
								</div>
							</div>

							{/* 부칙 */}
							<div className="p-4 bg-light rounded-3">
								<h5 className="fw-bold mb-3">부칙</h5>
								<p className="text-muted mb-0">
									본 개인정보처리방침은 2025년 1월 1일부터 시행됩니다.
								</p>
							</div>

							{/* 문의 안내 */}
							<div className="mt-5 p-4 border rounded-3">
								<h5 className="fw-bold mb-3">
									<i className="bi bi-question-circle text-primary me-2"></i>
									문의사항
								</h5>
								<p className="text-muted mb-3">
									개인정보처리방침에 대한 문의사항이 있으시면 아래로 연락주시기 바랍니다.
								</p>
								<div className="d-flex flex-column gap-2">
									<div>
										<i className="bi bi-envelope text-primary me-2"></i>
										<a href="mailto:official.haedeun@gmail.com" className="text-muted">
											official.haedeun@gmail.com
										</a>
									</div>
									<div>
										<i className="bi bi-telephone text-primary me-2"></i>
										<a href="tel:010-3374-4650" className="text-muted">
											010-3374-4650
										</a>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</Layout>
	)
}
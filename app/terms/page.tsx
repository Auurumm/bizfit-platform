import Layout from "@/components/layout/Layout"
import PageHeader from "@/components/sections/PageHeader"

export default function TermsPage() {
	return (
		<Layout>
			<PageHeader title="이용약관" />
			
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

							{/* 제1조 */}
							<div className="mb-5">
								<h4 className="fw-bold mb-4">제1조 (목적)</h4>
								<p className="text-muted lh-lg">
									본 약관은 제이앤그로스(이하 "회사")가 운영하는 비즈핏(BizFit) 서비스(이하 "서비스")의 이용과 관련하여 회사와 이용자 간의 권리, 의무 및 책임 사항, 기타 필요한 사항을 규정함을 목적으로 합니다.
								</p>
							</div>

							{/* 제2조 */}
							<div className="mb-5">
								<h4 className="fw-bold mb-4">제2조 (정의)</h4>
								<p className="text-muted lh-lg mb-3">본 약관에서 사용하는 용어의 정의는 다음과 같습니다.</p>
								<ul className="text-muted lh-lg">
									<li className="mb-2">
										<strong>"서비스"</strong>란 회사가 제공하는 AI 기반 정부지원사업 매칭, 기업 진단, 전문가 매칭 등 관련 제반 서비스를 의미합니다.
									</li>
									<li className="mb-2">
										<strong>"이용자"</strong>란 본 약관에 따라 회사가 제공하는 서비스를 받는 회원 및 비회원을 말합니다.
									</li>
									<li className="mb-2">
										<strong>"회원"</strong>이란 회사에 개인정보를 제공하여 회원등록을 한 자로서, 회사의 정보를 지속적으로 제공받으며 서비스를 계속적으로 이용할 수 있는 자를 말합니다.
									</li>
									<li className="mb-2">
										<strong>"비회원"</strong>이란 회원에 가입하지 않고 회사가 제공하는 서비스를 이용하는 자를 말합니다.
									</li>
								</ul>
							</div>

							{/* 제3조 */}
							<div className="mb-5">
								<h4 className="fw-bold mb-4">제3조 (약관의 효력 및 변경)</h4>
								<ul className="text-muted lh-lg">
									<li className="mb-2">
										본 약관은 서비스를 이용하고자 하는 모든 이용자에게 그 효력이 발생합니다.
									</li>
									<li className="mb-2">
										회사는 필요한 경우 관련 법령을 위배하지 않는 범위에서 본 약관을 변경할 수 있습니다.
									</li>
									<li className="mb-2">
										약관이 변경되는 경우 회사는 변경 사항을 시행일자 7일 전부터 서비스 내 공지사항을 통해 공지합니다.
									</li>
									<li className="mb-2">
										이용자가 변경된 약관에 동의하지 않는 경우 서비스 이용을 중단하고 탈퇴할 수 있습니다.
									</li>
								</ul>
							</div>

							{/* 제4조 */}
							<div className="mb-5">
								<h4 className="fw-bold mb-4">제4조 (서비스의 제공)</h4>
								<p className="text-muted lh-lg mb-3">회사는 다음과 같은 서비스를 제공합니다.</p>
								<ul className="text-muted lh-lg">
									<li className="mb-2">AI 기반 기업 자가진단 서비스</li>
									<li className="mb-2">정부지원사업 정보 제공 및 매칭 서비스</li>
									<li className="mb-2">전문가 매칭 및 상담 서비스</li>
									<li className="mb-2">기타 회사가 정하는 서비스</li>
								</ul>
							</div>

							{/* 제5조 */}
							<div className="mb-5">
								<h4 className="fw-bold mb-4">제5조 (회원가입)</h4>
								<ul className="text-muted lh-lg">
									<li className="mb-2">
										이용자는 회사가 정한 양식에 따라 회원정보를 기입한 후 본 약관에 동의한다는 의사표시를 함으로써 회원가입을 신청합니다.
									</li>
									<li className="mb-2">
										회사는 전항과 같이 회원으로 가입할 것을 신청한 이용자 중 다음 각 호에 해당하지 않는 한 회원으로 등록합니다.
									</li>
									<li className="mb-2">
										가입신청자가 본 약관에 의하여 이전에 회원자격을 상실한 적이 있는 경우
									</li>
									<li className="mb-2">
										등록 내용에 허위, 기재누락, 오기가 있는 경우
									</li>
									<li className="mb-2">
										기타 회원으로 등록하는 것이 회사의 기술상 현저히 지장이 있다고 판단되는 경우
									</li>
								</ul>
							</div>

							{/* 제6조 */}
							<div className="mb-5">
								<h4 className="fw-bold mb-4">제6조 (회원 탈퇴 및 자격 상실)</h4>
								<ul className="text-muted lh-lg">
									<li className="mb-2">
										회원은 회사에 언제든지 탈퇴를 요청할 수 있으며, 회사는 즉시 회원탈퇴를 처리합니다.
									</li>
									<li className="mb-2">
										회원이 다음 각 호의 사유에 해당하는 경우, 회사는 회원자격을 제한 및 정지시킬 수 있습니다.
									</li>
									<li className="mb-2">
										가입 신청 시 허위 내용을 등록한 경우
									</li>
									<li className="mb-2">
										다른 사람의 서비스 이용을 방해하거나 그 정보를 도용하는 등 전자상거래 질서를 위협하는 경우
									</li>
									<li className="mb-2">
										서비스를 이용하여 법령 또는 본 약관이 금지하거나 공서양속에 반하는 행위를 하는 경우
									</li>
								</ul>
							</div>

							{/* 제7조 */}
							<div className="mb-5">
								<h4 className="fw-bold mb-4">제7조 (이용자의 의무)</h4>
								<p className="text-muted lh-lg mb-3">이용자는 다음 행위를 하여서는 안 됩니다.</p>
								<ul className="text-muted lh-lg">
									<li className="mb-2">신청 또는 변경 시 허위 내용의 등록</li>
									<li className="mb-2">타인의 정보 도용</li>
									<li className="mb-2">회사가 게시한 정보의 변경</li>
									<li className="mb-2">회사가 정한 정보 이외의 정보(컴퓨터 프로그램 등) 등의 송신 또는 게시</li>
									<li className="mb-2">회사와 기타 제3자의 저작권 등 지적재산권에 대한 침해</li>
									<li className="mb-2">회사 및 기타 제3자의 명예를 손상시키거나 업무를 방해하는 행위</li>
									<li className="mb-2">외설 또는 폭력적인 메시지, 화상, 음성, 기타 공서양속에 반하는 정보를 서비스에 공개 또는 게시하는 행위</li>
								</ul>
							</div>

							{/* 제8조 */}
							<div className="mb-5">
								<h4 className="fw-bold mb-4">제8조 (회사의 의무)</h4>
								<ul className="text-muted lh-lg">
									<li className="mb-2">
										회사는 법령과 본 약관이 금지하거나 공서양속에 반하는 행위를 하지 않으며, 본 약관이 정하는 바에 따라 지속적이고 안정적으로 서비스를 제공하기 위해 최선을 다합니다.
									</li>
									<li className="mb-2">
										회사는 이용자가 안전하게 서비스를 이용할 수 있도록 이용자의 개인정보 보호를 위한 보안 시스템을 갖추어야 합니다.
									</li>
									<li className="mb-2">
										회사는 이용자가 원하지 않는 영리목적의 광고성 전자우편을 발송하지 않습니다.
									</li>
								</ul>
							</div>

							{/* 제9조 */}
							<div className="mb-5">
								<h4 className="fw-bold mb-4">제9조 (개인정보 보호)</h4>
								<p className="text-muted lh-lg">
									회사는 이용자의 개인정보를 보호하기 위해 개인정보처리방침을 수립하고 이를 준수합니다. 
									회사의 개인정보처리방침은 별도의 페이지에서 확인할 수 있습니다.
								</p>
							</div>

							{/* 제10조 */}
							<div className="mb-5">
								<h4 className="fw-bold mb-4">제10조 (면책조항)</h4>
								<ul className="text-muted lh-lg">
									<li className="mb-2">
										회사는 천재지변 또는 이에 준하는 불가항력으로 인하여 서비스를 제공할 수 없는 경우에는 서비스 제공에 관한 책임이 면제됩니다.
									</li>
									<li className="mb-2">
										회사는 이용자의 귀책사유로 인한 서비스 이용의 장애에 대하여 책임을 지지 않습니다.
									</li>
									<li className="mb-2">
										회사는 이용자가 서비스를 이용하여 기대하는 수익을 상실한 것에 대하여 책임을 지지 않으며, 그 밖의 서비스를 통하여 얻은 자료로 인한 손해에 관하여 책임을 지지 않습니다.
									</li>
									<li className="mb-2">
										회사는 이용자가 게재한 정보, 자료, 사실의 신뢰도, 정확성 등 내용에 관해서는 책임을 지지 않습니다.
									</li>
								</ul>
							</div>

							{/* 제11조 */}
							<div className="mb-5">
								<h4 className="fw-bold mb-4">제11조 (분쟁 해결)</h4>
								<ul className="text-muted lh-lg">
									<li className="mb-2">
										회사는 이용자가 제기하는 정당한 의견이나 불만을 반영하고 그 피해를 보상처리하기 위하여 피해보상처리기구를 설치, 운영합니다.
									</li>
									<li className="mb-2">
										회사와 이용자 간에 발생한 전자상거래 분쟁에 관한 소송은 대한민국 법을 적용하며, 회사의 본사 소재지를 관할하는 법원을 전속관할로 합니다.
									</li>
								</ul>
							</div>

							{/* 부칙 */}
							<div className="p-4 bg-light rounded-3">
								<h5 className="fw-bold mb-3">부칙</h5>
								<p className="text-muted mb-0">
									본 약관은 2025년 1월 1일부터 시행됩니다.
								</p>
							</div>

							{/* 문의 안내 */}
							<div className="mt-5 p-4 border rounded-3">
								<h5 className="fw-bold mb-3">
									<i className="bi bi-question-circle text-primary me-2"></i>
									문의사항
								</h5>
								<p className="text-muted mb-3">
									본 약관에 대한 문의사항이 있으시면 아래로 연락주시기 바랍니다.
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
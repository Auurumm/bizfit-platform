import Link from 'next/link'
import Layout from "@/components/layout/Layout"

export default function NotFound() {
  return (
    <Layout>
      <section className="py-160">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6 text-center">
              <div className="display-1 fw-bold text-primary mb-4">404</div>
              <h2 className="mb-3">페이지를 찾을 수 없습니다</h2>
              <p className="text-muted mb-5">
                요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.
              </p>
              <div className="d-flex gap-3 justify-content-center">
                <Link href="/" className="btn btn-primary">
                  <i className="bi bi-house me-2"></i>
                  홈으로
                </Link>
                <Link href="/mypage" className="btn btn-outline-primary">
                  <i className="bi bi-person me-2"></i>
                  마이페이지
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}
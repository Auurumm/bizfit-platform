import Link from "next/link";

export default function Section3() {
    return (
        <>
            {/*law-firm single-news-section-3*/}
            <section className="law-firm-single-news-section-3 py-120 position-relative overflow-hidden">
                <div className="container">
                    <h2 className="ds-6 fw-medium mb-6 text-anime-style-2">Related news:</h2>
                    <div className="row g-4">
                        <div className="col-12 col-lg-4 col-md-6">
                            <div
                                className="card-news d-flex flex-column"
                                data-aos="fade-up"
                                data-aos-delay={0}
                            >
                                <div className="position-relative align-items-center h-100">
                                    <div className="position-relative">
                                        <Link href="/single-news">
                                            <img
                                                className="rounded-0"
                                                src="assets/imgs/pages/law-firm/page-news/img-1.png"
                                                alt="AstraX"
                                            />
                                        </Link>
                                        <Link
                                            href="@@link-category"
                                            className="position-absolute top-100 end-0 translate-middle-y me-5 bg-primary text-white px-2 py-0"
                                        >
                                            <span className="fs-8 fw-bold text-white">law</span>
                                        </Link>
                                    </div>
                                </div>
                                <div>
                                    <div className="d-flex card-news-information mt- gap-4 mt-4">
                                        <div className="d-flex align-items-center gap-1 mb-2">
                                            <i className="fa-solid fa-calendar-days text-dark" />
                                            <p className="mb-0">December 21, 2025</p>
                                        </div>
                                        <div className="d-flex align-items-center gap-1">
                                            <i className="fa-regular fa-user text-dark" />
                                            <span className="opacity-50">By</span>
                                            <Link href="@@link-author" className="mb-0 text-dark">
                                                Admin
                                            </Link>
                                        </div>
                                    </div>
                                    <Link href="/single-news" className="mt-auto">
                                        <h6 className="text-dark text-anime-style-2">
                                            2025: brace for the 'big one' cyber attack as always.
                                        </h6>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-lg-4 col-md-6">
                            <div
                                className="card-news d-flex flex-column"
                                data-aos="fade-up"
                                data-aos-delay={200}
                            >
                                <div className="position-relative align-items-center h-100">
                                    <div className="position-relative">
                                        <Link href="/single-news">
                                            <img
                                                className="rounded-0"
                                                src="assets/imgs/pages/law-firm/page-news/img-2.png"
                                                alt="AstraX"
                                            />
                                        </Link>
                                        <Link
                                            href="@@link-category"
                                            className="position-absolute top-100 end-0 translate-middle-y me-5 bg-primary text-white px-2 py-0"
                                        >
                                            <span className="fs-8 fw-bold text-white">crime</span>
                                        </Link>
                                    </div>
                                </div>
                                <div>
                                    <div className="d-flex card-news-information mt- gap-4 mt-4">
                                        <div className="d-flex align-items-center gap-1 mb-2">
                                            <i className="fa-solid fa-calendar-days text-dark" />
                                            <p className="mb-0">December 21, 2025</p>
                                        </div>
                                        <div className="d-flex align-items-center gap-1">
                                            <i className="fa-regular fa-user text-dark" />
                                            <span className="opacity-50">By</span>
                                            <Link href="@@link-author" className="mb-0 text-dark">
                                                Admin
                                            </Link>
                                        </div>
                                    </div>
                                    <Link href="/single-news" className="mt-auto">
                                        <h6 className="text-dark text-anime-style-2">
                                            2025: brace for the 'big one' cyber attack as always.
                                        </h6>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-lg-4 col-md-6">
                            <div
                                className="card-news d-flex flex-column"
                                data-aos="fade-up"
                                data-aos-delay={400}
                            >
                                <div className="position-relative align-items-center h-100">
                                    <div className="position-relative">
                                        <Link href="/single-news">
                                            <img
                                                className="rounded-0"
                                                src="assets/imgs/pages/law-firm/page-news/img-3.png"
                                                alt="AstraX"
                                            />
                                        </Link>
                                        <Link
                                            href="@@link-category"
                                            className="position-absolute top-100 end-0 translate-middle-y me-5 bg-primary text-white px-2 py-0"
                                        >
                                            <span className="fs-8 fw-bold text-white">insurance</span>
                                        </Link>
                                    </div>
                                </div>
                                <div>
                                    <div className="d-flex card-news-information mt- gap-4 mt-4">
                                        <div className="d-flex align-items-center gap-1 mb-2">
                                            <i className="fa-solid fa-calendar-days text-dark" />
                                            <p className="mb-0">December 21, 2025</p>
                                        </div>
                                        <div className="d-flex align-items-center gap-1">
                                            <i className="fa-regular fa-user text-dark" />
                                            <span className="opacity-50">By</span>
                                            <Link href="@@link-author" className="mb-0 text-dark">
                                                Admin
                                            </Link>
                                        </div>
                                    </div>
                                    <Link href="/single-news" className="mt-auto">
                                        <h6 className="text-dark text-anime-style-2">
                                            2025: brace for the 'big one' cyber attack as always.
                                        </h6>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

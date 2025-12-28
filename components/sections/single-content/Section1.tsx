import Link from "next/link";

export default function Section1() {
    return (
        <>
            {/*law-firm single-content section 1*/}
            <section className="law-firm-single-content-section-1 position-relative py-120 overflow-hidden">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-5">
                            <img
                                className="img-custom-anim-left"
                                src="assets/imgs/pages/law-firm/page-single-content/img-1.png"
                                alt="AstraX"
                            />
                        </div>
                        <div className="col-lg-6 mx-lg-auto">
                            <div className="btn-text text-primary fw-semibold mb-2">speaker</div>
                            <h5 className="mb-5 fw-medium text-anime-style-2">
                                Eliana M. Thompson
                            </h5>
                            <p>
                                Join us at the most anticipated design event of the year! Design
                                Summit 2025 is a global gathering of designers, technologists, and
                                innovators, all committed to pushing the boundaries of creativity
                                and technology.
                            </p>
                            <p>
                                This year’s theme centers on the evolving role of design in crafting
                                meaningful, sustainable, and inclusive experiences. Together, we’ll
                                explore how design intersects with technology, ethics, and culture
                                to influence the way we live, work, and interact with the world.
                            </p>
                            <h5 className="mb-5 fw-medium mt-6 text-anime-style-2">
                                Qualifications
                            </h5>
                            <ul className="list-unstyled">
                                <li data-aos="fade-left" data-aos-delay={0} className="border-top">
                                    <p className="mb-0 py-3 fw-regular fs-18">
                                        <span className="text-dark fw-medium">2002 -</span> Bachelor of
                                        law passed, the city law school, London
                                    </p>
                                </li>
                                <li
                                    data-aos="fade-left"
                                    data-aos-delay={200}
                                    className="border-top"
                                >
                                    <p className="mb-0 py-3 fw-regular fs-18">
                                        <span className="text-dark fw-medium">2004 -</span> Master of
                                        law passed, oxford university, England
                                    </p>
                                </li>
                                <li
                                    data-aos="fade-left"
                                    data-aos-delay={400}
                                    className="border-top"
                                >
                                    <p className="mb-0 py-3 fw-regular fs-18">
                                        <span className="text-dark fw-medium">2006 -</span> Member of
                                        law bar council association, California
                                    </p>
                                </li>
                                <li
                                    data-aos="fade-left"
                                    data-aos-delay={600}
                                    className="border-top border-bottom"
                                >
                                    <p className="mb-0 py-3 fw-regular fs-18">
                                        <span className="text-dark fw-medium">2008 -</span> Member of
                                        international law bar association, New York
                                    </p>
                                </li>
                            </ul>
                            <h5 className="mb-5 fw-medium mt-6 text-anime-style-2">
                                Awards &amp; achievements
                            </h5>
                            <div className="d-flex align-items-center gap-4 pb-7 mb-7 border-bottom">
                                <img
                                    data-aos="fade-left"
                                    data-aos-delay={200}
                                    src="assets/imgs/pages/law-firm/page-single-content/logo-1.png"
                                    alt="AstraX"
                                />
                                <img
                                    data-aos="fade-left"
                                    data-aos-delay={400}
                                    src="assets/imgs/pages/law-firm/page-single-content/logo-2.png"
                                    alt="AstraX"
                                />
                                <img
                                    data-aos="fade-left"
                                    data-aos-delay={600}
                                    src="assets/imgs/pages/law-firm/page-single-content/logo-1.png"
                                    alt="AstraX"
                                />
                            </div>
                            <p>
                                This year’s theme centers on the evolving role of design in crafting
                                meaningful, sustainable, and inclusive experiences. Together, we’ll
                                explore how design intersects with technology, ethics, and culture
                                to influence the way we live, work, and interact with the world.
                            </p>
                            <Link href="#" className="btn btn-dark mt-6 hover-up">
                                download cv
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width={16}
                                    height={16}
                                    viewBox="0 0 16 16"
                                    fill="none"
                                >
                                    <g clipPath="url(#clip0_1490_457)">
                                        <path
                                            d="M15.8167 7.55759C15.8165 7.5574 15.8163 7.55719 15.8161 7.557L12.5504 4.307C12.3057 4.06353 11.91 4.06444 11.6665 4.30912C11.423 4.55378 11.4239 4.9495 11.6686 5.193L13.8612 7.375H0.625C0.279813 7.375 0 7.65481 0 8C0 8.34519 0.279813 8.625 0.625 8.625H13.8612L11.6686 10.807C11.4239 11.0505 11.423 11.4462 11.6665 11.6909C11.91 11.9356 12.3058 11.9364 12.5504 11.693L15.8162 8.443C15.8163 8.44281 15.8165 8.44259 15.8167 8.4424C16.0615 8.19809 16.0607 7.80109 15.8167 7.55759Z"
                                            fill="white"
                                        />
                                    </g>
                                </svg>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

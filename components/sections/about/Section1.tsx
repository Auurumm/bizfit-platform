import Link from "next/link"

export default function Section1() {
    return (
        <>
            {/*law-firm about section 1*/}
            <section className="law-firm-about-section-1 position-relative pt-150 overflow-hidden">
                <div className="container position-relative z-1 pb-250">
                    <div className="row align-items-center">
                        <div className="col-lg-6 order-2 order-lg-1">
                            <div className="position-relative d-inline-block mt-lg-0 mt-5">
                                <div className="position-relative z-0">
                                    <img
                                        className=" wow img-custom-anim-left"
                                        src="assets/imgs/pages/law-firm/page-home/home-section-4/img-1.png"
                                        alt="AstraX"
                                    />
                                </div>
                                <div
                                    className="d-none d-md-block"
                                    data-aos="fade-up"
                                    data-aos-delay={200}
                                >
                                    <img
                                        className="position-absolute top-100 start-100 z-2 translate-middle z-1 border border-4 border-white shadow"
                                        src="assets/imgs/pages/law-firm/page-home/home-section-4/img-2.png"
                                        alt="AstraX"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 order-1 order-lg-2">
                            <span className="content-top btn-text text-primary fw-semibold rounded-pill border border-primary px-3 py-2 bg-white">
                                our history
                            </span>
                            <h2
                                className="mt-3 mb-4 text-anime-style-2"
                                data-aos="fade-right"
                                data-aos-delay={500}
                            >
                                We serve quality solution for all peoples
                            </h2>
                            <p>
                                We offer a wide range of digital marketing services that cater to
                                business of all sizes. A forward-thinking and clever approach. In
                                our early years, we faced challenges that shaped our approach.
                            </p>
                            <p className="mb-6 ">
                                At [Your Law Firm Name], we are dedicated to delivering exceptional
                                legal services tailored to meet the unique needs of each client. Our
                                experienced team specializes in a wide range of legal areas,
                                including corporate and business law, where we assist with business
                                formation
                            </p>
                            <Link href="/contact" className="btn btn-outline-secondary hover-up">
                                <span>get in touch</span>
                                <svg
                                    className="fill-primary"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width={16}
                                    height={16}
                                    viewBox="0 0 16 16"
                                    fill="none"
                                >
                                    <g clipPath="url(#clip0_1008_1294)">
                                        <path
                                            d="M15.8167 7.55759C15.8165 7.5574 15.8163 7.55719 15.8161 7.557L12.5504 4.307C12.3057 4.06353 11.91 4.06444 11.6665 4.30912C11.423 4.55378 11.4239 4.9495 11.6686 5.193L13.8612 7.375H0.625C0.279813 7.375 0 7.65481 0 8C0 8.34519 0.279813 8.625 0.625 8.625H13.8612L11.6686 10.807C11.4239 11.0505 11.423 11.4462 11.6665 11.6909C11.91 11.9356 12.3058 11.9364 12.5504 11.693L15.8162 8.443C15.8163 8.44281 15.8165 8.44259 15.8167 8.4424C16.0615 8.19809 16.0607 7.80109 15.8167 7.55759Z"
                                            fill="#B98E44"
                                        />
                                    </g>
                                </svg>
                            </Link>
                            <Link href="#" className="btn">
                                info@astrax.com
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </>

    )
}

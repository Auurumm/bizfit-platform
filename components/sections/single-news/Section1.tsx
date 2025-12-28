import Link from "next/link";

export default function Section1() {
    return (
        <>
            {/*law-firm single-news-section-1*/}
            <section className="law-firm-single-news-section-1 position-relative overflow-hidden">
                <div
                    className="pt-250 pb-350 position-relative z-0"
                    data-background="assets/imgs/pages/law-firm/page-home/home-section-1/bg-img.png"
                >
                    <div className="overlay" />
                    <div className="container position-relative z-1 pt-8 text-lg-start text-center">
                        <div className="row align-items-center">
                            <div className="col-12 text-center">
                                <span className="content-top btn-text text-primary fw-semibold rounded-pill border border-primary px-3 py-2">
                                    #01 law firm &amp; agency
                                </span>
                                <h1 className="text-white ds-1 mt-4 text-anime-style-2 text-anime-style-2">
                                    Emerging Cybersecurity Trends and Innovations for 2025
                                </h1>
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    className="container position-relative z-3"
                    data-aos="zoom-in"
                    data-aos-delay={200}
                >
                    <div className="banner-img">
                        <img
                            src="assets/imgs/pages/law-firm/page-single-news/img-1.png"
                            alt="AstraX"
                        />
                    </div>
                </div>
            </section>
        </>
    )
}

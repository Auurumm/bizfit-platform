import Link from "next/link"

const newsItems = [
    { id: 1, img: "img-1.png", category: "Consultancy", delay: 0, title: "Emerging Cybersecurity Trends and Innovations for 2025" },
    { id: 2, img: "img-2.png", category: "crime", delay: 200, title: "The Alarming Rise of Cyber Crime Rates and Online Fraud" },
    { id: 3, img: "img-3.png", category: "insurance", delay: 400, title: "Comprehensive Insurance Policies Against Cyber Attacks" },
    { id: 4, img: "img-4.png", category: "law", delay: 0, title: "New Cyber Laws in 2025: How They Impact Businesses and Individuals" },
    { id: 5, img: "img-5.png", category: "crime", delay: 200, title: "Dark Web Activities: The Growing Threat of Illegal Online Operations" },
    { id: 6, img: "img-6.png", category: "insurance", delay: 400, title: "Key Updates in Cyber Insurance Policies for 2025" },
    { id: 7, img: "img-7.png", category: "law", delay: 0, title: "Legal Protection Strategies for Businesses Against Cyber Threats" },
    { id: 8, img: "img-8.png", category: "crime", delay: 200, title: "Identity Theft Prevention Techniques in the Digital Age" },
    { id: 9, img: "img-9.png", category: "insurance", delay: 400, title: "The Benefits of Cyber Insurance for Businesses and Individuals" },
    { id: 10, img: "img-10.png", category: "law", delay: 0, title: "Understanding Data Privacy Regulations and Their Global Impact" },
    { id: 11, img: "img-11.png", category: "crime", delay: 200, title: "The Surge in Phishing Attacks: How to Stay Protected" },
    { id: 12, img: "img-12.png", category: "insurance", delay: 400, title: "Insurance Coverage for Data Breaches: What You Need to Know" },
    { id: 13, img: "img-13.png", category: "law", delay: 0, title: "Corporate Cybersecurity Laws and Compliance in 2025" },
    { id: 14, img: "img-14.png", category: "crime", delay: 200, title: "Ransomware Threats on the Rise: Strategies for Defense" },
    { id: 15, img: "img-15.png", category: "insurance", delay: 400, title: "A Step-by-Step Guide to the Cyber Insurance Claim Process" },
    { id: 16, img: "img-16.png", category: "law", delay: 0, title: "Navigating International Cyber Laws and Cross-Border Regulations" },
    { id: 17, img: "img-17.png", category: "crime", delay: 200, title: "Cyber Fraud Cases in 2025: Trends, Prevention, and Prosecution" },
    { id: 18, img: "img-18.png", category: "insurance", delay: 400, title: "The Cyber Insurance Outlook for 2025: Trends and Predictions" },
];


export default function Section1() {
    return (
        <>
            {/*law-firm news section 1*/}
            <section className="law-firm-news-section-1 position-relative pt-120 overflow-hidden">
                <div className="container">
                    <div className="row">
                        {newsItems.map((item) => (
                            <div key={item.id} className="col-12 col-lg-4 col-md-6">
                                <div
                                    className="card-news mb-5 d-flex flex-column overflow-hidden"
                                    data-aos="fade-up"
                                    data-aos-delay={item.delay}
                                >
                                    <div className="position-relative align-items-center h-100">
                                        <div className="position-relative">
                                            <Link href="/single-news" className="zoom-img">
                                                <img
                                                    className="rounded-0"
                                                    src={`assets/imgs/pages/law-firm/page-news/${item.img}`}
                                                    alt="AstraX"
                                                />
                                            </Link>
                                            <Link
                                                href="#"
                                                className="position-absolute top-100 end-0 translate-middle-y me-5 bg-primary text-white px-2 py-0"
                                            >
                                                <span className="fs-8 fw-bold text-white">{item.category}</span>
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
                                                <Link href="#" className="mb-0 text-dark">
                                                    Admin
                                                </Link>
                                            </div>
                                        </div>
                                        <Link href="/single-news" className="mt-auto">
                                            <h6 className="text-dark text-anime-style-3">
                                                {item.title}
                                            </h6>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    )
}

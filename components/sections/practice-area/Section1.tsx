import React from 'react'
import Link from 'next/link'

// Define TypeScript interface for service card props
interface ServiceCardProps {
    iconSrc: string;
    title: string;
    description: string;
    imgSrc?: string; // Optional, as all cards use the same image in this case
    link?: string;
}

// Reusable ServiceCard component
const ServiceCard: React.FC<ServiceCardProps> = ({
    iconSrc,
    title,
    description,
    imgSrc = '/assets/imgs/pages/law-firm/page-home/home-section-3/img-1.png',
    link = '/single-service',
}) => (
    <div className="col-lg-4 col-md-6">
        <div className="card-service position-relative d-inline-block overflow-hidden">
            <div className="card-btn">
                <img src={imgSrc} alt="AstraX" />
                <div className="position-absolute top-50 start-50 translate-middle">
                    <Link href={link} className="btn btn-primary hover-up">
                        <span>read more</span>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={16}
                            height={16}
                            viewBox="0 0 16 16"
                            fill="none"
                        >
                            <g clipPath="url(#clip0_1008_648)">
                                <path
                                    d="M15.8167 7.55759C15.8165 7.5574 15.8163 7.55719 15.8161 7.557L12.5504 4.307C12.3057 4.06353 11.91 4.06444 11.6665 4.30912C11.423 4.55378 11.4239 4.9495 11.6686 5.193L13.8612 7.375H0.625C0.279813 7.375 0 7.65481 0 8C0 8.34519 0.279813 8.625 0.625 8.625H13.8612L11.6686 10.807C11.4239 11.0505 11.423 11.4462 11.6665 11.6909C11.91 11.9356 12.3058 11.9364 12.5504 11.693L15.8162 8.443C15.8163 8.44281 15.8165 8.44259 15.8167 8.4424C16.0615 8.19809 16.0607 7.80109 15.8167 7.55759Z"
                                    fill="white"
                                />
                            </g>
                        </svg>
                    </Link>
                </div>
            </div>
            <div
                className="card-content position-absolute top-50 start-50 w-100 h-100 z-1 translate-middle p-5 d-flex flex-column border border-white border-opacity-10 bg-transparent d-inline-block"
                data-aos="fade-left"
                data-aos-delay={500}
            >
                <div className="icon-xxxl">
                    <img src={iconSrc} alt="AstraX" />
                </div>
                <h6 className="text-white mt-auto" dangerouslySetInnerHTML={{ __html: title }} />
                <p className="text-white text-opacity-75 mb-4">{description}</p>
                <Link href="#" className="text-white text-opacity-50 btn-text">
                    read more
                </Link>
            </div>
        </div>
    </div>
);

export default function Section1() {
    const services = [
        {
            iconSrc: '/assets/imgs/pages/law-firm/page-practice-area/icon-1.svg',
            title: 'Corporate <strong>law service</strong>',
            description: 'We offer a wide range of digital marketing services that cater.',
        },
        {
            iconSrc: '/assets/imgs/pages/law-firm/page-practice-area/icon-2.svg',
            title: 'Intellectual <strong>property</strong>',
            description: 'We offer a wide range of digital marketing services that cater.',
        },
        {
            iconSrc: '/assets/imgs/pages/law-firm/page-practice-area/icon-3.svg',
            title: 'Criminal <strong>defense</strong>',
            description: 'We offer a wide range of digital marketing services that cater.',
        },
        {
            iconSrc: '/assets/imgs/pages/law-firm/page-practice-area/icon-4.svg',
            title: 'Bankruptcy & <strong>restructuring</strong>',
            description: 'We offer a wide range of digital marketing services that cater.',
        },
        {
            iconSrc: '/assets/imgs/pages/law-firm/page-practice-area/icon-5.svg',
            title: 'Bankruptcy & <strong>restructuring</strong>',
            description: 'We offer a wide range of digital marketing services that cater.',
        },
        {
            iconSrc: '/assets/imgs/pages/law-firm/page-practice-area/icon-6.svg',
            title: 'Bankruptcy & <strong>restructuring</strong>',
            description: 'We offer a wide range of digital marketing services that cater.',
        },
    ];

    return (
        <>
            {/*law-firm practice section 1*/}
            <div className="pt-120 d-md-none" />
            <section className="law-firm-practice-section-1 position-relative py-120 overflow-hidden bg-dark">
                <div className="container">
                    <div className="mb-80 text-center">
                        <span className="content-top btn-text text-primary fw-semibold rounded-pill border border-primary px-3 py-2">
                            our services
                        </span>
                        <h2 className="text-white mt-3 text-anime-style-2">
                            Law firm
                            <strong className="position-relative">
                                expertise
                                <span className="position-absolute top-50 start-50 translate-middle d-none d-md-block">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width={198}
                                        height={53}
                                        viewBox="0 0 198 53"
                                        fill="none"
                                    >
                                        <path
                                            d="M1 30.3115C35.0108 12.9514 118.239 -14.9035 179.064 12.5569C255.096 46.8824 66.3952 54.7733 40.7886 51.2224C20.7652 48.4457 -0.181841 21.2369 30.1521 4.66592"
                                            stroke="#B98E44"
                                            strokeWidth={2}
                                        />
                                    </svg>
                                </span>
                            </strong>
                        </h2>
                    </div>
                    <div className="row g-5">
                        {services.map((service, index) => (
                            <ServiceCard
                                key={index}
                                iconSrc={service.iconSrc}
                                title={service.title}
                                description={service.description}
                            />
                        ))}
                    </div>
                </div>
                <div className="scroll-move-left pt-120">
                    <strong className="text-primary fs-140 text-nowrap wow img-custom-anim-left">
                        Imposed on individuals and businesses based on their income
                    </strong>
                </div>
            </section>
        </>
    )
}

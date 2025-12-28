'use client'
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, Navigation, Pagination } from "swiper/modules"
import Link from "next/link"

const swiperOptions = {
    modules: [Autoplay, Pagination, Navigation],
    slidesPerView: 4,
    spaceBetween: 30,
    autoplay: {
        delay: 2500,
        disableOnInteraction: false,
    },
    loop: true,
    breakpoints: {
        320: {
            slidesPerView: 1,
            spaceBetween: 30,
        },
        575: {
            slidesPerView: 2,
            spaceBetween: 30,
        },
        767: {
            slidesPerView: 2,
            spaceBetween: 30,
        },
        991: {
            slidesPerView: 4,
            spaceBetween: 30,
        },
    }
}

export default function Section4() {
    return (
        <>
            {/*law-firm-about-section-3*/}
            <section className="law-firm-about-section-3 position-relative py-120 bg-secondary-2 overflow-hidden">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-6 pe-lg-8 col-12">
                            <span className="content-top btn-text text-primary fw-semibold rounded-pill border border-primary px-3 py-2 bg-secondary-2">
                                let’s talk
                            </span>
                            <h2 className="my-3 text-anime-style-2">Get a free quote</h2>
                            <form action="#" className="input-group mb-3 mt-4 position-relative">
                                <div className="row">
                                    <div className="col-md-6">
                                        <label htmlFor="username" className="fs-7 fw-bold mb-3">
                                            Full name
                                        </label>
                                        <input
                                            type="text"
                                            className="py-3 form-control rounded-0 username"
                                            name="name"
                                            placeholder="Enter here"
                                            id="username"
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label htmlFor="email" className="fs-7 fw-bold mb-3">
                                            Email address
                                        </label>
                                        <input
                                            type="text"
                                            className="py-3 form-control rounded-0 email"
                                            name="name"
                                            placeholder="Enter here"
                                            id="email"
                                        />
                                    </div>
                                    <div className="col-12 mt-5">
                                        <label htmlFor="message" className="fs-7 fw-bold mb-3">
                                            Message
                                        </label>
                                        <textarea
                                            name="message"
                                            id="message"
                                            cols={30}
                                            rows={8}
                                            className="py-3 form-control rounded-0 website"
                                            placeholder="Enter here"
                                            defaultValue={""}
                                        />
                                    </div>
                                    <div className="col-12 mt-5">
                                        <button
                                            aria-label="submit"
                                            className="btn btn-primary hover-up"
                                            type="submit"
                                        >
                                            <span>get a quote</span>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width={16}
                                                height={16}
                                                viewBox="0 0 16 16"
                                                fill="none"
                                            >
                                                <g clipPath="url(#clip0_1466_2165)">
                                                    <path
                                                        d="M15.8167 7.55759C15.8165 7.5574 15.8163 7.55719 15.8161 7.557L12.5504 4.307C12.3057 4.06353 11.91 4.06444 11.6665 4.30912C11.423 4.55378 11.4239 4.9495 11.6686 5.193L13.8612 7.375H0.625C0.279813 7.375 0 7.65481 0 8C0 8.34519 0.279813 8.625 0.625 8.625H13.8612L11.6686 10.807C11.4239 11.0505 11.423 11.4462 11.6665 11.6909C11.91 11.9356 12.3058 11.9364 12.5504 11.693L15.8162 8.443C15.8163 8.44281 15.8165 8.44259 15.8167 8.4424C16.0615 8.19809 16.0607 7.80109 15.8167 7.55759Z"
                                                        fill="white"
                                                    />
                                                </g>
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="col-lg-6 ms-lg-auto mt-lg-0 mt-5 d-none d-lg-block">
                            <div data-aos="fade-left" data-aos-delay={400}>
                                <img
                                    src="assets/imgs/pages/law-firm/page-about/img-1.png"
                                    alt="AstraX"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

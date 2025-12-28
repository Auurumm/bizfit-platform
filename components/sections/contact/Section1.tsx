import Link from "next/link";

export default function Section1() {
    return (
        <>
            {/*law-firm contact section 1*/}
            <section className="law-firm-contact-section-1 position-relative overflow-hidden">
                <div className="container py-120">
                    <div className="row align-items-center">
                        <div className="col-lg-6 pe-lg-8 col-12">
                            <span className="btn-text fs-7 text-primary">let’s talk</span>
                            <h2 className="mb-6 mt-3 fw-medium text-anime-style-2">
                                Tell us about your project
                            </h2>
                            <form
                                action="#"
                                className="input-group mb-3 mt-4 position-relative wow img-custom-anim-left"
                            >
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
                                            <span>submit</span>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width={16}
                                                height={16}
                                                viewBox="0 0 16 16"
                                                fill="none"
                                            >
                                                <g clipPath="url(#clip0_886_362)">
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
                            <div data-aos="zoom-in">
                                <img
                                    src="assets/imgs/pages/law-firm/page-contact/img-1.png"
                                    alt="AstraX"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container-fluid wow img-custom-anim-top">
                    <div className="contact-map">
                        <iframe
                            className="map"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193595.25279991725!2d-74.1444877707482!3d40.697631233381586!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2zVGjDoG5oIHBo4buRIE5ldyBZb3JrLCBUaeG7g3UgYmFuZyBOZXcgWW9yaywgSG9hIEvhu7M!5e0!3m2!1svi!2s!4v1729152035449!5m2!1svi!2s"
                            width={600}
                            height={450}
                            style={{ border: 0 }}
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        />
                    </div>
                </div>
            </section>
        </>
    )
}

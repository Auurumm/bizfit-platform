import Link from "next/link";

export default function Section2() {
    return (
        <>
            {/*law-firm single-news-section-2*/}
            <section className="law-firm-single-news-section-2 position-relative overflow-hidden">
                <div className="container pt-120">
                    <h2 className="ds-6 fw-medium text-anime-style-2">News overview:</h2>
                    <p className="mb-6 pb-6 border-bottom wow img-custom-anim-top">
                        Psychology is the scientific study of behavior, mental processes, and
                        emotions. It seeks to understand how individuals think, feel, and
                        behave, both as individuals and within groups. The field encompasses a
                        wide range of topics, from basic neural processes to complex social
                        interactions, and it can be applied in various areas, such as mental
                        health, education, work, and relationships. Certain universities may ask
                        for or allow the submission of a portfolio (e.g., for research projects,
                        volunteer work) or additional materials that showcase your passion for
                        psychology.
                    </p>
                    <h5 className="text-anime-style-2">Letters of recommendation</h5>
                    <p data-aos="fade-left" data-aos-delay={200}>
                        <span className="text-dark fw-semibold">Experiments:</span> Controlled
                        settings to test hypotheses and establish cause-and-effect
                        relationships. Gathering self-reported data from large groups of people.
                        Observing and recording behavior in natural settings.
                    </p>
                    <p data-aos="fade-left" data-aos-delay={200}>
                        <span className="text-dark fw-semibold">Case Studies:</span> sychology
                        helps in understanding not only individual behavior but also social
                        structures, health outcomes, and societal trends. Preferably those who
                        taught you in relevant subjects like psychology, biology, or social
                        sciences.
                    </p>
                    <ul className="list-unstyled my-5 ps-7">
                        <li className="mb-3" data-aos="fade-left" data-aos-delay={400}>
                            <p>
                                <span className="text-dark fw-semibold">Sigmoid:</span> Maps input
                                to a value between 0 and 1.
                            </p>
                        </li>
                        <li className="mb-3" data-aos="fade-left" data-aos-delay={600}>
                            <p>
                                <span className="text-dark fw-semibold">
                                    ReLU (Rectified Linear Unit):
                                </span>{" "}
                                Outputs the input directly if it’s positive; otherwise, it outputs
                                zero.
                            </p>
                        </li>
                        <li className="mb-3" data-aos="fade-left" data-aos-delay={800}>
                            <p>
                                <span className="text-dark fw-semibold">Tanh:</span> Maps input to a
                                value between -1 and 1.
                            </p>
                        </li>
                    </ul>
                    <p className="mb-5" data-aos="fade-left" data-aos-delay={200}>
                        <span className="text-dark fw-semibold">Loss Function:</span> This
                        function measures the difference between the network’s output and the
                        actual target. Common loss functions include Mean Squared Error (for
                        regression tasks) and Cross-Entropy Loss (for classification tasks).
                        Some schools may accept AP or IB credits in psychology or related
                        subjects like Biology or Statistics, which can help fulfill introductory
                        course requirements.
                    </p>
                    <p className="wow img-custom-anim-top">
                        A framework where two neural networks, a generator and a discriminator,
                        are trained simultaneously. The generator tries to create data that
                        looks real, while the discriminator tries to distinguish between real
                        and fake data. When a model performs well on training data but poorly on
                        unseen data. Techniques like regularization, dropout, and
                        cross-validation are used to mitigate this. Admission requirements for
                        an undergraduate Psychology program can vary by institution, but
                        generally include a combination of academic qualifications, standardized
                        test scores, and supplementary materials. Here’s a detailed breakdown of
                        typical requirements:
                    </p>
                    <div className="row mt-6 g-4">
                        <div className="col-lg-6">
                            <img
                                className="wow img-custom-anim-top"
                                src="assets/imgs/pages/law-firm/page-single-news/img-2.png"
                                alt="AstraX"
                            />
                        </div>
                        <div className="col-lg-6">
                            <img
                                className="wow img-custom-anim-top"
                                src="assets/imgs/pages/law-firm/page-single-news/img-3.png"
                                alt="AstraX"
                            />
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

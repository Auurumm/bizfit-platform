interface PageHeaderProps {
    title: string;
}

export default function PageHeader({ title }: PageHeaderProps) {
    return (
        <>
            {/*law-firm section header*/}
            <section
                className="law-firm-section-header position-relative pt-250-keep pb-lg-150 pb-120-keep overflow-hidden"
                data-background="assets/imgs/pages/law-firm/page-home/home-section-1/bg-img.png"
            >
                <div className="overlay" />
                <div className="container position-relative z-1 pt-8 text-lg-start text-center">
                    <div className="row align-items-center">
                        <div className="col-12 text-center">
                            <span className="content-top btn-text text-primary fw-semibold rounded-pill border border-primary px-3 py-2">
                                #01 law firm &amp; agency
                            </span>
                            <h1 className="text-white ds-1 mt-4 text-anime-style-2">{title}</h1>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
import Link from "next/link";

export default function Section1() {
    return (
        <>
            {/*law-firm single-service section 1*/}
            <section className="law-firm-single-service-section-1 position-relative py-120 overflow-hidden">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 pe-lg-5">
                            <img
                                className="wow img-custom-anim-top"
                                src="assets/imgs/pages/law-firm/page-single-service/img-1.png"
                                alt="AstraX"
                            />
                            <h2 className="fw-medium ds-6 mb-3 mt-80 text-anime-style-2">
                                Wealth management
                            </h2>
                            <p>
                                We are dedicated to being your trusted partner in navigating the
                                dynamic world of business and finance. With an unwavering commitment
                                to excellence, we provide a comprehensive suite of services designed
                                to address the diverse needs of individuals, small businesses, and
                                large enterprises. Our solutions encompass everything from strategic
                                financial planning and wealth management to tax compliance, risk
                                assessment, and business advisory services. We pride ourselves on
                                offering innovative, forward-thinking strategies that help our
                                clients seize opportunities.
                            </p>
                            <h6 className="fw-medium mb-3 mt-6 text-anime-style-2">
                                Wealth management range of industries
                            </h6>
                            <p className="mb-5">
                                In addition to our core offerings, we are proud to incorporate
                                socially responsible and sustainable practices into our investment
                                and business strategies, ensuring that your success contributes
                                positively to the world around you.
                            </p>
                            <div className="border-top d-flex align-items-center py-5">
                                <div>
                                    <div className="icon-shape icon-100 rounded-circle bg-secondary-2">
                                        <svg
                                            className="fill-primary"
                                            xmlns="http://www.w3.org/2000/svg"
                                            width={50}
                                            height={42}
                                            viewBox="0 0 50 42"
                                            fill="none"
                                        >
                                            <path
                                                d="M47.8168 37.4602H44.4955V29.8896C44.4955 29.2702 43.9916 28.7662 43.3722 28.7662H31.9919V21.1956C31.9919 20.5762 31.4879 20.0723 30.8685 20.0723H19.1463C18.5269 20.0723 18.0229 20.5762 18.0229 21.1956V25.1519H6.64258C6.02316 25.1519 5.51921 25.6558 5.51921 26.2753V37.4602H2.19791C0.985935 37.4602 0 38.4462 0 39.6581C0 40.87 0.985935 41.856 2.19791 41.856H35.3537C36.3177 41.8277 36.3258 40.4217 35.3537 40.3908H2.19801C1.79399 40.3908 1.46537 40.0621 1.46537 39.6581C1.46537 39.2541 1.79399 38.9255 2.19801 38.9255H47.8169C48.221 38.9255 48.5496 39.2541 48.5496 39.6581C48.5496 40.0621 48.221 40.3908 47.8169 40.3908H38.8261C38.4215 40.3908 38.0935 40.7187 38.0935 41.1234C38.0935 41.5281 38.4215 41.856 38.8261 41.856H47.8168C50.7168 41.7511 50.7387 37.5741 47.8168 37.4602ZM6.98448 26.6172H18.0229V37.4602H6.98448V26.6172ZM19.4882 21.5375H30.5266V37.4602H19.4882V21.5375ZM31.9919 37.4602V30.2315H43.0303V37.4602H31.9919Z"
                                                fill="#001D21"
                                            />
                                            <path
                                                d="M13.4903 10.7922H14.0095V12.9901C14.0095 13.3948 14.3376 13.7228 14.7422 13.7228H19.3334C19.738 13.7228 20.066 13.3948 20.066 12.9901V10.7922H23.5174C23.6743 11.5812 24.3717 12.178 25.2061 12.178H26.8874C26.7714 14.4891 28.6187 16.4652 30.9414 16.458H34.9644C37.1998 16.458 39.0184 14.6394 39.0184 12.404V4.19848C39.0184 1.96315 37.1998 0.144549 34.9644 0.144549H30.9413C28.6188 0.137614 26.771 2.1131 26.8873 4.42452H25.206C24.3716 4.42452 23.6743 5.02118 23.5173 5.81028H18.3437C17.9391 5.81028 17.6111 6.13821 17.6111 6.54292C17.6111 6.94763 17.9391 7.27556 18.3437 7.27556H23.4838V9.32695H13.4903C12.9247 9.32695 12.4646 8.86685 12.4646 8.30125C12.4646 7.73566 12.9247 7.27556 13.4903 7.27556H14.9474C15.9152 7.24625 15.9161 5.83998 14.9474 5.81028H13.4903C10.1907 5.93522 10.1907 10.6674 13.4903 10.7922ZM28.3527 4.19848C28.3527 2.77111 29.514 1.60983 30.9414 1.60983H34.9645C36.3919 1.60983 37.5532 2.77111 37.5532 4.19848V12.404C37.5532 13.8314 36.3919 14.9927 34.9645 14.9927H30.9414C29.514 14.9927 28.3527 13.8314 28.3527 12.404V4.19848ZM24.9492 6.14661C24.9492 6.00507 25.0644 5.8898 25.206 5.8898H26.8873V10.7126H25.206C25.0643 10.7126 24.9492 10.5973 24.9492 10.4558V6.14661ZM18.6007 10.7922V12.2575H15.4748V10.7922H18.6007Z"
                                                fill="#001D21"
                                            />
                                            <path
                                                d="M31.1352 13.5275H34.7676C35.4947 13.5275 36.0863 12.9359 36.0863 12.2087V4.39394C36.0863 3.66678 35.4947 3.0752 34.7676 3.0752H31.1352C30.408 3.0752 29.8164 3.66678 29.8164 4.39394V12.2087C29.8164 12.9359 30.408 13.5275 31.1352 13.5275ZM31.2817 4.54047H34.621V12.0622H31.2817V4.54047Z"
                                                fill="#001D21"
                                            />
                                        </svg>
                                    </div>
                                </div>
                                <div className="ms-4">
                                    <h6 className="fw-medium fs-20 text-anime-style-2">
                                        Wealth management range of industries
                                    </h6>
                                    <p className="mb-0">
                                        In addition to our core offerings, we are proud to incorporate
                                        socially responsible and sustainable practices into our
                                        investment.
                                    </p>
                                </div>
                            </div>
                            <div className="border-top d-flex align-items-center py-5">
                                <div>
                                    <div className="icon-shape icon-100 rounded-circle bg-secondary-2">
                                        <svg
                                            className="fill-primary"
                                            xmlns="http://www.w3.org/2000/svg"
                                            width={50}
                                            height={44}
                                            viewBox="0 0 50 44"
                                            fill="none"
                                        >
                                            <path
                                                d="M46.7285 3.78721H43.2399C42.8954 3.46807 42.5303 3.16807 42.1454 2.88975C41.3441 2.34737 40.5195 3.4837 41.2869 4.07657C51.8567 12.6566 40.2509 24.6498 35.2539 28.0815C33.4065 26.7261 24.9512 20.0994 24.9512 12.4262C24.9512 6.74727 29.5729 2.12706 35.2539 2.12706C36.3457 2.12706 37.4201 2.29668 38.4475 2.63126C39.3739 2.90352 39.8142 1.56709 38.901 1.23829C34.9393 -0.118159 30.1842 0.995904 27.2756 3.78721H3.27148C1.46758 3.78721 0 5.25489 0 7.0587V33.4014C0 33.806 0.32793 34.1338 0.732422 34.1338C1.13691 34.1338 1.46484 33.806 1.46484 33.4014V13.0646H23.5036C23.6818 16.4648 25.2797 19.9842 28.2607 23.5366C30.4224 26.0887 34.3701 29.7108 35.2539 29.5693C36.1356 29.7128 40.0817 26.0921 42.2472 23.5367C45.2282 19.9842 46.826 16.4648 47.0043 13.0646H48.5352V40.0665C48.5352 41.0627 47.7247 41.8732 46.7285 41.8732H3.27148C2.27529 41.8732 1.46484 41.0627 1.46484 40.0665V36.8353C1.46484 36.4307 1.13691 36.1028 0.732422 36.1028C0.32793 36.1028 0 36.4307 0 36.8353V40.0665C0 41.8704 1.46758 43.338 3.27148 43.338H46.7285C48.5324 43.338 50 41.8704 50 40.0665V7.0587C50 5.25489 48.5324 3.78721 46.7285 3.78721ZM1.46484 7.0587C1.46484 6.06251 2.27529 5.25206 3.27148 5.25206H25.9347C24.5585 7.03448 23.6818 9.22061 23.5158 11.5997H1.46484V7.0587ZM46.9909 11.5997C46.8261 9.28135 45.9734 7.07276 44.5745 5.25206H46.7285C47.7247 5.25206 48.5352 6.06251 48.5352 7.0587V11.5997H46.9909Z"
                                                fill="#001D21"
                                            />
                                            <path
                                                d="M7.24805 6.09863C5.98262 6.09863 4.95312 7.12812 4.95312 8.39355C5.06846 11.4339 9.42803 11.4331 9.54297 8.39355C9.54297 7.12812 8.51348 6.09863 7.24805 6.09863ZM7.24805 9.22363C6.79033 9.22363 6.41797 8.85127 6.41797 8.39355C6.45693 7.29492 8.03926 7.29521 8.07813 8.39355C8.07813 8.85127 7.70576 9.22363 7.24805 9.22363Z"
                                                fill="#001D21"
                                            />
                                            <path
                                                d="M12.9785 6.09863C11.7131 6.09863 10.6836 7.12812 10.6836 8.39355C10.7989 11.4339 15.1585 11.4331 15.2734 8.39355C15.2734 7.12812 14.2439 6.09863 12.9785 6.09863ZM12.9785 9.22363C12.5208 9.22363 12.1484 8.85127 12.1484 8.39355C12.1874 7.29492 13.7697 7.29521 13.8086 8.39355C13.8086 8.85127 13.4362 9.22363 12.9785 9.22363Z"
                                                fill="#001D21"
                                            />
                                            <path
                                                d="M18.709 6.09863C17.4436 6.09863 16.4141 7.12812 16.4141 8.39355C16.5294 11.4339 20.889 11.4331 21.0039 8.39355C21.0039 7.12812 19.9744 6.09863 18.709 6.09863ZM18.709 9.22363C18.2513 9.22363 17.8789 8.85127 17.8789 8.39355C17.9179 7.29492 19.5002 7.29521 19.5391 8.39355C19.5391 8.85127 19.1667 9.22363 18.709 9.22363Z"
                                                fill="#001D21"
                                            />
                                            <path
                                                d="M5.37305 20.584H10.2282C11.195 20.5547 11.1974 19.1492 10.2282 19.1191H5.37305C4.96855 19.1191 4.64062 19.447 4.64062 19.8516C4.64062 20.2562 4.96855 20.584 5.37305 20.584Z"
                                                fill="#001D21"
                                            />
                                            <path
                                                d="M5.3704 24.2949H15.722C16.687 24.2664 16.6926 22.8605 15.722 22.8301H5.3704C4.40536 22.8587 4.39979 24.2646 5.3704 24.2949Z"
                                                fill="#001D21"
                                            />
                                            <path
                                                d="M5.3704 28.0059H15.722C16.687 27.9773 16.6926 26.5715 15.722 26.541H5.3704C4.40536 26.5696 4.39979 27.9755 5.3704 28.0059Z"
                                                fill="#001D21"
                                            />
                                            <path
                                                d="M5.3704 31.7168H15.722C16.687 31.6883 16.6926 30.2824 15.722 30.252H5.3704C4.40536 30.2806 4.39979 31.6864 5.3704 31.7168Z"
                                                fill="#001D21"
                                            />
                                            <path
                                                d="M28.8594 12.4209C28.8594 15.9479 31.7288 18.8174 35.2559 18.8174C43.73 18.4959 43.7277 6.34463 35.2558 6.02441C31.7288 6.02441 28.8594 8.89385 28.8594 12.4209ZM40.1875 12.4209C40.1875 15.1402 37.9752 17.3525 35.2559 17.3525C28.7224 17.1046 28.7241 7.73623 35.256 7.48926C37.9752 7.48926 40.1875 9.70156 40.1875 12.4209Z"
                                                fill="#001D21"
                                            />
                                            <path
                                                d="M40.3301 38.2764C45.0495 38.0984 45.0536 31.3269 40.3301 31.1475H30.1738C28.2084 31.1475 26.6094 32.7465 26.6094 34.7119C26.6094 36.6773 28.2084 38.2764 30.1738 38.2764H40.3301ZM28.0742 34.7118C28.0742 33.5542 29.0161 32.6123 30.1738 32.6123H40.3301C41.4878 32.6123 42.4297 33.5542 42.4297 34.7119C42.4297 35.8696 41.4878 36.8115 40.3301 36.8115H30.1738C29.0161 36.8115 28.0742 35.8696 28.0742 34.7118Z"
                                                fill="#001D21"
                                            />
                                        </svg>
                                    </div>
                                </div>
                                <div className="ms-4">
                                    <h6 className="fw-medium fs-20 text-anime-style-2">
                                        Wealth management range of industries
                                    </h6>
                                    <p className="mb-0">
                                        In addition to our core offerings, we are proud to incorporate
                                        socially responsible and sustainable practices into our
                                        investment.
                                    </p>
                                </div>
                            </div>
                            <div className="border-top border-bottom d-flex align-items-center py-5">
                                <div>
                                    <div className="icon-shape icon-100 rounded-circle bg-secondary-2">
                                        <svg
                                            className="fill-primary"
                                            xmlns="http://www.w3.org/2000/svg"
                                            width={50}
                                            height={50}
                                            viewBox="0 0 50 50"
                                            fill="none"
                                        >
                                            <path
                                                d="M48.6816 43.8477H46.5871C47.0732 43.2161 47.3633 42.4262 47.3633 41.5693V17.708C47.3633 15.6439 45.6842 13.9648 43.6201 13.9648H38.916V2.68555C38.916 1.20479 37.7112 0 36.2305 0H13.7695C12.2887 0 11.084 1.20479 11.084 2.68555V13.9648H6.37988C4.31592 13.9648 2.63672 15.6439 2.63672 17.708V35.3015C2.66387 36.2621 4.06973 36.2762 4.10156 35.3015V17.708C4.10156 16.4518 5.12363 15.4297 6.37988 15.4297H11.084V16.8945H7.46094C6.41631 16.8945 5.56641 17.7444 5.56641 18.7891V40.4883C5.56641 41.5329 6.41631 42.3828 7.46094 42.3828H42.5391C43.5837 42.3828 44.4336 41.5329 44.4336 40.4883V18.7891C44.4336 17.7444 43.5837 16.8945 42.5391 16.8945H38.916V15.4297H43.6201C44.8764 15.4297 45.8984 16.4518 45.8984 17.708V41.5693C45.8984 42.8256 44.8764 43.8477 43.6201 43.8477H6.37988C5.12363 43.8477 4.10156 42.8256 4.10156 41.5693V38.7671C4.10156 38.3625 3.77363 38.0347 3.36914 38.0347C2.96465 38.0347 2.63672 38.3625 2.63672 38.7671V41.5693C2.63672 42.4262 2.92676 43.2161 3.41289 43.8477H1.31836C0.591406 43.8477 0 44.4391 0 45.166V46.9062C0 48.6121 1.38789 50 3.09385 50H46.9062C48.6121 50 50 48.6121 50 46.9062V45.166C50 44.4391 49.4086 43.8477 48.6816 43.8477ZM12.5488 2.68555C12.5488 2.0124 13.0964 1.46484 13.7695 1.46484H36.2305C36.9036 1.46484 37.4512 2.0124 37.4512 2.68555V7.8125H12.5488V2.68555ZM7.03125 40.4883V18.7891C7.03125 18.5521 7.22402 18.3594 7.46094 18.3594H11.084V40.918H7.46094C7.22402 40.918 7.03125 40.7252 7.03125 40.4883ZM12.5488 40.918V9.27734H37.4512V40.918H12.5488ZM42.5391 18.3594C42.7761 18.3594 42.9688 18.5521 42.9688 18.7891V40.4883C42.9688 40.7253 42.776 40.918 42.5391 40.918H38.916V18.3594H42.5391ZM29.3426 45.3125L29.0384 46.1914H20.9618L20.6575 45.3125H29.3426ZM48.5352 46.9062C48.5352 47.8043 47.8044 48.5352 46.9062 48.5352H3.09385C2.19561 48.5352 1.46484 47.8044 1.46484 46.9062V45.3125H19.1074L19.639 46.848C19.8062 47.3314 20.2624 47.6562 20.774 47.6562H29.2261C29.7374 47.6562 30.1936 47.3316 30.3612 46.848L30.8927 45.3125H48.5352V46.9062Z"
                                                fill="#001D21"
                                            />
                                            <path
                                                d="M17.0332 2.31152C15.7678 2.31152 14.7383 3.34102 14.7383 4.60645C14.8536 7.64678 19.2132 7.646 19.3281 4.60645C19.3281 3.34102 18.2986 2.31152 17.0332 2.31152ZM17.0332 5.43652C16.5755 5.43652 16.2031 5.06416 16.2031 4.60645C16.2421 3.50781 17.8244 3.50811 17.8633 4.60645C17.8633 5.06406 17.4909 5.43652 17.0332 5.43652Z"
                                                fill="#001D21"
                                            />
                                            <path
                                                d="M22.7598 2.31152C21.4943 2.31152 20.4648 3.34102 20.4648 4.60645C20.5802 7.64678 24.9397 7.646 25.0547 4.60645C25.0547 3.34102 24.0252 2.31152 22.7598 2.31152ZM22.7598 5.43652C22.3021 5.43652 21.9297 5.06416 21.9297 4.60645C21.9687 3.50781 23.551 3.50811 23.5898 4.60645C23.5898 5.06406 23.2175 5.43652 22.7598 5.43652Z"
                                                fill="#001D21"
                                            />
                                            <path
                                                d="M28.4902 2.31152C27.2248 2.31152 26.1953 3.34102 26.1953 4.60645C26.3106 7.64678 30.6702 7.646 30.7852 4.60645C30.7852 3.34102 29.7557 2.31152 28.4902 2.31152ZM28.4902 5.43652C28.0325 5.43652 27.6602 5.06416 27.6602 4.60645C27.6992 3.50781 29.2814 3.50811 29.3203 4.60645C29.3203 5.06406 28.9479 5.43652 28.4902 5.43652Z"
                                                fill="#001D21"
                                            />
                                            <path
                                                d="M15.9838 26.6943H24.4408C24.8453 26.6943 25.1732 26.3665 25.1732 25.9619C25.1732 25.5573 24.8453 25.2295 24.4408 25.2295H15.9838C15.018 25.2583 15.0136 26.664 15.9838 26.6943Z"
                                                fill="#001D21"
                                            />
                                            <path
                                                d="M34.0144 28.9404H15.9836C15.0211 28.9679 15.0107 30.3742 15.9836 30.4053H34.0145C34.9769 30.3778 34.9874 28.9714 34.0144 28.9404Z"
                                                fill="#001D21"
                                            />
                                            <path
                                                d="M34.0144 32.6514H15.9836C15.0211 32.6788 15.0107 34.0852 15.9836 34.1162H34.0145C34.9769 34.0888 34.9874 32.6823 34.0144 32.6514Z"
                                                fill="#001D21"
                                            />
                                            <path
                                                d="M34.0144 36.3623H15.9836C15.0211 36.3897 15.0107 37.7961 15.9836 37.8271H34.0145C34.9769 37.7997 34.9874 36.3933 34.0144 36.3623Z"
                                                fill="#001D21"
                                            />
                                            <path
                                                d="M16.8037 21.3506H33.1924C34.0319 21.3506 34.7148 20.6677 34.7148 19.8281V13.2051C34.7148 12.3655 34.0319 11.6826 33.1924 11.6826H29.9334C28.9625 11.7143 28.9676 13.118 29.9334 13.1475H33.1924C33.2241 13.1475 33.25 13.1733 33.25 13.2051V19.8281C33.25 19.8599 33.2241 19.8857 33.1924 19.8857C33.1248 19.823 16.7413 19.9995 16.7462 19.8283L16.7461 13.2051C16.7461 13.1733 16.772 13.1475 16.8037 13.1475H26.4479C26.8524 13.1475 27.1803 12.8196 27.1803 12.415C27.1803 12.0104 26.8524 11.6826 26.4479 11.6826H16.8037C15.9643 11.6826 15.2812 12.3655 15.2812 13.2051V19.8281C15.2812 20.6677 15.9643 21.3506 16.8037 21.3506Z"
                                                fill="#001D21"
                                            />
                                        </svg>
                                    </div>
                                </div>
                                <div className="ms-4">
                                    <h6 className="fw-medium fs-20 text-anime-style-2">
                                        Wealth management range of industries
                                    </h6>
                                    <p className="mb-0">
                                        In addition to our core offerings, we are proud to incorporate
                                        socially responsible and sustainable practices into our
                                        investment.
                                    </p>
                                </div>
                            </div>
                            <h6 className="fw-medium mt-6 mb-3 text-anime-style-2">
                                Frequently asked question
                            </h6>
                            <p className="mb-6">
                                In addition to our core offerings, we are proud to incorporate
                                socially responsible and sustainable practices into our investment
                                and business strategies, ensuring that your success contributes
                                positively to the world around you.
                            </p>
                            <div className="accordion">
                                <div
                                    className="px-0 card collapse-custom mb-3 rounded-0"
                                    data-aos="fade-up"
                                    data-aos-delay={0}
                                >
                                    <div className="p-0 card-header border-0 bg-transparent">
                                        <Link
                                            className="collapsed p-3 fw-bold justify-content-between d-flex align-items-center"
                                            data-bs-toggle="collapse"
                                            href="#collapse1"
                                        >
                                            <h6 className="fw-medium mb-0 fs-7">
                                                <span>Education and empowerment are at the core?</span>
                                            </h6>
                                            <span className="me-3 arrow" />
                                        </Link>
                                    </div>
                                    <div
                                        id="collapse1"
                                        className="collapse"
                                        data-bs-parent=".accordion"
                                    >
                                        <p className="pe-3 fs-6 fw-regular ps-3">
                                            In addition to our core offerings, we are proud to incorporate
                                            socially responsible and sustainable practices into our
                                            investment and business strategies, ensuring that your success
                                            contributes positively to the world around you.
                                        </p>
                                    </div>
                                </div>
                                <div
                                    className="px-0 card collapse-custom mb-3 rounded-0"
                                    data-aos="fade-up"
                                    data-aos-delay={200}
                                >
                                    <div className="p-0 card-header border-0 bg-transparent">
                                        <Link
                                            className="p-3 fw-bold justify-content-between d-flex align-items-center"
                                            data-bs-toggle="collapse"
                                            href="#collapse2"
                                        >
                                            <h6 className="fw-medium mb-0 fs-7">
                                                <span>
                                                    We are proud to incorporate socially responsible?
                                                </span>
                                            </h6>
                                            <span className="me-3 arrow" />
                                        </Link>
                                    </div>
                                    <div
                                        id="collapse2"
                                        className="collapse show"
                                        data-bs-parent=".accordion"
                                    >
                                        <p className="pe-3 fs-6 fw-regular ps-3">
                                            In addition to our core offerings, we are proud to incorporate
                                            socially responsible and sustainable practices into our
                                            investment and business strategies, ensuring that your success
                                            contributes positively to the world around you.
                                        </p>
                                    </div>
                                </div>
                                <div
                                    className="px-0 card collapse-custom mb-3 rounded-0"
                                    data-aos="fade-up"
                                    data-aos-delay={400}
                                >
                                    <div className="p-0 card-header border-0 bg-transparent">
                                        <Link
                                            className="collapsed p-3 fw-bold justify-content-between d-flex align-items-center"
                                            data-bs-toggle="collapse"
                                            href="#collapse3"
                                        >
                                            <h6 className="fw-medium mb-0 fs-7">
                                                <span>Your goals are at the center of everything?</span>
                                            </h6>
                                            <span className="me-3 arrow" />
                                        </Link>
                                    </div>
                                    <div
                                        id="collapse3"
                                        className="collapse"
                                        data-bs-parent=".accordion"
                                    >
                                        <p className="pe-3 fs-6 fw-regular ps-3">
                                            In addition to our core offerings, we are proud to incorporate
                                            socially responsible and sustainable practices into our
                                            investment and business strategies, ensuring that your success
                                            contributes positively to the world around you.
                                        </p>
                                    </div>
                                </div>
                                <div
                                    className="px-0 card collapse-custom mb-3 rounded-0"
                                    data-aos="fade-up"
                                    data-aos-delay={600}
                                >
                                    <div className="p-0 card-header border-0 bg-transparent">
                                        <Link
                                            className="collapsed p-3 fw-bold justify-content-between d-flex align-items-center"
                                            data-bs-toggle="collapse"
                                            href="#collapse4"
                                        >
                                            <h6 className="fw-medium mb-0 fs-7">
                                                <span>Join countless individuals and businesses?</span>
                                            </h6>
                                            <span className="me-3 arrow" />
                                        </Link>
                                    </div>
                                    <div
                                        id="collapse4"
                                        className="collapse"
                                        data-bs-parent=".accordion"
                                    >
                                        <p className="pe-3 fs-6 fw-regular ps-3">
                                            In addition to our core offerings, we are proud to incorporate
                                            socially responsible and sustainable practices into our
                                            investment and business strategies, ensuring that your success
                                            contributes positively to the world around you.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 ps-lg-5">
                            <div className="border p-5 overflow-hidden">
                                <h6 className="fw-medium mb-3 pb-3 border-bottom text-anime-style-2">
                                    Related services
                                </h6>
                                <Link
                                    href="#"
                                    className="d-flex justify-content-between align-items-center mb-3"
                                    data-aos="fade-right"
                                    data-aos-delay={0}
                                >
                                    <span className="fw-medium">Strategic Brand</span>
                                    <img
                                        src="assets/imgs/template/icons/long-arrow-right.svg"
                                        alt="AstraX"
                                    />
                                </Link>
                                <Link
                                    href="#"
                                    className="d-flex justify-content-between align-items-center mb-3"
                                    data-aos="fade-right"
                                    data-aos-delay={200}
                                >
                                    <span className="fw-medium">Online Business</span>
                                    <img
                                        src="assets/imgs/template/icons/long-arrow-right.svg"
                                        alt="AstraX"
                                    />
                                </Link>
                                <Link
                                    href="#"
                                    className="d-flex justify-content-between align-items-center mb-3"
                                    data-aos="fade-right"
                                    data-aos-delay={400}
                                >
                                    <span className="fw-medium">Tax &amp; Declaration</span>
                                    <img
                                        src="assets/imgs/template/icons/long-arrow-right.svg"
                                        alt="AstraX"
                                    />
                                </Link>
                                <Link
                                    href="#"
                                    className="d-flex justify-content-between align-items-center mb-3"
                                    data-aos="fade-right"
                                    data-aos-delay={600}
                                >
                                    <span className="fw-medium">Customer Strategy</span>
                                    <img
                                        src="assets/imgs/template/icons/long-arrow-right.svg"
                                        alt="AstraX"
                                    />
                                </Link>
                                <Link
                                    href="#"
                                    className="d-flex justify-content-between align-items-center mb-3"
                                    data-aos="fade-right"
                                    data-aos-delay={800}
                                >
                                    <span className="fw-medium">Private Equality</span>
                                    <img
                                        src="assets/imgs/template/icons/long-arrow-right.svg"
                                        alt="AstraX"
                                    />
                                </Link>
                                <Link
                                    href="#"
                                    className="d-flex justify-content-between align-items-center mb-3"
                                    data-aos="fade-right"
                                    data-aos-delay={1000}
                                >
                                    <span className="fw-medium">Corporate Solution</span>
                                    <img
                                        src="assets/imgs/template/icons/long-arrow-right.svg"
                                        alt="AstraX"
                                    />
                                </Link>
                            </div>
                            <div className="mt-4 px-5 py-6 bg-primary-2 bg-secondary-2">
                                <h6 className="fw-medium mb-5 text-anime-style-2">
                                    Send Us Message
                                </h6>
                                <form action="#" className="input-group">
                                    <div className="position-relative mb-3 w-100">
                                        <input
                                            type="text"
                                            className="py-3 ps-4 form-control rounded-0 bg-white bg-opacity-10"
                                            name="name"
                                            placeholder="Your name"
                                        />
                                    </div>
                                    <div className="position-relative mb-3 w-100">
                                        <input
                                            type="text"
                                            className="py-3 ps-4 form-control rounded-0 bg-white bg-opacity-10"
                                            name="name"
                                            placeholder="Email address"
                                        />
                                    </div>
                                    <div className="position-relative w-100">
                                        <textarea
                                            name="message"
                                            id="message"
                                            cols={30}
                                            rows={8}
                                            className="py-3 ps-4 w-100 form-control message rounded-0 bg-white bg-opacity-10"
                                            placeholder="Message"
                                            defaultValue={""}
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        className="btn btn-primary mt-4 rounded-0 w-100"
                                        data-aos="fade-up"
                                    >
                                        <span className="text-white fs-7"> submit request </span>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width={17}
                                            height={16}
                                            viewBox="0 0 17 16"
                                            fill="none"
                                        >
                                            <g clipPath="url(#clip0_1435_2052)">
                                                <path
                                                    d="M16.3167 7.55759C16.3165 7.5574 16.3163 7.55719 16.3161 7.557L13.0504 4.307C12.8057 4.06353 12.41 4.06444 12.1665 4.30912C11.923 4.55378 11.9239 4.9495 12.1686 5.193L14.3612 7.375H1.125C0.779813 7.375 0.5 7.65481 0.5 8C0.5 8.34519 0.779813 8.625 1.125 8.625H14.3612L12.1686 10.807C11.9239 11.0505 11.923 11.4462 12.1665 11.6909C12.41 11.9356 12.8058 11.9364 13.0504 11.693L16.3162 8.443C16.3163 8.44281 16.3165 8.44259 16.3167 8.4424C16.5615 8.19809 16.5607 7.80109 16.3167 7.55759Z"
                                                    fill="white"
                                                />
                                            </g>
                                        </svg>
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

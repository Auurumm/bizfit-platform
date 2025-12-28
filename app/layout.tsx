import "/public/assets/css/vendors/bootstrap.min.css"
import "/public/assets/css/vendors/swiper-bundle.min.css"
import "/public/assets/css/vendors/aos.css"
import "/public/assets/css/vendors/carouselTicker.css"
import "/public/assets/css/vendors/odometer.css"
import "/public/assets/css/vendors/magnific-popup.css"
import "/public/assets/fonts/bootstrap-icons/bootstrap-icons.min.css"
import "/public/assets/fonts/boxicons/boxicons.min.css"
import "/public/assets/fonts/remixicon/remixicon.css"
import "/public/assets/fonts/fontawesome/fontawesome.min.css"
import "/public/assets/fonts/fontawesome/solid.min.css"
import "/public/assets/fonts/fontawesome/regular.min.css"
import "/public/assets/css/main.css"
import "/public/assets/css/style.css"

import type { Metadata } from "next"
import { Playfair_Display, Roboto } from "next/font/google"

const playfairItalic = Playfair_Display({
	weight: '500',
	subsets: ['latin'],
	variable: '--tc-heading-font-italic',
	display: 'swap',
});

const robotoHeading = Roboto({
	weight: ['500'],
	subsets: ['latin'],
	variable: '--tc-heading-font-family',
	display: 'swap',
})

const roboto = Roboto({
	weight: ['300', '400', '500', '700'],
	subsets: ['latin'],
	variable: "--tc-body-font-family",
	display: 'swap',
})

export const metadata: Metadata = {
	title: "비즈핏 - AI 기반 정부 지원사업 매칭 플랫폼",
	description: "AI 기술로 귀하의 기업에 최적화된 정부 지원사업을 찾아드립니다. 실시간 데이터 연동, 맞춤형 추천, 전문가 상담까지.",
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="ko">
			<body className={`${playfairItalic.variable} ${roboto.variable} ${robotoHeading.variable} law-firm`}>
				{children}
			</body>
		</html>
	)
}
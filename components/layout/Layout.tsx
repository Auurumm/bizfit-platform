'use client'
import { applyDataBg } from '@/util/data-bg'  // 변경
import { useOffcanvasMenu } from '@/util/offcanvasMenu'
import { useAccordion } from '@/util/useAccordion'
import { useCircleText } from '@/util/useCircleText'
import { useOdometerCounter } from '@/util/useOdometerCounter'
import { useParallaxEffect } from '@/util/useParallaxEffect'
import useTextAnimation2 from '@/util/useTextAnimation2'
import useTextAnimation3 from '@/util/useTextAnimation3'
import 'aos/dist/aos.css'
import dynamic from 'next/dynamic'
import type { FC } from 'react'
import { useEffect, useState } from "react"
import BackToTop from '../elements/BackToTop'
import Breadcrumb from './Breadcrumb'
import Footer from './footer/Footer'
import Header from "./header/Header"

interface BootstrapComponentsProps { }

const BootstrapComponents = dynamic<BootstrapComponentsProps>(
	() => import('@/util/useBootstrap'),
	{ ssr: false }
) as FC<BootstrapComponentsProps>

interface LayoutProps {
	headerStyle?: Number
	footerStyle?: Number
	children?: React.ReactNode
	breadcrumbTitle?: string
}

export default function Layout({ headerStyle, footerStyle, breadcrumbTitle, children }: LayoutProps) {
	const [scroll, setScroll] = useState<boolean>(false)
	const [isMobileMenu, setMobileMenu] = useState<boolean>(false)
	
	const handleMobileMenu = (): void => {
		setMobileMenu(!isMobileMenu)
		!isMobileMenu ? document.body.classList.add("mobile-menu-active") : document.body.classList.remove("mobile-menu-active");
	}

	// AOS, WOW, DataBg 초기화
	useEffect(() => {
		const initAnimations = async () => {
			// AOS
			const AOS = (await import('aos')).default
			AOS.init({
				duration: 800,
				once: true,
			})

			// WOW.js
			const { WOW } = await import('wowjs')
			const wow = new WOW({
				live: false
			})
			wow.init()
		}

		initAnimations()
		
		// DataBg 적용
		applyDataBg()

		// 스크롤 이벤트
		const handleScroll = (): void => {
			const scrollCheck: boolean = window.scrollY > 100
			if (scrollCheck !== scroll) {
				setScroll(scrollCheck)
			}
		}

		document.addEventListener("scroll", handleScroll)

		return () => {
			document.removeEventListener("scroll", handleScroll)
		}
	}, [scroll])

	// 커스텀 훅들
	useTextAnimation2()
	useTextAnimation3()
	useOffcanvasMenu()
	useAccordion()
	useCircleText()
	useOdometerCounter()
	useParallaxEffect()

	return (
		<>
			<div id="top" />
			<BootstrapComponents />
			<Header scroll={scroll} isMobileMenu={isMobileMenu} handleMobileMenu={handleMobileMenu} />

			<main>
				{breadcrumbTitle && <Breadcrumb breadcrumbTitle={breadcrumbTitle} />}
				{children}
			</main>

			<Footer />

			<BackToTop />
		</>
	)
}
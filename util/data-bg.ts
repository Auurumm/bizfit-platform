'use client'

export function applyDataBg() {
	const elements = document.querySelectorAll<HTMLElement>('[data-background]')

	elements.forEach((element) => {
		const bgUrl = element.getAttribute('data-background')
		if (bgUrl) {
			element.style.backgroundImage = `url(${bgUrl})`
		}
	})
}

// 커스텀 훅 버전 (컴포넌트에서 사용)
export function useDataBg() {
	const { useEffect } = require('react')
	
	useEffect(() => {
		applyDataBg()
	}, [])
}
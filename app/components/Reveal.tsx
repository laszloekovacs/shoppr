import React, { useRef, useEffect } from 'react'
import styled from '@emotion/styled'

interface RevealProps {
	children: React.ReactNode
	className?: string
}

const StyledReveal = styled.div`
	&.slide-in-fade {
		opacity: 0;
		transform: translateY(10px);
		animation: slideInFade 0.04s ease-in-out forwards;
	}

	@keyframes slideInFade {
		0% {
			opacity: 0;
			transform: translateY(4px);
		}
		100% {
			opacity: 1;
			transform: translateY(0);
		}

		${(props) => props.className && props.className}
	}
`

const Reveal = ({ children, className }: RevealProps) => {
	const ref = useRef<HTMLDivElement>(null)

	useEffect(() => {
		if (ref.current) {
			ref.current.classList.add('slide-in-fade')
		}
	}, [])

	return <StyledReveal ref={ref}>{children}</StyledReveal>
}

export default Reveal

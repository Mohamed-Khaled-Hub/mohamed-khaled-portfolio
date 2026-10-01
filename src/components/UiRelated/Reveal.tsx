'use client'

// Core
import { CSSProperties, ElementType, useEffect, useRef } from 'react'
// Types
import { RevealProps } from '@/src/types/props.types'
// Style
import '@/src/styles/components/UiRelated/Reveal.css'

export default function Reveal({
    as = 'div',
    id,
    className,
    delay = 0,
    duration = 1.1,
    children,
}: RevealProps) {
    const ref = useRef<HTMLElement>(null)
    const Tag = as as ElementType

    useEffect(() => {
        const element = ref.current
        if (!element) return

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (!entry.isIntersecting) return
                element.dataset.visible = 'true'
                observer.disconnect()
            },
            { threshold: 0.1, rootMargin: '0px 0px -80px 0px' },
        )

        observer.observe(element)
        return () => observer.disconnect()
    }, [])

    return (
        <Tag
            ref={ref}
            id={id}
            className={className ? `reveal ${className}` : 'reveal'}
            style={
                {
                    '--reveal-delay': `${delay}s`,
                    '--reveal-duration': `${duration}s`,
                } as CSSProperties
            }
        >
            {children}
        </Tag>
    )
}

'use client'

// Core
import { ArrowUp, Menu, X } from 'lucide-react'
import { CSSProperties, useEffect, useRef, useState } from 'react'
// Constants
import { SECTIONS } from '@/src/utils/helpers.constants'
// Style
import '@/src/styles/components/PageRelated/SectionNav.css'

const ACTIVE_OFFSET = 120
const BOTTOM_THRESHOLD = 24

const getScrollBehavior = (): ScrollBehavior =>
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
        ? 'auto'
        : 'smooth'

export default function SectionNav() {
    const [activeId, setActiveId] = useState<string>(SECTIONS[0].id)
    const [atBottom, setAtBottom] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    const rafId = useRef<number | null>(null)

    // Track the active section and whether the page is scrolled to the end
    useEffect(() => {
        const updateFromScroll = () => {
            rafId.current = null

            if (window.scrollY <= ACTIVE_OFFSET) {
                setActiveId(SECTIONS[0].id)
                setAtBottom(false)
                return
            }

            let current = SECTIONS[0].id
            for (const { id } of SECTIONS) {
                const el = document.getElementById(id)
                if (el && el.getBoundingClientRect().top <= ACTIVE_OFFSET) {
                    current = id
                }
            }

            const scrollBottom = window.scrollY + window.innerHeight
            const pageHeight = document.documentElement.scrollHeight
            const isAtBottom = pageHeight - scrollBottom <= BOTTOM_THRESHOLD

            if (isAtBottom) {
                current = SECTIONS[SECTIONS.length - 1].id
            }

            setActiveId(current)
            setAtBottom(isAtBottom)
        }

        const handleScroll = () => {
            if (rafId.current !== null) return
            rafId.current = requestAnimationFrame(updateFromScroll)
        }

        updateFromScroll()
        window.addEventListener('scroll', handleScroll, { passive: true })
        window.addEventListener('resize', handleScroll, { passive: true })

        return () => {
            window.removeEventListener('scroll', handleScroll)
            window.removeEventListener('resize', handleScroll)
            if (rafId.current !== null) cancelAnimationFrame(rafId.current)
        }
    }, [])

    // Close the menu with Escape
    useEffect(() => {
        if (!isOpen) return

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') setIsOpen(false)
        }

        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [isOpen])

    const scrollToSection = (id: string) => {
        document
            .getElementById(id)
            ?.scrollIntoView({ behavior: getScrollBehavior(), block: 'start' })
        setIsOpen(false)
    }

    const jumpToEdge = () => {
        window.scrollTo({
            top: atBottom ? 0 : document.documentElement.scrollHeight,
            behavior: getScrollBehavior(),
        })
    }

    return (
        <nav aria-label='Section navigation' className='section-nav'>
            <ul
                id='section-nav-menu'
                className='section-nav-list'
                data-open={isOpen}
            >
                {SECTIONS.map(({ id, label }, index) => (
                    <li
                        key={id}
                        className='section-nav-entry'
                        style={{ '--index': index } as CSSProperties}
                    >
                        <button
                            type='button'
                            onClick={() => scrollToSection(id)}
                            aria-current={activeId === id ? 'true' : undefined}
                            className='section-nav-item'
                        >
                            {label}
                        </button>
                    </li>
                ))}
            </ul>

            <div className='section-nav-actions'>
                <button
                    type='button'
                    onClick={jumpToEdge}
                    className='section-nav-jump'
                    aria-label={atBottom ? 'Scroll to top' : 'Scroll to bottom'}
                >
                    <ArrowUp
                        size={16}
                        aria-hidden
                        className={
                            atBottom
                                ? 'section-nav-arrow'
                                : 'section-nav-arrow section-nav-arrow-down'
                        }
                    />
                </button>

                <button
                    type='button'
                    onClick={() => setIsOpen((prev) => !prev)}
                    className='section-nav-toggle'
                    aria-expanded={isOpen}
                    aria-controls='section-nav-menu'
                    aria-label='Toggle navigation menu'
                >
                    {isOpen ? (
                        <X size={18} aria-hidden />
                    ) : (
                        <Menu size={18} aria-hidden />
                    )}
                </button>
            </div>
        </nav>
    )
}

'use client'

// Core
import { ArrowUp, Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
// Animations
import { sectionNavList, sectionNavItem } from '@/src/utils/helpers.animation'
// Constants
import { SECTIONS } from '@/src/utils/helpers.constants'
// Style
import '@/src/styles/components/PageRelated/SectionNav.css'

export default function SectionNav() {
    const [activeId, setActiveId] = useState<string>(SECTIONS[0].id)
    const [atBottom, setAtBottom] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    const ticking = useRef(false)

    useEffect(() => {
        const updateFromScroll = () => {
            const offsetLine = 120

            if (window.scrollY <= offsetLine) {
                setActiveId(SECTIONS[0].id)
                setAtBottom(false)
                ticking.current = false
                return
            }

            let current = SECTIONS[0].id
            for (const { id } of SECTIONS) {
                const el = document.getElementById(id)
                if (el) {
                    const top = el.getBoundingClientRect().top
                    if (top <= offsetLine) {
                        current = id
                    }
                }
            }

            const scrollBottom = window.scrollY + window.innerHeight
            const pageHeight = document.documentElement.scrollHeight
            const isAtBottom = pageHeight - scrollBottom <= 24

            if (isAtBottom) {
                current = SECTIONS[SECTIONS.length - 1].id
            }

            setActiveId(current)
            setAtBottom(isAtBottom)

            ticking.current = false
        }

        const handleScroll = () => {
            if (ticking.current) return
            ticking.current = true
            requestAnimationFrame(updateFromScroll)
        }

        updateFromScroll()
        window.addEventListener('scroll', handleScroll, { passive: true })
        window.addEventListener('resize', handleScroll, { passive: true })
        return () => {
            window.removeEventListener('scroll', handleScroll)
            window.removeEventListener('resize', handleScroll)
        }
    }, [])

    const scrollToSection = (id: string) => {
        document
            .getElementById(id)
            ?.scrollIntoView({ behavior: 'smooth', block: 'start' })
        setIsOpen(false)
    }

    const jumpToEdge = () => {
        window.scrollTo({
            top: atBottom ? 0 : document.documentElement.scrollHeight,
            behavior: 'smooth',
        })
    }

    return (
        <nav aria-label='Section navigation' className='section-nav'>
            <AnimatePresence>
                {isOpen && (
                    <motion.ul
                        variants={sectionNavList}
                        initial='hidden'
                        animate='visible'
                        exit='exit'
                        className='section-nav-list'
                    >
                        {SECTIONS.map(({ id, label }, index) => (
                            <motion.li
                                key={id}
                                custom={index}
                                variants={sectionNavItem}
                            >
                                <button
                                    type='button'
                                    onClick={() => scrollToSection(id)}
                                    aria-current={
                                        activeId === id ? 'true' : undefined
                                    }
                                    className='section-nav-item'
                                >
                                    {label}
                                </button>
                            </motion.li>
                        ))}
                    </motion.ul>
                )}
            </AnimatePresence>

            <div className='flex items-center gap-2'>
                <button
                    type='button'
                    onClick={jumpToEdge}
                    className='section-nav-jump'
                    aria-label={atBottom ? 'Scroll to top' : 'Scroll to bottom'}
                >
                    <motion.span
                        animate={{ rotate: atBottom ? 0 : 180 }}
                        transition={{ duration: 0.3, ease: [0.33, 1, 0.68, 1] }}
                        className='inline-flex'
                    >
                        <ArrowUp size={16} aria-hidden />
                    </motion.span>
                </button>

                <button
                    type='button'
                    onClick={() => setIsOpen((prev) => !prev)}
                    className='section-nav-toggle'
                    aria-expanded={isOpen}
                    aria-label='Toggle navigation menu'
                >
                    {isOpen ? <X size={18} /> : <Menu size={18} />}
                </button>
            </div>
        </nav>
    )
}

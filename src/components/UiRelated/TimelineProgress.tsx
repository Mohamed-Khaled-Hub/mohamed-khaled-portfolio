'use client'

// Core
import { useRef } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
// Style
import '@/src/styles/components/UiRelated/TimelineProgress.css'

export default function TimelineProgress() {
    const trackRef = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({
        target: trackRef,
        offset: ['start 65%', 'end 60%'],
    })
    const lineScale = useSpring(scrollYProgress, {
        stiffness: 120,
        damping: 30,
        mass: 0.4,
    })

    return (
        <>
            <div ref={trackRef} className='timeline-track' aria-hidden />
            <motion.div
                className='timeline-progress'
                style={{ scaleY: lineScale }}
                aria-hidden
            />
        </>
    )
}

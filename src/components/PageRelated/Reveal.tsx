'use client'

// Core
import { motion, useReducedMotion } from 'framer-motion'
// Types
import { RevealProps } from '@/src/types/props.types'

export default function Reveal({
    as = 'div',
    id,
    className,
    delay = 0,
    duration = 1.1,
    children,
}: RevealProps) {
    const reduceMotion = useReducedMotion()
    const Tag = motion[as] as typeof motion.div

    return (
        <Tag
            id={id}
            className={className}
            initial={{ opacity: 0, y: reduceMotion ? 0 : 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1, margin: '0px 0px -80px 0px' }}
            transition={{
                duration: reduceMotion ? 0.5 : duration,
                delay,
                ease: [0.33, 1, 0.68, 1],
            }}
        >
            {children}
        </Tag>
    )
}

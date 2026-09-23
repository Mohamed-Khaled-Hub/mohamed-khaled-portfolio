'use client'

// Core
import { motion } from 'framer-motion'
import { PropsWithChildren } from 'react'
// Style
import '@/src/styles/components/UiRelated/GradientBgAnimation.css'

export default function GradientBgAnimation({ children }: PropsWithChildren) {
    return (
        <motion.div
            className='gradient-bg'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
        >
            <div className='gradient-layer' aria-hidden='true'>
                <span className='gradient-orb orb-one' />
                <span className='gradient-orb orb-two' />
                <span className='gradient-orb orb-three' />
                <span className='gradient-grain' />
            </div>
            {children}
        </motion.div>
    )
}

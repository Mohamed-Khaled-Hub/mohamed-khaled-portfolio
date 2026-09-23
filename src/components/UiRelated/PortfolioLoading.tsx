'use client'

// Core
import { motion } from 'framer-motion'
// Types
import { PortfolioLoadingProps } from '@/src/types/props.types'
// Styles
import '@/src/styles/components/UiRelated/PortfolioLoading.css'

export default function PortfolioLoading({ message }: PortfolioLoadingProps) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className='loading-container'
        >
            <motion.div
                initial={{ opacity: 0, scale: 0.92, y: 8 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className='loading-content'
            >
                <div className='loading-spinner-wrapper'>
                    <motion.div
                        animate={{
                            opacity: [0.1, 0.25, 0.1],
                            scale: [0.95, 1.05, 0.95],
                        }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: 'easeInOut',
                        }}
                        className='loading-glow'
                    />

                    <motion.svg
                        animate={{ rotate: 360 }}
                        transition={{
                            duration: 1.4,
                            repeat: Infinity,
                            ease: 'linear',
                        }}
                        className='loading-svg'
                        viewBox='0 0 50 50'
                    >
                        <defs>
                            <linearGradient
                                id='monochrome-spinner-gradient'
                                x1='0%'
                                y1='0%'
                                x2='100%'
                                y2='100%'
                            >
                                <stop
                                    offset='0%'
                                    stopColor='var(--color-c5)'
                                    stopOpacity='1'
                                />
                                <stop
                                    offset='50%'
                                    stopColor='var(--color-c4)'
                                    stopOpacity='0.5'
                                />
                                <stop
                                    offset='100%'
                                    stopColor='var(--color-c3)'
                                    stopOpacity='0'
                                />
                            </linearGradient>
                        </defs>

                        <circle
                            cx='25'
                            cy='25'
                            r='20'
                            fill='none'
                            strokeWidth='3.5'
                            className='loading-track'
                        />

                        <circle
                            cx='25'
                            cy='25'
                            r='20'
                            fill='none'
                            stroke='url(#monochrome-spinner-gradient)'
                            strokeWidth='3.5'
                            strokeDasharray='90 150'
                            strokeLinecap='round'
                        />
                    </motion.svg>
                </div>

                {message && (
                    <motion.p
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                            duration: 0.6,
                            delay: 0.2,
                            ease: [0.16, 1, 0.3, 1],
                        }}
                        className='loading-message'
                    >
                        {message}
                    </motion.p>
                )}
            </motion.div>
        </motion.div>
    )
}

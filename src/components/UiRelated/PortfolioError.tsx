'use client'

// Core
import { motion } from 'framer-motion'
import { AlertCircle } from 'lucide-react'
// Types
import { PortfolioErrorProps } from '@/src/types/props.types'
// Style
import '@/src/styles/components/UiRelated/PortfolioError.css'

export default function PortfolioError({ message }: PortfolioErrorProps) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className='error-container'
        >
            <motion.div
                initial={{ opacity: 0, scale: 0.92, y: 12 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className='error-card'
            >
                <motion.div
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{
                        type: 'spring',
                        stiffness: 300,
                        damping: 20,
                        delay: 0.1,
                    }}
                >
                    <AlertCircle className='error-icon' />
                </motion.div>

                <motion.h2
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                        duration: 0.5,
                        delay: 0.15,
                        ease: [0.16, 1, 0.3, 1],
                    }}
                    className='error-title'
                >
                    Error
                </motion.h2>

                {message && (
                    <motion.p
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                            duration: 0.5,
                            delay: 0.25,
                            ease: [0.16, 1, 0.3, 1],
                        }}
                        className='error-message'
                    >
                        {message}
                    </motion.p>
                )}
            </motion.div>
        </motion.div>
    )
}

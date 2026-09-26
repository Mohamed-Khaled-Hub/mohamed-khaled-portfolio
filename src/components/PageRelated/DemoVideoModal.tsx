'use client'

// Core
import { X } from 'lucide-react'
import { useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
// Components
import VideoPlayer from '@/src/components/PageRelated/VideoPlayer'
// Types
import { DemoVideoModalProps } from '@/src/types/props.types'
// Styles
import '@/src/styles/components/PageRelated/DemoVideoModal.css'

export default function DemoVideoModal({
    src,
    onCloseAction,
}: DemoVideoModalProps) {
    useEffect(() => {
        if (!src) return

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape' && !document.fullscreenElement) {
                onCloseAction()
            }
        }

        document.addEventListener('keydown', handleKeyDown)
        const previousOverflow = document.body.style.overflow
        document.body.style.overflow = 'hidden'

        return () => {
            document.removeEventListener('keydown', handleKeyDown)
            document.body.style.overflow = previousOverflow
        }
    }, [src, onCloseAction])

    return (
        <AnimatePresence>
            {src && (
                <motion.div
                    className='demo-video-modal-backdrop'
                    initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
                    animate={{ opacity: 1, backdropFilter: 'blur(8px)' }}
                    exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
                    transition={{ duration: 0.3, ease: [0.33, 1, 0.68, 1] }}
                    onClick={onCloseAction}
                >
                    <motion.div
                        className='demo-video-modal-panel'
                        initial={{ opacity: 0, scale: 0.94, y: 16 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.94, y: 16 }}
                        transition={{
                            duration: 0.35,
                            ease: [0.33, 1, 0.68, 1],
                        }}
                        onClick={(event) => event.stopPropagation()}
                    >
                        <button
                            type='button'
                            onClick={onCloseAction}
                            className='demo-video-modal-close'
                            aria-label='Close video'
                        >
                            <X size={18} aria-hidden />
                        </button>

                        <VideoPlayer
                            key={src}
                            src={src}
                            extraShortcuts={[
                                { keys: ['Esc'], label: 'Close video' },
                            ]}
                        />
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

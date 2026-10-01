'use client'

// Core
import { useState } from 'react'
import dynamic from 'next/dynamic'
import { Video } from 'lucide-react'
// Style
import '@/src/styles/components/VideoRelated/DemoButton.css'

const DemoVideoModal = dynamic(
    () => import('@/src/components/VideoRelated/DemoVideoModal'),
)

export default function DemoButton({ src }: { src: string }) {
    const [isOpen, setIsOpen] = useState(false)
    const [hasOpened, setHasOpened] = useState(false)

    return (
        <>
            <button
                type='button'
                onClick={() => {
                    setHasOpened(true)
                    setIsOpen(true)
                }}
                className='home-project-demo'
            >
                <Video size={15} aria-hidden />
                Watch demo
            </button>

            {hasOpened && (
                <DemoVideoModal
                    src={isOpen ? src : null}
                    onCloseAction={() => setIsOpen(false)}
                />
            )}
        </>
    )
}

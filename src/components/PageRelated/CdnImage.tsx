'use client'

// Core
import { useState } from 'react'
import Image from 'next/image'
import { ImageOff } from 'lucide-react'
// Types
import { CdnImageProps } from '@/src/types/props.types'
// Styles
import '@/src/styles/components/PageRelated/CdnImage.css'

export default function CdnImage({
    src,
    maxRetries = 3,
    className,
    ...rest
}: CdnImageProps) {
    const [status, setStatus] = useState<'loading' | 'loaded' | 'failed'>(
        'loading',
    )
    const [attempt, setAttempt] = useState(0)

    const handleError = () => {
        if (attempt < maxRetries) {
            setTimeout(() => {
                setAttempt((prev) => prev + 1)
                setStatus('loading')
            }, 1000)
        } else {
            setStatus('failed')
        }
    }

    if (status === 'failed') {
        return (
            <div className='cdn-image-fallback'>
                <ImageOff size={28} aria-hidden />
            </div>
        )
    }

    const retriedSrc =
        typeof src === 'string' && attempt > 0
            ? `${src}${src.includes('?') ? '&' : '?'}retry=${attempt}`
            : src

    return (
        <>
            {status === 'loading' && (
                <div className='cdn-image-skeleton' aria-hidden />
            )}
            {/* eslint-disable-next-line jsx-a11y/alt-text */}
            <Image
                key={attempt}
                src={retriedSrc}
                onLoad={() => setStatus('loaded')}
                onError={handleError}
                className={`${className ?? ''} ${
                    status === 'loading' ? 'cdn-image-hidden' : ''
                }`}
                {...rest}
            />
        </>
    )
}

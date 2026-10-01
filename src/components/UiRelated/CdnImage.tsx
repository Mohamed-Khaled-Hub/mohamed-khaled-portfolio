'use client'

// Core
import Image from 'next/image'
import { ImageOff } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
// Types
import { CdnImageProps } from '@/src/types/props.types'
import { CdnImageStatus } from '@/src/types/ui.types'
// Styles
import '@/src/styles/components/UiRelated/CdnImage.css'

export default function CdnImage({
    src,
    alt,
    maxRetries = 3,
    className,
    ...rest
}: CdnImageProps) {
    const [status, setStatus] = useState<CdnImageStatus>('loading')
    const [attempt, setAttempt] = useState(0)
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

    useEffect(() => {
        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current)
        }
    }, [])

    const handleError = () => {
        if (attempt < maxRetries) {
            setStatus('retrying')
            timeoutRef.current = setTimeout(() => {
                setAttempt((prev) => prev + 1)
            }, 1000)
        } else {
            setStatus('failed')
        }
    }

    if (status === 'failed') {
        return (
            <div className='cdn-image-fallback' role='img' aria-label={alt}>
                <ImageOff size={28} aria-hidden />
            </div>
        )
    }

    const retriedSrc =
        typeof src === 'string' && attempt > 0
            ? `${src}${src.includes('?') ? '&' : '?'}retry=${attempt}`
            : src

    const showSkeleton = status === 'loading' || status === 'retrying'

    return (
        <>
            {showSkeleton && <div className='cdn-image-skeleton' aria-hidden />}
            <Image
                key={attempt}
                src={retriedSrc}
                alt={alt}
                onLoad={() => setStatus('loaded')}
                onError={handleError}
                className={
                    status === 'retrying'
                        ? `${className ?? ''} cdn-image-hidden`.trim()
                        : className
                }
                {...rest}
            />
        </>
    )
}

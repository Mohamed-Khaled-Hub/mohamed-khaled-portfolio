// Core
import type { ImageProps } from 'next/image'
import type { PropsWithChildren } from 'react'
// Types
import { Shortcut } from '@/src/types/ui.types'
import { PortfolioData } from '@/src/types/portfolio.types'

export type RevealProps = PropsWithChildren & {
    as?: 'div' | 'article' | 'li' | 'section'
    id?: string
    className?: string
    delay?: number
    duration?: number
}

export type ExternalLinkProps = PropsWithChildren & {
    href: string
    className?: string
}

export type DemoVideoModalProps = {
    src: string | null
    onCloseAction: () => void
}

export type VideoPlayerProps = {
    src: string
    extraShortcuts?: Shortcut[]
}

export type CdnImageProps = Omit<ImageProps, 'onError' | 'onLoad'> & {
    maxRetries?: number
}

export type HeroSectionProps = {
    personal: PortfolioData['personal']
    summary: string
}

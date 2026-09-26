// Core
import type { PropsWithChildren } from 'react'
// Types
import { Shortcut } from '@/src/types/ui.types'

export type PortfolioLoadingProps = {
    message?: string
}

export type PortfolioErrorProps = {
    message?: string
    onRetryAction?: () => void
}

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

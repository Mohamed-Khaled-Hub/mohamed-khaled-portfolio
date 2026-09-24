// Core
import type { PropsWithChildren } from 'react'

export type PortfolioLoadingProps = {
    message?: string
}

export type PortfolioErrorProps = {
    message?: string
}

export type RevealProps = PropsWithChildren & {
    as?: 'div' | 'article' | 'li' | 'section'
    id?: string
    className?: string
    delay?: number
    duration?: number
}

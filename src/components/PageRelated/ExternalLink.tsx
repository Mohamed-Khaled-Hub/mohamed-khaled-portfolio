// Core
import clsx from 'clsx'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
// Types
import { ExternalLinkProps } from '@/src/types/props.types'
// Style
import '@/src/styles/components/PageRelated/ExternalLink.css'

export default function ExternalLink({
    href,
    children,
    className,
}: ExternalLinkProps) {
    return (
        <Link
            href={href}
            target='_blank'
            rel='noopener noreferrer'
            className={clsx('external-link', className)}
        >
            {children}
            <ArrowUpRight size={16} aria-hidden />
        </Link>
    )
}

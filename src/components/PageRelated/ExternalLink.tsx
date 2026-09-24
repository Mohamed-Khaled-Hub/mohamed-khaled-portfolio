// Core
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { PropsWithChildren } from 'react'

export default function ExternalLink({
    href,
    children,
}: {
    href: string
} & PropsWithChildren) {
    return (
        <Link
            href={href}
            target='_blank'
            rel='noopener noreferrer'
            className='inline-flex items-center gap-1 text-sm font-medium text-c5 underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-c5'
        >
            {children}
            <ArrowUpRight size={15} aria-hidden />
        </Link>
    )
}

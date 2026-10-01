// Core
import { ComponentProps } from 'react'
// Style
import '@/src/styles/components/PageRelated/SectionTitle.css'

export default function SectionTitle({
    children,
    ...props
}: ComponentProps<'h2'>) {
    return (
        <h2 {...props} className='section-title'>
            {children}
        </h2>
    )
}

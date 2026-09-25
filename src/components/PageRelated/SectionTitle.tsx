// Core
import { PropsWithChildren } from 'react'
// Style
import '@/src/styles/components/PageRelated/SectionTitle.css'

export default function SectionTitle({ children }: PropsWithChildren) {
    return <h2 className='section-title'>{children}</h2>
}

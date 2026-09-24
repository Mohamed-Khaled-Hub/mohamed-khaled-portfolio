// Core
import { PropsWithChildren } from 'react'

export default function SectionTitle({ children }: PropsWithChildren) {
    return (
        <h2 className='mb-10 text-3xl font-semibold tracking-tight text-c5 sm:text-4xl'>
            {children}
        </h2>
    )
}

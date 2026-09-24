// Core
import { PropsWithChildren } from 'react'

export default function Chip({ children }: PropsWithChildren) {
    return (
        <li className='rounded-md border border-c3 bg-c2 px-2.5 py-1 text-sm text-c5'>
            {children}
        </li>
    )
}

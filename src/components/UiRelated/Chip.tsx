// Core
import { PropsWithChildren } from 'react'
// Style
import '@/src/styles/components/UiRelated/Chip.css'

export default function Chip({ children }: PropsWithChildren) {
    return <li className='chip'>{children}</li>
}

// Core
import { PropsWithChildren } from 'react'
// Style
import '@/src/styles/components/UiRelated/GradientBgAnimation.css'

export default function GradientBgAnimation({ children }: PropsWithChildren) {
    return (
        <div className='gradient-bg'>
            <div className='gradient-layer' aria-hidden='true'>
                <span className='gradient-orb orb-one' />
                <span className='gradient-orb orb-two' />
                <span className='gradient-orb orb-three' />
                <span className='gradient-grain' />
            </div>
            {children}
        </div>
    )
}

// Core
import { Mail, MapPin, Phone } from 'lucide-react'
// Components
import CdnImage from '@/src/components/UiRelated/CdnImage'
import ExternalLink from '@/src/components/UiRelated/ExternalLink'
// Types
import { HeroSectionProps } from '@/src/types/props.types'
// Style
import '@/src/styles/components/PageRelated/HeroSection.css'

export default function HeroSection({ personal, summary }: HeroSectionProps) {
    return (
        <header id='about' className='home-section-scroll-margin'>
            <div className='home-hero-inner'>
                <div className='home-hero-text'>
                    <p className='home-hero-location'>
                        <MapPin size={16} aria-hidden />
                        {personal.location}
                    </p>
                    <h1 className='home-hero-name'>{personal.name}</h1>
                    <p className='home-hero-title'>{personal.title}</p>
                    <p className='home-hero-summary'>{summary}</p>
                    <div className='home-hero-actions'>
                        <a
                            href={`mailto:${personal.email}`}
                            className='home-hero-button-primary'
                        >
                            <Mail size={18} aria-hidden />
                            Email me
                        </a>
                        <a
                            href={`tel:${personal.phone.replace(/\s/g, '')}`}
                            className='home-hero-button-secondary'
                        >
                            <Phone size={18} aria-hidden />
                            {personal.phone}
                        </a>
                        <ExternalLink
                            href={personal.github}
                            className='home-hero-link'
                        >
                            GitHub
                        </ExternalLink>
                        <ExternalLink
                            href={personal.linkedin}
                            className='home-hero-link'
                        >
                            LinkedIn
                        </ExternalLink>
                    </div>
                </div>

                <div className='home-hero-media'>
                    <div className='home-hero-image-float'>
                        <div className='home-hero-image-frame'>
                            <CdnImage
                                src='https://res.cloudinary.com/jwllq2cg/image/upload/v1790626285/mohamed-khaled-img.jpg'
                                alt={personal.name}
                                fill
                                loading='eager'
                                sizes='(min-width: 1024px) 470px, (min-width: 480px) 448px, 90vw'
                                className='home-hero-image'
                            />
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}

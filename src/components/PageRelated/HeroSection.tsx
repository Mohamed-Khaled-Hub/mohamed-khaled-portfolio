'use client'

// Core
import Link from 'next/link'
import { Mail, MapPin, Phone } from 'lucide-react'
import { motion, useReducedMotion } from 'framer-motion'
// Animations
import {
    heroContainer,
    heroItem,
    heroItemReduced,
    heroMedia,
    heroMediaReduced,
} from '@/src/utils/helpers.animation'
// Components
import CdnImage from '@/src/components/PageRelated/CdnImage'
import ExternalLink from '@/src/components/PageRelated/ExternalLink'
// Types
import { HeroSectionProps } from '@/src/types/props.types'
// Style
import '@/src/styles/components/PageRelated/HeroSection.css'

export default function HeroSection({ personal, summary }: HeroSectionProps) {
    const reduceMotion = useReducedMotion()

    const item = reduceMotion ? heroItemReduced : heroItem
    const media = reduceMotion ? heroMediaReduced : heroMedia

    return (
        <header id='about' className='home-section-scroll-margin'>
            <motion.div
                variants={heroContainer}
                initial='hidden'
                animate='show'
                className='home-hero-inner'
            >
                <div className='home-hero-text'>
                    <motion.p variants={item} className='home-hero-location'>
                        <MapPin size={16} aria-hidden />
                        {personal.location}
                    </motion.p>
                    <motion.h1 variants={item} className='home-hero-name'>
                        {personal.name}
                    </motion.h1>
                    <motion.p variants={item} className='home-hero-title'>
                        {personal.title}
                    </motion.p>
                    <motion.p variants={item} className='home-hero-summary'>
                        {summary}
                    </motion.p>
                    <motion.div variants={item} className='home-hero-actions'>
                        <Link
                            href={`mailto:${personal.email}`}
                            className='home-hero-button-primary'
                        >
                            <Mail size={18} aria-hidden />
                            Email me
                        </Link>
                        <Link
                            href={`tel:${personal.phone.replace(/\s/g, '')}`}
                            className='home-hero-button-secondary'
                        >
                            <Phone size={18} aria-hidden />
                            {personal.phone}
                        </Link>
                        <ExternalLink
                            href={personal.github}
                            className='px-3 py-3'
                        >
                            GitHub
                        </ExternalLink>
                        <ExternalLink
                            href={personal.linkedin}
                            className='px-3 py-3'
                        >
                            LinkedIn
                        </ExternalLink>
                    </motion.div>
                </div>

                <motion.div variants={media} className='home-hero-media'>
                    <motion.div
                        className='home-hero-image-float'
                        animate={reduceMotion ? undefined : { y: [0, -12, 0] }}
                        transition={{
                            duration: 6,
                            repeat: Infinity,
                            ease: 'easeInOut',
                        }}
                    >
                        <div className='home-hero-image-frame'>
                            <CdnImage
                                src='https://res.cloudinary.com/jwllq2cg/image/upload/v1790626285/mohamed-khaled-img.jpg'
                                alt={personal.name}
                                fill
                                loading='eager'
                                sizes='(min-width: 1024px) 45vw, 90vw'
                                className='home-hero-image'
                            />
                        </div>
                    </motion.div>
                </motion.div>
            </motion.div>
        </header>
    )
}

'use client'

// Core
import Link from 'next/link'
import Image from 'next/image'
import {
    ArrowUpRight,
    GraduationCap,
    Languages,
    Mail,
    MapPin,
    Phone,
    ShieldCheck,
} from 'lucide-react'
import { motion, stagger, useReducedMotion, type Variants } from 'framer-motion'
// Components
import PortfolioLoading from '@/src/components/UiRelated/PortfolioLoading'
import PortfolioError from '@/src/components/UiRelated/PortfolioError'
import ExternalLink from '@/src/components/PageRelated/ExternalLink'
import SectionTitle from '@/src/components/PageRelated/SectionTitle'
import Chip from '@/src/components/PageRelated/Chip'
import Reveal from '@/src/components/PageRelated/Reveal'
import ExperienceTimeline from '@/src/components/PageRelated/ExperienceTimeline'
// Constants
import { LINK_LABELS, SKILL_LABELS } from '@/src/utils/helpers.constants'
// Functions
import { formatDate } from '@/src/utils/helpers.functions'
// Hooks
import { usePortfolio } from '@/src/providers/PortfolioProvider'
// Styles
import '@/src/styles/app/page.css'

const heroContainer: Variants = {
    hidden: {},
    show: {
        transition: {
            delayChildren: stagger(0.09, { startDelay: 0.05 }),
        },
    },
}

const heroItem: Variants = {
    hidden: { opacity: 0, y: 24 },
    show: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
}

const heroItemReduced: Variants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { duration: 0.4 } },
}

const heroMedia: Variants = {
    hidden: { opacity: 0, x: 48, scale: 0.94 },
    show: {
        opacity: 1,
        x: 0,
        scale: 1,
        transition: { duration: 1, ease: [0.22, 1, 0.36, 1] },
    },
}

export default function Home() {
    const { portfolioData, portfolioError, isPortfolioLoading } = usePortfolio()

    const reduceMotion = useReducedMotion()

    if (isPortfolioLoading) {
        return <PortfolioLoading message='Loading portfolio data...' />
    }

    if (portfolioError) {
        return <PortfolioError message={portfolioError} />
    }

    if (!portfolioData) return null

    const {
        personal,
        summary,
        education,
        experience,
        projects,
        skills,
        additionalInformation,
    } = portfolioData

    const item = reduceMotion ? heroItemReduced : heroItem

    return (
        <main className='home-page'>
            <header>
                <motion.div
                    variants={heroContainer}
                    initial='hidden'
                    animate='show'
                    className='home-hero-inner'
                >
                    <div className='home-hero-text'>
                        <motion.p
                            variants={item}
                            className='home-hero-location'
                        >
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
                        <motion.div
                            variants={item}
                            className='home-hero-actions'
                        >
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
                            <Link
                                href={personal.github}
                                target='_blank'
                                rel='noopener noreferrer'
                                className='home-hero-link'
                            >
                                GitHub <ArrowUpRight size={16} aria-hidden />
                            </Link>
                            <Link
                                href={personal.linkedin}
                                target='_blank'
                                rel='noopener noreferrer'
                                className='home-hero-link'
                            >
                                LinkedIn <ArrowUpRight size={16} aria-hidden />
                            </Link>
                        </motion.div>
                    </div>

                    <motion.div
                        variants={heroMedia}
                        className='home-hero-media'
                    >
                        <motion.div
                            className='home-hero-image-float'
                            animate={{ y: [0, -12, 0] }}
                            transition={{
                                duration: 6,
                                repeat: Infinity,
                                ease: 'easeInOut',
                            }}
                        >
                            <div className='home-hero-image-frame'>
                                <Image
                                    src='/mohamed-khaled-img.jpeg'
                                    alt={personal.name}
                                    fill
                                    priority
                                    sizes='(min-width: 1024px) 45vw, 90vw'
                                    className='home-hero-image'
                                />
                            </div>
                        </motion.div>
                    </motion.div>
                </motion.div>
            </header>

            <div className='home-content'>
                <section aria-labelledby='experience'>
                    <Reveal id='experience'>
                        <SectionTitle>Experience</SectionTitle>
                    </Reveal>
                    <ExperienceTimeline experience={experience} />
                </section>

                <section aria-labelledby='projects'>
                    <Reveal id='projects'>
                        <SectionTitle>Projects</SectionTitle>
                    </Reveal>
                    <div className='home-projects-list'>
                        {projects.map((project) => (
                            <Reveal
                                as='article'
                                key={project.name}
                                className='home-project'
                            >
                                <div>
                                    <h3 className='home-project-name'>
                                        {project.name}
                                    </h3>
                                    {project.subtitle !== project.name && (
                                        <p className='home-project-subtitle'>
                                            {project.subtitle}
                                        </p>
                                    )}
                                    <div className='home-project-links'>
                                        {Object.entries(project.links).map(
                                            ([key, href]) => (
                                                <ExternalLink
                                                    key={key}
                                                    href={href}
                                                >
                                                    {LINK_LABELS[key] ?? key}
                                                </ExternalLink>
                                            ),
                                        )}
                                    </div>
                                </div>
                                <div>
                                    <ul className='home-project-bullets'>
                                        {project.description.map((line) => (
                                            <li key={line}>{line}</li>
                                        ))}
                                    </ul>
                                    <ul className='home-project-tech'>
                                        {project.technologies.map((tech) => (
                                            <Chip key={tech}>{tech}</Chip>
                                        ))}
                                    </ul>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </section>

                <section aria-labelledby='skills'>
                    <Reveal id='skills'>
                        <SectionTitle>Skills</SectionTitle>
                    </Reveal>
                    <dl className='home-skills-list'>
                        {Object.entries(skills).map(([group, items]) => (
                            <Reveal key={group} className='home-skills-row'>
                                <dt className='home-skills-label'>
                                    {SKILL_LABELS[group] ?? group}
                                </dt>
                                <dd>
                                    <ul className='home-skills-chips'>
                                        {items.map((skill) => (
                                            <Chip key={skill}>{skill}</Chip>
                                        ))}
                                    </ul>
                                </dd>
                            </Reveal>
                        ))}
                    </dl>
                </section>

                <section
                    aria-labelledby='background'
                    className='home-background'
                >
                    <Reveal id='background'>
                        <SectionTitle>Education</SectionTitle>
                        {education.map((edu) => (
                            <div
                                key={edu.degree}
                                className='home-education-item'
                            >
                                <GraduationCap
                                    className='home-education-icon'
                                    size={22}
                                    aria-hidden
                                />
                                <div>
                                    <h3 className='home-education-degree'>
                                        {edu.degree}
                                    </h3>
                                    <p className='home-education-institution'>
                                        {edu.institution}
                                    </p>
                                    <p className='home-education-dates'>
                                        {formatDate(edu.startDate)} –{' '}
                                        {formatDate(edu.endDate)},{' '}
                                        {edu.location}
                                    </p>
                                    <p className='home-education-grade'>
                                        CGPA {edu.cgpa}, {edu.grade}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </Reveal>
                    <Reveal delay={0.12}>
                        <SectionTitle>Good to know</SectionTitle>
                        <ul className='home-info-list'>
                            <li className='home-info-item'>
                                <ShieldCheck
                                    className='home-info-icon'
                                    size={22}
                                    aria-hidden
                                />
                                <p>
                                    Military status:{' '}
                                    {additionalInformation.militaryStatus}
                                </p>
                            </li>
                            <li className='home-info-item'>
                                <Languages
                                    className='home-info-icon'
                                    size={22}
                                    aria-hidden
                                />
                                <ul className='home-info-languages'>
                                    {additionalInformation.languages.map(
                                        (lang) => (
                                            <li key={lang.name}>
                                                {lang.name}
                                                <span className='home-info-level'>
                                                    , {lang.level}
                                                </span>
                                            </li>
                                        ),
                                    )}
                                </ul>
                            </li>
                        </ul>
                    </Reveal>
                </section>
            </div>
        </main>
    )
}

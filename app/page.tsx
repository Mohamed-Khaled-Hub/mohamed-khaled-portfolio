'use client'

// Core
import Link from 'next/link'
import Image from 'next/image'
import {
    Mail,
    Phone,
    MapPin,
    Languages,
    ShieldCheck,
    GraduationCap,
} from 'lucide-react'
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
import Chip from '@/src/components/PageRelated/Chip'
import Reveal from '@/src/components/PageRelated/Reveal'
import ExternalLink from '@/src/components/PageRelated/ExternalLink'
import SectionTitle from '@/src/components/PageRelated/SectionTitle'
import PortfolioError from '@/src/components/UiRelated/PortfolioError'
import PortfolioLoading from '@/src/components/UiRelated/PortfolioLoading'
import ExperienceTimeline from '@/src/components/PageRelated/ExperienceTimeline'
import SectionNav from '@/src/components/PageRelated/SectionNav'
// Constants
import { LINK_LABELS, SKILL_LABELS } from '@/src/utils/helpers.constants'
// Functions
import { formatDate } from '@/src/utils/helpers.functions'
// Hooks
import { usePortfolio } from '@/src/providers/PortfolioProvider'
// Style
import '@/src/styles/app/page.css'

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
    const media = reduceMotion ? heroMediaReduced : heroMedia

    return (
        <main className='home-page'>
            <SectionNav />

            <header id='about' className='home-section-scroll-margin'>
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
                            animate={
                                reduceMotion ? undefined : { y: [0, -12, 0] }
                            }
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
                {/* Eduction */}
                <section aria-labelledby='education'>
                    <Reveal
                        id='education'
                        className='home-section-scroll-margin'
                    >
                        <SectionTitle>Education</SectionTitle>
                        <div className='home-education-list'>
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
                                    <div className='home-education-content'>
                                        <h3 className='home-education-degree'>
                                            {edu.degree}
                                        </h3>
                                        <p className='home-education-institution'>
                                            {edu.institution}
                                        </p>
                                        <div className='home-education-meta'>
                                            <span>
                                                {formatDate(edu.startDate)} –{' '}
                                                {formatDate(edu.endDate)}
                                            </span>
                                            <span
                                                className='home-education-dot'
                                                aria-hidden
                                            >
                                                •
                                            </span>
                                            <span className='home-education-location'>
                                                <MapPin size={14} aria-hidden />
                                                {edu.location}
                                            </span>
                                        </div>
                                        {(edu.cgpa || edu.grade) && (
                                            <p className='home-education-grade'>
                                                {edu.cgpa && (
                                                    <span>
                                                        CGPA:{' '}
                                                        <strong className='home-education-highlight'>
                                                            {edu.cgpa}
                                                        </strong>
                                                    </span>
                                                )}
                                                {edu.cgpa && edu.grade && (
                                                    <span
                                                        className='home-education-dot'
                                                        aria-hidden
                                                    >
                                                        •
                                                    </span>
                                                )}
                                                {edu.grade && (
                                                    <span>{edu.grade}</span>
                                                )}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Reveal>
                </section>

                {/* Good to know */}
                <section aria-labelledby='good-to-know'>
                    <Reveal
                        id='good-to-know'
                        className='home-section-scroll-margin'
                    >
                        <SectionTitle>Good to know</SectionTitle>
                        <dl className='home-info-list'>
                            <div className='home-info-row'>
                                <dt className='home-info-label'>
                                    <ShieldCheck
                                        className='home-info-icon'
                                        size={20}
                                        aria-hidden
                                    />
                                    <span>Military Status</span>
                                </dt>
                                <dd className='home-info-value'>
                                    {additionalInformation.militaryStatus}
                                </dd>
                            </div>

                            <div className='home-info-row'>
                                <dt className='home-info-label'>
                                    <Languages
                                        className='home-info-icon'
                                        size={20}
                                        aria-hidden
                                    />
                                    <span>Languages</span>
                                </dt>
                                <dd className='home-info-languages'>
                                    {additionalInformation.languages.map(
                                        (lang, index) => (
                                            <span
                                                key={lang.name}
                                                className='home-language-item'
                                            >
                                                <span className='home-language-name'>
                                                    {lang.name}
                                                </span>
                                                <span className='home-language-level'>
                                                    ({lang.level})
                                                </span>
                                                {index <
                                                    additionalInformation
                                                        .languages.length -
                                                        1 && (
                                                    <span
                                                        className='home-info-dot'
                                                        aria-hidden
                                                    >
                                                        •
                                                    </span>
                                                )}
                                            </span>
                                        ),
                                    )}
                                </dd>
                            </div>
                        </dl>
                    </Reveal>
                </section>

                {/* Experience */}
                <section aria-labelledby='experience'>
                    <Reveal
                        id='experience'
                        className='home-section-scroll-margin'
                    >
                        <SectionTitle>Experience</SectionTitle>
                    </Reveal>
                    <ExperienceTimeline experience={experience} />
                </section>

                {/* Projects */}
                <section aria-labelledby='projects'>
                    <Reveal
                        id='projects'
                        className='home-section-scroll-margin'
                    >
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

                {/* Skills */}
                <section aria-labelledby='skills'>
                    <Reveal id='skills' className='home-section-scroll-margin'>
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
            </div>
        </main>
    )
}

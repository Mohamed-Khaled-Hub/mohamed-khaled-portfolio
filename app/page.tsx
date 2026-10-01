// Core
import { MapPin, Languages, ShieldCheck, GraduationCap } from 'lucide-react'
// Components
import Chip from '@/src/components/PageRelated/Chip'
import Reveal from '@/src/components/PageRelated/Reveal'
import ExternalLink from '@/src/components/PageRelated/ExternalLink'
import SectionTitle from '@/src/components/PageRelated/SectionTitle'
import ExperienceTimeline from '@/src/components/PageRelated/ExperienceTimeline'
import SectionNav from '@/src/components/PageRelated/SectionNav'
import HeroSection from '@/src/components/PageRelated/HeroSection'
import DemoButton from '@/src/components/VideoRelated/DemoButton'
// Constants
import { LINK_LABELS, SKILL_LABELS } from '@/src/utils/helpers.constants'
// Data
import portfolioData from '@/src/data/mohamed-khaled-info.json'
// Functions
import { formatDate } from '@/src/utils/helpers.functions'
// Types
import { PortfolioData } from '@/src/types/portfolio.types'
// Style
import '@/src/styles/app/page.css'

export default function Home() {
    const {
        personal,
        summary,
        education,
        experience,
        projects,
        skills,
        additionalInformation,
    } = portfolioData as PortfolioData

    return (
        <main className='home-page'>
            <SectionNav />

            {/* About */}
            <HeroSection personal={personal} summary={summary} />

            <div className='home-content'>
                {/* Education */}
                <section
                    id='education'
                    aria-labelledby='education-title'
                    className='home-section-scroll-margin'
                >
                    <Reveal>
                        <SectionTitle id='education-title'>
                            Education
                        </SectionTitle>
                        <div className='home-education-list'>
                            {education.map((edu) => (
                                <div
                                    key={`${edu.institution}-${edu.degree}`}
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
                <section
                    id='good-to-know'
                    aria-labelledby='good-to-know-title'
                    className='home-section-scroll-margin'
                >
                    <Reveal>
                        <SectionTitle id='good-to-know-title'>
                            Good to know
                        </SectionTitle>
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
                <section
                    id='experience'
                    aria-labelledby='experience-title'
                    className='home-section-scroll-margin'
                >
                    <Reveal>
                        <SectionTitle id='experience-title'>
                            Experience
                        </SectionTitle>
                    </Reveal>
                    <ExperienceTimeline experience={experience} />
                </section>

                {/* Projects */}
                <section
                    id='projects'
                    aria-labelledby='projects-title'
                    className='home-section-scroll-margin'
                >
                    <Reveal>
                        <SectionTitle id='projects-title'>
                            Projects
                        </SectionTitle>
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
                                        {project.demoVideo && (
                                            <DemoButton
                                                src={project.demoVideo}
                                            />
                                        )}
                                    </div>
                                </div>
                                <div>
                                    <ul className='home-project-bullets'>
                                        {project.description.map(
                                            (line, index) => (
                                                <li
                                                    key={`${project.name}-${index}`}
                                                >
                                                    {line}
                                                </li>
                                            ),
                                        )}
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
                <section
                    id='skills'
                    aria-labelledby='skills-title'
                    className='home-section-scroll-margin'
                >
                    <Reveal>
                        <SectionTitle id='skills-title'>Skills</SectionTitle>
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

'use client'

// Core
import { useRef, useState } from 'react'
import { Video } from 'lucide-react'
import { motion, useScroll, useSpring } from 'framer-motion'
// Components
import Reveal from '@/src/components/PageRelated/Reveal'
import DemoVideoModal from '@/src/components/PageRelated/DemoVideoModal'
// Functions
import { formatDate } from '@/src/utils/helpers.functions'
// Types
import { PortfolioData } from '@/src/types/portfolio.types'
// Style
import '@/src/styles/components/PageRelated/ExperienceTimeline.css'

export default function ExperienceTimeline({
    experience,
}: {
    experience: PortfolioData['experience']
}) {
    const [activeVideo, setActiveVideo] = useState<string | null>(null)

    const timelineRef = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({
        target: timelineRef,
        offset: ['start 65%', 'end 60%'],
    })
    const lineScale = useSpring(scrollYProgress, {
        stiffness: 120,
        damping: 30,
        mass: 0.4,
    })

    return (
        <>
            <div ref={timelineRef} className='experience-timeline'>
                <div className='experience-timeline-track' aria-hidden />
                <motion.div
                    className='experience-timeline-progress'
                    style={{ scaleY: lineScale }}
                    aria-hidden
                />
                <ol className='experience-timeline-list'>
                    {experience.map((job) => (
                        <Reveal
                            as='li'
                            key={`${job.company}-${job.startDate}`}
                            className='experience-timeline-item'
                        >
                            <span
                                className='experience-timeline-dot'
                                aria-hidden
                            />
                            <div className='experience-timeline-header'>
                                <h3 className='experience-timeline-position'>
                                    {job.position}
                                </h3>
                                <p className='experience-timeline-dates'>
                                    {formatDate(job.startDate)} –{' '}
                                    {formatDate(job.endDate)}
                                </p>
                            </div>
                            <p className='experience-timeline-meta'>
                                <span className='experience-timeline-company'>
                                    {job.company}
                                </span>
                                <span>{job.type}</span>
                                <span>{job.location}</span>
                            </p>
                            {job.demoVideo && (
                                <button
                                    type='button'
                                    onClick={() =>
                                        setActiveVideo(job.demoVideo!)
                                    }
                                    className='experience-timeline-demo'
                                >
                                    <Video size={14} aria-hidden />
                                    Watch demo
                                </button>
                            )}
                            <ul className='experience-timeline-bullets'>
                                {job.description.map((line) => (
                                    <li key={line}>{line}</li>
                                ))}
                            </ul>
                        </Reveal>
                    ))}
                </ol>
            </div>

            <DemoVideoModal
                src={activeVideo}
                onCloseAction={() => setActiveVideo(null)}
            />
        </>
    )
}

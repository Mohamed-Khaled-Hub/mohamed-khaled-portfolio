// Components
import Reveal from '@/src/components/UiRelated/Reveal'
import DemoButton from '@/src/components/VideoRelated/DemoButton'
import TimelineProgress from '@/src/components/UiRelated/TimelineProgress'
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
    return (
        <div className='experience-timeline'>
            <TimelineProgress />
            <ol className='experience-timeline-list'>
                {experience.map((job) => {
                    const jobKey = `${job.company}-${job.startDate}`

                    return (
                        <Reveal
                            as='li'
                            key={jobKey}
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
                                <DemoButton src={job.demoVideo} />
                            )}
                            <ul className='experience-timeline-bullets'>
                                {job.description.map((line, index) => (
                                    <li key={`${jobKey}-${index}`}>{line}</li>
                                ))}
                            </ul>
                        </Reveal>
                    )
                })}
            </ol>
        </div>
    )
}

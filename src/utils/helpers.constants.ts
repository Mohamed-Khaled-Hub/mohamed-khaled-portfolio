// Types
import { Section, Shortcut } from '@/src/types/ui.types'

export const MONTHS = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
]

export const LINK_LABELS: Record<string, string> = {
    liveDemo: 'Live demo',
    github: 'Source code',
    githubFrontend: 'Frontend code',
    githubBackend: 'Backend code',
}

export const SKILL_LABELS: Record<string, string> = {
    languages: 'Languages',
    frontEnd: 'Frontend',
    backEnd: 'Backend',
    databases: 'Databases',
    cloudAndDevOps: 'Cloud and DevOps',
    testingAndQA: 'Testing and QA',
    practices: 'Practices',
    security: 'Security',
    ai: 'AI',
    professional: 'Professional',
}

export const SECTIONS: Section[] = [
    { id: 'about', label: 'About' },
    { id: 'education', label: 'Education' },
    { id: 'good-to-know', label: 'Good to know' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Projects' },
    { id: 'skills', label: 'Skills' },
]

export const SHORTCUTS: Shortcut[] = [
    { keys: ['Space', 'K'], label: 'Play / pause' },
    { keys: ['←', 'J'], label: 'Back 10s' },
    { keys: ['→', 'L'], label: 'Forward 10s' },
    { keys: ['↑'], label: 'Volume up' },
    { keys: ['↓'], label: 'Volume down' },
    { keys: ['M'], label: 'Mute / unmute' },
    { keys: ['F'], label: 'Fullscreen' },
    { keys: ['0', '–', '9'], label: 'Jump to 0%–90%' },
]

export const RATES = [0.5, 1, 1.25, 1.5, 2]

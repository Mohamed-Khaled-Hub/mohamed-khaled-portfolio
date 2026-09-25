// Core
import { stagger, Variants } from 'framer-motion'
// Constants
import { SECTIONS } from '@/src/utils/helpers.constants'

export const heroContainer: Variants = {
    hidden: {},
    show: {
        transition: {
            delayChildren: stagger(0.09, { startDelay: 0.05 }),
        },
    },
}

export const heroItem: Variants = {
    hidden: { opacity: 0, y: 24 },
    show: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
}

export const heroItemReduced: Variants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { duration: 0.4 } },
}

export const heroMedia: Variants = {
    hidden: { opacity: 0, x: 48, scale: 0.94 },
    show: {
        opacity: 1,
        x: 0,
        scale: 1,
        transition: { duration: 1, ease: [0.22, 1, 0.36, 1] },
    },
}

export const heroMediaReduced: Variants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { duration: 0.6 } },
}

export const sectionNavList: Variants = {
    hidden: { opacity: 0, scale: 0.95, y: 8 },
    visible: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: {
            duration: 0.2,
            ease: [0.33, 1, 0.68, 1],
        },
    },
    exit: {
        opacity: 0,
        scale: 0.95,
        y: 8,
        transition: {
            duration: 0.15,
            ease: [0.33, 1, 0.68, 1],
        },
    },
}

export const sectionNavItem: Variants = {
    hidden: { opacity: 0, y: 6 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: {
            delay: i * 0.04,
            duration: 0.2,
            ease: [0.33, 1, 0.68, 1],
        },
    }),
    exit: (i: number) => ({
        opacity: 0,
        y: 4,
        transition: {
            delay: (SECTIONS.length - 1 - i) * 0.02,
            duration: 0.1,
        },
    }),
}

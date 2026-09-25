// Core
import type { Metadata } from 'next'
// Components
import GradientBgAnimation from '@/src/components/UiRelated/GradientBgAnimation'
// Fonts
import { mainFont } from '@/src/fonts/fonts'
// Providers
import PortfolioProvider from '@/src/providers/PortfolioProvider'
// Style
import '@/src/styles/globals.css'

// Metadata
export const metadata: Metadata = {
    title: 'Mohamed Khaled | Full Stack Developer & Software Engineer',
    description:
        'Full Stack Developer and Software Engineer specializing in Next.js, React, NestJS, TypeScript, and scalable web architectures. Explore my portfolio, projects, and backend systems.',
    keywords: [
        'Mohamed Khaled',
        'Full Stack Developer',
        'Software Engineer',
        'Next.js Portfolio',
        'React Developer',
        'NestJS',
        'TypeScript',
        'Node.js',
        'MongoDB',
        'Web Development',
    ],
    authors: [{ name: 'Mohamed Khaled' }],
    creator: 'Mohamed Khaled',
    openGraph: {
        title: 'Mohamed Khaled | Full Stack Developer & Software Engineer',
        description:
            'Full Stack Developer specializing in Next.js, NestJS, TypeScript, and AI-driven web applications.',
        url: 'https://mohamed-khaled-portfolio-eta.vercel.app/',
        siteName: 'Mohamed Khaled Portfolio',
        locale: 'en_US',
        type: 'website',
    },
}

export default function RootLayout({ children }: LayoutProps<'/'>) {
    return (
        <html lang='en' className={`${mainFont.className}`}>
            <body>
                <GradientBgAnimation>
                    <PortfolioProvider>{children}</PortfolioProvider>
                </GradientBgAnimation>
            </body>
        </html>
    )
}

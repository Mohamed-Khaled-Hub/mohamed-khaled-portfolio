// Core
import type { Metadata, Viewport } from 'next'
// Components
import GradientBgAnimation from '@/src/components/UiRelated/GradientBgAnimation'
// Fonts
import { mainFont } from '@/src/fonts/fonts'
// Style
import '@/src/styles/globals.css'

// Vercel URL
const SITE_URL = 'https://mohamed-khaled-portfolio-eta.vercel.app'

// Website Theme
export const viewport: Viewport = {
    themeColor: '#09090b',
    colorScheme: 'dark',
}

// Website Metadata
export const metadata: Metadata = {
    metadataBase: new URL(SITE_URL),
    alternates: { canonical: '/' },
    title: 'Mohamed Khaled | Full Stack Developer & Software Engineer',
    description:
        'Full Stack Developer and Software Engineer specializing in Next.js, React, NestJS, TypeScript, and scalable web architectures. Explore my portfolio, projects, and backend systems.',
    authors: [{ name: 'Mohamed Khaled' }],
    creator: 'Mohamed Khaled',
    openGraph: {
        title: 'Mohamed Khaled | Full Stack Developer & Software Engineer',
        description:
            'Full Stack Developer specializing in Next.js, NestJS, TypeScript, and AI-driven web applications.',
        url: '/',
        siteName: 'Mohamed Khaled Portfolio',
        locale: 'en_US',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Mohamed Khaled | Full Stack Developer & Software Engineer',
        description:
            'Full Stack Developer specializing in Next.js, NestJS, TypeScript, and AI-driven web applications.',
    },
}

export default function RootLayout({ children }: LayoutProps<'/'>) {
    return (
        <html lang='en' className={mainFont.className}>
            <body>
                <GradientBgAnimation>{children}</GradientBgAnimation>
            </body>
        </html>
    )
}

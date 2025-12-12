import type { Metadata } from 'next'

export const metadata: Metadata = {
    metadataBase: new URL('https://hsa-portal.com'),
    title: {
        default: 'Home Science Association | School Management System',
        template: '%s | HSA Portal'
    },
    description: 'Modern school management system for Home Science Association. Manage students, teachers, attendance, grades, and more with our comprehensive platform.',
    keywords: ['school management', 'student portal', 'education system', 'HSA', 'Home Science Association', 'attendance tracking', 'grade management'],
    authors: [{ name: 'Home Science Association' }],
    creator: 'HSA Portal Team',
    publisher: 'Home Science Association',
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
    openGraph: {
        type: 'website',
        locale: 'en_NG',
        url: 'https://hsa-portal.com',
        title: 'Home Science Association | School Management System',
        description: 'Modern school management system for Home Science Association',
        siteName: 'HSA Portal',
        images: [
            {
                url: '/images/og-image.png',
                width: 1200,
                height: 630,
                alt: 'HSA Portal - School Management System',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Home Science Association | School Management System',
        description: 'Modern school management system for Home Science Association',
        images: ['/images/og-image.png'],
        creator: '@HSAPortal',
    },
    verification: {
        google: 'google-site-verification-code',
    },
    alternates: {
        canonical: 'https://hsa-portal.com',
    },
}

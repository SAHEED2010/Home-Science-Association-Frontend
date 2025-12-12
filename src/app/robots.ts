import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: ['/admin/', '/teacher/', '/student/', '/parent/', '/api/'],
            },
        ],
        sitemap: 'https://hsa-portal.com/sitemap.xml',
    }
}

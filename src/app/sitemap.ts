import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://jobbridge.app'
    const lastModified = new Date('2026-06-22')

    return [
        {
            url: baseUrl,
            lastModified,
            changeFrequency: 'weekly',
            priority: 1.0,
        },
        {
            url: `${baseUrl}/impressum`,
            lastModified,
            changeFrequency: 'yearly',
            priority: 0.2,
        },
        {
            url: `${baseUrl}/datenschutz`,
            lastModified,
            changeFrequency: 'yearly',
            priority: 0.2,
        },
    ]
}

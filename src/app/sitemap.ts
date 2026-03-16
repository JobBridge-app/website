import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://www.jobbridge.app'

    return [
        {
            url: baseUrl,
            lastModified: new Date('2026-03-16'),
            changeFrequency: 'weekly',
            priority: 1.0,
        },
    ]
}

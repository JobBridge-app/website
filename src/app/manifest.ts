import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'JobBridge – Sichere Taschengeldjobs',
        short_name: 'JobBridge',
        description: 'Die sichere Plattform für Taschengeldjobs. Jugendliche finden faire Aufgaben, Eltern behalten den Überblick, Auftraggeber erhalten geprüfte Unterstützung.',
        start_url: '/',
        display: 'standalone',
        background_color: '#02040b',
        theme_color: '#02040b',
        icons: [
            {
                src: '/favicon.ico',
                sizes: '32x32',
                type: 'image/x-icon',
            },
        ],
    }
}

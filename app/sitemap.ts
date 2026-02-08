import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://mivn.online'
    const lastModified = new Date()

    const routes = [
        '',
        '/cultos',
        '/ministerios',
        '/eventos',
        '/devocionales',
        '/grupos',
        '/recursos',
        '/sobre-nosotros',
        '/contacto',
        '/soporte',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified,
        changeFrequency: 'weekly' as const,
        priority: route === '' ? 1 : 0.8,
    }))

    return routes
}

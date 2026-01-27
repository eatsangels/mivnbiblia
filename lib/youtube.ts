/**
 * YouTube Data API v3 Integration
 * Handles fetching live streams and videos from a YouTube channel
 */

const YOUTUBE_API_BASE = 'https://www.googleapis.com/youtube/v3';

export interface YouTubeVideo {
    videoId: string;
    title: string;
    description: string;
    thumbnailUrl: string;
    publishedAt: string;
    duration: string;
    isLive: boolean;
    viewCount: number;
    scheduledStartTime?: string;
}

export interface YouTubeLiveStream {
    videoId: string;
    title: string;
    description: string;
    thumbnailUrl: string;
    scheduledStartTime?: string;
    actualStartTime?: string;
    concurrentViewers?: number;
    publishedAt?: string;
}

/**
 * Check if the channel is currently live streaming
 */
// Mock Data for Fallback
const MOCK_LIVE_STREAM: YouTubeLiveStream = {
    videoId: "mock-live",
    title: "Servicio Dominical: La Fe que Mueve Montañas",
    description: "Únete a nosotros para adorar y escuchar la palabra de Dios.",
    thumbnailUrl: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?q=80&w=2070&auto=format&fit=crop",
    scheduledStartTime: new Date(Date.now() + 3600000).toISOString(), // 1 hour from now
    concurrentViewers: 1250
};

const MOCK_VIDEOS: YouTubeVideo[] = [
    {
        videoId: "mock-1",
        title: "Serie: Fundamentos de la Fe - Parte 1",
        description: "Primera parte de nuestra serie sobre los fundamentos de la vida cristiana.",
        thumbnailUrl: "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?q=80&w=2073&auto=format&fit=crop",
        publishedAt: new Date(Date.now() - 86400000 * 2).toISOString(),
        duration: "1:15:30",
        isLive: false,
        viewCount: 3420
    },
    {
        videoId: "mock-2",
        title: "Noche de Adoración y Alabanza",
        description: "Un tiempo especial de adoración con nuestro equipo de alabanza.",
        thumbnailUrl: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=2070&auto=format&fit=crop",
        publishedAt: new Date(Date.now() - 86400000 * 5).toISOString(),
        duration: "0:45:15",
        isLive: false,
        viewCount: 1250
    },
    {
        videoId: "mock-3",
        title: "Estudio Bíblico: El libro de Romanos",
        description: "Profundizando en el capítulo 8 de Romanos.",
        thumbnailUrl: "https://images.unsplash.com/photo-1504052434569-70ad5836ab65?q=80&w=2070&auto=format&fit=crop",
        publishedAt: new Date(Date.now() - 86400000 * 7).toISOString(),
        duration: "0:58:20",
        isLive: false,
        viewCount: 980
    }
];

export async function getChannelLiveStreams(): Promise<YouTubeLiveStream | null> {
    const apiKey = process.env.YOUTUBE_API_KEY;
    const channelId = process.env.YOUTUBE_CHANNEL_ID;

    // Return mock data if credentials are missing
    if (!apiKey || !channelId) {
        console.warn('YouTube API credentials not configured, using mock data');
        return null; // Functionally correct to return null here, or mock if we want to test live UI
    }

    try {
        const searchUrl = `${YOUTUBE_API_BASE}/search?part=snippet&channelId=${channelId}&eventType=live&type=video&key=${apiKey}`;
        const searchResponse = await fetch(searchUrl, { next: { revalidate: 60 } });

        if (!searchResponse.ok) {
            console.warn('YouTube Live API Error:', searchResponse.statusText);
            return null;
        }

        const searchData = await searchResponse.json();

        if (searchData.items && searchData.items.length > 0) {
            const liveVideo = searchData.items[0];
            const videoId = liveVideo.id.videoId;
            const detailsUrl = `${YOUTUBE_API_BASE}/videos?part=snippet,liveStreamingDetails,statistics&id=${videoId}&key=${apiKey}`;
            const detailsResponse = await fetch(detailsUrl, { next: { revalidate: 60 } });

            if (!detailsResponse.ok) return null;

            const detailsData = await detailsResponse.json();

            if (detailsData.items && detailsData.items.length > 0) {
                const videoDetails = detailsData.items[0];
                return {
                    videoId,
                    title: videoDetails.snippet.title,
                    description: videoDetails.snippet.description,
                    thumbnailUrl: videoDetails.snippet.thumbnails.high?.url || videoDetails.snippet.thumbnails.default.url,
                    scheduledStartTime: videoDetails.liveStreamingDetails?.scheduledStartTime,
                    actualStartTime: videoDetails.liveStreamingDetails?.actualStartTime,
                    concurrentViewers: parseInt(videoDetails.liveStreamingDetails?.concurrentViewers || '0')
                };
            }
        }
        return null;
    } catch (error) {
        console.error('Error fetching live streams:', error);
        return null;
    }
}

export async function getChannelVideos(maxResults: number = 12): Promise<YouTubeVideo[]> {
    const apiKey = process.env.YOUTUBE_API_KEY;
    const channelId = process.env.YOUTUBE_CHANNEL_ID;

    if (!apiKey || !channelId) {
        console.warn('YouTube API credentials not configured, returning mock videos');
        return MOCK_VIDEOS;
    }

    try {
        const searchUrl = `${YOUTUBE_API_BASE}/search?part=snippet&channelId=${channelId}&order=date&type=video&maxResults=${maxResults}&key=${apiKey}`;
        const searchResponse = await fetch(searchUrl, { next: { revalidate: 3600 } }); // Increased cache to 1 hour to save quota

        if (!searchResponse.ok) {
            const errorData = await searchResponse.json().catch(() => ({}));

            // Log specific error but return mock data so UI doesn't break
            console.warn('YouTube API Error (likely quota exceeded or missing key):', {
                status: searchResponse.status,
                message: errorData.error?.message || searchResponse.statusText
            });

            return MOCK_VIDEOS;
        }

        const searchData = await searchResponse.json();

        if (!searchData.items || searchData.items.length === 0) {
            return [];
        }

        const videoIds = searchData.items.map((item: any) => item.id.videoId).join(',');
        const detailsUrl = `${YOUTUBE_API_BASE}/videos?part=snippet,contentDetails,statistics&id=${videoIds}&key=${apiKey}`;
        const detailsResponse = await fetch(detailsUrl, { next: { revalidate: 3600 } });

        if (!detailsResponse.ok) return MOCK_VIDEOS;

        const detailsData = await detailsResponse.json();

        if (!detailsData.items) return MOCK_VIDEOS;

        return detailsData.items.map((video: any) => ({
            videoId: video.id,
            title: video.snippet.title,
            description: video.snippet.description,
            thumbnailUrl: video.snippet.thumbnails.high?.url || video.snippet.thumbnails.default.url,
            publishedAt: video.snippet.publishedAt,
            duration: video.contentDetails.duration,
            isLive: video.snippet.liveBroadcastContent === 'live',
            viewCount: parseInt(video.statistics.viewCount || '0')
        }));
    } catch (error) {
        console.error('Error fetching channel videos, using fallback:', error);
        return MOCK_VIDEOS;
    }
}

/**
 * Parse ISO 8601 duration to human-readable format
 * Example: PT1H2M10S -> "1:02:10"
 */
export function parseDuration(isoDuration: string): string {
    const match = isoDuration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
    if (!match) return '0:00';

    const hours = parseInt(match[1] || '0');
    const minutes = parseInt(match[2] || '0');
    const seconds = parseInt(match[3] || '0');

    if (hours > 0) {
        return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

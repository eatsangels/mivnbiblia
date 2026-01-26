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
export async function getChannelLiveStreams(): Promise<YouTubeLiveStream | null> {
    const apiKey = process.env.YOUTUBE_API_KEY;
    const channelId = process.env.YOUTUBE_CHANNEL_ID;

    if (!apiKey || !channelId) {
        console.warn('YouTube API credentials not configured');
        return null;
    }

    try {
        // Search for live broadcasts
        const searchUrl = `${YOUTUBE_API_BASE}/search?part=snippet&channelId=${channelId}&eventType=live&type=video&key=${apiKey}`;
        const searchResponse = await fetch(searchUrl, { next: { revalidate: 60 } }); // Cache for 1 minute

        if (!searchResponse.ok) {
            const errorData = await searchResponse.json().catch(() => ({}));
            console.error('YouTube Live API Error:', {
                status: searchResponse.status,
                statusText: searchResponse.statusText,
                error: errorData,
                url: searchUrl.replace(apiKey, 'HIDDEN')
            });
            // Don't throw, just return null to allow page to load
            return null;
        }

        const searchData = await searchResponse.json();

        if (searchData.items && searchData.items.length > 0) {
            const liveVideo = searchData.items[0];

            // Get additional details about the live stream
            const videoId = liveVideo.id.videoId;
            const detailsUrl = `${YOUTUBE_API_BASE}/videos?part=snippet,liveStreamingDetails,statistics&id=${videoId}&key=${apiKey}`;
            const detailsResponse = await fetch(detailsUrl, { next: { revalidate: 60 } });
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

/**
 * Get recent videos from the channel
 */
export async function getChannelVideos(maxResults: number = 12): Promise<YouTubeVideo[]> {
    const apiKey = process.env.YOUTUBE_API_KEY;
    const channelId = process.env.YOUTUBE_CHANNEL_ID;

    if (!apiKey || !channelId) {
        console.warn('YouTube API credentials not configured');
        return [];
    }

    try {
        // Get recent uploads
        const searchUrl = `${YOUTUBE_API_BASE}/search?part=snippet&channelId=${channelId}&order=date&type=video&maxResults=${maxResults}&key=${apiKey}`;
        const searchResponse = await fetch(searchUrl, { next: { revalidate: 0 } }); // No cache for testing

        if (!searchResponse.ok) {
            const errorData = await searchResponse.json().catch(() => ({}));
            console.error('YouTube Videos API Error:', {
                status: searchResponse.status,
                statusText: searchResponse.statusText,
                error: errorData,
                url: searchUrl.replace(apiKey, 'HIDDEN')
            });
            // Don't throw, just return empty array to allow page to load
            return [];
        }

        const searchData = await searchResponse.json();

        if (!searchData.items || searchData.items.length === 0) {
            return [];
        }

        // Get video IDs
        const videoIds = searchData.items.map((item: any) => item.id.videoId).join(',');

        // Get detailed info for all videos
        const detailsUrl = `${YOUTUBE_API_BASE}/videos?part=snippet,contentDetails,statistics&id=${videoIds}&key=${apiKey}`;
        const detailsResponse = await fetch(detailsUrl, { next: { revalidate: 3600 } });
        const detailsData = await detailsResponse.json();

        if (!detailsData.items) {
            return [];
        }

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
        console.error('Error fetching channel videos:', error);
        return [];
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

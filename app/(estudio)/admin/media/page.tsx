import { MediaManager } from "@/components/admin/MediaManager";
import { getChannelVideos } from "@/lib/youtube";

export const revalidate = 60; // Revalidate every 60 seconds

export default async function MediaPage() {
    // Fetch real YouTube videos
    const videos = await getChannelVideos(50); // Get up to 50 videos

    return <MediaManager videos={videos} />;
}

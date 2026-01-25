import { LiveStream } from "@/components/website/LiveStream";
import { PastServices } from "@/components/website/PastServices";
import { getChannelLiveStreams, getChannelVideos } from "@/lib/youtube";

export const revalidate = 60; // Revalidate every 60 seconds

export default async function Page() {
    // Fetch live stream and recent videos in parallel
    const [liveStream, videos] = await Promise.all([
        getChannelLiveStreams(),
        getChannelVideos(12)
    ]);

    // Get the most recent video (latest stream/upload)
    const latestVideo = videos[0] || null;

    return (
        <>
            <LiveStream liveStream={liveStream} latestVideo={latestVideo} />
            <PastServices videos={videos} />
        </>
    );
}

import { Cultos } from "@/components/website/Cultos";
import { getChannelLiveStreams, getChannelVideos } from "@/lib/youtube";

export const revalidate = 60; // Revalidate every 60 seconds

export default async function Page() {
    // Fetch live stream status and recent videos
    const [liveStream, videos] = await Promise.all([
        getChannelLiveStreams(),
        getChannelVideos(12)
    ]);

    return <Cultos liveStream={liveStream} videos={videos} />;
}

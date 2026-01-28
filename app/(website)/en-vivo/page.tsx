import { LiveStream } from "@/components/website/LiveStream";
import { PastServices } from "@/components/website/PastServices";
import { getChannelLiveStreams, getChannelVideos } from "@/lib/youtube";

import { getServiceSettings } from "@/app/(estudio)/admin/settings/actions";

export const revalidate = 60; // Revalidate every 60 seconds

export default async function Page() {
    // Fetch live stream, recent videos, and service settings in parallel
    const [liveStream, videos, serviceSettings] = await Promise.all([
        getChannelLiveStreams(),
        getChannelVideos(12),
        getServiceSettings()
    ]);

    // Get the most recent video (latest stream/upload)
    const latestVideo = videos[0] || null;

    return (
        <>
            <LiveStream liveStream={liveStream} latestVideo={latestVideo} serviceSettings={serviceSettings} />
            <PastServices videos={videos} />
        </>
    );
}

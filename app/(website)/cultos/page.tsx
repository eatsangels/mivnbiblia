import { Cultos } from "@/components/website/Cultos";
import { getChannelLiveStreams, getChannelVideos } from "@/lib/youtube";
import { getServiceSettings, getWeeklyActivities } from "@/app/(estudio)/admin/settings/actions";

export const revalidate = 60; // Revalidate every 60 seconds

export default async function Page() {
    // Fetch live stream status, recent videos, and site settings
    const [liveStream, videos, serviceSettings, weeklyActivities] = await Promise.all([
        getChannelLiveStreams(),
        getChannelVideos(12),
        getServiceSettings(),
        getWeeklyActivities()
    ]);

    return <Cultos liveStream={liveStream} videos={videos} serviceSettings={serviceSettings} weeklyActivities={weeklyActivities} />;
}

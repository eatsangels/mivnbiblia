import { Cultos } from "@/components/website/Cultos";
import { getChannelLiveStreams, getChannelVideos } from "@/lib/youtube";
import { getServiceSettings, getWeeklyActivities } from "@/app/(estudio)/admin/settings/actions";
import { getSiteSettings } from "@/lib/queries/settings";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: {
        absolute: "Cultos y Servicios | MIVN"
    },
    description: "Únete a nuestros cultos en vivo y servicios dominicales. Encuentra horarios, ubicación y mensajes recientes del Ministerio Internacional Vida Nueva.",
    openGraph: {
        title: "Cultos y Servicios | MIVN",
        description: "Participa en nuestros servicios y experimenta la presencia de Dios.",
        images: ["https://images.unsplash.com/photo-1515162305285-0293e4767cc2?auto=format&fit=crop&q=80&w=1200"],
    },
};

export const revalidate = 60; // Revalidate every 60 seconds

export default async function Page() {
    // Fetch live stream status, recent videos, and site settings
    const [liveStream, videos, serviceSettings, weeklyActivities, settings] = await Promise.all([
        getChannelLiveStreams(),
        getChannelVideos(12),
        getServiceSettings(),
        getWeeklyActivities(),
        getSiteSettings()
    ]);

    return <Cultos liveStream={liveStream} videos={videos} serviceSettings={serviceSettings} weeklyActivities={weeklyActivities} settings={settings} />;
}

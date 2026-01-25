import { getPrayerRequests } from "@/lib/queries/prayer-requests";
import { PrayerWall } from "@/components/website/PrayerWall";

export const dynamic = 'force-dynamic';

export default async function Page() {
    const requests = await getPrayerRequests();

    return <PrayerWall initialRequests={requests} />;
}

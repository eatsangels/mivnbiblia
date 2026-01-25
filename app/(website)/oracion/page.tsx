import { getPrayerRequests } from "@/lib/queries/prayer-requests";
import { PrayerWall } from "@/components/website/PrayerWall";

export const dynamic = 'force-dynamic';

export default async function Page({
    searchParams,
}: {
    searchParams: { page?: string };
}) {
    const page = Number(searchParams?.page) || 1;
    const { data: requests, meta } = await getPrayerRequests(page);

    return (
        <PrayerWall
            initialRequests={requests}
            pagination={meta}
        />
    );
}

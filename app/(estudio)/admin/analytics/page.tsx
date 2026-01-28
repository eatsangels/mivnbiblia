import { SpiritualAnalytics } from "@/components/admin/SpiritualAnalytics";
import { getAnalyticsSummary, getMinistryStats, getSpiritualFunnel, getGroupHealthStats, getGrowthAndAttendanceStats } from "./actions";

export default async function AnalyticsPage() {
    const summary = await getAnalyticsSummary();
    const ministryStats = await getMinistryStats();
    const funnel = await getSpiritualFunnel();
    const groupHealth = await getGroupHealthStats();
    const growthStats = await getGrowthAndAttendanceStats();

    return <SpiritualAnalytics
        summary={summary}
        ministryStats={ministryStats}
        funnel={funnel}
        groupHealth={groupHealth}
        growthAndAttendance={growthStats}
    />;
}

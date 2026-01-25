import { AdminDashboard } from "@/components/admin/AdminDashboard";
import { getDashboardStats, getAgendaEvents, getPendingTestimonies, getRecentActivity } from "@/lib/queries/dashboard";

export default async function AdminDashboardPage() {
    // Fetch all dashboard data from Supabase
    const stats = await getDashboardStats();
    const agenda = await getAgendaEvents();
    const pendingTestimonies = await getPendingTestimonies();
    const activity = await getRecentActivity();

    return (
        <AdminDashboard
            stats={stats}
            agenda={agenda}
            pendingTestimonies={pendingTestimonies}
            activity={activity}
        />
    );
}

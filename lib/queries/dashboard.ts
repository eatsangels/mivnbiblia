import { createClient } from "@/lib/supabase/server";

/**
 * Get core dashboard stats
 */
export async function getDashboardStats() {
    const supabase = await createClient();

    // 1. Total Members
    const { count: membersCount } = await supabase
        .from("profiles")
        .select("*", { count: 'exact', head: true });

    // 2. Upcoming Events
    const { count: eventsCount } = await supabase
        .from("events")
        .select("*", { count: 'exact', head: true })
        .gte("event_date", new Date().toISOString());

    // 3. Pending Testimonies (to match "Aprobación de Testimonios")
    const { count: pendingTestimonies } = await supabase
        .from("testimonies")
        .select("*", { count: 'exact', head: true })
        .eq("is_approved", false);

    // 4. Monthly Donations (Sum)
    const firstDayOfMonth = new Date();
    firstDayOfMonth.setDate(1);
    firstDayOfMonth.setHours(0, 0, 0, 0);

    const { data: donations } = await supabase
        .from("donations")
        .select("amount")
        .gte("created_at", firstDayOfMonth.toISOString());

    const totalDonations = donations?.reduce((sum, d) => sum + (d.amount || 0), 0) || 0;

    return {
        membersCount: membersCount || 0,
        eventsCount: eventsCount || 0,
        pendingTestimonies: pendingTestimonies || 0,
        totalDonations: totalDonations
    };
}

/**
 * Get recent activity logs (from various tables)
 */
export async function getRecentActivity() {
    const supabase = await createClient();

    // This is a simplified version, ideally you'd have an activity_log table
    // For now, let's just get the latest entries from profiles, events, and testimonies

    const { data: newMembers } = await supabase
        .from("profiles")
        .select("full_name, updated_at")
        .order("updated_at", { ascending: false })
        .limit(3);

    const { data: newTestimonies } = await supabase
        .from("testimonies")
        .select("author_name, created_at")
        .order("created_at", { ascending: false })
        .limit(3);

    return {
        newMembers: newMembers || [],
        newTestimonies: newTestimonies || []
    };
}

/**
 * Get upcoming agenda events
 */
export async function getAgendaEvents() {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from("events")
        .select("*")
        .gte("event_date", new Date().toISOString())
        .order("event_date", { ascending: true })
        .limit(5);

    if (error) throw error;
    return data;
}

/**
 * Get pending testimonies for the checklist
 */
export async function getPendingTestimonies() {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from("testimonies")
        .select("*")
        .eq("is_approved", false)
        .order("created_at", { ascending: false })
        .limit(5);

    if (error) throw error;
    return data;
}

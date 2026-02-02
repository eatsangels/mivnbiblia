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

    const totalDonations = (donations as any[])?.reduce((sum, d) => sum + (d.amount || 0), 0) || 0;

    return {
        membersCount: membersCount || 0,
        eventsCount: eventsCount || 0,
        pendingTestimonies: pendingTestimonies || 0,
        totalDonations: totalDonations
    };
}

/**
 * Get recent activity logs (from various tables) with pagination
 */
export async function getRecentActivity(page: number = 1, limit: number = 10) {
    const supabase = await createClient();
    const offset = (page - 1) * limit;

    // Fetch latest entries from multiple tables in parallel
    // We fetch 'limit' from each to ensure we have enough even after merging and sorting
    const [
        { data: members },
        { data: testimonies },
        { data: registrations },
        { data: donations },
        { data: groupJoins },
        { data: prayers }
    ] = await Promise.all([
        supabase.from("profiles").select("id, full_name, created_at").order("created_at", { ascending: false }).range(offset, offset + limit - 1),
        supabase.from("testimonies").select("id, author_name, full_name, created_at").order("created_at", { ascending: false }).range(offset, offset + limit - 1),
        supabase.from("event_registrations").select("id, full_name, created_at, events(title)").order("created_at", { ascending: false }).range(offset, offset + limit - 1),
        supabase.from("donations").select("id, donor_name, amount, created_at").order("created_at", { ascending: false }).range(offset, offset + limit - 1),
        supabase.from("group_members").select("id, created_at, profiles(full_name), small_groups(name)").order("created_at", { ascending: false }).range(offset, offset + limit - 1),
        supabase.from("prayer_requests").select("id, requester_name, created_at").order("created_at", { ascending: false }).range(offset, offset + limit - 1)
    ]);

    // Normalize and combine
    const activities: any[] = [
        ...(members || []).map(m => ({
            id: m.id,
            type: 'member',
            user: m.full_name || 'Nuevo Miembro',
            action: 'se unió al ministerio',
            date: m.created_at
        })),
        ...(testimonies || []).map(t => ({
            id: t.id,
            type: 'testimony',
            user: t.full_name || t.author_name || 'Anónimo',
            action: 'envió un testimonio',
            date: t.created_at
        })),
        ...(registrations || []).map((r: any) => ({
            id: r.id,
            type: 'event',
            user: r.full_name,
            action: `se registró en ${r.events?.title || 'un evento'}`,
            date: r.created_at
        })),
        ...(donations || []).map(d => ({
            id: d.id,
            type: 'donation',
            user: d.donor_name || 'Anónimo',
            action: `realizó una donación de $${d.amount}`,
            date: d.created_at
        })),
        ...(groupJoins || []).map((g: any) => ({
            id: g.id,
            type: 'group',
            user: g.profiles?.full_name || 'Usuario',
            action: `solicitó unirse a ${g.small_groups?.name || 'un grupo'}`,
            date: g.created_at
        })),
        ...(prayers || []).map(p => ({
            id: p.id,
            type: 'prayer',
            user: p.requester_name || 'Anónimo',
            action: 'envió una petición de oración',
            date: p.created_at
        }))
    ];

    // Sort by date descending and take top 'limit'
    return activities
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, limit);
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

"use server";

import { createClient } from "@/lib/supabase/server";

export async function getAnalyticsSummary() {
    const supabase = await createClient();

    // 1. Total Members
    const { count: totalMembers } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true });

    // 2. New Converts (e.g. users joined in last 30 days or specific milestone)
    // For now using new users in last 30 days as proxy or specific Journey Step if populated
    // Checking "Primera Visita" or "Consolidación" step completions in last 30 days
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const { count: newConverts } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true })
        .gte('created_at', thirtyDaysAgo.toISOString());

    // 3. Baptisms (Look for 'Bautismo' step)
    const { data: baptismStep } = await supabase
        .from('spiritual_journey_steps')
        .select('id')
        .eq('name', 'Bautismo')
        .single() as { data: { id: string } | null };

    let baptismsCount = 0;
    if (baptismStep && baptismStep.id) { // Added check for baptismStep.id
        const { count } = await supabase
            .from('user_spiritual_journey')
            .select('*', { count: 'exact', head: true })
            .eq('step_id', baptismStep.id)
            .gte('completed_at', thirtyDaysAgo.toISOString());
        baptismsCount = count || 0;
    }

    // 4. Active Leaders
    // Profiles with role 'leader' or 'admin'
    // Or users who reached "Líder Activo" step
    const { count: activeLeaders } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true })
        .in('role', ['leader', 'admin', 'super_admin']);

    return {
        totalMembers: totalMembers || 0,
        newConverts: newConverts || 0,
        baptisms: baptismsCount,
        activeLeaders: activeLeaders || 0,
    };
}

export async function getMinistryStats() {
    const supabase = await createClient();

    // Get all ministries
    const { data: ministries } = await supabase
        .from('ministries')
        .select('id, name') as { data: Array<{ id: string; name: string }> | null };

    if (!ministries) return [];

    // Count members for each
    const ministryStats = await Promise.all(ministries.map(async (m) => {
        const { count } = await supabase
            .from('user_ministries')
            .select('*', { count: 'exact', head: true })
            .eq('ministry_id', m.id);

        return {
            name: m.name,
            value: count || 0
        };
    }));

    // Calculate percentages
    const total = ministryStats.reduce((acc, curr) => acc + curr.value, 0);
    return ministryStats.map(stat => ({
        ...stat,
        percentage: total > 0 ? Math.round((stat.value / total) * 100) : 0
    })).sort((a, b) => b.value - a.value);
}

export async function getSpiritualFunnel() {
    const supabase = await createClient();

    // Get all steps ordered
    const { data: steps } = await supabase
        .from('spiritual_journey_steps')
        .select('id, name, order_index')
        .order('order_index') as { data: Array<{ id: string; name: string; order_index: number }> | null };

    if (!steps) return [];

    const funnelData = await Promise.all(steps.map(async (step) => {
        const { count } = await supabase
            .from('user_spiritual_journey')
            .select('*', { count: 'exact', head: true })
            .eq('step_id', step.id);

        return {
            label: step.name,
            val: count || 0,
            id: step.id
        };
    }));

    return funnelData;
}

export interface DashboardStats {
    totalMembers: number;
    newConverts: number;
    baptisms: number;
    activeLeaders: number;
}

export async function getGroupHealthStats() {
    const supabase = await createClient();

    // Get active groups with their member count
    const { data: groups } = await supabase
        .from('small_groups')
        .select('id, name, leader:profiles(full_name), members_count, category')
        .eq('is_active', true)
        .limit(5) as { data: Array<{ id: string; name: string; leader: { full_name: string } | null; members_count: number; category: string }> | null };

    if (!groups) return [];

    // Transform to display format
    // In real app, we would calculate 'health' based on attendance vs members_count
    return groups.map(g => ({
        name: g.name,
        code: g.name.substring(0, 2).toUpperCase(),
        members: g.members_count,
        status: g.members_count > 10 ? 'Creciendo' : 'Estable', // Simplified logic
        health: g.members_count > 12 ? 3 : (g.members_count > 5 ? 2 : 1),
        leader: g.leader?.full_name || 'Sin líder'
    }));
}

export async function getGrowthAndAttendanceStats() {
    const supabase = await createClient();
    const months = 6;
    const now = new Date();
    const startDate = new Date(now.getFullYear(), now.getMonth() - months + 1, 1); // Start of 6 months ago

    // Initialize map for the last 6 months
    const statsMap = new Map<string, { month: string; growth: number; attendance: number }>();
    for (let i = 0; i < months; i++) {
        const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
        const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
        const monthName = d.toLocaleString('es-ES', { month: 'short' }).toUpperCase().replace('.', '');
        statsMap.set(key, { month: monthName, growth: 0, attendance: 0 });
    }

    // 1. Growth (New Profiles)
    const { data: newProfiles } = await supabase
        .from('profiles')
        .select('created_at')
        .gte('created_at', startDate.toISOString());

    if (newProfiles) {
        newProfiles.forEach(p => {
            if (!p.created_at) return;
            const d = new Date(p.created_at);
            const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
            if (statsMap.has(key)) {
                const stat = statsMap.get(key)!;
                stat.growth++;
            }
        });
    }

    // 2. Attendance (Group Attendance)
    const { data: attendance } = await supabase
        .from('group_attendance')
        .select('meeting_date, members_present_count, new_guests_count')
        .gte('meeting_date', startDate.toISOString());

    if (attendance) {
        attendance.forEach(a => {
            if (!a.meeting_date) return;
            const d = new Date(a.meeting_date);
            const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
            // If the record falls into next month's bucket created by timezone issues or edge cases, ignore or map correctly.
            // Using simple string key matching.
            if (statsMap.has(key)) {
                const stat = statsMap.get(key)!;
                stat.attendance += (a.members_present_count || 0) + (a.new_guests_count || 0);
            }
        });
    }

    // Convert map to array and reverse to show oldest first
    return Array.from(statsMap.values()).reverse();
}

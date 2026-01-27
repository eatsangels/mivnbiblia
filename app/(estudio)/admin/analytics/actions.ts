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
        .single();

    let baptismsCount = 0;
    if (baptismStep) {
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
        .select('id, name');

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
        .select('*')
        .order('order_index');

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

export async function getGroupHealthStats() {
    const supabase = await createClient();

    // Get active groups with their member count
    const { data: groups } = await supabase
        .from('small_groups')
        .select('id, name, leader, members_count, category')
        .eq('is_active', true)
        .limit(5);

    if (!groups) return [];

    // Transform to display format
    // In real app, we would calculate 'health' based on attendance vs members_count
    return groups.map(g => ({
        name: g.name,
        code: g.name.substring(0, 2).toUpperCase(),
        members: g.members_count,
        status: g.members_count > 10 ? 'Creciendo' : 'Estable', // Simplified logic
        health: g.members_count > 12 ? 3 : (g.members_count > 5 ? 2 : 1),
        leader: g.leader
    }));
}

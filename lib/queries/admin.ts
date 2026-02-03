import { createClient } from "@/lib/supabase/server";

/**
 * Get all members (profiles) with optional filtering
 */
export async function getMembers() {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .order("updated_at", { ascending: false });

    if (error) throw error;
    return data || [];
}

/**
 * Get all events with optional filtering
 */
import { unstable_noStore as noStore } from 'next/cache';

/**
 * Get all events with optional filtering
 */
export async function getEvents() {
    noStore();
    const supabase = await createClient();
    const { data, error } = await supabase
        .from("events")
        .select("*")
        .order("event_date", { ascending: true });

    if (error) throw error;
    return data || [];
}

/**
 * Get member stats for the manager
 */
export async function getMemberStats() {
    const supabase = await createClient();

    const { count: total } = await supabase
        .from("profiles")
        .select("*", { count: 'exact', head: true });

    const { count: leaders } = await supabase
        .from("profiles")
        .select("*", { count: 'exact', head: true })
        .eq("role", "leader");

    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const { count: newConverted } = await supabase
        .from("profiles")
        .select("*", { count: 'exact', head: true })
        .gte("created_at", thirtyDaysAgo.toISOString());

    return {
        total: total || 0,
        leaders: leaders || 0,
        newConverted: newConverted || 0
    };
}

/**
 * Get all donations
 */
export async function getDonations() {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from("donations")
        .select("*")
        .order("created_at", { ascending: false });

    if (error) throw error;
    return data || [];
}

/**
 * Get donation stats
 */
export async function getFinanceStats() {
    const supabase = await createClient();

    const { data: donations } = await supabase
        .from("donations")
        .select("amount");

    const total = (donations as any[])?.reduce((sum, d) => sum + (d.amount || 0), 0) || 0;

    return {
        total,
        monthlyTrend: "+5.2%",
        specialOfferings: Math.floor(total * 0.3),
        missionaryFund: Math.floor(total * 0.15)
    };
}

/**
 * Get all resources (for inventory)
 */
export async function getResources() {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from("resources")
        .select("*")
        .order("created_at", { ascending: false });

    if (error) throw error;
    return data || [];
}

/**
 * Get users assigned to a specific role
 */
export async function getUsersByRole(role: string) {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .contains("roles", [role])
        .order("first_name", { ascending: true });

    if (error) throw error;
    return data || [];
}

/**
 * Get a summary of all roles and their user counts
 */
export async function getRolesSummary() {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from("profiles")
        .select("role");

    if (error) throw error;

    const counts: Record<string, number> = {};
    (data as any[])?.forEach(p => {
        const roles = p.roles || ['member'];
        roles.forEach((r: string) => {
            counts[r] = (counts[r] || 0) + 1;
        });
    });

    return counts;
}

/**
 * Update a member's role
 */
export async function updateMemberRole(userId: string, role: string) {
    const supabase = await createClient();
    const { error } = await supabase
        .from("profiles")
        .update({ roles: [role], updated_at: new Date().toISOString() })
        .eq("id", userId);

    if (error) throw error;
    return true;
}

/**
 * Search for members by name or email
 */
export async function searchMembers(query: string) {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .or(`first_name.ilike.%${query}%,last_name.ilike.%${query}%,username.ilike.%${query}%`)
        .limit(10);

    if (error) throw error;
    return data || [];
}

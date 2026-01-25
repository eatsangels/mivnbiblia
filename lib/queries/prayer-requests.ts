import { createClient } from "@/lib/supabase/server";
import { cache } from "react";

export type PrayerRequest = {
    id: string;
    user_id: string | null;
    requester_name: string;
    email: string | null;
    request: string;
    is_anonymous: boolean;
    is_approved: boolean;
    is_answered: boolean;
    created_at: string;
    updated_at: string;
};

/**
 * Get all approved prayer requests (non-anonymous)
 */
export const getPrayerRequests = cache(async (limit?: number) => {
    const supabase = await createClient();
    let query = supabase
        .from("prayer_requests")
        .select("*")
        .eq("is_approved", true)
        .order("created_at", { ascending: false });

    if (limit) {
        query = query.limit(limit);
    }

    const { data, error } = await query;

    if (error) throw error;
    return data as PrayerRequest[];
});

/**
 * Get unanswered prayer requests
 */
export const getUnansweredPrayerRequests = cache(async (limit?: number) => {
    const supabase = await createClient();
    let query = supabase
        .from("prayer_requests")
        .select("*")
        .eq("is_approved", true)
        .eq("is_anonymous", false)
        .eq("is_answered", false)
        .order("created_at", { ascending: false });

    if (limit) {
        query = query.limit(limit);
    }

    const { data, error } = await query;

    if (error) throw error;
    return data as PrayerRequest[];
});

/**
 * Submit a new prayer request
 */
export async function submitPrayerRequest(data: {
    requester_name: string;
    email?: string;
    request: string;
    is_anonymous?: boolean;
}) {
    const supabase = await createClient();

    const { data: { user } } = await supabase.auth.getUser();

    const { error } = await supabase
        .from("prayer_requests")
        .insert({
            user_id: user?.id || null,
            requester_name: data.requester_name,
            email: data.email || null,
            request: data.request,
            is_anonymous: data.is_anonymous || false,
            is_approved: false, // Requires admin approval
        });

    if (error) throw error;
}

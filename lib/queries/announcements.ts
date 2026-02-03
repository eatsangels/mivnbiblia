import { createClient } from "@/lib/supabase/server";
import { cache } from "react";

export type Announcement = {
    id: string;
    message: string;
    target_audience: string; // 'Todos los miembros', etc.
    scheduled_for: string | null;
    expires_at: string | null;
    is_pinned: boolean;
    is_notified: boolean;
    created_by: string;
    created_at: string;
    views_count: number;
    profiles?: {
        first_name: string | null;
        last_name: string | null;
        avatar_url: string | null;
        roles: string[] | null;
    } | null;
};

/**
 * Get all pinned announcements (active)
 */
export const getPinnedAnnouncements = cache(async (limit = 3) => {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from("announcements")
        .select(`
            *,
            profiles:created_by (
                first_name,
                last_name,
                avatar_url,
                roles
            )
        `)
        .eq("is_pinned", true)
        .or(`expires_at.is.null,expires_at.gt.${new Date().toISOString()}`)
        .order("created_at", { ascending: false })
        .limit(limit);

    if (error) {
        console.error("Error fetching announcements:", error);
        return [];
    }

    return (data || []) as unknown as Announcement[];
});

/**
 * Get all active announcements
 */
export const getActiveAnnouncements = cache(async () => {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from("announcements")
        .select(`
            *,
            profiles:created_by (
                first_name,
                last_name,
                avatar_url,
                roles
            )
        `)
        .or(`expires_at.is.null,expires_at.gt.${new Date().toISOString()}`)
        .order("created_at", { ascending: false });

    if (error) throw error;
    return (data || []) as unknown as Announcement[];
});

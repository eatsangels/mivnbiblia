import { createClient } from "@/lib/supabase/server";
import { cache } from "react";

export type Announcement = {
    id: string;
    message: string;
    target_audience: string; // 'Todos los miembros', etc.
    scheduled_for: string | null;
    is_pinned: boolean;
    is_notified: boolean;
    created_by: string;
    created_at: string;
    views_count: number;
    profiles?: {
        full_name: string | null;
        avatar_url: string | null;
        role: string | null;
    } | null;
};

/**
 * Get pinned announcements for the home page
 */
export const getPinnedAnnouncements = cache(async (limit = 3) => {
    const supabase = await createClient();

    // We want announcements that are pinned, and either scheduled for now/past or null (immediate)
    const now = new Date().toISOString();

    const { data, error } = await supabase
        .from("announcements")
        .select(`
            *,
            profiles:created_by (
                full_name,
                avatar_url,
                role
            )
        `)
        .eq("is_pinned", true)
        // logic for scheduling could be complex, for now let's just get pinned ones
        // In a real scenario we might filter by scheduled_for <= now OR scheduled_for is null
        .order("created_at", { ascending: false })
        .limit(limit);

    if (error) {
        console.error("Error fetching announcements:", error);
        return [];
    }

    return data as Announcement[];
});

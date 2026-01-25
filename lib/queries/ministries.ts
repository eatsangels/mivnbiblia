import { createClient } from "@/lib/supabase/server";
import { cache } from "react";

export type Ministry = {
    id: string;
    name: string;
    slug: string;
    description: string;
    leader_name: string | null;
    leader_email: string | null;
    image: string | null;
    meeting_day: string | null;
    meeting_time: string | null;
    location: string | null;
    is_active: boolean;
    order: number | null;
    created_at: string;
    updated_at: string;
};

/**
 * Get all active ministries
 */
export const getMinistries = cache(async () => {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from("ministries")
        .select("*")
        .eq("is_active", true)
        .order("order", { ascending: true, nullsFirst: false });

    if (error) throw error;
    return data as Ministry[];
});

/**
 * Get all ministries for admin panel (including inactive)
 */
export const getAdminMinistries = cache(async () => {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from("ministries")
        .select("*")
        .order("order", { ascending: true, nullsFirst: false });

    if (error) throw error;
    return data as Ministry[];
});

/**
 * Get ministry by slug
 */
export const getMinistryBySlug = cache(async (slug: string) => {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from("ministries")
        .select("*")
        .eq("slug", slug)
        .eq("is_active", true)
        .single();

    if (error) throw error;
    return data as Ministry;
});

/**
 * Get ministry by ID
 */
export const getMinistryById = cache(async (id: string) => {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from("ministries")
        .select("*")
        .eq("id", id)
        .single();

    if (error) throw error;
    return data as Ministry;
});

import { createClient } from "@/lib/supabase/server";
import { cache } from "react";

export type Bulletin = {
    id: string;
    title: string;
    slug: string;
    content: string;
    pdf_url: string | null;
    publish_date: string;
    is_published: boolean;
    created_at: string;
    updated_at: string;
};

/**
 * Get all published bulletins
 */
export const getBulletins = cache(async (limit?: number) => {
    const supabase = await createClient();
    let query = supabase
        .from("bulletins")
        .select("*")
        .eq("is_published", true)
        .order("publish_date", { ascending: false });

    if (limit) {
        query = query.limit(limit);
    }

    const { data, error } = await query;

    if (error) throw error;
    return data as Bulletin[];
});

/**
 * Get latest bulletin
 */
export const getLatestBulletin = cache(async () => {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from("bulletins")
        .select("*")
        .eq("is_published", true)
        .order("publish_date", { ascending: false })
        .limit(1)
        .single();

    if (error && error.code !== 'PGRST116') throw error;
    return data as Bulletin | null;
});

/**
 * Get bulletin by slug
 */
export const getBulletinBySlug = cache(async (slug: string) => {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from("bulletins")
        .select("*")
        .eq("slug", slug)
        .eq("is_published", true)
        .single();

    if (error) throw error;
    return data as Bulletin;
});

/**
 * Get bulletin by ID
 */
export const getBulletinById = cache(async (id: string) => {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from("bulletins")
        .select("*")
        .eq("id", id)
        .single();

    if (error) throw error;
    return data as Bulletin;
});

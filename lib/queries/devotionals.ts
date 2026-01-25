import { createClient } from "@/lib/supabase/server";
import { cache } from "react";

export type Devotional = {
    id: string;
    title: string;
    slug: string;
    content: string;
    scripture_reference: string;
    author_name: string | null;
    publish_date: string;
    image: string | null;
    is_published: boolean;
    created_at: string;
    updated_at: string;
};

/**
 * Get all published devotionals
 */
export const getDevotionals = cache(async (limit?: number) => {
    const supabase = await createClient();
    let query = supabase
        .from("devotionals")
        .select("*")
        .eq("is_published", true)
        .order("publish_date", { ascending: false });

    if (limit) {
        query = query.limit(limit);
    }

    const { data, error } = await query;

    if (error) throw error;
    return (data || []) as unknown as Devotional[];
});

/**
 * Get today's devotional
 */
export const getTodayDevotional = cache(async () => {
    const supabase = await createClient();
    const today = new Date().toISOString().split('T')[0];

    const { data, error } = await supabase
        .from("devotionals")
        .select("*")
        .eq("is_published", true)
        .eq("publish_date", today)
        .single();

    if (error && error.code !== 'PGRST116') throw error; // PGRST116 = no rows
    return data as unknown as Devotional | null;
});

/**
 * Get devotional by slug
 */
export const getDevotionalBySlug = cache(async (slug: string) => {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from("devotionals")
        .select("*")
        .eq("slug", slug)
        .eq("is_published", true)
        .single();

    if (error) throw error;
    return data as unknown as Devotional;
});

/**
 * Get devotionals by date range
 */
export const getDevotionalsByDateRange = cache(async (startDate: string, endDate: string) => {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from("devotionals")
        .select("*")
        .eq("is_published", true)
        .gte("publish_date", startDate)
        .lte("publish_date", endDate)
        .order("publish_date", { ascending: false });

    if (error) throw error;
    return (data || []) as unknown as Devotional[];
});

/**
 * Get devotional by ID
 */
export const getDevotionalById = cache(async (id: string) => {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from("devotionals")
        .select("*")
        .eq("id", id)
        .single();

    if (error) throw error;
    return data as unknown as Devotional;
});

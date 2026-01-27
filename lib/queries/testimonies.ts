import { createClient } from "@/lib/supabase/server";
import { cache } from "react";

export type Testimony = {
    id: string;
    author_name: string;
    author_role: string | null;
    content: string;
    image: string | null;
    is_featured: boolean;
    is_approved: boolean;
    order: number | null;
    created_at: string;
    updated_at: string;
};

/**
 * Get all approved testimonies
 */
export const getTestimonies = cache(async (limit?: number) => {
    const supabase = await createClient();
    let query = supabase
        .from("testimonies")
        .select("*")
        .eq("is_approved", true)
        .order("order", { ascending: true, nullsFirst: false });

    if (limit) {
        query = query.limit(limit);
    }

    const { data, error } = await query;

    if (error) throw error;

    // Map database rows to Testimony interface
    return (data || []).map((row): Testimony => ({
        id: row.id,
        author_name: row.full_name,
        author_role: row.category, // testimonies table uses 'category' not 'role'
        content: row.content,
        image: row.avatar_url,
        is_featured: Boolean(row.featured), // testimonies uses 'featured' not 'is_active'
        is_approved: Boolean(row.is_approved),
        order: null,
        created_at: row.created_at || new Date().toISOString(),
        updated_at: row.updated_at || new Date().toISOString(),
    }));
});

/**
 * Get featured testimonies
 */
export const getFeaturedTestimonies = cache(async (limit: number = 3) => {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from("testimonies")
        .select("*")
        .eq("is_active", true)
        .limit(limit);

    if (error) throw error;

    // Map database rows to Testimony interface
    return (data || []).map((row): Testimony => ({
        id: row.id,
        author_name: row.full_name,
        author_role: row.category,
        content: row.content,
        image: row.avatar_url,
        is_featured: Boolean(row.featured),
        is_approved: Boolean(row.is_approved),
        order: null,
        created_at: row.created_at || new Date().toISOString(),
        updated_at: row.updated_at || new Date().toISOString(),
    }));
});

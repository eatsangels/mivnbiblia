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
    return data as Testimony[];
});

/**
 * Get featured testimonies
 */
export const getFeaturedTestimonies = cache(async (limit: number = 3) => {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from("testimonies")
        .select("*")
        .eq("is_approved", true)
        .eq("is_featured", true)
        .order("order", { ascending: true, nullsFirst: false })
        .limit(limit);

    if (error) throw error;
    return data as Testimony[];
});

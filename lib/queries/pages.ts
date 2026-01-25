import { createClient } from "@/lib/supabase/server";
import { cache } from "react";

export type Page = {
    id: string;
    slug: string;
    title: string;
    subtitle: string | null;
    content: string;
    meta_description: string | null;
    featured_image: string | null;
    is_published: boolean;
    order: number | null;
    created_at: string;
    updated_at: string;
};

/**
 * Get all published pages
 */
/**
 * Get all published pages
 */
export const getPages = cache(async () => {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from("pages")
        .select("*")
        .eq("is_published", true)
        .order("order", { ascending: true, nullsFirst: false });

    if (error) throw error;
    return (data || []) as unknown as Page[];
});

/**
 * Get all pages for admin panel (including draft)
 */
export const getAdminPages = cache(async () => {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from("pages")
        .select("*")
        .order("order", { ascending: true, nullsFirst: false });

    if (error) throw error;
    return (data || []) as unknown as Page[];
});

/**
 * Get a single page by slug
 */
export const getPageBySlug = cache(async (slug: string) => {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from("pages")
        .select("*")
        .eq("slug", slug)
        .eq("is_published", true)
        .single();

    if (error) throw error;
    return data as unknown as Page;
});

/**
 * Get page by ID
 */
export const getPageById = cache(async (id: string) => {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from("pages")
        .select("*")
        .eq("id", id)
        .single();

    if (error) throw error;
    return data as unknown as Page;
});

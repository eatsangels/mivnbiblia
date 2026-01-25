import { createClient } from "@/lib/supabase/server";
import { cache } from "react";

export type ResourceCategory = {
    id: string;
    name: string;
    slug: string;
    description: string | null;
    icon: string | null;
    order: number | null;
    created_at: string;
};

export type Resource = {
    id: string;
    category_id: string | null;
    title: string;
    slug: string;
    description: string;
    file_url: string | null;
    external_url: string | null;
    thumbnail: string | null;
    file_type: string | null;
    download_count: number;
    is_featured: boolean;
    is_published: boolean;
    created_at: string;
    updated_at: string;
};

/**
 * Get all resource categories
 */
export const getResourceCategories = cache(async () => {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from("resource_categories")
        .select("*")
        .order("order", { ascending: true, nullsFirst: false });

    if (error) throw error;
    return data as ResourceCategory[];
});

/**
 * Get all published resources
 */
export const getResources = cache(async () => {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from("resources")
        .select("*, category:resource_categories(*)")
        .eq("is_published", true)
        .order("created_at", { ascending: false });

    if (error) throw error;
    return data;
});

/**
 * Get resources by category
 */
export const getResourcesByCategory = cache(async (categorySlug: string) => {
    const supabase = await createClient();

    // First get category
    const { data: category, error: catError } = await supabase
        .from("resource_categories")
        .select("*")
        .eq("slug", categorySlug)
        .single();

    if (catError) throw catError;

    // Then get resources
    const { data, error } = await supabase
        .from("resources")
        .select("*")
        .eq("category_id", category.id)
        .eq("is_published", true)
        .order("created_at", { ascending: false });

    if (error) throw error;
    return data as Resource[];
});

/**
 * Get featured resources
 */
export const getFeaturedResources = cache(async (limit: number = 6) => {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from("resources")
        .select("*, category:resource_categories(*)")
        .eq("is_published", true)
        .eq("is_featured", true)
        .order("created_at", { ascending: false })
        .limit(limit);

    if (error) throw error;
    return data;
});

/**
 * Get resource by slug
 */
export const getResourceBySlug = cache(async (slug: string) => {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from("resources")
        .select("*, category:resource_categories(*)")
        .eq("slug", slug)
        .eq("is_published", true)
        .single();

    if (error) throw error;
    return data;
});

/**
 * Increment download count
 */
export async function incrementDownloadCount(resourceId: string) {
    const supabase = await createClient();
    const { error } = await supabase.rpc("increment_download_count", {
        resource_id: resourceId,
    });

    if (error) throw error;
}

/**
 * Get resource by ID
 */
export const getResourceById = cache(async (id: string) => {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from("resources")
        .select("*, category:resource_categories(*)")
        .eq("id", id)
        .single();

    if (error) throw error;
    return data;
});

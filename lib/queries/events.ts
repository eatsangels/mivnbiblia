import { createClient } from "@/lib/supabase/server";
import { cache } from "react";

export type Event = {
    id: string;
    title: string;
    slug: string;
    description: string;
    event_date: string;
    end_date: string | null;
    location: string | null;
    address: string | null;
    image: string | null;
    image_url: string | null;
    registration_url: string | null;
    max_attendees: number | null;
    is_featured: boolean | null;
    is_published: boolean | null;
    created_at: string | null;
    updated_at: string | null;
    category: string | null;
    capacity: number | null;
    speaker: string | null;
    start_time: string | null;
    end_time: string | null;
};

/**
 * Get all published events
 */
export const getEvents = cache(async () => {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from("events")
        .select("*")
        .or('is_published.eq.true,is_published.is.null')
        .order("event_date", { ascending: true });

    if (error) throw error;
    return data as Event[];
});

/**
 * Get upcoming events
 */
export const getUpcomingEvents = cache(async (limit?: number) => {
    const supabase = await createClient();
    let query = supabase
        .from("events")
        .select("*")
        .or('is_published.eq.true,is_published.is.null')
        .gte("event_date", new Date().toISOString())
        .order("event_date", { ascending: true });

    if (limit) {
        query = query.limit(limit);
    }

    const { data, error } = await query;

    if (error) throw error;
    return data as Event[];
});

/**
 * Get featured events
 */
export const getFeaturedEvents = cache(async (limit: number = 3) => {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from("events")
        .select("*")
        .or('is_published.eq.true,is_published.is.null')
        .eq("is_featured", true)
        .gte("event_date", new Date().toISOString())
        .order("event_date", { ascending: true })
        .limit(limit);

    if (error) throw error;
    return data as Event[];
});

/**
 * Get event by slug
 */
export const getEventBySlug = cache(async (slug: string) => {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from("events")
        .select("*")
        .eq("slug", slug)
        .or('is_published.eq.true,is_published.is.null')
        .maybeSingle();

    if (error) throw error;
    return data as Event | null;
});

import { createClient } from "@/lib/supabase/server";
import { cache } from "react";

export type Milestone = {
    id: string;
    milestone_slug: string;
    title: string;
    completed_at: string | null;
    is_completed: boolean;
};

export type Certificate = {
    id: string;
    title: string;
    type: string;
    issued_at: string;
    file_url: string | null;
};

export const getUserMilestones = cache(async (userId: string) => {
    const supabase = await createClient();
    const { data, error } = await (supabase as any)
        .from("user_milestones")
        .select("*")
        .eq("user_id", userId)
        .order("completed_at", { ascending: true });

    if (error) {
        // Suppress red-screen error in dev mode for missing tables
        if (error.code === 'PGRST116' || error.message?.includes('schema cache')) {
            console.warn("Table 'user_milestones' not found. Please run the migration SQL.");
        } else {
            console.error("Error fetching milestones:", error.message || error);
        }
        return [];
    }
    return data as unknown as Milestone[];
});

export const getUserCertificates = cache(async (userId: string) => {
    const supabase = await createClient();
    const { data, error } = await (supabase as any)
        .from("user_certificates")
        .select("*")
        .eq("user_id", userId)
        .order("issued_at", { ascending: false });

    if (error) {
        // Suppress red-screen error in dev mode for missing tables
        if (error.code === 'PGRST116' || error.message?.includes('schema cache')) {
            console.warn("Table 'user_certificates' not found. Please run the migration SQL.");
        } else {
            console.error("Error fetching certificates:", error.message || error);
        }
        return [];
    }
    return data as unknown as Certificate[];
});

export const getUserActivity = cache(async (userId: string) => {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from("event_registrations")
        .select(`
            id,
            created_at,
            events (
                title,
                category,
                event_date
            )
        `)
        .eq("user_id", userId)
        .order("created_at", { ascending: false })
        .limit(10);

    if (error) {
        console.error("Error fetching user activity:", error.message || error);
        return [];
    }

    return data.map((reg: any) => ({
        id: reg.id,
        title: reg.events?.title || "Evento",
        date: reg.events?.event_date || reg.created_at,
        category: reg.events?.category || "General",
        status: "Completado"
    }));
});

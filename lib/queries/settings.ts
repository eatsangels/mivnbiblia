import { createClient } from "@/lib/supabase/server";
import { cache } from "react";

export type SiteSetting = {
    id: string;
    key: string;
    value: string;
    type: string;
    description: string | null;
    updated_at: string;
};

/**
 * Get all site settings as a key-value object
 */
export const getSiteSettings = cache(async () => {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from("site_settings")
        .select("*");

    if (error) throw error;

    // Convert array to key-value object
    const settings: Record<string, string> = {};
    data?.forEach((setting: SiteSetting) => {
        settings[setting.key] = setting.value;
    });

    return settings;
});

/**
 * Get a single site setting by key
 */
export const getSiteSetting = cache(async (key: string) => {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from("site_settings")
        .select("*")
        .eq("key", key)
        .single();

    if (error) throw error;
    return data as SiteSetting;
});

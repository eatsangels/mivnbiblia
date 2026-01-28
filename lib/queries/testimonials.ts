import { createClient } from "@/lib/supabase/server";
import { cache } from "react";

export type Testimonial = {
    id: string;
    name: string;
    category: string;
    text: string;
    avatar_url: string | null;
    type: 'text' | 'video' | 'accent';
    is_active: boolean;
    created_at: string;
};

export const getTestimonials = cache(async () => {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from("testimonies")
        .select("*")
        .eq("is_approved", true)
        .order("created_at", { ascending: false });

    if (error) {
        console.error("Error fetching testimonies:", error);
        return [];
    }

    return data.map((t: any) => ({
        id: t.id,
        name: t.full_name || t.author_name || "Anónimo",
        category: t.category || "General",
        text: t.content,
        avatar_url: t.avatar_url,
        type: (t.featured || t.is_featured) ? 'accent' : 'text',
        is_active: t.is_approved,
        created_at: t.created_at
    })) as Testimonial[];
});

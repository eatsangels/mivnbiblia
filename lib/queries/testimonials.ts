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
        .from("testimonials")
        .select("*")
        .eq("is_active", true)
        .order("created_at", { ascending: false });

    if (error) {
        console.error("Error fetching testimonials:", error);
        return [];
    }

    return data as any as Testimonial[];
});

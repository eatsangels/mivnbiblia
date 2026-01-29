"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function getTestimonies() {
    const supabase = await createClient();
    const { data, error } = await (supabase as any)
        .from("testimonies")
        .select("*")
        .order("created_at", { ascending: false });

    if (error) {
        console.error("Error fetching testimonies:", error);
        return [];
    }

    return data;
}

export async function approveTestimony(id: string) {
    const supabase = await createClient();
    const { error } = await (supabase as any)
        .from("testimonies")
        .update({ is_approved: true })
        .eq("id", id);

    if (error) {
        throw new Error("Failed to approve testimony");
    }

    revalidatePath("/admin/testimonials");
    return { success: true };
}

export async function rejectTestimony(id: string) {
    const supabase = await createClient();
    // For now, "reject" deletes the testimony. We can change this to an "archived" status later if needed.
    const { error } = await (supabase as any)
        .from("testimonies")
        .delete()
        .eq("id", id);

    if (error) {
        throw new Error("Failed to reject testimony");
    }

    revalidatePath("/admin/testimonials");
    return { success: true };
}

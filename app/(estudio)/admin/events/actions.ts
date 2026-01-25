"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { Database } from "@/lib/database.types";
import { SupabaseClient } from "@supabase/supabase-js";

export async function createEvent(formData: FormData) {
    const supabase: SupabaseClient<Database> = await createClient();

    // Type-safe data extraction
    const title = (formData.get("title") as string) || "";
    const category = (formData.get("category") as string) || "";
    const location = (formData.get("location") as string) || "";
    const speaker = (formData.get("speaker") as string) || "";

    const capacityRaw = formData.get("capacity");
    const capacity = capacityRaw ? parseInt(capacityRaw as string) : 0;

    const dateStr = formData.get("date") as string;
    const start_time = dateStr ? new Date(dateStr).toISOString() : new Date().toISOString();
    // Default duration 2 hours
    const end_time = dateStr
        ? new Date(new Date(dateStr).getTime() + 2 * 60 * 60 * 1000).toISOString()
        : new Date(new Date().getTime() + 2 * 60 * 60 * 1000).toISOString();

    const { error } = await supabase
        .from("events")
        .insert({
            title,
            category,
            capacity,
            speaker,
            location,
            start_time,
            end_time,
            description: formData.get("description") as string || ""
        });

    if (error) {
        console.error("Error creating event:", error);
        return { success: false, error: error.message || "Error al crear evento" };
    }

    revalidatePath("/admin/events");
    return { success: true };
}

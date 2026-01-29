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
    const image_url = (formData.get("image_url") as string) || "";
    const is_featured = formData.get("is_featured") === "on";

    const capacityRaw = formData.get("capacity");
    const capacity = capacityRaw ? parseInt(capacityRaw as string) : 0;

    const dateStr = formData.get("date") as string;
    const start_time = dateStr ? new Date(dateStr).toISOString() : new Date().toISOString();
    // Default duration 2 hours
    const end_time = dateStr
        ? new Date(new Date(dateStr).getTime() + 2 * 60 * 60 * 1000).toISOString()
        : new Date(new Date().getTime() + 2 * 60 * 60 * 1000).toISOString();

    const slug = title.toLowerCase().trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_-]+/g, '-')
        .replace(/^-+|-+$/g, '') + '-' + Date.now().toString().slice(-4);

    const { error } = await (supabase as any)
        .from("events")
        .insert({
            title,
            slug,
            category,
            capacity,
            speaker,
            location,
            start_time,
            end_time,
            event_date: start_time,
            description: (formData.get("description") as string) || "",
            image_url,
            image: image_url, // Keep both synced if schema requires it, or just use one
            is_featured,
            is_published: true
        });

    if (error) {
        console.error("Error creating event:", error);
        return { success: false, errorMsg: error.message || "Error al crear evento" };
    }

    revalidatePath("/admin/events");
    revalidatePath("/eventos"); // Revalidate public page
    return { success: true };
}

export async function updateEvent(formData: FormData) {
    const supabase: SupabaseClient<Database> = await createClient();

    const id = formData.get("id") as string;
    if (!id) return { success: false, errorMsg: "ID de evento requerido" };

    const title = (formData.get("title") as string) || "";
    const category = (formData.get("category") as string) || "";
    const location = (formData.get("location") as string) || "";
    const speaker = (formData.get("speaker") as string) || "";
    const image_url = (formData.get("image_url") as string) || "";
    const is_featured = formData.get("is_featured") === "on";

    const capacityRaw = formData.get("capacity");
    const capacity = capacityRaw ? parseInt(capacityRaw as string) : 0;

    const dateStr = formData.get("date") as string;
    const start_time = dateStr ? new Date(dateStr).toISOString() : undefined;

    // Construct update object
    const updates: any = {
        title,
        category,
        capacity,
        speaker,
        location,
        description: (formData.get("description") as string) || "",
        is_featured,
        is_published: true,
        updated_at: new Date().toISOString()
    };

    // Log received image_url for debugging
    console.log("updateEvent ID:", id);
    console.log("updateEvent image_url raw:", image_url);

    // Only update image if a new one is provided. 
    // We check for string type to allow clearing (empty string) if intended
    if (typeof image_url === "string") {
        updates.image_url = image_url;
        updates.image = image_url;
    }

    if (start_time) {
        updates.start_time = start_time;
        updates.event_date = start_time;
        updates.end_time = new Date(new Date(start_time).getTime() + 2 * 60 * 60 * 1000).toISOString();
    }

    const { error } = await (supabase as any)
        .from("events")
        .update(updates)
        .eq("id", id);

    if (error) {
        console.error("Error updating event:", error);
        return { success: false, errorMsg: error.message || "Error al actualizar evento" };
    }

    revalidatePath("/admin/events");
    revalidatePath("/eventos");
    return { success: true };
}

export async function deleteEvent(id: string) {
    const supabase: SupabaseClient<Database> = await createClient();

    if (!id) return { success: false, errorMsg: "ID de evento requerido" };

    const { error } = await (supabase as any)
        .from("events")
        .delete()
        .eq("id", id);

    if (error) {
        console.error("Error deleting event:", error);
        return { success: false, errorMsg: error.message || "Error al eliminar evento" };
    }

    revalidatePath("/admin/events");
    revalidatePath("/eventos");
    return { success: true };
}

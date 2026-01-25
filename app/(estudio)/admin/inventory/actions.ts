"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { Database } from "@/lib/database.types";

type ResourceInsert = Database["public"]["Tables"]["resources"]["Insert"];
type ResourceUpdate = Database["public"]["Tables"]["resources"]["Update"];

export async function createResource(data: ResourceInsert) {
    const supabase = await createClient();

    // Ensure slug is generated if not provided
    const slug = data.slug || data.title.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "");

    const { error } = await supabase
        .from("resources")
        .insert({
            ...data,
            slug
        });

    if (error) {
        console.error("Error creating resource:", error);
        return { success: false, error: error.message };
    }

    revalidatePath("/admin/inventory");
    return { success: true };
}

export async function updateResource(id: string, data: ResourceUpdate) {
    const supabase = await createClient();

    const { error } = await supabase
        .from("resources")
        .update({
            ...data,
            updated_at: new Date().toISOString()
        } as any) // updated_at might not be in the generated types for resources but is common
        .eq("id", id);

    if (error) {
        console.error("Error updating resource:", error);
        return { success: false, error: error.message };
    }

    revalidatePath("/admin/inventory");
    return { success: true };
}

export async function deleteResource(id: string) {
    const supabase = await createClient();

    const { error } = await supabase
        .from("resources")
        .delete()
        .eq("id", id);

    if (error) {
        console.error("Error deleting resource:", error);
        return { success: false, error: error.message };
    }

    revalidatePath("/admin/inventory");
    return { success: true };
}

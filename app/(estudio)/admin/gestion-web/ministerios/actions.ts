"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createMinistry(formData: FormData) {
    const supabase = await createClient();

    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const leader_name = formData.get("leader_name") as string;
    const leader_email = formData.get("leader_email") as string;
    const meeting_day = formData.get("meeting_day") as string;
    const meeting_time = formData.get("meeting_time") as string;
    const location = formData.get("location") as string;
    const image = formData.get("image") as string;
    const is_active = formData.get("is_active") === "on";

    // Generate slug from name
    const slug = name
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");

    const { error } = await (supabase as any).from("ministries").insert({
        name,
        slug,
        description,
        leader_name,
        leader_email,
        meeting_day,
        meeting_time,
        location,
        image,
        is_active,
    });

    if (error) {
        throw new Error(error.message);
    }

    revalidatePath("/admin/gestion-web/ministerios");
    redirect("/admin/gestion-web/ministerios");
}

export async function updateMinistry(id: string, formData: FormData) {
    const supabase = await createClient();

    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const leader_name = formData.get("leader_name") as string;
    const leader_email = formData.get("leader_email") as string;
    const meeting_day = formData.get("meeting_day") as string;
    const meeting_time = formData.get("meeting_time") as string;
    const location = formData.get("location") as string;
    const image = formData.get("image") as string;
    const is_active = formData.get("is_active") === "on";

    // Generate slug from name
    const slug = name
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");

    const { error } = await (supabase as any)
        .from("ministries")
        .update({
            name,
            slug,
            description,
            leader_name,
            leader_email,
            meeting_day,
            meeting_time,
            location,
            image,
            is_active,
        })
        .eq("id", id);

    if (error) {
        throw new Error(error.message);
    }

    revalidatePath("/admin/gestion-web/ministerios");
    redirect("/admin/gestion-web/ministerios");
}

export async function deleteMinistry(id: string) {
    const supabase = await createClient();

    const { error } = await (supabase as any)
        .from("ministries")
        .delete()
        .eq("id", id);

    if (error) {
        throw new Error(error.message);
    }

    revalidatePath("/admin/gestion-web/ministerios");
}

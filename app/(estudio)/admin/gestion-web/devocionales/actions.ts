"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { Database } from "@/lib/database.types";
import { SupabaseClient } from "@supabase/supabase-js";

export async function createDevotional(formData: FormData) {
    const supabase = (await createClient()) as SupabaseClient<Database, "public">;

    const title = formData.get("title") as string;
    const scripture_reference = formData.get("scripture_reference") as string;
    const content = formData.get("content") as string;
    const author_name = formData.get("author_name") as string;
    const publish_date = formData.get("publish_date") as string;
    const image = formData.get("image") as string;
    const is_published = formData.get("is_published") === "on";

    // Generate slug from title
    const slug = title
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");

    const devotionalData = {
        title,
        slug,
        content,
        author: author_name,
        date: publish_date,
        image_url: image || null,
    };

    const { error } = await (supabase as any).from("devotionals").insert(devotionalData);

    if (error) {
        throw new Error(error.message);
    }

    revalidatePath("/admin/gestion-web/devocionales");
    revalidatePath("/devocionales");
    redirect("/admin/gestion-web/devocionales");
}

export async function updateDevotional(id: string, formData: FormData) {
    const supabase = (await createClient()) as SupabaseClient<Database, "public">;

    const title = formData.get("title") as string;
    const scripture_reference = formData.get("scripture_reference") as string;
    const content = formData.get("content") as string;
    const author_name = formData.get("author_name") as string;
    const publish_date = formData.get("publish_date") as string;
    const image = formData.get("image") as string;
    const is_published = formData.get("is_published") === "on";

    // Generate slug from title
    const slug = title
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");

    const devotionalData = {
        title,
        slug,
        content,
        author: author_name,
        date: publish_date,
        image_url: image || null,
    };

    const { error } = await (supabase as any)
        .from("devotionals")
        .update(devotionalData)
        .eq("id", id);

    if (error) {
        throw new Error(error.message);
    }

    revalidatePath("/admin/gestion-web/devocionales");
    revalidatePath("/devocionales");
    redirect("/admin/gestion-web/devocionales");
}

export async function deleteDevotional(id: string) {
    const supabase = (await createClient()) as SupabaseClient<Database, "public">;

    const { error } = await (supabase as any)
        .from("devotionals")
        .delete()
        .eq("id", id);

    if (error) {
        throw new Error(error.message);
    }

    revalidatePath("/admin/gestion-web/devocionales");
    revalidatePath("/devocionales");
}

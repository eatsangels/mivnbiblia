"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createResource(formData: FormData) {
    const supabase = await createClient();

    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const category_id = formData.get("category_id") as string;
    const file_url = formData.get("file_url") as string;
    const external_url = formData.get("external_url") as string;
    const thumbnail = formData.get("thumbnail") as string;
    const file_type = formData.get("file_type") as string;
    const is_featured = formData.get("is_featured") === "on";
    const is_published = formData.get("is_published") === "on";

    // Generate slug from title
    const slug = title
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");

    const { error } = await (supabase as any).from("resources").insert({
        title,
        slug,
        description,
        category_id: category_id === "" ? null : category_id,
        file_url,
        external_url,
        thumbnail,
        file_type,

        is_featured,
        is_published,
    });

    if (error) {
        throw new Error(error.message);
    }

    revalidatePath("/admin/gestion-web/recursos");
    revalidatePath("/recursos");
    redirect("/admin/gestion-web/recursos");
}

export async function updateResource(id: string, formData: FormData) {
    const supabase = await createClient();

    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const category_id = formData.get("category_id") as string;
    const file_url = formData.get("file_url") as string;
    const external_url = formData.get("external_url") as string;
    const thumbnail = formData.get("thumbnail") as string;
    const file_type = formData.get("file_type") as string;
    const is_featured = formData.get("is_featured") === "on";
    const is_published = formData.get("is_published") === "on";

    // Generate slug from title
    const slug = title
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");

    const { error } = await (supabase as any)
        .from("resources")
        .update({
            title,
            slug,
            description,
            category_id: category_id === "" ? null : category_id,
            file_url,
            external_url,
            thumbnail,
            file_type,

            is_featured,
            is_published,
        })
        .eq("id", id);

    if (error) {
        throw new Error(error.message);
    }

    revalidatePath("/admin/gestion-web/recursos");
    revalidatePath("/recursos");
    redirect("/admin/gestion-web/recursos");
}

export async function deleteResource(id: string) {
    const supabase = await createClient();

    const { error } = await (supabase as any)
        .from("resources")
        .delete()
        .eq("id", id);

    if (error) {
        throw new Error(error.message);
    }

    revalidatePath("/admin/gestion-web/recursos");
    revalidatePath("/recursos");
}

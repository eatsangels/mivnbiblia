"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createBulletin(formData: FormData) {
    const supabase = await createClient();

    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const publish_date = formData.get("publish_date") as string;
    const pdf_url = formData.get("pdf_url") as string;
    const is_published = formData.get("is_published") === "on";

    // Generate slug from title
    const slug = title
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");

    const { error } = await supabase.from("bulletins").insert({
        title,
        slug,
        content,
        publish_date,
        pdf_url,
        is_published,
    });

    if (error) {
        throw new Error(error.message);
    }

    revalidatePath("/admin/gestion-web/boletines");
    revalidatePath("/boletin");
    redirect("/admin/gestion-web/boletines");
}

export async function updateBulletin(id: string, formData: FormData) {
    const supabase = await createClient();

    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const publish_date = formData.get("publish_date") as string;
    const pdf_url = formData.get("pdf_url") as string;
    const is_published = formData.get("is_published") === "on";

    // Generate slug from title
    const slug = title
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");

    const { error } = await supabase
        .from("bulletins")
        .update({
            title,
            slug,
            content,
            publish_date,
            pdf_url,
            is_published,
        })
        .eq("id", id);

    if (error) {
        throw new Error(error.message);
    }

    revalidatePath("/admin/gestion-web/boletines");
    revalidatePath("/boletin");
    redirect("/admin/gestion-web/boletines");
}

export async function deleteBulletin(id: string) {
    const supabase = await createClient();

    const { error } = await supabase
        .from("bulletins")
        .delete()
        .eq("id", id);

    if (error) {
        throw new Error(error.message);
    }

    revalidatePath("/admin/gestion-web/boletines");
    revalidatePath("/boletin");
}

"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { Database } from "@/lib/database.types";
import { SupabaseClient } from "@supabase/supabase-js";

export async function createBulletin(formData: FormData) {
    type BulletinInsert = Database['public']['Tables']['bulletins']['Insert'];
    const supabase = (await createClient()) as SupabaseClient<Database, "public">;

    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const publish_date = formData.get("publish_date") as string;
    const file_url = formData.get("pdf_url") as string;
    const is_published = formData.get("is_published") === "on";

    const bulletinData: BulletinInsert = {
        title,
        content,
        slug: title.toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, ''),
        publish_date: publish_date || new Date().toISOString().split('T')[0],
        pdf_url: file_url || null,
        is_published,
    };

    const { error } = await (supabase as any).from("bulletins").insert(bulletinData);

    if (error) {
        throw new Error(error.message);
    }

    revalidatePath("/admin/gestion-web/boletines");
    revalidatePath("/boletin");
    redirect("/admin/gestion-web/boletines");
}

export async function updateBulletin(id: string, formData: FormData) {
    const supabase = (await createClient()) as SupabaseClient<Database, "public">;

    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const publish_date = formData.get("publish_date") as string;
    const file_url = formData.get("pdf_url") as string;
    const is_published = formData.get("is_published") === "on";

    const bulletinData = {
        title,
        content,
        slug: title.toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, ''),
        publish_date: publish_date || new Date().toISOString().split('T')[0],
        pdf_url: file_url || null,
        is_published,
    };

    const { error } = await (supabase as any)
        .from("bulletins")
        .update(bulletinData)
        .eq("id", id);

    if (error) {
        throw new Error(error.message);
    }

    revalidatePath("/admin/gestion-web/boletines");
    revalidatePath("/boletin");
    redirect("/admin/gestion-web/boletines");
}

export async function deleteBulletin(id: string) {
    const supabase = (await createClient()) as SupabaseClient<Database, "public">;

    const { error } = await (supabase as any)
        .from("bulletins")
        .delete()
        .eq("id", id);

    if (error) {
        throw new Error(error.message);
    }

    revalidatePath("/admin/gestion-web/boletines");
    revalidatePath("/boletin");
}

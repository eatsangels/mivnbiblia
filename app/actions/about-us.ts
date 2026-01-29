"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function updateAboutUsContent(content: any) {
    const supabase = await createClient();

    const { error } = await (supabase as any)
        .from("about_us_content")
        .update(content)
        .eq("id", content.id);

    if (!error) {
        revalidatePath("/sobre-nosotros");
        revalidatePath("/admin/about-us");
    }

    return { error };
}

"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function subscribeToNewsletter(formData: FormData) {
    const email = formData.get("email") as string;

    if (!email) {
        return { success: false, error: "Email is required" };
    }

    const supabase = await createClient();

    const { error } = await (supabase as any)
        .from("newsletter_subscriptions")
        .insert({
            email,
            is_active: true
        });

    if (error) {
        if (error.code === '23505') {
            return { success: false, error: "Este correo ya está suscrito." };
        }
        return { success: false, error: error.message };
    }

    revalidatePath("/");
    return { success: true };
}

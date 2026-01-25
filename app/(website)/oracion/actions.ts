"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function createPrayerRequest(prevState: any, formData: FormData) {
    const supabase = await createClient();

    // Check authentication
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return { message: "Debes iniciar sesión para enviar una petición de oración.", success: false };
    }

    const name = formData.get("name") as string;
    const request = formData.get("request") as string;
    const isAnonymous = formData.get("isAnonymous") === "on";
    const visibility = formData.get("visibility") as string; // 'public' | 'private'
    const isPrivate = visibility === 'private';

    // Validations
    if (!name || !request) {
        return { message: "Por favor completa los campos requeridos.", success: false };
    }

    const { error } = await (supabase as any)
        .from("prayer_requests")
        .insert({
            user_id: user?.id || null,
            requester_name: name,
            email: user?.email || null,
            request: request,
            is_anonymous: isAnonymous,
            is_private: isPrivate,
            is_approved: false, // Always requires approval
            is_answered: false
        });

    if (error) {
        console.error("Error creating prayer request:", error);
        return { message: "Hubo un error al enviar tu petición. Intenta nuevamente.", success: false };
    }

    revalidatePath("/oracion");
    return { message: "Tu petición ha sido enviada y será revisada por nuestro equipo de oración.", success: true };
}

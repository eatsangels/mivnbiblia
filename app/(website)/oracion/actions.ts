"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function createPrayerRequest(prevState: any, formData: FormData) {
    const supabase = await createClient();

    // Check authentication (optional, but good practice if we want user_id)
    const { data: { user } } = await supabase.auth.getUser();

    const name = formData.get("name") as string;
    const request = formData.get("request") as string;
    const isAnonymous = formData.get("isAnonymous") === "on";
    // Visibility logic: if 'private', we could store it differently or use a flag. 
    // For now assuming existing schema doesn't have visibility column, so we might just use is_anonymous 
    // or if the user wants private, maybe we don't approve it for public wall?
    // Let's assume visibility is handled by approval or a future column. 
    // Based on form, "Private" means only pastors see it. We can handle this by never approving it for public list, 
    // or adding a comment to admin. For now let's just save basic fields.

    // Validations
    if (!name || !request) {
        return { message: "Por favor completa los campos requeridos.", success: false };
    }

    const { error } = await supabase
        .from("prayer_requests")
        .insert({
            user_id: user?.id || null,
            requester_name: name,
            email: user?.email || null, // Best effort email
            request: request,
            is_anonymous: isAnonymous,
            is_approved: false, // Always requires approval
            is_answered: false
            // Note: If visibility was 'private', admins should see that context. 
            // Ideally we'd have a 'visibility' column 'public'|'private'
        });

    if (error) {
        console.error("Error creating prayer request:", error);
        return { message: "Hubo un error al enviar tu petición. Intenta nuevamente.", success: false };
    }

    revalidatePath("/oracion");
    return { message: "Tu petición ha sido enviada y será revisada por nuestro equipo de oración.", success: true };
}

"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function updateSiteSettings(formData: FormData) {
    const supabase = await createClient();

    const settings = {
        site_name: formData.get("site_name") as string,
        site_tagline: formData.get("site_tagline") as string,
        address: formData.get("address") as string,
        contact_phone: formData.get("contact_phone") as string,
        contact_email: formData.get("contact_email") as string,
        service_time_sunday: formData.get("service_time_sunday") as string,
        service_time_wednesday: formData.get("service_time_wednesday") as string,
        facebook_url: formData.get("facebook_url") as string,
        instagram_url: formData.get("instagram_url") as string,
        youtube_url: formData.get("youtube_url") as string,
        top_banner_text: formData.get("top_banner_text") as string,
        top_banner_button_text: formData.get("top_banner_button_text") as string,
        top_banner_button_url: formData.get("top_banner_button_url") as string,
    };

    // Update each setting
    for (const [key, value] of Object.entries(settings)) {
        if (value) {
            await supabase
                .from("site_settings")
                .upsert({
                    key,
                    value,
                }, {
                    onConflict: "key"
                });
        }
    }

    revalidatePath("/");
    revalidatePath("/admin/gestion-web/configuracion");
    redirect("/admin/gestion-web/configuracion");
}

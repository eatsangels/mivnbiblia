"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export type WebSettings = {
    // Logos
    logo_url?: string;
    logo_footer_url?: string;

    // Colors
    primary_color?: string;
    secondary_color?: string;
    background_light?: string;
    background_dark?: string;
    footer_bg_color?: string;
    footer_text_color?: string;
    footer_bottom_bg?: string;

    // Site Info
    site_name?: string;
    site_tagline?: string;

    // Contact
    address?: string;
    contact_phone?: string;
    contact_email?: string;

    // Social Media
    facebook_url?: string;
    instagram_url?: string;
    youtube_url?: string;

    // Service Times
    service_time_sunday?: string;
    service_time_wednesday?: string;
};

/**
 * Get all web settings
 */
export async function getWebSettings(): Promise<WebSettings> {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from("site_settings")
        .select("*");

    if (error) throw error;

    const settings: WebSettings = {};
    (data || []).forEach((setting: any) => {
        settings[setting.key as keyof WebSettings] = setting.value;
    });

    return settings;
}

/**
 * Update multiple site settings
 */
export async function updateWebSettings(settings: Partial<WebSettings>) {
    const supabase = await createClient();

    // Update each setting
    for (const [key, value] of Object.entries(settings)) {
        const { error } = await supabase
            .from("site_settings")
            .upsert({
                key,
                value: value as string,
                type: key.includes('color') ? 'color' : 'text',
                updated_at: new Date().toISOString()
            }, {
                onConflict: 'key'
            });

        if (error) {
            console.error(`Error updating ${key}:`, error);
            throw error;
        }
    }

    // Revalidate all pages that use settings
    revalidatePath('/', 'layout');

    return { success: true };
}

import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * Upload logo to Cloudinary
 */
export async function uploadLogo(formData: FormData, type: 'main' | 'footer' = 'main') {
    const file = formData.get('file') as File;

    if (!file) {
        throw new Error('No file provided');
    }

    try {
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        const uploadResult = await new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream({
                folder: 'logos',
                public_id: `logo_${type}_${Date.now()}`,
                resource_type: 'auto'
            }, (error, result) => {
                if (error) reject(error);
                else resolve(result);
            }).end(buffer);
        }) as any;

        const publicUrl = uploadResult.secure_url;

        // Update site settings
        const settingKey = type === 'main' ? 'logo_url' : 'logo_footer_url';
        await updateWebSettings({ [settingKey]: publicUrl });

        return { success: true, url: publicUrl };
    } catch (error: any) {
        console.error('Error uploading logo to Cloudinary:', error);
        throw new Error(error.message || 'Error al subir el logo');
    }
}

/**
 * Reset settings to default
 */
export async function resetToDefaults() {
    const defaults: Partial<WebSettings> = {
        logo_url: '/logo_mivn.png',
        logo_footer_url: '/logo_mivn.png',
        primary_color: '#4AA3DF',
        secondary_color: '#D4AF37',
        background_light: '#FDFDFF',
        background_dark: '#0A0F1D',
        footer_bg_color: '#4AA3DF',
        footer_text_color: '#FFFFFF',
        footer_bottom_bg: '#0f172a'
    };

    await updateWebSettings(defaults);
    return { success: true };
}

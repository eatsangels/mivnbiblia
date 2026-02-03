"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function getFAQs() {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from('faqs')
        .select('*')
        .order('display_order', { ascending: true });

    if (error) throw error;
    return data;
}

export async function createFAQ(formData: { question: string; answer: string; display_order: number; category?: string }) {
    const supabase = await createClient();
    const { error } = await supabase
        .from('faqs')
        .insert([formData]);

    if (error) throw error;
    revalidatePath('/admin/gestion-web/faqs');
    revalidatePath('/soporte');
}

export async function updateFAQ(id: string, formData: { question: string; answer: string; display_order: number; category?: string }) {
    const supabase = await createClient();
    const { error } = await supabase
        .from('faqs')
        .update(formData)
        .eq('id', id);

    if (error) throw error;
    revalidatePath('/admin/gestion-web/faqs');
    revalidatePath('/soporte');
}

export async function deleteFAQ(id: string) {
    const supabase = await createClient();
    const { error } = await supabase
        .from('faqs')
        .delete()
        .eq('id', id);

    if (error) throw error;
    revalidatePath('/admin/gestion-web/faqs');
    revalidatePath('/soporte');
}

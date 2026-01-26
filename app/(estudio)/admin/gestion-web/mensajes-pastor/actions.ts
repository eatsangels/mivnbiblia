"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { Database } from "@/lib/database.types";

export type Sermon = Database['public']['Tables']['pastor_messages']['Row'];

export async function getSermons() {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from("pastor_messages")
        .select("*")
        .order("date", { ascending: false });

    if (error) {
        console.error("Error fetching sermons:", error);
        return [];
    }

    return data;
}

export async function createSermon(sermon: Omit<Sermon, "id" | "created_at">) {
    const supabase = await createClient();

    // Auth check
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return { error: "No autenticado" };

    const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single();
    if (profile?.role !== 'admin' && profile?.role !== 'super_admin' && profile?.role !== 'editor') {
        return { error: "No autorizado" };
    }

    const { data, error } = await supabase
        .from("pastor_messages")
        .insert(sermon)
        .select()
        .single();

    if (error) return { error: error.message };

    revalidatePath("/admin/gestion-web/mensajes-pastor");
    return { success: true, data };
}

export async function updateSermon(id: string, sermon: Partial<Sermon>) {
    const supabase = await createClient();

    // Auth check
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return { error: "No autenticado" };

    const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single();
    if (profile?.role !== 'admin' && profile?.role !== 'super_admin' && profile?.role !== 'editor') {
        return { error: "No autorizado" };
    }

    const { error } = await supabase
        .from("pastor_messages")
        .update(sermon)
        .eq("id", id);

    if (error) return { error: error.message };

    revalidatePath("/admin/gestion-web/mensajes-pastor");
    return { success: true };
}

export async function deleteSermon(id: string) {
    const supabase = await createClient();

    // Auth check
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return { error: "No autenticado" };

    const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single();
    if (profile?.role !== 'admin' && profile?.role !== 'super_admin' && profile?.role !== 'editor') {
        return { error: "No autorizado" };
    }

    const { error } = await supabase
        .from("pastor_messages")
        .delete()
        .eq("id", id);

    if (error) return { error: error.message };

    revalidatePath("/admin/gestion-web/mensajes-pastor");
    return { success: true };
}

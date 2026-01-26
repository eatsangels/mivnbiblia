"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

import { Database } from "@/lib/database.types";

export type SmallGroup = Database['public']['Tables']['small_groups']['Row'];

// Get all small groups
export async function getSmallGroups(): Promise<SmallGroup[]> {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from('small_groups')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: true });

    if (error) {
        console.error('Error fetching small groups:', error);
        return [];
    }

    return data || [];
}

// Create small group
export async function createSmallGroup(group: Omit<SmallGroup, 'id' | 'created_at' | 'updated_at'>) {
    const supabase = await createClient();

    // Check admin
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return { error: 'No autenticado' };

    const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();

    if (profile?.role !== 'admin') return { error: 'No autorizado' };

    const { data, error } = await supabase
        .from('small_groups')
        .insert(group)
        .select()
        .single();

    if (error) {
        console.error('Error creating small group:', error);
        return { error: error.message };
    }

    revalidatePath('/grupos');
    return { success: true, data };
}

// Update small group
export async function updateSmallGroup(id: string, group: Partial<SmallGroup>) {
    const supabase = await createClient();

    // Check admin
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return { error: 'No autenticado' };

    const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();

    if (profile?.role !== 'admin') return { error: 'No autorizado' };

    const { error } = await supabase
        .from('small_groups')
        .update(group)
        .eq('id', id);

    if (error) {
        console.error('Error updating small group:', error);
        return { error: error.message };
    }

    revalidatePath('/grupos');
    return { success: true };
}

// Delete small group
export async function deleteSmallGroup(id: string) {
    const supabase = await createClient();

    // Check admin
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return { error: 'No autenticado' };

    const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();

    if (profile?.role !== 'admin') return { error: 'No autorizado' };

    const { error } = await supabase
        .from('small_groups')
        .delete()
        .eq('id', id);

    if (error) {
        console.error('Error deleting small group:', error);
        return { error: error.message };
    }

    revalidatePath('/grupos');
    return { success: true };
}

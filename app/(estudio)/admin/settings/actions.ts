"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

import { Database } from "@/lib/database.types";

export type ServiceSettings = Database['public']['Tables']['service_settings']['Row'];
export type WeeklyActivity = Database['public']['Tables']['weekly_activities']['Row'];

// Get service settings
export async function getServiceSettings(): Promise<ServiceSettings | null> {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from('service_settings')
        .select('*')
        .single();

    if (error) {
        console.error('Error fetching service settings:', error);
        return null;
    }

    return data;
}

// Update service settings
export async function updateServiceSettings(settings: Partial<ServiceSettings>) {
    const supabase = await createClient();

    // Check if user is admin
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        return { error: 'No autenticado' };
    }

    const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();

    if (profile?.role !== 'admin') {
        return { error: 'No autorizado' };
    }

    // Get the first (and only) settings record
    const { data: existing } = await supabase
        .from('service_settings')
        .select('id')
        .single();

    if (!existing) {
        return { error: 'Configuración no encontrada' };
    }

    const { error } = await supabase
        .from('service_settings')
        .update(settings)
        .eq('id', existing.id);

    if (error) {
        console.error('Error updating service settings:', error);
        return { error: error.message };
    }

    revalidatePath('/cultos');
    revalidatePath('/en-vivo');

    return { success: true };
}

// Get weekly activities
export async function getWeeklyActivities(): Promise<WeeklyActivity[]> {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from('weekly_activities')
        .select('*')
        .eq('is_active', true)
        .order('display_order', { ascending: true });

    if (error) {
        console.error('Error fetching weekly activities:', error);
        return [];
    }

    return data || [];
}

// Create weekly activity
export async function createWeeklyActivity(activity: Omit<WeeklyActivity, 'id' | 'created_at'>) {
    const supabase = await createClient();

    // Check if user is admin
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        return { error: 'No autenticado' };
    }

    const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();

    if (profile?.role !== 'admin') {
        return { error: 'No autorizado' };
    }

    const { data, error } = await supabase
        .from('weekly_activities')
        .insert(activity)
        .select()
        .single();

    if (error) {
        console.error('Error creating weekly activity:', error);
        return { error: error.message };
    }

    revalidatePath('/cultos');
    revalidatePath('/en-vivo');

    return { success: true, data };
}

// Update weekly activity
export async function updateWeeklyActivity(id: string, activity: Partial<WeeklyActivity>) {
    const supabase = await createClient();

    // Check if user is admin
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        return { error: 'No autenticado' };
    }

    const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();

    if (profile?.role !== 'admin') {
        return { error: 'No autorizado' };
    }

    const { error } = await supabase
        .from('weekly_activities')
        .update(activity)
        .eq('id', id);

    if (error) {
        console.error('Error updating weekly activity:', error);
        return { error: error.message };
    }

    revalidatePath('/cultos');
    revalidatePath('/en-vivo');

    return { success: true };
}

// Delete weekly activity
export async function deleteWeeklyActivity(id: string) {
    const supabase = await createClient();

    // Check if user is admin
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        return { error: 'No autenticado' };
    }

    const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();

    if (profile?.role !== 'admin') {
        return { error: 'No autorizado' };
    }

    const { error } = await supabase
        .from('weekly_activities')
        .delete()
        .eq('id', id);

    if (error) {
        console.error('Error deleting weekly activity:', error);
        return { error: error.message };
    }

    revalidatePath('/cultos');
    revalidatePath('/en-vivo');

    return { success: true };
}

// Reorder weekly activities
export async function reorderWeeklyActivities(activities: { id: string; display_order: number }[]) {
    const supabase = await createClient();

    // Check if user is admin
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        return { error: 'No autenticado' };
    }

    const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();

    if (profile?.role !== 'admin') {
        return { error: 'No autorizado' };
    }

    // Update each activity's display_order
    for (const activity of activities) {
        await supabase
            .from('weekly_activities')
            .update({ display_order: activity.display_order })
            .eq('id', activity.id);
    }

    revalidatePath('/cultos');
    revalidatePath('/en-vivo');

    return { success: true };
}

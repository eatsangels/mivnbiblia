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

    if (profile?.role !== 'admin' && profile?.role !== 'super_admin') {
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
    revalidatePath('/admin/settings');

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
export async function createWeeklyActivity(activity: Omit<WeeklyActivity, 'id' | 'created_at' | 'updated_at'>) {
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

    if (profile?.role !== 'admin' && profile?.role !== 'super_admin') {
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

    if (profile?.role !== 'admin' && profile?.role !== 'super_admin') {
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

    if (profile?.role !== 'admin' && profile?.role !== 'super_admin') {
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

    if (profile?.role !== 'admin' && profile?.role !== 'super_admin') {
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

// Get roles summary
export async function getRolesSummary() {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from('profiles')
        .select('role');

    if (error) {
        console.error('Error fetching roles summary:', error);
        return {};
    }

    const summary: Record<string, number> = {};
    data.forEach((profile) => {
        const role = profile.role || 'member';
        summary[role] = (summary[role] || 0) + 1;
    });

    return summary;
}

// Get users by role
export async function getUsersByRole(role: string = 'admin') {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('role', role)
        .order('full_name', { ascending: true });

    if (error) {
        console.error('Error fetching users by role:', error);
        return [];
    }

    return data || [];
}
// Update role permissions
export async function updateRolePermissions(roleId: string, permissions: any[]) {
    const supabase = await createClient();

    // Check if user is admin or super_admin
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return { error: 'No autenticado' };

    const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();

    if (profile?.role !== 'admin' && profile?.role !== 'super_admin') {
        return { error: 'No autorizado' };
    }

    // We need to find the UUID for the role using the slug
    const { data: roleData } = await supabase
        .from('app_roles')
        .select('id')
        .eq('slug', roleId)
        .single();

    if (!roleData) {
        // Try creating the role if it doesn't exist (optional, but good for simple roles like 'member' if they are missing in app_roles table but exist in logic)
        // For now, let's just error if not found to be safe
        return { error: 'Rol no encontrado en la base de datos' };
    }

    for (const perm of permissions) {
        // Check if a permission record already exists for this role and module
        const { data: existingPerm } = await supabase
            .from('role_permissions')
            .select('id')
            .eq('role_id', roleData.id)
            .eq('module', perm.id)
            .single();

        const payload = {
            role_id: roleData.id,
            module: perm.id,
            can_view: perm.enabled.includes('view'),
            can_create: perm.enabled.includes('create'),
            can_edit: perm.enabled.includes('edit'),
            can_delete: perm.enabled.includes('delete'),
            can_export: perm.enabled.includes('export'),
            updated_at: new Date().toISOString()
        };

        if (existingPerm) {
            const { error: updateErr } = await supabase
                .from('role_permissions')
                .update(payload)
                .eq('id', existingPerm.id);
            if (updateErr) return { error: `Error actualizando: ${updateErr.message}` };
        } else {
            const { error: insertErr } = await supabase
                .from('role_permissions')
                .insert(payload);
            if (insertErr) return { error: `Error insertando: ${insertErr.message}` };
        }
    }

    revalidatePath('/admin/settings');
    return { success: true };
}

// Fetch role permissions
export async function getRolePermissions(roleSlug: string) {
    const supabase = await createClient();

    // Get role ID
    const { data: roleData } = await supabase
        .from('app_roles')
        .select('id')
        .eq('slug', roleSlug)
        .single();

    if (!roleData) return [];

    const { data } = await supabase
        .from('role_permissions')
        .select('*')
        .eq('role_id', roleData.id);

    return data || [];
}

"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

import { Database } from "@/lib/database.types";

// export type SmallGroup = Database['public']['Tables']['small_groups']['Row'];
export interface SmallGroup {
    id: string;
    name: string;
    category: string;
    leader: string;
    description: string | null;
    members_count: number;
    image_url: string | null;
    leader_image_url: string | null;
    schedule: string | null;
    location: string | null;
    is_active: boolean;
    created_at: string;
    updated_at: string;
    latitude?: number | null;
    longitude?: number | null;
    is_location_public?: boolean | null;
}

export interface GroupMember {
    id: string;
    user_id: string;
    group_id: string;
    status: 'pending' | 'approved' | 'rejected';
    role: 'member' | 'leader';
    joined_at: string;
    profile?: {
        full_name: string | null;
        avatar_url: string | null;
        email?: string;
    };
}

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
export async function createSmallGroup(group: {
    name: string;
    category: string;
    leader: string;
    description?: string;
    members_count: number;
    image_url?: string;
    leader_image_url?: string;
    schedule?: string;
    location?: string;
    is_active: boolean;
    latitude?: number;
    longitude?: number;
    is_location_public?: boolean;
}) {
    const supabase = await createClient();

    // Check admin
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return { error: 'No autenticado' };

    const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();

    if (profile?.role !== 'admin' && profile?.role !== 'super_admin') return { error: 'No autorizado' };

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
    revalidatePath('/admin/groups');
    revalidatePath('/admin/analytics');
    return { success: true, data };
}

// Update small group
export async function updateSmallGroup(id: string, group: {
    name?: string;
    category?: string;
    leader?: string;
    description?: string;
    members_count?: number;
    image_url?: string;
    leader_image_url?: string;
    schedule?: string;
    location?: string;
    is_active?: boolean;
    latitude?: number;
    longitude?: number;
    is_location_public?: boolean;
}) {
    const supabase = await createClient();

    // Check admin
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return { error: 'No autenticado' };

    const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();

    if (profile?.role !== 'admin' && profile?.role !== 'super_admin') return { error: 'No autorizado' };

    const { error } = await supabase
        .from('small_groups')
        .update(group)
        .eq('id', id);

    if (error) {
        console.error('Error updating small group:', error);
        return { error: error.message };
    }

    revalidatePath('/grupos');
    revalidatePath('/admin/analytics');
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

    if (profile?.role !== 'admin' && profile?.role !== 'super_admin') return { error: 'No autorizado' };

    const { error } = await supabase
        .from('small_groups')
        .delete()
        .eq('id', id);

    if (error) {
        console.error('Error deleting small group:', error);
        return { error: error.message };
    }

    revalidatePath('/grupos');
    revalidatePath('/admin/groups');
    revalidatePath('/admin/analytics');
    return { success: true };
}

// Group Membership Actions

export async function joinGroup(groupId: string) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) return { error: 'Debes iniciar sesión para unirte' };

    const { error } = await supabase
        .from('group_members')
        .insert({
            user_id: user.id,
            group_id: groupId,
            status: 'pending',
            role: 'member'
        });

    if (error) {
        if (error.code === '23505') return { error: 'Ya has solicitado unirte a este grupo' };
        return { error: error.message };
    }

    revalidatePath('/grupos');
    return { success: true };
}

export async function getGroupMembers(groupId: string): Promise<GroupMember[]> {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from('group_members')
        .select(`
            *,
            profile:profiles(full_name, avatar_url)
        `)
        .eq('group_id', groupId)
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching members:', error);
        return [];
    }

    return data as any[] || [];
}

export async function updateMembershipStatus(
    membershipId: string,
    status?: 'approved' | 'rejected',
    role?: 'member' | 'leader'
) {
    const supabase = await createClient();

    // Check permissions
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return { error: 'No autenticado' };

    const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();

    const allowedRoles = ['admin', 'super_admin', 'pastor'];

    if (!profile || !allowedRoles.includes(profile.role || '')) {
        // Leaders can only update status (approve/reject), not assign other leaders
        if (profile?.role === 'leader' && role) {
            return { error: 'Solo Pastores o Administradores pueden asignar líderes' };
        }
        if (profile?.role !== 'leader') {
            return { error: 'No autorizado para gestionar miembros' };
        }
    }

    // Prepare updates
    const updates: any = {};
    if (status) updates.status = status;
    if (role) {
        // Enforce the rule: only admins/pastors can promote
        if (!allowedRoles.includes(profile?.role || '')) {
            return { error: 'Solo Pastores o Administradores pueden asignar líderes' };
        }
        updates.role = role;
    }

    const { error } = await supabase
        .from('group_members')
        .update(updates)
        .eq('id', membershipId);

    if (error) return { error: error.message };

    revalidatePath('/admin/groups');
    revalidatePath('/admin/analytics');
    return { success: true };
}

export async function getUserGroupStatus(groupId: string) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return null;

    const { data } = await supabase
        .from('group_members')
        .select('status')
        .eq('group_id', groupId)
        .eq('user_id', user.id)
        .single();

    return data?.status || null;
}

export async function getPublicMemberLocations(): Promise<any[]> {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from('group_members')
        .select(`
            id,
            group_id,
            profile:profiles(full_name, avatar_url)
        `)
        .eq('status', 'approved');

    if (error) {
        console.error('Error fetching member locations:', error);
        return [];
    }

    return data || [];
}

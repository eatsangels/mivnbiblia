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
    return { success: true };
}

// Get public member locations for community map
export async function getPublicMemberLocations() {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from('profiles')
        .select('id, full_name, avatar_url, latitude, longitude, address')
        .eq('is_location_public', true)
        .not('latitude', 'is', null)
        .not('longitude', 'is', null);

    if (error) {
        console.error('Error fetching member locations:', error);
        return [];
    }

    return data || [];
}

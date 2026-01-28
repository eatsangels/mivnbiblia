"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export type TestimonySubmission = {
    content: string;
    category?: string;
    image?: string;
};

export async function submitTestimony(data: TestimonySubmission) {
    const supabase = await createClient();

    // Get authenticated user
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return { error: 'No autenticado' };

    // Get user profile for name
    const { data: profile } = await supabase
        .from('profiles')
        .select('full_name')
        .eq('id', user.id)
        .single();

    if (!profile) return { error: 'Perfil no encontrado' };

    // Create testimony - using actual table schema
    const { error } = await supabase
        .from('testimonies')
        .insert({
            user_id: user.id,
            full_name: profile.full_name || 'Anónimo', // Mapped from author_name, handle null
            category: data.category || 'Miembro', // Mapped from author_role
            avatar_url: data.image || null, // Mapped from image
            content: data.content,
            is_approved: false,
            featured: false, // Mapped from is_featured
        });

    if (error) return { error: error.message };

    revalidatePath('/dashboard/testimonios');
    revalidatePath('/admin/testimonials');
    return { success: true };
}

export async function getUserTestimonies() {
    const supabase = await createClient();

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return [];

    const { data, error } = await supabase
        .from('testimonies')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching user testimonies:', error);
        return [];
    }

    return data || [];
}

export async function updateTestimony(id: string, data: TestimonySubmission) {
    const supabase = await createClient();

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return { error: 'No autenticado' };

    // Only allow editing if testimony is not approved yet
    const { data: existing } = await supabase
        .from('testimonies')
        .select('is_approved, user_id')
        .eq('id', id)
        .single();

    if (!existing) return { error: 'Testimonio no encontrado' };
    if (existing.user_id !== user.id) return { error: 'No autorizado' };
    if (existing.is_approved) return { error: 'No puedes editar un testimonio ya aprobado' };

    const updateData: any = {
        content: data.content,
        category: data.category || 'Miembro', // Mapped from author_role
    };

    // Only update image if provided
    if (data.image) {
        updateData.avatar_url = data.image; // Mapped from image
    }

    const { error } = await supabase
        .from('testimonies')
        .update(updateData)
        .eq('id', id);

    if (error) return { error: error.message };

    revalidatePath('/dashboard/testimonios');
    return { success: true };
}

export async function deleteTestimony(id: string) {
    const supabase = await createClient();

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return { error: 'No autenticado' };

    // Only allow deleting if testimony is not approved yet
    const { data: existing } = await supabase
        .from('testimonies')
        .select('is_approved, user_id')
        .eq('id', id)
        .single();

    if (!existing) return { error: 'Testimonio no encontrado' };
    if (existing.user_id !== user.id) return { error: 'No autorizado' };
    if (existing.is_approved) return { error: 'No puedes eliminar un testimonio ya aprobado' };

    const { error } = await supabase
        .from('testimonies')
        .delete()
        .eq('id', id);

    if (error) return { error: error.message };

    revalidatePath('/dashboard/testimonios');
    return { success: true };
}

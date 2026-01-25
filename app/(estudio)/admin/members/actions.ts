"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function updateMember(userId: string, data: any) {
    const supabase = await createClient();

    // Check permissions (Admin only)
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        throw new Error("No autenticado");
    }

    // Verify admin role (optional, depending on your auth setup)
    // const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single();
    // if (profile?.role !== 'admin' && profile?.role !== 'pastor') {
    //     throw new Error("No autorizado");
    // }

    const { error } = await (supabase as any)
        .from("profiles")
        .update({
            full_name: data.full_name,
            phone: data.phone,
            role: data.role,
            // ministry: data.ministry, // Uncomment if ministry column exists in profiles, otherwise handle relation
            updated_at: new Date().toISOString(),
        })
        .eq("id", userId);

    if (error) {
        console.error("Error updating member:", error);
        throw new Error("Error al actualizar miembro");
    }

    revalidatePath("/admin/members");
    return { success: true };
}

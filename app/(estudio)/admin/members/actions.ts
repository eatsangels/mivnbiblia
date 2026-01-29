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
            ministry: data.ministry,
            updated_at: new Date().toISOString(),
        })
        .eq("id", userId);

    if (error) {
        console.error("Error updating member:", error);
        return { success: false, error: error.message };
    }

    revalidatePath("/admin/members");
    return { success: true };
}

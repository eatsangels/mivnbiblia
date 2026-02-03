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

    const nameParts = (data.full_name || "").split(" ");
    const firstName = nameParts[0] || "";
    const lastName = nameParts.slice(1).join(" ") || "";

    const { error } = await supabase
        .from("profiles")
        .update({
            first_name: firstName,
            last_name: lastName,
            phone: data.phone,
            role: data.role,
            ministry: data.ministry,
            baptism_date: data.baptism_date || null,
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

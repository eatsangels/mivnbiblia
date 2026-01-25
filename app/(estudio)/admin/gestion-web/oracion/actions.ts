"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function approvePrayerRequest(id: string) {
    const supabase = await createClient();

    const { error } = await (supabase as any)
        .from("prayer_requests")
        .update({ is_approved: true })
        .eq("id", id);

    if (error) {
        console.error("Error approving request:", error);
        return { success: false, message: "Error al aprobar la petición" };
    }

    revalidatePath("/admin/gestion-web/oracion");
    revalidatePath("/oracion");
    return { success: true, message: "Petición aprobada correctamente" };
}

export async function rejectPrayerRequest(id: string) {
    const supabase = await createClient();

    const { error } = await (supabase as any)
        .from("prayer_requests")
        .delete()
        .eq("id", id);

    if (error) {
        console.error("Error deleting request:", error);
        return { success: false, message: "Error al eliminar la petición" };
    }

    revalidatePath("/admin/gestion-web/oracion");
    return { success: true, message: "Petición eliminada correctamente" };
}

export async function toggleAnswered(id: string, currentState: boolean) {
    const supabase = await createClient();

    const { error } = await (supabase as any)
        .from("prayer_requests")
        .update({ is_answered: !currentState })
        .eq("id", id);

    if (error) {
        return { success: false, message: "Error al actualizar estado" };
    }

    revalidatePath("/admin/gestion-web/oracion");
    revalidatePath("/oracion");
    return { success: true };
}

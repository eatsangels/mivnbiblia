"use server";

import { createClient } from "@/lib/supabase/server";
import { approveComment, deleteComment } from "@/lib/queries/comments";
import { revalidatePath } from "next/cache";

export async function handleApproveComment(commentId: string) {
    console.log("DEBUG [Final]: handleApproveComment iniciado para ID:", commentId);
    try {
        await approveComment(commentId);
        console.log("DEBUG [Final]: Aprobación completada en el servidor");
        revalidatePath("/admin/gestion-web/comentarios");
    } catch (error: any) {
        console.error("DEBUG [Final Error]:", error);
        throw new Error(error.message || "Error al aprobar el comentario");
    }
}

export async function handleDeleteComment(commentId: string) {
    try {
        await deleteComment(commentId);
        revalidatePath("/admin/gestion-web/comentarios");
    } catch (error) {
        console.error("Error deleting comment:", error);
        throw new Error("No se pudo eliminar el comentario");
    }
}

import { createClient } from "@/lib/supabase/server";
import { cache } from "react";

export type Comment = {
    id: string;
    content_type: 'devotional' | 'event' | 'resource' | 'bulletin' | 'page';
    content_id: string;
    user_id: string | null;
    author_name: string;
    comment: string;
    parent_id: string | null;
    is_approved: boolean;
    created_at: string;
    updated_at: string;
};

// ... imports ...

/**
 * Get comments for a specific content item
 */
export const getComments = cache(async (contentType: string, contentId: string) => {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from("comments")
        .select("*")
        .eq("content_type", contentType)
        .eq("content_id", contentId)
        .eq("is_approved", true)
        .is("parent_id", null) // Only top-level comments
        .order("created_at", { ascending: false });

    if (error) throw error;
    return (data || []) as unknown as Comment[];
});

/**
 * Get replies to a comment
 */
export const getCommentReplies = cache(async (parentId: string) => {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from("comments")
        .select("*")
        .eq("parent_id", parentId)
        .eq("is_approved", true)
        .order("created_at", { ascending: true });

    if (error) throw error;
    return (data || []) as unknown as Comment[];
});

/**
 * Submit a new comment
 */
export async function submitComment(data: {
    content_type: string;
    content_id: string;
    author_name: string;
    comment: string;
    parent_id?: string;
}) {
    const supabase = await createClient();

    const { data: { user } } = await supabase.auth.getUser();

    const { error } = await (supabase as any)
        .from("comments")
        .insert({
            content_type: data.content_type,
            content_id: data.content_id,
            user_id: user?.id || null,
            author_name: data.author_name,
            comment: data.comment,
            parent_id: data.parent_id || null,
            is_approved: false, // Requires admin approval
        });

    if (error) throw error;
}

/**
 * Approve a comment
 */
export async function approveComment(commentId: string) {
    const supabase = await createClient();

    const { data, error } = await (supabase as any)
        .from("comments")
        .update({ is_approved: true })
        .eq("id", commentId)
        .select();

    if (error) throw error;

    if (!data || data.length === 0) {
        throw new Error("No tienes permisos suficientes para aprobar este comentario (RLS)");
    }
}

/**
 * Delete a comment
 */
export async function deleteComment(commentId: string) {
    const supabase = await createClient();
    const { error } = await (supabase as any)
        .from("comments")
        .delete()
        .eq("id", commentId);

    if (error) throw error;
}

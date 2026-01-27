import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { Check, X, MessageCircle } from "lucide-react";
import { handleApproveComment, handleDeleteComment } from "./actions";

import { Database } from "@/lib/database.types";

export default async function ComentariosAdminPage() {
    type CommentWithProfile = Database['public']['Tables']['comments']['Row'] & {
        profiles: {
            full_name: string | null;
        } | null;
    };

    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect('/login');
    }

    const { data: commentsRaw } = await supabase
        .from("comments")
        .select("*, profiles(full_name)")
        .order("created_at", { ascending: false });

    const comments = (commentsRaw || []) as unknown as CommentWithProfile[];

    const pending = comments?.filter(c => !c.is_approved) || [];
    const approved = comments?.filter(c => c.is_approved) || [];

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-playfair font-bold text-slate-900 dark:text-white">
                        Comentarios
                    </h1>
                    <p className="text-slate-600 dark:text-slate-400 mt-2">
                        Modera y aprueba comentarios
                    </p>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white dark:bg-slate-900/50 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-mivn-blue/10 flex items-center justify-center">
                            <MessageCircle className="w-6 h-6 text-mivn-blue" />
                        </div>
                        <div>
                            <p className="text-sm text-slate-600 dark:text-slate-400">Total</p>
                            <p className="text-2xl font-bold text-slate-900 dark:text-white">
                                {comments?.length || 0}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="bg-white dark:bg-slate-900/50 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-yellow-500/10 flex items-center justify-center">
                            <span className="text-2xl">⏳</span>
                        </div>
                        <div>
                            <p className="text-sm text-slate-600 dark:text-slate-400">Pendientes</p>
                            <p className="text-2xl font-bold text-slate-900 dark:text-white">
                                {pending.length}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="bg-white dark:bg-slate-900/50 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center">
                            <span className="text-2xl">✅</span>
                        </div>
                        <div>
                            <p className="text-sm text-slate-600 dark:text-slate-400">Aprobados</p>
                            <p className="text-2xl font-bold text-slate-900 dark:text-white">
                                {approved.length}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Pending Comments */}
            {pending.length > 0 && (
                <div className="space-y-4">
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                        Comentarios Pendientes
                    </h2>
                    <div className="space-y-4">
                        {pending.map((comment) => (
                            <div key={comment.id} className="bg-yellow-50 dark:bg-yellow-900/10 rounded-2xl p-6 border border-yellow-200 dark:border-yellow-800">
                                <div className="flex items-start justify-between gap-4">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-2">
                                            {comment.profiles?.full_name || 'Usuario Anónimo'}
                                            <span className="text-sm text-slate-500 dark:text-slate-400">
                                                {comment.created_at ? new Date(comment.created_at).toLocaleDateString('es-ES') : ''}
                                            </span>
                                            <span className="px-2 py-1 rounded-full text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                                                {comment.content_type === 'devotional' ? 'Devocional' : 'General'}
                                            </span>
                                        </div>
                                        <p className="text-slate-700 dark:text-slate-300">
                                            {comment.comment}
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <form action={handleApproveComment.bind(null, comment.id)}>
                                            <button type="submit" className="p-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors">
                                                <Check className="w-5 h-5" />
                                            </button>
                                        </form>
                                        <form action={handleDeleteComment.bind(null, comment.id)}>
                                            <button type="submit" className="p-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors">
                                                <X className="w-5 h-5" />
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Approved Comments */}
            <div className="space-y-4">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                    Comentarios Aprobados
                </h2>
                <div className="bg-white dark:bg-slate-900/50 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
                    {approved.length > 0 ? (
                        <div className="divide-y divide-slate-200 dark:divide-slate-800">
                            {approved.map((comment) => (
                                <div key={comment.id} className="p-6 hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                                    <div className="flex items-center justify-between gap-4">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-2">
                                                <p className="font-bold text-slate-900 dark:text-white">
                                                    {comment.profiles?.full_name || 'Usuario Anónimo'}
                                                </p>
                                                <span className="text-sm text-slate-500 dark:text-slate-400">
                                                    {comment.created_at ? new Date(comment.created_at).toLocaleDateString('es-ES') : ''}
                                                </span>
                                                <span className="px-2 py-1 rounded-full text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                                                    {comment.content_type === 'devotional' ? 'Devocional' : 'General'}
                                                </span>
                                            </div>
                                            <p className="text-slate-700 dark:text-slate-300">
                                                {comment.comment}
                                            </p>
                                        </div>
                                        <div>
                                            <form action={handleDeleteComment.bind(null, comment.id)}>
                                                <button type="submit" className="p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors text-slate-400 hover:text-red-500">
                                                    <X className="w-5 h-5" />
                                                </button>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <p className="text-slate-500 dark:text-slate-400">
                                No hay comentarios aprobados
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

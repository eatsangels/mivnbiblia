import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Plus, Pencil, Trash2, BookOpen, Calendar } from "lucide-react";

import { Database } from "@/lib/database.types";

export default async function DevotionalsAdminPage() {
    type DevotionalRow = Database['public']['Tables']['devotionals']['Row'];
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect('/login');
    }

    const { data: devotionalsRaw } = await supabase
        .from("devotionals")
        .select("*")
        .order("date", { ascending: false });

    const devotionals = (devotionalsRaw || []) as DevotionalRow[];

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-playfair font-bold text-slate-900 dark:text-white">
                        Devocionales
                    </h1>
                    <p className="text-slate-600 dark:text-slate-400 mt-2">
                        Gestiona los devocionales diarios
                    </p>
                </div>
                <Link
                    href="/admin/gestion-web/devocionales/nuevo"
                    className="inline-flex items-center gap-2 bg-mivn-blue text-white px-6 py-3 rounded-xl font-semibold hover:bg-mivn-blue/90 transition-all shadow-lg shadow-mivn-blue/20"
                >
                    <Plus className="w-5 h-5" />
                    Nuevo Devocional
                </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white dark:bg-slate-900/50 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-mivn-blue/10 flex items-center justify-center">
                            <BookOpen className="w-6 h-6 text-mivn-blue" />
                        </div>
                        <div>
                            <p className="text-sm text-slate-600 dark:text-slate-400">Total</p>
                            <p className="text-2xl font-bold text-slate-900 dark:text-white">
                                {devotionals?.length || 0}
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
                            <p className="text-sm text-slate-600 dark:text-slate-400">Publicados</p>
                            <p className="text-2xl font-bold text-slate-900 dark:text-white">
                                {devotionals?.length || 0}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="bg-white dark:bg-slate-900/50 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-yellow-500/10 flex items-center justify-center">
                            <span className="text-2xl">📝</span>
                        </div>
                        <div>
                            <p className="text-sm text-slate-600 dark:text-slate-400">Borradores</p>
                            <p className="text-2xl font-bold text-slate-900 dark:text-white">
                                0
                            </p>
                        </div>
                    </div>
                </div>

                <div className="bg-white dark:bg-slate-900/50 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center">
                            <Calendar className="w-6 h-6 text-purple-500" />
                        </div>
                        <div>
                            <p className="text-sm text-slate-600 dark:text-slate-400">Este Mes</p>
                            <p className="text-2xl font-bold text-slate-900 dark:text-white">
                                {devotionals?.filter(d => {
                                    const date = new Date(d.date);
                                    const now = new Date();
                                    return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
                                }).length || 0}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Table */}
            <div className="bg-white dark:bg-slate-900/50 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
                            <tr>
                                <th className="text-left px-6 py-4 text-sm font-bold text-slate-900 dark:text-white">
                                    Devocional
                                </th>
                                <th className="text-left px-6 py-4 text-sm font-bold text-slate-900 dark:text-white">
                                    Autor
                                </th>
                                <th className="text-left px-6 py-4 text-sm font-bold text-slate-900 dark:text-white">
                                    Fecha
                                </th>
                                <th className="text-left px-6 py-4 text-sm font-bold text-slate-900 dark:text-white">
                                    Estado
                                </th>
                                <th className="text-right px-6 py-4 text-sm font-bold text-slate-900 dark:text-white">
                                    Acciones
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                            {devotionals?.map((devotional) => (
                                <tr key={devotional.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                                    <td className="px-6 py-4">
                                        <div>
                                            <p className="font-semibold text-slate-900 dark:text-white">
                                                {devotional.title}
                                            </p>
                                            <p className="text-sm text-slate-500 dark:text-slate-400">
                                                {devotional.slug}
                                            </p>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <p className="text-slate-900 dark:text-white">
                                            {devotional.author}
                                        </p>
                                    </td>
                                    <td className="px-6 py-4">
                                        <p className="text-slate-900 dark:text-white">
                                            {new Date(devotional.date).toLocaleDateString('es-ES', {
                                                day: 'numeric',
                                                month: 'short',
                                                year: 'numeric'
                                            })}
                                        </p>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400">
                                            <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                                            Publicado
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center justify-end gap-2">
                                            <Link
                                                href={`/admin/gestion-web/devocionales/${devotional.id}`}
                                                className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors text-slate-600 dark:text-slate-400 hover:text-mivn-blue"
                                            >
                                                <Pencil className="w-4 h-4" />
                                            </Link>
                                            <button
                                                className="p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors text-slate-600 dark:text-slate-400 hover:text-red-600"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {(!devotionals || devotionals.length === 0) && (
                    <div className="text-center py-12">
                        <p className="text-slate-500 dark:text-slate-400">
                            No hay devocionales registrados
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}

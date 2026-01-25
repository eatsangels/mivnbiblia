import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Plus, Pencil, Trash2, FileText, Calendar } from "lucide-react";

import { Database } from "@/lib/database.types";

export default async function BoletinesAdminPage() {
    type BulletinRow = Database['public']['Tables']['bulletins']['Row'];
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect('/login');
    }

    const { data: bulletinsRaw } = await supabase
        .from("bulletins")
        .select("*")
        .order("publish_date", { ascending: false });

    const bulletins = (bulletinsRaw || []) as BulletinRow[];

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-playfair font-bold text-slate-900 dark:text-white">
                        Boletines
                    </h1>
                    <p className="text-slate-600 dark:text-slate-400 mt-2">
                        Gestiona los boletines semanales
                    </p>
                </div>
                <Link
                    href="/admin/gestion-web/boletines/nuevo"
                    className="inline-flex items-center gap-2 bg-mivn-blue text-white px-6 py-3 rounded-xl font-semibold hover:bg-mivn-blue/90 transition-all shadow-lg shadow-mivn-blue/20"
                >
                    <Plus className="w-5 h-5" />
                    Nuevo Boletín
                </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white dark:bg-slate-900/50 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-mivn-blue/10 flex items-center justify-center">
                            <FileText className="w-6 h-6 text-mivn-blue" />
                        </div>
                        <div>
                            <p className="text-sm text-slate-600 dark:text-slate-400">Total</p>
                            <p className="text-2xl font-bold text-slate-900 dark:text-white">
                                {bulletins?.length || 0}
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
                                {bulletins?.filter(b => b.is_published).length || 0}
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
                                {bulletins?.filter(b => {
                                    if (!b.publish_date) return false;
                                    const date = new Date(b.publish_date);
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
                                    Boletín
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
                            {bulletins?.map((bulletin) => (
                                <tr key={bulletin.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                                    <td className="px-6 py-4">
                                        <div>
                                            <p className="font-semibold text-slate-900 dark:text-white">
                                                {bulletin.title}
                                            </p>
                                            <p className="text-sm text-slate-500 dark:text-slate-400">
                                                {bulletin.id}
                                            </p>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <p className="text-slate-900 dark:text-white">
                                            {bulletin.publish_date ? new Date(bulletin.publish_date).toLocaleDateString('es-ES', {
                                                day: 'numeric',
                                                month: 'short',
                                                year: 'numeric'
                                            }) : 'No publicado'}
                                        </p>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${bulletin.is_published
                                            ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                                            : 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400'
                                            }`}>
                                            <span className={`w-1.5 h-1.5 rounded-full ${bulletin.is_published ? 'bg-green-500' : 'bg-yellow-500'
                                                }`} />
                                            {bulletin.is_published ? 'Publicado' : 'Borrador'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center justify-end gap-2">
                                            <Link
                                                href={`/admin/gestion-web/boletines/${bulletin.id}`}
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

                {(!bulletins || bulletins.length === 0) && (
                    <div className="text-center py-12">
                        <p className="text-slate-500 dark:text-slate-400">
                            No hay boletines registrados
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}

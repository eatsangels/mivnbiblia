import { createClient } from "@/lib/supabase/server";
import { getAdminMinistries } from "@/lib/queries/ministries";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Plus, Pencil, Trash2, Users } from "lucide-react";

export default async function MinistriesAdminPage() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect('/login');
    }

    const ministries = await getAdminMinistries();

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-playfair font-bold text-slate-900 dark:text-white">
                        Ministerios
                    </h1>
                    <p className="text-slate-600 dark:text-slate-400 mt-2">
                        Gestiona los ministerios de la iglesia
                    </p>
                </div>
                <Link
                    href="/admin/gestion-web/ministerios/nuevo"
                    className="inline-flex items-center gap-2 bg-mivn-blue text-white px-6 py-3 rounded-xl font-semibold hover:bg-mivn-blue/90 transition-all shadow-lg shadow-mivn-blue/20"
                >
                    <Plus className="w-5 h-5" />
                    Nuevo Ministerio
                </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white dark:bg-slate-900/50 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-mivn-blue/10 flex items-center justify-center">
                            <Users className="w-6 h-6 text-mivn-blue" />
                        </div>
                        <div>
                            <p className="text-sm text-slate-600 dark:text-slate-400">Total Ministerios</p>
                            <p className="text-2xl font-bold text-slate-900 dark:text-white">{ministries.length}</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white dark:bg-slate-900/50 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center">
                            <span className="text-2xl">✅</span>
                        </div>
                        <div>
                            <p className="text-sm text-slate-600 dark:text-slate-400">Activos</p>
                            <p className="text-2xl font-bold text-slate-900 dark:text-white">
                                {ministries.filter(m => m.is_active).length}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="bg-white dark:bg-slate-900/50 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-slate-500/10 flex items-center justify-center">
                            <span className="text-2xl">⏸️</span>
                        </div>
                        <div>
                            <p className="text-sm text-slate-600 dark:text-slate-400">Inactivos</p>
                            <p className="text-2xl font-bold text-slate-900 dark:text-white">
                                {ministries.filter(m => !m.is_active).length}
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
                                    Ministerio
                                </th>
                                <th className="text-left px-6 py-4 text-sm font-bold text-slate-900 dark:text-white">
                                    Líder
                                </th>
                                <th className="text-left px-6 py-4 text-sm font-bold text-slate-900 dark:text-white">
                                    Horario
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
                            {ministries.map((ministry) => (
                                <tr key={ministry.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            {ministry.image && (
                                                <img
                                                    src={ministry.image}
                                                    alt={ministry.name}
                                                    className="w-10 h-10 rounded-lg object-cover"
                                                />
                                            )}
                                            <div>
                                                <p className="font-semibold text-slate-900 dark:text-white">
                                                    {ministry.name}
                                                </p>
                                                <p className="text-sm text-slate-500 dark:text-slate-400">
                                                    {ministry.slug}
                                                </p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <p className="text-slate-900 dark:text-white">{ministry.leader_name || '-'}</p>
                                        {ministry.leader_email && (
                                            <p className="text-sm text-slate-500 dark:text-slate-400">
                                                {ministry.leader_email}
                                            </p>
                                        )}
                                    </td>
                                    <td className="px-6 py-4">
                                        <p className="text-slate-900 dark:text-white">
                                            {ministry.meeting_day ? `${ministry.meeting_day}${ministry.meeting_time ? ` ${ministry.meeting_time}` : ''}` : '-'}
                                        </p>
                                        {ministry.location && (
                                            <p className="text-sm text-slate-500 dark:text-slate-400">
                                                {ministry.location}
                                            </p>
                                        )}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${ministry.is_active
                                            ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                                            : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                                            }`}>
                                            <span className={`w-1.5 h-1.5 rounded-full ${ministry.is_active ? 'bg-green-500' : 'bg-slate-400'
                                                }`} />
                                            {ministry.is_active ? 'Activo' : 'Inactivo'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center justify-end gap-2">
                                            <Link
                                                href={`/admin/gestion-web/ministerios/${ministry.id}`}
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

                {ministries.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-slate-500 dark:text-slate-400">
                            No hay ministerios registrados
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}

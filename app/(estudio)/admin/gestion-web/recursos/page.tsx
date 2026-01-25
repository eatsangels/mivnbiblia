import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Plus, Pencil, Trash2, FileText, Folder } from "lucide-react";

export default async function RecursosAdminPage() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect('/login');
    }

    const { data: resources } = await supabase
        .from("resources")
        .select(`
            *,
            resource_categories (
                id,
                name
            )
        `)
        .order("created_at", { ascending: false });

    const { data: categories } = await supabase
        .from("resource_categories")
        .select("*")
        .order("name");

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-playfair font-bold text-slate-900 dark:text-white">
                        Recursos
                    </h1>
                    <p className="text-slate-600 dark:text-slate-400 mt-2">
                        Gestiona recursos descargables
                    </p>
                </div>
                <div className="flex items-center gap-4">
                    <Link
                        href="/admin/gestion-web/recursos/categorias"
                        className="inline-flex items-center gap-2 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white px-6 py-3 rounded-xl font-semibold hover:bg-slate-200 dark:hover:bg-slate-700 transition-all"
                    >
                        <Folder className="w-5 h-5" />
                        Categorías
                    </Link>
                    <Link
                        href="/admin/gestion-web/recursos/nuevo"
                        className="inline-flex items-center gap-2 bg-mivn-blue text-white px-6 py-3 rounded-xl font-semibold hover:bg-mivn-blue/90 transition-all shadow-lg shadow-mivn-blue/20"
                    >
                        <Plus className="w-5 h-5" />
                        Nuevo Recurso
                    </Link>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white dark:bg-slate-900/50 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-mivn-blue/10 flex items-center justify-center">
                            <FileText className="w-6 h-6 text-mivn-blue" />
                        </div>
                        <div>
                            <p className="text-sm text-slate-600 dark:text-slate-400">Total</p>
                            <p className="text-2xl font-bold text-slate-900 dark:text-white">
                                {resources?.length || 0}
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
                                {resources?.filter(r => r.is_published).length || 0}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="bg-white dark:bg-slate-900/50 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center">
                            <span className="text-2xl">⭐</span>
                        </div>
                        <div>
                            <p className="text-sm text-slate-600 dark:text-slate-400">Destacados</p>
                            <p className="text-2xl font-bold text-slate-900 dark:text-white">
                                {resources?.filter(r => r.is_featured).length || 0}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="bg-white dark:bg-slate-900/50 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center">
                            <Folder className="w-6 h-6 text-orange-500" />
                        </div>
                        <div>
                            <p className="text-sm text-slate-600 dark:text-slate-400">Categorías</p>
                            <p className="text-2xl font-bold text-slate-900 dark:text-white">
                                {categories?.length || 0}
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
                                    Recurso
                                </th>
                                <th className="text-left px-6 py-4 text-sm font-bold text-slate-900 dark:text-white">
                                    Categoría
                                </th>
                                <th className="text-left px-6 py-4 text-sm font-bold text-slate-900 dark:text-white">
                                    Tipo
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
                            {resources?.map((resource) => (
                                <tr key={resource.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            {resource.thumbnail && (
                                                <img
                                                    src={resource.thumbnail}
                                                    alt={resource.title}
                                                    className="w-10 h-10 rounded-lg object-cover"
                                                />
                                            )}
                                            <div>
                                                <p className="font-semibold text-slate-900 dark:text-white">
                                                    {resource.title}
                                                </p>
                                                <p className="text-sm text-slate-500 dark:text-slate-400">
                                                    {resource.slug}
                                                </p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                                            {resource.resource_categories?.name || 'Sin categoría'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <p className="text-slate-900 dark:text-white uppercase text-sm">
                                            {resource.file_type}
                                        </p>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${resource.is_published
                                                ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                                                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                                                }`}>
                                                {resource.is_published ? 'Publicado' : 'Borrador'}
                                            </span>
                                            {resource.is_featured && (
                                                <span className="text-yellow-500">⭐</span>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center justify-end gap-2">
                                            <Link
                                                href={`/admin/gestion-web/recursos/${resource.id}`}
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

                {(!resources || resources.length === 0) && (
                    <div className="text-center py-12">
                        <p className="text-slate-500 dark:text-slate-400">
                            No hay recursos registrados
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}

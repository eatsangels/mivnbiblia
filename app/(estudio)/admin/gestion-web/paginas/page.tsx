import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { getAdminPages } from "@/lib/queries/pages";
import { Plus, Pencil, Trash2, FileText, Globe, Eye } from "lucide-react";
import Link from "next/link";

export default async function PaginasAdminPage() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect('/login');
    }

    const pages = await getAdminPages();

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-playfair font-bold text-slate-900 dark:text-white">
                        Páginas
                    </h1>
                    <p className="text-slate-600 dark:text-slate-400 mt-2">
                        Administra el contenido de las páginas del sitio
                    </p>
                </div>
                <button className="inline-flex items-center gap-2 bg-mivn-blue text-white px-6 py-3 rounded-xl font-semibold hover:bg-mivn-blue/90 transition-all shadow-lg shadow-mivn-blue/20">
                    <Plus className="w-5 h-5" />
                    Nueva Página
                </button>
            </div>

            {/* Pages Table */}
            <div className="bg-white dark:bg-slate-900/50 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
                            <tr>
                                <th className="text-left px-6 py-4 text-sm font-bold text-slate-900 dark:text-white">
                                    Título / Slug
                                </th>
                                <th className="text-left px-6 py-4 text-sm font-bold text-slate-900 dark:text-white">
                                    Estado
                                </th>
                                <th className="text-left px-6 py-4 text-sm font-bold text-slate-900 dark:text-white">
                                    Última Modificación
                                </th>
                                <th className="text-right px-6 py-4 text-sm font-bold text-slate-900 dark:text-white">
                                    Acciones
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                            {pages.map((page) => (
                                <tr key={page.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                                                <FileText className="w-5 h-5 text-slate-500" />
                                            </div>
                                            <div>
                                                <p className="font-semibold text-slate-900 dark:text-white">
                                                    {page.title}
                                                </p>
                                                <p className="text-sm text-slate-500 font-mono">
                                                    /{page.slug}
                                                </p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${page.is_published
                                            ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                                            : 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400'
                                            }`}>
                                            <span className={`w-1.5 h-1.5 rounded-full ${page.is_published ? 'bg-green-500' : 'bg-yellow-500'
                                                }`} />
                                            {page.is_published ? 'Publicada' : 'Borrador'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <p className="text-sm text-slate-600 dark:text-slate-400">
                                            {new Date(page.updated_at).toLocaleDateString('es-ES', {
                                                day: 'numeric',
                                                month: 'short',
                                                year: 'numeric',
                                                hour: '2-digit',
                                                minute: '2-digit'
                                            })}
                                        </p>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center justify-end gap-2">
                                            <a
                                                href={`/${page.slug}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-500 hover:text-mivn-blue transition-colors"
                                            >
                                                <Eye className="w-4 h-4" />
                                            </a>
                                            <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-500 hover:text-mivn-blue transition-colors">
                                                <Pencil className="w-4 h-4" />
                                            </button>
                                            <button className="p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg text-slate-500 hover:text-red-500 transition-colors">
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Info Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
                    <h3 className="font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-3">
                        <Globe className="w-5 h-5 text-mivn-blue" />
                        Páginas Estáticas
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                        Estas páginas contienen contenido que no cambia frecuentemente, como la página de "Sobre Nosotros" o "Creencias". Puedes editar el texto y las imágenes directamente.
                    </p>
                </div>
                <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
                    <h3 className="font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-3">
                        <FileText className="w-5 h-5 text-mivn-gold" />
                        Páginas Dinámicas
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                        Páginas como el listado de ministerios o recursos obtienen sus datos automáticamente de otras secciones del panel. El editor de páginas controla el diseño y la información general.
                    </p>
                </div>
            </div>
        </div>
    );
}

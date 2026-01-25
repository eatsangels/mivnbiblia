import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { getResourceCategories } from "@/lib/queries/resources";
import { createResource } from "../actions";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default async function NewResourcePage() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect('/login');
    }

    const categories = await getResourceCategories();

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex items-center gap-4">
                <Link
                    href="/admin/gestion-web/recursos"
                    className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                >
                    <ArrowLeft className="w-5 h-5" />
                </Link>
                <div>
                    <h1 className="text-3xl font-playfair font-bold text-slate-900 dark:text-white">
                        Nuevo Recurso
                    </h1>
                    <p className="text-slate-600 dark:text-slate-400 mt-2">
                        Sube un nuevo recurso descargable para la comunidad
                    </p>
                </div>
            </div>

            {/* Form */}
            <div className="bg-white dark:bg-slate-900/50 rounded-2xl border border-slate-200 dark:border-slate-800 p-8">
                <form action={createResource} className="space-y-6">
                    {/* Title */}
                    <div>
                        <label htmlFor="title" className="block text-sm font-semibold text-slate-900 dark:text-white mb-2">
                            Título del Recurso *
                        </label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            required
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:border-mivn-blue focus:ring-2 focus:ring-mivn-blue/20 outline-none transition-all"
                            placeholder="Ej: Guía de Oración para Niños"
                        />
                    </div>

                    {/* Category */}
                    <div>
                        <label htmlFor="category_id" className="block text-sm font-semibold text-slate-900 dark:text-white mb-2">
                            Categoría *
                        </label>
                        <select
                            id="category_id"
                            name="category_id"
                            required
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:border-mivn-blue focus:ring-2 focus:ring-mivn-blue/20 outline-none transition-all"
                        >
                            <option value="">Selecciona una categoría</option>
                            {categories.map((cat) => (
                                <option key={cat.id} value={cat.id}>
                                    {cat.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Description */}
                    <div>
                        <label htmlFor="description" className="block text-sm font-semibold text-slate-900 dark:text-white mb-2">
                            Descripción *
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            required
                            rows={4}
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:border-mivn-blue focus:ring-2 focus:ring-mivn-blue/20 outline-none transition-all"
                            placeholder="Describe qué contiene este recurso..."
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* File URL */}
                        <div>
                            <label htmlFor="file_url" className="block text-sm font-semibold text-slate-900 dark:text-white mb-2">
                                URL del Archivo (Descarga)
                            </label>
                            <input
                                type="url"
                                id="file_url"
                                name="file_url"
                                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:border-mivn-blue focus:ring-2 focus:ring-mivn-blue/20 outline-none transition-all"
                                placeholder="https://..."
                            />
                        </div>

                        {/* External URL */}
                        <div>
                            <label htmlFor="external_url" className="block text-sm font-semibold text-slate-900 dark:text-white mb-2">
                                URL Externa (Video/Web)
                            </label>
                            <input
                                type="url"
                                id="external_url"
                                name="external_url"
                                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:border-mivn-blue focus:ring-2 focus:ring-mivn-blue/20 outline-none transition-all"
                                placeholder="https://..."
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Thumbnail */}
                        <div>
                            <label htmlFor="thumbnail" className="block text-sm font-semibold text-slate-900 dark:text-white mb-2">
                                URL de Miniatura (Imagen)
                            </label>
                            <input
                                type="url"
                                id="thumbnail"
                                name="thumbnail"
                                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:border-mivn-blue focus:ring-2 focus:ring-mivn-blue/20 outline-none transition-all"
                                placeholder="https://..."
                            />
                        </div>

                        {/* File Type */}
                        <div>
                            <label htmlFor="file_type" className="block text-sm font-semibold text-slate-900 dark:text-white mb-2">
                                Tipo de Archivo
                            </label>
                            <input
                                type="text"
                                id="file_type"
                                name="file_type"
                                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:border-mivn-blue focus:ring-2 focus:ring-mivn-blue/20 outline-none transition-all"
                                placeholder="Ej: PDF, Video, MP3"
                            />
                        </div>
                    </div>

                    <div className="flex flex-col gap-4">
                        {/* Featured Toggle */}
                        <div className="flex items-center gap-3">
                            <input
                                type="checkbox"
                                id="is_featured"
                                name="is_featured"
                                className="w-5 h-5 rounded border-slate-300 text-mivn-blue focus:ring-mivn-blue"
                            />
                            <label htmlFor="is_featured" className="text-sm font-semibold text-slate-900 dark:text-white">
                                Destacar recurso (aparecerá en la parte superior)
                            </label>
                        </div>

                        {/* Published Toggle */}
                        <div className="flex items-center gap-3">
                            <input
                                type="checkbox"
                                id="is_published"
                                name="is_published"
                                defaultChecked
                                className="w-5 h-5 rounded border-slate-300 text-mivn-blue focus:ring-mivn-blue"
                            />
                            <label htmlFor="is_published" className="text-sm font-semibold text-slate-900 dark:text-white">
                                Publicar inmediatamente
                            </label>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-4 pt-6 border-t border-slate-200 dark:border-slate-800">
                        <button
                            type="submit"
                            className="bg-mivn-blue text-white px-8 py-3 rounded-xl font-semibold hover:bg-mivn-blue/90 transition-all shadow-lg shadow-mivn-blue/20"
                        >
                            Crear Recurso
                        </button>
                        <Link
                            href="/admin/gestion-web/recursos"
                            className="px-8 py-3 rounded-xl font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
                        >
                            Cancelar
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

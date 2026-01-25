import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { createBulletin } from "../actions";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default async function NewBulletinPage() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect('/login');
    }

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex items-center gap-4">
                <Link
                    href="/admin/gestion-web/boletines"
                    className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                >
                    <ArrowLeft className="w-5 h-5" />
                </Link>
                <div>
                    <h1 className="text-3xl font-playfair font-bold text-slate-900 dark:text-white">
                        Nuevo Boletín
                    </h1>
                    <p className="text-slate-600 dark:text-slate-400 mt-2">
                        Publica un nuevo boletín semanal
                    </p>
                </div>
            </div>

            {/* Form */}
            <div className="bg-white dark:bg-slate-900/50 rounded-2xl border border-slate-200 dark:border-slate-800 p-8">
                <form action={createBulletin} className="space-y-6">
                    {/* Title */}
                    <div>
                        <label htmlFor="title" className="block text-sm font-semibold text-slate-900 dark:text-white mb-2">
                            Título del Boletín *
                        </label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            required
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:border-mivn-blue focus:ring-2 focus:ring-mivn-blue/20 outline-none transition-all"
                            placeholder="Ej: Boletín Semanal - 24 de Enero 2026"
                        />
                    </div>

                    {/* Content */}
                    <div>
                        <label htmlFor="content" className="block text-sm font-semibold text-slate-900 dark:text-white mb-2">
                            Contenido General *
                        </label>
                        <textarea
                            id="content"
                            name="content"
                            required
                            rows={8}
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:border-mivn-blue focus:ring-2 focus:ring-mivn-blue/20 outline-none transition-all"
                            placeholder="Resumen o anuncios principales del boletín..."
                        />
                    </div>

                    {/* Publish Date */}
                    <div>
                        <label htmlFor="publish_date" className="block text-sm font-semibold text-slate-900 dark:text-white mb-2">
                            Fecha de Publicación *
                        </label>
                        <input
                            type="date"
                            id="publish_date"
                            name="publish_date"
                            required
                            defaultValue={new Date().toISOString().split('T')[0]}
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:border-mivn-blue focus:ring-2 focus:ring-mivn-blue/20 outline-none transition-all"
                        />
                    </div>

                    {/* PDF URL */}
                    <div>
                        <label htmlFor="pdf_url" className="block text-sm font-semibold text-slate-900 dark:text-white mb-2">
                            Link al PDF (Opcional)
                        </label>
                        <input
                            type="url"
                            id="pdf_url"
                            name="pdf_url"
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:border-mivn-blue focus:ring-2 focus:ring-mivn-blue/20 outline-none transition-all"
                            placeholder="https://ejemplo.com/boletin.pdf"
                        />
                        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                            Link directo al archivo PDF hospedado en Supabase Storage
                        </p>
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

                    {/* Actions */}
                    <div className="flex items-center gap-4 pt-6 border-t border-slate-200 dark:border-slate-800">
                        <button
                            type="submit"
                            className="bg-mivn-blue text-white px-8 py-3 rounded-xl font-semibold hover:bg-mivn-blue/90 transition-all shadow-lg shadow-mivn-blue/20"
                        >
                            Crear Boletín
                        </button>
                        <Link
                            href="/admin/gestion-web/boletines"
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

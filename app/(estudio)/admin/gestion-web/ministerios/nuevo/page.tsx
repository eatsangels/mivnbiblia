import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { createMinistry } from "../actions";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default async function NewMinistryPage() {
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
                    href="/admin/gestion-web/ministerios"
                    className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                >
                    <ArrowLeft className="w-5 h-5" />
                </Link>
                <div>
                    <h1 className="text-3xl font-playfair font-bold text-slate-900 dark:text-white">
                        Nuevo Ministerio
                    </h1>
                    <p className="text-slate-600 dark:text-slate-400 mt-2">
                        Crea un nuevo ministerio para la iglesia
                    </p>
                </div>
            </div>

            {/* Form */}
            <div className="bg-white dark:bg-slate-900/50 rounded-2xl border border-slate-200 dark:border-slate-800 p-8">
                <form action={createMinistry} className="space-y-6">
                    {/* Name */}
                    <div>
                        <label htmlFor="name" className="block text-sm font-semibold text-slate-900 dark:text-white mb-2">
                            Nombre del Ministerio *
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            required
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:border-mivn-blue focus:ring-2 focus:ring-mivn-blue/20 outline-none transition-all"
                            placeholder="Ej: Ministerio de Jóvenes"
                        />
                        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                            El slug se generará automáticamente
                        </p>
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
                            placeholder="Describe el propósito y actividades del ministerio..."
                        />
                    </div>

                    {/* Leader */}
                    <div>
                        <label htmlFor="leader_name" className="block text-sm font-semibold text-slate-900 dark:text-white mb-2">
                            Líder
                        </label>
                        <input
                            type="text"
                            id="leader_name"
                            name="leader_name"
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:border-mivn-blue focus:ring-2 focus:ring-mivn-blue/20 outline-none transition-all"
                            placeholder="Nombre del líder del ministerio"
                        />
                    </div>

                    {/* Contact Email */}
                    <div>
                        <label htmlFor="leader_email" className="block text-sm font-semibold text-slate-900 dark:text-white mb-2">
                            Email de Contacto
                        </label>
                        <input
                            type="email"
                            id="leader_email"
                            name="leader_email"
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:border-mivn-blue focus:ring-2 focus:ring-mivn-blue/20 outline-none transition-all"
                            placeholder="contacto@ejemplo.com"
                        />
                    </div>

                    {/* Meeting Day */}
                    <div>
                        <label htmlFor="meeting_day" className="block text-sm font-semibold text-slate-900 dark:text-white mb-2">
                            Día de Reunión
                        </label>
                        <input
                            type="text"
                            id="meeting_day"
                            name="meeting_day"
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:border-mivn-blue focus:ring-2 focus:ring-mivn-blue/20 outline-none transition-all"
                            placeholder="Ej: Sábados"
                        />
                    </div>

                    {/* Meeting Time */}
                    <div>
                        <label htmlFor="meeting_time" className="block text-sm font-semibold text-slate-900 dark:text-white mb-2">
                            Hora de Reunión
                        </label>
                        <input
                            type="text"
                            id="meeting_time"
                            name="meeting_time"
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:border-mivn-blue focus:ring-2 focus:ring-mivn-blue/20 outline-none transition-all"
                            placeholder="Ej: 4:00 PM"
                        />
                    </div>

                    {/* Location */}
                    <div>
                        <label htmlFor="location" className="block text-sm font-semibold text-slate-900 dark:text-white mb-2">
                            Ubicación
                        </label>
                        <input
                            type="text"
                            id="location"
                            name="location"
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:border-mivn-blue focus:ring-2 focus:ring-mivn-blue/20 outline-none transition-all"
                            placeholder="Ej: Salón de Jóvenes, Edificio B"
                        />
                    </div>

                    {/* Image URL */}
                    <div>
                        <label htmlFor="image" className="block text-sm font-semibold text-slate-900 dark:text-white mb-2">
                            URL de Imagen
                        </label>
                        <input
                            type="url"
                            id="image"
                            name="image"
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:border-mivn-blue focus:ring-2 focus:ring-mivn-blue/20 outline-none transition-all"
                            placeholder="https://ejemplo.com/imagen.jpg"
                        />
                        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                            Puedes usar una URL de Unsplash o subir a Supabase Storage
                        </p>
                    </div>

                    {/* Active Toggle */}
                    <div className="flex items-center gap-3">
                        <input
                            type="checkbox"
                            id="is_active"
                            name="is_active"
                            defaultChecked
                            className="w-5 h-5 rounded border-slate-300 text-mivn-blue focus:ring-mivn-blue"
                        />
                        <label htmlFor="is_active" className="text-sm font-semibold text-slate-900 dark:text-white">
                            Ministerio Activo
                        </label>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-4 pt-6 border-t border-slate-200 dark:border-slate-800">
                        <button
                            type="submit"
                            className="bg-mivn-blue text-white px-8 py-3 rounded-xl font-semibold hover:bg-mivn-blue/90 transition-all shadow-lg shadow-mivn-blue/20"
                        >
                            Crear Ministerio
                        </button>
                        <Link
                            href="/admin/gestion-web/ministerios"
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

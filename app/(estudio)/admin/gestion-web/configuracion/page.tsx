import { createClient } from "@/lib/supabase/server";
import { getSiteSettings } from "@/lib/queries/settings";
import { redirect } from "next/navigation";
import { updateSiteSettings } from "./actions";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";

export default async function ConfiguracionPage() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect('/login');
    }

    const settings = await getSiteSettings();

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex items-center gap-4">
                <Link
                    href="/admin/gestion-web"
                    className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                >
                    <ArrowLeft className="w-5 h-5" />
                </Link>
                <div>
                    <h1 className="text-3xl font-playfair font-bold text-slate-900 dark:text-white">
                        Configuración del Sitio
                    </h1>
                    <p className="text-slate-600 dark:text-slate-400 mt-2">
                        Edita la información general del sitio web
                    </p>
                </div>
            </div>

            {/* Form */}
            <form action={updateSiteSettings} className="space-y-6">
                {/* General Information */}
                <div className="bg-white dark:bg-slate-900/50 rounded-2xl border border-slate-200 dark:border-slate-800 p-8">
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">
                        Información General
                    </h2>
                    <div className="space-y-6">
                        <div>
                            <label htmlFor="site_name" className="block text-sm font-semibold text-slate-900 dark:text-white mb-2">
                                Nombre del Sitio
                            </label>
                            <input
                                type="text"
                                id="site_name"
                                name="site_name"
                                defaultValue={'site_name' in settings ? settings.site_name : ''}
                                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:border-mivn-blue focus:ring-2 focus:ring-mivn-blue/20 outline-none transition-all"
                            />
                        </div>

                        <div>
                            <label htmlFor="site_tagline" className="block text-sm font-semibold text-slate-900 dark:text-white mb-2">
                                Lema/Tagline
                            </label>
                            <input
                                type="text"
                                id="site_tagline"
                                name="site_tagline"
                                defaultValue={'site_tagline' in settings ? settings.site_tagline : ''}
                                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:border-mivn-blue focus:ring-2 focus:ring-mivn-blue/20 outline-none transition-all"
                            />
                        </div>
                    </div>
                </div>

                {/* Contact Information */}
                <div className="bg-white dark:bg-slate-900/50 rounded-2xl border border-slate-200 dark:border-slate-800 p-8">
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">
                        Información de Contacto
                    </h2>
                    <div className="space-y-6">
                        <div>
                            <label htmlFor="address" className="block text-sm font-semibold text-slate-900 dark:text-white mb-2">
                                Dirección
                            </label>
                            <textarea
                                id="address"
                                name="address"
                                rows={2}
                                defaultValue={'address' in settings ? settings.address : ''}
                                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:border-mivn-blue focus:ring-2 focus:ring-mivn-blue/20 outline-none transition-all"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="contact_phone" className="block text-sm font-semibold text-slate-900 dark:text-white mb-2">
                                    Teléfono
                                </label>
                                <input
                                    type="tel"
                                    id="contact_phone"
                                    name="contact_phone"
                                    defaultValue={'contact_phone' in settings ? settings.contact_phone : ''}
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:border-mivn-blue focus:ring-2 focus:ring-mivn-blue/20 outline-none transition-all"
                                />
                            </div>

                            <div>
                                <label htmlFor="contact_email" className="block text-sm font-semibold text-slate-900 dark:text-white mb-2">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="contact_email"
                                    name="contact_email"
                                    defaultValue={'contact_email' in settings ? settings.contact_email : ''}
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:border-mivn-blue focus:ring-2 focus:ring-mivn-blue/20 outline-none transition-all"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Service Times */}
                <div className="bg-white dark:bg-slate-900/50 rounded-2xl border border-slate-200 dark:border-slate-800 p-8">
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">
                        Horarios de Culto
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="service_time_sunday" className="block text-sm font-semibold text-slate-900 dark:text-white mb-2">
                                Domingo
                            </label>
                            <input
                                type="text"
                                id="service_time_sunday"
                                name="service_time_sunday"
                                defaultValue={'service_time_sunday' in settings ? settings.service_time_sunday : ''}
                                placeholder="Ej: 10:00 AM"
                                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:border-mivn-blue focus:ring-2 focus:ring-mivn-blue/20 outline-none transition-all"
                            />
                        </div>

                        <div>
                            <label htmlFor="service_time_wednesday" className="block text-sm font-semibold text-slate-900 dark:text-white mb-2">
                                Miércoles
                            </label>
                            <input
                                type="text"
                                id="service_time_wednesday"
                                name="service_time_wednesday"
                                defaultValue={'service_time_wednesday' in settings ? settings.service_time_wednesday : ''}
                                placeholder="Ej: 7:00 PM"
                                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:border-mivn-blue focus:ring-2 focus:ring-mivn-blue/20 outline-none transition-all"
                            />
                        </div>
                    </div>
                </div>

                {/* Social Media */}
                <div className="bg-white dark:bg-slate-900/50 rounded-2xl border border-slate-200 dark:border-slate-800 p-8">
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">
                        Redes Sociales
                    </h2>
                    <div className="space-y-6">
                        <div>
                            <label htmlFor="facebook_url" className="block text-sm font-semibold text-slate-900 dark:text-white mb-2">
                                Facebook URL
                            </label>
                            <input
                                type="url"
                                id="facebook_url"
                                name="facebook_url"
                                defaultValue={'facebook_url' in settings ? settings.facebook_url : ''}
                                placeholder="https://facebook.com/tupagina"
                                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:border-mivn-blue focus:ring-2 focus:ring-mivn-blue/20 outline-none transition-all"
                            />
                        </div>

                        <div>
                            <label htmlFor="instagram_url" className="block text-sm font-semibold text-slate-900 dark:text-white mb-2">
                                Instagram URL
                            </label>
                            <input
                                type="url"
                                id="instagram_url"
                                name="instagram_url"
                                defaultValue={'instagram_url' in settings ? settings.instagram_url : ''}
                                placeholder="https://instagram.com/tuperfil"
                                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:border-mivn-blue focus:ring-2 focus:ring-mivn-blue/20 outline-none transition-all"
                            />
                        </div>

                        <div>
                            <label htmlFor="youtube_url" className="block text-sm font-semibold text-slate-900 dark:text-white mb-2">
                                YouTube URL
                            </label>
                            <input
                                type="url"
                                id="youtube_url"
                                name="youtube_url"
                                defaultValue={'youtube_url' in settings ? settings.youtube_url : ''}
                                placeholder="https://youtube.com/@tucanal"
                                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:border-mivn-blue focus:ring-2 focus:ring-mivn-blue/20 outline-none transition-all"
                            />
                        </div>
                    </div>
                </div>

                {/* Top Banner Configuration */}
                <div className="bg-white dark:bg-slate-900/50 rounded-2xl border border-slate-200 dark:border-slate-800 p-8 text-white bg-slate-950">
                    <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                        <div className="size-8 bg-mivn-gold rounded-lg flex items-center justify-center text-slate-950">
                            <ArrowLeft className="w-5 h-5 rotate-180" />
                        </div>
                        Barra Superior (Top Banner)
                    </h2>
                    <div className="space-y-6">
                        <div>
                            <label htmlFor="top_banner_text" className="block text-sm font-semibold text-slate-300 mb-2">
                                Texto del Banner (Horarios/Avisos)
                            </label>
                            <input
                                type="text"
                                id="top_banner_text"
                                name="top_banner_text"
                                defaultValue={'top_banner_text' in settings ? settings.top_banner_text : ''}
                                placeholder="Ej: Services @ 9:00am, 10:45am, 5:00pm"
                                className="w-full px-4 py-3 rounded-xl border border-slate-800 bg-slate-900 text-white focus:border-mivn-gold focus:ring-2 focus:ring-mivn-gold/20 outline-none transition-all"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="top_banner_button_text" className="block text-sm font-semibold text-slate-300 mb-2">
                                    Texto del Botón
                                </label>
                                <input
                                    type="text"
                                    id="top_banner_button_text"
                                    name="top_banner_button_text"
                                    defaultValue={'top_banner_button_text' in settings ? settings.top_banner_button_text : ''}
                                    placeholder="Ej: Join Us"
                                    className="w-full px-4 py-3 rounded-xl border border-slate-800 bg-slate-900 text-white focus:border-mivn-gold focus:ring-2 focus:ring-mivn-gold/20 outline-none transition-all"
                                />
                            </div>

                            <div>
                                <label htmlFor="top_banner_button_url" className="block text-sm font-semibold text-slate-300 mb-2">
                                    Enlace del Botón
                                </label>
                                <input
                                    type="text"
                                    id="top_banner_button_url"
                                    name="top_banner_button_url"
                                    defaultValue={'top_banner_button_url' in settings ? settings.top_banner_button_url : ''}
                                    placeholder="Ej: /contacto o #mision"
                                    className="w-full px-4 py-3 rounded-xl border border-slate-800 bg-slate-900 text-white focus:border-mivn-gold focus:ring-2 focus:ring-mivn-gold/20 outline-none transition-all"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-4">
                    <button
                        type="submit"
                        className="inline-flex items-center gap-2 bg-mivn-blue text-white px-8 py-3 rounded-xl font-semibold hover:bg-mivn-blue/90 transition-all shadow-lg shadow-mivn-blue/20"
                    >
                        <Save className="w-5 h-5" />
                        Guardar Cambios
                    </button>
                    <Link
                        href="/admin/gestion-web"
                        className="px-8 py-3 rounded-xl font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
                    >
                        Cancelar
                    </Link>
                </div>
            </form>
        </div>
    );
}

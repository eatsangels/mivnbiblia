import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function GestionWebPage() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect('/login');
    }

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-playfair font-bold text-slate-900 dark:text-white">
                    Gestión Web
                </h1>
                <p className="text-slate-600 dark:text-slate-400 mt-2">
                    Administra todo el contenido del sitio web
                </p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white dark:bg-slate-900/50 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-slate-600 dark:text-slate-400">Ministerios</p>
                            <p className="text-3xl font-bold text-slate-900 dark:text-white mt-1">5</p>
                        </div>
                        <div className="w-12 h-12 rounded-xl bg-mivn-blue/10 flex items-center justify-center">
                            <span className="text-2xl">⛪</span>
                        </div>
                    </div>
                </div>

                <div className="bg-white dark:bg-slate-900/50 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-slate-600 dark:text-slate-400">Devocionales</p>
                            <p className="text-3xl font-bold text-slate-900 dark:text-white mt-1">12</p>
                        </div>
                        <div className="w-12 h-12 rounded-xl bg-mivn-gold/10 flex items-center justify-center">
                            <span className="text-2xl">📖</span>
                        </div>
                    </div>
                </div>

                <div className="bg-white dark:bg-slate-900/50 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-slate-600 dark:text-slate-400">Eventos</p>
                            <p className="text-3xl font-bold text-slate-900 dark:text-white mt-1">8</p>
                        </div>
                        <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center">
                            <span className="text-2xl">📅</span>
                        </div>
                    </div>
                </div>

                <div className="bg-white dark:bg-slate-900/50 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-slate-600 dark:text-slate-400">Recursos</p>
                            <p className="text-3xl font-bold text-slate-900 dark:text-white mt-1">24</p>
                        </div>
                        <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center">
                            <span className="text-2xl">📚</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Management Sections */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                    { title: 'Personalización', href: '/admin/gestion-web/personalizacion', icon: '🎨', description: 'Logo, colores y footer del sitio' },
                    { title: 'Mensajes del Pastor', href: '/admin/gestion-web/mensajes-pastor', icon: '📢', description: 'Publicar sermones y mensajes' },
                    { title: 'Ministerios', href: '/admin/gestion-web/ministerios', icon: '⛪', description: 'Gestionar ministerios de la iglesia' },
                    { title: 'Devocionales', href: '/admin/gestion-web/devocionales', icon: '📖', description: 'Crear y editar devocionales diarios' },
                    { title: 'Recursos', href: '/admin/gestion-web/recursos', icon: '📚', description: 'Gestionar recursos descargables' },
                    { title: 'Boletines', href: '/admin/gestion-web/boletines', icon: '📰', description: 'Crear boletines semanales' },
                    { title: 'Comentarios', href: '/admin/gestion-web/comentarios', icon: '💬', description: 'Aprobar y gestionar comentarios' },
                    { title: 'Peticiones de Oración', href: '/admin/gestion-web/oracion', icon: '🙏', description: 'Gestionar peticiones de oración' },
                    { title: 'Navegación', href: '/admin/gestion-web/navegacion', icon: '🧭', description: 'Editar menús del sitio' },
                    { title: 'Páginas', href: '/admin/gestion-web/paginas', icon: '📄', description: 'Gestionar páginas dinámicas' },
                    { title: 'Configuración', href: '/admin/gestion-web/configuracion', icon: '⚙️', description: 'Configuración general del sitio' },
                ].map((section) => (
                    <a
                        key={section.href}
                        href={section.href}
                        className="group bg-white dark:bg-slate-900/50 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 hover:border-mivn-blue/50 hover:shadow-xl transition-all"
                    >
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-white/5 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                                {section.icon}
                            </div>
                            <div className="flex-1">
                                <h3 className="font-bold text-slate-900 dark:text-white group-hover:text-mivn-blue transition-colors">
                                    {section.title}
                                </h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                                    {section.description}
                                </p>
                            </div>
                        </div>
                    </a>
                ))}
            </div>
        </div>
    );
}

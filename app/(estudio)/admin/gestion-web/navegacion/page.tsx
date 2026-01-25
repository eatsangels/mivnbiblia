import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { getNavigationMenu } from "@/lib/queries/navigation";
import { Plus, Pencil, Trash2, Link as LinkIcon, Move } from "lucide-react";
import Link from "next/link";

export default async function NavegacionAdminPage() {
    try {
        const supabase = await createClient();
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
            redirect('/login');
        }

        // Get major menus
        console.log("DEBUG: Obteniendo menús de navegación...");
        const mainMenu = await getNavigationMenu("main");
        const footerMenu = await getNavigationMenu("footer");
        console.log("DEBUG: Menú principal items:", mainMenu.items.length);
        console.log("DEBUG: Menú footer items:", footerMenu.items.length);

        return (
            <div className="space-y-8">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-playfair font-bold text-slate-900 dark:text-white">
                            Navegación
                        </h1>
                        <p className="text-slate-600 dark:text-slate-400 mt-2">
                            Gestiona los menús y enlaces del sitio web
                        </p>
                    </div>
                </div>

                {/* Menus Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Main Menu Management */}
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                                <span className="p-2 bg-mivn-blue/10 rounded-lg text-mivn-blue">
                                    <LinkIcon className="w-5 h-5" />
                                </span>
                                Menú Principal (Main)
                            </h2>
                            <button className="text-sm font-semibold text-mivn-blue hover:text-mivn-blue/80 flex items-center gap-1">
                                <Plus className="w-4 h-4" />
                                Agregar Link
                            </button>
                        </div>

                        <div className="bg-white dark:bg-slate-900/50 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
                            <div className="divide-y divide-slate-200 dark:divide-slate-800">
                                {mainMenu.items.length > 0 ? (
                                    mainMenu.items.map((item) => (
                                        <div key={item.id} className="p-4 flex items-center justify-between group">
                                            <div className="flex items-center gap-3">
                                                <div className="cursor-grab text-slate-300 dark:text-slate-600 hover:text-slate-500">
                                                    <Move className="w-4 h-4" />
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-slate-900 dark:text-white">
                                                        {item.label}
                                                    </p>
                                                    <p className="text-xs text-slate-500 font-mono">
                                                        {item.url}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-500 hover:text-mivn-blue transition-colors">
                                                    <Pencil className="w-4 h-4" />
                                                </button>
                                                <button className="p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg text-slate-500 hover:text-red-500 transition-colors">
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="p-12 text-center text-slate-500 italic">
                                        No hay enlaces en este menú
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Footer Menu Management */}
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                                <span className="p-2 bg-purple-500/10 rounded-lg text-purple-500">
                                    <LinkIcon className="w-5 h-5" />
                                </span>
                                Menú Footer
                            </h2>
                            <button className="text-sm font-semibold text-mivn-blue hover:text-mivn-blue/80 flex items-center gap-1">
                                <Plus className="w-4 h-4" />
                                Agregar Link
                            </button>
                        </div>

                        <div className="bg-white dark:bg-slate-900/50 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
                            <div className="divide-y divide-slate-200 dark:divide-slate-800">
                                {footerMenu.items.length > 0 ? (
                                    footerMenu.items.map((item) => (
                                        <div key={item.id} className="p-4 flex items-center justify-between group">
                                            <div className="flex items-center gap-3">
                                                <div className="cursor-grab text-slate-300 dark:text-slate-600 hover:text-slate-500">
                                                    <Move className="w-4 h-4" />
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-slate-900 dark:text-white">
                                                        {item.label}
                                                    </p>
                                                    <p className="text-xs text-slate-500 font-mono">
                                                        {item.url}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-500 hover:text-mivn-blue transition-colors">
                                                    <Pencil className="w-4 h-4" />
                                                </button>
                                                <button className="p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg text-slate-500 hover:text-red-500 transition-colors">
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="p-12 text-center text-slate-500 italic">
                                        No hay enlaces en este menú
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Help Alert */}
                <div className="bg-mivn-blue/5 border border-mivn-blue/20 rounded-2xl p-6">
                    <h3 className="font-bold text-mivn-blue flex items-center gap-2 mb-2">
                        <span>ℹ️</span> Ayuda rápida
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                        Los cambios realizados en los menús de navegación se reflejan inmediatamente en todo el sitio web.
                        Asegúrate de que los enlaces internos comiencen con una barra diagonal (ej: /ministerios)
                        y los externos comiencen con el protocolo (ej: https://...).
                    </p>
                </div>
            </div>
        );
    } catch (error: any) {
        console.error("CRITICAL ERROR in NavegacionAdminPage:", error);
        return (
            <div className="p-8 bg-red-50 border border-red-200 rounded-2xl text-red-700">
                <h2 className="text-xl font-bold mb-4">Error al cargar la página de navegación</h2>
                <pre className="bg-white p-4 rounded-lg overflow-auto max-h-96 text-sm">
                    {JSON.stringify(error, null, 2)}
                </pre>
                <p className="mt-4">
                    Por favor, intenta recargar la página o contacta al soporte técnico.
                    Mensaje: {error.message}
                </p>
            </div>
        );
    }
}

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { WebManagementTabs } from "@/components/admin/WebManagementTabs";
import { getWebSettings } from "../actions";
import { Palette, Layout, Share2, Phone } from "lucide-react";

export default async function PersonalizacionPage() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect('/login');
    }

    // Check if user is admin
    const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();

    if (profile?.role !== 'admin' && profile?.role !== 'super_admin') {
        redirect('/dashboard');
    }

    // Get current settings
    const settings = await getWebSettings();

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="space-y-4">
                <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-mivn-blue to-mivn-gold flex items-center justify-center">
                        <Palette className="w-7 h-7 text-white" />
                    </div>
                    <div>
                        <h1 className="text-4xl font-playfair font-bold text-slate-900 dark:text-white">
                            Personalización del Sitio
                        </h1>
                        <p className="text-slate-600 dark:text-slate-400 text-lg">
                            Personaliza la apariencia y contenido de tu sitio web
                        </p>
                    </div>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                    { icon: Palette, label: "Identidad Visual", value: "Logo y Colores", color: "from-blue-500 to-cyan-500" },
                    { icon: Layout, label: "Footer", value: "Personalizable", color: "from-purple-500 to-pink-500" },
                    { icon: Share2, label: "Redes Sociales", value: "Conectadas", color: "from-orange-500 to-red-500" },
                    { icon: Phone, label: "Contacto", value: "Actualizado", color: "from-green-500 to-emerald-500" }
                ].map((stat, i) => (
                    <div key={i} className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-4`}>
                            <stat.icon className="w-6 h-6 text-white" />
                        </div>
                        <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-1">
                            {stat.label}
                        </p>
                        <p className="text-lg font-bold text-slate-900 dark:text-white">
                            {stat.value}
                        </p>
                    </div>
                ))}
            </div>

            {/* Main Content - Tabs */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden">
                <WebManagementTabs initialSettings={settings} />
            </div>
        </div>
    );
}

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Plus, Check, X, Heart } from "lucide-react";

export default async function OracionAdminPage() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect('/login');
    }

    const { data: prayers } = await supabase
        .from("prayer_requests")
        .select("*")
        .order("created_at", { ascending: false });

    const pending = prayers?.filter(p => !p.is_approved) || [];
    const approved = prayers?.filter(p => p.is_approved && !p.is_answered) || [];
    const answered = prayers?.filter(p => p.is_answered) || [];

    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-playfair font-bold text-slate-900 dark:text-white">
                    Peticiones de Oración
                </h1>
                <p className="text-slate-600 dark:text-slate-400 mt-2">
                    Gestiona las peticiones de oración de la congregación
                </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white dark:bg-slate-900/50 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-mivn-blue/10 flex items-center justify-center">
                            <span className="text-2xl">🙏</span>
                        </div>
                        <div>
                            <p className="text-sm text-slate-600 dark:text-slate-400">Total</p>
                            <p className="text-2xl font-bold text-slate-900 dark:text-white">
                                {prayers?.length || 0}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="bg-white dark:bg-slate-900/50 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-yellow-500/10 flex items-center justify-center">
                            <span className="text-2xl">⏳</span>
                        </div>
                        <div>
                            <p className="text-sm text-slate-600 dark:text-slate-400">Pendientes</p>
                            <p className="text-2xl font-bold text-slate-900 dark:text-white">
                                {pending.length}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="bg-white dark:bg-slate-900/50 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center">
                            <span className="text-2xl">📿</span>
                        </div>
                        <div>
                            <p className="text-sm text-slate-600 dark:text-slate-400">Activas</p>
                            <p className="text-2xl font-bold text-slate-900 dark:text-white">
                                {approved.length}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="bg-white dark:bg-slate-900/50 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center">
                            <Heart className="w-6 h-6 text-green-500" />
                        </div>
                        <div>
                            <p className="text-sm text-slate-600 dark:text-slate-400">Respondidas</p>
                            <p className="text-2xl font-bold text-slate-900 dark:text-white">
                                {answered.length}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Pending Prayers */}
            {pending.length > 0 && (
                <div className="space-y-4">
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                        Peticiones Pendientes de Aprobación
                    </h2>
                    <div className="space-y-4">
                        {pending.map((prayer) => (
                            <div key={prayer.id} className="bg-yellow-50 dark:bg-yellow-900/10 rounded-2xl p-6 border border-yellow-200 dark:border-yellow-800">
                                <div className="flex items-start justify-between gap-4">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-2">
                                            <p className="font-bold text-slate-900 dark:text-white">
                                                {prayer.requester_name}
                                            </p>
                                            <span className="text-sm text-slate-500 dark:text-slate-400">
                                                {new Date(prayer.created_at).toLocaleDateString('es-ES')}
                                            </span>
                                            {prayer.is_anonymous && (
                                                <span className="px-2 py-1 rounded-full text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                                                    Anónimo
                                                </span>
                                            )}
                                        </div>
                                        <p className="text-slate-700 dark:text-slate-300">
                                            {prayer.request}
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <button className="p-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors">
                                            <Check className="w-5 h-5" />
                                        </button>
                                        <button className="p-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors">
                                            <X className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Active Prayers */}
            <div className="space-y-4">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                    Peticiones Activas
                </h2>
                <div className="bg-white dark:bg-slate-900/50 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
                    {approved.length > 0 ? (
                        <div className="divide-y divide-slate-200 dark:divide-slate-800">
                            {approved.map((prayer) => (
                                <div key={prayer.id} className="p-6 hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                                    <div className="flex items-start justify-between gap-4">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-2">
                                                <p className="font-bold text-slate-900 dark:text-white">
                                                    {prayer.requester_name}
                                                </p>
                                                <span className="text-sm text-slate-500 dark:text-slate-400">
                                                    {new Date(prayer.created_at).toLocaleDateString('es-ES')}
                                                </span>
                                            </div>
                                            <p className="text-slate-700 dark:text-slate-300">
                                                {prayer.request}
                                            </p>
                                        </div>
                                        <button className="p-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors">
                                            <Heart className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <p className="text-slate-500 dark:text-slate-400">
                                No hay peticiones activas
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

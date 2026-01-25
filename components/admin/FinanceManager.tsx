"use client";

import {
    TrendingUp, TrendingDown, DollarSign, Wallet, Target,
    Download, FileText, FileSpreadsheet, Printer,
    CheckCircle2, Clock, Eye, DownloadCloud, PlusCircle
} from "lucide-react";

export interface FinanceManagerProps {
    initialDonations: any[];
    stats: {
        total: number;
        monthlyTrend: string;
        specialOfferings: number;
        missionaryFund: number;
    };
}

export function FinanceManager({ initialDonations, stats }: FinanceManagerProps) {
    return (
        <div className="space-y-8 animate-in fade-in duration-700">
            {/* Page Heading */}
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
                <div className="space-y-2">
                    <h1 className="text-4xl font-playfair font-black text-slate-900 dark:text-white uppercase tracking-tighter">
                        Gestión <span className="text-mivn-blue italic">Financiera</span>
                    </h1>
                    <p className="text-slate-500 dark:text-gray-400 font-light italic text-lg leading-relaxed max-w-xl">
                        Supervise las ofrendas, diezmos y el estado financiero del ministerio.
                    </p>
                </div>
                <button className="flex items-center gap-3 bg-mivn-blue text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-2xl shadow-mivn-blue/20 hover:scale-105 transition-all">
                    <PlusCircle className="w-5 h-5" /> Nueva Transacción
                </button>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { title: "Total Ofrendas", value: `$${stats.total.toLocaleString()}`, badge: "MIVN Gold", trend: stats.monthlyTrend, trendUp: true, icon: DollarSign },
                    { title: "Ofrendas Especiales", value: `$${stats.specialOfferings.toLocaleString()}`, badge: null, trend: "-2.1% esperado", trendUp: false, icon: Wallet },
                    { title: "Fondo Misionero", value: `$${stats.missionaryFund.toLocaleString()}`, badge: null, trend: "+8.4%", trendUp: true, icon: Target },
                    { title: "Crecimiento Mensual", value: stats.monthlyTrend, badge: "Meta Alcanzada", trend: "Excelente", trendUp: true, icon: TrendingUp },
                ].map((stat, i) => (
                    <div key={i} className="bg-white dark:bg-slate-900 p-6 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-xl flex flex-col gap-4">
                        <div className="flex items-center justify-between">
                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">{stat.title}</p>
                            <div className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-white/5 flex items-center justify-center text-mivn-blue">
                                <stat.icon className="w-5 h-5" />
                            </div>
                        </div>
                        <div className="space-y-1">
                            <div className="flex items-end gap-2">
                                <p className="text-2xl font-black text-slate-900 dark:text-white">{stat.value}</p>
                                {stat.badge && (
                                    <span className="text-[8px] font-black uppercase tracking-widest text-mivn-gold bg-mivn-gold/10 px-2 py-0.5 rounded mb-1">{stat.badge}</span>
                                )}
                            </div>
                            <div className={`flex items-center gap-1 text-xs font-bold ${stat.trendUp ? 'text-emerald-500' : 'text-rose-500'}`}>
                                {stat.trendUp ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                                <span>{stat.trend}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Chart Section */}
                <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-xl overflow-hidden p-8">
                    <div className="flex items-center justify-between mb-8">
                        <h3 className="font-playfair font-bold text-xl text-slate-900 dark:text-white">Tendencias Financieras</h3>
                    </div>
                    <div className="h-64 flex items-end justify-between gap-2 px-4 italic text-slate-400 text-center">
                        Panel de tendencias históricas basado en {initialDonations.length} transacciones registradas.
                    </div>
                </div>

                {/* Reports Sidebar */}
                <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-xl p-8 space-y-8">
                    <h3 className="font-playfair font-bold text-xl text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-4">Reportes Generales</h3>

                    <div className="space-y-6">
                        <button className="w-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:scale-[1.02] active:scale-95 transition-all shadow-lg flex items-center justify-center gap-2">
                            <DownloadCloud className="w-4 h-4" /> Generar Informe
                        </button>
                    </div>
                </div>
            </div>

            {/* Bottom Section: Transactions */}
            <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-xl overflow-hidden">
                <div className="p-8 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
                    <h3 className="text-xl font-playfair font-black text-slate-900 dark:text-white">Transacciones Recientes</h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-slate-50 dark:bg-white/5 text-slate-400 text-[9px] uppercase font-black tracking-[0.2em]">
                            <tr>
                                <th className="px-8 py-6">Fecha</th>
                                <th className="px-8 py-6">Miembro</th>
                                <th className="px-8 py-6">Monto</th>
                                <th className="px-8 py-6">Estado</th>
                                <th className="px-8 py-6 text-right">Acción</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                            {initialDonations.length > 0 ? (
                                initialDonations.map((tx, i) => (
                                    <tr key={i} className="group hover:bg-slate-50 dark:hover:bg-white/[0.02] transition-colors">
                                        <td className="px-8 py-6 text-sm font-bold text-slate-500">
                                            {new Date(tx.created_at).toLocaleDateString()}
                                        </td>
                                        <td className="px-8 py-6 text-sm font-bold text-slate-900 dark:text-white">
                                            {tx.donor_name || 'Anónimo'}
                                        </td>
                                        <td className="px-8 py-6 text-sm font-black text-slate-900 dark:text-white">
                                            ${tx.amount.toLocaleString()}
                                        </td>
                                        <td className="px-8 py-6">
                                            <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest bg-emerald-100 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400`}>
                                                Completado
                                            </span>
                                        </td>
                                        <td className="px-8 py-6 text-right">
                                            <button className="text-slate-300 hover:text-mivn-blue transition-colors">
                                                <Printer className="w-4 h-4" />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={5} className="px-8 py-12 text-center text-slate-400 italic">No se encontraron transacciones</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

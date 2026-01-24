"use client";

import {
    TrendingUp, TrendingDown, DollarSign, Wallet, Target,
    Download, FileText, FileSpreadsheet, Printer,
    CheckCircle2, Clock, Eye, DownloadCloud, PlusCircle
} from "lucide-react";

export function FinanceManager() {
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
                    { title: "Total Diezmos", value: "$45,200.00", badge: "MIVN Gold", trend: "+5.2%", trendUp: true, icon: DollarSign },
                    { title: "Ofrendas Especiales", value: "$12,850.00", badge: null, trend: "-2.1% esperado", trendUp: false, icon: Wallet },
                    { title: "Fondo Misionero", value: "$8,400.00", badge: null, trend: "+8.4%", trendUp: true, icon: Target },
                    { title: "Crecimiento Mensual", value: "+12.5%", badge: "Meta Alcanzada", trend: "Excelente", trendUp: true, icon: TrendingUp },
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
                {/* Mock Chart Section */}
                <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-xl overflow-hidden p-8">
                    <div className="flex items-center justify-between mb-8">
                        <h3 className="font-playfair font-bold text-xl text-slate-900 dark:text-white">Tendencias (6 meses)</h3>
                        <select className="bg-slate-100 dark:bg-white/5 border-none rounded-xl text-xs font-bold py-2 px-4 focus:ring-0 text-slate-600 dark:text-slate-300 outline-none">
                            <option>Últimos 6 meses</option>
                            <option>Este año</option>
                        </select>
                    </div>
                    {/* CSS-based Mock Chart representation */}
                    <div className="h-64 flex items-end justify-between gap-2 px-4">
                        {[40, 65, 45, 80, 55, 90].map((h, i) => (
                            <div key={i} className="w-full flex flex-col items-center gap-2 group cursor-pointer">
                                <div className="relative w-full bg-slate-50 dark:bg-white/5 rounded-t-2xl overflow-hidden h-full flex items-end">
                                    <div
                                        className="w-full bg-mivn-blue opacity-80 group-hover:opacity-100 transition-all duration-500 rounded-t-2xl relative"
                                        style={{ height: `${h}%` }}
                                    >
                                        <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] font-bold py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                            ${h}k
                                        </div>
                                    </div>
                                </div>
                                <span className="text-[10px] font-bold text-slate-400 uppercase">Mes {i + 1}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Reports Sidebar */}
                <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-xl p-8 space-y-8">
                    <h3 className="font-playfair font-bold text-xl text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-4">Reportes Generales</h3>

                    <div className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Rango de Fechas</label>
                            <div className="flex items-center gap-3 bg-slate-50 dark:bg-white/5 p-4 rounded-2xl border border-slate-100 dark:border-slate-800">
                                <Clock className="w-5 h-5 text-mivn-blue" />
                                <span className="text-sm font-bold text-slate-700 dark:text-slate-300">01 Ene - 30 Jun 2026</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <button className="flex flex-col items-center justify-center gap-2 py-4 bg-slate-50 dark:bg-white/5 rounded-2xl border border-transparent hover:border-mivn-blue/30 hover:bg-mivn-blue/5 transition-all group">
                                <FileText className="w-6 h-6 text-slate-400 group-hover:text-mivn-blue transition-colors" />
                                <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">PDF</span>
                            </button>
                            <button className="flex flex-col items-center justify-center gap-2 py-4 bg-slate-50 dark:bg-white/5 rounded-2xl border border-transparent hover:border-emerald-500/30 hover:bg-emerald-500/5 transition-all group">
                                <FileSpreadsheet className="w-6 h-6 text-slate-400 group-hover:text-emerald-500 transition-colors" />
                                <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Excel</span>
                            </button>
                        </div>

                        <button className="w-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:scale-[1.02] active:scale-95 transition-all shadow-lg flex items-center justify-center gap-2">
                            <DownloadCloud className="w-4 h-4" /> Generar Informe
                        </button>
                    </div>

                    <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Descargas Recientes</p>
                        {[
                            { name: "Cierre_Mayo_2026.pdf", icon: FileText, color: "text-rose-500" },
                            { name: "Diezmos_Q2_2026.xlsx", icon: FileSpreadsheet, color: "text-emerald-500" }
                        ].map((file, i) => (
                            <div key={i} className="flex items-center justify-between group cursor-pointer hover:bg-slate-50 dark:hover:bg-white/5 p-2 rounded-lg -mx-2 transition-colors">
                                <div className="flex items-center gap-3">
                                    <file.icon className={`w-4 h-4 ${file.color}`} />
                                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300">{file.name}</span>
                                </div>
                                <Eye className="w-4 h-4 text-slate-300 group-hover:text-mivn-blue transition-colors" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Bottom Section: Transactions & Goals */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Transactions Table */}
                <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-xl overflow-hidden">
                    <div className="p-8 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
                        <h3 className="text-xl font-playfair font-black text-slate-900 dark:text-white">Transacciones Recientes</h3>
                        <button className="text-[10px] font-black text-mivn-blue uppercase tracking-widest hover:underline">Ver todas</button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-slate-50 dark:bg-white/5 text-slate-400 text-[9px] uppercase font-black tracking-[0.2em]">
                                <tr>
                                    <th className="px-8 py-6">Fecha</th>
                                    <th className="px-8 py-6">Miembro</th>
                                    <th className="px-8 py-6">Tipo</th>
                                    <th className="px-8 py-6 text-right">Monto</th>
                                    <th className="px-8 py-6">Estado</th>
                                    <th className="px-8 py-6"></th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                                {[
                                    { date: "15 Jun", name: "Roberto Méndez", type: "Diezmo", amount: "$1,200.00", status: "Completado" },
                                    { date: "14 Jun", name: "Elena Castillo", type: "Ofrenda Especial", amount: "$500.00", status: "Completado" },
                                    { date: "12 Jun", name: "Familia Morales", type: "Donación Templo", amount: "$2,500.00", status: "Pendiente" },
                                    { date: "10 Jun", name: "Juan Pérez", type: "Diezmo", amount: "$150.00", status: "Completado" },
                                ].map((tx, i) => (
                                    <tr key={i} className="group hover:bg-slate-50 dark:hover:bg-white/[0.02] transition-colors">
                                        <td className="px-8 py-6 text-sm font-bold text-slate-500">{tx.date}</td>
                                        <td className="px-8 py-6 text-sm font-bold text-slate-900 dark:text-white">{tx.name}</td>
                                        <td className="px-8 py-6 text-xs font-bold text-slate-500 uppercase tracking-wide">{tx.type}</td>
                                        <td className="px-8 py-6 text-sm font-black text-slate-900 dark:text-white text-right">{tx.amount}</td>
                                        <td className="px-8 py-6">
                                            <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${tx.status === 'Completado'
                                                    ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400'
                                                    : 'bg-amber-100 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400'
                                                }`}>
                                                {tx.status}
                                            </span>
                                        </td>
                                        <td className="px-8 py-6 text-right">
                                            <button className="text-slate-300 hover:text-mivn-blue transition-colors">
                                                <Printer className="w-4 h-4" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Goals Cards */}
                <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-xl p-8 space-y-8">
                    <h3 className="font-playfair font-bold text-xl text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-4">Metas de Recaudación</h3>

                    <div className="space-y-8">
                        {[
                            { title: "Renovación del Templo", goal: "$100,000", current: 75, color: "bg-mivn-blue" },
                            { title: "Misiones Locales", goal: "$15,000", current: 45, color: "bg-mivn-gold" },
                            { title: "Ministerio Juvenil", goal: "$5,000", current: 92, color: "bg-emerald-500" },
                        ].map((goal, i) => (
                            <div key={i} className="space-y-3">
                                <div className="flex justify-between items-end">
                                    <div>
                                        <p className="text-sm font-bold text-slate-900 dark:text-white">{goal.title}</p>
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Meta: {goal.goal}</p>
                                    </div>
                                    <span className="text-xl font-black text-slate-900 dark:text-white">{goal.current}%</span>
                                </div>
                                <div className="w-full bg-slate-100 dark:bg-white/5 h-3 rounded-full overflow-hidden">
                                    <div className={`h-full rounded-full ${goal.color}`} style={{ width: `${goal.current}%` }} />
                                </div>
                            </div>
                        ))}
                    </div>

                    <button className="w-full border-2 border-mivn-blue/20 text-mivn-blue py-3 rounded-xl font-black uppercase tracking-widest text-[10px] hover:bg-mivn-blue hover:text-white transition-all">
                        Gestionar Proyectos
                    </button>
                </div>
            </div>
        </div>
    );
}

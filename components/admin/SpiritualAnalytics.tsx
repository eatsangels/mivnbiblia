"use client";

import {
    BarChart3, Users, UserPlus, Droplets, Star, Info, TrendingUp, Calendar, Download
} from "lucide-react";

interface AnalyticsProps {
    summary: {
        totalMembers: number;
        newConverts: number;
        baptisms: number;
        activeLeaders: number;
    };
    ministryStats: {
        name: string;
        value: number;
        percentage: number;
    }[];
    funnel: {
        label: string;
        val: number;
        id: string;
    }[];
    groupHealth: {
        name: string;
        code: string;
        members: number;
        status: string;
        health: number;
        leader: string;
    }[];
}

export function SpiritualAnalytics({ summary, ministryStats, funnel, groupHealth }: AnalyticsProps) {
    // Helper to calculate funnel width/color
    const maxFunnelVal = Math.max(...funnel.map(f => f.val), 1);
    const getFunnelStyles = (val: number, index: number) => {
        const percentage = (val / maxFunnelVal) * 100;
        // Simple width mapping for tailwind classes if possible, or style attribute
        // Using style for precise width
        let bg = "bg-mivn-blue";
        if (index === 1) bg = "bg-mivn-blue/80";
        if (index === 2) bg = "bg-mivn-blue/60";
        if (index === 3) bg = "bg-mivn-blue/40";
        if (index === 4) bg = "bg-mivn-gold shadow-lg shadow-mivn-gold/30";

        return { width: `${Math.max(percentage, 20)}%`, className: bg };
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-700">
            {/* Page Heading */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-playfair font-black text-slate-900 dark:text-white uppercase tracking-tighter">
                        Métricas y <span className="text-mivn-blue italic">Analíticas</span>
                    </h1>
                    <p className="text-slate-500 dark:text-gray-400 font-light italic text-lg leading-relaxed max-w-xl">
                        Seguimiento avanzado del crecimiento y salud ministerial de Vida Nueva.
                    </p>
                </div>
                <div className="flex gap-4">
                    <button className="flex items-center gap-2 px-6 py-3 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-white rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-slate-50 dark:hover:bg-white/10 transition-all">
                        <Calendar className="w-4 h-4" /> Últimos 30 días
                    </button>
                    <button className="flex items-center gap-2 px-6 py-3 bg-mivn-blue text-white rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-2xl shadow-mivn-blue/20 hover:scale-105 transition-all">
                        <Download className="w-4 h-4" /> Reporte
                    </button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white dark:bg-slate-900 p-8 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-xl group hover:scale-[1.02] transition-transform">
                    <div className="flex justify-between items-start mb-4">
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Total Miembros</p>
                        <Users className="w-5 h-5 text-mivn-blue" />
                    </div>
                    <p className="text-4xl font-black text-slate-900 dark:text-white mb-2">{summary.totalMembers}</p>
                    <div className="flex items-center gap-2">
                        <span className="text-emerald-500 text-xs font-black bg-emerald-500/10 px-2 py-0.5 rounded-lg">+5.2%</span>
                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">vs mes anterior</span>
                    </div>
                </div>
                <div className="bg-white dark:bg-slate-900 p-8 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-xl group hover:scale-[1.02] transition-transform">
                    <div className="flex justify-between items-start mb-4">
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Nuevos Convertidos</p>
                        <UserPlus className="w-5 h-5 text-mivn-blue" />
                    </div>
                    <p className="text-4xl font-black text-slate-900 dark:text-white mb-2">{summary.newConverts}</p>
                    <div className="flex items-center gap-2">
                        <span className="text-emerald-500 text-xs font-black bg-emerald-500/10 px-2 py-0.5 rounded-lg">+12%</span>
                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">nuevas decisiones</span>
                    </div>
                </div>
                <div className="bg-white dark:bg-slate-900 p-8 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-xl group hover:scale-[1.02] transition-transform">
                    <div className="flex justify-between items-start mb-4">
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Bautismos</p>
                        <Droplets className="w-5 h-5 text-mivn-blue" />
                    </div>
                    <p className="text-4xl font-black text-slate-900 dark:text-white mb-2">{summary.baptisms}</p>
                    <div className="flex items-center gap-2">
                        <span className="text-mivn-blue text-[10px] font-black uppercase tracking-wider">Próxima Fecha</span>
                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">24 de Oct</span>
                    </div>
                </div>
                <div className="bg-white dark:bg-slate-900 p-8 rounded-[2rem] border-2 border-mivn-gold/20 shadow-xl group hover:scale-[1.02] transition-transform relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-12 opacity-5">
                        <Star className="w-24 h-24 text-mivn-gold" />
                    </div>
                    <div className="relative z-10">
                        <div className="flex justify-between items-start mb-4">
                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Líderes Activos</p>
                            <Star className="w-5 h-5 text-mivn-gold" />
                        </div>
                        <p className="text-4xl font-black text-slate-900 dark:text-white mb-2">{summary.activeLeaders}</p>
                        <div className="flex items-center gap-2">
                            <span className="text-mivn-gold text-xs font-black bg-mivn-gold/10 px-2 py-0.5 rounded-lg">8% Elite</span>
                            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">retención alta</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Charts Section 1 */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Growth Chart - KEEPING STATIC FOR NOW AS IT NEEDS COMPLEX HISTORY, BUT CAN BE DYNAMIC LATER */}
                <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 p-8 shadow-xl">
                    <div className="flex justify-between items-center mb-8">
                        <h2 className="text-lg font-playfair font-bold text-slate-900 dark:text-white">Crecimiento y Asistencia</h2>
                        <div className="flex gap-4">
                            <div className="flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-mivn-blue"></span>
                                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Asistencia</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-mivn-gold"></span>
                                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Nuevos</span>
                            </div>
                        </div>
                    </div>

                    <div className="h-64 flex items-end justify-between gap-4 relative">
                        {/* Bars - MOCKED FOR UI CONSISTENCY UNTIL WE HAVE DAILY HISTORY */}
                        {['ENE', 'FEB', 'MAR', 'ABR', 'MAY', 'JUN'].map((month, i) => {
                            const height = [60, 50, 70, 75, 90, 80][i];
                            return (
                                <div key={month} className="flex-1 flex flex-col justify-end h-full gap-2 group cursor-pointer">
                                    <div className="w-full bg-mivn-blue/10 dark:bg-mivn-blue/5 rounded-t-xl relative overflow-hidden transition-all group-hover:bg-mivn-blue/20" style={{ height: `${height}%` }}>
                                        <div className="absolute bottom-0 w-full bg-mivn-blue transition-all group-hover:bg-blue-600" style={{ height: `${height * 0.7}%` }}></div>
                                    </div>
                                    <span className="text-[10px] font-black text-slate-300 text-center uppercase tracking-widest">{month}</span>
                                </div>
                            );
                        })}
                        {/* Fake Trend Line */}
                        <div className="absolute top-12 left-0 right-0 h-32 border-t-2 border-dashed border-mivn-gold/30 rotate-1 transform origin-left pointer-events-none"></div>
                    </div>

                    <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center">
                        <p className="text-xs text-slate-500 font-medium">Asistencia Promedio: <span className="font-bold text-slate-900 dark:text-white">840/semana</span></p>
                        <p className="text-xs text-slate-500 font-medium">Retención: <span className="font-bold text-emerald-500">92%</span></p>
                    </div>
                </div>

                {/* Ministry Participation */}
                <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 p-8 shadow-xl flex flex-col">
                    <h2 className="text-lg font-playfair font-bold text-slate-900 dark:text-white mb-8">Participación Ministerios</h2>
                    <div className="space-y-6 flex-1">
                        {ministryStats.length > 0 ? ministryStats.map((min) => (
                            <div key={min.name} className="space-y-2">
                                <div className="flex justify-between text-xs font-bold text-slate-600 dark:text-slate-300 uppercase tracking-wider">
                                    <span>{min.name}</span>
                                    <span>{min.percentage}%</span>
                                </div>
                                <div className="h-2 w-full bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden">
                                    <div className="h-full bg-mivn-blue rounded-full" style={{ width: `${min.percentage}%` }}></div>
                                </div>
                            </div>
                        )) : (
                            <p className="text-gray-500 italic text-sm">No hay datos de ministerios aún.</p>
                        )}
                    </div>
                    <div className="mt-8 p-4 bg-slate-50 dark:bg-white/5 rounded-2xl flex gap-3 items-start">
                        <Info className="w-5 h-5 text-mivn-blue flex-shrink-0 mt-0.5" />
                        <p className="text-xs text-slate-500 leading-relaxed font-medium">
                            El ministerio de <span className="font-bold text-slate-900 dark:text-white">Jóvenes</span> presenta el mayor crecimiento este trimestre (+15%).
                        </p>
                    </div>
                </div>
            </div>

            {/* Charts Section 2 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Funnel */}
                <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 p-8 shadow-xl">
                    <h2 className="text-lg font-playfair font-bold text-slate-900 dark:text-white mb-8">Embudo de Madurez Espiritual</h2>
                    <div className="flex flex-col items-center space-y-2">
                        {funnel.length > 0 ? funnel.map((step, index) => {
                            const style = getFunnelStyles(step.val, index);
                            return (
                                <div key={step.id} style={{ width: style.width }} className={`${style.className} h-12 rounded-xl flex items-center justify-between px-6 text-white transition-all hover:scale-[1.02]`}>
                                    <span className="text-[10px] font-black uppercase tracking-widest">{step.label}</span>
                                    <span className="font-bold">{step.val}</span>
                                </div>
                            );
                        }) : (
                            <p className="text-gray-500 italic text-sm">No hay datos del embudo aún.</p>
                        )}
                    </div>
                    <p className="text-center mt-6 text-xs text-slate-400 font-medium uppercase tracking-widest">
                        Conversión Visita → Líder: <span className="text-mivn-blue font-black">4.2%</span>
                    </p>
                </div>

                {/* Small Groups Table */}
                <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-xl overflow-hidden flex flex-col">
                    <div className="p-8 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
                        <h2 className="text-lg font-playfair font-bold text-slate-900 dark:text-white">Salud de Grupos</h2>
                        <button className="text-[10px] font-black uppercase tracking-widest text-mivn-blue hover:underline">Ver todos</button>
                    </div>
                    <div className="flex-1 overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-slate-50 dark:bg-white/5">
                                <tr>
                                    <th className="px-6 py-4 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">Líder</th>
                                    <th className="px-6 py-4 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">Asistencia</th>
                                    <th className="px-6 py-4 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">Estado</th>
                                    <th className="px-6 py-4 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">Salud</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                {groupHealth.map((group, i) => {
                                    const statusColor = group.status === 'Creciendo' ? "text-emerald-500 bg-emerald-500/10" :
                                        group.status === 'Estable' ? "text-amber-500 bg-amber-500/10" : "text-rose-500 bg-rose-500/10";
                                    return (
                                        <tr key={i} className="group hover:bg-slate-50 dark:hover:bg-white/[0.02] transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-full bg-mivn-blue/10 flex items-center justify-center text-[10px] font-black text-mivn-blue">{group.code}</div>
                                                    <span className="text-sm font-bold text-slate-900 dark:text-white max-w-[120px] truncate" title={group.name}>{group.name}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-xs font-medium text-slate-500">{group.members} miemb.</td>
                                            <td className="px-6 py-4">
                                                <span className={`px-2 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest ${statusColor}`}>{group.status}</span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex gap-1">
                                                    {[1, 2, 3].map((dot) => (
                                                        <div key={dot} className={`w-2 h-2 rounded-full ${dot <= group.health ? (group.health === 3 ? 'bg-emerald-500' : group.health === 2 ? 'bg-amber-500' : 'bg-rose-500') : 'bg-slate-200 dark:bg-slate-700'}`}></div>
                                                    ))}
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

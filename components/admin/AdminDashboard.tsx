"use client";

import {
    Users, Heart, DollarSign, Calendar, TrendingUp, MoreVertical,
    Video, Radio, Settings, CheckCircle2, XCircle, Edit, Eye,
    CalendarDays, History, Plus
} from "lucide-react";

export function AdminDashboard() {
    return (
        <div className="space-y-8 animate-in fade-in duration-700">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-4xl font-playfair font-black text-slate-900 dark:text-white uppercase tracking-tighter">
                        Vista <span className="text-mivn-blue italic">General</span>
                    </h1>
                    <p className="text-slate-500 dark:text-gray-400 font-light italic text-lg">
                        Resumen de actividad del Ministerio Internacional Vida Nueva.
                    </p>
                </div>
                <button className="flex items-center gap-2 px-6 py-3 bg-mivn-blue text-white rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-2xl shadow-mivn-blue/20 hover:scale-105 transition-all">
                    <Plus className="w-4 h-4" /> Nuevo Registro
                </button>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { title: "Total Miembros", value: "2,485", change: "+12%", icon: Users, color: "text-mivn-blue", bg: "bg-mivn-blue/10" },
                    { title: "Nuevos Conversos", value: "42", change: "+5%", icon: Heart, color: "text-purple-600", bg: "bg-purple-500/10" },
                    { title: "Diezmos (Mes)", value: "$14,250", change: null, icon: DollarSign, color: "text-mivn-gold", bg: "bg-mivn-gold/10" },
                    { title: "Eventos Próximos", value: "8", change: null, icon: Calendar, color: "text-rose-500", bg: "bg-rose-500/10" },
                ].map((stat, i) => (
                    <div key={i} className="bg-white dark:bg-slate-900 p-6 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-xl flex flex-col justify-between h-40 group hover:scale-[1.02] transition-transform">
                        <div className="flex justify-between items-start">
                            <div className={`p-3 rounded-2xl ${stat.bg} ${stat.color}`}>
                                <stat.icon className="w-6 h-6" />
                            </div>
                            {stat.change && (
                                <span className="flex items-center gap-1 text-[10px] font-black text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded-lg">
                                    <TrendingUp className="w-3 h-3" /> {stat.change}
                                </span>
                            )}
                        </div>
                        <div>
                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">{stat.title}</p>
                            <p className="text-3xl font-black text-slate-900 dark:text-white mt-1">{stat.value}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content Column */}
                <div className="lg:col-span-2 space-y-8">

                    {/* Live Stream Management */}
                    <section className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-xl overflow-hidden">
                        <div className="p-8 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-rose-500/10 rounded-xl">
                                    <Radio className="w-5 h-5 text-rose-500" />
                                </div>
                                <h2 className="font-playfair font-bold text-lg text-slate-900 dark:text-white">Gestión de Transmisión</h2>
                            </div>
                            <span className="px-3 py-1 bg-slate-100 dark:bg-white/10 text-slate-500 text-[10px] font-black uppercase tracking-widest rounded-full">Offline</span>
                        </div>
                        <div className="p-8 flex flex-col md:flex-row gap-8">
                            <div className="w-full md:w-64 aspect-video bg-slate-950 rounded-2xl flex flex-col items-center justify-center text-slate-700 relative overflow-hidden group">
                                <Video className="w-12 h-12 mb-2 group-hover:scale-110 transition-transform text-slate-800" />
                                <div className="absolute bottom-4 left-4 flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></div>
                                    <span className="text-[8px] font-black uppercase tracking-widest text-slate-500">Preview</span>
                                </div>
                            </div>
                            <div className="flex-1 space-y-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Título del Servicio</label>
                                    <input
                                        className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-sm font-bold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-mivn-blue/20 transition-all"
                                        placeholder="Culto de Adoración - 19:00"
                                    />
                                </div>
                                <div className="flex gap-4">
                                    <button className="flex-1 bg-rose-600 hover:bg-rose-700 text-white py-3 rounded-xl font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-2 transition-all shadow-lg shadow-rose-600/20">
                                        <Radio className="w-4 h-4" /> Iniciar Live
                                    </button>
                                    <button className="flex-1 border-2 border-slate-200 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-white/5 text-slate-600 dark:text-slate-300 py-3 rounded-xl font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-2 transition-all">
                                        <Settings className="w-4 h-4" /> Ajustes OBS
                                    </button>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Testimonial Approvals */}
                    <section className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-xl overflow-hidden">
                        <div className="p-8 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-mivn-gold/10 rounded-xl">
                                    <CheckCircle2 className="w-5 h-5 text-mivn-gold" />
                                </div>
                                <h2 className="font-playfair font-bold text-lg text-slate-900 dark:text-white">Aprobación de Testimonios</h2>
                            </div>
                            <button className="text-[10px] font-black uppercase tracking-widest text-mivn-blue hover:underline">Ver todos (12)</button>
                        </div>
                        <div className="divide-y divide-slate-100 dark:divide-slate-800">
                            {[
                                { name: "María González", time: "Hace 2 horas", text: "Quiero agradecer a Dios por sanar a mi hijo de una fiebre persistente..." },
                                { name: "Ricardo D.", time: "Hace 5 horas", text: "Video Testimonio adjunto para revisión.", isVideo: true }
                            ].map((item, i) => (
                                <div key={i} className="p-6 hover:bg-slate-50 dark:hover:bg-white/[0.02] transition-colors flex gap-4">
                                    <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-white/10 flex items-center justify-center text-slate-500 font-bold">
                                        {item.name.charAt(0)}
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex justify-between items-start mb-1">
                                            <h4 className="font-bold text-slate-900 dark:text-white">{item.name}</h4>
                                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">{item.time}</span>
                                        </div>
                                        <p className="text-sm text-slate-600 dark:text-slate-400 italic mb-3 line-clamp-2">"{item.text}"</p>
                                        <div className="flex gap-4">
                                            <button className="flex items-center gap-1 text-[10px] font-black uppercase tracking-widest text-emerald-500 hover:text-emerald-600">
                                                <CheckCircle2 className="w-3 h-3" /> Aprobar
                                            </button>
                                            <button className="flex items-center gap-1 text-[10px] font-black uppercase tracking-widest text-rose-500 hover:text-rose-600">
                                                <XCircle className="w-3 h-3" /> Rechazar
                                            </button>
                                            {item.isVideo && (
                                                <button className="flex items-center gap-1 text-[10px] font-black uppercase tracking-widest text-mivn-blue hover:text-blue-600">
                                                    <Eye className="w-3 h-3" /> Ver Video
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>

                {/* Sidebar Column */}
                <div className="space-y-8">

                    {/* Agenda */}
                    <section className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-xl p-8">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="font-playfair font-bold text-lg text-slate-900 dark:text-white flex items-center gap-2">
                                <CalendarDays className="w-5 h-5 text-mivn-blue" /> Agenda
                            </h2>
                            <button className="text-slate-400 hover:text-slate-600">
                                <MoreVertical className="w-5 h-5" />
                            </button>
                        </div>
                        <div className="space-y-6">
                            {[
                                { time: "Hoy - 19:30", title: "Escuela de Líderes", location: "Salón Principal", color: "border-mivn-blue text-mivn-blue" },
                                { time: "Mañana - 09:00", title: "Ayuno Congregacional", location: "Templo Central", color: "border-mivn-gold text-mivn-gold" },
                                { time: "Sáb 24 - 15:00", title: "Reunión de Jóvenes", location: "Parque Municipal", color: "border-emerald-500 text-emerald-500" },
                            ].map((event, i) => (
                                <div key={i} className={`pl-4 border-l-[3px] ${event.color.split(' ')[0]}`}>
                                    <p className={`text-[9px] font-black uppercase tracking-widest mb-1 ${event.color.split(' ')[1]}`}>{event.time}</p>
                                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">{event.title}</h4>
                                    <p className="text-xs text-slate-500 font-medium">{event.location}</p>
                                </div>
                            ))}
                        </div>
                        <button className="w-full mt-8 py-3 border border-slate-200 dark:border-slate-800 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-500 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
                            Ver Calendario Completo
                        </button>
                    </section>

                    {/* Activity Log */}
                    <section className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-xl p-8">
                        <div className="flex items-center gap-2 mb-6 text-slate-400">
                            <History className="w-5 h-5" />
                            <h2 className="font-playfair font-bold text-lg text-slate-900 dark:text-white">Actividad Reciente</h2>
                        </div>
                        <div className="space-y-6 relative">
                            <div className="absolute left-[5px] top-2 bottom-2 w-px bg-slate-100 dark:bg-slate-800"></div>
                            {[
                                { user: "Admin", action: "registró 3 nuevos miembros.", time: "Hace 15 min", color: "bg-emerald-500" },
                                { user: "Sistema", action: "programó recordatorios.", time: "Hace 45 min", color: "bg-mivn-blue" },
                                { user: "Tesorero", action: "cargó reporte financiero.", time: "Hace 2 horas", color: "bg-mivn-gold" },
                            ].map((log, i) => (
                                <div key={i} className="flex gap-4 relative z-10">
                                    <div className={`w-2.5 h-2.5 rounded-full ${log.color} mt-1.5 shrink-0 ring-4 ring-white dark:ring-slate-900`}></div>
                                    <div>
                                        <p className="text-xs text-slate-600 dark:text-slate-400">
                                            <span className="font-bold text-slate-900 dark:text-white">{log.user}</span> {log.action}
                                        </p>
                                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-300">{log.time}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                </div>
            </div>
        </div>
    );
}

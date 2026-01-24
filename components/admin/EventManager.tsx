"use client";

import {
    Calendar as CalendarIcon, Edit3, MapPin, User, ChevronLeft, ChevronRight,
    Download, TrendingUp, Users, CheckCircle2, AlertCircle, PlusCircle
} from "lucide-react";

export function EventManager() {
    return (
        <div className="space-y-8 animate-in fade-in duration-700">
            {/* Page Heading */}
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
                <div className="space-y-2">
                    <h1 className="text-4xl font-playfair font-black text-slate-900 dark:text-white uppercase tracking-tighter">
                        Gestión de <span className="text-mivn-blue italic">Eventos</span>
                    </h1>
                    <p className="text-slate-500 dark:text-gray-400 font-light italic text-lg leading-relaxed max-w-xl">
                        Administra y calendariza los eventos del Ministerio Internacional Vida Nueva.
                    </p>
                </div>
                <button className="flex items-center gap-3 bg-mivn-blue text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-2xl shadow-mivn-blue/20 hover:scale-105 transition-all">
                    <PlusCircle className="w-5 h-5" /> Nuevo Evento
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                {/* Left Sidebar: Create Form & Summary */}
                <div className="lg:col-span-4 space-y-6">
                    {/* Create Event Form */}
                    <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 border border-slate-100 dark:border-slate-800 shadow-xl">
                        <h2 className="text-xl font-bold font-playfair text-slate-900 dark:text-white mb-8 flex items-center gap-3">
                            <Edit3 className="w-5 h-5 text-mivn-blue" /> Crear Nuevo Evento
                        </h2>

                        <form className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Título del Evento</label>
                                <input
                                    className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl px-6 py-4 focus:border-mivn-blue transition-all outline-none text-slate-900 dark:text-white font-bold placeholder:text-slate-400 placeholder:font-normal"
                                    placeholder="Ej: Gran Congreso de Alabanza"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Categoría</label>
                                    <select className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl px-4 py-4 focus:border-mivn-blue transition-all outline-none text-slate-900 dark:text-white font-bold text-sm appearance-none cursor-pointer">
                                        <option>Culto</option>
                                        <option>Taller</option>
                                        <option>Congreso</option>
                                        <option>Especial</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Capacidad</label>
                                    <input
                                        type="number"
                                        className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl px-6 py-4 focus:border-mivn-blue transition-all outline-none text-slate-900 dark:text-white font-bold"
                                        placeholder="0"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Ubicación</label>
                                <div className="relative">
                                    <MapPin className="absolute left-5 top-4 w-5 h-5 text-slate-400" />
                                    <input
                                        className="w-full pl-14 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl pr-6 py-4 focus:border-mivn-blue transition-all outline-none text-slate-900 dark:text-white font-bold"
                                        placeholder="Templo Principal"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Orador Invitado</label>
                                <div className="relative">
                                    <User className="absolute left-5 top-4 w-5 h-5 text-slate-400" />
                                    <input
                                        className="w-full pl-14 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl pr-6 py-4 focus:border-mivn-blue transition-all outline-none text-slate-900 dark:text-white font-bold"
                                        placeholder="Nombre del Invitado"
                                    />
                                </div>
                            </div>

                            <button className="w-full bg-mivn-blue text-white font-black uppercase tracking-[0.2em] text-xs py-5 rounded-[1.5rem] shadow-xl shadow-mivn-blue/20 hover:scale-[1.02] active:scale-95 transition-all mt-4">
                                Programar Evento
                            </button>
                        </form>
                    </div>

                    {/* Mini Stats */}
                    <div className="bg-mivn-blue/5 border border-mivn-blue/10 rounded-[2.5rem] p-8 space-y-6">
                        <h3 className="text-mivn-blue font-black uppercase tracking-widest text-xs">Resumen Mensual</h3>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-slate-500 font-medium">Total Eventos</span>
                                <span className="text-slate-900 dark:text-white font-bold text-xl">12</span>
                            </div>
                            <div className="w-full h-px bg-mivn-blue/10" />
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-slate-500 font-medium">Congresos</span>
                                <span className="text-mivn-gold font-bold text-xl">2</span>
                            </div>
                            <div className="w-full h-px bg-mivn-blue/10" />
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-slate-500 font-medium">Total Inscritos</span>
                                <span className="text-slate-900 dark:text-white font-bold text-xl">458</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Content: Calendar & List */}
                <div className="lg:col-span-8 space-y-8">

                    {/* Calendar Component */}
                    <div className="bg-white dark:bg-slate-900 rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-xl overflow-hidden p-8">
                        <div className="flex items-center justify-between mb-8">
                            <div className="flex items-center gap-4">
                                <button className="w-10 h-10 rounded-xl hover:bg-slate-100 dark:hover:bg-white/5 flex items-center justify-center transition-colors">
                                    <ChevronLeft className="w-5 h-5 text-slate-600" />
                                </button>
                                <h3 className="text-2xl font-playfair font-black text-slate-900 dark:text-white">Octubre 2026</h3>
                                <button className="w-10 h-10 rounded-xl hover:bg-slate-100 dark:hover:bg-white/5 flex items-center justify-center transition-colors">
                                    <ChevronRight className="w-5 h-5 text-slate-600" />
                                </button>
                            </div>
                            <div className="bg-slate-100 dark:bg-white/5 rounded-2xl p-1.5 flex gap-1">
                                {['Mes', 'Semana', 'Día'].map((view, i) => (
                                    <button key={i} className={`px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${i === 0 ? 'bg-white dark:bg-slate-800 text-mivn-blue shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}>
                                        {view}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Calendar Grid */}
                        <div>
                            <div className="grid grid-cols-7 mb-4">
                                {['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'].map((day) => (
                                    <div key={day} className="text-center text-[10px] font-black text-slate-400 uppercase tracking-widest py-2">
                                        {day}
                                    </div>
                                ))}
                            </div>
                            <div className="grid grid-cols-7 gap-3">
                                {/* Empty Days */}
                                <div className="aspect-square"></div>
                                <div className="aspect-square"></div>
                                {/* Days */}
                                {[...Array(31)].map((_, i) => {
                                    const day = i + 1;
                                    const isToday = day === 5;
                                    const hasEvent = day === 12 || day === 26;
                                    return (
                                        <div key={day} className={`
                                            aspect-square rounded-2xl p-2 relative transition-all cursor-pointer group
                                            ${isToday ? 'bg-mivn-blue text-white shadow-xl shadow-mivn-blue/30 scale-110 z-10' : 'bg-slate-50 dark:bg-white/5 hover:bg-slate-100 dark:hover:bg-white/10 text-slate-700 dark:text-slate-300'}
                                        `}>
                                            <span className={`text-sm font-bold ${isToday ? 'text-white' : ''}`}>{day}</span>
                                            {isToday && (
                                                <div className="mt-1">
                                                    <div className="bg-white/20 backdrop-blur-sm rounded-lg px-2 py-1 text-[8px] font-bold leading-tight truncate">
                                                        Culto Alabanza
                                                    </div>
                                                </div>
                                            )}
                                            {hasEvent && !isToday && (
                                                <div className="mt-1">
                                                    <div className="bg-mivn-gold/10 text-mivn-gold rounded-lg px-2 py-1 text-[8px] font-bold leading-tight truncate">
                                                        {day === 12 ? 'Congreso' : 'Taller'}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>

                    {/* Upcoming List */}
                    <div className="bg-white dark:bg-slate-900 rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-xl overflow-hidden">
                        <div className="p-8 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
                            <h3 className="text-xl font-playfair font-black text-slate-900 dark:text-white">Próximos Eventos</h3>
                            <button className="text-[10px] font-black text-mivn-blue uppercase tracking-widest hover:underline flex items-center gap-1">
                                Ver todos <ChevronRight className="w-3 h-3" />
                            </button>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-slate-50 dark:bg-white/5 text-slate-400 text-[9px] uppercase font-black tracking-[0.2em]">
                                    <tr>
                                        <th className="px-8 py-6">Evento</th>
                                        <th className="px-8 py-6">Categoría</th>
                                        <th className="px-8 py-6">Inscritos</th>
                                        <th className="px-8 py-6 text-right">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                                    {[
                                        { title: "Congreso Avivamiento 2026", date: "12 Oct - 15 Oct", category: "Congreso", filled: 85, total: 500, color: "text-mivn-gold bg-mivn-gold/10 border-mivn-gold/20" },
                                        { title: "Culto Adoración Extrema", date: "26 Oct | 19:00 PM", category: "Culto", filled: 40, total: 300, color: "text-mivn-blue bg-mivn-blue/10 border-mivn-blue/20" },
                                        { title: "Taller: Liderazgo Moderno", date: "30 Oct | 09:00 AM", category: "Taller", filled: 100, total: 100, color: "text-emerald-600 bg-emerald-100 border-emerald-200" },
                                    ].map((event, i) => (
                                        <tr key={i} className="group hover:bg-slate-50 dark:hover:bg-white/[0.02] transition-colors">
                                            <td className="px-8 py-6">
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-tight">{event.title}</span>
                                                    <span className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-wide">{event.date}</span>
                                                </div>
                                            </td>
                                            <td className="px-8 py-6">
                                                <span className={`px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest border ${event.color}`}>
                                                    {event.category}
                                                </span>
                                            </td>
                                            <td className="px-8 py-6">
                                                <div className="space-y-2">
                                                    <div className="flex items-center justify-between text-[10px] font-bold text-slate-500">
                                                        <span>{event.filled}% Lleno</span>
                                                        <span>{Math.round(event.total * (event.filled / 100))} / {event.total}</span>
                                                    </div>
                                                    <div className="w-24 h-1.5 bg-slate-100 dark:bg-white/10 rounded-full overflow-hidden">
                                                        <div
                                                            className={`h-full rounded-full ${event.filled === 100 ? 'bg-emerald-500' : 'bg-mivn-blue'}`}
                                                            style={{ width: `${event.filled}%` }}
                                                        />
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-8 py-6 text-right">
                                                <button className="inline-flex items-center gap-2 bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-300 px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-mivn-blue hover:text-white transition-all">
                                                    <Download className="w-3 h-3" /> Descargar
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

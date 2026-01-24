"use client";

import { Calendar as CalendarIcon, Clock, User, MapPin, ChevronLeft, ChevronRight, Bookmark, ArrowRight, Bell, Sparkles, Filter, Search } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export const EventsPreview = () => {
    const [openFilter, setOpenFilter] = useState("Todos");

    const filters = ["Todos", "Cultos", "Talleres", "Grupos"];

    const eventCards = [
        {
            day: "12",
            month: "OCT",
            type: "Culto de Adoración",
            title: "Servicio Dominical: \"Renovados por Su Gracia\"",
            time: "10:00 AM - 12:00 PM",
            pastor: "Pastor David Rodríguez",
            loc: "Santuario Principal",
            color: "blue"
        },
        {
            day: "15",
            month: "OCT",
            type: "Taller de Crecimiento",
            title: "Taller: Finanzas con Propósito",
            time: "07:00 PM - 09:00 PM",
            pastor: "Hno. Luis Sánchez",
            loc: "Vía Zoom / Salón B",
            color: "green"
        },
        {
            day: "18",
            month: "OCT",
            type: "Grupo Vida",
            title: "Reunión de Jóvenes: \"Enfocados\"",
            time: "06:30 PM",
            pastor: "Equipo de Jóvenes",
            loc: "Parque Central",
            color: "red"
        }
    ];

    const getColorClasses = (color: string) => {
        switch (color) {
            case "blue": return "bg-mivn-blue/10 text-mivn-blue border-mivn-blue/20";
            case "green": return "bg-emerald-500/10 text-emerald-500 border-emerald-500/20";
            case "red": return "bg-rose-500/10 text-rose-500 border-rose-500/20";
            default: return "bg-white/5 text-gray-400 border-white/10";
        }
    };

    return (
        <div className="bg-background-light dark:bg-background-dark min-h-screen font-lexend">

            {/* Hero Section */}
            <section className="relative py-20 px-4 overflow-hidden border-b border-slate-100 dark:border-white/5">
                <div className="max-w-7xl mx-auto flex flex-col items-center text-center space-y-8 relative z-10">
                    <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-1000">
                        <span className="text-mivn-gold font-black uppercase tracking-[0.5em] text-xs">Agenda Institucional</span>
                        <h1 className="text-5xl md:text-7xl font-playfair font-bold text-slate-900 dark:text-white leading-tight">
                            Calendario de <span className="italic text-mivn-blue">Bendición</span>
                        </h1>
                        <p className="text-xl text-slate-500 dark:text-slate-400 font-light italic max-w-2xl mx-auto leading-relaxed">
                            "Mantente al tanto de nuestros cultos, talleres y actividades especiales. ¡Te esperamos con los brazos abiertos!"
                        </p>
                    </div>

                    <div className="flex flex-col md:flex-row gap-6 w-full max-w-2xl">
                        <div className="relative flex-1">
                            <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Buscar eventos..."
                                className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 py-5 pl-16 pr-8 rounded-full text-sm focus:border-mivn-blue outline-none transition-all shadow-sm"
                            />
                        </div>
                        <button className="bg-mivn-blue text-white px-10 py-5 rounded-full font-black uppercase tracking-widest text-[10px] shadow-2xl shadow-mivn-blue/20 hover:scale-105 active:scale-95 transition-all">
                            Sincronizar Calendar
                        </button>
                    </div>
                </div>

                {/* Decorative */}
                <div className="absolute top-0 right-0 p-10 opacity-5 -z-0">
                    <CalendarIcon className="w-96 h-96 text-mivn-blue" />
                </div>
            </section>

            <main className="max-w-7xl mx-auto px-4 py-16 lg:py-24">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">

                    {/* Calendar Column */}
                    <div className="lg:col-span-7 xl:col-span-8 space-y-10">
                        <div className="bg-white dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 rounded-[3.5rem] p-10 md:p-16 shadow-2xl relative overflow-hidden group">

                            <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-12 relative z-10">
                                <div className="space-y-2">
                                    <h3 className="text-3xl font-playfair font-bold text-slate-900 dark:text-white">Octubre 2024</h3>
                                    <p className="text-xs text-mivn-gold font-black uppercase tracking-widest">Mes de la Reforma</p>
                                </div>
                                <div className="flex items-center gap-4">
                                    <button className="w-12 h-12 rounded-2xl bg-slate-50 dark:bg-white/5 flex items-center justify-center text-slate-400 hover:text-mivn-blue border border-slate-100 dark:border-white/5 transition-all">
                                        <ChevronLeft className="w-6 h-6" />
                                    </button>
                                    <button className="px-6 py-2 rounded-xl bg-mivn-blue/10 text-mivn-blue font-bold text-xs uppercase tracking-widest">Hoy</button>
                                    <button className="w-12 h-12 rounded-2xl bg-slate-50 dark:bg-white/5 flex items-center justify-center text-slate-400 hover:text-mivn-blue border border-slate-100 dark:border-white/5 transition-all">
                                        <ChevronRight className="w-6 h-6" />
                                    </button>
                                </div>
                            </div>

                            <div className="grid grid-cols-7 gap-2 md:gap-4 relative z-10">
                                {["DOM", "LUN", "MAR", "MIÉ", "JUE", "VIE", "SÁB"].map(d => (
                                    <span key={d} className="text-[10px] font-black text-slate-400 tracking-widest text-center py-4">{d}</span>
                                ))}
                                {Array.from({ length: 31 }).map((_, i) => (
                                    <div key={i} className={`aspect-square rounded-[1.5rem] md:rounded-[2rem] border flex flex-col items-center justify-center text-sm md:text-lg font-bold transition-all cursor-pointer relative group ${i === 11 ? "bg-mivn-blue text-white border-mivn-blue shadow-2xl scale-105" : "bg-slate-50/50 dark:bg-white/5 border-slate-100 dark:border-white/5 text-slate-500 dark:text-gray-400 hover:border-mivn-blue/40 hover:scale-105"
                                        }`}>
                                        <span className="relative z-10">{i + 1}</span>
                                        {i === 11 && (
                                            <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-[8px] font-black uppercase tracking-widest px-4 py-2 rounded-full whitespace-nowrap z-20 opacity-0 group-hover:opacity-100 transition-all shadow-xl">
                                                Culto Dominical
                                            </div>
                                        )}
                                        {(i === 14 || i === 17) && (
                                            <div className="absolute bottom-4 w-1.5 h-1.5 rounded-full bg-mivn-gold shadow-[0_0_10px_#D4AF37]" />
                                        )}
                                        {i === 5 && (
                                            <div className="absolute inset-0 border-2 border-mivn-gold/30 rounded-[1.5rem] md:rounded-[2rem]" />
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Event Types / Legend */}
                        <div className="bg-white dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 p-10 rounded-[3rem] shadow-xl flex flex-wrap justify-between items-center gap-8">
                            <div className="flex gap-8">
                                <div className="flex items-center gap-3">
                                    <div className="w-3 h-3 rounded-full bg-mivn-blue" />
                                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Cultos</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-3 h-3 rounded-full bg-emerald-500" />
                                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Talleres</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-3 h-3 rounded-full bg-rose-500" />
                                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Grupos Vida</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar Events Column */}
                    <div className="lg:col-span-5 xl:col-span-4 space-y-10">

                        {/* Filters */}
                        <div className="bg-white dark:bg-slate-900 p-10 rounded-[3rem] shadow-xl border border-slate-100 dark:border-slate-800 space-y-6">
                            <div className="flex items-center gap-3 pb-4 border-b border-slate-50 dark:border-white/5">
                                <Filter className="w-4 h-4 text-mivn-gold" />
                                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Filtrar por categoría</h4>
                            </div>
                            <div className="flex flex-wrap gap-4">
                                {filters.map(f => (
                                    <button
                                        key={f}
                                        onClick={() => setOpenFilter(f)}
                                        className={`px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${openFilter === f ? "bg-mivn-blue text-white shadow-xl shadow-mivn-blue/20 scale-105" : "bg-slate-50 dark:bg-white/5 text-slate-500 hover:bg-slate-100 dark:hover:bg-white/10"}`}
                                    >
                                        {f}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Event Cards List */}
                        <div className="space-y-8">
                            <div className="px-6 flex justify-between items-center">
                                <h4 className="text-2xl font-playfair font-bold text-slate-900 dark:text-white">Próximos Eventos</h4>
                                <span className="bg-mivn-gold/10 text-mivn-gold text-[9px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest">3 hoy</span>
                            </div>

                            <div className="space-y-6">
                                {eventCards.map((e, i) => (
                                    <div key={i} className="group bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-8 rounded-[3rem] hover:shadow-2xl hover:border-mivn-blue/30 transition-all duration-500 flex flex-col gap-6 relative overflow-hidden">
                                        <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:rotate-12 transition-transform">
                                            <Sparkles className="w-24 h-24 text-mivn-gold" />
                                        </div>

                                        <div className="flex items-start gap-8 relative z-10">
                                            <div className={`w-16 h-16 md:w-20 md:h-20 rounded-[1.5rem] md:rounded-[2rem] flex flex-col items-center justify-center shrink-0 border transition-all ${getColorClasses(e.color)} group-hover:scale-110`}>
                                                <span className="text-[10px] font-black uppercase tracking-widest opacity-70">{e.month}</span>
                                                <span className="text-2xl md:text-3xl font-black">{e.day}</span>
                                            </div>

                                            <div className="space-y-4 flex-1">
                                                <div className="flex justify-between items-start">
                                                    <span className={`px-4 py-1.5 rounded-full text-[8px] font-black uppercase tracking-widest ${getColorClasses(e.color)} border-0`}>
                                                        {e.type}
                                                    </span>
                                                    <Bookmark className="w-5 h-5 text-slate-200 hover:text-mivn-gold cursor-pointer transition-colors" />
                                                </div>
                                                <h5 className="text-xl font-playfair font-bold text-slate-800 dark:text-white leading-tight group-hover:text-mivn-blue transition-colors">
                                                    {e.title}
                                                </h5>

                                                <div className="space-y-2 pt-2">
                                                    <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400 font-medium">
                                                        <Clock className="w-4 h-4 text-mivn-gold" /> {e.time}
                                                    </div>
                                                    <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400 font-medium">
                                                        <User className="w-4 h-4 text-mivn-gold" /> {e.pastor}
                                                    </div>
                                                    <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400 font-medium">
                                                        <MapPin className="w-4 h-4 text-mivn-gold" /> {e.loc}
                                                    </div>
                                                </div>

                                                <div className="flex gap-4 pt-4">
                                                    <button className="flex-1 bg-mivn-blue text-white py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-900 transition-all shadow-xl shadow-mivn-blue/10 active:scale-95">
                                                        Registrarme
                                                    </button>
                                                    <button className="px-6 py-4 border border-slate-100 dark:border-slate-800 rounded-2xl text-slate-400 hover:text-mivn-blue hover:bg-mivn-blue/5 transition-all">
                                                        <Bell className="w-5 h-5" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <button className="w-full py-10 text-[10px] font-black text-slate-400 hover:text-mivn-blue uppercase tracking-[0.4em] transition-all flex items-center justify-center gap-4 group">
                                Ver todos los eventos <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

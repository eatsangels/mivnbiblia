"use client";

import { Clock, MapPin, Calendar, Bell, ChevronRight } from "lucide-react";

export const UpcomingServices = () => {
    return (
        <section className="py-32 px-4 relative overflow-hidden bg-mivn-bg-dark">
            <div className="max-w-7xl mx-auto">
                {/* Section Header */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
                    <div className="space-y-4">
                        <div className="inline-block px-4 py-1.5 rounded-lg bg-mivn-gold/10 text-mivn-gold text-[10px] font-black uppercase tracking-[0.3em]">
                            Cerca de Ti
                        </div>
                        <h3 className="text-4xl md:text-6xl font-playfair font-bold text-white">Próximos Encuentros</h3>
                    </div>
                    <button className="group flex items-center gap-3 text-mivn-blue font-black uppercase tracking-widest text-[10px] hover:text-white transition-colors">
                        Ver calendario completo
                        <div className="w-8 h-8 rounded-full border border-mivn-blue/30 flex items-center justify-center group-hover:bg-mivn-blue group-hover:text-white transition-all">
                            <ChevronRight className="w-4 h-4" />
                        </div>
                    </button>
                </div>

                {/* Hero Countdown - Featured Service */}
                <div className="relative mb-24 group">
                    <div className="absolute inset-0 bg-mivn-blue/20 blur-[100px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000 -z-0" />
                    <div className="relative z-10 bg-white/5 border border-white/10 rounded-[4rem] p-10 md:p-20 overflow-hidden shadow-2xl">
                        <div className="grid lg:grid-cols-12 gap-16 items-center">
                            <div className="lg:col-span-7 space-y-10">
                                <div className="space-y-4">
                                    <span className="text-mivn-gold font-black uppercase tracking-[0.5em] text-xs">Gran Culto Dominical</span>
                                    <h4 className="text-4xl md:text-7xl font-playfair font-bold text-white leading-tight">
                                        La Presencia de Dios nos Transforma
                                    </h4>
                                    <p className="text-xl text-gray-400 font-light leading-relaxed italic">
                                        "Lámpara es a mis pies tu palabra, y lumbrera a mi camino." — Salmos 119:105
                                    </p>
                                </div>

                                <div className="flex flex-wrap gap-8">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-2xl bg-mivn-blue/10 flex items-center justify-center text-mivn-blue">
                                            <Calendar className="w-6 h-6" />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-[10px] text-gray-600 font-bold uppercase tracking-widest">Fecha</span>
                                            <span className="text-white font-bold">Domingo, 10 Nov</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-2xl bg-mivn-blue/10 flex items-center justify-center text-mivn-blue">
                                            <Clock className="w-6 h-6" />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-[10px] text-gray-600 font-bold uppercase tracking-widest">Hora</span>
                                            <span className="text-white font-bold">10:00 AM CST</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <button className="bg-mivn-blue text-white px-10 py-5 rounded-[2rem] font-black uppercase tracking-widest text-xs shadow-2xl shadow-mivn-blue/30 hover:scale-105 active:scale-95 transition-all">
                                        Recordarme
                                    </button>
                                    <button className="p-5 border border-white/10 rounded-[2rem] text-white hover:bg-white/5 transition-colors">
                                        <Bell className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>

                            {/* Countdown Display */}
                            <div className="lg:col-span-5 flex justify-center lg:justify-end">
                                <div className="grid grid-cols-2 gap-6">
                                    {[
                                        { label: "Días", val: "02" },
                                        { label: "Horas", val: "14" },
                                        { label: "Mins", val: "45" },
                                        { label: "Segs", val: "30" }
                                    ].map((t, i) => (
                                        <div key={i} className="w-32 h-32 md:w-40 md:h-40 rounded-[2.5rem] bg-gradient-to-br from-white/10 to-white/5 border border-white/10 flex flex-col items-center justify-center shadow-2xl relative group/timer">
                                            <div className="absolute inset-0 bg-mivn-gold/5 opacity-0 group-hover/timer:opacity-100 transition-opacity rounded-[2.5rem]" />
                                            <span className="text-4xl md:text-6xl font-black text-mivn-gold gold-glow-mivn leading-none mb-2">
                                                {t.val}
                                            </span>
                                            <span className="text-[10px] text-gray-400 font-black uppercase tracking-widest">
                                                {t.label}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Secondary Services Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        { day: "MAR", date: "12", title: "Círculo de Oración", time: "7:00 PM", loc: "Templo Central" },
                        { day: "JUE", date: "14", title: "Estudio Bíblico", time: "7:30 PM", loc: "Salón B / Virtual" },
                        { day: "VIE", date: "15", title: "Noche de Jóvenes", time: "8:00 PM", loc: "Santuario Principal" }
                    ].map((s, i) => (
                        <div key={i} className="group bg-white/5 border border-white/10 rounded-[3rem] p-8 hover:border-mivn-blue/30 transition-all shadow-xl">
                            <div className="flex gap-6 items-center">
                                <div className="w-16 h-16 rounded-2xl bg-mivn-blue/10 flex flex-col items-center justify-center border border-mivn-blue/20">
                                    <span className="text-[10px] font-black text-mivn-blue uppercase">{s.day}</span>
                                    <span className="text-2xl font-black text-white">{s.date}</span>
                                </div>
                                <div>
                                    <h5 className="text-xl font-playfair font-bold text-white group-hover:text-mivn-blue transition-colors">{s.title}</h5>
                                    <div className="flex items-center gap-4 mt-2">
                                        <span className="text-[10px] text-gray-500 font-bold uppercase flex items-center gap-1">
                                            <Clock className="w-3 h-3 text-mivn-gold" /> {s.time}
                                        </span>
                                        <span className="text-[10px] text-gray-500 font-bold uppercase flex items-center gap-1">
                                            <MapPin className="w-3 h-3 text-mivn-gold" /> {s.loc}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

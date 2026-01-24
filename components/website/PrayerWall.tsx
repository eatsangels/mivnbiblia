"use client";

import { Send, Lock, Globe, Star, Heart, MessageCircle, User, Edit3, ShieldCheck, CheckCircle2, ChevronDown, Sparkles } from "lucide-react";
import { useState } from "react";

export const PrayerWall = () => {
    const [activeTab, setActiveTab] = useState("Recientes");

    const requests = [
        {
            name: "María López",
            time: "Hace 2 horas",
            title: "Sanidad por cirugía",
            text: "Doy gracias a Dios porque la operación de mi hijo fue un éxito. Los médicos están asombrados por su recuperación. ¡La oración tiene poder!",
            praying: 124,
            responded: true,
            initials: "ML"
        },
        {
            name: "Anónimo",
            time: "Hace 5 horas",
            title: "Fortaleza en el desempleo",
            text: "Pido oración por mi situación laboral. Llevo 3 meses buscando y el desánimo quiere entrar. Pido que Dios abra una puerta conforme a Su voluntad.",
            praying: 42,
            responded: false,
            initials: "?"
        },
        {
            name: "Juan Sánchez",
            time: "Ayer",
            title: "Restauración Familiar",
            text: "Pido oración por la relación con mis hijos. Que el Espíritu Santo traiga perdón y reconciliación a nuestro hogar.",
            praying: 18,
            responded: false,
            initials: "JS"
        },
        {
            name: "Elena Peña",
            time: "Ayer",
            title: "Paz en la Tormenta",
            text: "Gracias a todos los que oraron por mi ansiedad. He sentido una paz que sobrepasa todo entendimiento esta semana. ¡Dios es fiel!",
            praying: 67,
            responded: true,
            initials: "EP"
        }
    ];

    return (
        <div className="bg-background-light dark:bg-background-dark min-h-screen font-lexend">

            {/* Hero Section */}
            <section className="relative min-h-[500px] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-slate-900 group">
                    <img
                        src="https://images.unsplash.com/photo-1507434965515-61970f2bd7c6?auto=format&fit=crop&q=80&w=2000"
                        alt="Prayer background"
                        className="w-full h-full object-cover opacity-30 group-hover:scale-105 transition-transform duration-1000"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
                </div>

                <div className="relative z-10 max-w-4xl mx-auto px-4 text-center space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">
                    <div className="space-y-4">
                        <span className="text-mivn-gold font-black uppercase tracking-[0.5em] text-[10px]">Poder que transforma</span>
                        <h1 className="text-5xl md:text-8xl font-playfair font-bold text-white leading-tight">Unidos en <span className="italic text-mivn-blue">Oración</span></h1>
                        <p className="text-white/80 text-xl md:text-2xl font-light italic max-w-2xl mx-auto leading-relaxed">
                            "Donde dos o tres se reúnen en mi nombre, allí estoy yo en medio de ellos." - Mateo 18:20
                        </p>
                    </div>
                    <div className="pt-8">
                        <button
                            onClick={() => document.getElementById("submit-form")?.scrollIntoView({ behavior: 'smooth' })}
                            className="bg-mivn-blue text-white px-12 py-5 rounded-[2.5rem] font-black uppercase tracking-[0.3em] text-[10px] shadow-2xl shadow-mivn-blue/20 hover:scale-105 active:scale-95 transition-all"
                        >
                            Enviar Petición Ahora
                        </button>
                    </div>
                </div>
            </section>

            <main className="max-w-7xl mx-auto px-4 py-24 grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 relative">

                {/* 1. Form Panel */}
                <aside className="lg:col-span-4 space-y-12" id="submit-form">
                    <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-10 md:p-12 rounded-[3.5rem] shadow-2xl space-y-10 group">
                        <div className="flex items-center gap-4 mb-2">
                            <div className="w-12 h-12 bg-mivn-blue/10 rounded-2xl flex items-center justify-center text-mivn-blue group-hover:scale-110 transition-transform">
                                <Edit3 className="w-6 h-6" />
                            </div>
                            <h2 className="text-2xl font-playfair font-bold text-slate-800 dark:text-white">Enviar Petición</h2>
                        </div>

                        <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
                            <div className="space-y-3">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Nombre Completo</label>
                                <input type="text" className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl py-5 px-8 text-slate-800 dark:text-white focus:border-mivn-blue transition-all outline-none italic" placeholder="Escribe tu nombre..." />
                                <div className="flex items-center gap-3 px-4 pt-2">
                                    <input type="checkbox" id="anon" className="rounded border-slate-300 dark:border-white/10 text-mivn-blue focus:ring-mivn-blue" />
                                    <label htmlFor="anon" className="text-[10px] font-bold text-slate-400 uppercase tracking-widest cursor-pointer">Publicar de forma anónima</label>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Tu Mensaje</label>
                                <textarea rows={5} className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-[2.5rem] py-6 px-8 text-slate-800 dark:text-white focus:border-mivn-blue transition-all outline-none resize-none italic" placeholder="Comparte tu necesidad con nosotros..." />
                            </div>

                            <div className="space-y-4">
                                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Visibilidad</p>
                                <div className="grid grid-cols-2 gap-4">
                                    <label className="relative flex flex-col items-center justify-center gap-3 p-6 border-2 border-mivn-blue/20 bg-mivn-blue/5 rounded-3xl cursor-pointer hover:bg-mivn-blue/10 transition-colors">
                                        <input type="radio" name="visibility" className="hidden" defaultChecked />
                                        <Globe className="w-5 h-5 text-mivn-blue" />
                                        <span className="text-[9px] font-black uppercase tracking-widest text-mivn-blue">Pública</span>
                                    </label>
                                    <label className="relative flex flex-col items-center justify-center gap-3 p-6 border-2 border-slate-100 dark:border-white/5 rounded-3xl cursor-pointer hover:bg-slate-50 dark:hover:bg-white/10 transition-colors">
                                        <input type="radio" name="visibility" className="hidden" />
                                        <Lock className="w-5 h-5 text-slate-400" />
                                        <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">Privada</span>
                                    </label>
                                </div>
                                <p className="text-[10px] text-slate-400 italic px-4 leading-relaxed">
                                    *Las peticiones privadas solo serán vistas por el equipo de intercesión y pastores.
                                </p>
                            </div>

                            <button className="w-full bg-mivn-blue text-white py-6 rounded-3xl font-black uppercase tracking-[0.3em] text-[10px] shadow-2xl shadow-mivn-blue/20 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-4">
                                Enviar Petición <Send className="w-4 h-4" />
                            </button>
                        </form>
                    </div>

                    <div className="bg-mivn-gold/10 border border-mivn-gold/20 p-10 rounded-[3rem] space-y-4 relative overflow-hidden group">
                        <div className="absolute -bottom-10 -right-10 opacity-5 group-hover:scale-110 transition-transform">
                            <ShieldCheck className="w-40 h-40 text-mivn-gold" />
                        </div>
                        <h3 className="text-lg font-playfair font-bold text-mivn-gold flex items-center gap-3 uppercase tracking-tight">
                            <ShieldCheck className="w-6 h-6" /> Confidencialidad
                        </h3>
                        <p className="text-sm text-slate-600 dark:text-slate-400 font-light italic leading-relaxed relative z-10">
                            "Tus peticiones son tratadas con amor y respeto. Si eliges el modo privado, nuestro equipo dedicará tiempo específico a clamar por tu situación en secreto ante el Padre."
                        </p>
                    </div>
                </aside>

                {/* 2. Wall Section */}
                <div className="lg:col-span-8 space-y-16">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 border-b border-slate-100 dark:border-white/5 pb-10">
                        <div className="space-y-2">
                            <span className="text-mivn-gold font-black uppercase tracking-[0.5em] text-xs">Comunidad</span>
                            <h2 className="text-4xl font-playfair font-bold text-slate-800 dark:text-white">Muro de Intercesión</h2>
                        </div>
                        <div className="flex bg-slate-100 dark:bg-white/5 p-1.5 rounded-2xl gap-2">
                            {["Recientes", "Más Oradas", "Testimonios"].map(tab => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === tab ? "bg-white dark:bg-slate-800 text-mivn-blue shadow-lg" : "text-slate-400 hover:text-slate-600 dark:hover:text-white"}`}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {requests.map((r, i) => (
                            <div key={i} className={`group bg-white dark:bg-slate-900 border ${r.responded ? "border-mivn-gold/30 shadow-mivn-gold/5" : "border-slate-100 dark:border-slate-800"} rounded-[3.5rem] p-10 space-y-8 hover:shadow-2xl transition-all duration-500 relative overflow-hidden`}>

                                {r.responded && (
                                    <div className="absolute top-8 right-8 bg-mivn-gold/10 text-mivn-gold px-4 py-1.5 rounded-full border border-mivn-gold/20 flex items-center gap-2 text-[8px] font-black tracking-widest uppercase shadow-lg">
                                        <Star className="w-3 h-3 fill-current" /> Respondida
                                    </div>
                                )}

                                <div className="flex items-center gap-6">
                                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center font-black text-xl transition-all group-hover:scale-110 shadow-xl ${r.responded ? "bg-mivn-gold text-white" : "bg-slate-100 dark:bg-white/5 text-slate-400 border border-slate-100 dark:border-white/5"}`}>
                                        {r.initials}
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-playfair font-bold text-slate-800 dark:text-white uppercase tracking-tight">{r.name}</h4>
                                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{r.time}</p>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <h5 className="text-xl font-bold text-slate-800 dark:text-white leading-tight underline decoration-mivn-blue/30 decoration-2 underline-offset-4">{r.title}</h5>
                                    <p className="text-slate-500 dark:text-slate-400 font-light italic leading-relaxed text-base">
                                        "{r.text}"
                                    </p>
                                </div>

                                <div className="flex items-center justify-between pt-8 border-t border-slate-50 dark:border-white/5">
                                    <div className="flex items-center gap-3 text-mivn-blue">
                                        <div className="relative flex h-3 w-3">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-mivn-blue opacity-75" />
                                            <Heart className="relative inline-flex h-3 w-3 fill-current" />
                                        </div>
                                        <span className="text-[10px] font-black uppercase tracking-widest">{r.praying} Orando</span>
                                    </div>
                                    <button className={`px-6 py-3 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${r.responded ? "bg-slate-100 dark:bg-white/5 text-slate-400" : "bg-mivn-blue text-white shadow-xl shadow-mivn-blue/20 hover:scale-105"}`}>
                                        {r.responded ? "Amén" : "Me uno en oración"}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="flex justify-center pt-8">
                        <button className="group flex items-center gap-4 px-12 py-5 rounded-[2.5rem] border-2 border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 font-black uppercase tracking-widest text-[10px] hover:border-mivn-blue hover:text-mivn-blue transition-all">
                            Ver más peticiones
                            <ChevronDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
                        </button>
                    </div>
                </div>

            </main>
        </div>
    );
};

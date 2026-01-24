"use client";

import { Download, BookOpen, FileText, Music, Play, ExternalLink, Sparkles, Search, Calendar, ChevronDown, FileType, Star } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export const ResourcesLibrary = () => {
    const [activeCategory, setActiveCategory] = useState("Todos");

    const categories = ["Todos", "Libros PDF", "Guías de Estudio", "Manuales Líderes", "Material Infantil"];

    const resources = [
        {
            title: "El Poder de la Oración Diaria",
            type: "Libro PDF",
            size: "4.2 MB",
            desc: "Una guía práctica para desarrollar una vida de comunión constante con Dios.",
            img: "https://images.unsplash.com/photo-1544640805-b593daa547ec?auto=format&fit=crop&q=80&w=1000",
            category: "Libros PDF",
            color: "bg-mivn-blue"
        },
        {
            title: "Aventuras Bíblicas para Pequeños",
            type: "Material Infantil",
            size: "18 MB",
            desc: "Manual de actividades y dibujos para colorear basado en los evangelios.",
            img: "https://images.unsplash.com/photo-1541976844346-f18aeac57b06?auto=format&fit=crop&q=80&w=1000",
            category: "Material Infantil",
            color: "bg-orange-500"
        },
        {
            title: "Estudio de Efesios en 40 Días",
            type: "Guía de Estudio",
            size: "2.1 MB",
            desc: "Plan de lectura y preguntas de reflexión para grupos pequeños o estudio personal.",
            img: "https://images.unsplash.com/photo-1507434965515-61970f2bd7c6?auto=format&fit=crop&q=80&w=1000",
            category: "Guías de Estudio",
            color: "bg-emerald-500"
        },
        {
            title: "Manual de Gestión Ministerial",
            type: "Manual Líderes",
            size: "5.7 MB",
            desc: "Herramientas organizativas para pastores y servidores locales.",
            img: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=1000",
            category: "Manuales Líderes",
            color: "bg-indigo-500"
        }
    ];

    return (
        <div className="bg-background-light dark:bg-background-dark min-h-screen font-lexend">

            {/* Hero Section */}
            <section className="relative py-24 lg:py-40 px-4 overflow-hidden">
                <div className="absolute inset-0 bg-slate-900 group">
                    <img
                        src="https://images.unsplash.com/photo-1507434965515-61970f2bd7c6?auto=format&fit=crop&q=80&w=2000"
                        alt="Resources Background"
                        className="w-full h-full object-cover opacity-30 group-hover:scale-105 transition-transform duration-1000"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
                </div>

                <div className="max-w-7xl mx-auto relative z-10 text-center space-y-12">
                    <div className="space-y-6 animate-in fade-in slide-in-from-top-4 duration-1000">
                        <span className="text-mivn-gold font-black uppercase tracking-[0.5em] text-[10px]">Biblioteca Digital</span>
                        <h1 className="text-5xl md:text-8xl font-playfair font-bold text-white leading-tight">
                            Recursos para <span className="italic text-mivn-blue">tu Crecimiento</span>
                        </h1>
                        <p className="text-white/80 text-xl md:text-2xl font-light italic max-w-3xl mx-auto leading-relaxed">
                            Encuentra herramientas espirituales, libros y manuales diseñados para fortalecer tu fe y liderazgo ministerial.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-6 justify-center">
                        <button className="bg-mivn-blue text-white px-12 py-5 rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-2xl shadow-mivn-blue/20 hover:scale-105 transition-all flex items-center justify-center gap-4">
                            <BookOpen className="w-5 h-5" /> Explorar Biblioteca
                        </button>
                        <button className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-12 py-5 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-white/20 transition-all">
                            Últimas Guías
                        </button>
                    </div>
                </div>
            </section>

            <main className="max-w-7xl mx-auto px-4 py-24 space-y-24">

                {/* Search and Filters */}
                <section className="flex flex-col lg:flex-row gap-8 items-center justify-between border-b border-slate-100 dark:border-white/5 pb-12">
                    <div className="w-full lg:max-w-md relative group">
                        <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-hover:text-mivn-blue transition-colors" />
                        <input
                            type="text"
                            placeholder="Buscar en la biblioteca..."
                            className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl py-5 pl-16 pr-8 text-sm outline-none focus:border-mivn-blue transition-all italic font-light"
                        />
                    </div>
                    <div className="flex flex-wrap gap-3 justify-center">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeCategory === cat ? "bg-mivn-blue text-white shadow-xl shadow-mivn-blue/20" : "bg-white dark:bg-slate-800 text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-100 dark:border-slate-800"}`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </section>

                {/* Featured Resource */}
                <section className="space-y-12">
                    <div className="flex items-center gap-4">
                        <Sparkles className="w-6 h-6 text-mivn-gold animate-pulse" />
                        <h2 className="text-2xl font-playfair font-bold text-slate-800 dark:text-white uppercase tracking-tight">Recurso Destacado</h2>
                    </div>

                    <div className="bg-white dark:bg-slate-900 border-2 border-mivn-gold/30 rounded-[4rem] p-10 md:p-16 flex flex-col lg:flex-row gap-16 items-center shadow-2xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-20 opacity-5 group-hover:rotate-12 transition-transform">
                            <Star className="w-64 h-64 text-mivn-gold" />
                        </div>

                        <div className="w-full lg:w-1/3 aspect-[3/4] rounded-3xl overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.2)] group-hover:scale-105 transition-transform duration-700">
                            <img
                                src="https://images.unsplash.com/photo-1544640805-b593daa547ec?auto=format&fit=crop&q=80&w=1000"
                                alt="Featured Book"
                                className="w-full h-full object-cover"
                            />
                        </div>

                        <div className="flex-1 space-y-8 relative z-10">
                            <div className="inline-block px-5 py-2 rounded-full bg-mivn-gold/10 text-mivn-gold text-[9px] font-black uppercase tracking-[0.3em] border border-mivn-gold/20">
                                Recomendado del Mes
                            </div>
                            <h3 className="text-4xl md:text-6xl font-playfair font-bold text-slate-800 dark:text-white leading-tight">Fundamentos para Líderes de Hoy</h3>
                            <p className="text-xl text-slate-500 dark:text-slate-400 font-light italic leading-relaxed border-l-4 border-mivn-gold/30 pl-8">
                                Un manual exhaustivo que explora los pilares del servicio cristiano en el siglo XXI. Ideal para grupos de discipulado y formación ministerial intensa.
                            </p>

                            <div className="flex flex-wrap gap-8 py-4">
                                <div className="flex items-center gap-3 text-slate-400 text-[10px] font-black uppercase tracking-widest">
                                    <Calendar className="w-4 h-4 text-mivn-gold" /> Oct 2024
                                </div>
                                <div className="flex items-center gap-3 text-slate-400 text-[10px] font-black uppercase tracking-widest">
                                    <FileType className="w-4 h-4 text-mivn-gold" /> PDF (12.5 MB)
                                </div>
                            </div>

                            <button className="w-full md:w-auto bg-mivn-gold text-white px-12 py-6 rounded-[2.5rem] font-black uppercase tracking-[0.3em] text-[10px] shadow-2xl shadow-mivn-gold/20 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-4">
                                <Download className="w-5 h-5" /> Descargar Ahora
                            </button>
                        </div>
                    </div>
                </section>

                {/* Library Grid */}
                <section className="space-y-16">
                    <h2 className="text-3xl font-playfair font-bold text-slate-800 dark:text-white">Biblioteca <span className="italic text-mivn-blue">Completa</span></h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
                        {resources.map((r, i) => (
                            <div key={i} className="group flex flex-col bg-white dark:bg-slate-900 rounded-[3rem] overflow-hidden border border-slate-100 dark:border-slate-800 hover:shadow-2xl hover:-translate-y-4 transition-all duration-500">
                                <div className="aspect-[4/5] relative overflow-hidden">
                                    <div className={`absolute top-6 left-6 z-10 ${r.color} text-white text-[8px] font-black px-4 py-1.5 rounded-lg uppercase tracking-widest shadow-lg`}>
                                        {r.type}
                                    </div>
                                    <img
                                        src={r.img}
                                        alt={r.title}
                                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                        <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md border border-white/40 flex items-center justify-center text-white scale-75 group-hover:scale-100 transition-transform">
                                            <Download className="w-6 h-6" />
                                        </div>
                                    </div>
                                </div>

                                <div className="p-8 space-y-6 flex-1 flex flex-col">
                                    <h4 className="text-xl font-playfair font-bold text-slate-800 dark:text-white leading-tight min-h-[56px] line-clamp-2">{r.title}</h4>
                                    <p className="text-sm text-slate-500 dark:text-slate-400 font-light italic leading-relaxed line-clamp-3">"{r.desc}"</p>

                                    <div className="mt-auto pt-6 border-t border-slate-50 dark:border-white/5 flex items-center justify-between">
                                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">PDF • {r.size}</span>
                                        <button className="text-mivn-gold hover:text-mivn-blue transition-colors flex items-center gap-2 text-[10px] font-black uppercase tracking-widest">
                                            <Download className="w-4 h-4" /> Bajar
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="flex justify-center pt-12">
                        <button className="group flex items-center gap-4 px-12 py-5 rounded-[2.5rem] border-2 border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 font-black uppercase tracking-widest text-[10px] hover:border-mivn-blue hover:text-mivn-blue transition-all">
                            Cargar más recursos
                            <ChevronDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
                        </button>
                    </div>
                </section>

            </main>
        </div>
    );
};

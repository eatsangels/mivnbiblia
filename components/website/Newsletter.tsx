"use client";

import { Search, Mail, Send, CheckCircle2, ArrowRight, Download, BookOpen, Share2, Facebook, Instagram, Twitter, Sparkles, Newspaper, Globe, Users } from "lucide-react";
import { useState } from "react";
import Image from "next/image";

export const Newsletter = () => {
    const [subscribed, setSubscribed] = useState(false);
    const [activeCategory, setActiveCategory] = useState("Ministerio");

    const categories = ["Ministerio", "Comunidad", "Misiones"];

    const newsItems = [
        {
            category: "Misiones",
            date: "15 de Octubre, 2024",
            title: "Misión Amazonía: Llevando esperanza a las naciones",
            excerpt: "Nuestro equipo de misiones regresó tras dos semanas de servicio médico y espiritual en las comunidades del alto Amazonas...",
            image: "https://images.unsplash.com/photo-1541976844346-f18aeac57b06?auto=format&fit=crop&q=80&w=1000",
            color: "bg-mivn-blue"
        },
        {
            category: "Comunidad",
            date: "12 de Octubre, 2024",
            title: "Banco de Alimentos: Meta superada este mes",
            excerpt: "Gracias a la generosidad de nuestra congregación, logramos asistir a más de 200 familias en situación de vulnerabilidad...",
            image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=1000",
            color: "bg-slate-500"
        },
        {
            category: "Ministerio",
            date: "08 de Octubre, 2024",
            title: "Nuevo Liderazgo en el Ministerio de Jóvenes",
            excerpt: "Damos la bienvenida a los nuevos coordinadores que estarán guiando a la próxima generación en su caminar con Cristo...",
            image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=1000",
            color: "bg-mivn-gold"
        }
    ];

    return (
        <div className="bg-background-light dark:bg-background-dark min-h-screen font-lexend">

            {/* 1. Hero Section - Featured News */}
            <section className="max-w-7xl mx-auto px-4 py-12">
                <div className="flex flex-col lg:flex-row bg-white dark:bg-slate-900 rounded-[3rem] overflow-hidden shadow-2xl border border-slate-100 dark:border-slate-800 group">
                    <div className="w-full lg:w-3/5 relative h-[400px] lg:h-[550px] overflow-hidden">
                        <img
                            src="https://images.unsplash.com/photo-1438232992991-995b7058bbb3?auto=format&fit=crop&q=80&w=2000"
                            alt="Featured News"
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent lg:hidden" />
                    </div>
                    <div className="flex flex-col justify-center p-10 md:p-16 lg:w-2/5 space-y-8 bg-white dark:bg-slate-900 relative z-10 transition-colors">
                        <div className="space-y-4">
                            <span className="text-mivn-blue font-black tracking-[0.4em] text-[10px] uppercase">Noticia Destacada</span>
                            <h1 className="text-4xl md:text-5xl font-playfair font-bold text-slate-800 dark:text-white leading-tight">
                                Gran Cruzada de Sanación: Impacto en la Comunidad
                            </h1>
                            <p className="text-slate-500 dark:text-gray-400 text-lg font-light leading-relaxed italic border-l-2 border-mivn-gold/30 pl-6">
                                Descubre cómo el mover de Dios transformó cientos de vidas en nuestra última jornada ministerial. Testimonios de fe, esperanza y restauración que marcan un antes y un después.
                            </p>
                        </div>
                        <div className="flex items-center justify-between pt-4">
                            <button className="bg-mivn-blue text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-2xl shadow-mivn-blue/20 hover:bg-slate-900 transition-all active:scale-95">
                                Leer más
                            </button>
                            <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Hace 2 días</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* 2. Newsletter Subscription - Gold Bordered */}
            <section className="max-w-7xl mx-auto px-4 py-16">
                <div className="relative group overflow-hidden bg-white dark:bg-slate-900/50 border-2 border-mivn-gold/30 rounded-[4rem] p-10 md:p-20 text-center space-y-12 shadow-2xl shadow-mivn-gold/5 transition-all hover:border-mivn-gold/50">
                    <div className="absolute top-0 right-0 p-20 opacity-5 group-hover:rotate-12 transition-transform">
                        <Mail className="w-64 h-64 text-mivn-gold" />
                    </div>

                    <div className="space-y-6 relative z-10">
                        <div className="w-16 h-16 bg-mivn-gold/10 rounded-2xl flex items-center justify-center mx-auto mb-8 animate-bounce">
                            <Mail className="w-8 h-8 text-mivn-gold" />
                        </div>
                        <h2 className="text-3xl md:text-5xl font-playfair font-bold text-slate-800 dark:text-white">Suscríbete a nuestro Boletín Mensual</h2>
                        <p className="text-xl text-slate-500 dark:text-slate-400 font-light italic max-w-2xl mx-auto leading-relaxed">
                            "Recibe reflexiones pastorales, noticias exclusivas y el calendario de actividades directamente en tu correo electrónico."
                        </p>
                    </div>

                    {!subscribed ? (
                        <form className="flex flex-col md:flex-row gap-6 max-w-2xl mx-auto relative z-10" onSubmit={(e) => { e.preventDefault(); setSubscribed(true); }}>
                            <input
                                type="email"
                                required
                                placeholder="Tu correo electrónico..."
                                className="flex-1 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl py-6 px-10 text-slate-800 dark:text-white focus:border-mivn-blue outline-none transition-all placeholder:text-slate-400 italic"
                            />
                            <button className="bg-mivn-blue text-white px-12 py-6 rounded-2xl font-black uppercase tracking-[0.3em] text-[10px] hover:bg-slate-900 transition-all shadow-2xl shadow-mivn-blue/20 flex items-center justify-center gap-3 active:scale-95">
                                Unirme ahora <Send className="w-4 h-4" />
                            </button>
                        </form>
                    ) : (
                        <div className="py-10 space-y-4 animate-in fade-in zoom-in duration-700 relative z-10">
                            <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto" />
                            <h3 className="text-2xl font-bold text-slate-800 dark:text-white">¡Gracias por unirte!</h3>
                            <p className="text-emerald-500/80 font-black uppercase tracking-[0.2em] text-[10px]">Un mensaje de fe te espera cada mes</p>
                        </div>
                    )}

                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] relative z-10">Un mensaje de fe cada mes</p>
                </div>
            </section>

            {/* 3. News Grid Section */}
            <section className="max-w-7xl mx-auto px-4 py-24 space-y-16">
                <div className="flex flex-col md:flex-row justify-between items-end gap-8 border-b border-slate-100 dark:border-white/5 pb-10">
                    <div className="space-y-4">
                        <span className="text-mivn-gold font-black uppercase tracking-[0.5em] text-xs">MIVN News</span>
                        <h2 className="text-4xl md:text-5xl font-playfair font-bold text-slate-800 dark:text-white">Explorar por Categoría</h2>
                    </div>
                    <div className="flex gap-4">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${activeCategory === cat ? "bg-mivn-blue text-white shadow-xl shadow-mivn-blue/20 scale-105" : "bg-slate-50 dark:bg-white/5 text-slate-500 hover:bg-slate-100 dark:hover:bg-white/10"}`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {newsItems.map((item, i) => (
                        <div key={i} className="group flex flex-col bg-white dark:bg-slate-900 rounded-[3rem] overflow-hidden border border-slate-100 dark:border-slate-800 hover:shadow-2xl hover:-translate-y-4 transition-all duration-500">
                            <div className="relative aspect-video overflow-hidden">
                                <div className={`absolute top-6 left-6 z-10 ${item.color} text-white text-[8px] font-black px-4 py-1.5 rounded-lg uppercase tracking-widest shadow-lg`}>
                                    {item.category}
                                </div>
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                            <div className="p-8 space-y-6">
                                <span className="text-[10px] text-mivn-gold font-black uppercase tracking-widest">{item.date}</span>
                                <h3 className="text-xl font-playfair font-bold text-slate-800 dark:text-white leading-tight group-hover:text-mivn-blue transition-colors min-h-[56px] line-clamp-2">
                                    {item.title}
                                </h3>
                                <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-3 font-light leading-relaxed italic">
                                    "{item.excerpt}"
                                </p>
                                <a className="mt-6 text-mivn-blue text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-3 hover:translate-x-2 transition-transform" href="#">
                                    Continuar leyendo <ArrowRight className="w-4 h-4" />
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* 4. Digital Magazine Viewer Section */}
            <section className="max-w-7xl mx-auto px-4 py-24">
                <div className="bg-slate-50 dark:bg-slate-900/30 rounded-[4rem] p-8 md:p-16 border-2 border-dashed border-slate-200 dark:border-slate-800 space-y-12">
                    <div className="flex flex-col md:flex-row justify-between items-end gap-8">
                        <div className="space-y-4">
                            <h2 className="text-4xl font-playfair font-bold text-slate-800 dark:text-white">Boletín Digital Mensual</h2>
                            <p className="text-lg text-slate-500 dark:text-slate-400 font-light italic">Edición de Octubre 2024 - "Tiempo de Cosecha"</p>
                        </div>
                        <button className="flex items-center gap-4 px-10 py-5 border-2 border-mivn-blue text-mivn-blue rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-mivn-blue hover:text-white transition-all group">
                            <Download className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
                            Descargar PDF
                        </button>
                    </div>

                    {/* Interactive Placeholder */}
                    <div className="relative group cursor-pointer aspect-[16/9] bg-white dark:bg-slate-900 rounded-[3rem] shadow-2xl flex items-center justify-center overflow-hidden border border-slate-100 dark:border-slate-800">
                        <img
                            src="https://images.unsplash.com/photo-1544640805-b593daa547ec?auto=format&fit=crop&q=80&w=2000"
                            className="absolute inset-0 w-full h-full object-cover opacity-20 blur-[2px] transition-all group-hover:blur-0 group-hover:scale-105"
                            alt="Magazine Background"
                        />
                        <div className="relative z-10 flex flex-col items-center gap-8 text-center p-8">
                            <div className="w-48 h-64 bg-white dark:bg-slate-800 shadow-2xl rounded-2xl p-6 border border-slate-100 dark:border-slate-700 flex flex-col gap-4 transform rotate-[-2deg] group-hover:rotate-0 transition-transform duration-500">
                                <div className="w-full h-4 bg-mivn-blue/20 rounded-lg" />
                                <div className="w-2/3 h-4 bg-mivn-blue/20 rounded-lg mb-4" />
                                <div className="flex-1 bg-slate-50 dark:bg-slate-700 rounded-xl" />
                                <div className="w-full h-2 bg-slate-100 dark:bg-slate-600 rounded-full" />
                            </div>
                            <div className="space-y-4">
                                <BookOpen className="w-16 h-16 text-mivn-blue mx-auto animate-pulse" />
                                <h3 className="text-2xl font-playfair font-bold text-slate-800 dark:text-white">Haz clic para leer la edición completa</h3>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Interactivo • Pantalla Completa</p>
                            </div>
                        </div>
                        {/* Page corner fold */}
                        <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-slate-200/50 to-transparent dark:from-white/5 pointer-events-none" />
                    </div>
                </div>
            </section>

            {/* 5. Share Section Footer */}
            <section className="py-20 border-t border-slate-100 dark:border-white/5 flex flex-col items-center gap-10">
                <span className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-400">Comparte las buenas noticias</span>
                <div className="flex gap-8">
                    {[
                        { icon: Facebook, color: "hover:bg-blue-600" },
                        { icon: Instagram, color: "hover:bg-rose-500" },
                        { icon: Twitter, color: "hover:bg-sky-500" },
                        { icon: Share2, color: "hover:bg-mivn-blue" }
                    ].map((s, i) => (
                        <a
                            key={i}
                            href="#"
                            className={`w-14 h-14 rounded-full border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-400 hover:text-white transition-all hover:scale-110 ${s.color} hover:border-transparent shadow-lg shadow-transparent hover:shadow-current/20`}
                        >
                            <s.icon className="w-6 h-6" />
                        </a>
                    ))}
                </div>
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">© 2024 Ministerio Internacional Vida Nueva</p>
            </section>
        </div>
    );
};

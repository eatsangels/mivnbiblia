"use client";

import { Baby, Zap, Music, Globe, Heart, Sparkles, ArrowRight, UserPlus, HeartHandshake, Users, ShieldCheck, Landmark, Search, Calendar, Mail, Flame, Quote } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const Ministries = () => {
    const ministryList = [
        {
            icon: Music,
            title: "Alabanza",
            subtitle: "Adoración & Artes",
            desc: "Exaltamos el nombre de Dios a través de la música, las artes y una atmósfera de adoración genuina.",
            color: "text-mivn-gold",
            bg: "bg-mivn-gold/10"
        },
        {
            icon: Zap,
            title: "Jóvenes",
            subtitle: "Generación Impacto",
            desc: "Guiando a las nuevas generaciones a un encuentro real con Jesús y equipándolos para su propósito.",
            color: "text-mivn-blue",
            bg: "bg-mivn-blue/10"
        },
        {
            icon: Baby,
            title: "Niños",
            subtitle: "VIDA Kids",
            desc: "Sembrando verdades bíblicas en el corazón de los más pequeños en un ambiente seguro y divertido.",
            color: "text-emerald-500",
            bg: "bg-emerald-500/10"
        },
        {
            icon: Globe,
            title: "Misiones",
            subtitle: "Alcance Global",
            desc: "Cumpliendo la Gran Comisión al llevar el evangelio y ayuda social a las comunidades y naciones.",
            color: "text-blue-500",
            bg: "bg-blue-500/10"
        },
        {
            icon: Heart,
            title: "Parejas",
            subtitle: "Familias Fuertes",
            desc: "Fortaleciendo matrimonios bajo principios bíblicos para construir familias saludables y unidas.",
            color: "text-rose-500",
            bg: "bg-rose-500/10"
        },
        {
            icon: Flame,
            title: "Intercesión",
            subtitle: "Guerreros de Oración",
            desc: "Buscando el rostro del Señor y clamando por las necesidades de la iglesia y la comunidad.",
            color: "text-amber-500",
            bg: "bg-amber-500/10"
        }
    ];

    const leaders = [
        {
            name: "Pastores Pérez",
            role: "Pastores Principales",
            quote: "Apasionados por ver familias transformadas por el poder de Dios.",
            img: "https://images.unsplash.com/photo-1544928147-79723ec4242d?auto=format&fit=crop&q=80&w=1000"
        },
        {
            name: "Ana Martínez",
            role: "Directora de Alabanza",
            quote: "Dedicada a levantar una generación de adoradores en espíritu y verdad.",
            img: "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?auto=format&fit=crop&q=80&w=1000"
        },
        {
            name: "Roberto Gómez",
            role: "Líder de Jóvenes",
            quote: "Equipando a los jóvenes para impactar su entorno con el Evangelio.",
            img: "https://images.unsplash.com/photo-1519491050282-fb00c7b9c8bd?auto=format&fit=crop&q=80&w=1000"
        },
        {
            name: "Elena Ramos",
            role: "Ministerio Infantil",
            quote: "Cuidando y enseñando con amor el tesoro más grande de la iglesia.",
            img: "https://images.unsplash.com/photo-1541976844346-f18aeac57b06?auto=format&fit=crop&q=80&w=1000"
        }
    ];

    return (
        <div className="bg-background-light dark:bg-background-dark min-h-screen font-lexend">

            {/* Hero Section */}
            <section className="relative py-32 lg:py-48 px-4 overflow-hidden">
                <div className="absolute inset-0 bg-slate-900 group">
                    <img
                        src="https://images.unsplash.com/photo-1519491050282-fb00c7b9c8bd?auto=format&fit=crop&q=80&w=2000"
                        alt="Ministries Background"
                        className="w-full h-full object-cover opacity-30 group-hover:scale-105 transition-transform duration-1000"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
                </div>

                <div className="max-w-7xl mx-auto relative z-10 text-center space-y-12">
                    <div className="space-y-6 animate-in fade-in slide-in-from-top-4 duration-1000">
                        <span className="text-mivn-gold font-black uppercase tracking-[0.5em] text-[10px]">Cuerpo de Cristo</span>
                        <h1 className="text-5xl md:text-8xl font-playfair font-bold text-white leading-tight">
                            Nuestros <span className="italic text-mivn-blue">Ministerios</span>
                        </h1>
                        <p className="text-white/80 text-xl md:text-2xl font-light italic max-w-3xl mx-auto leading-relaxed">
                            "Sirviendo con amor y excelencia para la gloria de Dios. Descubre cómo puedes ser parte de lo que Dios está haciendo en nuestra familia."
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-6 justify-center">
                        <button className="bg-mivn-blue text-white px-12 py-5 rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-2xl shadow-mivn-blue/20 hover:scale-105 transition-all flex items-center justify-center gap-4">
                            <Users className="w-5 h-5" /> Conoce más
                        </button>
                    </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-background-light dark:from-background-dark to-transparent" />
            </section>

            <main className="max-w-7xl mx-auto px-4 py-24 space-y-40">

                {/* Ministries Grid */}
                <section className="space-y-20">
                    <div className="flex flex-col md:flex-row justify-between items-end gap-8 border-b border-slate-100 dark:border-white/5 pb-12">
                        <div className="space-y-4">
                            <h2 className="text-mivn-gold font-black uppercase tracking-[0.4em] text-xs">Áreas de Servicio</h2>
                            <h3 className="text-4xl md:text-6xl font-playfair font-bold text-slate-900 dark:text-white">Hay un lugar para <span className="italic text-mivn-blue">tus talentos</span></h3>
                        </div>
                        <p className="max-w-md text-slate-500 dark:text-slate-400 font-light italic text-right text-lg">
                            Descubre tu vocación espiritual y únete al mover de Dios en nuestra iglesia.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {ministryList.map((m, i) => (
                            <div key={i} className="group p-12 bg-white dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 rounded-[3.5rem] hover:shadow-2xl hover:border-mivn-blue/30 transition-all duration-500 flex flex-col items-center text-center space-y-10 relative overflow-hidden">
                                <div className="absolute -top-20 -right-20 w-48 h-48 bg-slate-50 dark:bg-white/5 rounded-full group-hover:scale-150 transition-transform duration-700" />

                                <div className={`w-28 h-28 rounded-[2rem] ${m.bg} ${m.color} flex items-center justify-center relative z-10 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-2xl border border-white/20`}>
                                    <m.icon className="w-12 h-12" />
                                </div>

                                <div className="space-y-4 relative z-10">
                                    <div>
                                        <h4 className="text-3xl font-playfair font-bold text-slate-900 dark:text-white uppercase tracking-tight">{m.title}</h4>
                                        <p className="text-[10px] font-black text-mivn-gold uppercase tracking-[0.3em] mt-2">{m.subtitle}</p>
                                    </div>
                                    <p className="text-lg text-slate-500 dark:text-slate-400 font-light italic leading-relaxed">"{m.desc}"</p>
                                </div>

                                <button className="pt-8 flex items-center justify-center gap-4 text-mivn-blue font-black uppercase tracking-[0.3em] text-[10px] hover:text-mivn-gold transition-colors relative z-10 border-t border-slate-50 dark:border-white/5 w-full">
                                    Involúcrate <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                                </button>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Leadership Section */}
                <section className="space-y-24 bg-slate-50 dark:bg-slate-900/30 rounded-[5rem] p-12 lg:p-24 border border-slate-100 dark:border-white/5">
                    <div className="text-center space-y-6">
                        <span className="text-mivn-gold font-black uppercase tracking-[0.5em] text-[10px]">Nuestro Liderazgo</span>
                        <h2 className="text-4xl md:text-7xl font-playfair font-bold text-slate-900 dark:text-white">Líderes con <span className="italic text-mivn-blue">Corazón de Pastor</span></h2>
                        <div className="w-24 h-1.5 bg-mivn-gold mx-auto rounded-full" />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-16">
                        {leaders.map((leader, i) => (
                            <div key={i} className="flex flex-col items-center text-center space-y-8 group">
                                <div className="relative">
                                    <div className="absolute -inset-4 bg-gradient-to-tr from-mivn-gold to-mivn-blue rounded-full blur-2xl opacity-0 group-hover:opacity-40 transition-opacity duration-700" />
                                    <div className="relative w-48 h-48 rounded-[3rem] overflow-hidden border-4 border-white dark:border-slate-800 shadow-2xl group-hover:scale-105 transition-transform duration-500">
                                        <img src={leader.img} alt={leader.name} className="w-full h-full object-cover" />
                                    </div>
                                    <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-white dark:bg-slate-900 px-6 py-2 rounded-xl shadow-xl border border-slate-100 dark:border-slate-800">
                                        <Quote className="w-4 h-4 text-mivn-gold opacity-30" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <h4 className="text-2xl font-playfair font-bold text-slate-900 dark:text-white uppercase tracking-tight">{leader.name}</h4>
                                    <p className="text-mivn-blue text-[10px] font-black uppercase tracking-[0.3em]">{leader.role}</p>
                                </div>
                                <p className="text-base text-slate-500 dark:text-slate-400 font-light italic leading-relaxed px-4">"{leader.quote}"</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Call to Action - ¿Deseas servir? */}
                <section className="relative overflow-hidden rounded-[5rem] bg-slate-900 py-32 lg:py-48 px-10 md:px-20 group">
                    {/* Visual Accents */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-mivn-blue/20 blur-[150px] rounded-full pointer-events-none -z-0" />
                    <div className="absolute bottom-0 right-0 p-20 opacity-5 group-hover:rotate-12 transition-transform duration-1000">
                        <HeartHandshake className="w-[500px] h-[500px] text-white" />
                    </div>

                    <div className="relative z-10 flex flex-col items-center text-center space-y-10 max-w-4xl mx-auto">
                        <div className="w-24 h-24 bg-mivn-gold/10 text-mivn-gold rounded-[2.5rem] flex items-center justify-center border border-mivn-gold/20 backdrop-blur-md mb-4 group-hover:scale-110 transition-transform">
                            <UserPlus className="w-10 h-10" />
                        </div>
                        <div className="space-y-6">
                            <h2 className="text-4xl md:text-7xl font-playfair font-bold text-white leading-tight">¿Sientes el llamado <span className="italic text-mivn-gold">a servir?</span></h2>
                            <p className="text-xl md:text-3xl text-white/70 font-light italic leading-relaxed">
                                Creemos que cada persona tiene un don especial. Hay un lugar esperando por ti en la familia MIVN para servir a Dios y al prójimo.
                            </p>
                        </div>
                        <button className="bg-mivn-gold text-white px-16 py-8 rounded-[2.5rem] text-xl font-black uppercase tracking-[0.3em] shadow-[0_30px_60px_rgba(212,175,55,0.3)] hover:scale-105 active:scale-95 transition-all text-[12px]">
                            Llenar Formulario de Interés
                        </button>
                    </div>
                </section>

            </main>
        </div>
    );
};

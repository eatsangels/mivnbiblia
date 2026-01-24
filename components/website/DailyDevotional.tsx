"use client";

import { BookOpen, Calendar, Share2, Heart, CheckCircle2, ArrowLeft, ArrowRight, Quote, Save, Download, Play, MessageSquare, Star, Sparkles } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export const DailyDevotional = () => {
    const [reflection, setReflection] = useState("");

    return (
        <div className="bg-background-light dark:bg-background-dark min-h-screen font-lexend">

            {/* Hero Section */}
            <section className="w-full relative min-h-[520px] flex flex-col items-center justify-center p-6 text-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuDPSn5ixI_b3Uv8Ge3nO7Z5XkfAXCzuYOyvyOdxAMHCBDec9SWiOQ04tkfJ0xbbInn4iGC5ClF-R5mKNlqVCr_ncwyhrVtLNzceMDInvtLC_6n5vL3Uf3VJNO9jH6v9hKlqzPTtLoG4ATbqLzHM9U-1PsWlnalWPUIZofDyPK_rRNOFRyPICvJg3MYSjUf2nM_7FMWF5ghycmd7QyncAgmucKC91j4kLt89MhJtUpCwtYY0oK6lsRasikkdEXDIzUR0H3jIphgtAP4"
                        alt="Paisaje de paz"
                        fill
                        className="object-cover opacity-60 grayscale dark:opacity-40"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-slate-900/60 via-slate-900/80 to-background-light dark:to-background-dark" />
                </div>

                <div className="max-w-4xl mx-auto space-y-8 relative z-10 animate-in fade-in zoom-in duration-1000">
                    <div className="inline-block px-6 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-[10px] font-black uppercase tracking-[0.4em] mb-4">
                        12 de Octubre, 2023
                    </div>
                    <h1 className="text-white text-5xl md:text-7xl font-playfair font-bold leading-tight tracking-tight drop-shadow-2xl">
                        "Todo lo puedo en Cristo que me <span className="text-mivn-gold italic">fortalece</span>"
                    </h1>
                    <p className="text-mivn-blue text-xs md:text-sm font-black tracking-[0.6em] uppercase">
                        Filipenses 4:13
                    </p>
                    <div className="pt-8">
                        <button className="bg-mivn-blue hover:bg-white hover:text-mivn-blue text-white px-12 py-5 rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-2xl transition-all flex items-center gap-4 mx-auto group">
                            <BookOpen className="w-4 h-4" />
                            Comenzar Lectura
                        </button>
                    </div>
                </div>
            </section>

            {/* Breadcrumbs */}
            <div className="max-w-4xl mx-auto px-6 py-10 relative z-10">
                <nav className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest">
                    <a className="text-slate-400 hover:text-mivn-blue" href="/">Inicio</a>
                    <span className="text-slate-300">/</span>
                    <a className="text-slate-400 hover:text-mivn-blue" href="/devocionales">Devocionales</a>
                    <span className="text-slate-300">/</span>
                    <span className="text-mivn-blue">Fortaleza en la Tormenta</span>
                </nav>
            </div>

            {/* Main Content Area */}
            <main className="max-w-[840px] mx-auto px-6 pb-40">
                <article className="space-y-12">
                    <h2 className="text-4xl md:text-5xl font-playfair font-bold text-slate-900 dark:text-white border-l-4 border-mivn-gold pl-8">
                        Fortaleza en la Tormenta
                    </h2>

                    <div className="prose prose-slate dark:prose-invert max-w-none space-y-8 text-xl leading-relaxed text-slate-600 dark:text-slate-400 font-light italic">
                        <p>
                            En la travesía de la vida, a menudo nos encontramos con tormentas inesperadas que desafían nuestra fe y agotan nuestras fuerzas. Estas situaciones pueden manifestarse como dificultades financieras, problemas de salud o crisis emocionales que parecen insuperables.
                        </p>
                        <p>
                            Sin embargo, la promesa de Dios no es la ausencia de la tormenta, sino Su presencia constante en medio de ella. Jesús mismo les dijo a sus discípulos en la barca: <span className="text-mivn-blue font-bold not-italic">"Tened ánimo; yo soy, no temáis"</span>. No detuvo el viento inmediatamente; primero se reveló como Aquel que camina sobre las aguas.
                        </p>
                        <p>
                            Hoy reflexionamos sobre cómo descansar en Su soberanía. La fortaleza espiritual no viene de nuestra capacidad para resistir el viento, sino de nuestra disposición para aferrarnos a la Roca que es Cristo. Cuando nuestras fuerzas fallan, Su poder se perfecciona en nuestra debilidad.
                        </p>
                    </div>

                    {/* Scripture Block */}
                    <section className="my-16 p-12 rounded-[3rem] bg-mivn-blue/5 border border-mivn-blue/10 relative overflow-hidden group">
                        <Quote className="absolute -right-8 -top-8 w-48 h-48 text-mivn-blue opacity-5 -rotate-12 group-hover:rotate-0 transition-transform duration-1000" />

                        <div className="relative z-10 space-y-8">
                            <div className="flex items-center gap-3 text-mivn-blue font-black text-[10px] uppercase tracking-[0.3em]">
                                <Sparkles className="w-5 h-5" />
                                Lectura de hoy: Filipenses 4:10-20
                            </div>

                            <div className="space-y-6 text-2xl font-playfair font-medium leading-relaxed text-slate-800 dark:text-slate-200 italic">
                                <p>
                                    "11 No lo digo porque tenga escasez, pues he aprendido a contentarme, cualquiera que sea mi situación. 12 Sé vivir humildemente, y sé tener abundancia; en todo y por todo estoy enseñado, así para estar saciado como para tener hambre, así para tener abundancia como para padecer necesidad. 13 <span className="text-mivn-gold font-bold">Todo lo puedo en Cristo que me fortalece.</span>"
                                </p>
                            </div>

                            <div className="pt-8 border-t border-slate-200 dark:border-white/5 flex items-center justify-between gap-4">
                                <span className="text-slate-400 text-[10px] font-black uppercase tracking-widest italic">Versión: Reina-Valera 1960</span>
                                <div className="flex gap-2">
                                    <div className="w-2 h-2 rounded-full bg-mivn-gold" />
                                    <div className="w-2 h-2 rounded-full bg-mivn-blue" />
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Personal Reflection Area */}
                    <section className="space-y-8 pt-8">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-mivn-gold/10 flex items-center justify-center text-mivn-gold">
                                <MessageSquare className="w-6 h-6" />
                            </div>
                            <h3 className="text-2xl font-bold text-slate-800 dark:text-white">Mi Reflexión Personal</h3>
                        </div>

                        <div className="relative">
                            <textarea
                                value={reflection}
                                onChange={(e) => setReflection(e.target.value)}
                                className="w-full min-h-[250px] p-10 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900/50 text-xl font-light italic text-slate-600 dark:text-slate-400 focus:border-mivn-blue focus:ring-4 focus:ring-mivn-blue/5 outline-none transition-all shadow-xl"
                                placeholder="¿Qué te dice Dios hoy a través de esta palabra? Escribe tus pensamientos aquí..."
                            />
                            <div className="mt-8 flex justify-end">
                                <button className="flex items-center gap-4 px-10 py-4 bg-slate-900 dark:bg-slate-800 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-mivn-blue transition-all shadow-2xl active:scale-95 group">
                                    <Save className="w-4 h-4 group-hover:scale-110" />
                                    Guardar Pensamientos
                                </button>
                            </div>
                        </div>
                    </section>

                    {/* Navigation Buttons */}
                    <div className="flex items-center justify-between pt-20 border-t border-slate-100 dark:border-white/5">
                        <button className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 hover:text-mivn-blue transition-all group">
                            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-2 transition-transform" />
                            Anterior
                        </button>
                        <div className="flex items-center gap-3">
                            <div className="w-1.5 h-1.5 rounded-full bg-mivn-blue" />
                            <div className="w-1.5 h-1.5 rounded-full bg-slate-200 dark:bg-slate-800" />
                            <div className="w-1.5 h-1.5 rounded-full bg-slate-200 dark:bg-slate-800" />
                        </div>
                        <button className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 hover:text-mivn-blue transition-all group">
                            Siguiente
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                        </button>
                    </div>
                </article>
            </main>

            {/* Floating Action Bar */}
            <div className="fixed bottom-10 left-1/2 -translate-x-1/2 w-[90%] max-w-[550px] z-50">
                <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-2xl rounded-[2.5rem] shadow-2xl border border-white/20 dark:border-white/5 p-4 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-2 pl-4">
                        {[
                            { icon: Heart, label: "Favorito" },
                            { icon: Share2, label: "Compartir" },
                            { icon: Download, label: "Descargar" }
                        ].map((btn, i) => (
                            <button key={i} className="p-4 text-slate-400 hover:text-mivn-blue hover:bg-mivn-blue/5 rounded-2xl transition-all" title={btn.label}>
                                <btn.icon className="w-5 h-5" />
                            </button>
                        ))}
                    </div>
                    <button className="bg-mivn-gold hover:bg-mivn-blue text-white font-black uppercase tracking-[0.2em] text-[10px] px-8 py-5 rounded-[2rem] flex items-center gap-3 shadow-xl transition-all active:scale-95">
                        <CheckCircle2 className="w-5 h-5" />
                        <span className="hidden sm:inline">Marcar como completado</span>
                        <span className="sm:hidden">Completar</span>
                    </button>
                </div>
            </div>

        </div>
    );
};

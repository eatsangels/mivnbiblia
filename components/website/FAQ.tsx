"use client";

import { ChevronDown, Search, UserPlus, HeartHandshake, Users, Smartphone, Mail, MessageCircle, HelpCircle, ExternalLink, Sparkles } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

interface FAQProps {
    initialFaqs: any[];
}

export const FAQ = ({ initialFaqs }: FAQProps) => {
    const [openIndex, setOpenIndex] = useState<number | null>(0);
    const [searchQuery, setSearchQuery] = useState("");

    const filteredFaqs = initialFaqs.filter(faq =>
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const categories = [
        {
            title: "Nuevos Visitantes",
            description: "Horarios de culto, ubicación y qué esperar.",
            icon: UserPlus,
            color: "text-mivn-blue",
            bg: "bg-mivn-blue/10",
            href: "/soporte/visitantes"
        },
        {
            title: "Ofrendas",
            description: "Diezmos, ofrendas y recibos fiscales.",
            icon: HeartHandshake,
            color: "text-mivn-gold",
            bg: "bg-mivn-gold/10",
            href: "/soporte/ofrendas"
        },
        {
            title: "Ministerios",
            description: "VIDA Kids, Jóvenes y Grupos de Vida.",
            icon: Users,
            color: "text-mivn-blue",
            bg: "bg-mivn-blue/10",
            href: "/soporte/ministerios"
        },
        {
            title: "Plataforma Digital",
            description: "Ayuda con la App y transmisiones en vivo.",
            icon: Smartphone,
            color: "text-mivn-gold",
            bg: "bg-mivn-gold/10",
            href: "/soporte/digital"
        }
    ];

    return (
        <div className="bg-background-light dark:bg-background-dark min-h-screen font-lexend">

            {/* Hero Section with Search */}
            <section className="relative py-24 px-4 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-mivn-blue to-[#1e2d4d] z-0" />
                <div className="absolute inset-0 z-0 opacity-10">
                    <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(white 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
                </div>

                <div className="max-w-4xl mx-auto relative z-10 text-center space-y-10 py-10">
                    <div className="space-y-6 animate-in fade-in slide-in-from-top-4 duration-1000">
                        <h1 className="text-4xl md:text-6xl font-playfair font-bold text-white leading-tight">
                            ¿Cómo podemos ayudarte?
                        </h1>
                        <p className="text-white/80 text-lg md:text-xl font-light italic max-w-2xl mx-auto">
                            Encuentra respuestas rápidas a tus dudas sobre nuestra comunidad, servicios y cómo participar.
                        </p>
                    </div>

                    <div className="max-w-2xl mx-auto relative group">
                        <div className="absolute -inset-1 bg-white/20 blur-xl rounded-full opacity-0 group-focus-within:opacity-100 transition-opacity" />
                        <div className="relative flex items-center bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl p-2 h-16 md:h-20 lg:h-24">
                            <div className="pl-6 md:pl-10 text-mivn-blue">
                                <Search className="w-6 h-6 md:w-8 md:h-8" />
                            </div>
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="flex-1 bg-transparent border-none focus:ring-0 text-slate-800 dark:text-white px-6 text-lg md:text-xl placeholder:text-slate-300 italic font-light"
                                placeholder="Busca temas como 'ofrendas' o 'horarios'..."
                            />
                            <button className="hidden md:flex bg-mivn-blue text-white px-10 py-4 lg:py-6 h-full rounded-[2rem] font-black uppercase tracking-widest text-[10px] hover:scale-105 active:scale-95 transition-all items-center gap-3">
                                Buscar
                            </button>
                        </div>
                    </div>

                    <div className="flex justify-center pt-4">
                        <button
                            onClick={() => document.getElementById('faqs-section')?.scrollIntoView({ behavior: 'smooth' })}
                            className="text-white/60 hover:text-white text-xs font-black uppercase tracking-[0.3em] flex items-center gap-2 transition-all group"
                        >
                            Ver Preguntas y Respuestas <ChevronDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
                        </button>
                    </div>
                </div>

                {/* Decorative Blur */}
                <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-mivn-gold/20 rounded-full blur-[120px] pointer-events-none" />
                <div className="absolute -top-20 -left-20 w-96 h-96 bg-mivn-blue/20 rounded-full blur-[120px] pointer-events-none" />
            </section >

            <main className="max-w-7xl mx-auto px-4 py-24 space-y-32">

                {/* Categories Grid */}
                <section className="space-y-12">
                    <h2 className="text-3xl font-playfair font-bold text-slate-900 dark:text-white border-l-4 border-mivn-gold pl-8">Explorar por Categoría</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {categories.map((cat, i) => (
                            <Link key={i} href={cat.href}>
                                <div className="group p-10 bg-white dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 rounded-[3rem] hover:shadow-2xl hover:border-mivn-blue/30 transition-all cursor-pointer space-y-6 h-full">
                                    <div className={`w-16 h-16 rounded-2xl ${cat.bg} flex items-center justify-center ${cat.color} group-hover:scale-110 transition-transform`}>
                                        <cat.icon className="w-8 h-8" />
                                    </div>
                                    <div className="space-y-2">
                                        <h3 className="text-xl font-bold text-slate-800 dark:text-white">{cat.title}</h3>
                                        <p className="text-sm text-slate-500 dark:text-slate-400 font-light leading-relaxed italic">{cat.description}</p>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>

                {/* FAQ Accordion */}
                <section id="faqs-section" className="max-w-4xl mx-auto space-y-12 scroll-mt-32">
                    <div className="text-center space-y-4">
                        <h2 className="text-3xl md:text-5xl font-playfair font-bold text-slate-900 dark:text-white">Preguntas y Respuestas</h2>
                        <div className="w-24 h-1 bg-mivn-gold mx-auto rounded-full" />
                    </div>
                    <div className="space-y-6">
                        {filteredFaqs.map((faq, i) => (
                            <div key={faq.id} className="group bg-white dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 rounded-[2.5rem] overflow-hidden transition-all duration-500 hover:shadow-xl">
                                <button
                                    onClick={() => setOpenIndex(openIndex === i ? null : i)}
                                    className="w-full flex items-center justify-between p-10 text-left transition-all"
                                >
                                    <span className="text-xl font-bold text-slate-800 dark:text-white">{faq.question}</span>
                                    <ChevronDown className={`w-6 h-6 text-mivn-blue transition-transform duration-500 ${openIndex === i ? "rotate-180" : ""}`} />
                                </button>
                                {openIndex === i && (
                                    <div className="px-10 pb-10 animate-in slide-in-from-top-4 duration-500">
                                        <p className="text-lg text-slate-600 dark:text-slate-400 font-light leading-relaxed border-t border-slate-100 dark:border-white/5 pt-8 italic">
                                            "{faq.answer}"
                                        </p>
                                    </div>
                                )}
                            </div>
                        ))}
                        {filteredFaqs.length === 0 && (
                            <div className="text-center py-20 text-slate-400 italic">
                                No se encontraron respuestas para tu búsqueda.
                            </div>
                        )}
                    </div>
                </section>

                {/* Contact CTA */}
                <section className="bg-white dark:bg-slate-900/50 rounded-[4rem] border border-slate-100 dark:border-slate-800 p-12 md:p-20 text-center space-y-10 shadow-2xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:scale-110 transition-transform">
                        <HelpCircle className="w-40 h-40 text-mivn-blue" />
                    </div>

                    <div className="w-20 h-20 bg-mivn-gold/10 text-mivn-gold rounded-full flex items-center justify-center mx-auto border border-mivn-gold/20 animate-pulse">
                        <HelpCircle className="w-10 h-10" />
                    </div>

                    <div className="space-y-4 relative z-10">
                        <h2 className="text-3xl md:text-5xl font-playfair font-bold text-slate-900 dark:text-white">¿No encontraste lo que buscabas?</h2>
                        <p className="text-xl text-slate-500 dark:text-slate-400 font-light italic max-w-2xl mx-auto">
                            Estamos aquí para escucharte y guiarte en cada paso de tu camino espiritual.
                        </p>
                    </div>

                    <div className="flex flex-col md:flex-row justify-center gap-6 pt-6 relative z-10">
                        <button className="bg-mivn-blue text-white px-12 py-6 rounded-3xl font-black uppercase tracking-widest text-[10px] shadow-2xl shadow-mivn-blue/20 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-4">
                            <Mail className="w-5 h-5 font-bold" /> Contáctanos
                        </button>
                        <a href="https://wa.me/17705248414" target="_blank" rel="noopener noreferrer" className="border-2 border-emerald-500 text-emerald-500 px-12 py-6 rounded-3xl font-black uppercase tracking-widest text-[10px] hover:bg-emerald-500 hover:text-white transition-all flex items-center justify-center gap-4 group">
                            Hablar por WhatsApp <MessageCircle className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                        </a>
                    </div>
                </section>

            </main>
        </div >
    );
};

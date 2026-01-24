"use client";

import { ChevronDown, Search, UserPlus, HeartHandshake, Users, Smartphone, Mail, MessageCircle, HelpCircle, ExternalLink, Sparkles } from "lucide-react";
import { useState } from "react";

export const FAQ = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(0);
    const [searchQuery, setSearchQuery] = useState("");

    const faqs = [
        {
            q: "¿A qué hora son los cultos presenciales?",
            a: "Nuestros servicios principales son todos los domingos en tres horarios: 8:00 AM, 10:30 AM y 1:00 PM. También contamos con un servicio de oración los miércoles a las 7:00 PM. Te recomendamos llegar 15 minutos antes para encontrar un buen lugar."
        },
        {
            q: "¿Cómo puedo unirme a un grupo pequeño?",
            a: "Los 'Grupos de Vida' son el corazón de nuestra iglesia. Puedes inscribirte directamente en el módulo de información después de cada servicio, o a través de nuestra App en la sección 'Comunidad'. Tenemos grupos divididos por sectores geográficos y etapas de vida."
        },
        {
            q: "¿Cómo obtengo mi recibo de donación?",
            a: "Si realizas tu donación vía transferencia bancaria o a través de nuestro portal web, recibirás un comprobante automático en tu correo. Para recibos deducibles de impuestos oficiales, por favor envía una foto de tu comprobante junto con tus datos fiscales a donaciones@mivn.org."
        },
        {
            q: "¿Tienen programas para niños durante los servicios?",
            a: "¡Sí! 'VIDA Kids' opera simultáneamente en todos nuestros horarios de los domingos. Contamos con salones divididos por edades desde los 6 meses hasta los 11 años, con un equipo de voluntarios capacitados y estrictos protocolos de seguridad."
        }
    ];

    const categories = [
        {
            title: "Nuevos Visitantes",
            description: "Horarios de culto, ubicación y qué esperar.",
            icon: UserPlus,
            color: "text-mivn-blue",
            bg: "bg-mivn-blue/10"
        },
        {
            title: "Donaciones",
            description: "Diezmos, ofrendas y recibos fiscales.",
            icon: HeartHandshake,
            color: "text-mivn-gold",
            bg: "bg-mivn-gold/10"
        },
        {
            title: "Ministerios",
            description: "VIDA Kids, Jóvenes y Grupos de Vida.",
            icon: Users,
            color: "text-mivn-blue",
            bg: "bg-mivn-blue/10"
        },
        {
            title: "Plataforma Digital",
            description: "Ayuda con la App y transmisiones en vivo.",
            icon: Smartphone,
            color: "text-mivn-gold",
            bg: "bg-mivn-gold/10"
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
                                placeholder="Busca temas como 'donaciones' o 'horarios'..."
                            />
                            <button className="hidden md:flex bg-mivn-blue text-white px-10 py-4 lg:py-6 h-full rounded-[2rem] font-black uppercase tracking-widest text-[10px] hover:scale-105 active:scale-95 transition-all items-center gap-3">
                                Buscar
                            </button>
                        </div>
                    </div>
                </div>

                {/* Decorative Blur */}
                <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-mivn-gold/20 rounded-full blur-[120px] pointer-events-none" />
                <div className="absolute -top-20 -left-20 w-96 h-96 bg-mivn-blue/20 rounded-full blur-[120px] pointer-events-none" />
            </section>

            <main className="max-w-7xl mx-auto px-4 py-24 space-y-32">

                {/* Categories Grid */}
                <section className="space-y-12">
                    <h2 className="text-3xl font-playfair font-bold text-slate-900 dark:text-white border-l-4 border-mivn-gold pl-8">Explorar por Categoría</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {categories.map((cat, i) => (
                            <div key={i} className="group p-10 bg-white dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 rounded-[3rem] hover:shadow-2xl hover:border-mivn-blue/30 transition-all cursor-pointer space-y-6">
                                <div className={`w-16 h-16 rounded-2xl ${cat.bg} flex items-center justify-center ${cat.color} group-hover:scale-110 transition-transform`}>
                                    <cat.icon className="w-8 h-8" />
                                </div>
                                <div className="space-y-2">
                                    <h3 className="text-xl font-bold text-slate-800 dark:text-white">{cat.title}</h3>
                                    <p className="text-sm text-slate-500 dark:text-slate-400 font-light leading-relaxed italic">{cat.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* FAQ Accordion */}
                <section className="max-w-4xl mx-auto space-y-12">
                    <h2 className="text-3xl font-playfair font-bold text-slate-900 dark:text-white text-center">Preguntas Frecuentes</h2>
                    <div className="space-y-6">
                        {faqs.map((faq, i) => (
                            <div key={i} className="group bg-white dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 rounded-[2.5rem] overflow-hidden transition-all duration-500 hover:shadow-xl">
                                <button
                                    onClick={() => setOpenIndex(openIndex === i ? null : i)}
                                    className="w-full flex items-center justify-between p-10 text-left transition-all"
                                >
                                    <span className="text-xl font-bold text-slate-800 dark:text-white">{faq.q}</span>
                                    <ChevronDown className={`w-6 h-6 text-mivn-blue transition-transform duration-500 ${openIndex === i ? "rotate-180" : ""}`} />
                                </button>
                                {openIndex === i && (
                                    <div className="px-10 pb-10 animate-in slide-in-from-top-4 duration-500">
                                        <p className="text-lg text-slate-600 dark:text-slate-400 font-light leading-relaxed border-t border-slate-100 dark:border-white/5 pt-8 italic">
                                            "{faq.a}"
                                        </p>
                                    </div>
                                )}
                            </div>
                        ))}
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
                        <a href="#" className="border-2 border-emerald-500 text-emerald-500 px-12 py-6 rounded-3xl font-black uppercase tracking-widest text-[10px] hover:bg-emerald-500 hover:text-white transition-all flex items-center justify-center gap-4 group">
                            Hablar por WhatsApp <MessageCircle className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                        </a>
                    </div>
                </section>

            </main>
        </div>
    );
};

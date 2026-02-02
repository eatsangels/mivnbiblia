"use client";

import { MapPin, Phone, Mail, Clock, Send, ChevronDown, Facebook, Instagram, Youtube, ExternalLink, HelpCircle, MessageCircle, ShieldCheck, Landmark } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

interface ContactInfoProps {
    settings: Record<string, string>;
}

export const ContactInfo = ({ settings }: ContactInfoProps) => {
    const address = settings.address || "100 Hurricane Shoals Rd NW, Suite F, Lawrenceville, GA 30043";
    const phone = settings.contact_phone || "+1 (770) 524-8414";
    const email = settings.contact_email || "eatsangelsgaming@gmail.com";
    const sundayTime = settings.service_time_sunday || "8AM | 10AM | 6PM";
    const wednesdayTime = settings.service_time_wednesday || "7:30 PM";

    const [openIndex, setOpenIndex] = useState<number | null>(0);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "Información General",
        message: ""
    });

    const faqs = [
        {
            q: "¿Cómo puedo llegar al templo?",
            a: "Estamos ubicados en el corazón de la ciudad. Contamos con estacionamiento amplio y acceso para personas con discapacidad. Puedes ver nuestra ubicación exacta en el mapa de esta página."
        },
        {
            q: "¿Tienen actividades para niños?",
            a: "¡Sí! Durante cada servicio general, contamos con el Ministerio Infantil VIDA Kids donde los niños aprenden la palabra de Dios de una manera divertida y segura."
        },
        {
            q: "¿Cómo puedo unirme a un grupo de vida?",
            a: "Los 'Grupos de Vida' son el corazón de nuestra iglesia. Puedes inscribirte en el módulo de información o a través de nuestra App en la sección 'Comunidad'."
        },
        {
            q: "¿Cómo obtengo mi recibo de ofrenda?",
            a: "Si ofrendas vía web, el recibo llega a tu correo automáticamente. Para recibos fiscales oficiales (deducibles), por favor envía tu comprobante a ofrendas@mivn.org."
        }
    ];

    const searchParams = useSearchParams();

    useEffect(() => {
        const interest = searchParams.get('interest');
        const groupName = searchParams.get('group_name');

        if (interest === 'group' && groupName) {
            setFormData(prev => ({
                ...prev,
                subject: "Voluntariado / Servir",
                message: `Hola, estoy interesado en unirme al grupo '${groupName}'.`
            }));
        }
    }, [searchParams]);

    return (
        <div className="bg-background-light dark:bg-background-dark min-h-screen font-lexend">

            {/* Hero Section */}
            <section className="relative py-24 px-4 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-mivn-blue to-[#1e2d4d] z-0" />
                <div className="absolute inset-0 z-0 opacity-10">
                    <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(white 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
                </div>

                <div className="max-w-4xl mx-auto relative z-10 text-center space-y-10 py-10">
                    <div className="space-y-6 animate-in fade-in slide-in-from-top-4 duration-1000">
                        <h1 className="text-4xl md:text-6xl font-playfair font-bold text-white leading-tight">
                            Estamos para <span className="italic text-mivn-gold">servirte</span>
                        </h1>
                        <p className="text-white/80 text-lg md:text-xl font-light italic max-w-3xl mx-auto leading-relaxed border-l-2 border-white/20 pl-8 md:pl-0 md:border-none">
                            "No nos cansemos, pues, de hacer bien; porque a su tiempo segaremos, si no desmayamos." <br />
                            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-mivn-gold not-italic mt-4 block">— Gálatas 6:9</span>
                        </p>
                    </div>

                    <div className="flex flex-wrap justify-center gap-6">
                        <div className="flex items-center gap-3 px-6 py-3 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 text-white">
                            <Phone className="w-4 h-4 text-mivn-gold" />
                            <span className="text-xs font-bold uppercase tracking-widest">{phone}</span>
                        </div>
                        <div className="flex items-center gap-3 px-6 py-3 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 text-white">
                            <Mail className="w-4 h-4 text-mivn-gold" />
                            <span className="text-xs font-bold uppercase tracking-widest">{email}</span>
                        </div>
                    </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-mivn-gold/20 rounded-full blur-[120px] pointer-events-none" />
                <div className="absolute -top-20 -left-20 w-96 h-96 bg-mivn-blue/20 rounded-full blur-[120px] pointer-events-none" />
            </section>

            <main className="max-w-7xl mx-auto px-4 py-24">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">

                    {/* Contact Form Column */}
                    <div className="lg:col-span-7 space-y-12">
                        <div className="space-y-6 border-l-4 border-mivn-gold pl-8">
                            <h2 className="text-4xl font-playfair font-bold text-slate-900 dark:text-white">Envíanos un mensaje</h2>
                            <p className="text-xl text-slate-500 dark:text-slate-400 font-light italic leading-relaxed">
                                Completa el formulario y un miembro de nuestro equipo ministerial te contactará a la brevedad posible.
                            </p>
                        </div>

                        <form className="bg-white dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 p-10 md:p-14 rounded-[4rem] shadow-2xl space-y-10 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-10 opacity-5 group-focus-within:opacity-10 transition-opacity">
                                <Send className="w-40 h-40 text-mivn-blue" />
                            </div>

                            <div className="grid md:grid-cols-2 gap-10">
                                <div className="space-y-4 relative z-10">
                                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-mivn-gold ml-6">Nombre Completo</label>
                                    <input
                                        type="text"
                                        className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-slate-800 rounded-[2rem] py-6 px-10 text-lg text-slate-900 dark:text-white focus:border-mivn-blue focus:ring-4 focus:ring-mivn-blue/5 outline-none transition-all placeholder:text-slate-300 italic font-light"
                                        placeholder="Tu nombre..."
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-4 relative z-10">
                                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-mivn-gold ml-6">Correo Electrónico</label>
                                    <input
                                        type="email"
                                        className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-slate-800 rounded-[2rem] py-6 px-10 text-lg text-slate-900 dark:text-white focus:border-mivn-blue focus:ring-4 focus:ring-mivn-blue/5 outline-none transition-all placeholder:text-slate-300 italic font-light"
                                        placeholder="tu@email.com"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="space-y-4 relative z-10">
                                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-mivn-gold ml-6">Asunto del Mensaje</label>
                                <div className="relative">
                                    <select
                                        className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-slate-800 rounded-[2rem] py-6 px-10 text-lg text-slate-900 dark:text-white focus:border-mivn-blue outline-none transition-all appearance-none cursor-pointer italic font-light"
                                        value={formData.subject}
                                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                    >
                                        <option>Información General</option>
                                        <option>Petición de Oración</option>
                                        <option>Visitas y Horarios</option>
                                        <option>Voluntariado / Servir</option>
                                        <option>Problemas con la App</option>
                                    </select>
                                    <ChevronDown className="absolute right-10 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
                                </div>
                            </div>

                            <div className="space-y-4 relative z-10">
                                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-mivn-gold ml-6">Tu Mensaje</label>
                                <textarea
                                    rows={5}
                                    className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-slate-800 rounded-[3rem] py-8 px-10 text-lg text-slate-900 dark:text-white focus:border-mivn-blue focus:ring-4 focus:ring-mivn-blue/5 outline-none transition-all resize-none placeholder:text-slate-300 italic font-light"
                                    placeholder="¿En qué podemos ayudarte espiritualmente hoy?"
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                />
                            </div>

                            <button className="w-full bg-mivn-blue text-white py-8 rounded-[2.5rem] font-black uppercase tracking-[0.4em] text-[10px] shadow-2xl shadow-mivn-blue/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-6 group relative z-10">
                                Enviar Petición <Send className="w-5 h-5 group-hover:translate-x-2 group-hover:-translate-y-1 transition-transform" />
                            </button>
                        </form>
                    </div>

                    {/* Contact Sidebar Column */}
                    <div className="lg:col-span-5 space-y-10">

                        {/* Interactive Location Card */}
                        <div className="bg-white dark:bg-slate-900 rounded-[4rem] border border-slate-100 dark:border-slate-800 p-12 shadow-2xl space-y-10 group overflow-hidden relative">
                            <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:scale-110 transition-transform">
                                <MapPin className="w-40 h-40 text-mivn-blue" />
                            </div>

                            <h3 className="text-3xl font-playfair font-bold text-slate-900 dark:text-white">Ubicación Central</h3>

                            <div className="space-y-10 relative z-10">
                                <div className="flex items-start gap-8">
                                    <div className="w-16 h-16 rounded-[1.5rem] bg-mivn-gold/10 text-mivn-gold flex items-center justify-center shrink-0 border border-mivn-gold/10 group-hover:scale-110 transition-transform">
                                        <MapPin className="w-8 h-8" />
                                    </div>
                                    <div className="space-y-2">
                                        <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Dirección MIVN</h4>
                                        <p className="text-xl text-slate-700 dark:text-slate-300 font-light leading-relaxed">
                                            {address}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-8">
                                    <div className="w-16 h-16 rounded-[1.5rem] bg-mivn-blue/10 text-mivn-blue flex items-center justify-center shrink-0 border border-mivn-blue/10 group-hover:scale-110 transition-transform">
                                        <Clock className="w-8 h-8" />
                                    </div>
                                    <div className="space-y-2">
                                        <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Horarios de Reunión</h4>
                                        <div className="text-xl text-slate-700 dark:text-slate-300 font-light leading-relaxed">
                                            <p className="flex justify-between items-center gap-4">
                                                <span>Domingos</span>
                                                <span className="font-bold text-sm text-mivn-blue">{sundayTime}</span>
                                            </p>
                                            <p className="flex justify-between items-center gap-4 mt-2">
                                                <span>Miércoles</span>
                                                <span className="font-bold text-sm text-mivn-blue">{wednesdayTime}</span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <a
                                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`}
                                target="_blank"
                                className="w-full flex items-center justify-center gap-4 py-8 bg-slate-50 dark:bg-white/5 border border-dashed border-slate-200 dark:border-slate-800 rounded-3xl text-[10px] font-black uppercase tracking-widest text-slate-500 hover:border-mivn-blue hover:text-mivn-blue transition-all group"
                            >
                                <ExternalLink className="w-5 h-5 group-hover:rotate-12 transition-transform" /> Ver en Google Maps
                            </a>
                        </div>

                        {/* Support Channels */}
                        <div className="bg-gradient-to-br from-mivn-blue to-[#1e2d4d] rounded-[4rem] p-12 text-white shadow-2xl space-y-8 relative overflow-hidden group">
                            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-mivn-gold/10 rounded-full blur-3xl" />

                            <h3 className="text-2xl font-playfair font-bold text-center">Canales de Atención</h3>
                            <div className="grid grid-cols-2 gap-6 relative z-10">
                                <a href={`https://wa.me/${phone.replace(/\D/g, '')}`} className="flex flex-col items-center gap-4 p-8 bg-white/5 backdrop-blur-md rounded-[2.5rem] border border-white/10 hover:bg-white/10 transition-all text-center group">
                                    <MessageCircle className="w-8 h-8 text-emerald-400" />
                                    <span className="text-[9px] font-black uppercase tracking-widest">WhatsApp Directo</span>
                                </a>
                                <a href={`mailto:${email}`} className="flex flex-col items-center gap-4 p-8 bg-white/5 backdrop-blur-md rounded-[2.5rem] border border-white/10 hover:bg-white/10 transition-all text-center group">
                                    <Mail className="w-8 h-8 text-mivn-gold" />
                                    <span className="text-[9px] font-black uppercase tracking-widest">Email Pastoral</span>
                                </a>
                            </div>
                        </div>

                        {/* Trust Badges */}
                        <div className="grid grid-cols-2 gap-6">
                            <div className="flex items-center gap-4 p-6 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl shadow-lg">
                                <ShieldCheck className="w-6 h-6 text-mivn-gold" />
                                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-relaxed">Atención Confidencial</span>
                            </div>
                            <div className="flex items-center gap-4 p-6 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl shadow-lg">
                                <Landmark className="w-6 h-6 text-mivn-gold" />
                                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-relaxed">Entidad Registrada</span>
                            </div>
                        </div>

                    </div>
                </div>

                {/* FAQ Snippet integration */}
                <section className="mt-40 max-w-4xl mx-auto space-y-16">
                    <div className="text-center space-y-6">
                        <span className="text-mivn-gold font-black uppercase tracking-[0.5em] text-xs">Ayuda Rápida</span>
                        <h2 className="text-4xl md:text-5xl font-playfair font-bold text-slate-900 dark:text-white">Dudas Comunes</h2>
                    </div>

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
                                        <p className="text-lg text-slate-500 dark:text-slate-400 font-light leading-relaxed border-t border-slate-100 dark:border-white/5 pt-8 italic">
                                            "{faq.a}"
                                        </p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    <div className="text-center pt-8">
                        <Link href="/soporte" className="text-[10px] font-black text-mivn-gold hover:text-mivn-blue uppercase tracking-[0.3em] underline decoration-mivn-gold/20">Visitar Centro de Soporte Completo</Link>
                    </div>
                </section>
            </main>
        </div>
    );
};

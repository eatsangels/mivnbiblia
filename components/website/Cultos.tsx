"use client";

import { Clock, Calendar, MapPin, User, Video, Bell, Share2, ChevronLeft, ChevronRight, Play, Heart, Star, Info, ExternalLink } from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";

export const Cultos = () => {
    const [timeLeft, setTimeLeft] = useState({
        days: 2,
        hours: 14,
        minutes: 45,
        seconds: 0
    });

    // Simple countdown effect simulation
    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(prev => {
                if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
                if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
                if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
                if (prev.days > 0) return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
                return prev;
            });
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const activities = [
        { day: "Martes", title: "Círculo de Oración", time: "7:00 PM", icon: Heart, color: "text-rose-500", bg: "bg-rose-500/10" },
        { day: "Jueves", title: "Estudio Bíblico", time: "7:30 PM", icon: Star, color: "text-mivn-gold", bg: "bg-mivn-gold/10" },
        { day: "Viernes", title: "Noche de Jóvenes", time: "8:00 PM", icon: Play, color: "text-mivn-blue", bg: "bg-mivn-blue/10" },
        { day: "Sábado", title: "Vida Nueva Kids", time: "10:00 AM", icon: Star, color: "text-emerald-500", bg: "bg-emerald-500/10" }
    ];

    return (
        <div className="bg-background-light dark:bg-background-dark min-h-screen font-lexend">

            {/* 1. Hero Section with Gold Timer */}
            <section className="relative w-full min-h-[600px] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-slate-900 group">
                    <img
                        src="https://images.unsplash.com/photo-1515162305285-0293e4767cc2?auto=format&fit=crop&q=80&w=2000"
                        alt="Cultos Background"
                        className="w-full h-full object-cover opacity-30 group-hover:scale-105 transition-transform duration-1000"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
                </div>

                <div className="relative z-10 max-w-4xl mx-auto px-4 text-center space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-1000">
                    <div className="space-y-6">
                        <span className="text-mivn-blue font-black tracking-[0.5em] text-[10px] uppercase">Próximo Encuentro</span>
                        <h1 className="text-5xl md:text-8xl font-playfair font-bold text-white leading-tight">
                            La Presencia de Dios nos <span className="italic text-mivn-gold gold-glow">Transforma</span>
                        </h1>
                        <p className="text-white/80 text-xl md:text-2xl font-light italic max-w-2xl mx-auto leading-relaxed">
                            Únete a nuestra familia en un tiempo de alabanza y palabra revelada.
                        </p>
                    </div>

                    {/* Gold Countdown Timer */}
                    <div className="flex flex-wrap justify-center gap-6 md:gap-12 py-8">
                        {[
                            { label: "Días", val: timeLeft.days },
                            { label: "Horas", val: timeLeft.hours },
                            { label: "Min", val: timeLeft.minutes }
                        ].map((time, i, arr) => (
                            <div key={i} className="flex items-center gap-6 md:gap-12">
                                <div className="flex flex-col items-center gap-4">
                                    <div className="flex h-24 w-24 md:h-32 md:w-32 items-center justify-center rounded-[2.5rem] bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl relative group">
                                        <div className="absolute inset-0 bg-mivn-gold/5 rounded-[2.5rem] blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                                        <p className="text-mivn-gold text-4xl md:text-6xl font-black relative z-10 drop-shadow-[0_0_15px_rgba(212,175,55,0.4)]">
                                            {time.val < 10 ? `0${time.val}` : time.val}
                                        </p>
                                    </div>
                                    <p className="text-white/40 text-[10px] font-black uppercase tracking-[0.4em]">{time.label}</p>
                                </div>
                                {i < arr.length - 1 && (
                                    <div className="hidden md:flex flex-col items-center justify-center text-mivn-gold text-4xl font-light opacity-30 mt-[-30px]">
                                        :
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    <div className="pt-8">
                        <button className="bg-mivn-blue text-white px-12 py-6 rounded-[2.5rem] font-black uppercase tracking-[0.3em] text-[10px] shadow-2xl shadow-mivn-blue/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-4 mx-auto">
                            <Bell className="w-5 h-5" /> Agendar Recordatorio
                        </button>
                    </div>
                </div>
            </section>

            <main className="max-w-7xl mx-auto px-4 py-32 space-y-40">

                {/* 2. Service Details Card */}
                <section className="-mt-64 relative z-20">
                    <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[4rem] p-10 md:p-20 shadow-2xl hover:shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] transition-all group overflow-hidden">
                        <div className="absolute top-0 right-0 p-20 opacity-5 group-hover:rotate-12 transition-transform">
                            <Star className="w-64 h-64 text-mivn-gold" />
                        </div>

                        <div className="flex flex-col lg:flex-row gap-16 items-center relative z-10">
                            <div className="w-full lg:w-2/5 aspect-video bg-slate-100 dark:bg-slate-800 rounded-[3rem] overflow-hidden shadow-2xl group-hover:scale-105 transition-transform duration-700">
                                <img
                                    src="https://images.unsplash.com/photo-1438232992991-995b7058bbb3?auto=format&fit=crop&q=80&w=1000"
                                    className="w-full h-full object-cover"
                                    alt="Pastor Predicando"
                                />
                            </div>
                            <div className="flex-1 space-y-10 text-center lg:text-left">
                                <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                                    <span className="bg-mivn-blue/10 text-mivn-blue px-6 py-2 rounded-full text-[9px] font-black uppercase tracking-widest border border-mivn-blue/20">Culto Dominical</span>
                                    <span className="bg-mivn-gold/10 text-mivn-gold px-6 py-2 rounded-full text-[9px] font-black uppercase tracking-widest border border-mivn-gold/20">Especial</span>
                                </div>

                                <h2 className="text-4xl md:text-6xl font-playfair font-bold text-slate-900 dark:text-white leading-tight">La Fe que Mueve <span className="italic text-mivn-blue underline decoration-mivn-gold/30 decoration-2 underline-offset-8">Montañas</span></h2>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-4">
                                    {[
                                        { icon: User, text: "Pastor David Morales", label: "Predicador" },
                                        { icon: Calendar, text: "Domingo, 10 de Enero", label: "Fecha" },
                                        { icon: Clock, text: "10:00 AM CST", label: "Hora" },
                                        { icon: MapPin, text: "Auditorio Principal, MIVN", label: "Lugar" }
                                    ].map((info, i) => (
                                        <div key={i} className="flex items-center gap-5 group/item">
                                            <div className="w-12 h-12 bg-slate-50 dark:bg-white/5 rounded-2xl flex items-center justify-center text-mivn-blue group-hover/item:bg-mivn-blue group-hover/item:text-white transition-all">
                                                <info.icon className="w-5 h-5" />
                                            </div>
                                            <div className="text-left">
                                                <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">{info.label}</p>
                                                <p className="text-base text-slate-700 dark:text-gray-300 font-medium">{info.text}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 3. Participation Options */}
                <section className="space-y-16">
                    <div className="text-center space-y-4">
                        <span className="text-mivn-gold font-black uppercase tracking-[0.5em] text-[10px]">Tu Familia te espera</span>
                        <h2 className="text-4xl md:text-6xl font-playfair font-bold text-slate-900 dark:text-white underline decoration-mivn-blue/20 decoration-2 underline-offset-8">¿Cómo Participar?</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        {/* Option 1: Physical */}
                        <div className="group bg-white dark:bg-slate-900/50 p-12 md:p-16 rounded-[4rem] border border-slate-100 dark:border-slate-800 hover:border-mivn-blue/30 transition-all duration-500 shadow-2xl space-y-8 flex flex-col items-center text-center">
                            <div className="w-24 h-24 bg-mivn-blue/10 rounded-[2rem] flex items-center justify-center text-mivn-blue group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-xl border border-mivn-blue/10">
                                <MapPin className="w-10 h-10" />
                            </div>
                            <div className="space-y-4">
                                <h3 className="text-2xl font-playfair font-bold text-slate-900 dark:text-white uppercase tracking-tight">Asistir Presencialmente</h3>
                                <p className="text-lg text-slate-500 dark:text-slate-400 font-light italic leading-relaxed">
                                    "Estamos ubicados en Av. Central 123. ¡Nos encantaría saludarte en persona y adorar juntos!"
                                </p>
                            </div>
                            <button className="w-full bg-slate-50 dark:bg-white/5 py-6 rounded-3xl font-black uppercase tracking-[0.3em] text-[10px] text-mivn-blue flex items-center justify-center gap-4 hover:bg-mivn-blue hover:text-white transition-all border border-slate-100 dark:border-white/10 mt-auto">
                                <ExternalLink className="w-4 h-4" /> Ver en Google Maps
                            </button>
                        </div>

                        {/* Option 2: Digital */}
                        <div className="group bg-white dark:bg-slate-900/50 p-12 md:p-16 rounded-[4rem] border border-slate-100 dark:border-slate-800 hover:border-mivn-gold/30 transition-all duration-500 shadow-2xl space-y-8 flex flex-col items-center text-center">
                            <div className="w-24 h-24 bg-mivn-gold/10 rounded-[2rem] flex items-center justify-center text-mivn-gold group-hover:scale-110 group-hover:-rotate-6 transition-all duration-500 shadow-xl border border-mivn-gold/10">
                                <Video className="w-10 h-10" />
                            </div>
                            <div className="space-y-4">
                                <h3 className="text-2xl font-playfair font-bold text-slate-900 dark:text-white uppercase tracking-tight">Ver en Línea</h3>
                                <p className="text-lg text-slate-500 dark:text-slate-400 font-light italic leading-relaxed">
                                    "Sintoniza la transmisión en vivo de alta calidad a través de YouTube y Facebook cada domingo."
                                </p>
                            </div>
                            <div className="flex gap-4 w-full mt-auto">
                                <button className="flex-1 bg-mivn-blue text-white py-6 rounded-3xl font-black uppercase tracking-[0.3em] text-[10px] shadow-2xl shadow-mivn-blue/20 hover:scale-105 active:scale-95 transition-all">
                                    Ir al Canal
                                </button>
                                <button className="w-16 bg-mivn-gold/10 text-mivn-gold rounded-3xl flex items-center justify-center hover:bg-mivn-gold hover:text-white transition-all border border-mivn-gold/20">
                                    <Bell className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 4. Calendar of the Week */}
                <section className="space-y-16">
                    <div className="flex flex-col md:flex-row justify-between items-end gap-8 border-b border-slate-100 dark:border-white/5 pb-12">
                        <div className="space-y-4">
                            <span className="text-mivn-gold font-black uppercase tracking-[0.4em] text-xs">Agenda Institucional</span>
                            <h2 className="text-4xl md:text-6xl font-playfair font-bold text-slate-900 dark:text-white">Actividades de <span className="italic text-mivn-blue">la Semana</span></h2>
                        </div>
                        <div className="flex gap-4">
                            <button className="w-14 h-14 rounded-full border-2 border-slate-100 dark:border-slate-800 flex items-center justify-center text-slate-400 hover:border-mivn-blue hover:text-mivn-blue transition-all">
                                <ChevronLeft className="w-6 h-6" />
                            </button>
                            <button className="w-14 h-14 rounded-full border-2 border-slate-100 dark:border-slate-800 flex items-center justify-center text-slate-400 hover:border-mivn-blue hover:text-mivn-blue transition-all">
                                <ChevronRight className="w-6 h-6" />
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {activities.map((act, i) => (
                            <div key={i} className="group bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[3rem] p-10 space-y-6 hover:shadow-2xl transition-all duration-500">
                                <div className="flex justify-between items-start">
                                    <span className={`text-[10px] font-black uppercase tracking-[0.3em] ${act.color}`}>{act.day}</span>
                                    <div className={`w-12 h-12 rounded-2xl ${act.bg} ${act.color} flex items-center justify-center`}>
                                        <act.icon className="w-5 h-5" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <h4 className="text-xl font-bold text-slate-800 dark:text-white uppercase tracking-tight leading-tight group-hover:text-mivn-blue transition-colors">{act.title}</h4>
                                    <p className="flex items-center gap-2 text-[10px] text-slate-400 font-bold uppercase tracking-widest italic">
                                        <Clock className="w-3 h-3" /> {act.time}
                                    </p>
                                </div>
                                <button className="w-full pt-4 text-left text-[9px] font-black text-slate-400 uppercase tracking-widest border-t border-slate-50 dark:border-white/5 group-hover:text-mivn-blue transition-colors">
                                    Ver detalles
                                </button>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 5. CTA Section - Invita a alguien */}
                <section className="relative overflow-hidden rounded-[5rem] bg-mivn-blue py-24 lg:py-32 px-10 md:px-20 group">
                    <div className="absolute top-0 right-0 p-20 opacity-10 group-hover:rotate-12 transition-transform duration-1000">
                        <Share2 className="w-[400px] h-[400px] text-white" />
                    </div>

                    <div className="relative z-10 flex flex-col items-center text-center space-y-10 max-w-4xl mx-auto">
                        <h2 className="text-4xl md:text-7xl font-playfair font-bold text-white leading-tight">¡Invita a alguien este <span className="italic text-mivn-gold">Domingo!</span></h2>
                        <p className="text-xl md:text-2xl text-white/80 font-light italic leading-relaxed">
                            "Comparte la bendición con tus amigos y familiares. Un mensaje de fe puede cambiar una vida para siempre."
                        </p>

                        <div className="flex flex-wrap justify-center gap-8">
                            <button className="bg-white text-mivn-blue px-12 py-6 rounded-[2.5rem] font-black uppercase tracking-[0.3em] text-[10px] shadow-2xl hover:scale-105 transition-all flex items-center gap-4">
                                <Share2 className="w-5 h-5" /> Compartir Ahora
                            </button>

                            <div className="flex items-center gap-6">
                                {[
                                    { name: "WhatsApp", icon: "https://cdn-icons-png.flaticon.com/512/733/733585.png" },
                                    { name: "Facebook", icon: "https://cdn-icons-png.flaticon.com/512/733/733547.png" },
                                    { name: "Instagram", icon: "https://cdn-icons-png.flaticon.com/512/2111/2111463.png" }
                                ].map((social, i) => (
                                    <button key={i} className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-white/20 transition-all p-4">
                                        <img src={social.icon} alt={social.name} className="w-full h-full object-contain brightness-0 invert" />
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

            </main>
        </div>
    );
};

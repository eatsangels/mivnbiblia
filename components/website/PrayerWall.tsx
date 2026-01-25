"use client";

import { Send, Lock, Globe, Star, Heart, MessageCircle, User, Edit3, ShieldCheck, CheckCircle2, ChevronDown, Sparkles } from "lucide-react";
import { useState } from "react";
import { useFormStatus } from "react-dom";
import { createPrayerRequest, joinPrayerRequest } from "@/app/(website)/oracion/actions";
import { formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale";
import type { PrayerRequest } from "@/lib/queries/prayer-requests";
import Swal from 'sweetalert2';

import Link from "next/link";

interface PrayerWallProps {
    initialRequests: PrayerRequest[];
    pagination?: {
        total: number;
        page: number;
        last_page: number;
    };
}

function SubmitButton() {
    const { pending } = useFormStatus();

    return (
        <button
            type="submit"
            disabled={pending}
            className="w-full bg-mivn-blue text-white py-6 rounded-3xl font-black uppercase tracking-[0.3em] text-[10px] shadow-2xl shadow-mivn-blue/20 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-4 disabled:opacity-50 disabled:cursor-not-allowed"
        >
            {pending ? "Enviando..." : "Enviar Petición"} <Send className="w-4 h-4" />
        </button>
    );
}

export const PrayerWall = ({ initialRequests = [], pagination }: PrayerWallProps) => {
    const [activeTab, setActiveTab] = useState("Recientes");
    const [joiningPrayer, setJoiningPrayer] = useState<string | null>(null);

    // Server Action Handler
    async function handleSubmit(formData: FormData) {
        const result = await createPrayerRequest(null, formData);
        if (result.success) {
            Swal.fire({
                title: '¡Petición Enviada!',
                text: 'Tu petición ha sido enviada y será revisada por nuestro equipo de oración.',
                icon: 'success',
                confirmButtonText: 'Amén',
                confirmButtonColor: '#4AA3DF', // mivn-blue
                background: '#fff',
                color: '#1e293b', // slate-800
                iconColor: '#4AA3DF',
                customClass: {
                    popup: 'rounded-[2rem]',
                    confirmButton: 'rounded-xl font-bold uppercase tracking-widest px-8 py-3'
                }
            });
            // Optionally reset form here
        } else {
            const isAuthError = result.message.includes("iniciar sesión");

            Swal.fire({
                title: isAuthError ? '¡Atención!' : 'Error',
                text: result.message,
                icon: isAuthError ? 'warning' : 'error',
                showCancelButton: isAuthError,
                confirmButtonText: isAuthError ? 'Iniciar Sesión' : 'Entendido',
                cancelButtonText: 'Cancelar',
                confirmButtonColor: isAuthError ? '#4AA3DF' : '#ef4444',
                background: '#fff',
                color: '#1e293b',
                customClass: {
                    popup: 'rounded-[2rem]',
                    confirmButton: 'rounded-xl font-bold uppercase tracking-widest px-8 py-3',
                    cancelButton: 'rounded-xl font-bold uppercase tracking-widest px-8 py-3 text-slate-500'
                }
            }).then((submitResult) => {
                if (isAuthError && submitResult.isConfirmed) {
                    window.location.href = "/login?redirect=/oracion";
                }
            });
        }
    }

    const getInitials = (name: string) => {
        return name
            .split(" ")
            .map((n) => n[0])
            .slice(0, 2)
            .join("")
            .toUpperCase();
    };

    async function handleJoinPrayer(requestId: string) {
        setJoiningPrayer(requestId);
        const result = await joinPrayerRequest(requestId);
        setJoiningPrayer(null);

        if (result.success) {
            Swal.fire({
                title: '¡Amén!',
                text: 'Te has unido en oración por esta petición.',
                icon: 'success',
                confirmButtonText: 'Continuar Orando',
                confirmButtonColor: '#4AA3DF',
                timer: 2000,
                customClass: {
                    popup: 'rounded-[2rem]',
                    confirmButton: 'rounded-xl font-bold uppercase tracking-widest px-8 py-3'
                }
            });
        } else {
            const isAuthError = result.message?.includes("iniciar sesión");
            Swal.fire({
                title: isAuthError ? '¡Atención!' : 'Aviso',
                text: result.message,
                icon: isAuthError ? 'warning' : 'info',
                showCancelButton: isAuthError,
                confirmButtonText: isAuthError ? 'Iniciar Sesión' : 'Entendido',
                cancelButtonText: 'Cancelar',
                confirmButtonColor: '#4AA3DF',
                customClass: {
                    popup: 'rounded-[2rem]',
                    confirmButton: 'rounded-xl font-bold uppercase tracking-widest px-8 py-3',
                    cancelButton: 'rounded-xl font-bold uppercase tracking-widest px-8 py-3 text-slate-500'
                }
            }).then((submitResult) => {
                if (isAuthError && submitResult.isConfirmed) {
                    window.location.href = "/login?redirect=/oracion";
                }
            });
        }
    }

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

                        <form className="space-y-8" action={handleSubmit}>
                            <div className="space-y-3">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Nombre Completo</label>
                                <input name="name" type="text" className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl py-5 px-8 text-slate-800 dark:text-white focus:border-mivn-blue transition-all outline-none italic" placeholder="Escribe tu nombre..." required />
                                <div className="flex items-center gap-3 px-4 pt-2">
                                    <input type="checkbox" name="isAnonymous" id="anon" className="rounded border-slate-300 dark:border-white/10 text-mivn-blue focus:ring-mivn-blue" />
                                    <label htmlFor="anon" className="text-[10px] font-bold text-slate-400 uppercase tracking-widest cursor-pointer">Publicar de forma anónima</label>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Tu Mensaje</label>
                                <textarea name="request" rows={5} className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-[2.5rem] py-6 px-8 text-slate-800 dark:text-white focus:border-mivn-blue transition-all outline-none resize-none italic" placeholder="Comparte tu necesidad con nosotros..." required />
                            </div>

                            <div className="space-y-4">
                                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Visibilidad</p>
                                <div className="grid grid-cols-2 gap-4">
                                    <label className="relative flex flex-col items-center justify-center gap-3 p-6 border-2 border-mivn-blue/20 bg-mivn-blue/5 rounded-3xl cursor-pointer hover:bg-mivn-blue/10 transition-colors">
                                        <input type="radio" name="visibility" value="public" className="hidden" defaultChecked />
                                        <Globe className="w-5 h-5 text-mivn-blue" />
                                        <span className="text-[9px] font-black uppercase tracking-widest text-mivn-blue">Pública</span>
                                    </label>
                                    <label className="relative flex flex-col items-center justify-center gap-3 p-6 border-2 border-slate-100 dark:border-white/5 rounded-3xl cursor-pointer hover:bg-slate-50 dark:hover:bg-white/10 transition-colors">
                                        <input type="radio" name="visibility" value="private" className="hidden" />
                                        <Lock className="w-5 h-5 text-slate-400" />
                                        <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">Privada</span>
                                    </label>
                                </div>
                                <p className="text-[10px] text-slate-400 italic px-4 leading-relaxed">
                                    *Las peticiones privadas solo serán vistas por el equipo de intercesión y pastores.
                                </p>
                            </div>

                            <SubmitButton />
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
                        {initialRequests.length === 0 ? (
                            <div className="col-span-full py-12 text-center text-slate-400">
                                <p>No hay peticiones públicas recientes. Sé el primero en compartir tu necesidad.</p>
                            </div>
                        ) : (
                            initialRequests.map((r) => (
                                <div key={r.id} className={`group bg-white dark:bg-slate-900 border ${r.is_answered ? "border-mivn-gold/30 shadow-mivn-gold/5" : "border-slate-100 dark:border-slate-800"} rounded-[3.5rem] p-10 space-y-8 hover:shadow-2xl transition-all duration-500 relative overflow-hidden`}>

                                    {r.is_answered && (
                                        <div className="absolute top-8 right-8 bg-mivn-gold/10 text-mivn-gold px-4 py-1.5 rounded-full border border-mivn-gold/20 flex items-center gap-2 text-[8px] font-black tracking-widest uppercase shadow-lg">
                                            <Star className="w-3 h-3 fill-current" /> Respondida
                                        </div>
                                    )}

                                    <div className="flex items-center gap-6">
                                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center font-black text-xl transition-all group-hover:scale-110 shadow-xl ${r.is_answered ? "bg-mivn-gold text-white" : "bg-slate-100 dark:bg-white/5 text-slate-400 border border-slate-100 dark:border-white/5"}`}>
                                            {r.is_anonymous ? "?" : getInitials(r.requester_name)}
                                        </div>
                                        <div>
                                            <h4 className="text-lg font-playfair font-bold text-slate-800 dark:text-white uppercase tracking-tight">
                                                {r.is_anonymous ? "Anónimo" : r.requester_name}
                                            </h4>
                                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                                                {formatDistanceToNow(new Date(r.created_at), { addSuffix: true, locale: es })}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        {/* Since we don't have a title column yet, we might use truncated request or generic title */}
                                        <h5 className="text-xl font-bold text-slate-800 dark:text-white leading-tight underline decoration-mivn-blue/30 decoration-2 underline-offset-4">
                                            Petición de {r.is_anonymous ? "Un Hermano" : r.requester_name.split(" ")[0]}
                                        </h5>
                                        <p className="text-slate-500 dark:text-slate-400 font-light italic leading-relaxed text-base">
                                            "{r.request}"
                                        </p>
                                    </div>

                                    <div className="flex items-center justify-between pt-8 border-t border-slate-50 dark:border-white/5">
                                        <div className="flex items-center gap-3 text-mivn-blue">
                                            <div className="relative flex h-3 w-3">
                                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-mivn-blue opacity-75" />
                                                <Heart className="relative inline-flex h-3 w-3 fill-current" />
                                            </div>
                                            <span className="text-[10px] font-black uppercase tracking-widest">{r.intersession_count || 0} Orando</span>
                                        </div>
                                        <button
                                            onClick={() => handleJoinPrayer(r.id)}
                                            disabled={r.is_answered || joiningPrayer === r.id}
                                            className={`px-6 py-3 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${r.is_answered || joiningPrayer === r.id ? "bg-slate-100 dark:bg-white/5 text-slate-400 cursor-not-allowed" : "bg-mivn-blue text-white shadow-xl shadow-mivn-blue/20 hover:scale-105 active:scale-95"}`}
                                        >
                                            {joiningPrayer === r.id ? "Uniéndome..." : r.is_answered ? "Amén" : "Me uno en oración"}
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    {/* Pagination Controls */}
                    {pagination && pagination.last_page > 1 && (
                        <div className="flex justify-center items-center gap-4 pt-8">
                            <Link
                                href={`/oracion?page=${pagination.page - 1}`}
                                className={`px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${pagination.page <= 1 ? "opacity-50 pointer-events-none bg-slate-100 text-slate-400" : "bg-white text-mivn-blue hover:bg-mivn-blue hover:text-white shadow-lg"}`}
                            >
                                Anterior
                            </Link>

                            <span className="text-slate-400 font-bold text-xs uppercase tracking-widest">
                                Página {pagination.page} de {pagination.last_page}
                            </span>

                            <Link
                                href={`/oracion?page=${pagination.page + 1}`}
                                className={`px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${pagination.page >= pagination.last_page ? "opacity-50 pointer-events-none bg-slate-100 text-slate-400" : "bg-white text-mivn-blue hover:bg-mivn-blue hover:text-white shadow-lg"}`}
                            >
                                Siguiente
                            </Link>
                        </div>
                    )}
                </div>

            </main>
        </div>
    );
};

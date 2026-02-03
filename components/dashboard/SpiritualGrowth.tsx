"use client";

import {
    TrendingUp, CheckCircle2, Hourglass, Flag, Download,
    Star, Heart, BookOpen, Quote, Calendar, Award,
    ChevronRight, MapPin, Users, User, ArrowUpRight,
    Check, Milestone, GraduationCap, Waves
} from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { Milestone as GrowthMilestone, Certificate as GrowthCertificate } from "@/lib/queries/growth";
import { PrayerRequest } from "@/lib/queries/prayer-requests";

interface SpiritualGrowthProps {
    profile: any;
    progress?: any;
    milestones: GrowthMilestone[];
    certificates: GrowthCertificate[];
    activity: any[];
    prayerRequests: PrayerRequest[];
}

export const SpiritualGrowth = ({
    profile,
    progress,
    milestones,
    certificates,
    activity,
    prayerRequests
}: SpiritualGrowthProps) => {
    // Dynamic logic for milestones
    const displayMilestones = [
        {
            slug: "primera-visita",
            title: "Primera Visita",
            completed: true,
            date: "Completado",
            icon: Flag
        },
        {
            slug: "bautismo",
            title: "Bautismo",
            completed: !!profile.baptism_date,
            date: profile.baptism_date ? new Date(profile.baptism_date).toLocaleDateString('es-ES', { month: 'short', year: 'numeric' }) : "Pendiente",
            icon: Waves
        },
        {
            slug: "membresia",
            title: "Membresía",
            completed: profile.role === 'member' || profile.role === 'admin' || profile.role === 'super_admin',
            date: (profile.role === 'member' || profile.role === 'admin' || profile.role === 'super_admin') ? "Activo" : "Pendiente",
            icon: User
        },
        {
            slug: "liderazgo-101",
            title: "Liderazgo 101",
            completed: certificates.some(c => c.title.toLowerCase().includes('liderazgo')),
            date: certificates.some(c => c.title.toLowerCase().includes('liderazgo')) ? "Certificado" : "Pendiente",
            inProgress: !certificates.some(c => c.title.toLowerCase().includes('liderazgo')) && profile.role === 'member',
            icon: GraduationCap
        },
        {
            slug: "lider-de-grupo",
            title: "Líder de Grupo",
            completed: !!profile.small_group && (profile.role === 'admin' || profile.role === 'super_admin'), // O según lógica de group_members si se pasa
            date: "Pendiente",
            icon: Users
        }
    ].map(m => {
        // Priority from manual user_milestones table if exists
        const userMs = milestones.find(ums => ums.milestone_slug === m.slug);
        if (userMs) {
            return {
                ...m,
                completed: userMs.is_completed,
                date: userMs.completed_at ? new Date(userMs.completed_at).toLocaleDateString('es-ES', { month: 'short', year: 'numeric' }) : m.date
            };
        }
        return m;
    });

    const displayCertificates = certificates.length > 0 ? certificates.map(c => ({
        id: c.id,
        title: c.title,
        date: new Date(c.issued_at).toLocaleDateString('es-ES', { month: 'long', year: 'numeric' }),
        icon: c.type === 'baptism' ? Waves : Award,
        color: c.type === 'baptism' ? "text-mivn-gold" : "text-mivn-blue"
    })) : [
        { id: '1', title: "Próximo paso", date: "Pendiente", icon: Award, color: "text-slate-300" }
    ];

    const progressPercentage = progress?.total_chapters_read ? Math.min(Math.round((progress.total_chapters_read / 200) * 100), 100) : 0;

    return (
        <div className="space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-700">

            {/* Header Info */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                <div className="space-y-2">
                    <h1 className="text-4xl md:text-5xl font-playfair font-bold text-slate-900 dark:text-white uppercase tracking-tighter">
                        Mi Camino <span className="text-mivn-blue italic">de Fe</span>
                    </h1>
                    <p className="text-sm md:text-base text-slate-500 dark:text-gray-400 font-light italic">
                        "Visualiza tu crecimiento y trayectoria espiritual en la familia MIVN."
                    </p>
                </div>
                <button className="flex items-center gap-3 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 hover:text-mivn-blue transition-all shadow-sm">
                    <Download className="w-4 h-4" /> Descargar Reporte
                </button>
            </div>

            {/* Path of Faith Timeline */}
            <section className="bg-white dark:bg-slate-900 p-10 md:p-16 rounded-[3.5rem] border border-slate-100 dark:border-slate-800 shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-12 opacity-5 transition-transform group-hover:rotate-12">
                    <Milestone className="w-48 h-48 text-mivn-blue" />
                </div>

                <h3 className="text-2xl font-playfair font-bold text-slate-800 dark:text-white mb-16 relative z-10 flex items-center gap-4">
                    <TrendingUp className="w-6 h-6 text-mivn-gold" /> Hitos de Crecimiento
                </h3>

                <div className="relative flex flex-col lg:flex-row justify-between items-start lg:items-center gap-12 lg:gap-8 px-4">
                    {/* Connecting Line (Desktop) */}
                    <div className="absolute top-[22px] left-12 right-12 h-1 bg-slate-100 dark:bg-white/5 hidden lg:block" />
                    <div className="absolute top-[22px] left-12 w-[60%] h-1 bg-gradient-to-r from-mivn-blue to-mivn-gold hidden lg:block transition-all duration-1000" />

                    {/* Timeline Items */}
                    {displayMilestones.map((ms, i) => (
                        <div key={i} className="relative z-10 flex flex-row lg:flex-col items-center gap-6 lg:text-center group/ms">
                            <div className={`size-12 rounded-[1.25rem] flex items-center justify-center shadow-xl ring-8 ring-white dark:ring-slate-900 transition-all duration-500 ${ms.completed
                                ? "bg-mivn-blue text-white scale-110"
                                : ms.inProgress
                                    ? "bg-white dark:bg-slate-800 border-2 border-mivn-gold text-mivn-gold animate-pulse"
                                    : "bg-slate-50 dark:bg-slate-800 text-slate-300"
                                }`}>
                                {ms.completed ? <CheckCircle2 className="w-6 h-6 fill-current" /> : ms.inProgress ? <Hourglass className="w-6 h-6" /> : <ms.icon className="w-6 h-6" />}
                            </div>
                            <div className="space-y-1">
                                <p className={`text-sm font-black uppercase tracking-tight ${ms.completed ? "text-slate-900 dark:text-white" : "text-slate-400"}`}>{ms.title}</p>
                                <p className={`text-[10px] font-bold uppercase tracking-widest ${ms.inProgress ? "text-mivn-gold" : "text-slate-400 italic"}`}>{ms.date}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

                {/* Devotionals Progress */}
                <section className="bg-white dark:bg-slate-900 p-10 md:p-12 rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-2xl space-y-10 group">
                    <div className="flex items-center justify-between">
                        <h3 className="text-xl font-bold text-slate-800 dark:text-white uppercase tracking-tight">Mis Devocionales</h3>
                        <span className="bg-mivn-gold/10 text-mivn-gold text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest">7 Días de Racha</span>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center gap-10">
                        <div className="relative size-32 flex items-center justify-center">
                            <svg className="size-full transform -rotate-90">
                                <circle
                                    className="text-slate-100 dark:text-white/5"
                                    cx="64" cy="64" r="56"
                                    fill="transparent" stroke="currentColor" strokeWidth="12"
                                />
                                <circle
                                    className="text-mivn-blue drop-shadow-[0_0_8px_rgba(74,163,223,0.5)] transition-all duration-1000"
                                    cx="64" cy="64" r="56"
                                    fill="transparent" stroke="currentColor" strokeWidth="12"
                                    strokeDasharray="351.8" strokeDashoffset={351.8 - (351.8 * progressPercentage / 100)}
                                />
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <span className="text-4xl font-black text-slate-900 dark:text-white">75%</span>
                            </div>
                        </div>
                        <div className="flex-1 space-y-6 w-full">
                            <div className="space-y-1">
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-relaxed">Capítulos leídos este año</p>
                                <p className="text-4xl font-black text-slate-900 dark:text-white">{progress?.total_chapters_read || 0}</p>
                            </div>
                            <div className="w-full bg-slate-50 dark:bg-white/5 h-3 rounded-full overflow-hidden border border-slate-100 dark:border-white/5">
                                <div className="bg-mivn-blue h-full rounded-full transition-all duration-1000" style={{ width: `${progressPercentage}%` }} />
                            </div>
                            <p className="text-[10px] text-slate-400 italic">Estás a solo 4 capítulos de tu meta semanal. ¡Sigue adelante!</p>
                        </div>
                    </div>
                </section>

                {/* Prayer Requests */}
                <section className="bg-white dark:bg-slate-900 p-10 md:p-12 rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-2xl space-y-8">
                    <div className="flex items-center justify-between">
                        <h3 className="text-xl font-bold text-slate-800 dark:text-white uppercase tracking-tight">Mis Peticiones</h3>
                        <Link href="/oracion" className="p-3 bg-mivn-blue/10 text-mivn-blue rounded-2xl hover:bg-mivn-blue transition-all hover:text-white">
                            <PlusCircleIcon />
                        </Link>
                    </div>

                    <div className="space-y-4">
                        {prayerRequests.length > 0 ? prayerRequests.map((request, i) => (
                            <div key={i} className={`flex items-center justify-between p-6 rounded-3xl border border-transparent shadow-sm hover:border-slate-100 dark:hover:border-white/5 transition-all bg-mivn-blue/5`}>
                                <div className="flex items-center gap-5">
                                    <div className={`w-12 h-12 rounded-2xl bg-mivn-blue/10 flex items-center justify-center text-mivn-blue`}>
                                        <Heart className="w-5 h-5" />
                                    </div>
                                    <div className="space-y-0.5">
                                        <p className="font-bold text-slate-800 dark:text-white uppercase tracking-tight truncate max-w-[150px]">{request.request}</p>
                                        <p className="text-[9px] text-slate-400 italic">Enviada el {new Date(request.created_at).toLocaleDateString()}</p>
                                    </div>
                                </div>
                                <span className={`text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full ${request.is_answered ? 'bg-emerald-500/10 text-emerald-500' : 'bg-amber-500/10 text-amber-500'}`}>
                                    {request.is_answered ? "Respondida" : "En Oración"}
                                </span>
                            </div>
                        )) : (
                            <p className="text-center py-10 text-slate-400 italic text-sm">No tienes peticiones de oración registradas.</p>
                        )}
                    </div>
                </section>

            </div>

            {/* Recent Activity Table */}
            <section className="bg-white dark:bg-slate-900 rounded-[3.5rem] border border-slate-100 dark:border-slate-800 shadow-2xl overflow-hidden">
                <div className="px-12 py-8 bg-slate-50 dark:bg-white/5 border-b border-slate-100 dark:border-white/5">
                    <h3 className="text-xl font-bold text-slate-800 dark:text-white uppercase tracking-tight">Actividad Reciente</h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-slate-50/50 dark:bg-white/[0.02]">
                            <tr>
                                <th className="px-12 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Evento / Taller</th>
                                <th className="px-12 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Fecha</th>
                                <th className="px-12 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Categoría</th>
                                <th className="px-12 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-right">Estado</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50 dark:divide-white/5">
                            {activity.length > 0 ? activity.map((act, i) => (
                                <tr key={i} className="hover:bg-slate-50 dark:hover:bg-white/5 transition-colors group cursor-pointer">
                                    <td className="px-12 py-8 text-sm font-bold text-slate-800 dark:text-white uppercase tracking-tight">{act.title}</td>
                                    <td className="px-12 py-8 text-sm text-slate-500 italic">{new Date(act.date).toLocaleDateString()}</td>
                                    <td className="px-12 py-8">
                                        <span className="text-[10px] font-black uppercase tracking-widest bg-slate-100 dark:bg-white/5 px-4 py-1.5 rounded-full text-slate-500">
                                            {act.category}
                                        </span>
                                    </td>
                                    <td className="px-12 py-8 text-right">
                                        <div className="flex justify-end">
                                            <div className="size-8 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
                                                <CheckCircle2 className="w-5 h-5 fill-current" />
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan={4} className="px-12 py-10 text-center text-slate-400 italic text-sm">No hay actividad reciente.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </section>

            {/* Certificates Certificates */}
            <section className="space-y-8 pb-12">
                <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-playfair font-bold text-slate-800 dark:text-white uppercase tracking-tight">Mis Certificados</h3>
                    <Link href="#" className="text-[10px] font-black text-mivn-blue hover:underline uppercase tracking-widest">Ver Todos</Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {displayCertificates.map((cert) => (
                        <div key={cert.id} className="group bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 overflow-hidden shadow-2xl hover:border-mivn-blue/30 transition-all">
                            <div className="aspect-[1.41] bg-slate-50 dark:bg-slate-800/50 relative flex items-center justify-center overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-tr from-mivn-blue/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                <cert.icon className={`w-16 h-16 ${cert.color} opacity-40 group-hover:scale-110 transition-transform duration-700`} />
                                {cert.date !== 'Pendiente' && (
                                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-slate-900/40 backdrop-blur-[2px] transition-all">
                                        <button className="bg-white text-slate-900 px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center gap-3 shadow-2xl">
                                            <Download className="w-4 h-4" /> Descargar PDF
                                        </button>
                                    </div>
                                )}
                            </div>
                            <div className="p-8 space-y-2">
                                <h4 className="text-lg font-bold text-slate-900 dark:text-white uppercase tracking-tight">{cert.title}</h4>
                                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest italic">
                                    {cert.date === 'Pendiente' ? 'Tú puedes lograrlo' : `Completado: ${cert.date}`}
                                </p>
                            </div>
                        </div>
                    ))}
                    {/* Placeholder for In-Progress */}
                    <div className="bg-slate-50 dark:bg-slate-900/50 rounded-[2.5rem] border-4 border-dashed border-slate-100 dark:border-slate-800 flex flex-col items-center justify-center p-12 text-center space-y-4 opacity-60">
                        <div className="p-5 bg-white dark:bg-slate-800 rounded-3xl shadow-lg">
                            <Hourglass className="w-8 h-8 text-slate-300" />
                        </div>
                        <div className="space-y-1">
                            <p className="text-sm font-bold text-slate-500 uppercase tracking-tight">Liderazgo 101</p>
                            <p className="text-[10px] text-slate-400 italic">Completa el curso para obtener el diploma</p>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
};

function PlusCircleIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="16" /><line x1="8" y1="12" x2="16" y2="12" /></svg>
    );
}

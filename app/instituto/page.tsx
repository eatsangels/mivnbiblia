"use client";

import { InstituteHeader } from "@/components/institute/InstituteHeader";
import { InstituteSidebar } from "@/components/institute/InstituteSidebar";
import { CourseCard } from "@/components/institute/CourseCard";
import { ArrowRight, Rocket } from "lucide-react";
import Image from "next/image";

export default function InstitutePage() {
    const courses = [
        {
            title: "Fundamentos de la Fe",
            instructor: "Pr. Mario Casas",
            progress: 75,
            category: "Fundacional",
            imageSrc: "https://images.unsplash.com/photo-1507434965515-61970f2bd7c6?auto=format&fit=crop&q=80&w=800",
            imageAlt: "Fundamentos de la fe",
            href: "/instituto/clase/1"
        },
        {
            title: "Liderazgo Nivel 1",
            instructor: "Dra. Elena Ríos",
            progress: 30,
            category: "Liderazgo",
            imageSrc: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800",
            imageAlt: "Liderazgo Nivel 1",
            href: "/instituto/clase/1"
        },
        {
            title: "Teología Básica",
            instructor: "Mtro. Juan Pérez",
            progress: 0,
            category: "Académico",
            imageSrc: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&q=80&w=800",
            imageAlt: "Teología Básica",
            href: "/instituto/clase/1"
        }
    ];

    const certificates = [
        { title: "Introducción Bíblica" },
        { title: "Discipulado 101" },
        { title: "Vida en Familia" }
    ];

    return (
        <div className="min-h-screen bg-[#F6F7F8] dark:bg-[#05070A] text-[#0f161a] dark:text-white font-lexend">
            <InstituteHeader />

            <main className="max-w-[1440px] mx-auto flex flex-col lg:flex-row gap-8 p-6">
                <InstituteSidebar />

                <div className="flex-1 flex flex-col gap-8">
                    {/* Hero Section */}
                    <section className="relative overflow-hidden rounded-2xl bg-mivn-blue min-h-[320px] flex flex-col justify-end p-8 md:p-12 text-white">
                        {/* Background Image Layer */}
                        <div className="absolute inset-0 z-0">
                            <Image
                                src="https://images.unsplash.com/photo-1491841550275-ad7854e35ca6?auto=format&fit=crop&q=80&w=2000"
                                alt="Biblical study background"
                                fill
                                className="object-cover opacity-30"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                        </div>

                        <div className="relative z-10 flex flex-col md:flex-row items-end justify-between gap-6">
                            <div className="max-w-xl">
                                <h1 className="text-3xl md:text-5xl font-extrabold leading-tight mb-3">
                                    Tu Crecimiento Espiritual Empieza Aquí
                                </h1>
                                <p className="text-white/80 text-base md:text-lg">
                                    Monitorea tu avance y continúa transformando tu vida a través de la Palabra.
                                </p>
                            </div>

                            <div className="flex gap-4 w-full md:w-auto">
                                <div className="flex-1 md:flex-none bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4 min-w-[140px]">
                                    <p className="text-white/70 text-xs font-medium uppercase tracking-wide">En Curso</p>
                                    <p className="text-3xl font-bold mt-1">3</p>
                                </div>
                                <div className="flex-1 md:flex-none bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4 min-w-[140px]">
                                    <p className="text-white/70 text-xs font-medium uppercase tracking-wide">Certificados</p>
                                    <p className="text-3xl font-bold mt-1">5</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Course Grid Section */}
                    <section>
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Mis Cursos en Progreso</h2>
                            <button className="text-mivn-blue font-bold text-sm flex items-center gap-1 hover:underline">
                                Explorar Catálogo <ArrowRight className="w-4 h-4" />
                            </button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                            {courses.map((course, i) => (
                                <CourseCard key={i} {...course} />
                            ))}
                        </div>
                    </section>

                    {/* Latest Certificates Row */}
                    <section className="bg-white dark:bg-[#0A0F1D] p-6 rounded-2xl border border-slate-200 dark:border-white/5 shadow-sm">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 bg-mivn-blue/10 rounded-full text-mivn-blue">
                                <Rocket className="w-6 h-6" />
                            </div>
                            <h2 className="text-xl font-bold text-slate-800 dark:text-white">Certificados Obtenidos</h2>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                            {certificates.map((cert, i) => (
                                <div key={i} className="group cursor-pointer">
                                    <div className="aspect-[1.4/1] bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-white/5 rounded-lg flex items-center justify-center p-4 relative overflow-hidden transition-transform group-hover:scale-[1.02]">
                                        <div className="absolute inset-0 bg-mivn-blue/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                        <div className="text-slate-300 dark:text-slate-700">
                                            {/* Using a placeholder SVG or Icon for certificate */}
                                            <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z" />
                                            </svg>
                                        </div>
                                    </div>
                                    <p className="mt-2 text-xs font-bold text-center text-slate-700 dark:text-slate-300">{cert.title}</p>
                                </div>
                            ))}

                            <div className="flex items-center justify-center border-2 border-dashed border-slate-200 dark:border-white/10 rounded-lg aspect-[1.4/1] hover:border-mivn-blue transition-colors cursor-pointer group">
                                <div className="text-center">
                                    <div className="text-slate-400 group-hover:text-mivn-blue mb-1">
                                        <ArrowRight className="w-6 h-6 mx-auto" />
                                    </div>
                                    <p className="text-[10px] font-bold text-slate-400 group-hover:text-mivn-blue">Ver todos</p>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </main>

            {/* Simple Footer */}
            <footer className="mt-12 border-t border-slate-200 dark:border-white/5 py-8 px-6 bg-white dark:bg-[#0A0F1D]">
                <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                        <div className="w-6 h-6 text-mivn-blue/60 relative">
                            <Image src="/logo_mivn.png" alt="MIVN" fill className="object-contain opacity-50 grayscale" />
                        </div>
                        <p className="text-slate-500 text-xs">© 2026 Ministerio Internacional Vida Nueva - Instituto Bíblico</p>
                    </div>
                    <div className="flex gap-6">
                        <a href="/terminos" className="text-xs text-slate-400 hover:text-mivn-blue transition-colors">Términos de Servicio</a>
                        <a href="#" className="text-xs text-slate-400 hover:text-mivn-blue transition-colors">Soporte Académico</a>
                        <a href="/privacidad" className="text-xs text-slate-400 hover:text-mivn-blue transition-colors">Política de Privacidad</a>
                    </div>
                </div>
            </footer>
        </div>
    );
}

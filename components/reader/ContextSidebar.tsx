'use client';

import { useState, useEffect } from "react";
import { ChevronRight, ExternalLink, Loader2, Heart, X } from "lucide-react";
import Image from "next/image";
import { getBookMetadata, BookMetadata } from "@/lib/bibleMetadata";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";

export function ContextSidebar({ bookName }: { bookName: string }) {
    const [meta, setMeta] = useState<BookMetadata>(getBookMetadata(bookName));
    const [loading, setLoading] = useState(true);
    const [showIntro, setShowIntro] = useState(false);
    const [activeTab, setActiveTab] = useState<'exegetico' | 'esinp'>('exegetico');

    useEffect(() => {
        setMeta(getBookMetadata(bookName));
    }, [bookName]);

    // ... (existing useEffects)

    return (
        <aside className="w-full h-full flex flex-col gap-6 overflow-y-auto pr-2">

            {/* Intro Modal */}
            {showIntro && (
                <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-[100] flex items-center justify-center p-4">
                    <div className="bg-[#0f141f] border border-gold-500/20 rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-300 relative">
                        {/* Header Image Background */}
                        <div className="h-48 w-full relative shrink-0">
                            <Image
                                src={meta.image}
                                alt={meta.title}
                                fill
                                className="object-cover opacity-20"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0f141f] via-[#0f141f]/40 to-transparent" />
                            <button
                                onClick={() => setShowIntro(false)}
                                className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-colors z-20"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="px-8 pb-8 -mt-16 relative z-10">
                            <div className="w-20 h-20 rounded-xl overflow-hidden shadow-2xl border-2 border-gold-500/30 mb-4 bg-black relative">
                                <Image
                                    src={meta.image}
                                    alt={meta.author}
                                    fill
                                    className="object-cover"
                                />
                            </div>

                            <h2 className="text-3xl font-serif font-bold text-white mb-1 drop-shadow-lg">{meta.title || meta.image.split('/').pop()}</h2>
                            <p className="text-gold-500 text-xs uppercase tracking-widest font-bold mb-6">Autor: {meta.author} • {meta.date}</p>

                            <div className="prose prose-invert prose-sm max-w-none bg-[#0f141f]/50 p-4 rounded-xl backdrop-blur-sm border border-white/5">
                                <p className="text-gray-300 leading-relaxed font-serif text-base whitespace-pre-wrap">
                                    {meta.intro || "Descripción no disponible."}
                                </p>
                            </div>

                            <div className="mt-8 pt-6 border-t border-white/5 flex gap-4">
                                <div className="flex-1 bg-white/5 rounded-lg p-4 border border-white/5">
                                    <h4 className="text-gold-500 text-[10px] font-bold uppercase tracking-wider mb-2">Contexto Histórico</h4>
                                    <p className="text-xs text-gray-400 leading-relaxed font-sans">{meta.context}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Book Header Card (Dynamic) */}
            <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-[#1e2738] to-[#0d121c] p-0 mb-2 group shrink-0 min-h-[140px]">
                {/* Next.js Optimized Image */}
                <Image
                    src={meta.image}
                    alt={meta.title}
                    fill
                    className="object-cover opacity-40 mix-blend-overlay transition-transform duration-700 group-hover:scale-105"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#0d121c] via-transparent to-transparent opacity-80 z-1 pointer-events-none" />

                <div className="relative z-10 p-5 flex flex-col justify-between h-full min-h-[140px]">
                    {/* Small inner thumbnail of author/icon */}
                    <div className="w-10 h-10 rounded-lg overflow-hidden shadow-lg border border-white/10 mb-2 relative shrink-0">
                        <Image
                            src={meta.image}
                            alt={meta.author}
                            fill
                            className="object-cover"
                        />
                    </div>
                    <div className="flex flex-col gap-1">
                        <span className="text-[9px] text-gold-500/60 font-bold tracking-[0.2em] uppercase">Ilustración Sagrada</span>
                        <h2 className="text-white font-serif font-bold text-xl leading-tight drop-shadow-md">{meta.title}</h2>
                    </div>
                </div>
            </div>

            {/* Context Section */}
            <div className="shrink-0">
                <div className="flex items-center justify-between mb-2">
                    <h3 className="text-white font-bold text-sm">Contexto</h3>
                    <ExternalLink className="w-3 h-3 text-gray-500 hover:text-white cursor-pointer" />
                </div>
                <p className="text-xs text-gray-400 leading-relaxed font-sans mb-4">
                    {meta.context}
                </p>
                <div className="w-full h-px bg-white/5" />
            </div>

            {/* Key Themes */}
            <div className="shrink-0">
                <h3 className="text-white font-bold text-sm mb-3">Temas clave</h3>
                <div className="space-y-2">
                    {meta.themes.map(theme => (
                        <div key={theme} className="flex items-center gap-2 text-gray-400 hover:text-gold-400 cursor-pointer transition-colors group">
                            <span className="text-[10px] text-gray-600 group-hover:text-gold-500">▶</span>
                            <span className="text-xs font-medium group-hover:text-gray-200">{theme}</span>
                        </div>
                    ))}
                </div>
                <div className="w-full h-px bg-white/5 my-4" />
            </div>

            {/* Commentary Tabs */}
            <div className="shrink-0">
                <div className="flex items-center gap-4 mb-3 border-b border-white/5 pb-2">
                    <button
                        onClick={() => setActiveTab('exegetico')}
                        className={`text-[10px] font-bold uppercase tracking-widest transition-colors ${activeTab === 'exegetico' ? 'text-gold-500' : 'text-gray-500 hover:text-gray-300'}`}
                    >
                        Exegético
                    </button>
                    <button
                        onClick={() => setActiveTab('esinp')}
                        className={`text-[10px] font-bold uppercase tracking-widest transition-colors ${activeTab === 'esinp' ? 'text-gold-500' : 'text-gray-500 hover:text-gray-300'}`}
                    >
                        Esinp LCNT
                    </button>
                </div>

                <div className="min-h-[60px] animate-element">
                    {activeTab === 'exegetico' ? (
                        <div className="space-y-2">
                            <p className="text-[11px] text-gray-400 italic leading-relaxed">
                                "Un análisis profundo del texto original, enfocándose en el significado histórico y lingüístico."
                            </p>
                            <div className="flex gap-2 text-[9px] text-gray-500 uppercase tracking-wider">
                                <span>✦ {meta.author}</span>
                                <span>• {meta.date}</span>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-2">
                            <p className="text-[11px] text-gray-400 italic leading-relaxed">
                                "Estudio Integral del Nuevo Testamento (LCNT). Aplicación práctica y teológica para el creyente moderno."
                            </p>
                            <div className="flex gap-2 text-[9px] text-gray-500 uppercase tracking-wider">
                                <span>✦ Perspectiva LCNT</span>
                                <span>• Referencial</span>
                            </div>
                        </div>
                    )}
                </div>
                <div className="w-full h-px bg-white/5 my-4" />
            </div>

            {/* Intro/Description */}
            <div className="shrink-0" id="book-intro">
                <h3 className="text-white font-bold text-sm mb-2">Introducción</h3>
                <p className="text-xs text-gray-400 leading-relaxed font-sans mb-4 line-clamp-3">
                    {meta.intro}
                </p>
            </div>

            <button
                onClick={() => setShowIntro(true)}
                className="w-full py-3 bg-[#1e2230] hover:bg-[#252a3b] text-gold-500 text-xs font-bold uppercase tracking-widest rounded-lg transition-colors border border-gold-500/10 shrink-0 mb-8 active:scale-95"
            >
                Leer más
            </button>

            {/* Subtle Credit Footer */}
            <div className="mt-auto pt-6 border-t border-white/5 text-center pb-4 shrink-0">
                <p className="text-[9px] text-gray-600 font-medium">
                    Desarrollado por <Link href="https://etrinidad.netlify.app/" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gold-400 transition-colors underline decoration-white/10 underline-offset-4">Edward Trinidad</Link>
                </p>
                <div className="flex items-center justify-center gap-1.5 mt-1 text-[8px] uppercase tracking-[0.2em] text-gray-700 font-black">
                    Con <Heart className="w-2 h-2 text-red-500/30 fill-red-500/30 animate-pulse" /> Soli Deo Gloria
                </div>
            </div>
        </aside>
    );
}

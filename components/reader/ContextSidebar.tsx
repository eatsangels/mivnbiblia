'use client';

import { useState, useEffect } from "react";
import { ChevronRight, ExternalLink, Loader2 } from "lucide-react";
import Image from "next/image";
import { getBookMetadata, BookMetadata } from "@/lib/bibleMetadata";
import { createClient } from "@/lib/supabase/client";

export function ContextSidebar({ bookName }: { bookName: string }) {
    const [meta, setMeta] = useState<BookMetadata>(getBookMetadata(bookName));
    const [loading, setLoading] = useState(true);
    const supabase = createClient();

    useEffect(() => {
        const fetchMeta = async () => {
            setLoading(true);
            const slug = bookName
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
                .toLowerCase()
                .replace(/ /g, "-")
                .replace(/[^a-z0-9-]/g, "");

            const { data, error } = await supabase
                .from('book_metadata')
                .select('*')
                .eq('book_slug', slug)
                .maybeSingle();

            if (data) {
                const d = data as any;
                setMeta({
                    title: d.title,
                    image: d.image_path || meta.image,
                    author: d.author || meta.author,
                    date: d.date_written || meta.date,
                    context: d.context || meta.context,
                    themes: d.themes || meta.themes,
                    intro: d.intro || meta.intro,
                    relatedVerses: []
                });
            }
            setLoading(false);
        };
        fetchMeta();
    }, [bookName]);

    if (loading && !meta.title) return (
        <div className="flex items-center justify-center h-full">
            <Loader2 className="w-6 h-6 text-gold-500 animate-spin" />
        </div>
    );

    return (
        <aside className="w-full h-full flex flex-col gap-6 overflow-y-auto pr-2">

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

            {/* Commentary Preview */}
            <div className="shrink-0">
                <h3 className="text-white font-bold text-sm mb-2">Comentario</h3>
                <div className="mb-3 flex items-center gap-2">
                    <span className="text-[10px] bg-white/5 text-gray-300 px-2 py-0.5 rounded border border-white/5">Exegético</span>
                    <span className="text-[10px] text-gray-500 truncate">v. 1, análisis del Logos...</span>
                </div>
                <div className="flex gap-2 text-[10px] text-gray-500 uppercase tracking-wider mb-4">
                    <span>✦ {meta.author}</span>
                    <span>• {meta.date}</span>
                </div>
                <div className="w-full h-px bg-white/5" />
            </div>

            {/* Intro/Instrupoada */}
            <div className="shrink-0">
                <h3 className="text-white font-bold text-sm mb-2">Introducción</h3>
                <p className="text-xs text-gray-400 leading-relaxed font-sans mb-4">
                    {meta.intro}
                </p>
            </div>

            <button className="mt-auto w-full py-3 bg-[#1e2230] hover:bg-[#252a3b] text-gold-500 text-xs font-bold uppercase tracking-widest rounded-lg transition-colors border border-gold-500/10 shrink-0">
                Leer más
            </button>
        </aside>
    );
}

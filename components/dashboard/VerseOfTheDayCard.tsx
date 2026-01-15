'use client';

import { Book, ArrowRight, Share2, Check } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export function VerseOfTheDayCard({ verse }: { verse: any }) {
    const [copied, setCopied] = useState(false);

    const handleShare = async () => {
        if (!verse) return;
        const text = `"${verse.content}" - ${verse.book_name} ${verse.chapter}:${verse.verse_number}`;

        try {
            await navigator.clipboard.writeText(text);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy', err);
        }
    };

    return (
        <div className="glass-panel rounded-3xl p-8 relative overflow-hidden group border-gold-500/10 hover:border-gold-500/30 transition-all duration-500 shadow-2xl shadow-black/50 h-full flex flex-col justify-between">
            <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                <Book className="w-32 h-32 text-gold-500 rotate-12" />
            </div>

            <div className="relative z-10">
                <span className="inline-block px-3 py-1 bg-gold-500/10 border border-gold-500/20 rounded-full text-[10px] font-bold text-gold-400 uppercase tracking-widest mb-6">
                    Versículo del Día
                </span>
                <blockquote className="font-libre italic text-2xl md:text-3xl text-gray-100 leading-relaxed mb-6">
                    "{verse?.content || "Lámpara es a mis pies tu palabra, Y lumbrera a mi camino."}"
                </blockquote>
                <cite className="not-italic text-gold-500 font-bold tracking-widest uppercase text-sm">
                    — {verse ? `${verse.book_name} ${verse.chapter}:${verse.verse_number}` : 'Salmos 119:105'}
                </cite>
            </div>

            <div className="relative z-10 mt-8 pt-8 border-t border-white/5 flex items-center justify-between gap-4">
                <Link href={verse ? `/read/${verse.book_name}/${verse.chapter}` : '/read'} className="text-xs font-bold text-gray-400 hover:text-gold-400 transition-colors flex items-center gap-2 group/link">
                    SEGUIR LEYENDO <ArrowRight className="w-3 h-3 group-hover/link:translate-x-1 transition-transform" />
                </Link>

                <button
                    onClick={handleShare}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 hover:bg-gold-500/10 text-gray-400 hover:text-gold-400 transition-all text-[10px] font-bold uppercase tracking-widest"
                >
                    {copied ? (
                        <>
                            <Check className="w-3 h-3" /> Copiado
                        </>
                    ) : (
                        <>
                            <Share2 className="w-3 h-3" /> Compartir
                        </>
                    )}
                </button>
            </div>
        </div>
    );
}

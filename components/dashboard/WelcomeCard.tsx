"use client";

import { useState, useRef, useEffect } from 'react';
import { BookOpen, ChevronRight, Download, Share2, ImageIcon, Loader2, X, Check } from 'lucide-react';
import Link from 'next/link';
import { toPng, toBlob } from 'html-to-image';
import { createPortal } from 'react-dom';

interface WelcomeCardProps {
    profileName: string;
    initialVerse: any;
}

export function WelcomeCard({ profileName, initialVerse }: WelcomeCardProps) {
    const [verse, setVerse] = useState(initialVerse);
    const [isGenerating, setIsGenerating] = useState(false);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [showPreview, setShowPreview] = useState(false);
    const [mounted, setMounted] = useState(false);
    const captureRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setMounted(true);
    }, []);

    const generateImage = async (asBlob = false) => {
        if (!captureRef.current) return null;

        // Hide elements or adjust styles for capture if needed
        const options = {
            quality: 0.95,
            pixelRatio: 2,
            width: 1080,
            height: 1350, // Social media story format
            style: {
                display: 'flex',
                transform: 'none',
            }
        };

        if (asBlob) {
            return await toBlob(captureRef.current, options);
        }
        return await toPng(captureRef.current, options);
    };

    const handlePreview = async () => {
        if (isGenerating) return;
        setIsGenerating(true);

        try {
            const dataUrl = await generateImage() as string;
            setPreviewUrl(dataUrl);
            setShowPreview(true);
        } catch (err) {
            console.error('Error generating preview:', err);
        } finally {
            setIsGenerating(false);
        }
    };

    const closePreview = () => {
        setShowPreview(false);
        setPreviewUrl(null);
    };

    const handleDownload = async () => {
        let url = previewUrl;
        if (!url) {
            setIsGenerating(true);
            try {
                url = await generateImage() as string;
            } catch (err) {
                console.error('Error downloading:', err);
                setIsGenerating(false);
                return;
            }
        }

        const link = document.createElement('a');
        link.download = `versiculo-${verse?.book_name || 'mivn'}.png`;
        link.href = url;
        link.click();
        setIsGenerating(false);
    };

    const handleShare = async () => {
        try {
            const blob = await generateImage(true) as Blob;
            const file = new File([blob], `versiculo-${verse?.book_name}.png`, { type: 'image/png' });

            if (navigator.share && navigator.canShare({ files: [file] })) {
                await navigator.share({
                    files: [file],
                    title: 'Versículo del Día',
                    text: `"${verse?.content}" - ${verse?.book_name} ${verse?.chapter}:${verse?.verse_number}`,
                });
            } else {
                handleDownload();
            }
        } catch (err) {
            console.error('Error sharing:', err);
        }
    };

    return (
        <section className="relative overflow-hidden rounded-[3.5rem] bg-mivn-blue p-10 md:p-16 text-white shadow-2xl shadow-mivn-blue/20 group">
            {/* Background Icon */}
            <div className="absolute top-0 right-0 p-12 opacity-10 group-hover:rotate-12 transition-transform duration-1000">
                <BookOpen className="w-64 h-64 text-white" />
            </div>

            <div className="relative z-10 max-w-2xl space-y-8">
                <div className="space-y-4">
                    <h2 className="text-4xl md:text-6xl font-playfair font-bold tracking-tight">
                        ¡Hola, {profileName}!
                    </h2>
                    <p className="text-xl md:text-2xl text-white/80 font-light italic leading-relaxed">
                        "{verse?.content || 'Lámpara es a mis pies tu palabra, y lumbrera a mi camino.'}"
                    </p>
                    <p className="text-[10px] uppercase font-black tracking-widest text-white/60">
                        — {verse ? `${verse.book_name} ${verse.chapter}:${verse.verse_number}` : 'Salmos 119:105'}
                    </p>
                </div>

                <div className="flex flex-wrap gap-4 pt-4">
                    <Link href="/read" className="bg-white text-mivn-blue px-10 py-5 rounded-[2rem] font-black uppercase tracking-widest text-[10px] shadow-2xl hover:scale-105 transition-all flex items-center gap-3">
                        Continuar Lectura <ChevronRight className="w-4 h-4" />
                    </Link>

                    <button
                        onClick={handlePreview}
                        disabled={isGenerating}
                        className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-8 py-5 rounded-[2rem] font-black uppercase tracking-widest text-[10px] hover:bg-white/20 transition-all flex items-center gap-3 disabled:opacity-50"
                    >
                        {isGenerating ? <Loader2 className="w-4 h-4 animate-spin" /> : <ImageIcon className="w-4 h-4" />}
                        Crear Imagen
                    </button>
                </div>
            </div>

            {/* Hidden capture template - SOCIAL MEDIA STORY FORMAT */}
            <div style={{ position: 'fixed', top: -5000, left: -5000, pointerEvents: 'none', opacity: 0 }}>
                <div
                    ref={captureRef}
                    style={{
                        width: '1080px',
                        height: '1350px',
                        background: 'radial-gradient(120% 120% at 50% 0%, #1e293b 0%, #020617 100%)',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: '100px',
                        position: 'relative',
                        overflow: 'hidden'
                    }}
                >
                    {/* Decorative Elements */}
                    <div className="absolute top-20 right-20 opacity-10">
                        <BookOpen className="w-96 h-96 text-white" />
                    </div>

                    {/* Ornaments */}
                    <div className="absolute top-12 left-12 w-32 h-32 border-l-4 border-t-4 border-mivn-gold/30 rounded-tl-[3rem]"></div>
                    <div className="absolute top-12 right-12 w-32 h-32 border-r-4 border-t-4 border-mivn-gold/30 rounded-tr-[3rem]"></div>
                    <div className="absolute bottom-12 left-12 w-32 h-32 border-l-4 border-b-4 border-mivn-gold/30 rounded-bl-[3rem]"></div>
                    <div className="absolute bottom-12 right-12 w-32 h-32 border-r-4 border-b-4 border-mivn-gold/30 rounded-br-[3rem]"></div>

                    <div className="relative z-10 flex flex-col items-center text-center space-y-16">
                        <div className="space-y-4">
                            <span className="px-8 py-3 bg-mivn-gold/10 border border-mivn-gold/30 rounded-full text-2xl font-black text-mivn-gold uppercase tracking-[0.4em]">
                                Versículo Diario
                            </span>
                        </div>

                        <blockquote className="text-7xl font-playfair font-bold text-white leading-tight italic max-w-[900px] drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
                            "{verse?.content || 'Lámpara es a mis pies tu palabra, y lumbrera a mi camino.'}"
                        </blockquote>

                        <cite className="not-italic text-3xl font-black text-white/50 uppercase tracking-[0.5em]">
                            — {verse ? `${verse.book_name} ${verse.chapter}:${verse.verse_number}` : 'Salmos 119:105'}
                        </cite>

                        <div className="pt-32 flex flex-col items-center gap-8">
                            <div className="w-24 h-0.5 bg-mivn-gold/50 rounded-full" />
                            <div className="flex flex-col items-center gap-4">
                                <p className="text-2xl font-bold text-white uppercase tracking-[0.3em]">Ministerio Internacional Vida Nueva</p>
                                <p className="text-sm font-black text-mivn-gold/80 uppercase tracking-[0.6em]">Santuario Digital</p>
                            </div>
                            <img src="/logo_mivn.png" alt="Logo" className="w-48 h-auto drop-shadow-[0_0_20px_rgba(74,163,223,0.3)] mt-4" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Preview Modal */}
            {mounted && showPreview && previewUrl && createPortal(
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl animate-in fade-in duration-300">
                    <div className="relative bg-slate-900 border border-white/10 rounded-[3rem] w-full max-w-lg overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300">
                        {/* Header */}
                        <div className="p-8 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
                            <h3 className="text-xs font-black uppercase tracking-[0.4em] text-mivn-gold">Vista Previa Premium</h3>
                            <button onClick={closePreview} className="p-2 text-white/40 hover:text-white transition-colors">
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        {/* Image Body */}
                        <div className="p-6 bg-black/40 flex items-center justify-center overflow-hidden">
                            <img src={previewUrl} alt="Preview" className="max-h-[60vh] rounded-2xl shadow-2xl shadow-black" />
                        </div>

                        {/* Actions */}
                        <div className="p-8 grid grid-cols-2 gap-4 bg-white/[0.02]">
                            <button
                                onClick={handleDownload}
                                className="flex items-center justify-center gap-3 py-5 bg-white/5 hover:bg-white/10 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] transition-all"
                            >
                                <Download className="w-4 h-4" /> Descargar
                            </button>
                            <button
                                onClick={handleShare}
                                className="flex items-center justify-center gap-3 py-5 bg-mivn-blue text-white rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-xl shadow-mivn-blue/20 hover:scale-[1.02] transition-all"
                            >
                                <Share2 className="w-4 h-4" /> Compartir
                            </button>
                        </div>
                    </div>
                </div>,
                document.body
            )}
        </section>
    );
}

'use client';

import { Book, ArrowRight, Share2, Check, Download, Image as ImageIcon } from 'lucide-react';
import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { toBlob } from 'html-to-image';

export function VerseOfTheDayCard({ verse }: { verse: any }) {
    const [copied, setCopied] = useState(false);
    const [isSharing, setIsSharing] = useState(false);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [showPreview, setShowPreview] = useState(false);
    const [mounted, setMounted] = useState(false);
    const cardRef = useRef<HTMLDivElement>(null);
    const captureRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleCopyText = async () => {
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

    const generateImageBlob = async () => {
        if (!captureRef.current) return null;
        return await toBlob(captureRef.current, {
            quality: 0.95,
            width: 1080,
            height: 1350,
            style: {
                transform: 'none', // Reset any potential transforms
                transformOrigin: 'top left',
            }
        });
    };

    const handlePreview = async () => {
        if (isSharing) return;
        setIsSharing(true);

        try {
            const blob = await generateImageBlob();
            if (!blob) throw new Error('Failed to generate image');

            const url = URL.createObjectURL(blob);
            setPreviewUrl(url);
            setShowPreview(true);
        } catch (err) {
            console.error('Error generating preview:', err);
        } finally {
            setIsSharing(false);
        }
    };

    const closePreview = () => {
        setShowPreview(false);
        if (previewUrl) {
            URL.revokeObjectURL(previewUrl);
            setPreviewUrl(null);
        }
    };

    const handleShareFromPreview = async () => {
        if (!previewUrl) return;

        try {
            const response = await fetch(previewUrl);
            const blob = await response.blob();
            const fileName = verse ? `${verse.book_name} ${verse.chapter}-${verse.verse_number}.png` : 'versiculo-mivn.png';
            const file = new File([blob], fileName, { type: 'image/png' });

            if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
                await navigator.share({
                    files: [file],
                    title: 'Versículo del Día',
                    text: `"${verse?.content}" - ${verse?.book_name} ${verse?.chapter}:${verse?.verse_number}`,
                });
            }
        } catch (err) {
            console.error('Error sharing from preview:', err);
        }
    };

    const handleDownloadFromPreview = async () => {
        if (!previewUrl) return;

        const a = document.createElement('a');
        a.href = previewUrl;
        a.download = verse ? `${verse.book_name} ${verse.chapter}-${verse.verse_number}.png` : 'versiculo-mivn.png';
        a.click();
    };

    const handleShareImage = async () => {
        if (isSharing) return;
        setIsSharing(true);

        try {
            const blob = await generateImageBlob();
            if (!blob) throw new Error('Failed to generate image');

            const fileName = verse ? `${verse.book_name} ${verse.chapter}-${verse.verse_number}.png` : 'versiculo-mivn.png';
            const file = new File([blob], fileName, { type: 'image/png' });

            if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
                await navigator.share({
                    files: [file],
                    title: 'Versículo del Día',
                    text: `"${verse?.content}" - ${verse?.book_name} ${verse?.chapter}:${verse?.verse_number}`,
                });
            } else {
                // Fallback if share not supported
                handleDownloadImage();
            }
        } catch (err) {
            console.error('Error sharing image:', err);
        } finally {
            setIsSharing(false);
        }
    };

    const handleDownloadImage = async () => {
        if (isSharing) return;
        setIsSharing(true);
        try {
            const blob = await generateImageBlob();
            if (!blob) throw new Error('Failed to generate image');

            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = verse ? `${verse.book_name} ${verse.chapter}-${verse.verse_number}.png` : 'versiculo-mivn.png';
            a.click();
            URL.revokeObjectURL(url);
        } catch (err) {
            console.error('Error downloading:', err);
        } finally {
            setIsSharing(false);
        }
    };

    return (
        <>
            {/* UI Card (on screen) */}
            <div className="glass-panel rounded-3xl p-6 md:p-8 relative overflow-hidden group border-gold-500/10 hover:border-gold-500/30 transition-all duration-500 shadow-2xl shadow-black/50 h-full flex flex-col justify-between">
                {/* Capture Area */}
                <div ref={cardRef} className="relative z-10 flex-1 flex flex-col justify-center bg-[#05070a]/0 p-2 md:p-4 -m-2 md:-m-4 rounded-xl">
                    {/* Background Decor only for the capture (can be invisible in UI but visible in capture if needed, 
                        but here we recycle the parent style or rely on bg color set in toBlob) */}
                    <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity pointer-events-none">
                        <Book className="w-32 h-32 text-gold-500 rotate-12" />
                    </div>

                    <div className="relative z-10">
                        <span className="inline-block px-3 py-1 bg-gold-500/10 border border-gold-500/20 rounded-full text-[10px] font-bold text-gold-400 uppercase tracking-widest mb-4 md:mb-6">
                            Versículo del Día
                        </span>
                        <blockquote className="font-libre italic text-xl md:text-3xl text-gray-100 leading-relaxed mb-4 md:mb-6">
                            "{verse?.content || "Lámpara es a mis pies tu palabra, Y lumbrera a mi camino."}"
                        </blockquote>
                        <cite className="not-italic text-gold-500 font-bold tracking-widest uppercase text-xs md:text-sm">
                            — {verse ? `${verse.book_name} ${verse.chapter}:${verse.verse_number}` : 'Salmos 119:105'}
                        </cite>
                    </div>
                </div>

                <div className="relative z-20 mt-6 md:mt-8 pt-6 md:pt-8 border-t border-white/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <Link href={verse ? `/read/${verse?.book_name}/${verse?.chapter}` : '/read'} className="text-xs font-bold text-gray-400 hover:text-gold-400 transition-colors flex items-center gap-2 group/link">
                        SEGUIR LEYENDO <ArrowRight className="w-3 h-3 group-hover/link:translate-x-1 transition-transform" />
                    </Link>

                    <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                        <button
                            onClick={handleCopyText}
                            className="p-2 rounded-full bg-white/5 hover:bg-gold-500/10 text-gray-400 hover:text-gold-400 transition-all"
                            title="Copiar Texto"
                        >
                            {copied ? <Check className="w-4 h-4" /> : <Share2 className="w-4 h-4" />}
                        </button>

                        <button
                            onClick={handleDownloadImage}
                            disabled={isSharing}
                            className="p-2 rounded-full bg-white/5 hover:bg-gold-500/10 text-gray-400 hover:text-gold-400 transition-all"
                            title="Descargar Imagen"
                        >
                            <Download className="w-4 h-4" />
                        </button>

                        <button
                            onClick={handlePreview}
                            disabled={isSharing}
                            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gold-500 hover:bg-gold-400 text-black transition-all text-[10px] font-bold uppercase tracking-widest shadow-lg shadow-gold-900/20 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isSharing ? (
                                <span className="animate-pulse">...</span>
                            ) : (
                                <>
                                    <ImageIcon className="w-3 h-3" /> Crear Imagen
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Preview Modal - Rendered via Portal */}
            {mounted && showPreview && previewUrl && createPortal(
                <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in duration-200">
                    <div className="bg-[#0f141f] border border-white/10 rounded-2xl max-w-lg w-full flex flex-col shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 mx-4">
                        {/* Header */}
                        <div className="p-4 border-b border-white/5 flex items-center justify-between bg-white/5">
                            <span className="text-sm font-bold text-gray-300 uppercase tracking-wider">Vista Previa</span>
                            <button onClick={closePreview} className="text-gray-400 hover:text-white transition-colors">
                                <span className="sr-only">Cerrar</span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                            </button>
                        </div>

                        {/* Image Preview Container */}
                        <div className="p-4 md:p-6 flex items-center justify-center bg-[#05070a] relative">
                            <img src={previewUrl} alt="Preview" className="max-h-[70vh] w-auto rounded-lg shadow-lg" />
                        </div>

                        {/* Actions */}
                        <div className="p-4 border-t border-white/5 flex items-center justify-between gap-3 bg-white/5">
                            <button
                                onClick={handleDownloadFromPreview}
                                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-bold uppercase tracking-widest transition-all"
                            >
                                <Download className="w-4 h-4" /> Descargar
                            </button>
                            <button
                                onClick={handleShareFromPreview}
                                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-gold-500 hover:bg-gold-400 text-black text-xs font-bold uppercase tracking-widest transition-all shadow-lg shadow-gold-500/20"
                            >
                                <Share2 className="w-4 h-4" /> Compartir
                            </button>
                        </div>
                    </div>
                </div>,
                document.body
            )}

            {/* Hidden High-Res Capture Template (Social Media Story Format) */}
            {/* Hidden High-Res Capture Template (Social Media Story Format) */}
            <div style={{ position: 'fixed', top: 0, left: 0, width: 0, height: 0, overflow: 'hidden' }}>
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
                        padding: '80px',
                        fontFamily: 'var(--font-libre-baskerville), serif'
                    }}
                >
                    {/* Decorative Overlay */}
                    <div className="absolute inset-0 bg-[url('/dashboard_background_divine_particles_1768502120581.png')] bg-cover opacity-80 mix-blend-screen" />

                    {/* Golden Glow Center */}
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(234,179,8,0.08),transparent_70%)]" />

                    {/* Content Wrapper */}
                    <div className="relative z-10 flex flex-col items-center text-center">
                        <div className="mb-12">
                            <span className="px-6 py-2 border border-gold-500/30 rounded-full text-xl font-bold text-gold-400 uppercase tracking-[0.3em]">
                                Versículo del Día
                            </span>
                        </div>

                        <blockquote className="text-6xl text-white font-italic leading-tight drop-shadow-2xl max-w-4xl mb-16">
                            "{verse?.content || "Lámpara es a mis pies tu palabra, Y lumbrera a mi camino."}"
                        </blockquote>

                        <cite className="not-italic text-3xl font-bold text-premium-gold tracking-widest uppercase mb-24">
                            — {verse ? `${verse.book_name} ${verse.chapter}:${verse.verse_number}` : 'Salmos 119:105'}
                        </cite>

                        {/* Footer Branding */}
                        <div className="mt-auto flex flex-col items-center gap-6 opacity-90">
                            <div className="w-16 h-1 bg-gold-500/50 rounded-full mb-2" />
                            <div className="flex flex-col items-center gap-2">
                                <p className="text-xl text-gray-300 uppercase tracking-widest font-light">
                                    Ministerio Internacional Vida Nueva
                                </p>
                                <p className="text-sm text-gold-500/70 uppercase tracking-[0.6em]">
                                    Santuario Digital
                                </p>
                            </div>
                            <img
                                src="/logo_mivn.png"
                                alt="MIVN Logo"
                                className="w-52 h-auto mt-6 drop-shadow-[0_0_15px_rgba(234,179,8,0.3)]"
                            />
                        </div>
                    </div>

                    {/* Corner Ornaments */}
                    <div className="absolute top-12 left-12 w-32 h-32 border-l-2 border-t-2 border-gold-500/30 rounded-tl-3xl"></div>
                    <div className="absolute top-12 right-12 w-32 h-32 border-r-2 border-t-2 border-gold-500/30 rounded-tr-3xl"></div>
                    <div className="absolute bottom-12 left-12 w-32 h-32 border-l-2 border-b-2 border-gold-500/30 rounded-bl-3xl"></div>
                    <div className="absolute bottom-12 right-12 w-32 h-32 border-r-2 border-b-2 border-gold-500/30 rounded-br-3xl"></div>
                </div>
            </div>
        </>
    );
}

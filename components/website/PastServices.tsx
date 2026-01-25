"use client";

import { Play, Calendar, Clock, ArrowRight, Bell, Sparkles, Star, ChevronRight, Eye } from "lucide-react";
import type { YouTubeVideo } from "@/lib/youtube";
import { parseDuration } from "@/lib/youtube";
import Link from "next/link";

interface PastServicesProps {
    videos: YouTubeVideo[];
}

export const PastServices = ({ videos }: PastServicesProps) => {
    // Take first 4 videos for the grid
    const displayVideos = videos.slice(0, 4);

    const getVideoCategory = (title: string) => {
        const lowerTitle = title.toLowerCase();
        if (lowerTitle.includes("jóvenes") || lowerTitle.includes("jovenes") || lowerTitle.includes("juventud")) {
            return "JÓVENES";
        }
        if (lowerTitle.includes("oración") || lowerTitle.includes("oracion")) {
            return "ORACIÓN";
        }
        if (lowerTitle.includes("estudio") || lowerTitle.includes("bíblico") || lowerTitle.includes("biblico")) {
            return "ESTUDIO";
        }
        return "DOMINICAL";
    };

    return (
        <section className="bg-background-light dark:bg-background-dark py-24 px-4">
            <div className="max-w-7xl mx-auto space-y-20">

                {/* Section Header */}
                <div className="flex flex-col md:flex-row justify-between items-end gap-8 border-b border-slate-100 dark:border-white/5 pb-10">
                    <div className="space-y-4">
                        <span className="text-mivn-gold font-black uppercase tracking-[0.5em] text-xs">Archivo de Bendición</span>
                        <h2 className="text-4xl md:text-6xl font-playfair font-bold text-slate-800 dark:text-white">Cultos Pasados</h2>
                        <p className="text-xl text-slate-500 dark:text-slate-400 font-light italic">Revive nuestras transmisiones anteriores y sé edificado en cualquier momento.</p>
                    </div>
                    <Link href="/cultos" className="group flex items-center gap-3 text-mivn-blue font-black uppercase tracking-widest text-[10px] hover:text-slate-900 dark:hover:text-white transition-colors">
                        Ver todo el archivo
                        <div className="w-12 h-12 rounded-full border border-mivn-blue/30 flex items-center justify-center group-hover:bg-mivn-blue group-hover:text-white transition-all">
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </div>
                    </Link>
                </div>

                {/* Services Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {displayVideos.length === 0 ? (
                        <div className="col-span-full text-center py-20">
                            <p className="text-slate-400 text-lg italic">No hay videos disponibles en este momento.</p>
                        </div>
                    ) : (
                        displayVideos.map((video) => (
                            <div key={video.videoId} className="group bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[3rem] overflow-hidden shadow-xl hover:shadow-3xl hover:border-mivn-blue/20 transition-all duration-700 hover:-translate-y-4 cursor-pointer">

                                {/* Thumbnail */}
                                <div className="relative aspect-video overflow-hidden">
                                    <img
                                        src={video.thumbnailUrl}
                                        alt={video.title}
                                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

                                    <div className="absolute bottom-4 right-4 px-3 py-1 bg-black/60 backdrop-blur-md text-white text-[9px] font-black font-mono rounded-lg border border-white/10 uppercase tracking-widest">
                                        {parseDuration(video.duration)}
                                    </div>

                                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                        <div className="w-16 h-16 rounded-full bg-mivn-blue text-white flex items-center justify-center shadow-2xl scale-75 group-hover:scale-100 transition-transform">
                                            <Play className="w-6 h-6 fill-current" />
                                        </div>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-8 space-y-6">
                                    <div className="flex items-center justify-between">
                                        <span className="text-[8px] font-black uppercase tracking-[0.3em] px-3 py-1.5 bg-mivn-blue/10 text-mivn-blue rounded-lg">
                                            {getVideoCategory(video.title)}
                                        </span>
                                        <span className="text-[10px] text-slate-400 font-bold tracking-tight italic">
                                            {new Date(video.publishedAt).toLocaleDateString('es-ES', {
                                                day: 'numeric',
                                                month: 'short',
                                                year: 'numeric'
                                            })}
                                        </span>
                                    </div>
                                    <h3 className="text-xl font-playfair font-bold text-slate-800 dark:text-white leading-tight group-hover:text-mivn-blue transition-colors line-clamp-2 min-h-[56px]">
                                        {video.title}
                                    </h3>
                                    <a
                                        href={`https://www.youtube.com/watch?v=${video.videoId}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="block w-full py-4 rounded-2xl border-2 border-mivn-blue/20 text-mivn-blue font-black uppercase tracking-[0.2em] text-[10px] flex items-center justify-center gap-4 hover:bg-mivn-blue hover:text-white hover:border-mivn-blue transition-all group/btn"
                                    >
                                        Ver Mensaje <Eye className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
                                    </a>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Newsletter CTA */}
                <section className="relative mt-32 rounded-[4rem] overflow-hidden group">
                    <div className="absolute inset-0 bg-mivn-blue" />
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(white 1.5px, transparent 1.5px)', backgroundSize: '30px 30px' }} />
                    </div>
                    <div className="absolute top-0 right-0 p-12 opacity-5 -z-0 group-hover:rotate-12 transition-transform duration-1000">
                        <Bell className="w-80 h-80 text-white" />
                    </div>

                    <div className="relative z-10 px-10 md:px-20 py-20 flex flex-col items-center text-center space-y-10">
                        <div className="space-y-4">
                            <h2 className="text-4xl md:text-5xl font-playfair font-bold text-white leading-tight">¡No te pierdas ningún servicio!</h2>
                            <p className="text-white/80 text-lg md:text-xl font-light italic max-w-2xl mx-auto">Regístrate para recibir una notificación especial antes de que iniciemos nuestras transmisiones.</p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 w-full max-w-xl">
                            <input
                                className="flex-1 bg-white/10 backdrop-blur-md border border-white/20 rounded-[2rem] px-10 py-5 text-white placeholder:text-white/40 outline-none focus:bg-white/20 transition-all font-light italic text-lg"
                                placeholder="Tu correo electrónico..."
                                type="email"
                            />
                            <button className="bg-white text-mivn-blue px-10 py-5 rounded-[2rem] font-black uppercase tracking-[0.3em] text-[10px] shadow-2xl hover:scale-105 active:scale-95 transition-all">
                                Activar Alertas
                            </button>
                        </div>
                    </div>
                </section>

            </div>
        </section>
    );
};

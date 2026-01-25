"use client";

import { Clock, Calendar, MapPin, User, Video, Bell, Share2, Play, Eye, Radio } from "lucide-react";
import { useState } from "react";
import type { YouTubeLiveStream, YouTubeVideo } from "@/lib/youtube";
import { parseDuration } from "@/lib/youtube";

interface CultosProps {
    liveStream: YouTubeLiveStream | null;
    videos: YouTubeVideo[];
}

export const Cultos = ({ liveStream, videos }: CultosProps) => {
    const [selectedVideo, setSelectedVideo] = useState<string | null>(liveStream?.videoId || null);
    const [filter, setFilter] = useState<string>("Todos");

    const categories = ["Todos", "Dominical", "Jóvenes", "Oración", "Estudio"];

    // Filter videos based on selected category
    const filteredVideos = videos.filter(video => {
        if (filter === "Todos") return true;

        const title = video.title.toLowerCase();
        const description = video.description.toLowerCase();

        switch (filter) {
            case "Dominical":
                // Show all videos EXCEPT those specifically for Jóvenes, Oración, or Estudio
                const isJovenes = title.includes("jóvenes") || title.includes("jovenes") || title.includes("juventud");
                const isOracion = title.includes("oración") || title.includes("oracion") || title.includes("intercesión");
                const isEstudio = title.includes("estudio") || title.includes("bíblico") || title.includes("biblico");
                return !isJovenes && !isOracion && !isEstudio;
            case "Jóvenes":
                return title.includes("jóvenes") || title.includes("jovenes") || title.includes("juventud") || description.includes("jóvenes");
            case "Oración":
                return title.includes("oración") || title.includes("oracion") || title.includes("intercesión") || description.includes("oración");
            case "Estudio":
                return title.includes("estudio") || title.includes("bíblico") || title.includes("biblico") || description.includes("estudio");
            default:
                return true;
        }
    });

    return (
        <div className="bg-background-light dark:bg-background-dark min-h-screen font-lexend">

            {/* Hero Section */}
            <section className="relative w-full min-h-[400px] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-slate-900 group">
                    <img
                        src="https://images.unsplash.com/photo-1515162305285-0293e4767cc2?auto=format&fit=crop&q=80&w=2000"
                        alt="Cultos Background"
                        className="w-full h-full object-cover opacity-30 group-hover:scale-105 transition-transform duration-1000"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
                </div>

                <div className="relative z-10 max-w-4xl mx-auto px-4 text-center space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">
                    <div className="space-y-4">
                        {liveStream ? (
                            <>
                                <div className="flex items-center justify-center gap-3 mb-4">
                                    <div className="relative flex h-3 w-3">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75" />
                                        <span className="relative inline-flex rounded-full h-3 w-3 bg-red-600" />
                                    </div>
                                    <span className="text-red-500 font-black tracking-[0.5em] text-xs uppercase">EN VIVO AHORA</span>
                                </div>
                                <h1 className="text-4xl md:text-7xl font-playfair font-bold text-white leading-tight">
                                    Transmisión <span className="italic text-mivn-gold">en Vivo</span>
                                </h1>
                            </>
                        ) : (
                            <>
                                <span className="text-mivn-blue font-black tracking-[0.5em] text-[10px] uppercase">Archivo de Mensajes</span>
                                <h1 className="text-4xl md:text-7xl font-playfair font-bold text-white leading-tight">
                                    Cultos <span className="italic text-mivn-gold">Pasados</span>
                                </h1>
                            </>
                        )}
                        <p className="text-white/80 text-lg md:text-xl font-light italic max-w-2xl mx-auto leading-relaxed">
                            {liveStream
                                ? "Únete a nuestra congregación en tiempo real desde cualquier lugar del mundo."
                                : "Revive los momentos de adoración y enseñanza que transforman vidas."
                            }
                        </p>
                    </div>
                </div>
            </section>

            <main className="max-w-7xl mx-auto px-4 py-16 space-y-16">

                {/* Live Stream or Selected Video Player */}
                {(liveStream || selectedVideo) && (
                    <section className="-mt-32 relative z-20">
                        <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[3rem] overflow-hidden shadow-2xl">
                            {/* YouTube Player */}
                            <div className="aspect-video bg-black relative">
                                <iframe
                                    src={`https://www.youtube.com/embed/${selectedVideo || liveStream?.videoId}?autoplay=${liveStream ? 1 : 0}&rel=0`}
                                    title="YouTube video player"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    className="w-full h-full"
                                />
                            </div>

                            {/* Video Info */}
                            <div className="p-8 md:p-12 space-y-6">
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                                    <div className="space-y-2">
                                        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">
                                            {liveStream?.title || videos.find(v => v.videoId === selectedVideo)?.title || "Cargando..."}
                                        </h2>
                                        {liveStream && liveStream.concurrentViewers && (
                                            <div className="flex items-center gap-3 text-red-500">
                                                <Eye className="w-4 h-4" />
                                                <span className="text-sm font-bold">{liveStream.concurrentViewers.toLocaleString()} viendo ahora</span>
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex gap-4">
                                        <button className="px-6 py-3 bg-mivn-blue text-white rounded-xl font-bold text-sm hover:bg-sky-600 transition-all flex items-center gap-2">
                                            <Share2 className="w-4 h-4" /> Compartir
                                        </button>
                                        <button className="px-6 py-3 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-white rounded-xl font-bold text-sm hover:bg-slate-200 dark:hover:bg-slate-700 transition-all flex items-center gap-2">
                                            <Bell className="w-4 h-4" /> Recordar
                                        </button>
                                    </div>
                                </div>
                                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                                    {liveStream?.description || videos.find(v => v.videoId === selectedVideo)?.description || ""}
                                </p>
                            </div>
                        </div>
                    </section>
                )}

                {/* Video Archive */}
                <section className="space-y-12">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                        <div className="space-y-2">
                            <span className="text-mivn-gold font-black uppercase tracking-[0.5em] text-xs">Archivo</span>
                            <h2 className="text-3xl md:text-5xl font-playfair font-bold text-slate-900 dark:text-white">
                                Mensajes <span className="italic text-mivn-blue">Recientes</span>
                            </h2>
                        </div>

                        {/* Category Filters */}
                        <div className="flex flex-wrap gap-3">
                            {categories.map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => setFilter(cat)}
                                    className={`px-5 py-2 rounded-full text-xs font-black uppercase tracking-widest transition-all ${filter === cat
                                        ? "bg-mivn-blue text-white shadow-lg"
                                        : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700"
                                        }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Video Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {filteredVideos.length === 0 ? (
                            <div className="col-span-full py-20 text-center">
                                <Video className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                                <p className="text-slate-400 text-lg">
                                    {videos.length === 0
                                        ? "No hay videos disponibles en este momento."
                                        : `No hay videos en la categoría "${filter}".`
                                    }
                                </p>
                                {videos.length === 0 && (
                                    <p className="text-slate-400 text-sm mt-2">Verifica que las credenciales de YouTube API estén configuradas.</p>
                                )}
                            </div>
                        ) : (
                            filteredVideos.map((video) => (
                                <div
                                    key={video.videoId}
                                    onClick={() => setSelectedVideo(video.videoId)}
                                    className="group bg-white dark:bg-slate-900 rounded-[2rem] overflow-hidden border border-slate-100 dark:border-slate-800 hover:shadow-2xl hover:border-mivn-blue/30 transition-all duration-500 cursor-pointer"
                                >
                                    {/* Thumbnail */}
                                    <div className="aspect-video bg-slate-200 dark:bg-slate-700 relative overflow-hidden">
                                        <img
                                            src={video.thumbnailUrl}
                                            alt={video.title}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                        />
                                        <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/80 text-white text-xs rounded font-bold">
                                            {parseDuration(video.duration)}
                                        </div>
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                            <Play className="w-12 h-12 text-white fill-current" />
                                        </div>
                                    </div>

                                    {/* Video Info */}
                                    <div className="p-6 space-y-3">
                                        <h3 className="font-bold text-base text-slate-900 dark:text-white line-clamp-2 leading-tight group-hover:text-mivn-blue transition-colors">
                                            {video.title}
                                        </h3>
                                        <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                                            <Eye className="w-3 h-3" />
                                            <span>{video.viewCount.toLocaleString()} vistas</span>
                                        </div>
                                        <p className="text-xs text-slate-400 italic">
                                            {new Date(video.publishedAt).toLocaleDateString('es-ES', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric'
                                            })}
                                        </p>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </section>

                {/* CTA Section */}
                <section className="relative overflow-hidden rounded-[4rem] bg-mivn-blue py-20 px-10 md:px-16">
                    <div className="relative z-10 flex flex-col items-center text-center space-y-8 max-w-3xl mx-auto">
                        <h2 className="text-3xl md:text-5xl font-playfair font-bold text-white leading-tight">
                            ¿Quieres recibir <span className="italic text-mivn-gold">notificaciones</span>?
                        </h2>
                        <p className="text-lg text-white/80 font-light italic leading-relaxed">
                            Suscríbete a nuestro canal de YouTube y activa la campanita para no perderte ninguna transmisión en vivo.
                        </p>
                        <a
                            href={`https://www.youtube.com/channel/${process.env.NEXT_PUBLIC_YOUTUBE_CHANNEL_ID}?sub_confirmation=1`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-white text-mivn-blue px-10 py-5 rounded-[2rem] font-black uppercase tracking-[0.3em] text-xs shadow-2xl hover:scale-105 transition-all flex items-center gap-3"
                        >
                            <Radio className="w-5 h-5" /> Suscribirse Ahora
                        </a>
                    </div>
                </section>

            </main>
        </div>
    );
};

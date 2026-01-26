"use client";

import {
    Signal, Radio, CloudOff, Play, Users, Clock, Maximize2,
    Settings, Activity, MessageSquare, Terminal, Eye, Video, Calendar, TrendingUp, ExternalLink
} from "lucide-react";
import type { YouTubeVideo } from "@/lib/youtube";
import { parseDuration } from "@/lib/youtube";
import { useState } from "react";

interface MediaManagerProps {
    videos: YouTubeVideo[];
}

export function MediaManager({ videos }: MediaManagerProps) {
    const [selectedVideo, setSelectedVideo] = useState<YouTubeVideo | null>(videos[0] || null);

    // Calculate stats from videos
    const totalViews = videos.reduce((sum, v) => sum + v.viewCount, 0);
    const avgViews = videos.length > 0 ? Math.floor(totalViews / videos.length) : 0;
    const latestVideo = videos[0];

    return (
        <div className="space-y-8 animate-in fade-in duration-700">
            {/* Page Heading */}
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
                <div className="space-y-2">
                    <h1 className="text-4xl font-playfair font-black text-slate-900 dark:text-white uppercase tracking-tighter">
                        Gestión de <span className="text-mivn-blue italic">Media</span>
                    </h1>
                    <p className="text-slate-500 dark:text-gray-400 font-light italic text-lg leading-relaxed max-w-xl">
                        Administra y visualiza todos los videos del canal de YouTube de MIVN.
                    </p>
                </div>
                <div className="flex gap-4">
                    <a
                        href={`https://studio.youtube.com/channel/${process.env.NEXT_PUBLIC_YOUTUBE_CHANNEL_ID}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-6 py-3 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl text-slate-700 dark:text-white font-black uppercase tracking-widest text-[10px] hover:bg-slate-200 dark:hover:bg-white/10 transition-colors"
                    >
                        <ExternalLink className="w-4 h-4" /> YouTube Studio
                    </a>
                    <a
                        href="/en-vivo"
                        className="flex items-center gap-2 px-8 py-3 bg-mivn-blue text-white rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-2xl shadow-mivn-blue/20 hover:scale-105 transition-all"
                    >
                        <Signal className="w-4 h-4" /> Ver Transmisión
                    </a>
                </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">

                {/* Left Column: Stats & Latest Video */}
                <div className="xl:col-span-2 space-y-8">
                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-white dark:bg-slate-900 rounded-[2rem] p-6 border border-slate-100 dark:border-slate-800 shadow-xl">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 rounded-xl bg-mivn-blue/10 flex items-center justify-center">
                                    <Video className="w-5 h-5 text-mivn-blue" />
                                </div>
                                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Total Videos</p>
                            </div>
                            <p className="text-3xl font-black text-slate-900 dark:text-white">{videos.length}</p>
                        </div>

                        <div className="bg-white dark:bg-slate-900 rounded-[2rem] p-6 border border-slate-100 dark:border-slate-800 shadow-xl">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                                    <Eye className="w-5 h-5 text-emerald-500" />
                                </div>
                                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Total Vistas</p>
                            </div>
                            <p className="text-3xl font-black text-emerald-500">{totalViews.toLocaleString()}</p>
                        </div>

                        <div className="bg-white dark:bg-slate-900 rounded-[2rem] p-6 border border-slate-100 dark:border-slate-800 shadow-xl">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 rounded-xl bg-mivn-gold/10 flex items-center justify-center">
                                    <TrendingUp className="w-5 h-5 text-mivn-gold" />
                                </div>
                                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Promedio Vistas</p>
                            </div>
                            <p className="text-3xl font-black text-mivn-gold">{avgViews.toLocaleString()}</p>
                        </div>
                    </div>

                    {/* Latest Video Preview */}
                    {latestVideo && (
                        <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] overflow-hidden border border-slate-100 dark:border-slate-800 shadow-xl">
                            <div className="p-6 border-b border-slate-100 dark:border-slate-800">
                                <h3 className="text-xl font-playfair font-bold text-slate-900 dark:text-white flex items-center gap-3">
                                    <Calendar className="w-5 h-5 text-mivn-blue" /> Video Más Reciente
                                </h3>
                            </div>
                            <div className="aspect-video bg-black relative">
                                <iframe
                                    src={`https://www.youtube.com/embed/${latestVideo.videoId}?rel=0`}
                                    title="Latest YouTube video"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    className="w-full h-full"
                                />
                            </div>
                            <div className="p-6 space-y-4">
                                <div>
                                    <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{latestVideo.title}</h4>
                                    <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2">{latestVideo.description}</p>
                                </div>
                                <div className="flex items-center gap-6 text-sm text-slate-500">
                                    <span className="flex items-center gap-2">
                                        <Eye className="w-4 h-4" />
                                        {latestVideo.viewCount.toLocaleString()} vistas
                                    </span>
                                    <span className="flex items-center gap-2">
                                        <Clock className="w-4 h-4" />
                                        {parseDuration(latestVideo.duration)}
                                    </span>
                                    <span className="flex items-center gap-2">
                                        <Calendar className="w-4 h-4" />
                                        {new Date(latestVideo.publishedAt).toLocaleDateString('es-ES', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        })}
                                    </span>
                                </div>
                                <a
                                    href={`https://www.youtube.com/watch?v=${latestVideo.videoId}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block w-full py-3 bg-mivn-blue text-white rounded-2xl font-black uppercase tracking-widest text-[10px] text-center hover:scale-105 transition-all"
                                >
                                    Ver en YouTube
                                </a>
                            </div>
                        </div>
                    )}
                </div>

                {/* Right Column: Video List */}
                <div className="space-y-6">
                    <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-6 border border-slate-100 dark:border-slate-800 shadow-xl">
                        <h3 className="text-xl font-playfair font-bold text-slate-900 dark:text-white mb-6">
                            Todos los Videos ({videos.length})
                        </h3>
                        <div className="space-y-4 max-h-[800px] overflow-y-auto pr-2 custom-scrollbar">
                            {videos.length === 0 ? (
                                <div className="text-center py-10">
                                    <Video className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                                    <p className="text-slate-400 text-sm">No hay videos disponibles</p>
                                </div>
                            ) : (
                                videos.map((video) => (
                                    <div
                                        key={video.videoId}
                                        onClick={() => setSelectedVideo(video)}
                                        className={`group cursor-pointer p-4 rounded-2xl border transition-all ${selectedVideo?.videoId === video.videoId
                                                ? 'bg-mivn-blue/10 border-mivn-blue/30'
                                                : 'bg-slate-50 dark:bg-white/5 border-slate-100 dark:border-slate-800 hover:border-mivn-blue/20'
                                            }`}
                                    >
                                        <div className="flex gap-3">
                                            <div className="relative flex-shrink-0 w-24 h-16 rounded-xl overflow-hidden">
                                                <img
                                                    src={video.thumbnailUrl}
                                                    alt={video.title}
                                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                                                />
                                                <div className="absolute bottom-1 right-1 px-1.5 py-0.5 bg-black/80 text-white text-[8px] font-bold rounded">
                                                    {parseDuration(video.duration)}
                                                </div>
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h4 className="text-sm font-bold text-slate-900 dark:text-white line-clamp-2 mb-1">
                                                    {video.title}
                                                </h4>
                                                <div className="flex items-center gap-2 text-[10px] text-slate-500">
                                                    <span className="flex items-center gap-1">
                                                        <Eye className="w-3 h-3" />
                                                        {video.viewCount.toLocaleString()}
                                                    </span>
                                                    <span>•</span>
                                                    <span>
                                                        {new Date(video.publishedAt).toLocaleDateString('es-ES', {
                                                            day: 'numeric',
                                                            month: 'short'
                                                        })}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

"use client";

import {
    Signal, Radio, CloudOff, Play, Users, Clock, Maximize2,
    Settings, Activity, MessageSquare, Terminal, Eye
} from "lucide-react";

export function MediaManager() {
    return (
        <div className="space-y-8 animate-in fade-in duration-700">
            {/* Page Heading */}
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
                <div className="space-y-2">
                    <h1 className="text-4xl font-playfair font-black text-slate-900 dark:text-white uppercase tracking-tighter">
                        Control de <span className="text-mivn-blue italic">Transmisiones</span>
                    </h1>
                    <p className="text-slate-500 dark:text-gray-400 font-light italic text-lg leading-relaxed max-w-xl">
                        Technical control y parámetros de live streaming para MIVN Media.
                    </p>
                </div>
                <div className="flex gap-4">
                    <button className="flex items-center gap-2 px-6 py-3 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl text-slate-700 dark:text-white font-black uppercase tracking-widest text-[10px] hover:bg-slate-200 dark:hover:bg-white/10 transition-colors">
                        <Activity className="w-4 h-4" /> Test Conexión
                    </button>
                    <button className="flex items-center gap-2 px-8 py-3 bg-rose-600 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-2xl shadow-rose-600/20 hover:scale-105 transition-all animate-pulse">
                        <Signal className="w-4 h-4" /> Iniciar Streaming
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">

                {/* Left Column: Configuration */}
                <div className="xl:col-span-2 space-y-8">
                    {/* Credentials */}
                    <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 border border-slate-100 dark:border-slate-800 shadow-xl space-y-6">
                        <h3 className="text-xl font-bold font-playfair text-slate-900 dark:text-white flex items-center gap-3">
                            <Settings className="w-5 h-5 text-mivn-blue" /> Credenciales RTMP
                        </h3>

                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Servidor RTMP (Primary)</label>
                                <div className="relative">
                                    <input
                                        className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl px-6 py-4 transition-all outline-none text-slate-500 font-mono text-sm"
                                        disabled
                                        readOnly
                                        value="rtmp://live.mivn.media/app/stream"
                                    />
                                    <button className="absolute right-4 top-3 p-2 hover:bg-mivn-blue/10 rounded-xl text-mivn-blue transition-colors">
                                        <Activity className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Stream Key</label>
                                <div className="relative">
                                    <input
                                        className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl px-6 py-4 transition-all outline-none text-slate-900 dark:text-white font-mono text-sm tracking-widest"
                                        type="password"
                                        readOnly
                                        value="mivn_secure_key_2026_x99"
                                    />
                                    <button className="absolute right-4 top-3 p-2 hover:bg-mivn-blue/10 rounded-xl text-mivn-blue transition-colors">
                                        <Eye className="w-4 h-4" />
                                    </button>
                                </div>
                                <p className="text-[10px] text-rose-500 font-bold ml-4 flex items-center gap-1">
                                    <CloudOff className="w-3 h-3" /> NO COMPARTIR ESTA CLAVE
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Stats & Controls */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Scheduler */}
                        <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 border border-slate-100 dark:border-slate-800 shadow-xl space-y-6">
                            <div className="flex justify-between items-center">
                                <h3 className="font-playfair font-bold text-slate-900 dark:text-white">Programación</h3>
                                <button className="text-[10px] font-black uppercase tracking-widest text-mivn-blue hover:underline">Gestionar</button>
                            </div>
                            <div className="space-y-3">
                                <div className="flex items-center justify-between p-4 bg-mivn-blue/5 rounded-2xl border border-mivn-blue/10">
                                    <div>
                                        <p className="text-sm font-bold text-slate-900 dark:text-white">Servicio Dominical</p>
                                        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wide">Dom - 10:00 AM</p>
                                    </div>
                                    <span className="px-2 py-1 rounded-lg bg-mivn-blue text-white text-[8px] font-black uppercase tracking-widest">Auto</span>
                                </div>
                                <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-white/5 rounded-2xl opacity-60">
                                    <div>
                                        <p className="text-sm font-bold text-slate-900 dark:text-white">Célula Vida</p>
                                        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wide">Mié - 07:30 PM</p>
                                    </div>
                                    <span className="px-2 py-1 rounded-lg bg-slate-200 dark:bg-white/10 text-slate-500 text-[8px] font-black uppercase tracking-widest">Manual</span>
                                </div>
                            </div>
                        </div>

                        {/* Quick Stats */}
                        <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 border border-slate-100 dark:border-slate-800 shadow-xl space-y-6">
                            <h3 className="font-playfair font-bold text-slate-900 dark:text-white">Estadísticas (Última Sesión)</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-4 bg-emerald-500/5 rounded-2xl border border-emerald-500/10">
                                    <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">Pico Viewers</p>
                                    <p className="text-2xl font-black text-emerald-500">1,248</p>
                                </div>
                                <div className="p-4 bg-mivn-gold/5 rounded-2xl border border-mivn-gold/10">
                                    <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">Duración</p>
                                    <p className="text-2xl font-black text-mivn-gold">01:42</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column: Preview & Logs */}
                <div className="space-y-8">
                    {/* Stream Preview */}
                    <div className="bg-slate-950 rounded-[2.5rem] overflow-hidden shadow-2xl border border-slate-800 group relative">
                        <div className="absolute top-6 left-6 z-10 flex items-center gap-2">
                            <span className="flex h-3 w-3 relative">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-500"></span>
                            </span>
                            <span className="text-[10px] font-black text-white uppercase tracking-widest drop-shadow-md">OFFAIR</span>
                        </div>

                        <div className="w-full aspect-video bg-cover bg-center relative" style={{ backgroundImage: "linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.8)), url('https://images.unsplash.com/photo-1438232992991-995b7058bbb3?auto=format&fit=crop&q=80')" }}>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 group-hover:scale-110 transition-transform cursor-pointer">
                                    <Play className="w-6 h-6 text-white ml-1" />
                                </div>
                            </div>
                            <div className="absolute bottom-0 left-0 right-0 p-6 flex justify-between items-end">
                                <div>
                                    <p className="text-white font-bold text-sm">Main Sanctuary Cam 1</p>
                                    <p className="text-white/60 text-[10px] uppercase tracking-widest font-medium">1080p • 60fps • 6000kbps</p>
                                </div>
                                <button className="p-2 hover:bg-white/10 rounded-xl text-white transition-colors">
                                    <Maximize2 className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Console Log */}
                    <div className="bg-slate-900 rounded-[2.5rem] p-8 border border-slate-800 shadow-xl flex flex-col h-[300px]">
                        <h3 className="text-white font-bold font-mono text-xs flex items-center gap-2 mb-6">
                            <Terminal className="w-4 h-4 text-emerald-500" /> SYSTEM LOG
                        </h3>
                        <div className="flex-1 overflow-y-auto space-y-4 font-mono text-[10px] pr-2 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
                            <div className="flex gap-4 opacity-50">
                                <span className="text-slate-500">10:01:42</span>
                                <span className="text-slate-300">System initialization started...</span>
                            </div>
                            <div className="flex gap-4">
                                <span className="text-emerald-500">10:01:45</span>
                                <span className="text-emerald-400 font-bold">✓ Handshake successful (Primary)</span>
                            </div>
                            <div className="flex gap-4">
                                <span className="text-mivn-blue">10:05:12</span>
                                <span className="text-white">Bitrate adjusted to 4500kbps (Auto)</span>
                            </div>
                            <div className="flex gap-4">
                                <span className="text-rose-500">10:15:24</span>
                                <span className="text-rose-400 font-bold">! Frame drop detected (2.1%)</span>
                            </div>
                            <div className="flex gap-4 opacity-80">
                                <span className="text-slate-400">10:20:00</span>
                                <span className="text-slate-300">Chat filter active: 3 msgs blocked.</span>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

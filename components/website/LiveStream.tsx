"use client";

import { Play, Volume2, Settings, Maximize, MessageSquare, Send, Users, Radio, Calendar, Bell, History, Share2, Heart, ExternalLink, Sparkles as SparklesIcon, Loader2, VideoOff } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { createClient } from "@/lib/supabase/client";
import type { YouTubeLiveStream, YouTubeVideo } from "@/lib/youtube";
import { parseDuration } from "@/lib/youtube";
import type { ServiceSettings } from "@/app/(estudio)/admin/settings/actions";

interface LiveStreamProps {
    liveStream: YouTubeLiveStream | null;
    latestVideo: YouTubeVideo | null;
    serviceSettings: ServiceSettings | null;
}

export const LiveStream = ({ liveStream, latestVideo, serviceSettings }: LiveStreamProps) => {
    const [chatMessage, setChatMessage] = useState("");
    const [messages, setMessages] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSending, setIsSending] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const chatContainerRef = useRef<HTMLDivElement>(null);
    const supabase = createClient();

    const isLive = !!liveStream;
    const displayVideo = liveStream || latestVideo;

    useEffect(() => {
        fetchMessages();

        const channel = supabase
            .channel('chat_general')
            .on(
                'postgres_changes',
                {
                    event: 'INSERT',
                    schema: 'public',
                    table: 'messages',
                },
                async (payload) => {
                    // Fetch profile for the new message
                    const { data: profile } = await supabase
                        .from('profiles')
                        .select('full_name, avatar_url')
                        .eq('id', payload.new.user_id)
                        .single();

                    const newMessage = {
                        ...payload.new,
                        profiles: profile
                    };

                    setMessages((prev) => [...prev, newMessage]);
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, []);

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [messages]);

    const fetchMessages = async () => {
        const { data, error } = await supabase
            .from('messages')
            .select('*, profiles(full_name, avatar_url)')
            .eq('channel', 'general')
            .order('created_at', { ascending: true })
            .limit(50);

        if (!error && data) {
            setMessages(data);
        }
        setIsLoading(false);
    };

    const handleSendMessage = async (e?: React.FormEvent) => {
        e?.preventDefault();
        if (!chatMessage.trim() || isSending) return;

        setIsSending(true);
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
            alert("Debes iniciar sesión para comentar.");
            setIsSending(false);
            return;
        }

        const { error } = await supabase
            .from('messages')
            .insert({
                user_id: user.id,
                content: chatMessage,
                channel: 'general'
            });

        if (error) {
            console.error("Error sending message:", error);
        } else {
            setChatMessage("");
        }
        setIsSending(false);
    };

    const getInitials = (name: string) => {
        return name
            ? name.split(" ").map(n => n[0]).slice(0, 2).join("").toUpperCase()
            : "?";
    };

    return (
        <section className="bg-background-light dark:bg-background-dark py-12 lg:py-24 px-4 overflow-hidden">
            <div className="max-w-7xl mx-auto space-y-12">

                {/* Live Header */}
                <div className="flex flex-col md:flex-row justify-between items-center bg-white dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 p-8 rounded-[2.5rem] shadow-xl gap-8">
                    <div className="flex items-center gap-6">
                        {isLive ? (
                            <div className="relative flex h-4 w-4">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75" />
                                <span className="relative inline-flex rounded-full h-4 w-4 bg-red-600 shadow-[0_0_15px_rgba(239,68,68,0.5)]" />
                            </div>
                        ) : (
                            <div className="w-4 h-4 rounded-full bg-slate-300 dark:bg-slate-700" />
                        )}
                        <div className="space-y-1">
                            <h2 className="text-3xl font-playfair font-bold text-slate-900 dark:text-white">
                                {isLive ? "Transmisión en Vivo" : "No Estamos en Vivo"}
                            </h2>
                            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">
                                {isLive
                                    ? "Servicio en Vivo"
                                    : (serviceSettings?.offline_subtitle || (serviceSettings?.next_service_date
                                        ? `Próximo servicio: ${new Date(serviceSettings.next_service_date).toLocaleDateString('es-ES', { weekday: 'long', hour: 'numeric', minute: '2-digit' })}`
                                        : "Próximo servicio: Domingo 10:00 AM"))
                                }
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        {isLive && liveStream.concurrentViewers ? (
                            <>
                                <div className="flex -space-x-3">
                                    {[1, 2, 3, 4].map(i => (
                                        <div key={i} className="w-10 h-10 rounded-full border-4 border-white dark:border-slate-900 bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-[10px] font-bold overflow-hidden">
                                            <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="User" />
                                        </div>
                                    ))}
                                    <div className="w-10 h-10 rounded-full border-4 border-white dark:border-slate-900 bg-mivn-blue text-white flex items-center justify-center text-[8px] font-black z-10">
                                        +{liveStream.concurrentViewers > 100 ? `${Math.floor(liveStream.concurrentViewers / 100) / 10}k` : liveStream.concurrentViewers}
                                    </div>
                                </div>
                                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Conectados ahora</span>
                            </>
                        ) : (
                            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 bg-slate-100 dark:bg-slate-800 px-6 py-3 rounded-full">
                                Vuelve pronto
                            </span>
                        )}
                    </div>
                </div>

                {/* Main Content Grid */}
                <div className="grid lg:grid-cols-12 gap-8 h-auto">

                    {/* Stage / Player Area */}
                    <div className="lg:col-span-8 flex flex-col gap-6">
                        <div className="relative aspect-video bg-black rounded-[3.5rem] overflow-hidden shadow-2xl border border-white/10 group group/player">
                            {displayVideo ? (
                                <>
                                    {/* YouTube Player */}
                                    <iframe
                                        src={`https://www.youtube.com/embed/${displayVideo.videoId}?autoplay=${isLive ? 1 : 0}&rel=0`}
                                        title="YouTube video player"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                        className="w-full h-full"
                                    />

                                    {/* Player Overlays */}
                                    {isLive && (
                                        <div className="absolute top-8 left-8 flex gap-3 pointer-events-none">
                                            <div className="px-4 py-2 bg-red-600 text-white rounded-xl text-[9px] font-black uppercase tracking-widest flex items-center gap-2 shadow-xl animate-pulse">
                                                <Radio className="w-3 h-3" /> Live
                                            </div>
                                            {liveStream?.concurrentViewers && (
                                                <div className="px-4 py-2 bg-black/40 backdrop-blur-md text-white rounded-xl text-[9px] font-black uppercase tracking-widest flex items-center gap-2 border border-white/10">
                                                    <Users className="w-3 h-3" /> {liveStream.concurrentViewers.toLocaleString()}
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </>
                            ) : (
                                /* No Video Available */
                                <div className="absolute inset-0 bg-slate-900 flex flex-col items-center justify-center gap-6 p-12">
                                    <div className="w-24 h-24 rounded-full bg-white/5 backdrop-blur-md border border-white/20 flex items-center justify-center">
                                        <VideoOff className="w-12 h-12 text-white/40" />
                                    </div>
                                    <div className="text-center space-y-3">
                                        <h3 className="text-2xl font-playfair font-bold text-white">No hay transmisión disponible</h3>
                                        <p className="text-white/60 text-sm max-w-md">
                                            {serviceSettings?.next_service_date
                                                ? `Vuelve el ${new Date(serviceSettings.next_service_date).toLocaleDateString('es-ES', { weekday: 'long', hour: 'numeric', minute: '2-digit' })} para disfrutar de nuestro servicio en vivo.`
                                                : "Vuelve el domingo a las 10:00 AM para disfrutar de nuestro servicio en vivo."
                                            }
                                        </p>
                                    </div>
                                    <button className="px-8 py-4 bg-mivn-blue text-white rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-2xl shadow-mivn-blue/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-3">
                                        <Bell className="w-4 h-4" /> Recordarme
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Stream Info Card */}
                        {displayVideo && (
                            <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-10 rounded-[3rem] shadow-xl flex flex-col md:flex-row justify-between items-center gap-8 relative overflow-hidden group">
                                <div className="absolute -bottom-10 -right-10 opacity-5 group-hover:scale-110 transition-transform">
                                    <SparklesIcon className="w-40 h-40 text-mivn-blue" />
                                </div>
                                <div className="space-y-3 relative z-10 text-center md:text-left flex-1">
                                    <div className="flex items-center justify-center md:justify-start gap-4 flex-wrap">
                                        <span className="bg-mivn-blue text-white text-[8px] font-black uppercase tracking-widest px-3 py-1 rounded-lg">
                                            {isLive ? "En Vivo Ahora" : "Último Mensaje"}
                                        </span>
                                        <span className="text-slate-400 text-[10px] font-black uppercase tracking-widest">
                                            {new Date(displayVideo.publishedAt || displayVideo.scheduledStartTime || Date.now()).toLocaleDateString('es-ES', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric'
                                            })}
                                        </span>
                                    </div>
                                    <h3 className="text-3xl font-playfair font-bold text-slate-900 dark:text-white leading-tight">
                                        {displayVideo.title}
                                    </h3>
                                    <p className="text-slate-500 dark:text-slate-400 font-light italic text-lg line-clamp-2">
                                        {displayVideo.description || (serviceSettings?.next_service_preacher ? `Predicador: ${serviceSettings.next_service_preacher}` : "Predicador: Pastor Principal de MIVN")}
                                    </p>
                                </div>
                                <div className="flex gap-4 relative z-10">
                                    <button className="flex items-center justify-center gap-3 px-8 py-5 bg-mivn-blue text-white rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-2xl shadow-mivn-blue/20 hover:scale-105 active:scale-95 transition-all">
                                        <Bell className="w-4 h-4" /> Recordatorio
                                    </button>
                                    <button className="p-5 bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 rounded-2xl text-slate-400 hover:text-mivn-gold transition-colors">
                                        <Share2 className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Chat Sidebar Area */}
                    <div className="lg:col-span-4 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[3.5rem] overflow-hidden flex flex-col h-[600px] lg:h-auto shadow-2xl">
                        <div className="p-8 border-b border-slate-50 dark:border-white/5 flex items-center justify-between bg-gradient-to-r from-mivn-blue/5 to-transparent">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-2xl bg-mivn-blue/10 flex items-center justify-center text-mivn-blue">
                                    <MessageSquare className="w-5 h-5" />
                                </div>
                                <span className="font-black text-slate-800 dark:text-white uppercase tracking-widest text-xs">Chat de Bendición</span>
                            </div>
                            {isLive ? (
                                <span className="text-[10px] font-black text-emerald-500 bg-emerald-500/10 px-4 py-1.5 rounded-full uppercase tracking-widest">En Vivo</span>
                            ) : (
                                <span className="text-[10px] font-black text-slate-400 bg-slate-100 dark:bg-slate-800 px-4 py-1.5 rounded-full uppercase tracking-widest">Offline</span>
                            )}
                        </div>

                        {/* Chat Messages */}
                        <div ref={chatContainerRef} className="flex-1 p-6 space-y-4 overflow-y-auto custom-scrollbar bg-slate-50/30 dark:bg-slate-950/30">
                            {isLoading ? (
                                <div className="flex flex-col items-center justify-center h-full gap-4 text-slate-400 italic text-xs">
                                    <Loader2 className="w-6 h-6 animate-spin text-mivn-blue" />
                                    Cargando bendiciones...
                                </div>
                            ) : messages.length === 0 ? (
                                <div className="text-center text-slate-400 italic text-xs py-10">Sé el primero en enviar una bendición.</div>
                            ) : (
                                messages.map((m, i) => (
                                    <div key={m.id || i} className="flex gap-3 group animate-in fade-in slide-in-from-bottom-2 duration-300">
                                        {/* Profile Picture */}
                                        <div className="flex-shrink-0">
                                            {m.profiles?.avatar_url ? (
                                                <img
                                                    src={m.profiles.avatar_url}
                                                    alt={m.profiles?.full_name || "Usuario"}
                                                    className="w-10 h-10 rounded-full object-cover border-2 border-white dark:border-slate-800 shadow-md"
                                                />
                                            ) : (
                                                <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs bg-gradient-to-br from-mivn-blue to-mivn-gold text-white border-2 border-white dark:border-slate-800 shadow-md">
                                                    {getInitials(m.profiles?.full_name)}
                                                </div>
                                            )}
                                        </div>

                                        {/* Message Bubble */}
                                        <div className="flex-1 max-w-[75%]">
                                            <div className="bg-white dark:bg-slate-800 rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm border border-slate-100 dark:border-slate-700 group-hover:shadow-md transition-shadow">
                                                <p className="text-[10px] font-bold text-mivn-blue mb-1">
                                                    {m.profiles?.full_name || "MIVN Miembro"}
                                                </p>
                                                <p className="text-sm text-slate-700 dark:text-gray-300 leading-relaxed break-words">
                                                    {m.content}
                                                </p>
                                                <p className="text-[9px] text-slate-400 mt-1.5 text-right">
                                                    {new Date(m.created_at).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Chat Input */}
                        <div className="p-6 border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900">
                            <form onSubmit={handleSendMessage} className="relative">
                                <input
                                    type="text"
                                    placeholder="Escribe una bendición..."
                                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full px-6 py-4 pr-14 text-sm text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-mivn-blue/50 transition-all placeholder:text-slate-400"
                                    value={chatMessage}
                                    onChange={(e) => setChatMessage(e.target.value)}
                                    disabled={isSending}
                                />
                                <button
                                    type="submit"
                                    disabled={!chatMessage.trim() || isSending}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-mivn-blue text-white rounded-full flex items-center justify-center hover:scale-110 active:scale-95 transition-all shadow-lg shadow-mivn-blue/30 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isSending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

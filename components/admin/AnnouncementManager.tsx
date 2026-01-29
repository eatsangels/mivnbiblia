"use client";

import {
    Megaphone, Edit3,
    Smartphone, Search, History, Clock, FileText, SendHorizontal
} from "lucide-react";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

export function AnnouncementManager() {
    const supabase = createClient();
    const [announcements, setAnnouncements] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [showPreview, setShowPreview] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [filter, setFilter] = useState<'recent' | 'scheduled'>('recent');
    const [isMounted, setIsMounted] = useState(false);
    const [formData, setFormData] = useState({
        message: "",
        target_audience: "Todos los miembros",
        scheduled_for: "",
        is_notified: true,
        is_pinned: false,
        expires_at: ""
    });

    useEffect(() => {
        setIsMounted(true);
        fetchAnnouncements();
    }, []);

    const fetchAnnouncements = async () => {
        const { data, error } = await (supabase as any)
            .from('announcements')
            .select('*, created_by_profile:profiles(full_name, avatar_url)')
            // Removed is_pinned sorting to strictly show newest first as requested
            .order('created_at', { ascending: false });

        if (data) setAnnouncements(data);
        setLoading(false);
    };

    const handleDelete = async (id: string) => {
        if (!confirm("¿Estás seguro de que quieres eliminar este anuncio?")) return;

        const { error } = await (supabase as any)
            .from('announcements')
            .delete()
            .eq('id', id);

        if (error) {
            alert(`Error al eliminar: ${error.message}`);
            console.error("Error deleting:", error);
        } else {
            fetchAnnouncements();
        }
    };

    const handleEdit = (ann: any) => {
        try {
            setEditingId(ann.id);

            // Helper to format date for datetime-local (YYYY-MM-DDThh:mm)
            const formatDate = (dateString: string | null) => {
                if (!dateString) return "";
                const date = new Date(dateString);
                if (isNaN(date.getTime())) return ""; // Handle invalid date
                // Adjust to get local time string in ISO format
                const offset = date.getTimezoneOffset() * 60000;
                return new Date(date.getTime() - offset).toISOString().slice(0, 16);
            };

            setFormData({
                message: ann.message,
                target_audience: ann.target_audience,
                scheduled_for: formatDate(ann.scheduled_for),
                is_notified: ann.is_notified,
                is_pinned: ann.is_pinned,
                expires_at: formatDate(ann.expires_at)
            });
            document.getElementById('create-form')?.scrollIntoView({ behavior: 'smooth' });
        } catch (err) {
            console.error("Error preparing edit form:", err);
            alert("Hubo un error al cargar los datos para editar.");
        }
    };

    const handleCancelEdit = () => {
        setEditingId(null);
        setFormData({
            message: "",
            target_audience: "Todos los miembros",
            scheduled_for: "",
            is_notified: true,
            is_pinned: false,
            expires_at: ""
        });
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
            alert("No estás autenticado.");
            return;
        }

        try {
            if (editingId) {
                // Update existing
                const { error } = await (supabase as any).from('announcements')
                    .update({
                        message: formData.message,
                        target_audience: formData.target_audience,
                        scheduled_for: formData.scheduled_for || null,
                        is_notified: formData.is_notified,
                        is_pinned: formData.is_pinned,
                        expires_at: formData.expires_at || null
                    } as any)
                    .eq('id', editingId);

                if (error) throw error;

                alert("Anuncio actualizado correctamente.");
                handleCancelEdit(); // Resets form and editingId
                fetchAnnouncements();
            } else {
                // Create new
                const { error } = await (supabase as any).from('announcements').insert([{
                    message: formData.message,
                    target_audience: formData.target_audience,
                    scheduled_for: formData.scheduled_for || null,
                    is_notified: formData.is_notified,
                    is_pinned: formData.is_pinned,
                    expires_at: formData.expires_at || null,
                    created_by: user.id
                } as any]);

                if (error) throw error;

                alert("Anuncio creado correctamente.");
                setFormData({ message: "", target_audience: "Todos los miembros", scheduled_for: "", is_notified: true, is_pinned: false, expires_at: "" });
                fetchAnnouncements();
            }
        } catch (error: any) {
            console.error("Error details:", error);
            alert(`Error: ${error.message || 'Ocurrió un error inesperado.'}`);
        }
    };

    return (
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-8 duration-700">

            {/* Nav (Contextual for this page) */}
            <div className="flex flex-col md:flex-row justify-between items-end gap-6 border-b border-slate-200 dark:border-white/10 pb-8">
                <div className="space-y-2">
                    <h2 className="text-4xl font-playfair font-black text-slate-900 dark:text-white uppercase tracking-tighter">
                        Gestión de <span className="text-mivn-blue italic">Anuncios</span>
                    </h2>
                    <p className="text-slate-500 dark:text-gray-400 font-light italic text-lg leading-relaxed max-w-2xl">
                        Comuníquese con la congregación a través de mensajes directos, notificaciones push y anuncios fijados.
                    </p>
                </div>
                <button
                    onClick={() => document.getElementById('create-form')?.scrollIntoView({ behavior: 'smooth' })}
                    className="flex items-center gap-3 bg-mivn-blue text-white px-8 py-4 rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] shadow-2xl shadow-mivn-blue/20 hover:scale-105 transition-all"
                >
                    <AddIcon /> Crear Nuevo Anuncio
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

                {/* Announcements Feed */}
                <div className="lg:col-span-7 space-y-8">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-bold text-slate-800 dark:text-white uppercase tracking-tight flex items-center gap-3">
                            <History className="w-5 h-5 text-mivn-blue" /> Feed de Anuncios
                        </h3>
                        <div className="flex gap-2">
                            <button
                                onClick={() => setFilter('recent')}
                                className={`px-5 py-2 text-[10px] font-black uppercase tracking-widest rounded-full transition-all ${filter === 'recent'
                                    ? 'bg-mivn-blue text-white shadow-lg shadow-mivn-blue/20'
                                    : 'bg-slate-100 dark:bg-white/5 text-slate-400 hover:text-slate-600'
                                    }`}
                            >
                                Recientes
                            </button>
                            <button
                                onClick={() => setFilter('scheduled')}
                                className={`px-5 py-2 text-[10px] font-black uppercase tracking-widest rounded-full transition-all ${filter === 'scheduled'
                                    ? 'bg-mivn-blue text-white shadow-lg shadow-mivn-blue/20'
                                    : 'bg-slate-100 dark:bg-white/5 text-slate-400 hover:text-slate-600'
                                    }`}
                            >
                                Programados
                            </button>
                        </div>
                    </div>

                    {loading ? (
                        <div className="py-20 text-center text-slate-400 italic">Cargando anuncios...</div>
                    ) : announcements.filter(ann => {
                        if (!isMounted) return false;
                        const isScheduled = ann.scheduled_for && new Date(ann.scheduled_for) > new Date();
                        return filter === 'scheduled' ? isScheduled : !isScheduled;
                    }).length === 0 ? (
                        <div className="py-20 text-center bg-white dark:bg-slate-900 rounded-[3rem] border border-slate-100 dark:border-slate-800 border-dashed">
                            <Megaphone className="w-12 h-12 text-slate-200 mx-auto mb-4" />
                            <p className="text-slate-400 italic">
                                {filter === 'recent' ? "No hay anuncios publicados todavía." : "No hay anuncios programados."}
                            </p>
                        </div>
                    ) : (
                        announcements
                            .filter(ann => {
                                if (!isMounted) return false;
                                const isScheduled = ann.scheduled_for && new Date(ann.scheduled_for) > new Date();
                                return filter === 'scheduled' ? isScheduled : !isScheduled;
                            })
                            .map((ann, i) => (
                                <div key={ann.id} className="bg-white dark:bg-slate-900 p-8 md:p-10 rounded-[3rem] shadow-2xl border border-slate-100 dark:border-slate-800 relative group transition-all hover:border-mivn-blue/20">
                                    {ann.is_pinned && (
                                        <div className="absolute top-8 right-10 flex items-center gap-2">
                                            <PushPinIcon className="w-4 h-4 text-mivn-gold" />
                                            <span className="text-[9px] uppercase tracking-[0.2em] font-black text-mivn-gold">Fijado</span>
                                        </div>
                                    )}
                                    <div className="flex gap-6">
                                        <div className="flex-shrink-0">
                                            <div className="w-16 h-16 bg-gradient-to-br from-mivn-blue to-mivn-blue/80 rounded-[1.5rem] flex items-center justify-center text-white font-black text-2xl shadow-xl shadow-mivn-blue/20">
                                                M
                                            </div>
                                        </div>
                                        <div className="flex-grow space-y-4">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <h4 className="font-black text-slate-900 dark:text-white uppercase tracking-tight">Anuncio Ministerio</h4>
                                                    <div className="flex items-center gap-3 mt-1 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                                                        <span suppressHydrationWarning>{isMounted ? new Date(ann.created_at).toLocaleDateString() : "..."}</span>
                                                        {ann.scheduled_for && (
                                                            <>
                                                                <span className="w-1 h-1 bg-slate-200 rounded-full"></span>
                                                                <span className="flex items-center gap-1 text-amber-500" suppressHydrationWarning>
                                                                    <Clock className="w-3 h-3" /> Programado: {isMounted ? new Date(ann.scheduled_for).toLocaleString() : "..."}
                                                                </span>
                                                            </>
                                                        )}
                                                        <span className="w-1 h-1 bg-slate-200 rounded-full"></span>
                                                        {ann.is_notified && (
                                                            <span className="flex items-center gap-1 text-mivn-blue">
                                                                <NotificationsActiveIcon /> Push Enviada
                                                            </span>
                                                        )}
                                                        {ann.expires_at && (
                                                            <>
                                                                <span className="w-1 h-1 bg-slate-200 rounded-full"></span>
                                                                <span className="flex items-center gap-1 text-rose-500" suppressHydrationWarning>
                                                                    <Clock className="w-3 h-3" /> Expira: {isMounted ? new Date(ann.expires_at).toLocaleDateString() : "..."}
                                                                </span>
                                                            </>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-all">
                                                    <button
                                                        onClick={() => handleEdit(ann)}
                                                        className="p-3 bg-slate-50 dark:bg-white/5 text-slate-400 hover:text-mivn-blue rounded-xl transition-all shadow-sm"
                                                    >
                                                        <Edit3Icon />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(ann.id)}
                                                        className="p-3 bg-slate-50 dark:bg-white/5 text-slate-400 hover:text-rose-500 rounded-xl transition-all shadow-sm"
                                                    >
                                                        <DeleteIcon />
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="bg-slate-50/50 dark:bg-white/[0.02] p-6 md:p-8 rounded-[2rem] rounded-tl-none border border-slate-100 dark:border-white/5 shadow-inner relative">
                                                <p className="text-slate-700 dark:text-slate-300 leading-relaxed italic text-lg font-medium">
                                                    "{ann.message}"
                                                </p>
                                            </div>
                                            <div className="flex items-center gap-6 pt-2">
                                                <span className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400">
                                                    <UsersIcon /> {ann.target_audience}
                                                </span>
                                                <span className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400">
                                                    <EyeIcon /> {ann.views_count} Vistas
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                    )}
                </div>

                {/* Create Form Sidebar */}
                <div className="lg:col-span-5" id="create-form">
                    <div className="bg-white dark:bg-slate-900 p-10 md:p-12 rounded-[3.5rem] shadow-2xl border border-slate-100 dark:border-slate-800 sticky top-32 space-y-10 group">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <CampaignIcon className="w-6 h-6 text-mivn-blue" />
                                <h2 className="text-2xl font-playfair font-bold text-slate-900 dark:text-white uppercase tracking-tight">
                                    {editingId ? "Editar Anuncio" : "Crear Anuncio"}
                                </h2>
                            </div>
                            {editingId && (
                                <button
                                    onClick={handleCancelEdit}
                                    className="text-rose-500 text-[10px] font-black uppercase tracking-widest hover:underline"
                                >
                                    Cancelar Edición
                                </button>
                            )}
                            {!editingId && (
                                <button
                                    onClick={() => setShowPreview(true)}
                                    className="text-mivn-blue flex items-center gap-2 text-[10px] font-black uppercase tracking-widest hover:underline"
                                >
                                    <SmartphoneIcon /> Vista previa
                                </button>
                            )}
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-8">
                            <div className="space-y-3">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Mensaje del Anuncio</label>
                                <textarea
                                    required
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-[2rem] p-8 focus:border-mivn-blue transition-all outline-none text-slate-800 dark:text-white font-medium placeholder:text-slate-400 italic"
                                    placeholder="Escribe el mensaje aquí..."
                                    rows={5}
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Dirigido a</label>
                                    <select
                                        value={formData.target_audience}
                                        onChange={(e) => setFormData({ ...formData, target_audience: e.target.value })}
                                        className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl px-6 py-4 focus:border-mivn-blue transition-all outline-none text-slate-800 dark:text-white font-bold text-xs uppercase tracking-widest appearance-none cursor-pointer"
                                    >
                                        <option>Todos los miembros</option>
                                        <option>Jóvenes</option>
                                        <option>Líderes de Ministerio</option>
                                        <option>Personal Administrativo</option>
                                    </select>
                                </div>
                                <input
                                    type="datetime-local"
                                    value={formData.scheduled_for}
                                    onChange={(e) => setFormData({ ...formData, scheduled_for: e.target.value })}
                                    className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl px-6 py-4 focus:border-mivn-blue transition-all outline-none text-slate-800 dark:text-white font-bold text-xs uppercase tracking-widest"
                                />
                            </div>


                            <div className="space-y-3">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Mostrar hasta (Opcional)</label>
                                <input
                                    type="datetime-local"
                                    value={formData.expires_at}
                                    onChange={(e) => setFormData({ ...formData, expires_at: e.target.value })}
                                    className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl px-6 py-4 focus:border-mivn-blue transition-all outline-none text-slate-800 dark:text-white font-bold text-xs uppercase tracking-widest"
                                />
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-center justify-between p-6 bg-slate-50/50 dark:bg-white/[0.02] rounded-3xl border border-slate-100 dark:border-white/5">
                                    <div className="flex items-center gap-3">
                                        <NotificationsActiveIcon className="w-5 h-5 text-slate-400" />
                                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-600 dark:text-slate-300">Notificación Push</span>
                                    </div>
                                    <input
                                        type="checkbox"
                                        checked={formData.is_notified}
                                        onChange={(e) => setFormData({ ...formData, is_notified: e.target.checked })}
                                        className="w-10 h-5 bg-slate-200 rounded-full appearance-none checked:bg-mivn-blue transition-all cursor-pointer relative after:content-[''] after:absolute after:top-1 after:left-1 after:w-3 after:h-3 after:bg-white after:rounded-full checked:after:translate-x-5 after:transition-all"
                                    />
                                </div>
                                <div className="flex items-center justify-between p-6 bg-slate-50/50 dark:bg-white/[0.02] rounded-3xl border border-slate-100 dark:border-white/5">
                                    <div className="flex items-center gap-3">
                                        <PushPinIcon className="w-5 h-5 text-slate-400" />
                                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-600 dark:text-slate-300">Anclar al inicio</span>
                                    </div>
                                    <input
                                        type="checkbox"
                                        checked={formData.is_pinned}
                                        onChange={(e) => setFormData({ ...formData, is_pinned: e.target.checked })}
                                        className="w-10 h-5 bg-slate-200 rounded-full appearance-none checked:bg-mivn-gold transition-all cursor-pointer relative after:content-[''] after:absolute after:top-1 after:left-1 after:w-3 after:h-3 after:bg-white after:rounded-full checked:after:translate-x-5 after:transition-all"
                                    />
                                </div>
                            </div>


                            <div className="pt-4 space-y-4">
                                <button type="submit" className="w-full bg-mivn-blue text-white font-black uppercase tracking-[0.2em] text-xs py-5 rounded-[1.5rem] shadow-2xl shadow-mivn-blue/30 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-4">
                                    <SendHorizontal className="w-5 h-5" /> {editingId ? "Actualizar Anuncio" : "Publicar y Notificar"}
                                </button>
                                {!editingId && (
                                    <button type="button" className="w-full text-slate-400 font-black uppercase tracking-widest text-[10px] py-2 hover:text-slate-600 transition-colors">
                                        Guardar como Borrador
                                    </button>
                                )}
                            </div>
                        </form>
                    </div>
                </div >
            </div >

            {/* Mobile Preview Modal */}
            {
                showPreview && (
                    <div className="fixed inset-0 z-[100] bg-slate-900/90 backdrop-blur-xl flex items-center justify-center p-6 animate-in fade-in duration-300">
                        <div className="relative max-w-sm w-full animate-in zoom-in duration-500">
                            <button
                                onClick={() => setShowPreview(false)}
                                className="absolute -top-16 right-0 text-white flex items-center gap-2 text-sm font-black uppercase tracking-widest hover:text-rose-400 transition-colors"
                            >
                                <CloseIcon /> Cerrar
                            </button>
                            <div className="bg-slate-800 rounded-[4rem] p-4 border-8 border-slate-700 shadow-[0_0_100px_rgba(0,0,0,0.5)] overflow-hidden aspect-[9/19]">
                                <div className="bg-black w-full h-full rounded-[3rem] relative overflow-hidden flex flex-col items-center pt-14 px-5">
                                    <div className="absolute top-0 w-full px-10 py-5 flex justify-between items-center text-[11px] text-white/50 font-bold">
                                        <span>9:41</span>
                                        <div className="flex gap-1.5 items-center">
                                            <div className="w-4 h-2.5 bg-white/20 rounded-sm"></div>
                                            <div className="w-4 h-2.5 bg-white/20 rounded-sm"></div>
                                            <div className="w-6 h-3 bg-white/40 rounded-md"></div>
                                        </div>
                                    </div>

                                    {/* Notification Card */}
                                    <div className="w-full bg-white/10 backdrop-blur-3xl rounded-[2rem] p-6 mt-10 border border-white/20 shadow-2xl animate-in fade-in slide-in-from-top-4 duration-1000">
                                        <div className="flex items-center gap-3 mb-3">
                                            <div className="w-6 h-6 bg-mivn-blue rounded-lg flex items-center justify-center text-[10px] text-white font-black shadow-lg">M</div>
                                            <span className="text-[10px] font-black text-white/90 uppercase tracking-[0.1em]">MIVN VIDA NUEVA</span>
                                            <span className="text-[9px] text-white/40 font-bold ml-auto uppercase">Ahora</span>
                                        </div>
                                        <h4 className="text-white font-black text-sm uppercase tracking-tight">Anuncio Ministerio</h4>
                                        <p className="text-white/80 text-xs mt-1.5 font-medium leading-relaxed italic line-clamp-4 leading-relaxed">
                                            {formData.message || "Escribe un mensaje para ver la previsualización aquí..."}
                                        </p>
                                    </div>

                                    <div className="mt-auto mb-10 w-full flex justify-between px-6">
                                        <div className="w-14 h-14 bg-white/10 rounded-full flex items-center justify-center text-white backdrop-blur-2xl border border-white/10">
                                            <History className="w-6 h-6" />
                                        </div>
                                        <div className="w-14 h-14 bg-white/10 rounded-full flex items-center justify-center text-white backdrop-blur-2xl border border-white/10">
                                            <CameraIcon />
                                        </div>
                                    </div>
                                    <div className="absolute bottom-3 w-32 h-1.5 bg-white/20 rounded-full"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        </div >
    );
}

// Custom simple icons for pixel-perfect match
function AddIcon() { return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>; }
function PushPinIcon({ className }: { className?: string }) { return <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L12 12"></path><path d="M15 11l-3 3-3-3"></path><path d="M12 22v-8"></path></svg>; }
function NotificationsActiveIcon({ className }: { className?: string }) { return <svg className={className} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path><path d="M22 8h-2"></path><path d="M4 8H2"></path></svg>; }
function Edit3Icon() { return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>; }
function DeleteIcon() { return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>; }
function UsersIcon() { return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>; }
function EyeIcon() { return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>; }
function CampaignIcon({ className }: { className?: string }) { return <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 10V4"></path><path d="M2 13h4"></path><path d="M22 13h-4"></path><path d="M18 6.5l3.5 3.5"></path><path d="M6.5 6.5L3 10"></path><path d="M12 2v8"></path><path d="M12 10s4-2 4 4v6H8v-6c0-6 4-4 4-4z"></path></svg>; }
function SmartphoneIcon() { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line></svg>; }
function CloseIcon() { return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>; }
function CameraIcon() { return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path><circle cx="12" cy="13" r="4"></circle></svg>; }

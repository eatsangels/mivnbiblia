"use client";

import {
    MessageSquareQuote, CheckCircle2, XCircle, Edit, Download, RefreshCw,
    Paperclip, FileText, ChevronLeft, ChevronRight, Play, Eye, Loader2
} from "lucide-react";
import { useState } from "react";
import { approveTestimony, rejectTestimony } from "@/app/(estudio)/admin/testimonials/actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface Testimony {
    id: string;
    created_at: string | null;
    full_name: string;
    category: string | null;
    content: string;
    avatar_url: string | null;
    featured: boolean | null;
    is_approved: boolean | null;
    user_id: string | null;
    image_url?: string | null; // Checking if this exists in DB or if it's avatar_url
}

interface TestimonialManagerProps {
    initialTestimonies: any[]; // Using any[] temporarily if strict typing fails, or Testimony[]
}

export function TestimonialManager({ initialTestimonies = [] }: TestimonialManagerProps) {
    const [testimonies, setTestimonies] = useState<Testimony[]>(initialTestimonies);
    const [activeTab, setActiveTab] = useState<'pending' | 'approved' | 'archived'>('pending');
    const [loading, setLoading] = useState<string | null>(null);
    const router = useRouter();

    const pendingCount = testimonies.filter(t => !t.is_approved).length;
    const approvedCount = testimonies.filter(t => t.is_approved).length;

    const filteredTestimonies = testimonies.filter(t => {
        if (activeTab === 'pending') return !t.is_approved;
        if (activeTab === 'approved') return t.is_approved;
        return false; // Archived logic TBD
    });

    const handleApprove = async (id: string) => {
        setLoading(id);
        try {
            await approveTestimony(id);
            setTestimonies(prev => prev.map(t => t.id === id ? { ...t, is_approved: true } : t));
            toast.success("Testimonio aprobado correctamente");
            router.refresh();
        } catch (error) {
            toast.error("Error al aprobar el testimonio");
        } finally {
            setLoading(null);
        }
    };

    const handleReject = async (id: string) => {
        if (!confirm("¿Estás seguro de rechazar este testimonio? Se eliminará permanentemente.")) return;
        setLoading(id);
        try {
            await rejectTestimony(id);
            setTestimonies(prev => prev.filter(t => t.id !== id));
            toast.success("Testimonio rechazado/eliminado");
            router.refresh();
        } catch (error) {
            toast.error("Error al rechazar el testimonio");
        } finally {
            setLoading(null);
        }
    };
    return (
        <div className="space-y-8 animate-in fade-in duration-700">
            {/* Page Heading */}
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
                <div className="space-y-2">
                    <h1 className="text-4xl font-playfair font-black text-slate-900 dark:text-white uppercase tracking-tighter">
                        Aprobación de <span className="text-mivn-blue italic">Testimonios</span>
                    </h1>
                    <p className="text-slate-500 dark:text-gray-400 font-light italic text-lg leading-relaxed max-w-xl">
                        Gestiona y modera las historias de fe de la comunidad para ser publicadas en el muro principal.
                    </p>
                </div>
                <div className="flex gap-4">
                    <button className="flex items-center gap-2 px-6 py-3 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl text-slate-700 dark:text-white font-black uppercase tracking-widest text-[10px] hover:bg-slate-200 dark:hover:bg-white/10 transition-colors">
                        <RefreshCw className="w-4 h-4" /> Actualizar
                    </button>
                    <button className="flex items-center gap-2 px-6 py-3 bg-mivn-blue text-white rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-2xl shadow-mivn-blue/20 hover:scale-105 transition-all">
                        <Download className="w-4 h-4" /> Exportar
                    </button>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-8 border-b border-slate-200 dark:border-slate-800 pb-px">
                <button
                    onClick={() => setActiveTab('pending')}
                    className={`flex items-center gap-2 border-b-2 pb-4 px-2 transition-colors ${activeTab === 'pending' ? 'border-mivn-blue text-mivn-blue' : 'border-transparent text-slate-500 hover:text-slate-700 dark:text-slate-400 hover:border-slate-300'}`}
                >
                    <span className="text-sm font-bold">Pendientes</span>
                    <span className="bg-mivn-blue/10 text-mivn-blue text-[10px] font-black px-2 py-0.5 rounded-lg">{pendingCount}</span>
                </button>
                <button
                    onClick={() => setActiveTab('approved')}
                    className={`flex items-center gap-2 border-b-2 pb-4 px-2 transition-colors ${activeTab === 'approved' ? 'border-mivn-blue text-mivn-blue' : 'border-transparent text-slate-500 hover:text-slate-700 dark:text-slate-400 hover:border-slate-300'}`}
                >
                    <span className="text-sm font-bold">Aprobados</span>
                    <span className="bg-slate-100 dark:bg-white/10 text-slate-500 text-[10px] font-black px-2 py-0.5 rounded-lg">{approvedCount}</span>
                </button>
                {/* Archived tab hidden for now or implemented later */}
            </div>

            {/* Testimonial Cards */}
            <div className="space-y-6">
                {filteredTestimonies.length === 0 ? (
                    <div className="text-center py-20 bg-slate-50 dark:bg-white/5 rounded-[2.5rem] border border-dashed border-slate-200 dark:border-slate-800">
                        <p className="text-slate-400 font-medium">No hay testimonios en esta sección.</p>
                    </div>
                ) : (
                    filteredTestimonies.map((testimony) => (
                        <div key={testimony.id} className="group bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[2.5rem] overflow-hidden shadow-xl hover:shadow-2xl transition-all flex flex-col xl:flex-row">
                            <div className="w-full xl:w-72 shrink-0 relative overflow-hidden h-56 xl:h-auto bg-slate-100 dark:bg-slate-800">
                                {testimony.avatar_url ? (
                                    <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" style={{ backgroundImage: `url('${testimony.avatar_url}')` }}></div>
                                ) : (
                                    <div className="absolute inset-0 flex items-center justify-center text-slate-300">
                                        <div className="text-6xl font-black opacity-20">{testimony.full_name?.[0]}</div>
                                    </div>
                                )}
                                <div className="absolute top-4 left-4">
                                    <span className={`backdrop-blur-sm text-white text-[9px] font-black px-3 py-1.5 rounded-lg uppercase tracking-widest shadow-lg ${!testimony.is_approved ? 'bg-emerald-500/90' : 'bg-mivn-blue/90'}`}>
                                        {!testimony.is_approved ? 'Nuevo' : 'Publicado'}
                                    </span>
                                </div>
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent xl:hidden"></div>
                            </div>

                            <div className="flex-1 p-8 flex flex-col justify-between">
                                <div className="space-y-6">
                                    <div className="flex flex-wrap items-center justify-between gap-4">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-white/10 flex items-center justify-center border-2 border-white dark:border-slate-700 shadow-lg overflow-hidden">
                                                {testimony.avatar_url ? (
                                                    <img src={testimony.avatar_url} alt={testimony.full_name} className="w-full h-full object-cover" />
                                                ) : (
                                                    <span className="text-lg font-black text-slate-400">{testimony.full_name?.[0]}</span>
                                                )}
                                            </div>
                                            <div>
                                                <h3 className="text-lg font-playfair font-black text-slate-900 dark:text-white leading-none">{testimony.full_name}</h3>
                                                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-1">
                                                    {testimony.category || 'Miembro'} • {testimony.created_at ? new Date(testimony.created_at).toLocaleDateString() : 'Fecha desc.'}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="relative pl-6 border-l-2 border-mivn-blue/20">
                                        <MessageSquareQuote className="absolute -left-2.5 top-0 w-5 h-5 text-mivn-blue bg-white dark:bg-slate-900" />
                                        <p className="text-slate-600 dark:text-slate-300 text-lg italic leading-relaxed font-playfair">
                                            "{testimony.content}"
                                        </p>
                                    </div>
                                </div>

                                <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-slate-100 dark:border-slate-800 mt-6">
                                    {!testimony.is_approved && (
                                        <div className="flex gap-3">
                                            <button
                                                onClick={() => handleApprove(testimony.id)}
                                                disabled={loading === testimony.id}
                                                className="flex items-center gap-2 px-6 py-3 bg-mivn-gold text-white rounded-xl font-black uppercase tracking-widest text-[10px] hover:scale-105 transition-all shadow-lg shadow-mivn-gold/20 disabled:opacity-50 disabled:cursor-not-allowed"
                                            >
                                                {loading === testimony.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle2 className="w-4 h-4" />}
                                                Aprobar
                                            </button>
                                        </div>
                                    )}
                                    <button
                                        onClick={() => handleReject(testimony.id)}
                                        disabled={loading === testimony.id}
                                        className="flex items-center gap-2 px-4 py-2 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 rounded-xl font-black uppercase tracking-widest text-[10px] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {loading === testimony.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <XCircle className="w-4 h-4" />}
                                        Rechazar
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Pagination Placeholder (Removing Hardcoded Pagination for now or keeping as static until pagination is implemented) */}
            <div className="flex items-center justify-between pt-8 border-t border-slate-200 dark:border-slate-800">
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                    Mostrando <span className="text-slate-900 dark:text-white">{filteredTestimonies.length}</span> resultados
                </p>
            </div>
        </div>
    );
}

"use client";

import {
    MessageSquareQuote, CheckCircle2, XCircle, Edit, Download, RefreshCw,
    Paperclip, FileText, ChevronLeft, ChevronRight, Play, Eye
} from "lucide-react";

export function TestimonialManager() {
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
                <button className="flex items-center gap-2 border-b-2 border-mivn-blue text-mivn-blue pb-4 px-2 bg-transparent">
                    <span className="text-sm font-bold">Pendientes</span>
                    <span className="bg-mivn-blue/10 text-mivn-blue text-[10px] font-black px-2 py-0.5 rounded-lg">12</span>
                </button>
                <button className="flex items-center gap-2 border-b-2 border-transparent text-slate-500 hover:text-slate-700 dark:text-slate-400 pb-4 px-2 hover:border-slate-300 transition-colors bg-transparent">
                    <span className="text-sm font-bold">Aprobados</span>
                    <span className="bg-slate-100 dark:bg-white/10 text-slate-500 text-[10px] font-black px-2 py-0.5 rounded-lg">458</span>
                </button>
                <button className="flex items-center gap-2 border-b-2 border-transparent text-slate-500 hover:text-slate-700 dark:text-slate-400 pb-4 px-2 hover:border-slate-300 transition-colors bg-transparent">
                    <span className="text-sm font-bold">Archivados</span>
                </button>
            </div>

            {/* Testimonial Cards */}
            <div className="space-y-6">

                {/* Card 1 */}
                <div className="group bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[2.5rem] overflow-hidden shadow-xl hover:shadow-2xl transition-all flex flex-col xl:flex-row">
                    <div className="w-full xl:w-72 shrink-0 relative overflow-hidden h-56 xl:h-auto">
                        <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&q=80')" }}></div>
                        <div className="absolute top-4 left-4">
                            <span className="bg-emerald-500/90 backdrop-blur-sm text-white text-[9px] font-black px-3 py-1.5 rounded-lg uppercase tracking-widest shadow-lg">Nuevo</span>
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent xl:hidden"></div>
                    </div>

                    <div className="flex-1 p-8 flex flex-col justify-between">
                        <div className="space-y-6">
                            <div className="flex flex-wrap items-center justify-between gap-4">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-white/10 flex items-center justify-center border-2 border-white dark:border-slate-700 shadow-lg">
                                        <span className="text-lg font-black text-slate-400">M</span>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-playfair font-black text-slate-900 dark:text-white leading-none">Maria Gonzalez</h3>
                                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-1">15 Oct 2026 • 10:45 AM</p>
                                    </div>
                                </div>
                                <button className="flex items-center gap-2 text-mivn-blue hover:bg-mivn-blue/5 px-4 py-2 rounded-xl transition-colors">
                                    <Paperclip className="w-4 h-4" />
                                    <span className="text-[10px] font-black uppercase tracking-widest">Ver adjuntos (3)</span>
                                </button>
                            </div>

                            <div className="relative pl-6 border-l-2 border-mivn-blue/20">
                                <MessageSquareQuote className="absolute -left-2.5 top-0 w-5 h-5 text-mivn-blue bg-white dark:bg-slate-900" />
                                <p className="text-slate-600 dark:text-slate-300 text-lg italic leading-relaxed font-playfair">
                                    "Doy gracias a Dios por la sanidad en mi familia este mes. Fue un milagro que no podemos explicar humanamente, los doctores no daban esperanza pero nuestra fe se mantuvo firme. ¡La gloria sea para Dios!"
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-slate-100 dark:border-slate-800 mt-6">
                            <div className="flex gap-3">
                                <button className="flex items-center gap-2 px-6 py-3 bg-mivn-gold text-white rounded-xl font-black uppercase tracking-widest text-[10px] hover:scale-105 transition-all shadow-lg shadow-mivn-gold/20">
                                    <CheckCircle2 className="w-4 h-4" /> Aprobar
                                </button>
                                <button className="flex items-center gap-2 px-6 py-3 bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-300 rounded-xl font-black uppercase tracking-widest text-[10px] hover:bg-slate-200 dark:hover:bg-white/10 transition-all">
                                    <Edit className="w-4 h-4" /> Editar
                                </button>
                            </div>
                            <button className="flex items-center gap-2 px-4 py-2 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 rounded-xl font-black uppercase tracking-widest text-[10px] transition-all">
                                <XCircle className="w-4 h-4" /> Rechazar
                            </button>
                        </div>
                    </div>
                </div>

                {/* Card 2 */}
                <div className="group bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[2.5rem] overflow-hidden shadow-xl hover:shadow-2xl transition-all flex flex-col xl:flex-row">
                    <div className="w-full xl:w-72 shrink-0 relative overflow-hidden h-56 xl:h-auto">
                        <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1544027993-37dbfe43562a?auto=format&fit=crop&q=80')" }}></div>
                        <div className="absolute top-4 left-4">
                            <span className="bg-rose-500/90 backdrop-blur-sm text-white text-[9px] font-black px-3 py-1.5 rounded-lg uppercase tracking-widest shadow-lg">Urgente</span>
                        </div>
                    </div>

                    <div className="flex-1 p-8 flex flex-col justify-between">
                        <div className="space-y-6">
                            <div className="flex flex-wrap items-center justify-between gap-4">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-white/10 flex items-center justify-center border-2 border-white dark:border-slate-700 shadow-lg">
                                        <span className="text-lg font-black text-slate-400">D</span>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-playfair font-black text-slate-900 dark:text-white leading-none">David Ruiz</h3>
                                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-1">14 Oct 2026 • 09:20 PM</p>
                                    </div>
                                </div>
                            </div>

                            <div className="relative pl-6 border-l-2 border-mivn-blue/20">
                                <MessageSquareQuote className="absolute -left-2.5 top-0 w-5 h-5 text-mivn-blue bg-white dark:bg-slate-900" />
                                <p className="text-slate-600 dark:text-slate-300 text-lg italic leading-relaxed font-playfair">
                                    "Después de meses de búsqueda, finalmente encontré el empleo que tanto le pedía al Señor. No es solo un trabajo, es una respuesta a mis oraciones."
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-slate-100 dark:border-slate-800 mt-6">
                            <div className="flex gap-3">
                                <button className="flex items-center gap-2 px-6 py-3 bg-mivn-gold text-white rounded-xl font-black uppercase tracking-widest text-[10px] hover:scale-105 transition-all shadow-lg shadow-mivn-gold/20">
                                    <CheckCircle2 className="w-4 h-4" /> Aprobar
                                </button>
                                <button className="flex items-center gap-2 px-6 py-3 bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-300 rounded-xl font-black uppercase tracking-widest text-[10px] hover:bg-slate-200 dark:hover:bg-white/10 transition-all">
                                    <Edit className="w-4 h-4" /> Editar
                                </button>
                            </div>
                            <button className="flex items-center gap-2 px-4 py-2 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 rounded-xl font-black uppercase tracking-widest text-[10px] transition-all">
                                <XCircle className="w-4 h-4" /> Rechazar
                            </button>
                        </div>
                    </div>
                </div>

            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between pt-8 border-t border-slate-200 dark:border-slate-800">
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                    Mostrando <span className="text-slate-900 dark:text-white">1-2</span> de <span className="text-slate-900 dark:text-white">12</span> pendientes
                </p>
                <div className="flex gap-2">
                    <button className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-100 dark:bg-white/5 text-slate-400 hover:bg-mivn-blue hover:text-white transition-all">
                        <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button className="w-10 h-10 flex items-center justify-center rounded-xl bg-mivn-blue text-white font-black text-xs shadow-lg shadow-mivn-blue/20">
                        1
                    </button>
                    <button className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-100 dark:bg-white/5 text-slate-400 hover:bg-mivn-blue hover:text-white transition-all">
                        2
                    </button>
                    <button className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-100 dark:bg-white/5 text-slate-400 hover:bg-mivn-blue hover:text-white transition-all">
                        <ChevronRight className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    );
}

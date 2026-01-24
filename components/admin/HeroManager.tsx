"use client";

import {
    LayoutTemplate, Image as ImageIcon, Plus, Trash2, MoveUp, MoveDown,
    CheckCircle2, AlertCircle, Save, Eye
} from "lucide-react";
import { useState } from "react";

export function HeroManager() {
    const [slides, setSlides] = useState([
        { id: 1, title: "Bienvenidos a MIVN", subtitle: "Una iglesia de puertas abiertas, donde el amor de Dios transforma vidas.", image: "https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&q=80", active: true },
        { id: 2, title: "Año de la Expansión", subtitle: "Isaías 54:2 - Ensancha el sitio de tu tienda...", image: "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?auto=format&fit=crop&q=80", active: true },
        { id: 3, title: "Conferencia de Jóvenes 2026", subtitle: "Prepárate para un tiempo sobrenatural.", image: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&q=80", active: false },
    ]);

    return (
        <div className="space-y-8 animate-in fade-in duration-700">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-playfair font-black text-slate-900 dark:text-white uppercase tracking-tighter">
                        Gestión de <span className="text-mivn-blue italic">Portada</span>
                    </h1>
                    <p className="text-slate-500 dark:text-gray-400 font-light italic text-lg leading-relaxed max-w-xl">
                        Administra los banners principales (Heros) visibles en la página de inicio.
                    </p>
                </div>
                <button className="flex items-center gap-2 px-6 py-3 bg-mivn-blue text-white rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-2xl shadow-mivn-blue/20 hover:scale-105 transition-all">
                    <Plus className="w-4 h-4" /> Nuevo Slide
                </button>
            </div>

            {/* Slides List */}
            <div className="space-y-4">
                {slides.map((slide, index) => (
                    <div key={slide.id} className="group bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[2rem] p-4 flex flex-col md:flex-row gap-6 items-center shadow-lg hover:shadow-xl transition-all">
                        {/* Drag Handle & Order */}
                        <div className="hidden md:flex flex-col items-center gap-2 text-slate-300">
                            <button className="hover:text-mivn-blue"><MoveUp className="w-4 h-4" /></button>
                            <span className="text-xs font-black font-mono">{index + 1}</span>
                            <button className="hover:text-mivn-blue"><MoveDown className="w-4 h-4" /></button>
                        </div>

                        {/* Image Preview */}
                        <div className="relative w-full md:w-48 aspect-video rounded-xl overflow-hidden bg-slate-100 flex-shrink-0">
                            <img src={slide.image} alt={slide.title} className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                <button className="text-white bg-white/20 hover:bg-white/40 p-2 rounded-full backdrop-blur-sm transition-colors">
                                    <ImageIcon className="w-5 h-5" />
                                </button>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="flex-1 text-center md:text-left space-y-2">
                            <div className="flex items-center justify-center md:justify-start gap-3">
                                <h3 className="font-playfair font-bold text-lg text-slate-900 dark:text-white">{slide.title}</h3>
                                {slide.active ? (
                                    <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-500 text-[9px] font-black uppercase tracking-widest rounded-lg flex items-center gap-1">
                                        <CheckCircle2 className="w-3 h-3" /> Activo
                                    </span>
                                ) : (
                                    <span className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-400 text-[9px] font-black uppercase tracking-widest rounded-lg flex items-center gap-1">
                                        <AlertCircle className="w-3 h-3" /> Inactivo
                                    </span>
                                )}
                            </div>
                            <p className="text-sm text-slate-500 font-medium line-clamp-2 md:line-clamp-1">{slide.subtitle}</p>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-2 border-t md:border-t-0 md:border-l border-slate-100 dark:border-slate-800 pt-4 md:pt-0 md:pl-6 w-full md:w-auto justify-center">
                            <button className="p-3 rounded-xl bg-slate-50 dark:bg-white/5 text-slate-400 hover:text-mivn-blue hover:bg-mivn-blue/10 transition-colors">
                                <Eye className="w-4 h-4" />
                            </button>
                            <button className="p-3 rounded-xl bg-mivn-blue text-white shadow-lg shadow-mivn-blue/20 hover:scale-110 transition-transform">
                                <Save className="w-4 h-4" />
                            </button>
                            <button className="p-3 rounded-xl bg-rose-50 dark:bg-rose-500/5 text-rose-400 hover:text-rose-600 hover:bg-rose-500/10 transition-colors">
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Empty State / Add Helper */}
            {slides.length === 0 && (
                <div className="text-center py-20 bg-slate-50 dark:bg-white/5 rounded-[2.5rem] border-2 border-dashed border-slate-200 dark:border-slate-700">
                    <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-300">
                        <LayoutTemplate className="w-8 h-8" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">No hay slides activos</h3>
                    <p className="text-slate-500 text-sm mb-6">Añade un nuevo banner para mostrar en la página de inicio.</p>
                    <button className="px-6 py-3 bg-mivn-blue text-white rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-blue-600 transition-colors">
                        Crear Primer Slide
                    </button>
                </div>
            )}
        </div>
    );
}

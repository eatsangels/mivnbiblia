"use client";

import {
    Package, QrCode, FileText, PlusCircle, Box, AlertTriangle,
    Construction, BadgePlus, Search, SlidersHorizontal, Mic,
    Piano, Video, Armchair, Edit2, ChevronLeft, ChevronRight,
    ShoppingBag, HelpCircle
} from "lucide-react";
import { useState } from "react";

export interface InventoryManagerProps {
    initialResources: any[];
}

export function InventoryManager({ initialResources }: InventoryManagerProps) {
    const [activeTab, setActiveTab] = useState("all");

    return (
        <div className="space-y-8 animate-in fade-in duration-700">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-playfair font-black text-slate-900 dark:text-white uppercase tracking-tighter">
                        Gestor de <span className="text-mivn-blue italic">Inventario</span>
                    </h1>
                    <p className="text-slate-500 dark:text-gray-400 font-light italic text-lg leading-relaxed max-w-xl">
                        Panel central administrativo de activos de Ministerio Internacional Vida Nueva.
                    </p>
                </div>
                <div className="flex gap-3">
                    <button className="flex items-center gap-2 px-5 py-3 bg-mivn-blue/10 text-mivn-blue border border-mivn-blue/20 rounded-xl font-bold text-sm hover:bg-mivn-blue/20 transition-all">
                        <QrCode className="w-5 h-5" /> <span>Escanear QR</span>
                    </button>
                    <button className="flex items-center gap-2 px-5 py-3 bg-mivn-gold text-white rounded-xl font-bold text-sm hover:brightness-110 transition-all shadow-lg shadow-mivn-gold/20">
                        <PlusCircle className="w-5 h-5" /> <span>Agregar</span>
                    </button>
                </div>
            </div>

            {/* Top Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white dark:bg-slate-900 p-6 rounded-[1.5rem] border border-slate-100 dark:border-slate-800 shadow-xl group hover:scale-[1.02] transition-transform">
                    <div className="flex items-center justify-between mb-2">
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Total Ítems</p>
                        <div className="p-2 bg-mivn-blue/10 rounded-lg">
                            <Box className="w-5 h-5 text-mivn-blue" />
                        </div>
                    </div>
                    <p className="text-3xl font-black text-slate-900 dark:text-white mb-1">{initialResources.length}</p>
                    <p className="text-[10px] text-slate-400 font-medium">En el sistema</p>
                </div>

                <div className="bg-white dark:bg-slate-900 p-6 rounded-[1.5rem] border border-slate-100 dark:border-slate-800 shadow-xl group hover:scale-[1.02] transition-transform">
                    <div className="flex items-center justify-between mb-2">
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Recursos Digitales</p>
                        <div className="p-2 bg-mivn-gold/10 rounded-lg">
                            <FileText className="w-5 h-5 text-mivn-gold" />
                        </div>
                    </div>
                    <p className="text-3xl font-black text-slate-900 dark:text-white mb-1">
                        {initialResources.filter(r => r.file_type === 'digital' || !r.file_type).length}
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                {/* Main Table Section */}
                <div className="xl:col-span-2 space-y-6">
                    <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 overflow-hidden shadow-xl">
                        <div className="p-8 border-b border-slate-100 dark:border-slate-800">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                <h2 className="text-xl font-playfair font-bold text-slate-900 dark:text-white">Registro General de Recursos</h2>
                            </div>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-slate-50 dark:bg-white/5 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                    <tr>
                                        <th className="px-6 py-4">Ítem</th>
                                        <th className="px-6 py-4">Tipo</th>
                                        <th className="px-6 py-4">Categoría</th>
                                        <th className="px-6 py-4">Acción</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                    {initialResources.length > 0 ? (
                                        initialResources.map((item, i) => (
                                            <tr key={i} className="hover:bg-slate-50 dark:hover:bg-white/5 transition-colors group">
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-10 h-10 rounded-xl bg-mivn-blue/10 flex items-center justify-center text-mivn-blue">
                                                            <Package className="w-5 h-5" />
                                                        </div>
                                                        <span className="font-bold text-slate-900 dark:text-white text-sm">{item.title}</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-xs font-medium uppercase text-slate-500">
                                                    {item.file_type || 'Digital'}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-slate-400`}>
                                                        {item.category_id || 'General'}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 font-black text-xs text-mivn-blue uppercase cursor-pointer hover:underline">
                                                    Editar
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={4} className="px-6 py-8 text-center text-slate-400 italic">No se encontraron recursos</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Sidebar Column */}
                <div className="flex flex-col gap-6">
                    <div className="bg-mivn-blue rounded-[2.5rem] p-8 text-white shadow-xl shadow-mivn-blue/20 relative overflow-hidden">
                        <div className="relative z-10">
                            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mb-4 text-white">
                                <HelpCircle className="w-6 h-6" />
                            </div>
                            <h3 className="text-lg font-playfair font-bold mb-2">Ayuda Administrativa</h3>
                            <p className="text-sm text-white/80 leading-relaxed mb-6 font-medium">¿Necesitas ayuda para categorizar un nuevo activo?</p>
                            <button className="bg-white text-mivn-blue px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-white/90 transition-colors shadow-lg">
                                Ver Guía
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

"use client";

import {
    Package, QrCode, FileText, PlusCircle, Box, AlertTriangle,
    Construction, BadgePlus, Search, SlidersHorizontal, Mic,
    Piano, Video, Armchair, Edit2, ChevronLeft, ChevronRight,
    ShoppingBag, HelpCircle
} from "lucide-react";
import { useState } from "react";

export function InventoryManager() {
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
                    <button className="flex items-center gap-2 px-5 py-3 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-white rounded-xl font-bold text-sm hover:bg-slate-50 dark:hover:bg-white/10 transition-all">
                        <FileText className="w-5 h-5" /> <span>Reporte</span>
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
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Valor Total Activos</p>
                        <div className="p-2 bg-mivn-blue/10 rounded-lg">
                            <span className="text-xl font-black text-mivn-blue">$</span>
                        </div>
                    </div>
                    <p className="text-3xl font-black text-slate-900 dark:text-white mb-1">$45,200.00</p>
                    <div className="flex items-center gap-1">
                        <span className="text-emerald-500 text-xs font-black">+2.4%</span>
                        <span className="text-[10px] text-slate-400 font-medium">este mes</span>
                    </div>
                </div>

                <div className="bg-white dark:bg-slate-900 p-6 rounded-[1.5rem] border border-slate-100 dark:border-slate-800 shadow-xl group hover:scale-[1.02] transition-transform">
                    <div className="flex items-center justify-between mb-2">
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">En Mantenimiento</p>
                        <div className="p-2 bg-mivn-gold/10 rounded-lg">
                            <Construction className="w-5 h-5 text-mivn-gold" />
                        </div>
                    </div>
                    <p className="text-3xl font-black text-slate-900 dark:text-white mb-1">12 <span className="text-lg font-medium text-slate-400">unids</span></p>
                    <p className="text-[10px] text-slate-400 italic font-medium">3 críticos hoy</p>
                </div>

                <div className="bg-white dark:bg-slate-900 p-6 rounded-[1.5rem] border-l-4 border-l-rose-500 border-t border-r border-b border-slate-100 dark:border-slate-800 shadow-xl group hover:scale-[1.02] transition-transform">
                    <div className="flex items-center justify-between mb-2">
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Alertas de Stock</p>
                        <div className="p-2 bg-rose-500/10 rounded-lg">
                            <AlertTriangle className="w-5 h-5 text-rose-500" />
                        </div>
                    </div>
                    <p className="text-3xl font-black text-slate-900 dark:text-white mb-1">5 <span className="text-lg font-medium text-slate-400">ítems</span></p>
                    <p className="text-rose-500 text-[10px] font-black uppercase tracking-wider">Requiere Compra</p>
                </div>

                <div className="bg-white dark:bg-slate-900 p-6 rounded-[1.5rem] border border-slate-100 dark:border-slate-800 shadow-xl group hover:scale-[1.02] transition-transform">
                    <div className="flex items-center justify-between mb-2">
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Recién Agregados</p>
                        <div className="p-2 bg-emerald-500/10 rounded-lg">
                            <BadgePlus className="w-5 h-5 text-emerald-500" />
                        </div>
                    </div>
                    <p className="text-3xl font-black text-slate-900 dark:text-white mb-1">8 <span className="text-lg font-medium text-slate-400">nuevos</span></p>
                    <p className="text-emerald-500 text-xs font-black">+5% vs mes anterior</p>
                </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                {/* Main Table Section */}
                <div className="xl:col-span-2 space-y-6">
                    <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 overflow-hidden shadow-xl">
                        <div className="p-8 border-b border-slate-100 dark:border-slate-800">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                                <h2 className="text-xl font-playfair font-bold text-slate-900 dark:text-white">Registro General de Activos</h2>
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="Buscar..."
                                        className="pl-10 pr-4 py-2 bg-slate-50 dark:bg-white/5 border-none rounded-xl text-sm font-medium w-full sm:w-64 focus:ring-2 focus:ring-mivn-blue/20"
                                    />
                                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                                </div>
                            </div>

                            <div className="flex gap-8 border-b border-slate-100 dark:border-slate-800">
                                {['Todos', 'Sonido', 'Instrumentos', 'Tecnología'].map((tab) => (
                                    <button
                                        key={tab}
                                        onClick={() => setActiveTab(tab.toLowerCase())}
                                        className={`pb-4 text-sm font-bold transition-colors relative ${(activeTab === 'all' && tab === 'Todos') || activeTab === tab.toLowerCase()
                                                ? 'text-mivn-blue'
                                                : 'text-slate-400 hover:text-mivn-blue'
                                            }`}
                                    >
                                        {tab}
                                        {((activeTab === 'all' && tab === 'Todos') || activeTab === tab.toLowerCase()) && (
                                            <div className="absolute bottom-0 left-0 w-full h-1 bg-mivn-blue rounded-t-full"></div>
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-slate-50 dark:bg-white/5 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                    <tr>
                                        <th className="px-6 py-4">Ítem</th>
                                        <th className="px-6 py-4">Categoría</th>
                                        <th className="px-6 py-4">Estado</th>
                                        <th className="px-6 py-4">Ubicación</th>
                                        <th className="px-6 py-4">Compra</th>
                                        <th className="px-6 py-4">Acción</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                    {[
                                        { name: "Micrófono Shure SM58", icon: Mic, cat: "Sonido", status: "Activo", color: "bg-emerald-500/10 text-emerald-500", loc: "Altar Principal", date: "12/05/2023" },
                                        { name: "Piano Roland RD-2000", icon: Piano, cat: "Instrumentos", status: "Mantenimiento", color: "bg-amber-500/10 text-amber-500", loc: "Auditorio", date: "10/02/2022" },
                                        { name: "Cámara PTZ Sony 4K", icon: Video, cat: "Tecnología", status: "Activo", color: "bg-emerald-500/10 text-emerald-500", loc: "Streaming Hub", date: "15/11/2023" },
                                        { name: "Sillas Apilables (Pack 50)", icon: Armchair, cat: "Mobiliario", status: "Perdido", color: "bg-rose-500/10 text-rose-500", loc: "Salón Social", date: "05/01/2024" },
                                    ].map((item, i) => (
                                        <tr key={i} className="hover:bg-slate-50 dark:hover:bg-white/5 transition-colors group">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-xl bg-mivn-blue/10 flex items-center justify-center text-mivn-blue">
                                                        <item.icon className="w-5 h-5" />
                                                    </div>
                                                    <span className="font-bold text-slate-900 dark:text-white text-sm">{item.name}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-xs font-medium text-slate-500">{item.cat}</td>
                                            <td className="px-6 py-4">
                                                <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${item.color}`}>
                                                    {item.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-xs font-medium text-slate-500">{item.loc}</td>
                                            <td className="px-6 py-4 text-xs font-medium text-slate-500">{item.date}</td>
                                            <td className="px-6 py-4">
                                                <button className="text-slate-400 hover:text-mivn-blue transition-colors">
                                                    <Edit2 className="w-4 h-4" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="p-4 bg-slate-50 dark:bg-white/5 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center">
                            <span className="text-xs font-medium text-slate-500">Mostrando 4 de 128 activos</span>
                            <div className="flex gap-2">
                                <button className="px-3 py-1.5 bg-white dark:bg-white/10 border border-slate-200 dark:border-white/10 rounded-lg text-xs font-bold disabled:opacity-50 hover:bg-slate-50 transition-colors">Anterior</button>
                                <button className="px-3 py-1.5 bg-white dark:bg-white/10 border border-slate-200 dark:border-white/10 rounded-lg text-xs font-bold hover:bg-slate-50 transition-colors">Siguiente</button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sidebar Column */}
                <div className="flex flex-col gap-6">
                    <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 p-8 shadow-xl">
                        <h2 className="text-lg font-playfair font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                            Insumos y Consumibles
                        </h2>
                        <div className="space-y-6">
                            {[
                                { name: "Biblias NTV (Obsequio)", current: 45, total: 200, pct: 22.5, color: "bg-mivn-gold", alert: "STOCK BAJO: Reordenar pronto", alertColor: "text-rose-500" },
                                { name: "Tratados Evangelísticos", current: 1200, total: 1500, pct: 80, color: "bg-mivn-blue", alert: null },
                                { name: "Elementos Santa Cena", current: 15, total: 100, pct: 15, color: "bg-rose-500", alert: "Crítico: Menos de una semana", alertColor: "text-rose-600 uppercase" },
                                { name: "Suministros de Limpieza", current: null, total: null, pct: 65, label: "65%", color: "bg-emerald-500", alert: null }
                            ].map((item, i) => (
                                <div key={i}>
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-sm font-bold text-slate-900 dark:text-white">{item.name}</span>
                                        <span className="text-xs font-medium text-slate-500">{item.label || `${item.current} / ${item.total}`}</span>
                                    </div>
                                    <div className="w-full bg-slate-100 dark:bg-white/10 rounded-full h-2 overflow-hidden">
                                        <div className={`h-full rounded-full ${item.color}`} style={{ width: `${item.pct}%` }}></div>
                                    </div>
                                    {item.alert && (
                                        <p className={`text-[10px] font-black mt-1.5 ${item.alertColor}`}>{item.alert}</p>
                                    )}
                                </div>
                            ))}
                        </div>
                        <button className="w-full mt-8 py-3 bg-mivn-blue/10 text-mivn-blue font-black uppercase tracking-widest text-[10px] rounded-xl hover:bg-mivn-blue/20 transition-all flex items-center justify-center gap-2">
                            <ShoppingBag className="w-4 h-4" /> Gestionar Pedidos
                        </button>
                    </div>

                    <div className="bg-mivn-blue rounded-[2.5rem] p-8 text-white shadow-xl shadow-mivn-blue/20 relative overflow-hidden">
                        {/* Background Pattern */}
                        <div className="absolute top-0 right-0 p-8 opacity-10">
                            <HelpCircle className="w-32 h-32 text-white" />
                        </div>

                        <div className="relative z-10">
                            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mb-4 text-white">
                                <HelpCircle className="w-6 h-6" />
                            </div>
                            <h3 className="text-lg font-playfair font-bold mb-2">Soporte Administrativo</h3>
                            <p className="text-sm text-white/80 leading-relaxed mb-6 font-medium">¿Necesitas ayuda con el registro de un activo especial o peritaje?</p>
                            <button className="bg-white text-mivn-blue px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-white/90 transition-colors shadow-lg">
                                Contactar Soporte
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

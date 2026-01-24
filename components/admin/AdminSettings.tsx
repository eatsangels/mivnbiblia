"use client";

import {
    Save, Plus, Edit3, Trash2, Eye, Bold, Italic,
    List, Link as LinkIcon, Camera, Facebook,
    Instagram, Youtube, MapPin, Phone, Mail, Globe,
    ShieldCheck, Palette, Users as UsersIcon, Settings
} from "lucide-react";
import { useState } from "react";
import Image from "next/image";

export function AdminSettings() {
    const [activeTab, setActiveTab] = useState("general");

    const tabs = [
        { id: "general", label: "Información General", icon: Globe },
        { id: "visual", label: "Identidad Visual", icon: Palette },
        { id: "roles", label: "Gestión de Roles", icon: UsersIcon },
        { id: "legal", label: "Documentos Legales", icon: ShieldCheck },
    ];

    return (
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-8 duration-700">

            {/* Page Header */}
            <div className="flex flex-col md:flex-row justify-between items-end gap-6 pb-2">
                <div className="space-y-2">
                    <h2 className="text-4xl font-playfair font-black text-slate-900 dark:text-white uppercase tracking-tighter">
                        Configuración <span className="text-mivn-blue italic">del Sistema</span>
                    </h2>
                    <p className="text-slate-500 dark:text-gray-400 font-light italic text-lg leading-relaxed max-w-2xl">
                        Gestione la información institucional, roles administrativos y políticas legales de la congregación.
                    </p>
                </div>
                <button className="flex items-center gap-3 bg-mivn-gold text-white px-10 py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] shadow-2xl shadow-mivn-gold/20 hover:scale-105 active:scale-95 transition-all">
                    <Save className="w-4 h-4" /> Guardar Cambios
                </button>
            </div>

            {/* Tabs Navigation */}
            <div className="border-b border-slate-200 dark:border-white/10 overflow-x-auto scrollbar-hide">
                <div className="flex gap-10 min-w-max">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-3 pb-6 pt-2 border-b-2 transition-all relative ${activeTab === tab.id
                                ? "border-mivn-blue text-mivn-blue font-black"
                                : "border-transparent text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 font-bold"
                                }`}
                        >
                            <tab.icon className="w-4 h-4" />
                            <span className="text-[11px] uppercase tracking-widest">{tab.label}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Content Sections */}
            <div className="grid grid-cols-1 gap-12 pb-20">

                {activeTab === "general" && (
                    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        {/* Church Info Section */}
                        <section className="bg-white dark:bg-slate-900 rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-2xl overflow-hidden">
                            <div className="p-10 border-b border-slate-50 dark:border-white/5 bg-slate-50/50 dark:bg-white/[0.02]">
                                <h3 className="text-2xl font-playfair font-bold text-slate-900 dark:text-white uppercase tracking-tight">Información de la Iglesia</h3>
                                <p className="text-sm text-slate-500 italic mt-1">Estos datos aparecerán en el encabezado y pie de página del sitio público.</p>
                            </div>
                            <div className="p-10 md:p-12 grid grid-cols-1 md:grid-cols-2 gap-10">
                                <div className="col-span-1 md:col-span-2 space-y-3">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Dirección Física</label>
                                    <input className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl py-5 px-8 text-slate-800 dark:text-white focus:border-mivn-blue transition-all outline-none font-medium" type="text" defaultValue="Av. Principal #123, Sector Los Olivos, Ciudad de México" />
                                </div>
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Teléfono de Contacto</label>
                                    <input className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl py-5 px-8 text-slate-800 dark:text-white focus:border-mivn-blue transition-all outline-none font-medium" type="text" defaultValue="+52 (55) 1234-5678" />
                                </div>
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Correo Institucional</label>
                                    <input className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl py-5 px-8 text-slate-800 dark:text-white focus:border-mivn-blue transition-all outline-none font-medium" type="email" defaultValue="contacto@mivn.org" />
                                </div>
                                <div className="col-span-1 md:col-span-2 space-y-3">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Google Maps Embed Link</label>
                                    <input className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl py-5 px-8 text-slate-800 dark:text-white focus:border-mivn-blue transition-all outline-none font-medium" type="text" defaultValue="https://maps.google.com/?q=MIVN+Church" />
                                </div>
                            </div>
                        </section>

                        {/* Social Networks Section */}
                        <section className="bg-white dark:bg-slate-900 rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-2xl overflow-hidden">
                            <div className="p-10 border-b border-slate-50 dark:border-white/5 bg-slate-50/50 dark:bg-white/[0.02]">
                                <h3 className="text-2xl font-playfair font-bold text-slate-900 dark:text-white uppercase tracking-tight">Redes Sociales</h3>
                                <p className="text-sm text-slate-500 italic mt-1">Conecte las cuentas oficiales de la congregación.</p>
                            </div>
                            <div className="p-10 md:p-12 space-y-8">
                                <div className="flex items-center gap-6 group">
                                    <div className="w-14 h-14 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10 flex items-center justify-center text-slate-400 group-hover:text-blue-600 transition-colors shadow-sm">
                                        <Facebook className="w-6 h-6" />
                                    </div>
                                    <input className="flex-1 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl py-5 px-8 text-slate-800 dark:text-white focus:border-mivn-blue transition-all outline-none font-medium" placeholder="https://facebook.com/mivn" type="text" />
                                </div>
                                <div className="flex items-center gap-6 group">
                                    <div className="w-14 h-14 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10 flex items-center justify-center text-slate-400 group-hover:text-pink-500 transition-colors shadow-sm">
                                        <Instagram className="w-6 h-6" />
                                    </div>
                                    <input className="flex-1 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl py-5 px-8 text-slate-800 dark:text-white focus:border-mivn-blue transition-all outline-none font-medium" placeholder="https://instagram.com/mivn" type="text" />
                                </div>
                                <div className="flex items-center gap-6 group">
                                    <div className="w-14 h-14 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10 flex items-center justify-center text-slate-400 group-hover:text-rose-600 transition-colors shadow-sm">
                                        <Youtube className="w-6 h-6" />
                                    </div>
                                    <input className="flex-1 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl py-5 px-8 text-slate-800 dark:text-white focus:border-mivn-blue transition-all outline-none font-medium" placeholder="https://youtube.com/mivn" type="text" />
                                </div>
                            </div>
                        </section>
                    </div>
                )}

                {activeTab === "visual" && (
                    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <section className="bg-white dark:bg-slate-900 rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-2xl overflow-hidden">
                            <div className="p-10 border-b border-slate-50 dark:border-white/5 bg-slate-50/50 dark:bg-white/[0.02]">
                                <h3 className="text-2xl font-playfair font-bold text-slate-900 dark:text-white uppercase tracking-tight">Logotipo Institucional</h3>
                                <p className="text-sm text-slate-500 italic mt-1">Suba el logo oficial para ser usado en toda la plataforma.</p>
                            </div>
                            <div className="p-12 flex flex-col md:flex-row gap-12 items-center">
                                <div className="size-48 bg-slate-50 dark:bg-white/5 border-2 border-dashed border-slate-200 dark:border-white/10 rounded-[2.5rem] flex items-center justify-center overflow-hidden transition-transform hover:scale-105 duration-500 shadow-inner p-8">
                                    <Image src="/logo_mivn.png" alt="Logo Preview" width={150} height={150} className="object-contain" />
                                </div>
                                <div className="flex-1 text-center md:text-left space-y-6">
                                    <div className="space-y-2">
                                        <h4 className="text-xl font-bold text-slate-900 dark:text-white uppercase tracking-tight">Cargar nuevo logo</h4>
                                        <p className="text-xs text-slate-500 font-light italic">Formatos recomendados: PNG, SVG o WEBP (Fondo transparente). Máximo 2MB.</p>
                                    </div>
                                    <div className="flex gap-4 justify-center md:justify-start">
                                        <button className="bg-mivn-blue text-white text-[10px] font-black uppercase tracking-widest px-8 py-4 rounded-2xl hover:scale-105 transition-all shadow-lg shadow-mivn-blue/20">Subir Archivo</button>
                                        <button className="bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-slate-400 text-[10px] font-black uppercase tracking-widest px-8 py-4 rounded-2xl hover:bg-rose-50 hover:text-rose-500 transition-all">Eliminar</button>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                )}

                {activeTab === "roles" && (
                    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <section className="bg-white dark:bg-slate-900 rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-xl overflow-hidden p-12 text-center space-y-6">
                            <div className="size-20 bg-mivn-blue/10 rounded-3xl flex items-center justify-center mx-auto text-mivn-blue">
                                <UsersIcon className="w-10 h-10" />
                            </div>
                            <div className="max-w-md mx-auto space-y-2">
                                <h3 className="text-2xl font-playfair font-black text-slate-900 dark:text-white uppercase tracking-tight">Gestión Avanzada de Roles</h3>
                                <p className="text-sm text-slate-500 font-medium leading-relaxed">
                                    Hemos movido la administración de roles a un módulo dedicado para ofrecer un control más granular sobre permisos y seguridad.
                                </p>
                            </div>
                            <a
                                href="/admin/settings/roles"
                                className="inline-flex items-center gap-3 bg-mivn-blue text-white px-10 py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] shadow-2xl shadow-mivn-blue/20 hover:scale-105 transition-transform"
                            >
                                Gestionar Roles y Permisos <Settings className="w-4 h-4" />
                            </a>
                        </section>
                    </div>
                )}

                {activeTab === "legal" && (
                    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <section className="bg-white dark:bg-slate-900 rounded-[3.5rem] border border-slate-100 dark:border-slate-800 shadow-2xl overflow-hidden">
                            <div className="p-10 border-b border-slate-50 dark:border-white/5 bg-slate-50/50 dark:bg-white/[0.02]">
                                <h3 className="text-2xl font-playfair font-bold text-slate-900 dark:text-white uppercase tracking-tight">Documentos Legales</h3>
                                <p className="text-sm text-slate-500 italic mt-1">Edite las políticas de privacidad y términos de servicio que rigen la plataforma.</p>
                            </div>
                            <div className="p-10 md:p-12 space-y-12">
                                <div className="space-y-6">
                                    <div className="flex items-center justify-between ml-4">
                                        <label className="text-sm font-black uppercase tracking-widest text-slate-800 dark:text-white">Política de Privacidad</label>
                                        <button className="text-mivn-blue text-[9px] font-black uppercase tracking-widest flex items-center gap-2 hover:underline">
                                            <Eye className="w-3.5 h-3.5" /> Previsualizar
                                        </button>
                                    </div>
                                    <div className="bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-[2.5rem] overflow-hidden shadow-inner">
                                        <div className="bg-white/50 dark:bg-white/[0.02] border-b border-slate-100 dark:border-white/5 p-4 flex gap-4">
                                            {[Bold, Italic, List, LinkIcon].map((Icon, idx) => (
                                                <button key={idx} className="p-2.5 hover:bg-white dark:hover:bg-white/10 text-slate-400 hover:text-mivn-blue rounded-xl transition-all"><Icon className="w-4 h-4" /></button>
                                            ))}
                                        </div>
                                        <textarea
                                            className="w-full bg-transparent border-none dark:text-white text-sm focus:ring-0 p-10 font-medium leading-relaxed"
                                            placeholder="Escriba aquí los términos legales..."
                                            rows={8}
                                            defaultValue="En el Ministerio Internacional Vida Nueva, valoramos su privacidad. Esta política describe cómo manejamos sus datos personales y garantizamos la seguridad de su información espiritual en nuestra red institucional..."
                                        />
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <div className="flex items-center justify-between ml-4">
                                        <label className="text-sm font-black uppercase tracking-widest text-slate-800 dark:text-white">Términos y Condiciones</label>
                                        <button className="text-mivn-blue text-[9px] font-black uppercase tracking-widest flex items-center gap-2 hover:underline">
                                            <Eye className="w-3.5 h-3.5" /> Previsualizar
                                        </button>
                                    </div>
                                    <div className="bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-[2.5rem] overflow-hidden shadow-inner">
                                        <div className="bg-white/50 dark:bg-white/[0.02] border-b border-slate-100 dark:border-white/5 p-4 flex gap-4">
                                            {[Bold, Italic, List, LinkIcon].map((Icon, idx) => (
                                                <button key={idx} className="p-2.5 hover:bg-white dark:hover:bg-white/10 text-slate-400 hover:text-mivn-blue rounded-xl transition-all"><Icon className="w-4 h-4" /></button>
                                            ))}
                                        </div>
                                        <textarea
                                            className="w-full bg-transparent border-none dark:text-white text-sm focus:ring-0 p-10 font-medium leading-relaxed"
                                            placeholder="Escriba aquí los términos legales..."
                                            rows={8}
                                            defaultValue="Al utilizar esta plataforma, usted acepta los siguientes términos y condiciones de uso del Ministerio Internacional Vida Nueva. Nuestra meta es proporcionar un ambiente seguro y edificante para todos los miembros..."
                                        />
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                )}

            </div>
        </div>
    );
}

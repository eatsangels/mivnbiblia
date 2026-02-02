"use client";

import { X, Download, Printer, Share2, Award, Calendar, User, ShieldCheck } from "lucide-react";
import Image from "next/image";

interface CertificateViewerProps {
    certificate: any;
    studentName?: string;
    onClose: () => void;
}

export const CertificateViewer = ({ certificate, studentName, onClose }: CertificateViewerProps) => {
    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-10">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-slate-900/90 backdrop-blur-md animate-in fade-in duration-300"
                onClick={onClose}
            />

            {/* Modal Content */}
            <div className="relative w-full max-w-5xl bg-white dark:bg-slate-900 rounded-[2rem] overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300 flex flex-col md:flex-row h-full max-h-[90vh]">

                {/* Certificate Preview (Desktop Left / Mobile Top) */}
                <div className="flex-1 bg-slate-100 dark:bg-black/40 p-6 md:p-12 overflow-y-auto flex items-center justify-center">
                    <div
                        id="printable-certificate"
                        className="relative w-full aspect-[1.414/1] bg-white text-slate-900 shadow-2xl overflow-hidden border-[16px] border-[#c5a358] p-8 md:p-16 flex flex-col items-center justify-between text-center select-none print:shadow-none print:border-[12px]"
                    >
                        {/* Elegant Pattern Background */}
                        <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
                            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                                <pattern id="poly" width="10" height="10" patternUnits="userSpaceOnUse">
                                    <path d="M5 0 L10 5 L5 10 L0 5 Z" fill="currentColor" />
                                </pattern>
                                <rect width="100" height="100" fill="url(#poly)" />
                            </svg>
                        </div>

                        {/* Corner Accents */}
                        <div className="absolute top-0 left-0 w-32 h-32 border-t-4 border-l-4 border-[#c5a358]/30"></div>
                        <div className="absolute top-0 right-0 w-32 h-32 border-t-4 border-r-4 border-[#c5a358]/30"></div>
                        <div className="absolute bottom-0 left-0 w-32 h-32 border-b-4 border-l-4 border-[#c5a358]/30"></div>
                        <div className="absolute bottom-0 right-0 w-32 h-32 border-b-4 border-r-4 border-[#c5a358]/30"></div>

                        {/* Custom Background Image (if exists) */}
                        {certificate.image_url && (
                            <div className="absolute inset-0 z-0 pointer-events-none">
                                <Image
                                    src={certificate.image_url}
                                    alt="Diploma Background"
                                    fill
                                    className="object-cover opacity-10"
                                    priority
                                />
                            </div>
                        )}

                        {/* Certificate Body */}
                        <div className="relative z-10 w-full flex flex-col items-center gap-6">
                            <div className="w-24 h-24 relative mb-4">
                                <Image src="/logo_mivn.png" alt="MIVN" fill className="object-contain" />
                            </div>

                            <div className="space-y-2">
                                <h2 className="text-[#c5a358] font-lexend font-black text-xl uppercase tracking-[0.4em]">Certificado de Logro</h2>
                                <div className="w-16 h-1 bg-[#c5a358] mx-auto"></div>
                            </div>

                            <p className="font-serif italic text-lg text-slate-500 mt-4">Este documento certifica que</p>

                            <h3 className="text-4xl md:text-5xl font-black text-slate-800 uppercase tracking-tight my-4 font-lexend underline decoration-[#c5a358]/20 underline-offset-8">
                                {studentName || 'Usuario MIVN'}
                            </h3>

                            <p className="font-serif italic text-lg text-slate-500">Ha completado satisfactoriamente el curso</p>

                            <h4 className="text-2xl md:text-3xl font-bold text-[#1e3a5f] max-w-2xl leading-tight font-lexend">
                                {certificate.title}
                            </h4>
                        </div>

                        <div className="relative z-10 w-full flex justify-between items-end mt-12 pb-4">
                            <div className="flex flex-col items-center">
                                <div className="w-40 h-px bg-slate-300 mb-2"></div>
                                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Dirección Académica</span>
                            </div>

                            <div className="w-24 h-24 border-4 border-[#c5a358]/20 rounded-full flex items-center justify-center text-[#c5a358]">
                                <Award className="w-12 h-12" />
                            </div>

                            <div className="flex flex-col items-center">
                                <div className="w-40 h-px bg-slate-300 mb-2"></div>
                                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Fecha de Emisión</span>
                                <span className="text-[11px] font-black text-slate-800 mt-1">
                                    {new Date(certificate.issued_at).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sidebar Controls (Desktop Right / Mobile Bottom) */}
                <div className="w-full md:w-80 p-8 flex flex-col gap-8 bg-white dark:bg-slate-900">
                    <div className="flex justify-between items-center">
                        <h3 className="text-xl font-black uppercase tracking-tight">Detalles</h3>
                        <button onClick={onClose} className="p-2 hover:bg-slate-100 dark:hover:bg-white/5 rounded-full transition-colors">
                            <X className="w-6 h-6" />
                        </button>
                    </div>

                    <div className="space-y-6">
                        <div className="space-y-4">
                            <div className="flex items-center gap-4 text-slate-600 dark:text-slate-400">
                                <ShieldCheck className="w-5 h-5 text-emerald-500" />
                                <div className="flex flex-col">
                                    <span className="text-[10px] font-bold uppercase tracking-widest">Estado</span>
                                    <span className="text-sm font-black text-slate-800 dark:text-white uppercase">Verificado por MIVN</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 text-slate-600 dark:text-slate-400">
                                <Calendar className="w-5 h-5 text-mivn-blue" />
                                <div className="flex flex-col">
                                    <span className="text-[10px] font-bold uppercase tracking-widest">Fecha</span>
                                    <span className="text-sm font-black text-slate-800 dark:text-white uppercase">
                                        {new Date(certificate.issued_at).toLocaleDateString('es-ES', { month: 'long', year: 'numeric' })}
                                    </span>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 text-slate-600 dark:text-slate-400">
                                <User className="w-5 h-5 text-mivn-gold" />
                                <div className="flex flex-col">
                                    <span className="text-[10px] font-bold uppercase tracking-widest">Estudiante</span>
                                    <span className="text-sm font-black text-slate-800 dark:text-white uppercase">Mi Perfil</span>
                                </div>
                            </div>
                        </div>

                        <div className="h-px bg-slate-100 dark:bg-white/5"></div>

                        <div className="grid grid-cols-1 gap-3">
                            <button
                                onClick={handlePrint}
                                className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-mivn-blue text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:scale-105 transition-all shadow-xl shadow-mivn-blue/20"
                            >
                                <Printer className="w-5 h-5" /> Imprimir Certificado
                            </button>
                            <button className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-200 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-slate-200 dark:hover:bg-white/10 transition-all">
                                <Download className="w-5 h-5" /> Descargar PDF
                            </button>
                            <button className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-200 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-slate-200 dark:hover:bg-white/10 transition-all">
                                <Share2 className="w-5 h-5" /> Compartir Logro
                            </button>
                        </div>
                    </div>

                    <p className="mt-auto text-[10px] text-slate-400 text-center italic">
                        La educación es el encendido de una llama, no el llenado de un recipiente.
                    </p>
                </div>
            </div>
        </div>
    );
};

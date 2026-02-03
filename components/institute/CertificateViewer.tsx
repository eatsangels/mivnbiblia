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
                        className="relative w-full max-w-4xl min-h-[800px] bg-white text-slate-900 shadow-2xl overflow-visible border-[12px] border-[#00BCD4] p-8 md:p-12 flex flex-col items-center justify-between text-center select-none print:shadow-none print:border-[10px]"
                    >
                        {/* Custom Course Template Background (if exists) */}
                        {certificate.course_template_url && (
                            <div className="absolute inset-0 z-0 pointer-events-none">
                                <Image
                                    src={certificate.course_template_url}
                                    alt="Plantilla del Diploma"
                                    fill
                                    className="object-cover opacity-100"
                                    priority
                                />
                            </div>
                        )}

                        {/* Certificate Body */}
                        <div className="relative z-10 w-full flex flex-col items-center gap-4 pt-6">
                            {/*Logo Header */}
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-16 h-16 relative">
                                    <Image src="/logo_mivn.png" alt="MIVN" fill className="object-contain" />
                                </div>
                                <div className="text-left">
                                    <h4 className="text-sm font-bold text-slate-700 leading-tight">Instituto MIVN</h4>
                                    <p className="text-xs text-slate-500">Ministerio de Vida Nueva</p>
                                </div>
                            </div>

                            {/* Diploma Title */}
                            <h1 className="text-3xl md:text-4xl font-black text-red-600 uppercase tracking-tight mb-2">
                                {certificate.title_text || 'CERTIFICADO DE ESTUDIOS'}
                            </h1>

                            {/* Introductory Text */}
                            <p className="text-xs text-slate-600">
                                {certificate.intro_text || 'El presente documento reconoce que'}
                            </p>

                            {/* Student Name */}

                            <h2 className={`
                                ${((studentName || certificate.student_name)?.length || 0) > 20 ? 'text-xl md:text-2xl' :
                                    ((studentName || certificate.student_name)?.length || 0) > 15 ? 'text-2xl md:text-3xl' :
                                        'text-3xl md:text-4xl'}
                                font-bold text-slate-900 tracking-tight my-2 break-words
                            `}>
                                {studentName || certificate.student_name || 'Estudiante'}
                            </h2>

                            {/* Membership Text */}
                            <p className="text-xs text-slate-600">
                                {certificate.member_text || 'es un miembro del programa académico'}
                            </p>

                            {/* Program Name */}
                            <h3 className="text-lg md:text-xl font-black text-slate-800 uppercase tracking-tight my-2 max-w-2xl">
                                {certificate.program_name || certificate.title}
                            </h3>

                            {/* Completion Text */}
                            <p className="text-xs text-slate-600 mb-2">
                                {certificate.completion_text || 'que incluye los cursos:'}
                            </p>

                            {/* Lessons List */}
                            {certificate.show_lessons && certificate.lessons_completed && certificate.lessons_completed.length > 0 && (
                                <div className="w-full max-w-xl">
                                    <ul className="text-xs text-slate-700 space-y-0.5 text-center leading-tight">
                                        {certificate.lessons_completed.map((lesson: string, index: number) => (
                                            <li key={index}>{lesson}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {/* Date Badge */}
                            <div className="bg-blue-50 rounded-lg px-6 py-3 mt-4">
                                <p className="text-[10px] text-slate-500 uppercase tracking-wide">Fecha de entrega:</p>
                                <p className="text-sm font-bold text-slate-800">
                                    {new Date(certificate.completion_date || certificate.issued_at).toLocaleDateString('es-ES', {
                                        day: 'numeric',
                                        month: 'long',
                                        year: 'numeric'
                                    })}
                                </p>
                            </div>
                        </div>

                        {/* Signatures Section */}
                        <div className="relative z-10 w-full flex justify-end mt-12 mb-8 pr-4">
                            <div className="flex items-center gap-16">
                                {/* Signer 1 */}
                                {certificate.signer1_name && (
                                    <div className="flex flex-col items-center min-w-[180px]">
                                        <div className="w-full border-t-2 border-slate-900 mb-3"></div>
                                        <p className="text-sm font-bold text-slate-900 whitespace-nowrap">{certificate.signer1_name}</p>
                                        {certificate.signer1_title && (
                                            <p className="text-xs text-slate-500 font-medium mt-1 whitespace-nowrap">{certificate.signer1_title}</p>
                                        )}
                                    </div>
                                )}

                                {/* Seal */}
                                {certificate.seal_url && (
                                    <div className="flex justify-center items-center">
                                        <div className="w-24 h-24 relative">
                                            <Image src={certificate.seal_url} alt="Sello" fill className="object-contain" />
                                        </div>
                                    </div>
                                )}

                                {/* Signer 2 */}
                                {certificate.signer2_name && (
                                    <div className="flex flex-col items-center min-w-[180px]">
                                        <div className="w-full border-t-2 border-slate-900 mb-3"></div>
                                        <p className="text-sm font-bold text-slate-900 whitespace-nowrap">{certificate.signer2_name}</p>
                                        {certificate.signer2_title && (
                                            <p className="text-xs text-slate-500 font-medium mt-1 whitespace-nowrap">{certificate.signer2_title}</p>
                                        )}
                                    </div>
                                )}
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

                    <div className="mt-auto space-y-4">
                        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 shadow-sm animate-pulse-subtle">
                            <div className="flex gap-3">
                                <ShieldCheck className="w-5 h-5 text-amber-600 shrink-0" />
                                <div className="space-y-1">
                                    <p className="text-xs font-black text-amber-900 uppercase tracking-tight">Nota de Validez</p>
                                    <p className="text-xs text-amber-800 leading-normal font-medium">
                                        Para que este documento sea válido, debe contar con la <span className="font-bold underline">firma manuscrita</span> de ambos pastores y el sello oficial de la institución.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <p className="text-[10px] text-slate-400 text-center italic">
                            La educación es el encendido de una llama, no el llenado de un recipiente.
                        </p>
                    </div>
                </div>
            </div>
        </div >
    );
};

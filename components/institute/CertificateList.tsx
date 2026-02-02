"use client";

import { useState } from "react";
import { Award, Clock, ArrowRight } from "lucide-react";
import { CertificateViewer } from "./CertificateViewer";

interface CertificateListProps {
    certificates: any[];
}

export const CertificateList = ({ certificates }: CertificateListProps) => {
    const [selectedCert, setSelectedCert] = useState<any | null>(null);

    return (
        <section className="bg-white dark:bg-[#0A0F1D] p-10 rounded-[3rem] border border-slate-200 dark:border-white/5 shadow-2xl">
            <div className="flex items-center gap-4 mb-10">
                <div className="p-3 bg-mivn-blue/10 rounded-2xl text-mivn-blue">
                    <Award className="w-8 h-8" />
                </div>
                <div>
                    <h2 className="text-2xl font-black text-slate-800 dark:text-white uppercase tracking-tight">Certificados Obtenidos</h2>
                    <p className="text-xs text-slate-500 font-medium italic">Tus logros académicos y ministeriales.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {certificates.length === 0 ? (
                    <div className="col-span-full py-12 border-2 border-dashed border-slate-100 dark:border-white/5 rounded-[2rem] text-center">
                        <Award className="w-12 h-12 text-slate-200 dark:text-slate-800 mx-auto mb-4" />
                        <p className="text-slate-400 text-sm font-medium">Aún no has obtenido certificados.</p>
                    </div>
                ) : (
                    certificates.map((cert, i) => (
                        <div
                            key={cert.id}
                            className="group relative cursor-pointer"
                            onClick={() => setSelectedCert(cert)}
                        >
                            <div className="aspect-[1.4/1] bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-2xl flex flex-col items-center justify-center p-6 transition-all duration-500 group-hover:bg-mivn-blue group-hover:-translate-y-2 shadow-sm hover:shadow-2xl hover:shadow-mivn-blue/20">
                                <div className="mb-4 text-mivn-blue group-hover:text-white transition-colors">
                                    <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z" />
                                    </svg>
                                </div>
                                <p className="text-xs font-black text-center text-slate-800 dark:text-white group-hover:text-white uppercase tracking-tight line-clamp-2">{cert.title}</p>
                                <div className="mt-4 flex items-center gap-2 text-[9px] font-bold text-slate-400 group-hover:text-white/70 uppercase tracking-widest">
                                    <Clock className="w-3 h-3" /> {new Date(cert.issued_at || '').toLocaleDateString('es-ES', { month: 'short', year: 'numeric' })}
                                </div>
                            </div>
                        </div>
                    ))
                )}

                {certificates.length > 0 && (
                    <div className="flex items-center justify-center border-2 border-dashed border-slate-200 dark:border-white/10 rounded-2xl aspect-[1.4/1] hover:border-mivn-blue transition-all cursor-pointer group bg-transparent hover:bg-mivn-blue/5">
                        <div className="text-center">
                            <div className="text-slate-300 group-hover:text-mivn-blue mb-2 transition-colors">
                                <ArrowRight className="w-8 h-8 mx-auto" />
                            </div>
                            <p className="text-[10px] font-black text-slate-400 group-hover:text-mivn-blue uppercase tracking-widest">Ver todos</p>
                        </div>
                    </div>
                )}
            </div>

            {selectedCert && (
                <CertificateViewer
                    certificate={selectedCert}
                    onClose={() => setSelectedCert(null)}
                />
            )}
        </section>
    );
};

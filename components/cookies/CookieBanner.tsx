"use client";

import { useState } from "react";
import { useCookieConsent } from "@/contexts/CookieContext";
import { Cookie, X, Settings } from "lucide-react";
import { CookieSettings } from "./CookieSettings";
import Link from "next/link";

export function CookieBanner() {
    const { hasConsent, acceptAll, acceptEssential } = useCookieConsent();
    const [showSettings, setShowSettings] = useState(false);

    if (hasConsent) return null;

    return (
        <>
            <div className="fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-[#0a0f1d] border-t border-slate-200 dark:border-slate-800 shadow-2xl animate-in slide-in-from-bottom duration-300">
                <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        {/* Icon & Message */}
                        <div className="flex items-start gap-3 flex-1">
                            <Cookie className="w-6 h-6 text-mivn-blue flex-shrink-0 mt-0.5" />
                            <div className="flex-1">
                                <h3 className="font-semibold text-slate-900 dark:text-white mb-1">
                                    Usamos cookies
                                </h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400">
                                    Utilizamos cookies esenciales para el funcionamiento del sitio y opcionales para mejorar tu experiencia.{" "}
                                    <Link href="/politica-de-cookies" className="text-mivn-blue hover:underline">
                                        Más información
                                    </Link>
                                </p>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
                            <button
                                onClick={() => setShowSettings(true)}
                                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                            >
                                <Settings className="w-4 h-4" />
                                Configurar
                            </button>
                            <button
                                onClick={acceptEssential}
                                className="px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                            >
                                Solo esenciales
                            </button>
                            <button
                                onClick={acceptAll}
                                className="px-6 py-2 text-sm font-semibold text-white bg-mivn-blue hover:bg-mivn-blue/90 rounded-lg transition-all shadow-lg shadow-mivn-blue/20"
                            >
                                Aceptar todas
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {showSettings && <CookieSettings onClose={() => setShowSettings(false)} />}
        </>
    );
}

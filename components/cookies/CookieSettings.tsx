"use client";

import { useState } from "react";
import { useCookieConsent } from "@/contexts/CookieContext";
import { X, Shield, BarChart3, Megaphone, Check } from "lucide-react";
import { CookiePreferences } from "@/lib/cookies";

interface CookieSettingsProps {
    onClose: () => void;
}

export function CookieSettings({ onClose }: CookieSettingsProps) {
    const { preferences, updatePreferences, acceptAll } = useCookieConsent();
    const [localPrefs, setLocalPrefs] = useState<CookiePreferences>(preferences);

    const handleSave = () => {
        updatePreferences(localPrefs);
        onClose();
    };

    const handleAcceptAll = () => {
        acceptAll();
        onClose();
    };

    const toggleCategory = (category: keyof CookiePreferences) => {
        if (category === 'essential' || category === 'timestamp') return; // Can't disable essential
        setLocalPrefs(prev => ({
            ...prev,
            [category]: !prev[category],
        }));
    };

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white dark:bg-[#0a0f1d] rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden animate-in zoom-in-95 duration-200">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-800">
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                        Configuración de Cookies
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                    >
                        <X className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 overflow-y-auto max-h-[calc(90vh-180px)]">
                    <p className="text-slate-600 dark:text-slate-400 mb-6">
                        Gestiona tus preferencias de cookies. Las cookies esenciales son necesarias para el funcionamiento del sitio y no pueden desactivarse.
                    </p>

                    <div className="space-y-4">
                        {/* Essential Cookies */}
                        <div className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-800">
                            <div className="flex items-start justify-between mb-2">
                                <div className="flex items-center gap-3">
                                    <Shield className="w-5 h-5 text-green-500" />
                                    <div>
                                        <h3 className="font-semibold text-slate-900 dark:text-white">
                                            Cookies Esenciales
                                        </h3>
                                        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                                            Necesarias para autenticación, seguridad y funcionamiento básico del sitio.
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 text-sm font-medium text-green-600 dark:text-green-400">
                                    <Check className="w-4 h-4" />
                                    Siempre activas
                                </div>
                            </div>
                        </div>

                        {/* Analytics Cookies */}
                        <div className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-800">
                            <div className="flex items-start justify-between mb-2">
                                <div className="flex items-center gap-3 flex-1">
                                    <BarChart3 className="w-5 h-5 text-blue-500" />
                                    <div>
                                        <h3 className="font-semibold text-slate-900 dark:text-white">
                                            Cookies de Análisis
                                        </h3>
                                        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                                            Nos ayudan a entender cómo los visitantes interactúan con el sitio para mejorarlo.
                                        </p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => toggleCategory('analytics')}
                                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${localPrefs.analytics ? 'bg-mivn-blue' : 'bg-slate-300 dark:bg-slate-700'
                                        }`}
                                >
                                    <span
                                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${localPrefs.analytics ? 'translate-x-6' : 'translate-x-1'
                                            }`}
                                    />
                                </button>
                            </div>
                        </div>

                        {/* Marketing Cookies */}
                        <div className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-800">
                            <div className="flex items-start justify-between mb-2">
                                <div className="flex items-center gap-3 flex-1">
                                    <Megaphone className="w-5 h-5 text-purple-500" />
                                    <div>
                                        <h3 className="font-semibold text-slate-900 dark:text-white">
                                            Cookies de Marketing
                                        </h3>
                                        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                                            Utilizadas para mostrar contenido relevante y personalizado.
                                        </p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => toggleCategory('marketing')}
                                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${localPrefs.marketing ? 'bg-mivn-blue' : 'bg-slate-300 dark:bg-slate-700'
                                        }`}
                                >
                                    <span
                                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${localPrefs.marketing ? 'translate-x-6' : 'translate-x-1'
                                            }`}
                                    />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-end gap-3 p-6 border-t border-slate-200 dark:border-slate-800">
                    <button
                        onClick={handleSave}
                        className="px-6 py-2.5 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                    >
                        Guardar preferencias
                    </button>
                    <button
                        onClick={handleAcceptAll}
                        className="px-6 py-2.5 text-sm font-semibold text-white bg-mivn-blue hover:bg-mivn-blue/90 rounded-lg transition-all shadow-lg shadow-mivn-blue/20"
                    >
                        Aceptar todas
                    </button>
                </div>
            </div>
        </div>
    );
}

"use client";

import { useState } from "react";
import { Palette, Layout, Share2, Phone, Save, RotateCcw, Loader2 } from "lucide-react";
import { ColorPicker } from "./ColorPicker";
import { LogoUploader } from "./LogoUploader";
import { updateWebSettings, resetToDefaults, type WebSettings } from "@/app/(estudio)/admin/gestion-web/actions";
import { toast } from "sonner";

interface WebManagementTabsProps {
    initialSettings: WebSettings;
}

export function WebManagementTabs({ initialSettings }: WebManagementTabsProps) {
    const [activeTab, setActiveTab] = useState<'visual' | 'footer' | 'social' | 'contact'>('visual');
    const [settings, setSettings] = useState<WebSettings>(initialSettings);
    const [saving, setSaving] = useState(false);
    const [resetting, setResetting] = useState(false);

    const tabs = [
        { id: 'visual' as const, label: 'Identidad Visual', icon: Palette },
        { id: 'footer' as const, label: 'Footer', icon: Layout },
        { id: 'social' as const, label: 'Redes Sociales', icon: Share2 },
        { id: 'contact' as const, label: 'Contacto', icon: Phone },
    ];

    const handleSave = async () => {
        setSaving(true);
        try {
            await updateWebSettings(settings);
            toast.success('Configuración guardada correctamente');
        } catch (error) {
            console.error('Error saving settings:', error);
            toast.error('Error al guardar la configuración');
        } finally {
            setSaving(false);
        }
    };

    const handleReset = async () => {
        if (!confirm('¿Estás seguro de que quieres restaurar los valores por defecto? Esta acción no se puede deshacer.')) {
            return;
        }

        setResetting(true);
        try {
            await resetToDefaults();
            toast.success('Configuración restaurada a valores por defecto');
            window.location.reload();
        } catch (error) {
            console.error('Error resetting settings:', error);
            toast.error('Error al restaurar la configuración');
        } finally {
            setResetting(false);
        }
    };

    const updateSetting = (key: keyof WebSettings, value: string) => {
        setSettings(prev => ({ ...prev, [key]: value }));
    };

    return (
        <div className="flex flex-col h-full">
            {/* Tabs Header */}
            <div className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/50">
                <div className="flex overflow-x-auto">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-3 px-8 py-5 font-bold text-sm transition-all whitespace-nowrap ${activeTab === tab.id
                                    ? 'text-mivn-blue border-b-2 border-mivn-blue bg-white dark:bg-slate-900'
                                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                                }`}
                        >
                            <tab.icon className="w-5 h-5" />
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Tab Content */}
            <div className="flex-1 p-8 md:p-12 overflow-y-auto">
                {activeTab === 'visual' && (
                    <div className="max-w-4xl space-y-12">
                        <div>
                            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                                Identidad Visual
                            </h2>
                            <p className="text-slate-600 dark:text-slate-400">
                                Personaliza el logo y los colores del tema de tu sitio web
                            </p>
                        </div>

                        {/* Logos */}
                        <div className="space-y-8">
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                                Logos
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <LogoUploader
                                    label="Logo Principal"
                                    currentUrl={settings.logo_url || '/logo_mivn.png'}
                                    type="main"
                                    onUploadComplete={(url) => updateSetting('logo_url', url)}
                                />
                                <LogoUploader
                                    label="Logo del Footer"
                                    currentUrl={settings.logo_footer_url || '/logo_mivn.png'}
                                    type="footer"
                                    onUploadComplete={(url) => updateSetting('logo_footer_url', url)}
                                />
                            </div>
                        </div>

                        {/* Colors */}
                        <div className="space-y-8">
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                                Colores del Tema
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <ColorPicker
                                    label="Color Primario (Azul MIVN)"
                                    value={settings.primary_color || '#4AA3DF'}
                                    onChange={(color) => updateSetting('primary_color', color)}
                                    description="Color principal usado en botones, enlaces y elementos destacados"
                                />
                                <ColorPicker
                                    label="Color Secundario (Dorado)"
                                    value={settings.secondary_color || '#D4AF37'}
                                    onChange={(color) => updateSetting('secondary_color', color)}
                                    description="Color de acento usado para elementos especiales"
                                />
                                <ColorPicker
                                    label="Fondo Modo Claro"
                                    value={settings.background_light || '#FDFDFF'}
                                    onChange={(color) => updateSetting('background_light', color)}
                                    description="Color de fondo principal en modo claro"
                                />
                                <ColorPicker
                                    label="Fondo Modo Oscuro"
                                    value={settings.background_dark || '#0A0F1D'}
                                    onChange={(color) => updateSetting('background_dark', color)}
                                    description="Color de fondo principal en modo oscuro"
                                />
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'footer' && (
                    <div className="max-w-4xl space-y-12">
                        <div>
                            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                                Personalización del Footer
                            </h2>
                            <p className="text-slate-600 dark:text-slate-400">
                                Configura los colores y el contenido del pie de página
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <ColorPicker
                                label="Color de Fondo del Footer"
                                value={settings.footer_bg_color || '#4AA3DF'}
                                onChange={(color) => updateSetting('footer_bg_color', color)}
                                description="Color de fondo de la sección principal del footer"
                            />
                            <ColorPicker
                                label="Color del Texto"
                                value={settings.footer_text_color || '#FFFFFF'}
                                onChange={(color) => updateSetting('footer_text_color', color)}
                                description="Color del texto en el footer"
                            />
                            <ColorPicker
                                label="Color de Fondo Inferior"
                                value={settings.footer_bottom_bg || '#0f172a'}
                                onChange={(color) => updateSetting('footer_bottom_bg', color)}
                                description="Color de la barra de copyright"
                            />
                        </div>

                        {/* Service Times */}
                        <div className="space-y-6">
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                                Horarios de Culto
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                                        Horario Domingo
                                    </label>
                                    <input
                                        type="text"
                                        value={settings.service_time_sunday || ''}
                                        onChange={(e) => updateSetting('service_time_sunday', e.target.value)}
                                        placeholder="10:00 AM"
                                        className="w-full px-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-mivn-blue"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                                        Horario Miércoles
                                    </label>
                                    <input
                                        type="text"
                                        value={settings.service_time_wednesday || ''}
                                        onChange={(e) => updateSetting('service_time_wednesday', e.target.value)}
                                        placeholder="7:00 PM"
                                        className="w-full px-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-mivn-blue"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'social' && (
                    <div className="max-w-4xl space-y-12">
                        <div>
                            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                                Redes Sociales
                            </h2>
                            <p className="text-slate-600 dark:text-slate-400">
                                Configura los enlaces a tus redes sociales
                            </p>
                        </div>

                        <div className="space-y-6">
                            {[
                                { key: 'facebook_url', label: 'Facebook', placeholder: 'https://facebook.com/tu-pagina' },
                                { key: 'instagram_url', label: 'Instagram', placeholder: 'https://instagram.com/tu-cuenta' },
                                { key: 'youtube_url', label: 'YouTube', placeholder: 'https://youtube.com/@tu-canal' },
                            ].map((social) => (
                                <div key={social.key}>
                                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                                        {social.label}
                                    </label>
                                    <input
                                        type="url"
                                        value={settings[social.key as keyof WebSettings] || ''}
                                        onChange={(e) => updateSetting(social.key as keyof WebSettings, e.target.value)}
                                        placeholder={social.placeholder}
                                        className="w-full px-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-mivn-blue"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {activeTab === 'contact' && (
                    <div className="max-w-4xl space-y-12">
                        <div>
                            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                                Información de Contacto
                            </h2>
                            <p className="text-slate-600 dark:text-slate-400">
                                Configura la información de contacto que aparecerá en el sitio
                            </p>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                                    Nombre del Sitio
                                </label>
                                <input
                                    type="text"
                                    value={settings.site_name || ''}
                                    onChange={(e) => updateSetting('site_name', e.target.value)}
                                    placeholder="MIVN"
                                    className="w-full px-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-mivn-blue"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                                    Lema del Sitio
                                </label>
                                <input
                                    type="text"
                                    value={settings.site_tagline || ''}
                                    onChange={(e) => updateSetting('site_tagline', e.target.value)}
                                    placeholder="Transformando vidas a través del amor de Cristo"
                                    className="w-full px-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-mivn-blue"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                                    Dirección
                                </label>
                                <textarea
                                    value={settings.address || ''}
                                    onChange={(e) => updateSetting('address', e.target.value)}
                                    placeholder="Calle Principal #123, Ciudad, País"
                                    rows={3}
                                    className="w-full px-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-mivn-blue"
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                                        Teléfono
                                    </label>
                                    <input
                                        type="tel"
                                        value={settings.contact_phone || ''}
                                        onChange={(e) => updateSetting('contact_phone', e.target.value)}
                                        placeholder="+1 (555) 123-4567"
                                        className="w-full px-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-mivn-blue"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        value={settings.contact_email || ''}
                                        onChange={(e) => updateSetting('contact_email', e.target.value)}
                                        placeholder="contacto@mivn.org"
                                        className="w-full px-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-mivn-blue"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Action Buttons */}
            <div className="border-t border-slate-200 dark:border-slate-800 p-6 bg-slate-50 dark:bg-slate-950/50">
                <div className="flex justify-between items-center max-w-4xl mx-auto">
                    <button
                        onClick={handleReset}
                        disabled={resetting || saving}
                        className="px-6 py-3 bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-xl font-bold hover:bg-slate-300 dark:hover:bg-slate-700 transition-all flex items-center gap-2 disabled:opacity-50"
                    >
                        {resetting ? (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin" />
                                Restaurando...
                            </>
                        ) : (
                            <>
                                <RotateCcw className="w-5 h-5" />
                                Restaurar Valores por Defecto
                            </>
                        )}
                    </button>

                    <button
                        onClick={handleSave}
                        disabled={saving || resetting}
                        className="px-8 py-3 bg-mivn-blue text-white rounded-xl font-bold hover:bg-sky-600 transition-all flex items-center gap-2 disabled:opacity-50 shadow-lg shadow-mivn-blue/20"
                    >
                        {saving ? (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin" />
                                Guardando...
                            </>
                        ) : (
                            <>
                                <Save className="w-5 h-5" />
                                Guardar Cambios
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}

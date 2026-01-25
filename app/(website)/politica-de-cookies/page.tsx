import Link from "next/link";
import { Cookie, Shield, BarChart3, Megaphone, Mail } from "lucide-react";

export default function CookiePolicyPage() {
    return (
        <div className="min-h-screen bg-[#FDFDFF] dark:bg-[#0A0F1D] py-16">
            <div className="max-w-4xl mx-auto px-6">
                {/* Header */}
                <div className="mb-12">
                    <div className="flex items-center gap-3 mb-4">
                        <Cookie className="w-10 h-10 text-mivn-blue" />
                        <h1 className="text-4xl font-bold text-slate-900 dark:text-white">
                            Política de Cookies
                        </h1>
                    </div>
                    <p className="text-slate-600 dark:text-slate-400">
                        Última actualización: {new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </p>
                </div>

                {/* Introduction */}
                <section className="mb-12">
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                        ¿Qué son las cookies?
                    </h2>
                    <p className="text-slate-700 dark:text-slate-300 mb-4">
                        Las cookies son pequeños archivos de texto que se almacenan en tu dispositivo cuando visitas nuestro sitio web.
                        Nos ayudan a mejorar tu experiencia, recordar tus preferencias y entender cómo utilizas nuestro sitio.
                    </p>
                </section>

                {/* Cookie Types */}
                <section className="mb-12">
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
                        Tipos de cookies que utilizamos
                    </h2>

                    <div className="space-y-6">
                        {/* Essential */}
                        <div className="p-6 bg-white dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-800">
                            <div className="flex items-start gap-4">
                                <Shield className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                                <div>
                                    <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                                        Cookies Esenciales
                                    </h3>
                                    <p className="text-slate-700 dark:text-slate-300 mb-3">
                                        Estas cookies son necesarias para el funcionamiento básico del sitio y no pueden desactivarse.
                                    </p>
                                    <ul className="list-disc list-inside text-slate-600 dark:text-slate-400 space-y-1">
                                        <li>Autenticación y gestión de sesiones</li>
                                        <li>Seguridad y prevención de fraude</li>
                                        <li>Preferencias de tema (modo claro/oscuro)</li>
                                        <li>Recordar tu consentimiento de cookies</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Analytics */}
                        <div className="p-6 bg-white dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-800">
                            <div className="flex items-start gap-4">
                                <BarChart3 className="w-6 h-6 text-blue-500 flex-shrink-0 mt-1" />
                                <div>
                                    <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                                        Cookies de Análisis
                                    </h3>
                                    <p className="text-slate-700 dark:text-slate-300 mb-3">
                                        Nos ayudan a entender cómo los visitantes interactúan con nuestro sitio web.
                                    </p>
                                    <ul className="list-disc list-inside text-slate-600 dark:text-slate-400 space-y-1">
                                        <li>Páginas más visitadas</li>
                                        <li>Tiempo de permanencia en el sitio</li>
                                        <li>Fuentes de tráfico</li>
                                        <li>Errores técnicos y rendimiento</li>
                                    </ul>
                                    <p className="text-sm text-slate-500 dark:text-slate-500 mt-3">
                                        Puedes desactivar estas cookies en cualquier momento desde la configuración.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Marketing */}
                        <div className="p-6 bg-white dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-800">
                            <div className="flex items-start gap-4">
                                <Megaphone className="w-6 h-6 text-purple-500 flex-shrink-0 mt-1" />
                                <div>
                                    <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                                        Cookies de Marketing
                                    </h3>
                                    <p className="text-slate-700 dark:text-slate-300 mb-3">
                                        Utilizadas para mostrar contenido y anuncios relevantes.
                                    </p>
                                    <ul className="list-disc list-inside text-slate-600 dark:text-slate-400 space-y-1">
                                        <li>Personalización de contenido</li>
                                        <li>Seguimiento de conversiones</li>
                                        <li>Publicidad dirigida</li>
                                    </ul>
                                    <p className="text-sm text-slate-500 dark:text-slate-500 mt-3">
                                        Puedes desactivar estas cookies en cualquier momento desde la configuración.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Managing Cookies */}
                <section className="mb-12">
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                        Gestión de cookies
                    </h2>
                    <p className="text-slate-700 dark:text-slate-300 mb-4">
                        Puedes gestionar tus preferencias de cookies en cualquier momento:
                    </p>
                    <ul className="list-disc list-inside text-slate-700 dark:text-slate-300 space-y-2 mb-6">
                        <li>Usando el banner de cookies que aparece en tu primera visita</li>
                        <li>Accediendo a la configuración de cookies desde el pie de página</li>
                        <li>Configurando tu navegador para bloquear o eliminar cookies</li>
                    </ul>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                        Ten en cuenta que bloquear ciertas cookies puede afectar la funcionalidad del sitio.
                    </p>
                </section>

                {/* Legal Compliance */}
                <section className="mb-12">
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                        Cumplimiento legal
                    </h2>
                    <p className="text-slate-700 dark:text-slate-300 mb-4">
                        Nuestra política de cookies cumple con:
                    </p>
                    <ul className="list-disc list-inside text-slate-700 dark:text-slate-300 space-y-2">
                        <li><strong>GDPR</strong> (Reglamento General de Protección de Datos de la UE)</li>
                        <li><strong>CCPA</strong> (Ley de Privacidad del Consumidor de California)</li>
                        <li><strong>FTC Act</strong> (Ley de la Comisión Federal de Comercio de EE.UU.)</li>
                    </ul>
                </section>

                {/* Contact */}
                <section className="p-6 bg-mivn-blue/5 dark:bg-mivn-blue/10 rounded-xl border border-mivn-blue/20">
                    <div className="flex items-start gap-4">
                        <Mail className="w-6 h-6 text-mivn-blue flex-shrink-0 mt-1" />
                        <div>
                            <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                                ¿Tienes preguntas?
                            </h3>
                            <p className="text-slate-700 dark:text-slate-300 mb-4">
                                Si tienes alguna pregunta sobre nuestra política de cookies o cómo manejamos tus datos,
                                no dudes en contactarnos.
                            </p>
                            <Link
                                href="/contacto"
                                className="inline-flex items-center gap-2 text-mivn-blue hover:underline font-medium"
                            >
                                Contáctanos →
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Back Link */}
                <div className="mt-12 text-center">
                    <Link
                        href="/"
                        className="text-mivn-blue hover:underline font-medium"
                    >
                        ← Volver al inicio
                    </Link>
                </div>
            </div>
        </div>
    );
}

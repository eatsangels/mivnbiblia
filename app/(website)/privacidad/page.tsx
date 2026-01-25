import { Shield, Lock, Eye, Menu, Info, Settings, Verified, Mail, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Política de Privacidad | Ministerio Internacional Vida Nueva",
    description: "Conozca cómo protegemos, usamos y gestionamos sus datos personales en MIVN.",
};

export default function PrivacyPage() {
    return (
        <div className="max-w-7xl mx-auto px-4 md:px-10 lg:px-20 py-24">
            {/* Headline Section */}
            <div className="mb-20 text-center space-y-4">
                <h1 className="text-4xl md:text-5xl font-playfair font-bold text-slate-900 dark:text-white leading-tight">
                    Política de Privacidad
                </h1>
                <div className="w-24 h-1.5 bg-mivn-gold mx-auto rounded-full" />
                <p className="text-slate-500 dark:text-slate-400 font-medium pt-2">
                    Última actualización: 12 de octubre de 2023
                </p>
            </div>

            {/* Privacy Grid / Key Points */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
                <div className="flex flex-col gap-6 rounded-[2rem] border border-slate-200 dark:border-white/5 bg-white dark:bg-slate-900/50 p-8 shadow-xl shadow-slate-200/50 dark:shadow-none hover:-translate-y-1 transition-transform duration-300">
                    <div className="text-mivn-blue p-3 bg-mivn-blue/10 w-fit rounded-2xl">
                        <Shield className="w-8 h-8" />
                    </div>
                    <div className="space-y-2">
                        <h2 className="text-xl font-bold text-slate-900 dark:text-white">Datos Protegidos</h2>
                        <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                            Implementamos seguridad de nivel institucional para proteger su información personal.
                        </p>
                    </div>
                </div>

                <div className="flex flex-col gap-6 rounded-[2rem] border border-slate-200 dark:border-white/5 bg-white dark:bg-slate-900/50 p-8 shadow-xl shadow-slate-200/50 dark:shadow-none hover:-translate-y-1 transition-transform duration-300">
                    <div className="text-mivn-blue p-3 bg-mivn-blue/10 w-fit rounded-2xl">
                        <Lock className="w-8 h-8" />
                    </div>
                    <div className="space-y-2">
                        <h2 className="text-xl font-bold text-slate-900 dark:text-white">No Compartimos Info</h2>
                        <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                            Su información es privada. Jamás vendemos sus datos a terceros ni fines comerciales.
                        </p>
                    </div>
                </div>

                <div className="flex flex-col gap-6 rounded-[2rem] border border-slate-200 dark:border-white/5 bg-white dark:bg-slate-900/50 p-8 shadow-xl shadow-slate-200/50 dark:shadow-none hover:-translate-y-1 transition-transform duration-300">
                    <div className="text-mivn-blue p-3 bg-mivn-blue/10 w-fit rounded-2xl">
                        <Eye className="w-8 h-8" />
                    </div>
                    <div className="space-y-2">
                        <h2 className="text-xl font-bold text-slate-900 dark:text-white">Uso Transparente</h2>
                        <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                            Claridad total sobre el uso de su información dentro de nuestras actividades ministeriales.
                        </p>
                    </div>
                </div>
            </div>

            {/* Main Layout with Sidebar and Content */}
            <div className="flex flex-col lg:flex-row gap-16 relative">
                {/* Side Navigation */}
                <aside className="lg:w-1/4 hidden lg:block">
                    <div className="sticky top-32 flex flex-col gap-6 bg-white dark:bg-slate-900/50 p-6 rounded-3xl border border-slate-200 dark:border-white/5 backdrop-blur-xl">
                        <div className="flex gap-3 items-center border-b border-slate-100 dark:border-white/5 pb-4">
                            <Menu className="text-mivn-blue w-5 h-5" />
                            <div className="flex flex-col">
                                <h3 className="text-slate-900 dark:text-white text-sm font-black uppercase tracking-widest">
                                    Secciones
                                </h3>
                            </div>
                        </div>
                        <nav className="flex flex-col gap-2">
                            <Link className="flex items-center gap-3 px-4 py-3 rounded-xl bg-mivn-blue/10 text-mivn-blue font-bold text-sm transition-all" href="#recopilacion">
                                <Info className="w-4 h-4" />
                                Información Recopilada
                            </Link>
                            <Link className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-white/5 font-medium text-sm transition-all" href="#uso">
                                <Settings className="w-4 h-4" />
                                Uso de Datos
                            </Link>
                            <Link className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-white/5 font-medium text-sm transition-all" href="#derechos">
                                <Verified className="w-4 h-4" />
                                Derechos del Usuario
                            </Link>
                            <Link className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-white/5 font-medium text-sm transition-all" href="#seguridad">
                                <Lock className="w-4 h-4" />
                                Seguridad
                            </Link>
                        </nav>
                    </div>
                </aside>

                {/* Content Area */}
                <div className="lg:w-3/4 space-y-16">
                    <section className="scroll-mt-32" id="recopilacion">
                        <h2 className="text-2xl font-playfair font-bold mb-6 flex items-center gap-3 text-slate-900 dark:text-white">
                            <span className="w-1.5 h-8 bg-mivn-gold rounded-full" />
                            1. Información que Recopilamos
                        </h2>
                        <div className="prose prose-slate dark:prose-invert max-w-none text-slate-600 dark:text-slate-300 leading-loose">
                            <p className="mb-6 text-lg">
                                En el Ministerio Internacional Vida Nueva (MIVN), recolectamos información que usted nos proporciona voluntariamente cuando se registra en nuestra plataforma, se une a un ministerio, realiza una donación o se suscribe a nuestro boletín informativo.
                            </p>
                            <ul className="space-y-4 list-none pl-0">
                                <li className="flex items-start gap-3">
                                    <CheckCircle2 className="w-5 h-5 text-mivn-blue shrink-0 mt-1" />
                                    <span><strong>Datos de Identificación:</strong> Nombre, apellidos, dirección de correo electrónico y número de teléfono.</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircle2 className="w-5 h-5 text-mivn-blue shrink-0 mt-1" />
                                    <span><strong>Información de Donaciones:</strong> Historial de contribuciones y datos de facturación procesados de forma segura.</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircle2 className="w-5 h-5 text-mivn-blue shrink-0 mt-1" />
                                    <span><strong>Participación:</strong> Preferencias de ministerios y eventos en los que participa.</span>
                                </li>
                            </ul>
                        </div>
                    </section>

                    <section className="scroll-mt-32" id="uso">
                        <h2 className="text-2xl font-playfair font-bold mb-6 flex items-center gap-3 text-slate-900 dark:text-white">
                            <span className="w-1.5 h-8 bg-mivn-gold rounded-full" />
                            2. Cómo usamos sus datos
                        </h2>
                        <div className="text-slate-600 dark:text-slate-300 leading-loose">
                            <p className="mb-6 text-lg">
                                Utilizamos la información recopilada exclusivamente para fines espirituales, administrativos y de comunicación relacionados con nuestra misión:
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
                                <div className="p-6 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/5 rounded-2xl hover:border-mivn-blue/30 transition-colors">
                                    <h4 className="font-bold text-mivn-blue mb-2 text-lg">Comunicación</h4>
                                    <p className="text-sm">Envío de actualizaciones ministeriales y anuncios de eventos.</p>
                                </div>
                                <div className="p-6 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/5 rounded-2xl hover:border-mivn-blue/30 transition-colors">
                                    <h4 className="font-bold text-mivn-blue mb-2 text-lg">Gestión</h4>
                                    <p className="text-sm">Administración de su participación en ministerios y voluntariado.</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="scroll-mt-32" id="derechos">
                        <h2 className="text-2xl font-playfair font-bold mb-6 flex items-center gap-3 text-slate-900 dark:text-white">
                            <span className="w-1.5 h-8 bg-mivn-gold rounded-full" />
                            3. Derechos del Usuario
                        </h2>
                        <p className="text-slate-600 dark:text-slate-300 leading-loose mb-8 text-lg">
                            Usted tiene el control total sobre su información personal. En cumplimiento con las regulaciones internacionales de protección de datos, garantizamos los siguientes derechos:
                        </p>
                        <div className="space-y-4">
                            <div className="flex items-start gap-5 p-6 rounded-3xl border border-mivn-blue/20 bg-mivn-blue/5">
                                <div className="p-2 bg-white rounded-xl shadow-sm text-mivn-blue">
                                    <Settings className="w-6 h-6" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-900 dark:text-white text-lg mb-1">Acceso y Rectificación</h4>
                                    <p className="text-sm text-slate-600 dark:text-slate-400">Puede solicitar ver qué datos tenemos sobre usted y corregir cualquier error en cualquier momento.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-5 p-6 rounded-3xl border border-red-200 bg-red-50 dark:bg-red-900/10 dark:border-red-900/30">
                                <div className="p-2 bg-white dark:bg-red-900/20 rounded-xl shadow-sm text-red-500">
                                    <Shield className="w-6 h-6" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-900 dark:text-white text-lg mb-1">Eliminación (Derecho al Olvido)</h4>
                                    <p className="text-sm text-slate-600 dark:text-slate-400">Puede solicitar que eliminemos permanentemente sus datos personales de nuestros sistemas.</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="scroll-mt-32" id="seguridad">
                        <h2 className="text-2xl font-playfair font-bold mb-6 flex items-center gap-3 text-slate-900 dark:text-white">
                            <span className="w-1.5 h-8 bg-mivn-gold rounded-full" />
                            4. Seguridad de la Información
                        </h2>
                        <p className="text-slate-600 dark:text-slate-300 leading-loose text-lg">
                            MIVN emplea protocolos de cifrado SSL/TLS de 256 bits para todas las transmisiones de datos. Nuestras bases de datos están protegidas por firewalls de última generación y el acceso está restringido únicamente a personal autorizado con fines ministeriales específicos.
                        </p>
                    </section>

                    {/* Contact Section */}
                    <div className="bg-slate-900 rounded-[2.5rem] p-10 md:p-12 text-white relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-mivn-blue/20 rounded-full -mr-32 -mt-32 blur-3xl group-hover:bg-mivn-blue/30 transition-colors duration-1000" />

                        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                            <div className="text-center md:text-left space-y-2">
                                <h3 className="text-2xl md:text-3xl font-playfair font-bold">¿Dudas sobre su privacidad?</h3>
                                <p className="text-slate-400">Nuestro equipo de protección de datos está disponible para ayudarle.</p>
                            </div>
                            <a
                                href="mailto:privacidad@mivn.org"
                                className="flex items-center gap-3 bg-mivn-blue hover:bg-mivn-blue/90 px-8 py-4 rounded-xl font-bold transition-all transform hover:scale-105 shadow-xl shadow-mivn-blue/20"
                            >
                                <Mail className="w-5 h-5" />
                                privacidad@mivn.org
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Compliance Badges */}
            <div className="mt-32 pt-16 border-t border-slate-200 dark:border-white/5">
                <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20 opacity-40 grayscale hover:grayscale-0 transition-all duration-700">
                    <div className="flex flex-col items-center gap-3 group">
                        <Lock className="w-10 h-10 group-hover:text-mivn-blue transition-colors" />
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] group-hover:text-mivn-blue transition-colors">SSL Secure</span>
                    </div>
                    <div className="flex flex-col items-center gap-3 group">
                        <Shield className="w-10 h-10 group-hover:text-mivn-blue transition-colors" />
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] group-hover:text-mivn-blue transition-colors">GDPR Compliant</span>
                    </div>
                    <div className="flex flex-col items-center gap-3 group">
                        <Verified className="w-10 h-10 group-hover:text-mivn-blue transition-colors" />
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] group-hover:text-mivn-blue transition-colors">Data Privacy</span>
                    </div>
                    <div className="flex flex-col items-center gap-3 group">
                        <CheckCircle2 className="w-10 h-10 group-hover:text-mivn-blue transition-colors" />
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] group-hover:text-mivn-blue transition-colors">Global Standards</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

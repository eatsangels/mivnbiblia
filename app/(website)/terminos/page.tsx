import { Info, Monitor, Copyright, Heart, Scale, Download, Mail } from "lucide-react";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Términos y Condiciones | Ministerio Internacional Vida Nueva",
    description: "Términos y condiciones de uso del sitio web y servicios de MIVN.",
};

export default function TerminosPage() {
    return (
        <div className="max-w-7xl mx-auto px-4 md:px-10 lg:px-20 py-24">

            {/* Page Heading & Action */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
                <div className="max-w-2xl space-y-4">
                    <h1 className="text-4xl md:text-5xl font-playfair font-black text-slate-900 dark:text-white leading-tight">
                        Términos y <span className="text-mivn-blue">Condiciones</span>
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 text-lg">
                        Última actualización: <span className="font-bold text-mivn-blue">15 de Octubre, 2023</span>
                    </p>
                </div>
                <button className="flex items-center justify-center gap-3 rounded-xl bg-mivn-gold hover:bg-yellow-600 transition-all px-8 py-4 text-white font-bold shadow-xl shadow-mivn-gold/20 transform hover:-translate-y-1">
                    <Download className="w-5 h-5" />
                    <span>Descargar PDF</span>
                </button>
            </div>

            <div className="flex flex-col lg:flex-row gap-16 relative">
                {/* Side Navigation (Sticky Sidebar) */}
                <aside className="w-full lg:w-72 shrink-0 hidden lg:block">
                    <div className="sticky top-32 flex flex-col gap-6 bg-white dark:bg-slate-900/50 p-6 rounded-3xl border border-slate-200 dark:border-white/5 shadow-lg shadow-slate-200/50 dark:shadow-none">
                        <div className="border-b border-slate-100 dark:border-white/5 pb-4">
                            <h3 className="text-slate-900 dark:text-white text-sm font-black uppercase tracking-widest">
                                Contenido
                            </h3>
                            <p className="text-slate-400 text-[10px] font-medium mt-1">Navegar por el documento</p>
                        </div>
                        <nav className="flex flex-col gap-2">
                            <Link href="#introduccion" className="group flex items-center gap-3 px-4 py-3 rounded-xl bg-mivn-blue/10 text-mivn-blue transition-colors">
                                <Info className="w-4 h-4" />
                                <span className="text-sm font-bold">Introducción</span>
                            </Link>
                            <Link href="#uso-sitio" className="group flex items-center gap-3 px-4 py-3 rounded-xl text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
                                <Monitor className="w-4 h-4" />
                                <span className="text-sm font-medium group-hover:text-slate-900 dark:group-hover:text-white">Uso del Sitio</span>
                            </Link>
                            <Link href="#propiedad-intelectual" className="group flex items-center gap-3 px-4 py-3 rounded-xl text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
                                <Copyright className="w-4 h-4" />
                                <span className="text-sm font-medium group-hover:text-slate-900 dark:group-hover:text-white">Propiedad Intelectual</span>
                            </Link>
                            <Link href="#donaciones" className="group flex items-center gap-3 px-4 py-3 rounded-xl text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
                                <Heart className="w-4 h-4" />
                                <span className="text-sm font-medium group-hover:text-slate-900 dark:group-hover:text-white">Donaciones</span>
                            </Link>
                            <Link href="#responsabilidad" className="group flex items-center gap-3 px-4 py-3 rounded-xl text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
                                <Scale className="w-4 h-4" />
                                <span className="text-sm font-medium group-hover:text-slate-900 dark:group-hover:text-white">Responsabilidad</span>
                            </Link>
                        </nav>
                    </div>
                </aside>

                {/* Main Legal Content */}
                <article className="flex-1 bg-white dark:bg-slate-900/30 border border-slate-200 dark:border-white/5 rounded-[2.5rem] p-8 md:p-12 shadow-xl shadow-slate-200/50 dark:shadow-none">
                    <section className="scroll-mt-32 mb-16" id="introduccion">
                        <h2 className="text-2xl font-playfair font-bold text-slate-900 dark:text-white border-l-4 border-mivn-blue pl-6 mb-6">
                            1. Introducción
                        </h2>
                        <div className="text-slate-600 dark:text-slate-300 leading-loose space-y-6 text-lg">
                            <p>
                                Bienvenido al sitio web del Ministerio Internacional Vida Nueva (MIVN). Al acceder y utilizar este sitio, usted acepta cumplir con los siguientes términos y condiciones de uso, los cuales rigen nuestra relación con usted en relación con este sitio web.
                            </p>
                            <p>
                                MIVN se reserva el derecho de modificar estos términos en cualquier momento. El uso continuado del sitio tras la publicación de cambios implicará su aceptación de dichos términos modificados.
                            </p>
                        </div>
                    </section>

                    <hr className="border-slate-100 dark:border-white/5 my-12" />

                    <section className="scroll-mt-32 mb-16" id="uso-sitio">
                        <h2 className="text-2xl font-playfair font-bold text-slate-900 dark:text-white border-l-4 border-mivn-blue pl-6 mb-6">
                            2. Uso del Sitio
                        </h2>
                        <div className="text-slate-600 dark:text-slate-300 leading-loose space-y-6 text-lg">
                            <p>
                                El contenido de las páginas de este sitio web es para su información general y uso personal solamente. Está sujeto a cambios sin previo aviso.
                            </p>
                            <p>
                                Ni nosotros ni terceros proporcionamos ninguna garantía en cuanto a la exactitud, puntualidad, rendimiento, integridad o adecuación de la información y los materiales encontrados u ofrecidos en este sitio para cualquier propósito particular.
                            </p>
                            <ul className="list-disc pl-6 space-y-3 marker:text-mivn-blue">
                                <li>Usted acepta no utilizar el sitio para fines ilícitos o prohibidos.</li>
                                <li>No debe realizar acciones que dañen o sobrecarguen la infraestructura del sitio.</li>
                                <li>El uso de información personal está sujeto a nuestra Política de Privacidad.</li>
                            </ul>
                        </div>
                    </section>

                    <hr className="border-slate-100 dark:border-white/5 my-12" />

                    <section className="scroll-mt-32 mb-16" id="propiedad-intelectual">
                        <h2 className="text-2xl font-playfair font-bold text-slate-900 dark:text-white border-l-4 border-mivn-blue pl-6 mb-6">
                            3. Propiedad Intelectual
                        </h2>
                        <div className="text-slate-600 dark:text-slate-300 leading-loose space-y-6 text-lg">
                            <p>
                                Este sitio web contiene material que es propiedad de o licenciado a Ministerio Internacional Vida Nueva. Este material incluye, pero no se limita a, el diseño, la maquetación, la apariencia, los gráficos y el contenido escrito.
                            </p>
                            <p>
                                Queda prohibida la reproducción total o parcial del contenido para fines comerciales sin la autorización previa y por escrito de la administración del ministerio. Se permite compartir contenido para fines de edificación espiritual siempre que se otorgue el crédito correspondiente a MIVN.
                            </p>
                        </div>
                    </section>

                    <hr className="border-slate-100 dark:border-white/5 my-12" />

                    <section className="scroll-mt-32 mb-16" id="donaciones">
                        <h2 className="text-2xl font-playfair font-bold text-slate-900 dark:text-white border-l-4 border-mivn-blue pl-6 mb-6">
                            4. Donaciones y Ofrendas
                        </h2>
                        <div className="text-slate-600 dark:text-slate-300 leading-loose space-y-6 text-lg">
                            <p>
                                El MIVN ofrece la posibilidad de realizar donaciones, diezmos y ofrendas a través de plataformas de pago seguras integradas en nuestro sitio.
                            </p>
                            <p>
                                Todas las donaciones son voluntarias. El donante acepta que no recibirá bienes ni servicios a cambio de estas contribuciones. MIVN utiliza estándares de encriptación para proteger sus datos financieros, sin embargo, no nos hacemos responsables por fallos técnicos externos de los procesadores de pago (ej. PayPal, Stripe).
                            </p>
                        </div>
                    </section>

                    <hr className="border-slate-100 dark:border-white/5 my-12" />

                    <section className="scroll-mt-32 mb-16" id="responsabilidad">
                        <h2 className="text-2xl font-playfair font-bold text-slate-900 dark:text-white border-l-4 border-mivn-blue pl-6 mb-6">
                            5. Limitación de Responsabilidad
                        </h2>
                        <div className="text-slate-600 dark:text-slate-300 leading-loose space-y-6 text-lg">
                            <p>
                                Su uso de cualquier información o material en este sitio web es bajo su propio riesgo, para el cual no seremos responsables. Será su propia responsabilidad asegurarse de que cualquier producto, servicio o información disponible a través de este sitio web cumpla con sus requisitos específicos.
                            </p>
                            <p>
                                En ningún caso MIVN será responsable por cualquier pérdida o daño, incluyendo sin limitación, pérdidas indirectas o consecuentes, o cualquier pérdida o daño derivado de la pérdida de datos o beneficios que surjan de, o en conexión con, el uso de este sitio web.
                            </p>
                        </div>
                    </section>

                    <div className="mt-16 p-8 bg-slate-50 dark:bg-white/5 rounded-3xl text-center border border-slate-200 dark:border-white/5">
                        <p className="text-slate-500 dark:text-slate-400 flex items-center justify-center gap-2 flex-wrap text-lg">
                            Si tiene alguna duda sobre estos términos, por favor contáctenos en
                            <a className="text-mivn-blue font-bold hover:underline flex items-center gap-2" href="mailto:legal@mivn.org">
                                <Mail className="w-4 h-4" /> legal@mivn.org
                            </a>
                        </p>
                    </div>
                </article>
            </div>
        </div>
    );
}

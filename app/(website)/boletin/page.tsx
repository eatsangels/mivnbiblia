import { getBulletins, getLatestBulletin } from "@/lib/queries/bulletins";
import { FileText, Calendar, Download, ArrowRight } from "lucide-react";
import Link from "next/link";

export default async function BoletinPage() {
    const latestBulletin = await getLatestBulletin();
    const bulletins = await getBulletins(12);

    return (
        <div className="bg-background-light dark:bg-background-dark min-h-screen font-lexend">
            {/* Hero Section */}
            <section className="relative py-32 lg:py-48 px-4 overflow-hidden">
                <div className="absolute inset-0 bg-slate-900">
                    <img
                        src="https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&q=80&w=2000"
                        alt="Bulletin Background"
                        className="w-full h-full object-cover opacity-30"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
                </div>

                <div className="max-w-7xl mx-auto relative z-10 text-center space-y-12">
                    <div className="space-y-6">
                        <span className="text-mivn-gold font-black uppercase tracking-[0.5em] text-[10px]">Noticias de la Iglesia</span>
                        <h1 className="text-5xl md:text-8xl font-playfair font-bold text-white leading-tight">
                            Boletín <span className="italic text-mivn-blue">Semanal</span>
                        </h1>
                        <p className="text-white/80 text-xl md:text-2xl font-light italic max-w-3xl mx-auto leading-relaxed">
                            "Mantente informado sobre lo que Dios está haciendo en nuestra comunidad."
                        </p>
                    </div>
                </div>

                <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-background-light dark:from-background-dark to-transparent" />
            </section>

            <main className="max-w-7xl mx-auto px-4 py-24 space-y-32">
                {/* Latest Bulletin */}
                {latestBulletin && (
                    <section className="space-y-12">
                        <div className="text-center space-y-4">
                            <h2 className="text-mivn-gold font-black uppercase tracking-[0.4em] text-xs">Más Reciente</h2>
                            <h3 className="text-4xl md:text-6xl font-playfair font-bold text-slate-900 dark:text-white">
                                Última <span className="italic text-mivn-blue">Edición</span>
                            </h3>
                        </div>

                        <div className="max-w-4xl mx-auto bg-white dark:bg-slate-900/50 rounded-[3rem] p-12 lg:p-16 border border-slate-200 dark:border-slate-800 shadow-2xl">
                            <div className="space-y-8">
                                <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
                                    <div className="flex items-center gap-2">
                                        <Calendar className="w-4 h-4" />
                                        {new Date(latestBulletin.publish_date).toLocaleDateString('es-ES', {
                                            weekday: 'long',
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        })}
                                    </div>
                                </div>

                                <h1 className="text-4xl md:text-5xl font-playfair font-bold text-slate-900 dark:text-white">
                                    {latestBulletin.title}
                                </h1>

                                <div
                                    className="prose prose-lg dark:prose-invert max-w-none"
                                    dangerouslySetInnerHTML={{ __html: latestBulletin.content }}
                                />

                                {latestBulletin.pdf_url && (
                                    <div className="pt-8 border-t border-slate-200 dark:border-slate-800">
                                        <a
                                            href={latestBulletin.pdf_url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-3 bg-mivn-blue text-white px-8 py-4 rounded-2xl font-semibold hover:bg-mivn-blue/90 transition-all shadow-lg"
                                        >
                                            <Download className="w-5 h-5" />
                                            Descargar PDF
                                        </a>
                                    </div>
                                )}
                            </div>
                        </div>
                    </section>
                )}

                {/* Archive */}
                <section className="space-y-12">
                    <div className="flex flex-col md:flex-row justify-between items-end gap-8 border-b border-slate-100 dark:border-white/5 pb-12">
                        <div className="space-y-4">
                            <h2 className="text-mivn-gold font-black uppercase tracking-[0.4em] text-xs">Archivo</h2>
                            <h3 className="text-4xl md:text-6xl font-playfair font-bold text-slate-900 dark:text-white">
                                Boletines <span className="italic text-mivn-blue">Anteriores</span>
                            </h3>
                        </div>
                    </div>

                    {bulletins.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {bulletins.map((bulletin) => (
                                <Link
                                    key={bulletin.id}
                                    href={`/boletin/${bulletin.slug}`}
                                    className="group bg-white dark:bg-slate-900/50 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 hover:border-mivn-blue/50 hover:shadow-xl transition-all"
                                >
                                    <div className="space-y-4">
                                        <div className="w-16 h-16 rounded-xl bg-mivn-blue/10 flex items-center justify-center text-mivn-blue group-hover:scale-110 transition-transform">
                                            <FileText className="w-8 h-8" />
                                        </div>

                                        <div className="flex items-center gap-2 text-sm text-mivn-blue font-semibold">
                                            <Calendar className="w-4 h-4" />
                                            {new Date(bulletin.publish_date).toLocaleDateString('es-ES', {
                                                month: 'short',
                                                day: 'numeric',
                                                year: 'numeric'
                                            })}
                                        </div>

                                        <h4 className="text-xl font-playfair font-bold text-slate-900 dark:text-white group-hover:text-mivn-blue transition-colors line-clamp-2">
                                            {bulletin.title}
                                        </h4>

                                        <div className="flex items-center gap-2 text-mivn-blue font-semibold group-hover:gap-4 transition-all pt-2">
                                            Leer más <ArrowRight className="w-4 h-4" />
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20 text-slate-500 dark:text-slate-400">
                            <FileText className="w-16 h-16 mx-auto mb-4 opacity-20" />
                            <p className="text-xl">No hay boletines disponibles en este momento.</p>
                        </div>
                    )}
                </section>
            </main>
        </div>
    );
}

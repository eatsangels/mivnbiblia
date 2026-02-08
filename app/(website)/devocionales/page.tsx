import { getDevotionals, getTodayDevotional } from "@/lib/queries/devotionals";
import { Book, Calendar, User, ArrowRight, Heart } from "lucide-react";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Devocionales Diarios",
    description: "Reflexiones diarias basadas en la Biblia para fortalecer tu vida espiritual y caminar con Dios cada día.",
    openGraph: {
        title: "Devocionales Diarios | MIVN",
        description: "Palabra fresca para tu corazón, todos los días.",
        images: ["https://images.unsplash.com/photo-1504052434569-7c96024f4a08?auto=format&fit=crop&q=80&w=1200"],
    },
};

export default async function DevocionalPage() {
    const todayDevotional = await getTodayDevotional();
    const recentDevotionals = await getDevotionals(10);

    return (
        <div className="bg-background-light dark:bg-background-dark min-h-screen font-lexend">
            {/* Hero Section */}
            <section className="relative py-32 lg:py-48 px-4 overflow-hidden">
                <div className="absolute inset-0 bg-slate-900">
                    <img
                        src="https://images.unsplash.com/photo-1490730141103-6cac27aaab94?auto=format&fit=crop&q=80&w=2000"
                        alt="Devotional Background"
                        className="w-full h-full object-cover opacity-30"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
                </div>

                <div className="max-w-7xl mx-auto relative z-10 text-center space-y-12">
                    <div className="space-y-6">
                        <span className="text-mivn-gold font-black uppercase tracking-[0.5em] text-[10px]">Pan Diario</span>
                        <h1 className="text-5xl md:text-8xl font-playfair font-bold text-white leading-tight">
                            Devocional <span className="italic text-mivn-blue">Diario</span>
                        </h1>
                        <p className="text-white/80 text-xl md:text-2xl font-light italic max-w-3xl mx-auto leading-relaxed">
                            "Alimenta tu espíritu cada día con la Palabra de Dios."
                        </p>
                    </div>
                </div>

                <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-background-light dark:from-background-dark to-transparent" />
            </section>

            <main className="max-w-7xl mx-auto px-4 py-24 space-y-32">
                {/* Today's Devotional */}
                {todayDevotional && (
                    <section className="space-y-12">
                        <div className="text-center space-y-4">
                            <h2 className="text-mivn-gold font-black uppercase tracking-[0.4em] text-xs">Hoy</h2>
                            <h3 className="text-4xl md:text-6xl font-playfair font-bold text-slate-900 dark:text-white">
                                Devocional del <span className="italic text-mivn-blue">Día</span>
                            </h3>
                        </div>

                        <div className="max-w-4xl mx-auto bg-white dark:bg-slate-900/50 rounded-[3rem] p-12 lg:p-16 border border-slate-200 dark:border-slate-800 shadow-2xl">
                            {todayDevotional.image && (
                                <div className="aspect-video rounded-2xl overflow-hidden mb-8">
                                    <img
                                        src={todayDevotional.image}
                                        alt={todayDevotional.title}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            )}

                            <div className="space-y-8">
                                <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
                                    <div className="flex items-center gap-2">
                                        <Calendar className="w-4 h-4" />
                                        {new Date(todayDevotional.publish_date).toLocaleDateString('es-ES', {
                                            weekday: 'long',
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        })}
                                    </div>
                                    {todayDevotional.author_name && (
                                        <div className="flex items-center gap-2">
                                            <User className="w-4 h-4" />
                                            {todayDevotional.author_name}
                                        </div>
                                    )}
                                </div>

                                <h1 className="text-4xl md:text-5xl font-playfair font-bold text-slate-900 dark:text-white">
                                    {todayDevotional.title}
                                </h1>

                                <div className="flex items-center gap-3 p-4 bg-mivn-blue/5 dark:bg-mivn-blue/10 rounded-xl border-l-4 border-mivn-blue">
                                    <Book className="w-5 h-5 text-mivn-blue flex-shrink-0" />
                                    <p className="text-mivn-blue font-semibold">
                                        {todayDevotional.scripture_reference}
                                    </p>
                                </div>

                                <div
                                    className="prose prose-lg dark:prose-invert max-w-none"
                                    dangerouslySetInnerHTML={{ __html: todayDevotional.content }}
                                />
                            </div>
                        </div>
                    </section>
                )}

                {/* Recent Devotionals */}
                <section className="space-y-12">
                    <div className="flex flex-col md:flex-row justify-between items-end gap-8 border-b border-slate-100 dark:border-white/5 pb-12">
                        <div className="space-y-4">
                            <h2 className="text-mivn-gold font-black uppercase tracking-[0.4em] text-xs">Archivo</h2>
                            <h3 className="text-4xl md:text-6xl font-playfair font-bold text-slate-900 dark:text-white">
                                Devocionales <span className="italic text-mivn-blue">Anteriores</span>
                            </h3>
                        </div>
                    </div>

                    {recentDevotionals.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {recentDevotionals.map((devotional) => (
                                <Link
                                    key={devotional.id}
                                    href={`/devocionales/${devotional.slug}`}
                                    className="group bg-white dark:bg-slate-900/50 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 hover:border-mivn-blue/50 hover:shadow-xl transition-all"
                                >
                                    {devotional.image && (
                                        <div className="aspect-video overflow-hidden">
                                            <img
                                                src={devotional.image}
                                                alt={devotional.title}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                            />
                                        </div>
                                    )}

                                    <div className="p-6 space-y-4">
                                        <div className="flex items-center gap-2 text-sm text-mivn-blue font-semibold">
                                            <Calendar className="w-4 h-4" />
                                            {new Date(devotional.publish_date).toLocaleDateString('es-ES', {
                                                month: 'short',
                                                day: 'numeric',
                                                year: 'numeric'
                                            })}
                                        </div>

                                        <h4 className="text-xl font-playfair font-bold text-slate-900 dark:text-white group-hover:text-mivn-blue transition-colors line-clamp-2">
                                            {devotional.title}
                                        </h4>

                                        <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                                            <Book className="w-4 h-4" />
                                            {devotional.scripture_reference}
                                        </div>

                                        {devotional.author_name && (
                                            <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                                                <User className="w-4 h-4" />
                                                {devotional.author_name}
                                            </div>
                                        )}

                                        <div className="flex items-center gap-2 text-mivn-blue font-semibold group-hover:gap-4 transition-all pt-2">
                                            Leer más <ArrowRight className="w-4 h-4" />
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20 text-slate-500 dark:text-slate-400">
                            <Heart className="w-16 h-16 mx-auto mb-4 opacity-20" />
                            <p className="text-xl">No hay devocionales disponibles en este momento.</p>
                        </div>
                    )}
                </section>
            </main>
        </div>
    );
}

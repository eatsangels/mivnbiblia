import { getUpcomingEvents, getFeaturedEvents } from "@/lib/queries/events";
import { Calendar, MapPin, Users, ArrowRight, Clock, User } from "lucide-react";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function EventosPage() {
    const upcomingEvents = await getUpcomingEvents(10);
    const featuredEvents = await getFeaturedEvents(3);

    return (
        <div className="bg-background-light dark:bg-background-dark min-h-screen font-lexend">
            {/* Hero Section */}
            <section className="relative py-32 lg:py-48 px-4 overflow-hidden">
                <div className="absolute inset-0 bg-slate-900">
                    <img
                        src="/images/events_hero.png"
                        alt="Events Background"
                        className="w-full h-full object-cover opacity-30"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
                </div>

                <div className="max-w-7xl mx-auto relative z-10 text-center space-y-12">
                    <div className="space-y-6">
                        <span className="text-mivn-gold font-black uppercase tracking-[0.5em] text-[10px]">Próximos Eventos</span>
                        <h1 className="text-5xl md:text-8xl font-playfair font-bold text-white leading-tight">
                            Únete a <span className="italic text-mivn-blue">Nosotros</span>
                        </h1>
                        <p className="text-white/80 text-xl md:text-2xl font-light italic max-w-3xl mx-auto leading-relaxed">
                            "Experiencias transformadoras que fortalecen tu fe y comunidad."
                        </p>
                    </div>
                </div>

                <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-background-light dark:from-background-dark to-transparent" />
            </section>

            <main className="max-w-7xl mx-auto px-4 py-24 space-y-32">
                {/* Featured Events */}
                {featuredEvents.length > 0 && (
                    <section className="space-y-12">
                        <div className="text-center space-y-4">
                            <h2 className="text-mivn-gold font-black uppercase tracking-[0.4em] text-xs">Destacados</h2>
                            <h3 className="text-4xl md:text-6xl font-playfair font-bold text-slate-900 dark:text-white">
                                No te los <span className="italic text-mivn-blue">pierdas</span>
                            </h3>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {featuredEvents.map((event) => (
                                <div
                                    key={event.id}
                                    className="group relative bg-white dark:bg-slate-900/50 rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 hover:shadow-2xl transition-all duration-500"
                                >
                                    {event.image && (
                                        <div className="aspect-video overflow-hidden">
                                            <img
                                                src={event.image}
                                                alt={event.title}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                            />
                                        </div>
                                    )}

                                    <div className="p-8 space-y-6">
                                        <div className="flex items-center gap-2 text-mivn-blue text-sm font-semibold">
                                            <Calendar className="w-4 h-4" />
                                            {new Date(event.event_date).toLocaleDateString('es-ES', {
                                                weekday: 'long',
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric'
                                            })}
                                        </div>

                                        <h4 className="text-2xl font-playfair font-bold text-slate-900 dark:text-white">
                                            {event.title}
                                        </h4>

                                        <p className="text-slate-600 dark:text-slate-400 line-clamp-3">
                                            {event.description}
                                        </p>

                                        {event.location && (
                                            <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-500">
                                                <MapPin className="w-4 h-4" />
                                                {event.location}
                                            </div>
                                        )}

                                        <Link
                                            href={`/eventos/${event.slug}`}
                                            className="inline-flex items-center gap-2 text-mivn-blue font-semibold hover:gap-4 transition-all"
                                        >
                                            Ver detalles <ArrowRight className="w-4 h-4" />
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* All Upcoming Events */}
                <section className="space-y-12">
                    <div className="flex flex-col md:flex-row justify-between items-end gap-8 border-b border-slate-100 dark:border-white/5 pb-12">
                        <div className="space-y-4">
                            <h2 className="text-mivn-gold font-black uppercase tracking-[0.4em] text-xs">Calendario</h2>
                            <h3 className="text-4xl md:text-6xl font-playfair font-bold text-slate-900 dark:text-white">
                                Próximos <span className="italic text-mivn-blue">Eventos</span>
                            </h3>
                        </div>
                    </div>

                    {upcomingEvents.length > 0 ? (
                        <div className="space-y-6">
                            {upcomingEvents.map((event) => (
                                <Link
                                    key={event.id}
                                    href={`/eventos/${event.slug}`}
                                    className="group flex flex-col md:flex-row gap-6 p-6 bg-white dark:bg-slate-900/50 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-mivn-blue/50 hover:shadow-xl transition-all"
                                >
                                    {event.image && (
                                        <div className="w-full md:w-48 h-48 rounded-xl overflow-hidden flex-shrink-0">
                                            <img
                                                src={event.image}
                                                alt={event.title}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                            />
                                        </div>
                                    )}

                                    <div className="flex-1 space-y-4">
                                        <div className="flex flex-wrap items-center gap-4 text-sm">
                                            <div className="flex items-center gap-2 text-mivn-blue font-semibold">
                                                <Calendar className="w-4 h-4" />
                                                {new Date(event.event_date).toLocaleDateString('es-ES', {
                                                    month: 'short',
                                                    day: 'numeric',
                                                    year: 'numeric'
                                                })}
                                            </div>
                                            {event.location && (
                                                <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                                                    <MapPin className="w-4 h-4" />
                                                    {event.location}
                                                </div>
                                            )}
                                            {event.speaker && (
                                                <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                                                    <User className="w-4 h-4" />
                                                    {event.speaker}
                                                </div>
                                            )}
                                        </div>

                                        <h4 className="text-2xl font-playfair font-bold text-slate-900 dark:text-white group-hover:text-mivn-blue transition-colors">
                                            {event.title}
                                        </h4>

                                        <p className="text-slate-600 dark:text-slate-400 line-clamp-2">
                                            {event.description}
                                        </p>

                                        <div className="flex items-center gap-2 text-mivn-blue font-semibold group-hover:gap-4 transition-all">
                                            Más información <ArrowRight className="w-4 h-4" />
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20 text-slate-500 dark:text-slate-400">
                            <Calendar className="w-16 h-16 mx-auto mb-4 opacity-20" />
                            <p className="text-xl">No hay eventos próximos en este momento.</p>
                        </div>
                    )}
                </section>
            </main>
        </div >
    );
}

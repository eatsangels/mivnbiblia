import { getEventBySlug, getUpcomingEvents } from "@/lib/queries/events";
import { notFound } from "next/navigation";
import { Calendar, MapPin, Clock, User, Users, MoveLeft } from "lucide-react";
import Link from "next/link";
import { Metadata } from "next";

export const revalidate = 60; // Revalidate every minute

interface EventPageProps {
    params: Promise<{
        slug: string;
    }>;
}

export async function generateMetadata({ params }: EventPageProps): Promise<Metadata> {
    const { slug } = await params;
    const event = await getEventBySlug(slug);
    if (!event) return { title: "Evento no encontrado" };

    return {
        title: `${event.title} | Ministerio Internacional Vida Nueva`,
        description: event.description || `Detalles del evento ${event.title}`,
        openGraph: {
            images: event.image ? [event.image] : [],
        },
    };
}

export default async function EventPage({ params }: EventPageProps) {
    const { slug } = await params;
    const event = await getEventBySlug(slug);

    if (!event) {
        notFound();
    }

    // Determine status color/text
    const isUpcoming = new Date(event.event_date) > new Date();

    return (
        <div className="bg-background-light dark:bg-slate-950 min-h-screen font-lexend pb-24">
            {/* Hero Image / Banner */}
            <div className="relative h-[50vh] lg:h-[60vh] overflow-hidden">
                <div className="absolute inset-0 bg-slate-900">
                    {event.image ? (
                        <img
                            src={event.image}
                            alt={event.title}
                            className="w-full h-full object-cover opacity-60"
                        />
                    ) : (
                        <div className="w-full h-full bg-slate-800 opacity-60 flex items-center justify-center">
                            <span className="text-white/20 text-9xl font-playfair italic">MIVN</span>
                        </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-background-light dark:from-slate-950 via-transparent to-transparent" />
                </div>

                <div className="absolute top-8 left-4 lg:left-8 z-20">
                    <Link
                        href="/eventos"
                        className="inline-flex items-center gap-2 text-white/80 hover:text-white bg-black/20 hover:bg-black/40 backdrop-blur-md px-4 py-2 rounded-full transition-all text-sm font-bold uppercase tracking-widest"
                    >
                        <MoveLeft className="w-4 h-4" /> Volver a Eventos
                    </Link>
                </div>

                <div className="absolute bottom-0 left-0 w-full p-4 lg:p-12 z-10">
                    <div className="max-w-7xl mx-auto space-y-6">
                        <div className="flex flex-wrap gap-3">
                            <span className="bg-mivn-gold text-slate-900 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest">
                                {event.category || 'Evento'}
                            </span>
                            {event.is_featured && (
                                <span className="bg-mivn-blue text-white px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest">
                                    Destacado
                                </span>
                            )}
                        </div>
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-playfair font-black text-white leading-tight max-w-5xl shadow-black drop-shadow-2xl">
                            {event.title}
                        </h1>
                    </div>
                </div>
            </div>

            <main className="max-w-7xl mx-auto px-4 -mt-12 relative z-20">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
                    {/* Left Column: Details */}
                    <div className="lg:col-span-8 space-y-12">
                        {/* Highlights Card */}
                        <div className="bg-white dark:bg-slate-900 rounded-[2rem] p-8 lg:p-10 shadow-2xl border border-slate-100 dark:border-slate-800 grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-2xl bg-mivn-blue/10 flex items-center justify-center flex-shrink-0 text-mivn-blue">
                                    <Calendar className="w-6 h-6" />
                                </div>
                                <div className="space-y-1">
                                    <p className="text-[10px] uppercase tracking-widest font-black text-slate-400">Fecha</p>
                                    <p className="text-lg font-bold text-slate-900 dark:text-white capitalize">
                                        {new Date(event.event_date).toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-2xl bg-mivn-gold/10 flex items-center justify-center flex-shrink-0 text-mivn-gold">
                                    <Clock className="w-6 h-6" />
                                </div>
                                <div className="space-y-1">
                                    <p className="text-[10px] uppercase tracking-widest font-black text-slate-400">Hora</p>
                                    <p className="text-lg font-bold text-slate-900 dark:text-white">
                                        {event.start_time ? new Date(event.start_time).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', hour12: true }) : 'Por definir'}
                                        {event.end_time && ` - ${new Date(event.end_time).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', hour12: true })}`}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center flex-shrink-0 text-emerald-500">
                                    <MapPin className="w-6 h-6" />
                                </div>
                                <div className="space-y-1">
                                    <p className="text-[10px] uppercase tracking-widest font-black text-slate-400">Ubicación</p>
                                    <p className="text-lg font-bold text-slate-900 dark:text-white">
                                        {event.location || 'Sede Principal'}
                                    </p>
                                </div>
                            </div>

                            {event.speaker && (
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-2xl bg-violet-500/10 flex items-center justify-center flex-shrink-0 text-violet-500">
                                        <User className="w-6 h-6" />
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-[10px] uppercase tracking-widest font-black text-slate-400">Orador</p>
                                        <p className="text-lg font-bold text-slate-900 dark:text-white">
                                            {event.speaker}
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Description */}
                        <div className="space-y-6">
                            <h3 className="text-2xl font-playfair font-black text-slate-900 dark:text-white">Acerca del Evento</h3>
                            <div className="prose dark:prose-invert prose-lg max-w-none text-slate-600 dark:text-slate-400 leading-relaxed whitespace-pre-line">
                                {event.description}
                            </div>
                        </div>
                    </div>

                    {/* Right Column: CTA & Info */}
                    <div className="lg:col-span-4 space-y-8 lg:mt-12">
                        <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 border border-slate-100 dark:border-slate-800 shadow-xl sticky top-24">
                            <h3 className="text-xl font-playfair font-black text-slate-900 dark:text-white mb-6">Asistencia</h3>

                            <div className="space-y-6">
                                {event.capacity && (
                                    <div className="flex items-center justify-between pb-6 border-b border-slate-100 dark:border-slate-800">
                                        <span className="text-sm font-bold text-slate-500">Capacidad Total</span>
                                        <span className="flex items-center gap-2 text-slate-900 dark:text-white font-bold">
                                            <Users className="w-4 h-4 text-mivn-blue" />
                                            {event.capacity} personas
                                        </span>
                                    </div>
                                )}

                                {isUpcoming ? (
                                    <button className="w-full bg-mivn-gold text-white font-black uppercase tracking-widest py-5 rounded-2xl shadow-xl shadow-mivn-gold/20 hover:scale-[1.02] transition-transform">
                                        Confirmar Asistencia
                                    </button>
                                ) : (
                                    <div className="w-full bg-slate-100 dark:bg-slate-800 text-slate-400 font-bold uppercase tracking-widest py-5 rounded-2xl text-center text-xs">
                                        Evento Finalizado
                                    </div>
                                )}

                                <p className="text-xs text-center text-slate-400 leading-relaxed">
                                    Si tienes dudas sobre este evento, contáctanos directamente o visita nuestra recepción.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

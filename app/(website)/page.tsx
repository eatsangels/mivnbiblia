import { createClient } from "@/lib/supabase/server";

import { Play, ArrowRight, Calendar, MapPin, Quote } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { getPinnedAnnouncements } from "@/lib/queries/announcements";
import { getFeaturedEvents } from "@/lib/queries/events";
import { AnnouncementsFeed } from "@/components/home/AnnouncementsFeed";

export default async function WebsiteHome() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    const announcements = await getPinnedAnnouncements();
    const upcomingEvents = await getFeaturedEvents(3);

    return (
        <>
            <main>
                {/* Hero Section - Matched to Exact Visual */}
                <section className="relative h-[85vh] flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 z-0">
                        {/* Overlay to match image darken effect */}
                        <div className="absolute inset-0 bg-black/40 z-10" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#FDFDFF] dark:from-[#0A0F1D] via-transparent to-transparent z-20" />
                        <Image
                            src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=2070"
                            alt="Fondo MIVN"
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>

                    <div className="relative z-30 max-w-4xl mx-auto text-center px-4 space-y-8 animate-in fade-in duration-1000">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white">
                            <span className="flex h-2 w-2 rounded-full bg-mivn-gold animate-pulse"></span>
                            <span className="text-sm font-medium uppercase tracking-wider">Un nuevo comienzo en Cristo</span>
                        </div>

                        <h1 className="text-5xl md:text-7xl font-playfair text-white font-bold leading-tight drop-shadow-xl">
                            Bienvenido al Ministerio Internacional <span className="text-mivn-blue italic">Vida Nueva</span>
                        </h1>

                        <p className="text-xl md:text-2xl text-slate-100 max-w-2xl mx-auto font-light drop-shadow-md">
                            Conéctate, crece y participa en nuestra comunidad cristiana. Experimenta la gracia de Dios cada día.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                            <Link
                                href="/en-vivo"
                                className="bg-mivn-blue text-white px-8 py-4 rounded-full text-lg font-bold hover:bg-mivn-blue/90 transition-all transform hover:scale-105 flex items-center justify-center gap-2 shadow-xl shadow-mivn-blue/30"
                            >
                                <Play className="w-5 h-5 fill-current" />
                                Ver cultos en vivo
                            </Link>
                            <Link
                                href="/ministerios"
                                className="bg-white/10 backdrop-blur-md text-white border-2 border-white/30 px-8 py-4 rounded-full text-lg font-bold hover:bg-white/20 transition-all transform hover:scale-105 flex items-center justify-center"
                            >
                                Unirse al ministerio
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Announcements Feed */}
                <AnnouncementsFeed announcements={announcements} />

                {/* Events Preview - Matched to Exact Visual */}
                <section className="py-24 px-4 bg-[#FDFDFF] dark:bg-[#0A0F1D]" id="eventos">
                    <div className="max-w-7xl mx-auto">
                        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
                            <div className="space-y-2">
                                <h2 className="text-mivn-gold font-bold tracking-widest uppercase text-sm">Calendario</h2>
                                <h3 className="text-4xl font-playfair font-bold text-slate-900 dark:text-white">Próximos Eventos</h3>
                            </div>
                            <Link href="/eventos" className="text-mivn-blue font-semibold flex items-center gap-1 hover:underline">
                                Ver calendario completo <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {upcomingEvents.length > 0 ? (
                                upcomingEvents.map((event, index) => {
                                    const date = new Date(event.event_date);
                                    // Use explicit locale for consistent formatting
                                    const day = date.getDate();
                                    const month = date.toLocaleString('es-ES', { month: 'short' }).replace('.', '').toUpperCase();

                                    // Helper for formatting time
                                    let timeStr = "Horario por definir";
                                    if (event.start_time) {
                                        try {
                                            const timeDate = new Date(event.start_time);
                                            // Validate timestamp
                                            if (!isNaN(timeDate.getTime())) {
                                                timeStr = timeDate.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', hour12: true });
                                            } else {
                                                // Fallback if Date parsing fails but string exists
                                                timeStr = "Horario por definir";
                                            }
                                        } catch (e) {
                                            timeStr = "Horario por definir";
                                        }
                                    }

                                    // Alternate styles or based on category
                                    const isGold = index % 2 !== 0; // Simple alternation matching the design roughly
                                    const colorClass = isGold ? "text-mivn-gold bg-mivn-gold/10" : "text-mivn-blue bg-mivn-blue/10 dark:bg-mivn-blue/20";

                                    return (
                                        <div key={event.id} className="group bg-white dark:bg-slate-800/50 rounded-2xl p-6 border border-slate-100 dark:border-slate-800 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                                            <div className="flex gap-5">
                                                <div className={`flex flex-col items-center justify-center rounded-xl px-4 py-3 min-w-[70px] ${colorClass}`}>
                                                    <span className="text-2xl font-bold">{day}</span>
                                                    <span className="text-xs uppercase font-bold tracking-tighter">{month}</span>
                                                </div>
                                                <div className="space-y-1">
                                                    <h4 className="text-xl font-bold group-hover:text-mivn-blue transition-colors text-slate-900 dark:text-white line-clamp-2">
                                                        {event.title}
                                                    </h4>
                                                    <p className="text-slate-500 dark:text-slate-400 text-sm flex items-center gap-1">
                                                        🕒 {timeStr}
                                                    </p>
                                                    <p className="text-slate-500 dark:text-slate-400 text-sm flex items-center gap-1">
                                                        📍 {event.location || 'Templo Central'}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })
                            ) : (
                                <div className="col-span-3 text-center py-12 text-slate-400 italic bg-slate-50 dark:bg-slate-800/30 rounded-3xl border border-dashed border-slate-200 dark:border-slate-700">
                                    No hay eventos programados próximamente.
                                </div>
                            )}
                        </div>
                    </div>
                </section>

                {/* Devocional Preview - Matched to Exact Visual */}
                <section className="py-24 bg-slate-50 dark:bg-slate-900/30" id="devocional">
                    <div className="max-w-5xl mx-auto px-4">
                        <div className="relative bg-white dark:bg-slate-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row border border-slate-100 dark:border-slate-800">
                            <div className="md:w-1/2 relative h-64 md:h-auto overflow-hidden">
                                <Image
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBoL0jNU6TdvGcdyQSvExNCu5EqJcZ2cDQVtQ6YcAc1R7GgHgR9m9_-FZkOWeIfd4T8DxZvUQogceERpB5svK9pl1Nx6HsDv_a0QXwhP9nijPzqubcg5Il_igBx5ZmCB4_XiH-jyqIZBPpdz62q3HTWApI4jByPWPjyYn39QH_igou0yTCIpnVFM3PQ0n3X75B8eWnThMzJDVeI5LkJEmIK9NLfx_nOn1D-Haq9CCzwdYR7igSWH5O8KHlpu0jwe8xnp6behn0Qv2I"
                                    alt="Daily Devotional Bible"
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 bg-mivn-blue/20 mix-blend-multiply"></div>
                            </div>
                            <div className="md:w-1/2 p-10 md:p-16 flex flex-col justify-center space-y-6">
                                <div>
                                    <span className="text-mivn-gold font-bold tracking-[0.2em] uppercase text-xs">Palabra de Hoy</span>
                                    <h3 className="text-3xl font-playfair font-bold mt-2 text-slate-900 dark:text-white">Devocional Diario</h3>
                                </div>
                                <blockquote className="relative">
                                    <p className="text-xl italic font-playfair text-slate-700 dark:text-slate-300 relative z-10">
                                        "De modo que si alguno está en Cristo, nueva criatura es; las cosas viejas pasaron; he aquí todas son hechas nuevas."
                                    </p>
                                    <cite className="block mt-4 text-mivn-blue font-bold not-italic">2 Corintios 5:17</cite>
                                </blockquote>
                                <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm">
                                    Cada día es una oportunidad para comenzar de nuevo. En Cristo, nuestro pasado ya no define nuestro futuro. Hoy te invitamos a reflexionar sobre la renovación espiritual...
                                </p>
                                <div>
                                    <Link href="/devocionales" className="inline-flex items-center gap-2 font-bold text-slate-900 dark:text-white hover:text-mivn-blue transition-colors">
                                        Leer más <ArrowRight className="w-4 h-4" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main >
        </>
    );
}

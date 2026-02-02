import { getMinistries } from "@/lib/queries/ministries";
import { Users, ArrowRight, UserPlus, HeartHandshake } from "lucide-react";
import Link from "next/link";

export default async function MinistriesPage() {
    const ministries = await getMinistries();

    return (
        <div className="bg-background-light dark:bg-background-dark min-h-screen font-lexend">
            {/* Hero Section */}
            <section className="relative py-32 lg:py-48 px-4 overflow-hidden">
                <div className="absolute inset-0 bg-slate-900 group">
                    <img
                        src="/images/ministries_hero.png"
                        alt="Ministries Background"
                        className="w-full h-full object-cover opacity-30 group-hover:scale-105 transition-transform duration-1000"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
                </div>

                <div className="max-w-7xl mx-auto relative z-10 text-center space-y-12">
                    <div className="space-y-6 animate-in fade-in slide-in-from-top-4 duration-1000">
                        <span className="text-mivn-gold font-black uppercase tracking-[0.5em] text-[10px]">Cuerpo de Cristo</span>
                        <h1 className="text-5xl md:text-8xl font-playfair font-bold text-white leading-tight">
                            Nuestros <span className="italic text-mivn-blue">Ministerios</span>
                        </h1>
                        <p className="text-white/80 text-xl md:text-2xl font-light italic max-w-3xl mx-auto leading-relaxed">
                            "Sirviendo con amor y excelencia para la gloria de Dios. Descubre cómo puedes ser parte de lo que Dios está haciendo en nuestra familia."
                        </p>
                    </div>
                </div>

                <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-background-light dark:from-background-dark to-transparent" />
            </section>

            <main className="max-w-7xl mx-auto px-4 py-24 space-y-40">
                {/* Ministries Grid */}
                <section className="space-y-20">
                    <div className="flex flex-col md:flex-row justify-between items-end gap-8 border-b border-slate-100 dark:border-white/5 pb-12">
                        <div className="space-y-4">
                            <h2 className="text-mivn-gold font-black uppercase tracking-[0.4em] text-xs">Áreas de Servicio</h2>
                            <h3 className="text-4xl md:text-6xl font-playfair font-bold text-slate-900 dark:text-white">
                                Hay un lugar para <span className="italic text-mivn-blue">tus talentos</span>
                            </h3>
                        </div>
                        <p className="max-w-md text-slate-500 dark:text-slate-400 font-light italic text-right text-lg">
                            Descubre tu vocación espiritual y únete al mover de Dios en nuestra iglesia.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {ministries.map((ministry) => (
                            <div
                                key={ministry.id}
                                className="group p-12 bg-white dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 rounded-[3.5rem] hover:shadow-2xl hover:border-mivn-blue/30 transition-all duration-500 flex flex-col items-center text-center space-y-10 relative overflow-hidden"
                            >
                                <div className="absolute -top-20 -right-20 w-48 h-48 bg-slate-50 dark:bg-white/5 rounded-full group-hover:scale-150 transition-transform duration-700" />

                                {ministry.image && (
                                    <div className="w-28 h-28 rounded-[2rem] overflow-hidden relative z-10 group-hover:scale-110 transition-all duration-500 shadow-2xl">
                                        <img src={ministry.image} alt={ministry.name} className="w-full h-full object-cover" />
                                    </div>
                                )}

                                <div className="space-y-4 relative z-10">
                                    <div>
                                        <h4 className="text-3xl font-playfair font-bold text-slate-900 dark:text-white uppercase tracking-tight">
                                            {ministry.name}
                                        </h4>
                                        {ministry.leader_name && (
                                            <p className="text-[10px] font-black text-mivn-gold uppercase tracking-[0.3em] mt-2">
                                                Líder: {ministry.leader_name}
                                            </p>
                                        )}
                                    </div>
                                    <p className="text-lg text-slate-500 dark:text-slate-400 font-light italic leading-relaxed">
                                        "{ministry.description}"
                                    </p>
                                    {(ministry.meeting_day || ministry.meeting_time) && (
                                        <div className="text-sm text-mivn-blue font-medium">
                                            {ministry.meeting_day} {ministry.meeting_time && `• ${ministry.meeting_time}`}
                                        </div>
                                    )}
                                </div>

                                {ministry.leader_email && (
                                    <Link
                                        href={`mailto:${ministry.leader_email}`}
                                        className="pt-8 flex items-center justify-center gap-4 text-mivn-blue font-black uppercase tracking-[0.3em] text-[10px] hover:text-mivn-gold transition-colors relative z-10 border-t border-slate-50 dark:border-white/5 w-full"
                                    >
                                        Contactar <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                                    </Link>
                                )}
                            </div>
                        ))}
                    </div>
                </section>

                {/* Call to Action */}
                <section className="relative overflow-hidden rounded-[5rem] bg-slate-900 py-32 lg:py-48 px-10 md:px-20 group">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-mivn-blue/20 blur-[150px] rounded-full pointer-events-none -z-0" />
                    <div className="absolute bottom-0 right-0 p-20 opacity-5 group-hover:rotate-12 transition-transform duration-1000">
                        <HeartHandshake className="w-[500px] h-[500px] text-white" />
                    </div>

                    <div className="relative z-10 flex flex-col items-center text-center space-y-10 max-w-4xl mx-auto">
                        <div className="w-24 h-24 bg-mivn-gold/10 text-mivn-gold rounded-[2.5rem] flex items-center justify-center border border-mivn-gold/20 backdrop-blur-md mb-4 group-hover:scale-110 transition-transform">
                            <UserPlus className="w-10 h-10" />
                        </div>
                        <div className="space-y-6">
                            <h2 className="text-4xl md:text-7xl font-playfair font-bold text-white leading-tight">
                                ¿Sientes el llamado <span className="italic text-mivn-gold">a servir?</span>
                            </h2>
                            <p className="text-xl md:text-3xl text-white/70 font-light italic leading-relaxed">
                                Creemos que cada persona tiene un don especial. Hay un lugar esperando por ti en la familia MIVN para servir a Dios y al prójimo.
                            </p>
                        </div>
                        <Link href="/contacto">
                            <button className="bg-mivn-gold text-white px-16 py-8 rounded-[2.5rem] text-xl font-black uppercase tracking-[0.3em] shadow-[0_30px_60px_rgba(212,175,55,0.3)] hover:scale-105 active:scale-95 transition-all text-[12px]">
                                Llenar Formulario de Interés
                            </button>
                        </Link>
                    </div>
                </section>
            </main>
        </div>
    );
}

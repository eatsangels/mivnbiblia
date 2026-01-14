'use client';

import {
    ArrowLeft, Bird, Flame, Waves, Landmark, Star, Heart,
    Sparkles, Globe, Rainbow, BookOpen, Apple, Construction,
    User, Microscope, Mountain, Scale, Crown, Link as LinkIcon, Cross
} from 'lucide-react';
import Link from 'next/link';
import { getBibleLinkFromRef } from '@/lib/utils';

const timelineEvents = [
    {
        id: 1,
        icon: <Bird className="w-5 h-5" />,
        title: "La Creación",
        year: "~4000 a.C.",
        ref: "Génesis 1–2",
        description: "Dios crea los cielos y la tierra por medio de Su palabra. En seis días crea la luz, el firmamento, la tierra, los mares, la vegetación, los astros, los animales y finalmente al ser humano.",
        accent: "blue",
        image: "/images/timeline/creation.png"
    },
    {
        id: 2,
        icon: <Apple className="w-5 h-5" />,
        title: "La Caída del Hombre",
        year: "Poco después",
        ref: "Génesis 3",
        description: "Adán y Eva desobedecen a Dios al comer del fruto prohibido. El pecado entra al mundo, trayendo separación espiritual, muerte y sufrimiento.",
        accent: "red",
        image: "/images/timeline/fall.png"
    },
    {
        id: 3,
        icon: <Waves className="w-5 h-5" />,
        title: "El Diluvio Universal",
        year: "~2348 a.C.",
        ref: "Génesis 6–9",
        description: "La humanidad se corrompe, pero Noé halla gracia ante Dios. Un diluvio limpia la tierra del mal, salvando a Noé y su familia en el arca.",
        accent: "blue",
        image: "/images/timeline/noah_ark.png"
    },
    {
        id: 4,
        icon: <Construction className="w-5 h-5" />,
        title: "La Torre de Babel",
        year: "~2242 a.C.",
        ref: "Génesis 11",
        description: "Los hombres intentan alcanzar el cielo por su propio orgullo. Dios confunde sus lenguas y los dispersa por toda la tierra.",
        accent: "amber",
        image: "/images/timeline/babel.png"
    },
    {
        id: 5,
        icon: <User className="w-5 h-5" />,
        title: "El Llamado de Abraham",
        year: "~1996 a.C.",
        ref: "Génesis 12",
        description: "Dios llama a Abraham y hace un pacto con él: de su descendencia saldría una gran nación y, finalmente, el Salvador del mundo.",
        accent: "gold",
        image: "/images/timeline/abraham.png"
    },
    {
        id: 6,
        icon: <Microscope className="w-5 h-5" />,
        title: "Los Patriarcas",
        year: "1900–1700 a.C.",
        ref: "Génesis 21–50",
        description: "Dios continúa Su plan a través de Isaac, Jacob (Israel) y José. José termina en Egipto, preparando el escenario para el éxodo.",
        accent: "emerald",
        image: "/images/timeline/patriarchs.png"
    },
    {
        id: 7,
        icon: <Flame className="w-5 h-5" />,
        title: "El Éxodo y la Ley",
        year: "~1446 a.C.",
        ref: "Éxodo – Deuteronomio",
        description: "Dios libera a Israel de la esclavitud en Egipto por medio de Moisés. Reciben la Ley en el Monte Sinaí.",
        accent: "orange",
        image: "/images/timeline/exodus.png"
    },
    {
        id: 8,
        icon: <Mountain className="w-5 h-5" />,
        title: "Conquista de Canaán",
        year: "~1406 a.C.",
        ref: "Josué",
        description: "Israel entra a la Tierra Prometida bajo el liderazgo de Josué. Dios cumple Su promesa a Abraham.",
        accent: "amber",
        image: "/images/timeline/jericho.png"
    },
    {
        id: 9,
        icon: <Scale className="w-5 h-5" />,
        title: "Período de los Jueces",
        year: "1400–1050 a.C.",
        ref: "Jueces",
        description: "Israel entra en un ciclo de pecado y liberación. Dios levanta jueces como Débora, Gedeón y Sansón.",
        accent: "gray",
        image: "/images/timeline/judges.png"
    },
    {
        id: 10,
        icon: <Crown className="w-5 h-5" />,
        title: "Reino Unido de Israel",
        year: "1050–931 a.C.",
        ref: "1–2 Samuel, 1 Reyes",
        description: "Saúl, David y Salomón gobiernan. David establece Jerusalén y Salomón construye el majestuoso Templo.",
        accent: "gold",
        image: "/images/timeline/temple.png"
    },
    {
        id: 11,
        icon: <Landmark className="w-5 h-5" />,
        title: "Reino Dividido",
        year: "931 a.C.",
        ref: "1 Reyes 12",
        description: "El reino se divide en Israel (norte) y Judá (sur). Ambos se apartan de Dios, ignorando a los profetas.",
        accent: "red",
        image: "/images/timeline/divided_kingdom.png"
    },
    {
        id: 12,
        icon: <LinkIcon className="w-5 h-5" />,
        title: "Exilio Babilónico",
        year: "586–538 a.C.",
        ref: "Jeremías - Ezequiel",
        description: "Judá es llevada cautiva a Babilonia. Dios promete restauración y un Mesías futuro.",
        accent: "slate",
        image: "/images/timeline/exile.png"
    },
    {
        id: 13,
        icon: <Construction className="w-5 h-5" />,
        title: "Regreso del Exilio",
        year: "538 a.C.",
        ref: "Esdras, Nehemías",
        description: "El pueblo regresa a Jerusalén y reconstruye el templo y los muros de la ciudad.",
        accent: "amber",
        image: "/images/timeline/return_exile.png"
    },
    {
        id: 14,
        icon: <Star className="w-5 h-5" />,
        title: "Nacimiento de Jesús",
        year: "~4 a.C.",
        ref: "Mateo 1–2, Lucas 2",
        description: "Jesús nace en Belén. Dios se hace carne para traer salvación al mundo.",
        accent: "gold",
        image: "/images/timeline/nativity.png"
    },
    {
        id: 15,
        icon: <Cross className="w-5 h-5" />,
        title: "Muerte y Resurrección",
        year: "30–33 d.C.",
        ref: "Evangelios",
        description: "Jesús predica el Reino, muere en la cruz por nuestros pecados y resucita al tercer día.",
        accent: "red",
        image: "/images/timeline/resurrection.png"
    },
    {
        id: 16,
        icon: <Flame className="w-5 h-5" />,
        title: "Pentecostés",
        year: "33 d.C.",
        ref: "Hechos 2",
        description: "El Espíritu Santo desciende sobre los discípulos. Nace la Iglesia.",
        accent: "orange",
        image: "/images/timeline/pentecost.png"
    },
    {
        id: 17,
        icon: <Globe className="w-5 h-5" />,
        title: "Expansión de la Iglesia",
        year: "Siglo I",
        ref: "Hechos, Epístolas",
        description: "El evangelio se extiende por todo el mundo conocido a través de los apóstoles.",
        accent: "blue",
        image: "/images/timeline/church_expansion.png"
    },
    {
        id: 18,
        icon: <Rainbow className="w-5 h-5" />,
        title: "Nueva Creación",
        year: "Eternidad",
        ref: "Apocalipsis 21–22",
        description: "Dios crea un cielo nuevo y una tierra nueva. No habrá más dolor, muerte ni lágrimas.",
        accent: "gold",
        image: "/images/timeline/new_creation.png"
    },
];

export default function TimelinePage() {
    return (
        <div className="min-h-screen bg-[#051120] text-white selection:bg-gold-500/30">

            {/* Premium Atmospheric Background */}
            <div className="fixed inset-0 z-0">
                <div className="absolute inset-0 bg-[#051120]" />
                <div
                    className="absolute inset-0 bg-[url('/images/timeline_bg.png')] bg-cover bg-center opacity-50 mix-blend-luminosity scale-105"
                    style={{ filter: 'contrast(1.1) brightness(0.8)' }}
                />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(10,24,41,0.5),#051120)]" />
                <div className="absolute inset-0 bg-[url('/grain.png')] opacity-[0.03] mix-blend-overlay" />
            </div>

            <nav className="relative z-10 p-8 flex justify-between items-center max-w-7xl mx-auto w-full">
                <Link href="/" className="flex items-center gap-2 text-white/50 hover:text-white transition-colors uppercase tracking-[0.3em] text-[10px] font-black group">
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Volver al Inicio
                </Link>
                <div className="text-right">
                    <h1 className="text-2xl font-serif text-gold-500 font-bold tracking-[0.2em] uppercase">Línea del Tiempo</h1>
                    <p className="text-[10px] text-gray-500 uppercase tracking-[0.4em] mt-1">Archivo Histórico MIVN</p>
                </div>
            </nav>

            <header className="relative z-10 max-w-4xl mx-auto px-6 pt-20 pb-10 text-center">
                <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-gold-500/10 border border-gold-500/20 mb-8">
                    <Sparkles className="w-4 h-4 text-gold-500" />
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gold-400">Plan de Redención</span>
                </div>
                <h2 className="text-6xl font-serif font-bold text-white mb-8 tracking-tight">Desde la Creación hasta la Eternidad</h2>
                <div className="max-w-2xl mx-auto backdrop-blur-md bg-white/[0.03] border border-white/10 p-8 rounded-[2rem] shadow-2xl">
                    <p className="text-gray-400 text-lg font-light leading-relaxed italic">
                        "Esta línea del tiempo presenta de forma cronológica, visual y educativa los eventos más importantes de la Biblia, ayudando al lector a comprender el plan de Dios a través de la historia."
                    </p>
                </div>
            </header>

            <section className="relative z-10 max-w-5xl mx-auto px-4 md:px-6 py-20 pb-40 overflow-x-hidden">

                {/* Central Vertical Line with Glow */}
                <div className="absolute left-[24px] md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gold-500/50 to-transparent transform md:-translate-x-1/2 shadow-[0_0_15px_rgba(212,175,55,0.2)]" />

                <div className="space-y-24 md:space-y-32">
                    {timelineEvents.map((event, index) => (
                        <div
                            key={event.id}
                            className={`relative flex items-center group ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
                        >
                            {/* Marker (Mobile and Desktop) */}
                            <div className="absolute left-[30px] md:left-1/2 top-10 md:top-1/2 -translate-x-1/2 md:-translate-y-1/2 z-50">
                                <div className={`w-12 h-12 md:w-16 md:h-16 rounded-full bg-[#0a1829] border-4 border-[#051120] outline outline-1 outline-gold-500/30 flex items-center justify-center text-gold-500 shadow-[0_0_30px_rgba(0,0,0,0.5)] group-hover:scale-125 group-hover:outline-gold-500 transition-all duration-700`}>
                                    <div className="p-2 bg-gold-500/5 rounded-full">
                                        {event.icon}
                                    </div>
                                </div>
                            </div>

                            {/* Event Content Card */}
                            <div className={`ml-20 md:ml-0 md:w-[45%] flex-1 transition-all duration-700 group-hover:-translate-y-3`}>
                                <div className={`flex flex-col mb-4 md:mb-6 ${index % 2 === 0 ? 'md:items-start' : 'md:items-end'}`}>
                                    <div className="flex items-center gap-2 md:gap-3 mb-1 md:mb-2">
                                        <div className="w-6 md:w-8 h-[1px] bg-gold-500/30" />
                                        <span className="text-gold-500/60 text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em]">
                                            {event.year}
                                        </span>
                                    </div>
                                    <h3 className="text-xl md:text-3xl font-serif font-bold text-white group-hover:text-gold-400 transition-colors tracking-tight">
                                        {event.title}
                                    </h3>
                                    <Link
                                        href={getBibleLinkFromRef(event.ref)}
                                        className="inline-flex items-center gap-2 px-2 md:px-3 py-0.5 md:py-1 rounded-full bg-white/5 border border-white/10 text-[9px] md:text-[10px] font-bold text-gray-500 hover:text-gold-500 hover:bg-gold-500/10 hover:border-gold-500/30 transition-all uppercase tracking-widest mt-2 md:mt-3"
                                    >
                                        <BookOpen className="w-3 h-3" />
                                        {event.ref}
                                    </Link>
                                </div>

                                <div className={`p-6 md:p-10 rounded-3xl md:rounded-[2.5rem] bg-white/[0.02] border border-white/5 backdrop-blur-2xl group-hover:bg-white/[0.05] group-hover:border-white/10 transition-all shadow-[0_20px_50px_rgba(0,0,0,0.3)] ${index % 2 === 0 ? 'md:text-left' : 'md:text-right text-left'}`}>
                                    {event.image && (
                                        <div className="relative aspect-[16/9] mb-6 md:mb-8 overflow-hidden rounded-2xl border border-white/10 group-hover:border-gold-500/30 transition-colors shadow-inner">
                                            <div className="absolute inset-0 bg-gradient-to-t from-[#051120]/80 via-transparent to-transparent z-10 opacity-60" />
                                            <img
                                                src={event.image}
                                                alt={event.title}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                                            />
                                        </div>
                                    )}
                                    <p className="text-gray-300 text-sm md:text-base leading-relaxed font-light">
                                        {event.description}
                                    </p>

                                    <div className={`mt-6 md:mt-8 flex gap-4 ${index % 2 === 0 ? 'md:justify-start' : 'md:justify-end justify-start'}`}>
                                        <Link
                                            href={getBibleLinkFromRef(event.ref)}
                                            className="text-[9px] md:text-[10px] font-black text-gold-500/80 hover:text-gold-400 uppercase tracking-widest flex items-center gap-2 md:gap-3 transition-all group/btn"
                                        >
                                            Estudiar Texto <ArrowLeft className="w-3 h-3 rotate-180 group-hover/btn:translate-x-1 transition-transform" />
                                        </Link>
                                    </div>
                                </div>
                            </div>

                            {/* Empty space for the other side */}
                            <div className="hidden md:block w-[45%]" />
                        </div>
                    ))}
                </div>
            </section>

            {/* Final Objective Section */}
            <section className="relative z-10 bg-gold-950/20 py-40 border-t border-white/5">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <div className="w-20 h-20 rounded-full bg-gold-500/10 border border-gold-500/20 flex items-center justify-center mx-auto mb-10 shadow-[0_0_50px_rgba(212,175,55,0.1)]">
                        <Heart className="w-10 h-10 text-gold-400 animate-pulse" />
                    </div>
                    <h2 className="text-4xl font-serif font-bold text-white mb-8 uppercase tracking-widest">Un Solo Propósito Eterno</h2>
                    <p className="text-gray-400 text-2xl font-light leading-relaxed mb-12 max-w-3xl mx-auto italic">
                        "Ayudar a cualquier persona —niños, jóvenes o adultos— a entender la Biblia como una sola historia, conectada y con propósito eterno."
                    </p>
                    <div className="h-px w-40 bg-gradient-to-r from-transparent via-gold-500/50 to-transparent mx-auto mb-12" />
                    <p className="text-gray-500 font-serif italic text-2xl opacity-60">
                        "Jesucristo es el mismo ayer, y hoy, y por los siglos."
                    </p>
                    <p className="text-gold-500/30 text-xs uppercase tracking-[0.8em] mt-6">Hebreos 13:8</p>
                </div>
            </section>

            <style jsx global>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: rgba(212, 175, 55, 0.2);
                    border-radius: 10px;
                }
                @keyframes float {
                    0% { transform: translateY(0px); }
                    50% { transform: translateY(-10px); }
                    100% { transform: translateY(0px); }
                }
            `}</style>

        </div>
    );
}

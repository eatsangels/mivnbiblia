'use client';

import { ArrowLeft, Clock, Sparkles } from 'lucide-react';
import Link from 'next/link';

const timelineEvents = [
    { era: "Al Principio", title: "La Creación", description: "El origen de todo lo que existe por la Palabra de Dios.", year: "Inicios" },
    { era: "Patriarcas", title: "Pacto con Abraham", description: "Dios llama a Abraham para formar una nación grande.", year: "2000 a.C." },
    { era: "Éxodo", title: "Liberación de Egipto", description: "Moisés guía al pueblo a través del Mar Rojo.", year: "1446 a.C." },
    { era: "Reino", title: "Unción de David", description: "El hombre conforme al corazón de Dios es coronado rey.", year: "1010 a.C." },
    { era: "Profetas", title: "Cautiverio y Promesa", description: "Israel en Babilonia aguardando al Mesías.", year: "586 a.C." },
    { era: "Mesianismo", title: "Nacimiento de Cristo", description: "La Luz del mundo llega en la plenitud de los tiempos.", year: "4 a.C." },
    { era: "Redención", title: "Sacrificio y Victoria", description: "Cristo muere por nuestros pecados y resucita al tercer día.", year: "33 d.C." },
    { era: "La Iglesia", title: "Pentecostés", description: "El Espíritu Santo desciende sobre los creyentes.", year: "33 d.C." },
    { era: "Futuro", title: "Nueva Jerusalén", description: "La consumación de todas las cosas en el Reino de Dios.", year: "Eternidad" },
];

export default function TimelinePage() {
    return (
        <div className="min-h-screen bg-[#050505] text-white selection:bg-gold-500/30">

            {/* Background Ambience */}
            <div className="fixed inset-0 opacity-20 pointer-events-none">
                <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-900/30 rounded-full blur-[120px]" />
                <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-gold-900/20 rounded-full blur-[150px]" />
            </div>

            <nav className="relative z-10 p-8 flex justify-between items-center max-w-7xl mx-auto w-full">
                <Link href="/" className="flex items-center gap-2 text-white/50 hover:text-white transition-colors uppercase tracking-widest text-xs font-bold group">
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Volver al Inicio
                </Link>
                <div className="text-right">
                    <h1 className="text-2xl font-serif text-gold-500 font-bold tracking-widest">LÍNEA DEL TIEMPO</h1>
                    <p className="text-[10px] text-gray-500 uppercase tracking-[0.4em] mt-1">Historia de la Redención</p>
                </div>
            </nav>

            <section className="relative z-10 max-w-4xl mx-auto px-6 py-20 pb-40">

                {/* Central Vertical Line */}
                <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gold-500/30 to-transparent transform -translate-x-1/2" />

                <div className="space-y-32">
                    {timelineEvents.map((event, index) => (
                        <div key={index} className={`relative flex items-center justify-between group ${index % 2 === 0 ? 'flex-row-reverse' : ''}`}>

                            {/* Event Content */}
                            <div className="w-[45%] space-y-4">
                                <div className={`flex flex-col ${index % 2 === 0 ? 'items-start' : 'items-end'}`}>
                                    <span className="text-gold-500/60 text-[10px] uppercase tracking-widest font-black flex items-center gap-2">
                                        {index % 2 !== 0 && <Sparkles className="w-3 h-3" />}
                                        {event.era}
                                        {index % 2 === 0 && <Sparkles className="w-3 h-3" />}
                                    </span>
                                    <h3 className="text-3xl font-serif font-bold text-white group-hover:text-gold-400 transition-colors">
                                        {event.title}
                                    </h3>
                                </div>

                                <div className={`p-6 rounded-2xl bg-white/5 border border-white/5 backdrop-blur-sm group-hover:border-gold-500/20 transition-all ${index % 2 === 0 ? 'text-left' : 'text-right'}`}>
                                    <p className="text-gray-400 text-sm leading-relaxed font-light">
                                        {event.description}
                                    </p>
                                    <span className="inline-block mt-4 text-[10px] font-bold text-gold-500/40 uppercase tracking-widest">
                                        {event.year}
                                    </span>
                                </div>
                            </div>

                            {/* Central Marker */}
                            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                                <div className="w-4 h-4 rounded-full bg-midnight-950 border-2 border-gold-500 shadow-[0_0_15px_rgba(212,175,55,0.4)] group-hover:scale-125 transition-transform" />
                            </div>

                            {/* Spacer for the other side */}
                            <div className="w-[45%]" />
                        </div>
                    ))}
                </div>
            </section>

            {/* Cinematic Quote */}
            <footer className="relative z-10 py-32 text-center">
                <div className="max-w-2xl mx-auto px-6">
                    <p className="text-gray-500 font-serif italic text-2xl opacity-40 leading-relaxed">
                        "Jesucristo es el mismo ayer, y hoy, y por los siglos."
                    </p>
                    <p className="text-gold-500/30 text-xs uppercase tracking-[0.5em] mt-6">Hebreos 13:8</p>
                </div>
            </footer>

        </div>
    );
}

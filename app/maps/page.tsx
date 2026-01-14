'use client';

import {
    ArrowLeft, Map as MapIcon, Compass, Navigation, X, Globe,
    History, Info, Layers, ZoomIn, Anchor, BookOpen
} from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { getBibleLinkFromRef } from '@/lib/utils';

const mapRegions = [
    {
        id: 'eden',
        title: 'Edén y los Cuatro Ríos',
        description: 'La cuna de la humanidad y la confluencia de los ríos primordiales.',
        context: 'Génesis 2:10–14',
        image: '/images/maps/eden.png',
        objective: 'Comprender el contexto geográfico del primer relato bíblico.',
        details: {
            summary: 'El Jardín del Edén es el punto inicial de la humanidad. Aquí confluyen cuatro ríos (Pishón, Gihón, Tigris y Éufrates), lo que sugiere un paisaje fértil y central para los primeros relatos de la Biblia.',
            points: [
                'Ubicación del Edén en el Medio Oriente antiguo',
                'Origen de los cuatro ríos primordiales',
                'Paisaje fértil original de la creación'
            ],
            modern: 'Irak / Irán / Turquía (Cercano Oriente)',
            evidence: 'Estudios geológicos identifican los valles secos de los ríos Pisón y Gihón en la península arábiga y Etiopía.',
            coordinates: '32°32′11″N 44°25′15″E'
        }
    },
    {
        id: 'exodo',
        title: 'Las 42 Estaciones del Éxodo',
        description: 'El itinerario detallado de la liberación hacia la Tierra Prometida.',
        context: 'Números 33',
        image: '/images/maps/exodo.png',
        objective: 'Visualizar el camino que el pueblo de Dios recorrió y entender la magnitud de la travesía.',
        details: {
            summary: 'La liberación de Israel de Egipto incluye un largo itinerario de 42 paradas desde Ramsés hasta Moab, marcando años de formación en el desierto.',
            points: [
                'Cruce milagroso del Mar Rojo',
                'Ubicaciones del Monte Sinaí',
                'Travesía por el Desierto del Sinaí',
                'Llegada a las llanuras de Moab'
            ],
            modern: 'Península del Sinaí / Jordania',
            evidence: 'El registro de Números 33 coincide con rutas de caravanas antiguas y oasis estratégicamente ubicados.',
            coordinates: '28°32′22″N 33°58′32″E'
        }
    },
    {
        id: 'israel',
        title: 'Geografía de las 12 Tribus',
        description: 'La división territorial de Canaán bajo la guía de Josué.',
        context: 'Josué 13–19',
        image: '/images/maps/tribus.png',
        objective: 'Ayudar al lector a ubicarse en la tierra prometida e identificar cada tribu sobre el mapa.',
        details: {
            summary: 'Después de la conquista de Canaán, las doce tribus reciben territorios específicos mediante sorteo, cumpliendo la promesa hecha a Abraham.',
            points: [
                'División territorial por tribus',
                'Límites naturales (Jordán, Mar Grande)',
                'Ciudades de refugio y asentamientos levitas'
            ],
            modern: 'Israel / Palestina / Jordania',
            evidence: 'Las fronteras descritas en Josué reflejan la topografía real de la región y han sido validadas por topógrafos bíblicos.',
            coordinates: '31°46′48″N 35°13′12″E'
        }
    },
    {
        id: 'pablo',
        title: 'La Expansión Paulina',
        description: 'Las rutas misioneras del Evangelio por el mundo grecorromano.',
        context: 'Hechos de los Apóstoles',
        image: '/images/maps/pablo.png',
        objective: 'Visualizar cómo el mensaje cristiano se expandió estratégicamente por el Imperio.',
        details: {
            summary: 'San Pablo y otros discípulos llevaron el evangelio a través del mundo grecorromano, usando las calzadas romanas y rutas marítimas.',
            points: [
                'Primer, segundo y tercer viaje misionero',
                'Ciudades clave: Antioquía, Éfeso, Corinto, Atenas',
                'El viaje final hacia Roma'
            ],
            modern: 'Turquía / Grecia / Italia / Siria',
            evidence: 'Las ciudades mencionadas en Hechos eran nodos comerciales reales con sinagogas confirmadas arqueológicamente.',
            coordinates: '37°58′N 23°43′E'
        }
    },
    {
        id: 'jerusalem',
        title: 'Topografía de Jerusalén (Siglo I)',
        description: 'El corazón de los eventos del Nuevo Testamento y la Pasión.',
        context: 'Evangelios / Hechos',
        image: '/images/maps/jerusalem.png',
        objective: 'Contextualizar espacialmente los eventos narrados en los evangelios y el nacimiento de la Iglesia.',
        details: {
            summary: 'Jerusalén es el escenario de la vida pública de Jesús, su crucifixión, resurrección y el posterior derramamiento del Espíritu.',
            points: [
                'Segundo Templo (Herodiano) y Patios',
                'Monte de los Olivos y Getsemaní',
                'Valle del Kidrón y Monte Sion',
                'Gólgota y el Sepulcro'
            ],
            modern: 'Jerusalén (Ciudad Vieja)',
            evidence: 'Excavaciones han revelado el Estanque de Siloé y el Pretorio de Pilato exactamente donde indica el texto.',
            coordinates: '31°46′36″N 35°13′48″E'
        }
    },
    {
        id: 'apocalipsis',
        title: 'Las 7 Iglesias de Asia',
        description: 'Geografía espiritual de las comunidades del primer siglo.',
        context: 'Apocalipsis 2–3',
        image: '/images/maps/iglesias.png',
        objective: 'Entender la geografía espiritual de la Iglesia primitiva en Asia Menor.',
        details: {
            summary: 'Siete iglesias ubicadas en Asia Menor reciben cartas proféticas de Jesús que abordan realidades locales de sus ciudades.',
            points: [
                'Ruta postal romana entre las ciudades',
                'Ciudades: Éfeso, Esmirna, Pérgamo, Tiatira, Sardis, Filadelfia, Laodicea',
                'Contexto histórico de cada congregación'
            ],
            modern: 'Costa Oeste de Turquía',
            evidence: 'Las siete ciudades existen hoy como sitios arqueológicos monumentales que reflejan el lujo y las pruebas de la época.',
            coordinates: '38°25′N 27°09′E'
        }
    },
];

export default function MapsPage() {
    const [selectedRegion, setSelectedRegion] = useState<typeof mapRegions[0] | null>(null);

    return (
        <div className="min-h-screen bg-[#051120] text-white selection:bg-blue-500/30 overflow-x-hidden">

            {/* Premium Atmospheric Background */}
            <div className="fixed inset-0 z-0">
                <div className="absolute inset-0 bg-[#051120]" />
                <div
                    className="absolute inset-0 bg-[url('/images/maps_bg.png')] bg-cover bg-center opacity-20 mix-blend-luminosity scale-110"
                    style={{ filter: 'contrast(1.2) brightness(0.8)' }}
                />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(10,24,41,0.4),#051120)]" />
                <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:60px_60px] opacity-30" />
                <div className="absolute inset-0 bg-[url('/grain.png')] opacity-[0.03] mix-blend-overlay" />
            </div>

            <nav className="relative z-10 p-8 flex justify-between items-center max-w-7xl mx-auto w-full">
                <Link href="/" className="flex items-center gap-2 text-white/40 hover:text-white transition-all uppercase tracking-[0.3em] text-[10px] font-black group">
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Volver al Inicio
                </Link>
                <div className="text-right">
                    <h1 className="text-2xl font-serif text-blue-400 font-bold tracking-[0.2em] uppercase">Cartografía Sagrada</h1>
                    <p className="text-[10px] text-gray-500 uppercase tracking-[0.4em] mt-1">Archivo Geográfico MIVN</p>
                </div>
            </nav>

            <main className="relative z-10 max-w-7xl mx-auto px-6 py-20 pb-40">

                <header className="mb-24 text-center max-w-4xl mx-auto">
                    <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-10 shadow-[0_0_40px_rgba(59,130,246,0.1)]">
                        <Compass className="w-4 h-4 text-blue-400 animate-spin-slow" />
                        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-400">Exploración Geográfica</span>
                    </div>

                    <h2 className="text-6xl md:text-7xl font-serif font-bold text-white mb-8 tracking-tight leading-tight">
                        Explora la geografía de la <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-200 to-blue-500 underline decoration-blue-500/20 underline-offset-8">Historia Bíblica</span>
                    </h2>

                    <div className="max-w-3xl mx-auto py-8 px-10 rounded-[2.5rem] bg-white/[0.02] border border-white/5 backdrop-blur-3xl shadow-2xl">
                        <p className="text-gray-400 text-xl font-light leading-relaxed italic">
                            "Descubre los lugares donde el cielo tocó la tierra: desde el Edén hasta la expansión del Evangelio en el mundo antiguo."
                        </p>
                    </div>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {mapRegions.map((region) => (
                        <div
                            key={region.id}
                            onClick={() => setSelectedRegion(region)}
                            className="group relative cursor-pointer rounded-[2.5rem] bg-white/[0.01] border border-white/5 hover:border-blue-500/30 transition-all duration-700 p-8 shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-3 overflow-hidden"
                        >
                            {/* Card Background Glow */}
                            <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-blue-500/5 blur-[80px] rounded-full group-hover:bg-blue-500/10 transition-colors" />

                            <div className="relative z-10">
                                <div className="flex items-center gap-3 mb-8">
                                    <div className="p-3 rounded-2xl bg-blue-500/5 border border-blue-500/10 group-hover:bg-blue-500/20 transition-colors">
                                        <MapIcon className="w-5 h-5 text-blue-400" />
                                    </div>
                                    <Link
                                        href={getBibleLinkFromRef(region.context)}
                                        onClick={(e) => e.stopPropagation()}
                                        className="text-blue-500/60 hover:text-blue-400 text-[10px] font-black uppercase tracking-[0.3em] transition-colors"
                                    >
                                        {region.context}
                                    </Link>
                                </div>

                                <h3 className="text-3xl font-serif font-bold text-white mb-4 group-hover:text-blue-400 transition-colors tracking-tight">
                                    {region.title}
                                </h3>

                                <p className="text-gray-400 text-base font-light leading-relaxed mb-6 opacity-80 group-hover:opacity-100 transition-opacity">
                                    {region.description}
                                </p>

                                <div className="flex items-center justify-between gap-4 mb-10">
                                    <div className="flex items-center gap-2 text-blue-400/50">
                                        <Navigation className="w-4 h-4" />
                                        <span className="text-[10px] font-bold uppercase tracking-widest">{region.details.modern.split(' / ')[0]}</span>
                                    </div>
                                    <Link
                                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(region.details.coordinates)}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        onClick={(e) => e.stopPropagation()}
                                        className="text-[9px] font-black text-blue-500/60 hover:text-blue-400 uppercase tracking-widest transition-colors flex items-center gap-2"
                                    >
                                        Ver Satélite <ArrowLeft className="w-3 h-3 rotate-180" />
                                    </Link>
                                </div>

                                <div className="flex items-center gap-4 py-4 px-6 rounded-2xl bg-white/5 border border-white/5 group-hover:bg-blue-500/10 group-hover:border-blue-500/20 transition-all">
                                    <ZoomIn className="w-4 h-4 text-blue-400" />
                                    <span className="text-[10px] text-gray-400 group-hover:text-white uppercase font-black tracking-widest transition-colors">
                                        Abrir Investigación
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Detail Modal */}
                {selectedRegion && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
                        <div
                            className="absolute inset-0 bg-[#051120]/95 backdrop-blur-2xl transition-all duration-500"
                            onClick={() => setSelectedRegion(null)}
                        />

                        <div className="relative bg-[#0a1829] border border-white/10 rounded-[3rem] w-full max-w-6xl max-h-[90vh] overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.8)] animate-in fade-in zoom-in duration-500 flex flex-col">

                            {/* Close Button */}
                            <button
                                onClick={() => setSelectedRegion(null)}
                                className="absolute top-8 right-8 z-50 p-4 hover:bg-white/5 rounded-full text-gray-500 hover:text-white transition-all border border-transparent hover:border-white/10"
                            >
                                <X className="w-6 h-6" />
                            </button>

                            <div className="flex-1 overflow-y-auto custom-scrollbar">
                                <div className="grid grid-cols-1 lg:grid-cols-2">

                                    {/* Left Side: Cinematic Image & Visual Story */}
                                    <div className="relative min-h-[400px] lg:min-h-full overflow-hidden border-r border-white/5">
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#0a1829] via-[#0a1829]/20 to-transparent z-10" />
                                        <img
                                            src={selectedRegion.image}
                                            alt={selectedRegion.title}
                                            className="absolute inset-0 w-full h-full object-cover scale-105"
                                        />

                                        <div className="absolute bottom-0 left-0 p-12 z-20 w-full">
                                            <Link
                                                href={getBibleLinkFromRef(selectedRegion.context)}
                                                className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-blue-500/20 border border-blue-500/30 backdrop-blur-md mb-6 hover:bg-blue-500/30 transition-all group/link"
                                            >
                                                <Layers className="w-4 h-4 text-blue-400 group-hover/link:animate-pulse" />
                                                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white">Visualización Profética</span>
                                            </Link>
                                            <h2 className="text-5xl font-serif font-bold text-white mb-4 tracking-tight leading-tight">
                                                {selectedRegion.title}
                                            </h2>
                                            <div className="flex items-center gap-3 text-blue-400/80">
                                                <Navigation className="w-4 h-4" />
                                                <span className="text-xs font-bold uppercase tracking-widest">{selectedRegion.details.modern}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Right Side: Educational Data */}
                                    <div className="p-8 md:p-16 space-y-12">

                                        <section>
                                            <div className="flex items-center gap-3 mb-8">
                                                <div className="w-12 h-[1px] bg-blue-500/40" />
                                                <h4 className="text-blue-400 text-[10px] font-black uppercase tracking-[0.4em]">Resumen de Investigación</h4>
                                            </div>
                                            <p className="text-gray-300 text-xl font-light leading-relaxed mb-8">
                                                {selectedRegion.details.summary}
                                            </p>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                {selectedRegion.details.points.map((point, i) => (
                                                    <div key={i} className="flex gap-4 p-4 rounded-2xl bg-white/[0.03] border border-white/5">
                                                        <Anchor className="w-5 h-5 text-blue-500/40 shrink-0 mt-1" />
                                                        <span className="text-sm text-gray-400 leading-snug">{point}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </section>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                            <section className="space-y-6">
                                                <h4 className="flex items-center gap-3 text-gold-500/70 text-[10px] font-black uppercase tracking-[0.3em]">
                                                    <History className="w-4 h-4" /> Veracidad Histórica
                                                </h4>
                                                <p className="text-gray-400 text-sm leading-relaxed italic bg-white/5 p-6 rounded-2xl border border-white/5">
                                                    "{selectedRegion.details.evidence}"
                                                </p>
                                            </section>

                                            <section className="space-y-6">
                                                <h4 className="flex items-center gap-3 text-blue-400/60 text-[10px] font-black uppercase tracking-[0.3em]">
                                                    <Globe className="w-4 h-4" /> Datos de Campo
                                                </h4>
                                                <div className="p-6 rounded-2xl bg-blue-500/5 border border-blue-500/10 group/coords">
                                                    <Link
                                                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(selectedRegion.details.coordinates)}`}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="block group-hover/coords:scale-105 transition-transform origin-left"
                                                    >
                                                        <code className="text-xl font-mono text-blue-400 block mb-4 tracking-tighter hover:text-blue-300 transition-colors">
                                                            {selectedRegion.details.coordinates}
                                                        </code>
                                                    </Link>
                                                    <p className="text-[10px] text-gray-500 uppercase font-black tracking-widest flex items-center gap-2">
                                                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                                                        Sincronizado con Satélite Moderno
                                                    </p>
                                                </div>
                                            </section>
                                        </div>

                                        <section className="pt-8 border-t border-white/5 flex flex-col md:flex-row md:items-end justify-between gap-6">
                                            <div className="max-w-xl">
                                                <h4 className="flex items-center gap-3 text-gray-500 text-[10px] font-black uppercase tracking-[0.3em] mb-6">
                                                    <BookOpen className="w-4 h-4" /> Objetivo Educativo
                                                </h4>
                                                <p className="text-sm text-gray-400 leading-relaxed">
                                                    {selectedRegion.objective}
                                                </p>
                                            </div>
                                            <Link
                                                href={getBibleLinkFromRef(selectedRegion.context)}
                                                className="shrink-0 flex items-center gap-3 px-6 py-3 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-400 hover:bg-blue-500/20 transition-all font-bold text-sm group/btn"
                                            >
                                                Estudiar en la Biblia
                                                <ArrowLeft className="w-4 h-4 rotate-180 group-hover/btn:translate-x-1 transition-transform" />
                                            </Link>
                                        </section>

                                    </div>
                                </div>
                            </div>

                            {/* Modal Footer */}
                            <div className="p-6 px-16 bg-[#0a1829] border-t border-white/5 flex justify-between items-center">
                                <p className="text-[9px] text-gray-600 uppercase tracking-[0.5em]">Secretaria de Documentación Histórica MIVN</p>
                                <span className="text-[9px] text-blue-500/40 font-black uppercase tracking-[0.5em]">MAP-ID: {selectedRegion.id.toUpperCase()}</span>
                            </div>
                        </div>
                    </div>
                )}

            </main>

            <style jsx global>{`
                @keyframes spin-slow {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                .animate-spin-slow {
                    animation: spin-slow 20s linear infinite;
                }
                .custom-scrollbar::-webkit-scrollbar {
                    width: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: rgba(59, 130, 246, 0.2);
                    border-radius: 10px;
                }
            `}</style>

        </div>
    );
}

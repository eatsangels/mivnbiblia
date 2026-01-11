'use client';

import { ArrowLeft, Map as MapIcon, Compass, Navigation, X, Globe, History, Info } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

const mapRegions = [
    {
        id: 'eden',
        title: 'Edén y los Cuatro Ríos',
        description: 'La cuna de la humanidad y la confluencia de los ríos primordiales.',
        context: 'Génesis 2:10-14',
        details: {
            locations: ['Río Tigris (Hiddekel)', 'Río Éufrates', 'Río Pisón', 'Río Guijón'],
            modern: 'Cercano Oriente (Irak, Irán, Turquía)',
            evidence: 'Estudios satelitales sugieren un antiguo curso de río en el norte de Arabia (posible Pisón).',
            coordinates: '32°32′11″N 44°25′15″E'
        }
    },
    {
        id: 'exodo',
        title: 'Las 42 Estaciones del Éxodo',
        description: 'El itinerario detallado de la liberación hacia la Tierra Prometida.',
        context: 'Números 33',
        details: {
            locations: ['Ramesés', 'Sucot', 'Mara', 'Elim', 'Monte Sinaí', 'Cades-barnea'],
            modern: 'Península del Sinaí y Desierto del Néguev',
            evidence: 'Las 42 estaciones listadas ofrecen un registro logístico preciso del trayecto semita.',
            coordinates: '28°32′22″N 33°58′32″E'
        }
    },
    {
        id: 'israel',
        title: 'Geografía de las 12 Tribus',
        description: 'La división territorial de Canaán bajo la guía de Josué.',
        context: 'Josué 13-19',
        details: {
            locations: ['Territorio de Judá', 'Efraín', 'Manasés', 'Dan', 'Benjamín'],
            modern: 'Israel, Cisjordania y Jordania',
            evidence: 'Confirmación arqueológica de las ciudades fronterizas mencionadas en los límites tribales.',
            coordinates: '31°46′48″N 35°13′12″E'
        }
    },
    {
        id: 'pablo',
        title: 'La Expansión Paulina',
        description: 'Las rutas exactas del Evangelio por el mundo grecorromano.',
        context: 'Hechos de los Apóstoles',
        details: {
            locations: ['Antioquía', 'Efeso', 'Atenas', 'Corinto', 'Roma'],
            modern: 'Turquía, Grecia e Italia',
            evidence: 'Rutas basadas en el sistema de calzadas romanas (Vía Egnatia, Vía Appia).',
            coordinates: '37°58′N 23°43′E'
        }
    },
    {
        id: 'jerusalem',
        title: 'Topografía de Jerusalén',
        description: 'Jerusalén en el siglo I: El Templo, el Kidrón y el monte de los Olivos.',
        context: 'Nuevo Testamento',
        details: {
            locations: ['Templo de Herodes', 'Getsemaní', 'Estanque de Siloé', 'Gólgota'],
            modern: 'Jerusalén, Ciudad Vieja',
            evidence: 'Excavaciones en la Ciudad de David y el Muro de las Lamentaciones.',
            coordinates: '31°46′36″N 35°13′48″E'
        }
    },
    {
        id: 'apocalipsis',
        title: 'Las 7 Iglesias de Asia',
        description: 'Los centros espirituales del Asia Menor bajo vigilancia profética.',
        context: 'Apocalipsis 2-3',
        details: {
            locations: ['Efeso', 'Esmirna', 'Pérgamo', 'Tiatira', 'Sardis', 'Filadelfia', 'Laodicea'],
            modern: 'Costa litoral de Turquía',
            evidence: 'Ruinas monumentales existentes en Selçuk, Bergama y Denizli.',
            coordinates: '38°25′N 27°09′E'
        }
    },
];

export default function MapsPage() {
    const [selectedRegion, setSelectedRegion] = useState<typeof mapRegions[0] | null>(null);

    return (
        <div className="min-h-screen bg-[#051120] text-white selection:bg-blue-500/30">

            {/* Dynamic Background Overlay */}
            <div className="fixed inset-0 z-0 opacity-40">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-[#051120] to-[#051120]" />
                {/* Subtle grid pattern to simulate a map/blueprint */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,_rgba(255,255,255,0.02)_1px,_transparent_1px),_linear-gradient(to_bottom,_rgba(255,255,255,0.02)_1px,_transparent_1px)] bg-[size:40px_40px]" />
            </div>

            <nav className="relative z-10 p-8 flex justify-between items-center max-w-7xl mx-auto w-full">
                <Link href="/" className="flex items-center gap-2 text-white/30 hover:text-white transition-colors uppercase tracking-widest text-xs font-bold group">
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Inicio
                </Link>
                <div className="text-right">
                    <h1 className="text-2xl font-serif text-blue-400 font-bold tracking-widest uppercase">Cartografía Sagrada</h1>
                    <p className="text-[10px] text-gray-500 uppercase tracking-[0.4em] mt-1">Exploración Geográfica</p>
                </div>
            </nav>

            <main className="relative z-10 max-w-7xl mx-auto px-6 py-20">

                <header className="mb-20 text-center max-w-3xl mx-auto">
                    <div className="w-16 h-16 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mx-auto mb-8 shadow-[0_0_30px_rgba(59,130,246,0.1)]">
                        <Compass className="w-8 h-8 text-blue-400 animate-spin-slow" />
                    </div>
                    <h2 className="text-5xl font-serif font-bold text-white mb-6 tracking-tight">Geografía de la Fe</h2>
                    <p className="text-gray-400 text-lg font-light leading-relaxed">
                        Descubre los lugares donde el cielo tocó la tierra a través de la historia bíblica.
                    </p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {mapRegions.map((region) => (
                        <div
                            key={region.id}
                            onClick={() => setSelectedRegion(region)}
                            className="relative group cursor-pointer overflow-hidden rounded-3xl bg-[#0a1829] border border-white/5 hover:border-blue-500/40 transition-all p-8 shadow-2xl hover:shadow-blue-500/5 hover:-translate-y-2"
                        >
                            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                                <Navigation className="w-24 h-24 text-blue-400 -rotate-12" />
                            </div>

                            <div className="relative z-10">
                                <span className="text-blue-500 text-[10px] uppercase font-bold tracking-widest bg-blue-500/5 px-3 py-1 rounded-full border border-blue-500/10 mb-6 inline-block">
                                    {region.context}
                                </span>
                                <h3 className="text-2xl font-serif font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
                                    {region.title}
                                </h3>
                                <p className="text-gray-400 text-sm font-light leading-relaxed">
                                    {region.description}
                                </p>
                            </div>

                            <div className="mt-8 flex items-center gap-2 text-blue-400 font-bold text-[10px] uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all translate-y-4 group-hover:translate-y-0">
                                Ver Evidencia Geográfica <ArrowLeft className="w-3 h-3 rotate-180" />
                            </div>
                        </div>
                    ))}
                </div>

                {/* Veridical Detail Modal */}
                {selectedRegion && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
                        <div
                            className="absolute inset-0 bg-black/90 backdrop-blur-xl"
                            onClick={() => setSelectedRegion(null)}
                        />

                        <div className="relative bg-[#0a1829] border border-blue-500/30 rounded-[2rem] w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-[0_0_100px_rgba(59,130,246,0.15)] animate-in fade-in zoom-in duration-300 flex flex-col">

                            {/* Decorative Map Header */}
                            <div className="h-40 bg-[url('https://www.transparenttextures.com/patterns/old-map.png')] bg-blue-500/5 relative overflow-hidden flex items-end p-8 border-b border-white/5">
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0a1829] to-transparent" />
                                <div className="relative z-10">
                                    <span className="text-blue-400 text-[10px] uppercase font-bold tracking-[0.3em] mb-2 block">{selectedRegion.context}</span>
                                    <h2 className="text-4xl font-serif font-bold text-white tracking-tight">{selectedRegion.title}</h2>
                                </div>
                                <button
                                    onClick={() => setSelectedRegion(null)}
                                    className="absolute top-8 right-8 p-3 hover:bg-white/5 rounded-full text-gray-400 hover:text-white transition-all border border-transparent hover:border-white/10"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            <div className="flex-1 overflow-y-auto p-8 md:p-12 custom-scrollbar">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

                                    {/* Left Column: Geographical Data */}
                                    <div className="space-y-10">
                                        <section>
                                            <h4 className="flex items-center gap-2 text-blue-400 text-xs font-black uppercase tracking-widest mb-6">
                                                <MapIcon className="w-4 h-4" /> Puntos de Interés Histórico
                                            </h4>
                                            <ul className="space-y-3">
                                                {selectedRegion.details.locations.map((loc, i) => (
                                                    <li key={i} className="flex items-center gap-3 text-gray-300">
                                                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500/40" />
                                                        <span className="font-libre text-lg">{loc}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </section>

                                        <section className="p-6 bg-blue-500/5 rounded-2xl border border-blue-500/10">
                                            <div className="flex items-center gap-3 text-blue-300 mb-4">
                                                <Globe className="w-4 h-4" />
                                                <span className="text-[10px] font-bold uppercase tracking-widest">Coordenadas Bíblicas</span>
                                            </div>
                                            <code className="text-2xl font-mono text-blue-400/80 tracking-widest block mb-4">
                                                {selectedRegion.details.coordinates}
                                            </code>
                                            <div className="text-[10px] text-gray-500 uppercase flex items-center gap-2">
                                                <Navigation className="w-3 h-3" /> Equivalente Moderno: <span className="text-gray-300">{selectedRegion.details.modern}</span>
                                            </div>
                                        </section>
                                    </div>

                                    {/* Right Column: Evidence & Analysis */}
                                    <div className="space-y-10">
                                        <section>
                                            <h4 className="flex items-center gap-2 text-gold-500/70 text-xs font-black uppercase tracking-widest mb-6">
                                                <History className="w-4 h-4" /> Datos de Veracidad
                                            </h4>
                                            <p className="text-gray-400 leading-relaxed font-light text-base bg-white/5 p-6 rounded-2xl border border-white/5 italic">
                                                "{selectedRegion.details.evidence}"
                                            </p>
                                        </section>

                                        <section>
                                            <h4 className="flex items-center gap-2 text-blue-400/60 text-xs font-black uppercase tracking-widest mb-6">
                                                <Info className="w-4 h-4" /> Nota del Cartógrafo
                                            </h4>
                                            <p className="text-xs text-gray-500 leading-relaxed uppercase tracking-wider">
                                                Esta reconstrucción utiliza datos de la Zondervan Atlas y Carta's Biblical World, cruzando referencias entre el texto masorético y hallazgos arqueológicos del siglo XXI.
                                            </p>
                                        </section>
                                    </div>

                                </div>
                            </div>

                            {/* Modal Footer Decorative */}
                            <div className="p-6 bg-[#0a1829] border-t border-white/5 text-center">
                                <p className="text-[10px] text-gray-600 uppercase tracking-[0.5em]">Secretaria de Documentación Histórica MIVN</p>
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
          animation: spin-slow 12s linear infinite;
        }
      `}</style>

        </div>
    );
}

'use client';

import { ArrowLeft, Map as MapIcon, Compass, Navigation } from 'lucide-react';
import Link from 'next/link';

const mapRegions = [
    { id: 'eden', title: 'Edén y Alrededores', description: 'La geografía de los orígenes de la humanidad.', context: 'Génesis' },
    { id: 'exodo', title: 'La Ruta del Éxodo', description: 'El camino de la esclavitud a la Tierra Prometida.', context: 'Éxodo - Números' },
    { id: 'israel', title: 'Reino de Israel y Judá', description: 'La tierra repartida entre las tribus.', context: 'Josué - Crónicas' },
    { id: 'pablo', title: 'Viajes Misioneros de Pablo', description: 'La expansión del evangelio al mundo gentil.', context: 'Hechos' },
    { id: 'jerusalem', title: 'Jerusalén en tiempos de Jesús', description: 'Topografía de la Ciudad Santa.', context: 'Evangelios' },
    { id: 'apocalipsis', title: 'Las 7 Iglesias de Asia', description: 'Centros de fe en el Asia Menor del primer siglo.', context: 'Apocalipsis' },
];

export default function MapsPage() {
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
                        <div key={region.id} className="relative group cursor-pointer overflow-hidden rounded-3xl bg-[#0a1829] border border-white/5 hover:border-blue-500/40 transition-all p-8 shadow-2xl hover:shadow-blue-500/5 hover:-translate-y-2">
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
                                Explorar Región <ArrowLeft className="w-3 h-3 rotate-180" />
                            </div>
                        </div>
                    ))}
                </div>

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

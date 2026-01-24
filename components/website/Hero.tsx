"use client";

import { PlayCircle, ArrowRight, ShieldCheck } from "lucide-react";
import Image from "next/image";

export const Hero = () => {
    return (
        <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
            {/* Background with Reference Pattern */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=2070"
                    alt="MIVN Hero Background"
                    fill
                    className="object-cover opacity-40 grayscale"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-mivn-bg-dark via-mivn-bg-dark/40 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-mivn-bg-dark/80 via-transparent to-mivn-bg-dark/80" />
            </div>

            <div className="relative z-10 max-w-5xl mx-auto text-center px-4 space-y-10">
                {/* Floating Badge */}
                <div className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 text-white animate-element">
                    <span className="flex h-2.5 w-2.5 rounded-full bg-mivn-gold animate-pulse shadow-[0_0_10px_rgba(255,215,0,0.8)]" />
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-300">
                        Un nuevo comienzo en Cristo
                    </span>
                </div>

                {/* Heading */}
                <div className="space-y-4">
                    <h1 className="text-5xl md:text-8xl font-playfair font-bold text-white leading-[1.1] tracking-tight animate-element animate-delay-200">
                        Bienvenido al <br />
                        <span className="bg-gradient-to-r from-mivn-blue via-mivn-blue/80 to-mivn-gold bg-clip-text text-transparent italic">
                            Ministerio Internacional
                        </span>
                        <br />
                        <span className="text-white">Vida Nueva</span>
                    </h1>
                </div>

                {/* Subtext */}
                <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto font-light leading-relaxed animate-element animate-delay-400">
                    Transformamos vidas a través del amor de Jesucristo, la palabra revelada y una comunidad unida por el propósito divino.
                </p>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-6 justify-center pt-8 animate-element animate-delay-600">
                    <button className="group bg-mivn-blue text-white px-10 py-5 rounded-[2.5rem] text-sm font-black uppercase tracking-[0.2em] hover:bg-mivn-blue/90 transition-all shadow-2xl shadow-mivn-blue/30 flex items-center justify-center gap-3 hover:scale-105 active:scale-95">
                        <PlayCircle className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                        Ver cultos en vivo
                    </button>

                    <button className="group bg-white/5 backdrop-blur-md text-white border border-white/20 px-10 py-5 rounded-[2.5rem] text-sm font-black uppercase tracking-[0.2em] hover:bg-white/10 transition-all flex items-center justify-center gap-3 hover:scale-105 active:scale-95">
                        Unirse al ministerio
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>

                {/* Footer info in Hero */}
                <div className="pt-20 flex items-center justify-center gap-12 animate-element animate-delay-800">
                    <div className="flex flex-col items-center gap-2">
                        <span className="text-mivn-gold font-serif text-3xl font-bold">25+</span>
                        <span className="text-[10px] text-gray-600 font-bold uppercase tracking-widest">Años de Fe</span>
                    </div>
                    <div className="w-px h-10 bg-white/10" />
                    <div className="flex flex-col items-center gap-2">
                        <span className="text-mivn-blue font-serif text-3xl font-bold">5k+</span>
                        <span className="text-[10px] text-gray-600 font-bold uppercase tracking-widest">Vidas Tocadas</span>
                    </div>
                </div>
            </div>

            {/* Decorative Bottom Fade */}
            <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-mivn-bg-dark to-transparent" />
        </section>
    );
};

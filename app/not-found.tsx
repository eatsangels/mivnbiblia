"use client";

import Link from "next/link";
import { Home, Heart, MoveLeft } from "lucide-react";

export default function NotFound() {
    return (
        <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden font-sans text-white">

            {/* Background Image - Full Screen */}
            <div className="absolute inset-0 z-0">
                <img
                    src="/images/404-ethereal.png"
                    alt="Camino celestial hacia la luz"
                    className="w-full h-full object-cover animate-in fade-in duration-1000"
                />
                <div className="absolute inset-0 bg-black/40 mix-blend-multiply" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
            </div>

            {/* Glassmorphic Content Card */}
            <div className="relative z-10 w-full max-w-2xl mx-4 animate-in slide-in-from-bottom-8 duration-1000 ease-out">
                <div className="bg-black/20 backdrop-blur-xl border border-white/10 rounded-[3rem] p-10 md:p-16 text-center shadow-2xl shadow-black/50">

                    {/* 404 Title */}
                    <h1 className="text-[80px] md:text-[140px] font-black font-playfair text-transparent bg-clip-text bg-gradient-to-b from-mivn-gold to-yellow-600 leading-none tracking-tighter drop-shadow-sm mb-4">
                        404
                    </h1>

                    <h2 className="text-2xl md:text-3xl font-bold mb-8 text-white/90">
                        Parece que nos hemos desviado
                    </h2>

                    {/* Verse */}
                    <div className="mb-12 relative">
                        <div className="w-16 h-1 bg-gradient-to-r from-transparent via-mivn-gold to-transparent mx-auto mb-6 opacity-60" />
                        <p className="text-xl md:text-2xl font-light italic text-white/80 leading-relaxed font-playfair">
                            "Lámpara es a mis pies tu palabra, y lumbrera a mi camino."
                        </p>
                        <p className="mt-4 text-xs font-black uppercase tracking-[0.3em] text-mivn-gold/80">
                            — Salmo 119:105
                        </p>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link
                            href="/"
                            className="w-full sm:w-auto px-8 py-4 bg-white text-slate-900 rounded-xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 hover:scale-105 hover:bg-slate-100 transition-all shadow-lg shadow-white/10"
                        >
                            <Home className="w-4 h-4" />
                            Ir al Inicio
                        </Link>
                        <Link
                            href="/oracion"
                            className="w-full sm:w-auto px-8 py-4 bg-mivn-gold text-white rounded-xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 hover:scale-105 hover:bg-yellow-600 transition-all shadow-lg shadow-mivn-gold/20"
                        >
                            <Heart className="w-4 h-4" />
                            Peticiones
                        </Link>
                    </div>

                    <div className="mt-12 pt-8 border-t border-white/5">
                        <button onClick={() => window.history.back()} className="text-white/40 hover:text-white transition-colors text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 mx-auto">
                            <MoveLeft className="w-4 h-4" /> Regresar
                        </button>
                    </div>
                </div>
            </div>

            {/* Footer Simple */}
            <div className="absolute bottom-6 w-full text-center text-white/30 text-[10px] font-black uppercase tracking-widest z-10">
                MIVN © 2024 · Restaurando vidas
            </div>
        </div>
    );
}

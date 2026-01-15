'use client';

import Link from "next/link";
import { ArrowLeft, Settings, Menu, Type } from "lucide-react";
import { useReader } from "./ReaderContext";
import { useState } from "react";
import { BibleSelector } from "./BibleSelector";

interface ReaderHeaderProps {
    book: string;
    chapter: string;
}

export function ReaderHeader({ book, chapter }: ReaderHeaderProps) {
    const { fontSize, setFontSize } = useReader();
    const [showSettings, setShowSettings] = useState(false);

    return (
        <nav className="h-14 border-b border-white/5 flex items-center justify-between px-6 bg-[#0a0a0a]/80 backdrop-blur-xl shrink-0 z-20 relative">
            <div className="flex items-center gap-4">
                <Link href="/dashboard" className="p-2 hover:bg-white/5 rounded-full transition-colors">
                    <ArrowLeft className="w-5 h-5 text-gray-400" />
                </Link>
                <div className="flex items-center gap-2">
                    <span className="text-gray-400 font-medium">Mi Biblia</span>
                    <span className="text-gray-600">/</span>
                    <span className="text-sm text-gray-300 font-medium">Estudio</span>
                </div>
            </div>

            <BibleSelector currentBook={book} currentChapter={chapter} />

            <div className="flex items-center gap-2 relative">
                <button
                    onClick={() => setShowSettings(!showSettings)}
                    className={`p-2 rounded-full transition-colors ${showSettings ? 'bg-white/10 text-white' : 'hover:bg-white/5 text-gray-400'}`}
                >
                    <Settings className="w-5 h-5" />
                </button>

                {/* Settings Dropdown */}
                {showSettings && (
                    <>
                        <div
                            className="fixed inset-0 z-10"
                            onClick={() => setShowSettings(false)}
                        />
                        <div className="absolute top-12 right-0 w-64 bg-[#0f141f] border border-white/10 rounded-xl shadow-2xl p-4 z-20 animate-in fade-in slide-in-from-top-2">
                            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                                <Type className="w-4 h-4" /> Tamaño de Texto
                            </h3>
                            <div className="grid grid-cols-4 gap-2">
                                <button
                                    onClick={() => setFontSize('small')}
                                    className={`p-2 rounded-lg border transition-all ${fontSize === 'small' ? 'bg-white/10 border-gold-500/50 text-white' : 'border-white/5 text-gray-400 hover:bg-white/5'}`}
                                >
                                    <span className="text-xs">Aa</span>
                                </button>
                                <button
                                    onClick={() => setFontSize('normal')}
                                    className={`p-2 rounded-lg border transition-all ${fontSize === 'normal' ? 'bg-white/10 border-gold-500/50 text-white' : 'border-white/5 text-gray-400 hover:bg-white/5'}`}
                                >
                                    <span className="text-sm">Aa</span>
                                </button>
                                <button
                                    onClick={() => setFontSize('large')}
                                    className={`p-2 rounded-lg border transition-all ${fontSize === 'large' ? 'bg-white/10 border-gold-500/50 text-white' : 'border-white/5 text-gray-400 hover:bg-white/5'}`}
                                >
                                    <span className="text-base">Aa</span>
                                </button>
                                <button
                                    onClick={() => setFontSize('huge')}
                                    className={`p-2 rounded-lg border transition-all ${fontSize === 'huge' ? 'bg-white/10 border-gold-500/50 text-white' : 'border-white/5 text-gray-400 hover:bg-white/5'}`}
                                >
                                    <span className="text-xl">Aa</span>
                                </button>
                            </div>
                        </div>
                    </>
                )}

                <button className="p-2 hover:bg-white/5 rounded-full transition-colors md:hidden">
                    <Menu className="w-5 h-5 text-gray-400" />
                </button>
            </div>
        </nav>
    );
}
